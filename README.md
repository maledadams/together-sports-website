# Together Sports Website

Together Sports is a Vite + React site with a live Supabase-backed content editor for testimonials, partners, team cards, and the experiences page.

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn-ui
- Supabase
- Vercel

## Local Development

Install dependencies:

```sh
npm install
```

Run the normal Vite dev server:

```sh
npm run dev
```

This project is pinned to `http://localhost:8081` for regular Vite development.

If you want the app to use Vercel environment variables directly, run:

```sh
npx vercel dev
```

That runs the site on `http://localhost:3000`.

## Environment Variables

Create Vercel project env vars for:

```sh
SITE_URL
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY
```

For local non-Vercel testing, you can also place them in `.env.local`. See [.env.example](./.env.example).

`SITE_URL` should be your canonical production domain, for example:

```sh
SITE_URL=https://www.yourdomain.com
```

It is used to generate `sitemap.xml`, `robots.txt`, and other SEO assets during build.

## Live Content System

How it works now:

- Public pages load live content from Supabase at runtime.
- `/admin` requires Supabase sign-in when env vars are configured.
- `Save Live` writes the whole content object to `site_content`.
- Uploaded images go into `site-media`.
- No redeploy is needed for content changes.
- `Export JSON` / `Import JSON` still exist as backup tools.

## Admin Route

The admin editor lives at:

```txt
/admin
```

When Supabase is configured:

- sign in by magic link
- edit testimonials, partners, and team content
- upload images to Supabase Storage
- save the current draft live to Supabase

When Supabase is not configured:

- the editor falls back to the default repo seed content

## Backup Content Workflow

JSON backup tools still exist if you want snapshots of the content:

- Export from `/admin`
- Save the file as `content/editable-content.json`
- Run `npm run apply:content`
- Commit `content/editable-content.json` and `src/data/editableContentSeed.ts`

This backup flow is optional now that live content is stored in Supabase.

## Build

Create a production build with:

```sh
npm run build
```

## Deployment

Deploy the project on Vercel and add the two `VITE_SUPABASE_*` environment variables in the Vercel project settings for `Development`, `Preview`, and `Production`.
