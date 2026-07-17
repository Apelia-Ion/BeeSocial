# 🐝 BeeSocial

**The social hive – share what's buzzing.**

BeeSocial is a full-stack social media app where users can create posts (with images), like and comment, follow each other, and get notifications — all wrapped in a custom bee/honey theme with dark mode and English/Romanian language support.

The app was built following the **[Next.js Tutorial 2025 – Build a Full Stack Social App](https://dev.to/showcase/neon/nextjs-tutorial-2025)** by [Codesistency](https://www.youtube.com/@codesistency), then extended and restyled on top of it (see [Design choices](#design-choices)).

## Tech stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) (App Router, Server Components & Server Actions) + TypeScript |
| Authentication | [Clerk](https://clerk.com/) — sign-up/sign-in, sessions, user management |
| Database | [Neon](https://neon.tech/) — serverless Postgres |
| ORM | [Prisma 7](https://www.prisma.io/) with the `pg` driver adapter |
| File uploads | [UploadThing](https://uploadthing.com/) — post image uploads |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) with a custom honey/hive theme |
| UI components | [shadcn/ui](https://ui.shadcn.com/) (Base UI primitives) + [lucide-react](https://lucide.dev/) icons |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) — light/dark/system mode |
| Notifications (UI) | [react-hot-toast](https://react-hot-toast.com/) |
| Dates | [date-fns](https://date-fns.org/) (locale-aware timestamps) |

## Features

- 🔐 **Authentication** with Clerk — users are synced to the Postgres database on first login
- 📝 **Posts** — create, delete, like and comment, with optional image upload
- 👥 **Follow system** — follow/unfollow users, "Who to Follow" suggestions
- 🔔 **Notifications** — generated when someone likes, comments, or follows you
- 🙍 **Profile pages** — bio, location, website, member-since date, posts & liked-posts tabs, editable profile
- 🌗 **Dark / light mode** with system preference support
- 🌍 **Internationalization** — English and Romanian, cookie-persisted, with a language toggle in the navbar
- 📱 **Responsive layout** — desktop navbar + sidebar, mobile sheet menu

## Getting started

### 1. Clone & install

```bash
git clone https://github.com/Apelia-Ion/BeeSocial.git
cd BeeSocial
npm install
```

### 2. Set up external services

You need free accounts for three services:

- **Clerk** — create an application at [dashboard.clerk.com](https://dashboard.clerk.com) and grab the **Publishable Key** and **Secret Key** from *API Keys*.
- **Neon** — create a project at [console.neon.tech](https://console.neon.tech) and copy the Postgres **connection string** (any Postgres instance works too).
- **UploadThing** — create an app at [uploadthing.com/dashboard](https://uploadthing.com/dashboard) and copy the **API token**.

### 3. Configure environment variables

Copy the example file and fill in your keys:

```bash
cp .env.example .env
```

```dotenv
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
DATABASE_URL=postgresql://USER:PASSWORD@HOST/DB?sslmode=require
UPLOADTHING_TOKEN=...
```

### 4. Push the database schema

```bash
npm run db:push
```

This runs `prisma db push` to create the tables (User, Post, Comment, Like, Follows, Notification) in your Neon database. The Prisma client is generated automatically on install (`postinstall`), or manually with `npm run db:generate`.

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), sign up through Clerk, and start buzzing. 🐝

## Design choices

### Bee theme 🍯

Instead of the tutorial's neutral look, the whole UI is built around a honey/hive identity:

- Two custom Tailwind color palettes — **`honey`** (amber/gold, used for accents, buttons, and highlights) and **`hive`** (warm earthy neutrals, used for surfaces and text) — defined in `tailwind.config.mjs`.
- A subtle **honeycomb SVG pattern** as the page background (`bg-honeycomb`) and a **honey gradient** utility for accent surfaces.
- Bee-flavored copy throughout ("Welcome to the Hive!", "share what's buzzing").

### Architecture

- **Server Actions over API routes** — all mutations (posts, likes, comments, follows, notifications, profile updates) live in `src/actions/` as server actions, so there's no hand-written fetch layer; the only API routes are the UploadThing handler and a small demo `tasks` route.
- **Clerk ↔ database sync** — Clerk owns authentication, but a `User` row (keyed by `clerkId`) is created in Postgres on first visit so posts, follows, and notifications can use proper relational foreign keys.
- **Relational schema with cascade deletes** — deleting a user or post automatically cleans up its comments, likes, and notifications; composite indexes and unique constraints (e.g. one like per user per post, no duplicate follows) are enforced at the database level.
- **Prisma driver adapter** — Prisma 7 with `@prisma/adapter-pg`, and the client generated into `src/generated/` so it's fully owned by the project.

### UI & UX

- **shadcn/ui components** (`src/components/ui/`) are copied into the repo rather than installed as a dependency, so every button, dialog, and tab can be restyled to match the bee theme.
- **Dark mode** is class-based via `next-themes`, defaulting to the system preference, with both palettes tuned for light and dark backgrounds.
- **Lightweight i18n** — a small custom solution (`src/i18n/`) instead of a heavy library: typed translation objects for English and Romanian, the locale stored in a cookie, read server-side (so the initial render is already in the right language), and matching `date-fns` locales for timestamps.
- **Skeleton loaders and optimistic feedback** — notification skeletons while loading and toast feedback on actions keep the app feeling responsive.

## Project structure

```
src/
├── actions/          # Server actions (posts, users, profiles, notifications)
├── app/              # App Router pages & API routes
│   ├── api/          # UploadThing handler + demo tasks route
│   ├── notifications/
│   └── profile/[username]/
├── components/       # App components (PostCard, Sidebar, Navbar, ...)
│   └── ui/           # shadcn/ui primitives (restyled)
├── i18n/             # Translations (en/ro), locale cookie handling
├── lib/              # Prisma client, UploadThing helpers, utils
└── middleware.ts     # Clerk middleware
prisma/
└── schema.prisma     # Database models
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint the codebase |
| `npm run db:push` | Push the Prisma schema to the database |
| `npm run db:generate` | Regenerate the Prisma client |
