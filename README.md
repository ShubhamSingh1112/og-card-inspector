# OG Card Inspector

A lightweight website for previewing social link cards and auditing the metadata behind them. The homepage is server-rendered for search engines; only the interactive inspector is sent as a client component.

## Features

- Preview link cards for X, LinkedIn, Discord, and Slack.
- Audit Open Graph and X tags, titles, descriptions, images, canonical URLs, and favicons.
- Copy suggested metadata and open platform cache inspectors.
- Responsive off-white, ink, and red interface with a system serif display face and system sans-serif body face.
- PWA manifest, install icons, service worker, and an offline fallback page.
- `robots.txt`, `sitemap.xml`, canonical metadata, Open Graph/Twitter metadata, and a generated social sharing image.
- Optional email updates through a configured webhook. Signups are not accepted until a webhook is configured.

## Local development

Requirement: Bun 1.2 or newer.

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

Run the production checks locally:

```bash
bun run lint
bun run typecheck
bun run build
bun run start
```

## Deploying to Vercel

1. Push the project to a Git provider and import it into Vercel.
2. Keep `bun.lock` in the project so Vercel detects Bun for dependency installation; confirm the selected Bun version is supported by your deployment configuration.
3. Add `NEXT_PUBLIC_SITE_URL` with the final public origin, for example `https://your-domain.com`. This is used for canonical metadata and the sitemap.
4. If the email updates form should be live, set `WAITLIST_WEBHOOK_URL` to an HTTPS endpoint that accepts a JSON `POST` with `email`, `source`, and `date` fields. Confirm that endpoint stores consent and handles unsubscribe requests appropriately.
5. Add the custom domain in Vercel and configure the DNS records it provides.
6. Deploy, then verify the production URL, `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, and `/sw.js`. Test a public URL inspection and install/offline behavior on a supported browser.
7. Work through [SEO_CHECKLIST.md](./SEO_CHECKLIST.md) before and after launch.

`NEXT_PUBLIC_SITE_URL` is optional for local development. Vercel's deployment URL is used as a fallback, but configure the final canonical domain before production. Without a configured `WAITLIST_WEBHOOK_URL`, signups return a clear service-unavailable message rather than pretending an email was saved.

The package scripts explicitly use Bun to run Next.js, ESLint, and TypeScript. Install dependencies with Bun so `bun.lock` is the authoritative lockfile.

## Before opening to public traffic

- Strengthen SSRF protection on `/api/scrape` to validate resolved addresses and redirect destinations, then add rate limiting or an equivalent abuse control before allowing public traffic.
- Confirm the deployment's request limits and costs for the scraping route.
- Connect and test the email provider/webhook, or remove the updates form.
- Set the final canonical origin and custom-domain DNS.
- Review the privacy notice and consent language if you enable email collection or analytics.
