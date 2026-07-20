# PhD Forward — Hostinger deployment

Use this package only for `https://phd.aristocratresearch.com`.

## Hostinger settings

- Application: Node.js Web App
- Node.js: 22.x
- Root directory: `/`
- Install: `npm ci`
- Build: `npm run build`
- Start: `npm start`
- Health check: `/api/health`

Upload this ZIP directly or put its contents at the root of a private GitHub
repository and connect that repository in Hostinger. Test first on Hostinger's
temporary address. Connect the final subdomain only after every check passes.

## Environment variables

Use `.env.example` as the key list. Enter real values only in Hostinger's
environment-variable screen. Never commit secrets or send them through chat.

- `NEXT_PUBLIC_CALENDLY_URL`: public consultation event URL.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: public Turnstile site key.
- `TURNSTILE_SECRET_KEY`: server-only anti-bot secret.
- `LEAD_ROUTER_URL` and `LEAD_ROUTER_SECRET`: protected CRM intake endpoint.
- `PAYMENT_ROUTER_URL` and `PAYMENT_ROUTER_SECRET`: quotation verifier that
  returns only an authorised Razorpay or PayPal checkout URL.
- `WORKSPACE_ROUTER_URL` and `WORKSPACE_ROUTER_SECRET`: client-access verifier.
- `WORKSPACE_ALLOWED_HOSTS`: approved workspace domains, comma separated.

## Activation sequence

1. Deploy with integrations inactive and verify all public routes.
2. Connect Turnstile and the lead router; test valid, invalid, duplicate and
   spam submissions.
3. Add Calendly and verify timezone, cancellation and rescheduling.
4. Test the secure workspace with expiry and revocation.
5. Test Razorpay and PayPal in sandbox, including invalid signatures and webhook
   retries. Never accept an amount supplied by the browser.
6. Connect `phd.aristocratresearch.com`, verify SSL and submit the sitemap.

No lead, file or payment success state should appear until its server-side
provider confirms the action.
