// Sends an email the moment a new row lands in `bookings` or
// `agent_applications`.
//
// Triggered by a Supabase Database Webhook, not by the patient's browser:
// the notification is tied to the row actually existing, so closing the tab
// or a flaky connection right after submitting cannot lose it. It also keeps
// the mail provider's API key server-side, where a key belongs.
//
// Deploy and wiring instructions: supabase/functions/notify-lead/README.md

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const NOTIFY_TO = Deno.env.get("NOTIFY_TO") ?? "healthblueprint@163.com";
// Until a domain is verified with Resend, their shared sender is the only
// address allowed to send.
const NOTIFY_FROM = Deno.env.get("NOTIFY_FROM") ?? "Health Blueprint <onboarding@resend.dev>";
const WEBHOOK_SECRET = Deno.env.get("WEBHOOK_SECRET");

const esc = (v: unknown) =>
  String(v ?? "—").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));

/** Field order per table: what someone triaging a lead reads first. */
const FIELDS: Record<string, string[]> = {
  bookings: ["full_name", "email", "phone", "hospital_id", "specialty", "status", "message", "created_at"],
  agent_applications: ["full_name", "email", "phone", "city", "languages", "experience", "status", "message", "created_at"],
};

const LABEL: Record<string, string> = {
  bookings: "New patient request",
  agent_applications: "New agent application",
};

function rowsHtml(table: string, record: Record<string, unknown>) {
  const keys = FIELDS[table] ?? Object.keys(record);
  return keys
    .filter((k) => k in record)
    .map((k) => {
      const v = record[k];
      // `message` carries the free-text block the form folds the extra
      // answers into, so keep its line breaks.
      const val = k === "message"
        ? `<span style="white-space:pre-wrap">${esc(v)}</span>`
        : esc(v);
      return `<tr>
        <td style="padding:6px 14px 6px 0;color:#5A7877;vertical-align:top;white-space:nowrap">${esc(k)}</td>
        <td style="padding:6px 0;color:#1B4B5A">${val}</td>
      </tr>`;
    })
    .join("");
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  // The function URL is public, so require a shared secret the webhook sends
  // as a header — otherwise anyone could make this mail you anything.
  if (WEBHOOK_SECRET && req.headers.get("x-webhook-secret") !== WEBHOOK_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set — cannot send notification");
    return new Response("Mail provider not configured", { status: 500 });
  }

  let payload: { type?: string; table?: string; record?: Record<string, unknown> };
  try {
    payload = await req.json();
  } catch {
    return new Response("Bad JSON", { status: 400 });
  }

  const { type, table, record } = payload;
  if (type !== "INSERT" || !table || !record) {
    // Not an insert we care about — acknowledge so the webhook isn't retried.
    return new Response(JSON.stringify({ skipped: true }), {
      status: 200, headers: { "Content-Type": "application/json" },
    });
  }

  const heading = LABEL[table] ?? `New row in ${table}`;
  const who = esc(record.full_name);
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:620px">
    <h2 style="color:#1B4B5A;margin:0 0 4px">${esc(heading)}</h2>
    <p style="color:#5A7877;margin:0 0 18px">from ${who}</p>
    <table style="border-collapse:collapse;font-size:14px;width:100%">${rowsHtml(table, record)}</table>
    <p style="color:#5A7877;font-size:12px;margin-top:22px">
      Sent automatically by Health Blueprint when a row was written to <code>${esc(table)}</code>.
    </p>
  </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: NOTIFY_FROM,
      to: [NOTIFY_TO],
      reply_to: typeof record.email === "string" && record.email ? record.email : undefined,
      subject: `${heading}: ${record.full_name ?? "unknown"}`,
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("Resend rejected the message", res.status, body);
    // A non-2xx makes Supabase retry, which is what we want for a transient
    // provider failure.
    return new Response("Mail provider error", { status: 502 });
  }

  return new Response(JSON.stringify({ sent: true }), {
    status: 200, headers: { "Content-Type": "application/json" },
  });
});
