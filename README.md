# PhD Forward — Aristocrat Research

Production website for **PhD Forward — Your PhD. Progressed.** It provides research-stage diagnosis, service pathways, consultation booking, evidence standards, legal pages, and protected lead, milestone-payment, and client-workspace routing.

## Technology

- Next.js 16 and React 19
- TypeScript
- Google Sheets CRM and Google Apps Script router
- Calendly consultation booking
- Razorpay and PayPal quotation-linked payment routing
- Google Drive client workspaces
- Hostinger Node.js deployment target

## Local setup

Use Node.js 22.

```bash
npm ci
npm run build
npm start
```

Copy `.env.example` to `.env.local` and supply configuration locally. Never commit `.env.local`, API keys, router secrets, payment credentials, client data, manuscripts, datasets, or access codes.

## Production environment

The public Calendly URL and canonical domain may be configured directly. All other values belong in Hostinger environment variables. The same authorised Google Apps Script `/exec` URL can serve the lead, payment, and workspace router operations.

See [PRODUCTION_HANDOFF.md](PRODUCTION_HANDOFF.md) and [the Google Workspace router guide](integrations/google-apps-script/README.md) for the controlled deployment sequence.

## Security model

- Browser forms call same-origin server routes.
- Turnstile, a honeypot, timing checks, validation, and bounded inputs protect lead intake.
- CRM, payment, and Drive destinations are never exposed in browser code.
- Payment and workspace links require a matching reference and access-code hash.
- Confidential research documents remain in controlled Drive folders, not the CRM.
- Publication or university decisions are recorded independently from service delivery.

## Ethical boundary

The service supports legitimate research planning, analysis, writing, editing, submission, revision, and viva preparation. It does not promise publication, sell authorship, fabricate data, manipulate peer review, or route work to predatory outlets.

© Aristocrat Research. All rights reserved.
