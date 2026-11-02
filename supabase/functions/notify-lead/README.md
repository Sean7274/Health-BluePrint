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
  NOTIFY_TO=the_address_that_owns_the_resend_account

npx supabase functions deploy notify-lead --no-verify-jwt
```

`--no-verify-jwt` is required: the database webhook calls the function without
a user token. The `WEBHOOK_SECRET` header check is what protects it instead.

### `NOTIFY_TO` is restricted until you verify a domain

Until a sending domain is verified, this function sends from Resend's shared
testing address (`onboarding@resend.dev`), and Resend will only deliver mail
from it **to the email address that owns the Resend account**. Any other
recipient is rejected with a 403, the function returns 502, and Supabase retries
until it gives up — no notification arrives and nothing says why.

So `NOTIFY_TO` must be the Resend account's own address at first, even if you
would rather notifications went to a company inbox. Mail from the shared testing
address also tends to land in spam; check the spam folder on the first test.

To send from your own domain and to any recipient, verify `healthblueprint.cn`
in Resend (**Domains** → **Add Domain**, then add the DNS records it gives you),
and set both secrets:

```bash
npx supabase secrets set \
  NOTIFY_FROM="Health Blueprint <noreply@healthblueprint.cn>" \
  NOTIFY_TO=healthblueprint@163.com
```

Changing secrets takes effect on the next invocation; no redeploy is needed.

## 4. Create the webhooks

In the Supabase dashboard: **Integrations** → **Webhooks** → **Create a new hook**
(direct link: `/project/_/integrations/webhooks/overview`). Older docs put this
under **Database** → **Webhooks**; it moved.

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

Two things to watch in that form:

- The header table may already contain a `Content-Type` row. Don't add a second
  one — duplicates are sent as-is and can confuse the receiving function.
- `x-webhook-secret` must match the `WEBHOOK_SECRET` secret from step 2
  character for character. Generate it yourself with the `openssl` command
  above; never paste a value copied from documentation, a chat log, or an
  example — anything that has appeared somewhere else is not a secret.

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
- **Free-tier projects pause after about a week with no activity.** A paused
  project answers nothing: every form on the site fails, and because the
  insert never happens, no webhook fires and no notification is sent — the
  failure is completely silent from your side. This has already happened once.
  Either keep the project awake with real traffic, upgrade off the free tier
  before running ads, or check the project is running whenever the site has
  been quiet for a few days.
