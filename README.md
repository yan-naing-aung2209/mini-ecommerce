# mini-ecommerce

mini-ecommerce is a lightweight e-commerce starter built with Next.js, TypeScript, MUI (Material UI), Redux Toolkit, and Prisma (Postgres). It demonstrates a modern full‑stack pattern with server-side API routes, a React-based storefront, and a Postgres-backed data layer via Prisma.

Key features
- Next.js (app pages & API routes)
- TypeScript
- UI: MUI + Emotion
- State: Redux Toolkit
- Database: Prisma + PostgreSQL
- Lightweight order and product APIs

Tech stack
- Next.js 16
- React 19
- TypeScript
- Prisma + @prisma/client, pg
- @mui/material, @emotion/react, @emotion/styled
- Redux Toolkit

Getting started (development)
1. Install dependencies

```bash
npm install
# or yarn
```

2. Create a .env file at project root and add your Postgres connection string (example):

```env
DATABASE_URL=postgresql://user:password@localhost:5432/mini_ecommerce
# Optional: NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

3. Generate Prisma client and run migrations

```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. Start dev server

```bash
npm run dev
```

Open http://localhost:3000

Database / Prisma notes
- Prisma schema: prisma/schema.prisma
- To introspect an existing database: `npx prisma db pull`
- To open Prisma Studio: `npx prisma studio`

Scripts
- npm run dev — run Next dev server
- npm run build — build for production
- npm run start — start production server
- npm run lint — run ESLint

Project layout (high level)
- pages/ — Next.js pages and API routes
- prisma/ — Prisma schema and configs
- src/ — application source (components, hooks, store)
- public/ — static assets

Contributing
- Open issues or PRs for improvements. Keep changes focused and document DB changes via Prisma migrations.

License
- MIT

If you want, next steps can include adding a seed script, CI, or deployment instructions for Vercel or Docker.