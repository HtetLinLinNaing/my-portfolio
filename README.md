# Htet Lin Lin Naing — Portfolio

Personal portfolio for Htet Lin Lin Naing, a Full Stack Developer. The site presents selected experience, skills, the featured DevPath-AI project, and a contact form.

## Local setup

Requirements: Node.js 20+ and npm.

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) after the development server starts.

## Environment variables

Set these public EmailJS browser configuration values in `.env.local`:

```text
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

The EmailJS template should accept `from_name`, `reply_to`, `subject`, and `message`. `.env.local` is ignored by Git and must never be committed. Only public browser configuration belongs in these variables; do not add mailbox passwords or private provider credentials.

## Checks

```powershell
npm run test
npm run lint
npm run build
```

## Deployment

Deploy the Next.js app with the included build command. Set `NEXT_PUBLIC_SITE_URL` to the deployed canonical URL and provide the three EmailJS public values in the hosting provider’s environment settings. The app exposes `/sitemap.xml` and `/robots.txt` using that URL.

## Portfolio upgrade

The current page leads with selected work and production experience. The About section explains the current agentic workflow learning focus; Skills lists tools without repeating that narrative. The portrait uses a transparent cutout, while the original photo supplies link previews. CV files and private contact details are not published.

### Contact troubleshooting

The contact form prevents concurrent sends, protects the submitted draft, and categorizes failures. Browser diagnostics contain only a safe category and numeric status, without message contents, visitor addresses, or raw provider responses.

- `configuration`: required public settings are missing or the SDK rejects configuration. Confirm all three values in the correct Vercel environment, then rebuild/redeploy; public values are embedded during the build.
- `service`: inspect the EmailJS service connection, recipient/template configuration, origin restrictions, and account status. Check that template variables match `from_name`, `reply_to`, `subject`, and `message`.
- `rate-limit`: wait before retrying and check provider quotas.
- `network`: check connectivity and any browser request blocking before retrying.

LinkedIn and GitHub are available in the desktop social rail and mobile navigation. The form also offers LinkedIn when sending fails. Automated tests verify application behavior with the external provider mocked; they do not prove mailbox delivery. Before production sign-off, send a controlled message with permission, verify inbox receipt and the reply address, and record the result. Do not log private messages or add private provider credentials to browser variables.
