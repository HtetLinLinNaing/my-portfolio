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
