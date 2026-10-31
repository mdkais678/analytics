# Pulse — Interactive Analytics Dashboard

A responsive, frontend-only analytics dashboard built with Next.js, React, TypeScript, Tailwind CSS and Recharts.

## Run locally

1. Install Node.js 20.9 or newer.
2. Extract the ZIP and open the folder in VS Code.
3. Open a terminal in this folder and run:

```bash
npm install
npm run dev
```

4. Visit http://localhost:3000

## Production build

```bash
npm run build
npm run start
```

## Deploy to Vercel

Push the project to GitHub, import the repository at https://vercel.com/new, and use the default Next.js settings.

## Features

- Responsive Recharts area, bar and donut visualizations.
- Client-side search across the activity table.
- Date range and channel filters.
- Sortable table columns and pagination.
- Dark/light theme toggle.
- Theme preference saved in localStorage.
- Inline pre-hydration theme initialization to avoid a light/dark flash.
- Sample data is local to the browser; no backend or external API is required.

## Customize

- `components/dashboard.tsx` — dashboard layout and interactions
- `components/charts.tsx` — Recharts visualizations
- `lib/data.ts` — sample analytics and activity data
- `app/globals.css` — theme tokens and styles
