# Pokédex - Generation I through V

A full-stack Pokédex featuring all 649 Pokémon from Generation I through Generation V. Browse, search, filter by type, and explore detailed stats, abilities, evolution chains, and type matchups with animated sprites and authentic Pokémon cries.

## Features

- Complete data for all 649 Pokémon from Kanto through Unova regions
- Animated pixel art sprites with smooth animations
- Click sprites to toggle shiny forms and hear Pokémon cries
- Search by name or number, filter by type
- Interactive evolution chains with clickable sprites
- Complete base stats, EV yields, catch rates, and training information
- Full type effectiveness calculator showing all damage multipliers
- All abilities including hidden abilities with detailed descriptions
- Responsive design optimized for desktop, tablet, and mobile
- Lightning fast loading with static generation and incremental regeneration

## Tech Stack

- Next.js 15 with App Router and React 19
- TypeScript for full type safety
- Tailwind CSS v4 with inline themes
- Prisma ORM with PostgreSQL database
- Neon serverless PostgreSQL hosting
- Turbopack for fast builds
- PokeAPI as the data source

## Data Source

All Pokémon data is fetched from PokeAPI and stored locally in PostgreSQL for fast access. This includes stats, types, abilities with descriptions, evolution chains, EV yields, catch rates, Pokémon cries (audio), and animated sprites.

## Getting Started

### Prerequisites

- Node.js 18 or higher
- PostgreSQL database (Neon recommended)
- npm or yarn

### Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd pokedex9
npm install
```

Set up your environment variables:

```bash
cp .env.example .env
```

Add your database URL to the `.env` file:

```
DATABASE_URL="postgresql://..."
```

Set up the database:

```bash
npx prisma db push
npx prisma generate
```

Fetch Pokémon data from PokeAPI (this takes about an hour for all 649 Pokémon):

```bash
npm run fetch-data
```

Seed the database:

```bash
npm run db:seed
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Key Features

### Animated Sprites

The app uses Pokémon Showdown Gen 5 animated sprites with pixelated rendering for sharp pixel art. Click any sprite to toggle between normal and shiny forms. Each click also plays the Pokémon's authentic cry sound at a comfortable volume.

### Two-Column Detail Layout

Pokémon detail pages use a clean two-column layout. The left column (60% width) shows the animated sprite with name and types, followed by the evolution chain, species information, and abilities. The right column (40% width) displays base stats with colored progress bars, training information including EV yields and catch rate, and type effectiveness.

### Homepage Grid

The homepage displays Pokémon in a responsive grid with 5 per row on extra-large screens, 4 on large screens, 3 on tablets, and 2 on mobile. Real-time search and type filtering make it easy to find any Pokémon.

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run fetch-data   # Fetch Pokémon data from PokeAPI
npm run db:seed      # Seed database with Pokémon data
```

## Database Schema

The database uses a relational structure with five main models: Pokemon stores core data and stats, Ability stores ability descriptions, PokemonAbility serves as a join table for the many-to-many relationship, EvolutionChain groups related evolutions, and EvolutionStage represents individual Pokémon within chains. For detailed schema documentation, see DATABASE_RELATIONSHIPS.md.

## API Integration

Data flows from PokeAPI through a fetch script that saves everything to JSON files, then a seeder reads those files and populates PostgreSQL. The fetch script includes a 100ms delay between requests to respect PokeAPI's rate limits.

## Recent Updates (October 12, 2025)

- Expanded from 151 to 649 Pokémon covering Generation I through V
- Added animated sprites from Pokémon Showdown
- Added Pokémon cry audio with click-to-play functionality
- Updated to a two-column layout for better information hierarchy
- Improved sprite quality with pixelated rendering
- Added volume control (30%) for cry sounds
- Removed redundant code and unused components
- Updated all documentation

## License

This project is for educational purposes. Pokémon and related assets are property of Nintendo, Game Freak, and The Pokémon Company.

## Acknowledgments

Data provided by PokeAPI. Animated sprites from Pokémon Showdown. Database hosting by Neon.
