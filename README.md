# Pokédex

A modern, full-stack Pokédex featuring all 151 Kanto Pokémon. Browse, search, filter by type, and explore detailed stats, abilities, evolution chains, and type matchups.

## Tech Stack

- **Next.js 15** (App Router, React 19)
- **Tailwind CSS v4** (inline themes)
- **Prisma ORM** (PostgreSQL via Neon)
- **TypeScript**
- **Turbopack** (dev/build)

## Features

- 🔍 Search and filter by type
- 📊 Base stats with type-colored progress bars
- ✨ Shiny sprite toggle
- 🔗 Interactive evolution chains
- 💪 Pokémon abilities (including hidden abilities)
- ⚔️ Type effectiveness calculator (4×, 2×, ½×, ¼×, 0×)
- 📱 Fully responsive design
- ⚡ Static generation for instant page loads

## Prerequisites

- Node.js 18+
- PostgreSQL database (Neon recommended)

## Setup

### 1. Clone and Install

```bash
git clone https://github.com/AnNguyen7/pokedex.git
cd pokedex
npm install
```

### 2. Database Setup

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://..."
DATABASE_URL_UNPOOLED="postgresql://..."
```

Get your database URLs from [Neon](https://neon.tech) or any PostgreSQL provider.

### 3. Initialize Database

```bash
# Run migrations
npx prisma migrate deploy

# Seed with 151 Pokémon
npx prisma db seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npx prisma studio    # Open Prisma Studio (database GUI)
npx prisma db seed   # Re-seed database
```

## Project Structure

```
pokedex/
├── prisma/
│   ├── schema.prisma       # Database schema
│   ├── seed.ts            # Database seeding script
│   └── migrations/        # Migration history
├── src/
│   ├── app/               # Next.js pages
│   │   ├── page.tsx       # Home page (grid)
│   │   └── pokemon/[slug]/
│   │       └── page.tsx   # Detail page
│   ├── components/        # React components
│   ├── lib/              # Utilities (Prisma client, data)
│   └── types/            # TypeScript types
└── package.json
```

## Database Schema

- **Pokemon** - Core Pokémon data (stats, types, lore)
- **EvolutionChain** - Evolution relationships
- **Ability** - Pokémon abilities
- **PokemonAbility** - Join table (Pokémon ↔ Abilities)

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables (`DATABASE_URL`, `DATABASE_URL_UNPOOLED`)
4. Deploy

Vercel automatically runs `prisma generate` and builds with Turbopack.

## License

MIT