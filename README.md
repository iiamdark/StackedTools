# StackedTools

Discover, compare, and master the best digital tools. In-depth reviews, honest software comparisons, and actionable productivity guides.

## Tech Stack

- [Astro](https://astro.build/) — Static site generator
- [Supabase](https://supabase.com/) — Backend database for dynamic posts
- [Google AdSense](https://adsense.google.com/) — Monetization
- [Vercel](https://vercel.com/) — Hosting & deployment

## Development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## Project Structure

```text
├── public/              # Static assets (favicons, images)
├── src/
│   ├── components/      # Reusable Astro components
│   ├── content/         # Markdown blog posts
│   ├── layouts/         # Page layouts (Base, BlogPost, Page)
│   ├── lib/             # Utilities (Supabase client)
│   ├── pages/           # Route pages
│   └── styles/          # Global CSS with design tokens
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Environment Variables

Copy `.env.example` to `.env` and fill in:

| Variable | Description |
|----------|-------------|
| `PUBLIC_SUPABASE_URL` | Supabase project URL |
| `PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |

## License

All rights reserved.
