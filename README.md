# zerozero – Modern Accounting & Advisory (Next.js 15 + Tailwind)

A production‑ready, multilingual marketing site for an accounting firm. Built with Next.js App Router, TypeScript, and Tailwind CSS. Locales: English (`/en`), Albanian (`/sq`), German (`/de`).

## Tech
- Next.js 15 (App Router, TypeScript)
- Tailwind CSS (+ Typography plugin)
- i18n via route segment `app/[locale]` and middleware redirect

## Development
```bash
npm install
npm run dev
# open http://localhost:3000 (redirects to /en)
```

## Project Structure
- `app/[locale]/*` localized pages (home, resources, privacy)
- `components/*` UI components (NavBar, Footer, cards, etc.)
- `lib/dictionaries/*` translations
- `middleware.ts` redirects `/(.*)` to `/{locale}/(.*)` with default `en`
- `tailwind.config.ts`, `postcss.config.js`, `app/globals.css`

## i18n
- Locales: `en`, `sq`, `de`
- Dictionaries: `lib/dictionaries/{en,sq,de}.ts`
- Language switcher in the header preserves the current path

## Build
```bash
npm run build
npm start
```

## Deploy to Vercel (recommended)
### Option A: GitHub → Vercel (UI)
1. Create a new GitHub repo and push (see below).
2. In Vercel dashboard → “Add New Project” → “Import Git Repository”.
3. Select your repo. Framework auto-detected as Next.js.
4. Build settings (defaults):
   - Install: `npm install`
   - Build: `npm run build`
   - Output: `.next`
5. Environment vars: none required.
6. Deploy. Vercel will serve `/` → middleware redirects to `/en`.

### Option B: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel # first deployment (preview)
vercel --prod # promote to production
```

## Create GitHub repo & push
```bash
git init
git add .
git commit -m "feat: initial zerozero site (Next.js 15 + Tailwind + i18n)"
# Create a repo at github.com and copy its URL, e.g.:
git remote add origin https://github.com/<you>/zerozero.git
git branch -M main
git push -u origin main
```

## Notes
- Anchors use `scroll-margin-top` to avoid sticky header overlap.
- Smooth in-view animations via IntersectionObserver.
- No backend. Contact form is client-side only.
- Default locale is `en`. Adjust in `middleware.ts` and `lib/i18n.ts` if desired.

---
Feel free to open issues or extend pages (e.g., add CMS, blog, or analytics).
