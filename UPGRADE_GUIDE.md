# Pokémon Data Upgrade Guide - Gen 1 + Gen 2

This guide explains how to fetch and seed Pokémon data for Generations 1 and 2 (Pokémon #1-251).

## Overview

Your seed file was previously 1320 lines and 96KB. The new approach:
- ✅ **Automated** - Fetches data from PokeAPI
- ✅ **Clean** - Seed logic is separate from data
- ✅ **Maintainable** - Easy to add more generations
- ✅ **Complete** - Includes all stats, abilities, sprites, lore

## New Structure

```
prisma/
├── data/                          # JSON data files (auto-generated)
│   ├── pokemon.json              # Basic info (id, name, types)
│   ├── stats.json                # Base stats
│   ├── species.json              # Height, weight, species
│   ├── evYields.json             # EV training yields
│   ├── pokemonAbilities.json     # Pokémon → Abilities mapping
│   ├── abilities.json            # Ability descriptions
│   ├── evolutionChains.json      # Evolution data
│   └── lore.json                 # Descriptions
├── seed-new.ts                    # New optimized seeder (reads JSON)
└── seed.ts                        # Old seeder (backup)

scripts/
└── fetch-pokemon-data.ts          # Fetches data from PokeAPI
```

## Step-by-Step Instructions

### Step 1: Fetch Data from PokeAPI

This will take ~30-40 minutes (rate-limited to be nice to PokeAPI).

```bash
npm run fetch-data
```

**What it does:**
- Fetches Pokémon #1-251 from PokeAPI
- Includes: stats, abilities, sprites, descriptions, evolutions
- Generates JSON files in `prisma/data/`
- Shows progress for each Pokémon

**Output:**
```
🚀 Fetching data for Pokémon 1-251 from PokeAPI...
✅ Fetched Bulbasaur (#1)
✅ Fetched Ivysaur (#2)
...
✅ Fetched Celebi (#251)
💾 Saving data to JSON files...
🎉 Data fetch complete!
```

### Step 2: Seed the Database

Once the JSON files are generated:

```bash
npm run db:seed
```

**What it does:**
- Reads JSON files from `prisma/data/`
- Upserts Pokémon (updates existing, creates new)
- Seeds abilities
- Links Pokémon to abilities
- Creates evolution chains

**Output:**
```
🌟 Starting database seed...
🎮 Seeding Pokémon...
✅ Seeded 251 Pokémon
🔗 Seeding evolution chains...
✅ Seeded evolution chains
🎯 Seeding abilities...
✅ Seeded abilities
🔗 Linking Pokémon to abilities...
✅ Linked Pokémon to abilities
✨ Seed completed successfully!
```

## What's Included

### Gen 1 (Pokémon #1-151)
- Kanto region from FireRed/LeafGreen
- All original 151 Pokémon
- Complete stats, abilities, evolutions

### Gen 2 (Pokémon #152-251)
- Johto region from Gold/Silver/Crystal
- Includes: Chikorita, Cyndaquil, Totodile lines
- Dark and Steel types
- New evolutions for Gen 1 Pokémon (Crobat, Steelix, etc.)
- Legendary beasts, Ho-Oh, Lugia, Celebi

## Data Fields

Each Pokémon includes:
- ✅ National Dex number
- ✅ Name and display name
- ✅ Types (primary and secondary)
- ✅ Base stats (HP, Attack, Defense, Sp. Atk, Sp. Def, Speed)
- ✅ Species name (e.g., "Seed Pokémon")
- ✅ Height (meters) and Weight (kg)
- ✅ Catch rate
- ✅ EV yields
- ✅ Abilities (including hidden abilities)
- ✅ Sprite URLs (normal, shiny, animated)
- ✅ Flavor text descriptions
- ✅ Evolution chains

## Troubleshooting

### "Failed to fetch Pokémon #X"
- PokeAPI might be slow or rate-limiting
- The script will continue with other Pokémon
- You can re-run `npm run fetch-data` - it will update all data

### "Pokémon not found for evolution chain"
- Some evolution chains might reference Pokémon outside Gen 1-2
- The script skips these and warns you
- This is normal and expected

### Want to fetch more generations?
Edit `scripts/fetch-pokemon-data.ts` and change:
```typescript
const MAX_POKEMON = 251; // Change to 386 for Gen 3, 493 for Gen 4, etc.
```

## Backup Your Old Seed

Your original seed file is preserved as `prisma/seed.ts`. You can still run it with:
```bash
npm run db:seed-old
```

## Next Steps

After seeding:
1. **Update UI** - Your app will now show Gen 1 + Gen 2 Pokémon
2. **Update copy** - Change "151 Pokémon" to "251 Pokémon" in marketing text
3. **Test** - Browse the Pokédex and check that Gen 2 Pokémon appear
4. **Deploy** - Push changes and redeploy

## Benefits of This Approach

1. **Maintainable**: Seed logic is ~300 lines, data is in JSON
2. **Extensible**: Easy to add Gen 3, 4, 5... just change `MAX_POKEMON`
3. **Accurate**: Data comes directly from PokeAPI (community-maintained)
4. **Fast seeding**: Reading JSON is much faster than embedding 1300+ lines
5. **Version control friendly**: Can `.gitignore` large JSON files if needed

## Questions?

- PokeAPI docs: https://pokeapi.co/docs/v2
- Your data is in: `prisma/data/*.json`
- Seed logic: `prisma/seed-new.ts`
- Fetcher script: `scripts/fetch-pokemon-data.ts`
