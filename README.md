# RCCG Place of Favour Area Headquarters — Website & Admin Platform

Official website and content management platform for **RCCG Place of Favour
Area Headquarters** (`placeoffavour.org`), built with Next.js (App Router).

> **Status: Phase 3 (database layer).** The public site renders placeholder
> content and reads from PostgreSQL (Neon) via Prisma whenever `DATABASE_URL` is
> configured and seeded. Authentication and the admin dashboard come in later
> phases — see the roadmap at the bottom.

## Tech stack

- **Next.js 16** (App Router, Server Components, Server Actions, TypeScript)
- **React 19** · **Tailwind CSS v4**
- **PostgreSQL (Neon)** with **Prisma ORM**
- **Vercel** for deployment (planned)
- `next/font` — Fraunces (display) + Inter (body)

## Getting started (local)

Requirements: **Node.js 20.9+**, npm.

```bash
# 1. Install dependencies (runs prisma generate on postinstall)
npm install

# 2. Create environment file
cp .env.example .env    # then fill in DATABASE_URL from Neon

# 3. (Optional) create the schema and seed data
npm run db:migrate      # applies prisma/migrations/0000_init
npm run db:seed         # loads the placeholder content into Postgres

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **No database is required to run the app.** When `DATABASE_URL` is absent (or
> when a table is empty or an error occurs), the public pages fall back to the
> static placeholder content in `src/lib/content/`, so the site is fully
> browsable before the database and seed are connected.

## Database (Phase 3)

The Prisma schema (`prisma/schema.prisma`) mirrors the content types in
`src/types/content.ts` and adds auth-ready (`User`) and submission
(`Testimonial`, `ContactMessage`) models.

- `.env` needs `DATABASE_URL` pointing at a Neon PostgreSQL connection string.
- The initial migration lives in `prisma/migrations/0000_init/` — generated
  offline with `prisma migrate diff` so it applies cleanly on Neon.
- The data-access layer in `src/lib/data/content.ts` is the single entry point
  for public content. It returns DB rows when available and falls back to
  static content otherwise.
- Public forms (`/contact`, `/testimonies`) submit through Server Actions in
  `src/lib/actions.ts`. With a database connected they persist records
  (`isApproved = false` for testimonies, awaiting moderation); without one they
  complete client-side only.

## Scripts

| Command                | Purpose                              |
| ---------------------- | ------------------------------------ |
| `npm run dev`          | Development server (Turbopack)       |
| `npm run build`        | Production build                     |
| `npm run start`        | Serve production build               |
| `npm run lint`         | ESLint                               |
| `npm run db:generate`  | Regenerate Prisma client             |
| `npm run db:migrate`   | Apply migrations + sync (dev)        |
| `npm run db:deploy`    | Apply pending migrations (prod)      |
| `npm run db:seed`      | Load placeholder content into DB     |
| `npm run db:studio`    | Open Prisma Studio                   |

## Project structure

```
prisma/
  schema.prisma          # DB models (mirror src/types/content.ts)
  migrations/            # SQL migrations
  seed.ts                # Seeds placeholder content into Postgres
src/
  app/
    (site)/              # Public website (pages, routes)
    admin/               # Admin dashboard (Phase 4+)
    layout.tsx           # Root layout (fonts, metadata)
    globals.css          # Design tokens (Tailwind v4 @theme)
  components/
    layout/              # Header, Footer
    home/                # Homepage sections
    ui/                  # Reusable primitives (Button, Card, Icon, …)
  lib/
    actions.ts           # Server Actions (form submissions)
    data/content.ts      # Data-access layer (DB w/ static fallback)
    db.ts                # Lazy Prisma client + DB availability gate
    content/             # Placeholder content (fallback data)
    site.ts              # Site-wide config (name, nav, contacts, socials)
    format.ts            # Date helpers
    utils.ts             # cn() helper
  types/content.ts       # Shared content types (mirror Prisma models)
```

All colors, fonts, spacing and animation tokens live in `globals.css`.

## Roadmap

1. ✅ **Phase 1** — Project architecture, design system, basic UI
2. ✅ **Phase 2** — Complete the public website content
3. ✅ **Phase 3** — Prisma schema + Neon PostgreSQL integration
4. ⏳ **Phase 4** — Authentication & authorization
5. ⏳ **Phase 5** — Admin dashboard
6. ⏳ **Phase 6** — Connect all CMS features to the database
7. ⏳ **Phase 7** — Validation, security, SEO, accessibility, performance
8. ⏳ **Phase 8** — Testing pass
9. ⏳ **Phase 9** — GitHub preparation
10. ⏳ **Phase 10** — Vercel deployment

## Notes on placeholder content

Where official church information was not supplied (addresses, phone numbers,
service times, leader names, sermon details), the site uses **clearly-marked
placeholder content**. Everything is editable from the admin dashboard once the
CMS is connected, and no image or contact assumed official.
