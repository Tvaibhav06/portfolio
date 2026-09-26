# Vaibhav Tandon Portfolio

A React portfolio with an Express API for contact messages.

## Contact form setup

The form sends `POST /api/contact` to the API. The API validates the fields and asks Resend to send a plain text email to `CONTACT_TO_EMAIL`, using the visitor's address as `reply_to`. A successful form response means Resend accepted the message; final inbox delivery still depends on email delivery.

1. For a local Resend test, create a Sending API key and use `Portfolio <onboarding@resend.dev>` as `CONTACT_FROM_EMAIL`. Resend may limit this shared testing sender to the account owner's email address.
2. Set the API server secrets shown in `.env.example` in your deployment environment. `CONTACT_TO_EMAIL` is the inbox receiving messages. Do not put `RESEND_API_KEY` in a `VITE_` variable or commit it. For a public site, verify a domain you control and set `CONTACT_FROM_EMAIL` to an address at that domain.
3. Build with `BASE_PATH=/` and serve the built site through the API server. This keeps the site and `/api/contact` on one origin.
4. Send a real test message and confirm it arrives in the receiving inbox before treating the form as live.

The API returns an error when mail settings are missing or Resend rejects the request. The form keeps the visitor's message in place and offers the direct email address.

## Local run

Use pnpm. In PowerShell, run the API in the first terminal:

```powershell
$env:PORT = '5000'
pnpm --filter @workspace/api-server build
pnpm --filter @workspace/api-server start
```

In a second terminal, start the site:

```powershell
$env:PORT = '5173'
$env:BASE_PATH = '/'
pnpm --filter @workspace/vaibhav-portfolio dev
```

Vite proxies `/api` to port 5000 by default. Change `API_PROXY_TARGET` if the API runs elsewhere.

For a single production process, run `pnpm build` with `BASE_PATH=/`, then `pnpm --filter @workspace/api-server start` with `PORT` and the contact environment variables set. The API serves the built portfolio when its `dist/public` directory exists.

## Checks

`pnpm run typecheck` checks the workspace. `pnpm run build` builds the frontend and API. After building the API, `pnpm --filter @workspace/api-server run test:contact` checks validation, configuration errors, provider requests and failures, and rate limiting with a mocked provider. Real delivery requires a valid Resend account, verified sender domain, and a configured deployment.
