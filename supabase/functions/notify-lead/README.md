# Lead notifications — setup

Emails you the moment a row lands in `bookings` or `agent_applications`.

Triggered by a Supabase Database Webhook, so the notification is tied to the
row actually existing — the patient closing their tab right after submitting
can't lose it, and the mail provider's API key stays server-side.

Four steps. Roughly 15 minutes.

---

## 1. Get a Resend API key

1. Sign up at https://resend.com (free tier: 3,000 emails/month, 100/day)
2. **API Keys** → **Create API Key**, permission **Sending access**
3. Copy the key (starts `re_`) — it is shown only once

Emails will come from `onboarding@resend.dev` until you verify a domain.
That works immediately but can land in spam. To send from
`noreply@healthblueprint.cn`, add the domain under **Domains** and set the DNS
records Resend gives you, then set `NOTIFY_FROM` in step 3.

## 2. Pick a webhook secret

Any long random string. It stops anyone who finds the function URL from
mailing you arbitrary content. Generate one:

```bash
openssl rand -hex 24
```

## 3. Deploy the function

With the Supabase CLI, from the repo root:

```bash
npx supabase login
npx supabase link --project-ref kcohwhwplsocpqalykmd

npx supabase secrets set \
  RESEND_API_KEY=re_your_key_here \
  WEBHOOK_SECRET=the_string_from_step_2 \
  NOTIFY_TO=healthblueprint@163.com

npx supabase functions deploy notify-lead --no-verify-jwt
```

`--no-verify-jwt` is required: the database webhook calls the function without
a user token. The `WEBHOOK_SECRET` header check is what protects it instead.

Optional extra secret, once your domain is verified in Resend:

```bash
npx supabase secrets set NOTIFY_FROM="Health Blueprint <noreply@healthblueprint.cn>"
```

## 4. Create the webhooks

In the Supabase dashboard: **Database** → **Webhooks** → **Create a new hook**.

Make **two** hooks, identical except the table:

| Setting | Value |
| --- | --- |
| Name | `notify-booking` / `notify-agent-application` |
| Table | `bookings` / `agent_applications` |
| Events | **Insert** only |
| Type | **HTTP Request** |
| Method | `POST` |
| URL | `https://kcohwhwplsocpqalykmd.supabase.co/functions/v1/notify-lead` |
| HTTP Headers | `Content-Type: application/json`<br>`x-webhook-secret: <the string from step 2>` |

---

## Testing

Submit a real request on the site. The email should arrive within seconds.

If it doesn't:

- **Supabase → Edge Functions → notify-lead → Logs** — did the function run?
  - `401 Unauthorized` → the `x-webhook-secret` header doesn't match the secret
  - `500 Mail provider not configured` → `RESEND_API_KEY` wasn't set
  - `502 Mail provider error` → the log line shows what Resend rejected,
    usually an unverified `from` address
  - nothing at all → the webhook isn't firing; re-check the URL and that the
    event is **Insert**
- **Resend → Logs** — did Resend accept it but the mail not arrive? Check spam.
  Sending from `onboarding@resend.dev` to a 163.com address is the most likely
  case to get filtered; verifying your own domain fixes it.

## Cost

Free tier is 3,000 emails/month and 100/day. One email per submission, so this
stays free well past the point where you'd want a real CRM instead.

## Notes

- The function replies with `reply_to` set to the person's own email, so
  hitting Reply in your inbox answers the patient or applicant directly.
- A non-2xx response makes Supabase retry, so a transient Resend outage
  doesn't silently drop a notification.
