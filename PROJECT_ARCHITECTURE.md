# 🎮 Pokédex Project Architecture

## 📋 Table of Contents
1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Data Flow](#data-flow)
4. [Key Files Explained](#key-files-explained)
5. [How Everything Connects](#how-everything-connects)

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **Tailwind CSS v4** - Styling
- **TypeScript** - Type safety

### Backend
- **Prisma ORM** - Database toolkit
- **PostgreSQL (Neon)** - Cloud database
- **Server Components** - Built-in Next.js data fetching

### Deployment
- **Vercel** - Hosting and CI/CD
- **GitHub** - Version control

---

## 📁 Project Structure

```
pokedex9/
├── prisma/
│   ├── schema.prisma          # Database schema definition
│   ├── seed.ts                # Database seeding script
│   └── migrations/            # Database migration history
│
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout (wraps all pages)
│   │   ├── page.tsx           # Home page (/)
│   │   └── pokemon/
│   │       └── [slug]/
│   │           ├── page.tsx   # Detail page (/pokemon/bulbasaur)
│   │           └── loading.tsx # Loading skeleton
│   │
│   ├── components/            # Reusable React components
│   │   ├── AnimatedSprite.tsx
│   │   ├── ClientGrid.tsx
│   │   ├── PokemonCard.tsx
│   │   ├── SearchBar.tsx
│   │   ├── TypeChip.tsx
│   │   └── pokemon/           # Detail page components
│   │       ├── AbilitiesCard.tsx
│   │       ├── EvolutionCard.tsx
│   │       ├── HeroSection.tsx
│   │       ├── MetaCard.tsx
│   │       ├── StatsCard.tsx
│   │       ├── TypeEffectivenessCard.tsx
│   │       └── typeStyles.ts
│   │
│   ├── lib/                   # Utility libraries
│   │   ├── prisma.ts          # Prisma client singleton
│   │   └── starters.ts        # Static Pokémon data & sprite URLs
│   │
│   └── types/
│       └── pokemon.ts         # TypeScript type definitions
│
├── package.json               # Dependencies and scripts
└── tsconfig.json             # TypeScript configuration
```

---

## 🔄 Data Flow

### 1️⃣ **Database Layer (PostgreSQL + Prisma)**

```
┌─────────────────────────────────────────────────────────────┐
│                    Neon PostgreSQL Database                  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Pokemon Table              EvolutionChain Table             │
│  ├─ id                      ├─ id                            │
│  ├─ nationalDex             └─ slug                          │
│  ├─ slug                                                      │
│  ├─ displayName             EvolutionStage Table             │
│  ├─ primaryType             ├─ id                            │
│  ├─ secondaryType           ├─ order                         │
│  ├─ hp, attack, defense...  ├─ chainId → EvolutionChain     │
│  ├─ summary                 └─ pokemonId → Pokemon          │
│  └─ description                                              │
│                              Ability Table                   │
│  PokemonAbility Table       ├─ id                            │
│  ├─ id                      ├─ name                          │
│  ├─ pokemonId → Pokemon     ├─ displayName                  │
│  ├─ abilityId → Ability     └─ description                  │
│  └─ isHidden                                                 │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

**How it works:**
1. **`prisma/schema.prisma`** defines the database structure
2. **`prisma migrate`** creates/updates tables in PostgreSQL
3. **`prisma generate`** creates TypeScript types from schema
4. **`prisma/seed.ts`** populates the database with 151 Pokémon

---

### 2️⃣ **Application Layer (Next.js + React)**

```
User visits website
       ↓
┌──────────────────────────────────────────────────────────────┐
│                      Next.js App Router                       │
├──────────────────────────────────────────────────────────────┤
│                                                                │
│  Route: /                                                      │
│  File: src/app/page.tsx (Server Component)                    │
│  ├─ Fetches all Pokémon from database via Prisma             │
│  ├─ Passes data to ClientGrid component                      │
│  └─ Renders: <ClientGrid pokemon={allPokemon} />             │
│                                                                │
│       ↓                                                        │
│                                                                │
│  Component: ClientGrid (Client Component)                     │
│  File: src/components/ClientGrid.tsx                          │
│  ├─ useState for search query & type filter                  │
│  ├─ useMemo to filter Pokémon based on search/type           │
│  ├─ Renders: <SearchBar /> + <TypeChip /> + <PokemonCard />  │
│  └─ User can search/filter interactively                     │
│                                                                │
│       ↓ (User clicks a Pokémon card)                          │
│                                                                │
│  Route: /pokemon/[slug]                                       │
│  File: src/app/pokemon/[slug]/page.tsx (Server Component)    │
│  ├─ Fetches single Pokémon + abilities + evolution chain     │
│  ├─ Passes data to detail page components                    │
│  └─ Renders:                                                  │
│      ├─ <HeroSection /> (sprite, name, types)                │
│      ├─ <MetaCard /> (types, tier)                           │
│      ├─ <AbilitiesCard /> (abilities list)                   │
│      ├─ <EvolutionCard /> (evolution chain)                  │
│      ├─ <StatsCard /> (HP, Attack, Defense...)               │
│      └─ <TypeEffectivenessCard /> (weaknesses/resistances)   │
│                                                                │
└──────────────────────────────────────────────────────────────┘
```

---

## 📄 Key Files Explained

### **1. `prisma/schema.prisma`** - Database Schema
**Purpose:** Defines what data we store and how it's structured.

**Key Models:**
- **`Pokemon`** - Main Pokémon data (name, types, stats, lore)
- **`EvolutionChain`** - Groups Pokémon that evolve together
- **`EvolutionStage`** - Links Pokémon to their evolution chain
- **`Ability`** - Pokémon abilities (Overgrow, Torrent, etc.)
- **`PokemonAbility`** - Join table linking Pokémon to abilities

**Relationships:**
```
Pokemon ←──→ EvolutionStage ←──→ EvolutionChain
   ↓
PokemonAbility ←──→ Ability
```

---

### **2. `prisma/seed.ts`** - Database Seeding
**Purpose:** Populates the database with all 151 Kanto Pokémon.

**What it does:**
1. **`seedPokemon()`** - Creates all 151 Pokémon with stats
2. **`seedEvolutionChains()`** - Creates evolution relationships
3. **`seedAbilities()`** - Creates ability records
4. **`linkPokemonAbilities()`** - Links Pokémon to their abilities

**Data Sources:**
- Imports from `src/lib/starters.ts` (basic Pokémon data)
- Contains `BASE_STATS` object (HP, Attack, Defense, etc.)
- Contains `LORE` object (summaries and descriptions)
- Contains `EVOLUTION_GROUPS` array (evolution chains)
- Contains `POKEMON_ABILITIES` object (ability mappings)
- Contains `ABILITY_INFO` object (ability descriptions)

**Run it:** `npm run seed` or `npx prisma db seed`

---

### **3. `src/lib/starters.ts`** - Static Pokémon Data
**Purpose:** Provides basic Pokémon data and sprite URL generation.

**Key Exports:**
- **`POKEDEX`** - Array of 151 Pokémon with `id`, `name`, `displayName`, `types`
- **`spriteUrls()`** - Function that generates sprite URLs for a Pokémon

**Example:**
```typescript
spriteUrls(1) // Bulbasaur
// Returns:
{
  animated: "https://raw.githubusercontent.com/.../1.gif",
  fallback: "https://raw.githubusercontent.com/.../1.png",
  animatedShiny: "https://raw.githubusercontent.com/.../shiny/1.gif",
  fallbackShiny: "https://raw.githubusercontent.com/.../shiny/1.png"
}
```

---

### **4. `src/lib/prisma.ts`** - Prisma Client Singleton
**Purpose:** Creates a single Prisma client instance for the entire app.

**Why?** In development, Next.js hot-reloads code frequently. Without this singleton pattern, you'd create dozens of database connections and hit connection limits.

**Usage:**
```typescript
import { prisma } from "@/lib/prisma";
const pokemon = await prisma.pokemon.findMany();
```

---

### **5. `src/app/page.tsx`** - Home Page (Main Grid)
**Purpose:** The main landing page showing all Pokémon.

**How it works:**
1. **Server Component** - Runs on the server
2. Fetches all Pokémon from database via Prisma
3. Passes data to `<ClientGrid />` component
4. Client component handles search/filter interactivity

**Why split Server/Client?**
- **Server Component** = Fast initial load, SEO-friendly
- **Client Component** = Interactive (search, filter, state)

---

### **6. `src/components/ClientGrid.tsx`** - Interactive Grid
**Purpose:** Handles search, filtering, and displays Pokémon cards.

**State Management:**
- `query` - Search input text
- `selectedType` - Currently selected type filter

**Filtering Logic:**
```typescript
const filtered = useMemo(() => {
  return allPokemon.filter(pokemon => {
    // Filter by type
    if (selectedType !== "all" && !pokemon.types.includes(selectedType)) {
      return false;
    }
    // Filter by search query
    if (query && !pokemon.displayName.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }
    return true;
  });
}, [allPokemon, selectedType, query]);
```

---

### **7. `src/app/pokemon/[slug]/page.tsx`** - Detail Page
**Purpose:** Shows detailed information for a single Pokémon.

**Dynamic Route:** `[slug]` means this page handles any URL like `/pokemon/bulbasaur`, `/pokemon/charizard`, etc.

**Data Fetching:**
```typescript
const pokemon = await prisma.pokemon.findUnique({
  where: { slug },
  select: {
    // All Pokémon fields
    abilities: { /* ... */ },
    evolutionStage: {
      include: {
        chain: {
          include: {
            stages: { /* ... */ }
          }
        }
      }
    }
  }
});
```

**Static Generation:** `generateStaticParams()` pre-renders all 151 Pokémon pages at build time for instant loading.

---

### **8. Component Breakdown (Detail Page)**

#### **`HeroSection.tsx`**
- Displays main sprite (with shiny toggle)
- Shows Pokémon name, number, types
- Handles animated sprites

#### **`MetaCard.tsx`**
- Shows types and tier
- Simple info card

#### **`AbilitiesCard.tsx`**
- Lists Pokémon abilities
- Shows "Hidden" badge for hidden abilities

#### **`EvolutionCard.tsx`**
- Displays evolution chain
- Clickable sprites/names to navigate

#### **`StatsCard.tsx`**
- Shows base stats (HP, Attack, Defense, etc.)
- Type-colored progress bars
- Total stat calculation

#### **`TypeEffectivenessCard.tsx`**
- Calculates type matchups
- Shows 4×, 2×, ½×, ¼×, 0× multipliers
- Handles dual-type calculations

---

### **9. `src/components/PokemonCard.tsx`** - Grid Card
**Purpose:** Individual Pokémon card on the main page.

**Features:**
- Displays sprite, name, number, types
- Clickable → navigates to detail page
- Hover effects

---

### **10. `src/components/AnimatedSprite.tsx`** - Sprite Component
**Purpose:** Displays Pokémon sprites with animation and shiny toggle.

**Features:**
- Tries to load animated GIF first
- Falls back to PNG if GIF fails
- Handles shiny toggle on detail page
- Click to toggle between normal/shiny

---

## 🔗 How Everything Connects

### **Full User Journey:**

```
1. User visits website (/)
   ↓
2. src/app/page.tsx (Server Component)
   ├─ Queries database via Prisma
   ├─ Gets all 151 Pokémon
   └─ Passes to ClientGrid
   ↓
3. src/components/ClientGrid.tsx (Client Component)
   ├─ Renders SearchBar
   ├─ Renders TypeChip filters
   ├─ Filters Pokémon based on user input
   └─ Maps filtered Pokémon to PokemonCard components
   ↓
4. User clicks a PokemonCard
   ↓
5. Next.js navigates to /pokemon/[slug]
   ↓
6. src/app/pokemon/[slug]/page.tsx (Server Component)
   ├─ Queries database for single Pokémon
   ├─ Includes abilities, evolution chain
   ├─ Passes data to detail components
   └─ Renders:
       ├─ HeroSection (sprite, name, types)
       ├─ MetaCard (types, tier)
       ├─ AbilitiesCard (abilities)
       ├─ EvolutionCard (evolution chain)
       ├─ StatsCard (base stats)
       └─ TypeEffectivenessCard (weaknesses/resistances)
   ↓
7. User clicks evolution sprite
   ↓
8. Navigates to /pokemon/[new-slug]
   (Cycle repeats from step 6)
```

---

### **Data Flow Diagram:**

```
┌─────────────────────────────────────────────────────────────┐
│                   PostgreSQL Database (Neon)                 │
│  151 Pokémon + Abilities + Evolution Chains                 │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ Prisma ORM
                     │
┌────────────────────▼────────────────────────────────────────┐
│              Next.js Server Components                       │
│  ├─ src/app/page.tsx (fetches all Pokémon)                 │
│  └─ src/app/pokemon/[slug]/page.tsx (fetches one Pokémon)  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ Props
                     │
┌────────────────────▼────────────────────────────────────────┐
│              React Client Components                         │
│  ├─ ClientGrid (search/filter logic)                       │
│  ├─ PokemonCard (display card)                             │
│  ├─ HeroSection (detail page hero)                         │
│  ├─ StatsCard (base stats)                                 │
│  ├─ AbilitiesCard (abilities)                              │
│  ├─ EvolutionCard (evolution chain)                        │
│  └─ TypeEffectivenessCard (type matchups)                  │
└─────────────────────────────────────────────────────────────┘
                     │
                     │ Rendered HTML/CSS
                     │
┌────────────────────▼────────────────────────────────────────┐
│                    User's Browser                            │
│  Beautiful, interactive Pokédex UI                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Key Concepts

### **Server Components vs Client Components**

**Server Components** (default in Next.js 15):
- Run on the server
- Can directly query database
- No JavaScript sent to browser
- Great for data fetching
- Examples: `page.tsx` files

**Client Components** (marked with `"use client"`):
- Run in the browser
- Can use React hooks (`useState`, `useEffect`)
- Interactive (clicks, inputs, state)
- Examples: `ClientGrid.tsx`, `AnimatedSprite.tsx`

---

### **Static Generation (`generateStaticParams`)**

Next.js pre-renders all 151 Pokémon detail pages at build time:

```typescript
export async function generateStaticParams() {
  const pokemon = await prisma.pokemon.findMany({ select: { slug: true } });
  return pokemon.map(({ slug }) => ({ slug }));
}
```

**Result:** Instant page loads! No database query needed when user visits a Pokémon page.

---

### **Prisma Relations**

Prisma automatically handles database relationships:

```typescript
// Get Pokémon with all related data
const pokemon = await prisma.pokemon.findUnique({
  where: { slug: "bulbasaur" },
  include: {
    abilities: { include: { ability: true } },
    evolutionStage: { include: { chain: { include: { stages: true } } } }
  }
});
```

**Behind the scenes:** Prisma executes SQL JOINs to fetch related data efficiently.

---

## 🎯 Summary

**Your Pokédex is a full-stack application that:**

1. **Stores data** in PostgreSQL (Neon) via Prisma ORM
2. **Fetches data** using Next.js Server Components
3. **Displays data** using React Client Components
4. **Styles UI** with Tailwind CSS
5. **Deploys** automatically to Vercel via GitHub

**The beauty of this architecture:**
- ✅ **Fast** - Static generation + server components
- ✅ **Type-safe** - TypeScript + Prisma
- ✅ **Scalable** - PostgreSQL + Vercel
- ✅ **Maintainable** - Clear separation of concerns
- ✅ **Modern** - Latest Next.js 15 + React 19

---

**Questions?** Ask me about any specific file or concept! 🚀
