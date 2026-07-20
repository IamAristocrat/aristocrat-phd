# PhD Forward Google Workspace router

This Apps Script Web App connects the public website to the private CRM without exposing the Sheet, Drive folders, payment links, or access codes in browser code.

## One-time setup

1. Open the CRM Google Sheet and choose **Extensions → Apps Script**.
2. Replace `Code.gs` and `appsscript.json` with the files in this directory.
3. In **Project Settings → Script properties**, create:
   - `CRM_SPREADSHEET_ID`: the ID from the CRM Sheet URL.
   - `ROUTER_SECRET`: a random value of at least 32 characters.
   - `NOTIFICATION_EMAIL`: `support@aristocratresearch.com`.
4. Deploy as a **Web app**, executing as the owner, with access set to **Anyone**. Copy the `/exec` URL.
5. In Hostinger environment variables, use that same `/exec` URL for `LEAD_ROUTER_URL`, `PAYMENT_ROUTER_URL`, and `WORKSPACE_ROUTER_URL`. Put the same random value in the three matching `*_SECRET` variables.
6. Set `WORKSPACE_ALLOWED_HOSTS=drive.google.com,docs.google.com`.

Never place the router secret, payment credentials, manuscripts, unpublished datasets, patient information, or client access codes in source control. Store only SHA-256 hashes of access codes in the CRM. Delete every `DEMO-DELETE` row before launch.

## Operating flow

- Website diagnosis → qualified lead row → Gmail notification.
- Calendly booking → consultation recorded by the team in `Consultations`.
- Accepted written scope → quotation marked `Issued`, with a Razorpay or PayPal payment URL and hashed access code.
- Verified payment → client Drive folder and agreement status recorded in `Clients`.
- Delivery and the independent publication/university decision are recorded separately in `Outcomes`.

The public endpoint cannot list CRM data, create Drive folders, or reveal payment/workspace URLs without the correct reference and access code.
