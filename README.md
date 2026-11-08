# HubCart Movie

A drama catalog website modeled on the classic K-drama download-site
structure: poster grid homepage, category pages, and a per-drama page with an
information box, screenshots, storyline, and episode-wise 720p / 1080p
Watch / Download links.

> **Content note:** All bundled dramas are *sample placeholders* with original
> titles, original storyline text and picsum.photos placeholder images.
> Episode links are `#`. Only add real titles/links for content you have the
> rights to distribute.

Built with **Next.js 14 (App Router), React 18, plain JavaScript** — no
database and no extra dependencies in v1.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

Production check:

```bash
npm run build
npm run start
```

## How to add a drama

**Option A — Admin helper (easiest):** open `/admin`, fill the form, copy the
generated snippet, and paste it into the `dramas` array in `lib/dramas.js`.

**Option B — By hand:** copy any `entry({ ... })` block in `lib/dramas.js`
and edit the fields:

| Field | Notes |
|---|---|
| `slug` | Unique URL part, e.g. `my-drama` → `/drama/my-drama` |
| `title`, `type` | Type is one of `Korean Drama`, `Chinese Drama`, `Anime`, `Korean Movie` |
| `category` | `korean` \| `chinese` \| `anime` \| `movies` |
| `languages`, `subtitle` | e.g. `Hindi Dubbed`, `English` |
| `totalEpisodes`, `addedEpisodes` | Card title auto-shows `[ Episode X ADD ]` |
| `genres`, `releaseDate`, `country`, `runningTime`, `maxFileSize`, `storyline` | Storyline: write your own summary |
| `poster`, `screenshots` | Auto-generated from the slug via picsum.photos — replace with your own poster URLs if you have licensed artwork |

Episode watch/download links start as `#` placeholders (see the `eps()`
helper in `lib/dramas.js`). To give a drama custom per-episode links, set its
`episodes` array explicitly after the `entry(...)` call or extend the helper.

When new episodes are released, just raise `addedEpisodes` — the homepage
card, info box and episode lists update automatically.

## Site name & links

The site brand is **HubCart Movie** (`app/layout.js` — header, metadata and
footer). The production URL is https://hubcart-movie.vercel.app — it is set
as `SITE_URL` in `app/sitemap.js` and in `app/robots.js`.

The Telegram channel is https://t.me/Rdx_kdrama_hindi — it is linked from the
join banner in `app/layout.js` and from the Telegram popup
(`components/TelegramPopup.js`), which appears on every full page load.

## Deploy to Vercel

1. Push this folder to a new GitHub repository.
2. On [vercel.com](https://vercel.com) → **Add New → Project** → import the repo.
3. Framework preset: **Next.js** (auto-detected). No environment variables needed for v1.
4. Click **Deploy**. Future pushes to `main` redeploy automatically.

## Roadmap (Phase 2 ideas)

- Database-backed admin panel (add/edit dramas without editing code)
- Real poster uploads, request-a-drama form, Telegram auto-post on new episode
