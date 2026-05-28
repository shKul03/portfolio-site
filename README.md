# Shloka Kulkarni — Portfolio

Personal portfolio built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Add your resume

Replace `public/resume.pdf` with your actual resume PDF. The nav "Download Resume" button links directly to it.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the repo.
3. Vercel auto-detects Next.js — no extra config needed.
4. Deploy.

The `vercel.json` at the root sets the framework and build commands explicitly for reliability.

## Tech stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (scroll reveals, magnetic CTA, nav underline draw)
- **Google Fonts** via `next/font` — Fraunces (headings) + DM Sans (body)

## Customisation

- Colours → `tailwind.config.ts` (accent: `#E84C1E`, bg: `#111110`)
- Content → edit each component in `components/`
- Fonts → swap in `app/layout.tsx`
