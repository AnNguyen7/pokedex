# 🗄️ Database Relationships Explained

## 📚 Introduction to Relationships

In relational databases, we store data in **tables** (models) and connect them using **relationships**. This avoids data duplication and keeps everything organized.

---

## 🎯 Three Main Relationship Types in Your Project

### 1️⃣ **One-to-Many** (1:N)
One record can relate to many records.

### 2️⃣ **Many-to-Many** (M:N)
Many records can relate to many records.

### 3️⃣ **One-to-One** (1:1)
One record relates to exactly one record.

---

## 🔗 Your Project's Relationships

### **Relationship 1: Pokemon ↔ Ability (Many-to-Many)**

**Real-world scenario:**
- Bulbasaur can have **multiple abilities** (Overgrow, Chlorophyll)
- The "Overgrow" ability belongs to **multiple Pokémon** (Bulbasaur, Ivysaur, Venusaur, etc.)

**Problem:** You can't directly connect them because it would create duplication.

❌ **Bad Design (duplicating data):**
```
Pokemon Table:
| id | name      | ability1  | ability2    | ability3 |
|----|-----------|-----------|-------------|----------|
| 1  | Bulbasaur | Overgrow  | Chlorophyll | null     |
| 4  | Charmander| Blaze     | Solar Power | null     |
```

Problems:
- Wasted space (empty ability3, ability4, etc.)
- What if a Pokémon has 5 abilities?
- Ability descriptions duplicated everywhere

---

✅ **Good Design (using a join table):**

```
Pokemon Table:
| id | name       |
|----|------------|
| 1  | Bulbasaur  |
| 4  | Charmander |

Ability Table:
| id | name        | description                          |
|----|-------------|--------------------------------------|
| 1  | Overgrow    | Powers up Grass moves when HP is low |
| 2  | Chlorophyll | Doubles Speed in sunny weather       |
| 3  | Blaze       | Powers up Fire moves when HP is low  |

PokemonAbility Table (Join Table):
| id | pokemonId | abilityId | isHidden |
|----|-----------|-----------|----------|
| 1  | 1         | 1         | false    |  ← Bulbasaur has Overgrow
| 2  | 1         | 2         | true     |  ← Bulbasaur has Chlorophyll (hidden)
| 3  | 4         | 3         | false    |  ← Charmander has Blaze
```

**In your schema:**
```prisma
model Pokemon {
  id        Int              @id
  name      String
  abilities PokemonAbility[] // ← Can have many abilities
}

model Ability {
  id          Int              @id
  name        String
  description String
  pokemon     PokemonAbility[] // ← Can belong to many Pokémon
}

model PokemonAbility {
  // Join table connects Pokemon ↔ Ability
  pokemon   Pokemon @relation(fields: [pokemonId], references: [id])
  pokemonId Int
  ability   Ability @relation(fields: [abilityId], references: [id])
  abilityId Int
  isHidden  Boolean // ← Extra data specific to this relationship
}
```

**Key Concepts:**
- **Foreign Keys:** `pokemonId` and `abilityId` reference other tables
- **Join Table:** `PokemonAbility` exists only to connect Pokemon and Ability
- **Extra Data:** `isHidden` is specific to this relationship (not a property of Pokemon or Ability alone)

---

### **Relationship 2: Evolution Chain (Complex Hierarchy)**

**Real-world scenario:**
- Bulbasaur → Ivysaur → Venusaur (one evolution chain)
- Charmander → Charmeleon → Charizard (another evolution chain)
- Each Pokémon appears in exactly **one** evolution stage
- Each evolution chain has **multiple** stages

**This uses TWO relationships:**

#### A. **EvolutionChain ↔ EvolutionStage (One-to-Many)**

One chain has many stages:

```
EvolutionChain Table:
| id | slug             |
|----|------------------|
| 1  | bulbasaur-line   |
| 2  | charmander-line  |

EvolutionStage Table:
| id | chainId | order | pokemonId |
|----|---------|-------|-----------|
| 1  | 1       | 1     | 1         | ← Bulbasaur, stage 1 of chain 1
| 2  | 1       | 2     | 2         | ← Ivysaur, stage 2 of chain 1
| 3  | 1       | 3     | 3         | ← Venusaur, stage 3 of chain 1
| 4  | 2       | 1     | 4         | ← Charmander, stage 1 of chain 2
| 5  | 2       | 2     | 5         | ← Charmeleon, stage 2 of chain 2
| 6  | 2       | 3     | 6         | ← Charizard, stage 3 of chain 2
```

**In your schema:**
```prisma
model EvolutionChain {
  id     Int              @id
  slug   String
  stages EvolutionStage[] // ← One chain has many stages
}

model EvolutionStage {
  id      Int            @id
  order   Int            // ← Position in chain (1, 2, 3)
  chain   EvolutionChain @relation(fields: [chainId], references: [id])
  chainId Int            // ← Foreign key to EvolutionChain
}
```

#### B. **Pokemon ↔ EvolutionStage (One-to-One)**

Each Pokémon appears in exactly one stage:

```prisma
model Pokemon {
  id             Int             @id
  name           String
  evolutionStage EvolutionStage? // ← Optional: not all Pokémon evolve
}

model EvolutionStage {
  pokemon   Pokemon @relation(fields: [pokemonId], references: [id])
  pokemonId Int     @unique // ← UNIQUE: each Pokémon only in one stage
}
```

**Why this design?**
- ✅ Each Pokémon knows its evolution stage
- ✅ Each stage knows its chain and order
- ✅ Easy to query: "Get all stages in Bulbasaur's chain"

---

## 🔑 Key Database Concepts

### 1. **Primary Key** (`@id`)
Unique identifier for each record.

```prisma
model Pokemon {
  id Int @id @default(autoincrement()) // ← Primary key
}
```

### 2. **Foreign Key** (`fields: [...], references: [...]`)
References another table's primary key.

```prisma
model PokemonAbility {
  pokemonId Int
  pokemon   Pokemon @relation(fields: [pokemonId], references: [id])
  //                                   ↑ foreign key  ↑ primary key
}
```

### 3. **Unique Constraint** (`@unique`)
Ensures no duplicates.

```prisma
model Pokemon {
  nationalDex Int    @unique // ← Only one Pokémon can have nationalDex = 1
  slug        String @unique // ← Only one Pokémon can have slug = "bulbasaur"
}
```

### 4. **Cascade Delete** (`onDelete: Cascade`)
When parent is deleted, children are automatically deleted.

```prisma
model PokemonAbility {
  pokemon   Pokemon @relation(fields: [pokemonId], references: [id], onDelete: Cascade)
  //                                                                   ↑
  // If Bulbasaur is deleted, all its PokemonAbility records are deleted too
}
```

---

## 📊 Visual Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         POKEMON TABLE                            │
│  id | nationalDex | name       | primaryType | secondaryType    │
│  1  | 1           | Bulbasaur  | GRASS       | POISON           │
│  4  | 4           | Charmander | FIRE        | null             │
└──┬────────────────────────────────────────────────────┬──────────┘
   │                                                     │
   │ One-to-Many                                         │ One-to-One
   │ (via PokemonAbility join table)                     │
   │                                                     ▼
   │                                           ┌─────────────────────┐
   │                                           │ EVOLUTION_STAGE     │
   │                                           │  id | pokemonId    │
   │                                           │  1  | 1            │
   │                                           └─────┬───────────────┘
   │                                                 │
   │                                                 │ Many-to-One
   │                                                 ▼
   │                                           ┌─────────────────────┐
   │                                           │ EVOLUTION_CHAIN     │
   │                                           │  id | slug          │
   │                                           │  1  | bulbasaur-line│
   │                                           └─────────────────────┘
   ▼
┌─────────────────────────────────────────────────────────────────┐
│                    POKEMON_ABILITY TABLE (Join)                  │
│  id | pokemonId | abilityId | isHidden                          │
│  1  | 1         | 1         | false      ← Bulbasaur + Overgrow │
│  2  | 1         | 2         | true       ← Bulbasaur + Chlorophyll│
└──────────┬──────────────────────────────────────────────────────┘
           │ Many-to-One
           ▼
┌─────────────────────────────────────────────────────────────────┐
│                         ABILITY TABLE                            │
│  id | name        | description                                 │
│  1  | Overgrow    | Powers up Grass moves when HP is low        │
│  2  | Chlorophyll | Doubles Speed in sunny weather              │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎓 Why These Are Classes (Models)

### ✅ **Ability is a Class because:**
1. Has its own **unique data** (name, description)
2. Has **multiple properties**
3. Can be **reused** by many Pokémon (Overgrow for Bulbasaur, Ivysaur, Venusaur)
4. Needs **its own table** to avoid duplication

### ✅ **EvolutionChain is a Class because:**
1. Represents a **complex relationship** (multiple stages)
2. Has **its own identifier** (slug)
3. Groups **multiple Pokémon** together
4. Needs **separate tables** to track order and relationships

### ❌ **Type is NOT a Class because:**
1. Just a **simple label** (string value)
2. No **additional data** needed
3. No **relationships** to manage
4. Using an `enum` is simpler and more efficient

---

## 💡 Real-World Query Examples

### **Query 1: Get Bulbasaur with all abilities**

```typescript
const bulbasaur = await prisma.pokemon.findUnique({
  where: { slug: "bulbasaur" },
  include: {
    abilities: {
      include: {
        ability: true
      }
    }
  }
});

// Result:
{
  id: 1,
  name: "Bulbasaur",
  abilities: [
    {
      isHidden: false,
      ability: {
        name: "Overgrow",
        description: "Powers up Grass moves when HP is low"
      }
    },
    {
      isHidden: true,
      ability: {
        name: "Chlorophyll",
        description: "Doubles Speed in sunny weather"
      }
    }
  ]
}
```

**Behind the scenes SQL:**
```sql
-- Joins three tables!
SELECT 
  Pokemon.*,
  PokemonAbility.*,
  Ability.*
FROM Pokemon
LEFT JOIN PokemonAbility ON Pokemon.id = PokemonAbility.pokemonId
LEFT JOIN Ability ON PokemonAbility.abilityId = Ability.id
WHERE Pokemon.slug = 'bulbasaur';
```

### **Query 2: Get evolution chain for Bulbasaur**

```typescript
const evolution = await prisma.pokemon.findUnique({
  where: { slug: "bulbasaur" },
  include: {
    evolutionStage: {
      include: {
        chain: {
          include: {
            stages: {
              include: {
                pokemon: true
              }
            }
          }
        }
      }
    }
  }
});

// Result:
{
  name: "Bulbasaur",
  evolutionStage: {
    order: 1,
    chain: {
      slug: "bulbasaur-line",
      stages: [
        { order: 1, pokemon: { name: "Bulbasaur" } },
        { order: 2, pokemon: { name: "Ivysaur" } },
        { order: 3, pokemon: { name: "Venusaur" } }
      ]
    }
  }
}
```

---

## 🎯 Summary: When to Use Classes (Models)

| Scenario | Use Class/Model? | Why |
|----------|------------------|-----|
| **Simple label** (Fire, Water) | ❌ No (use enum) | No relationships, no extra data |
| **Reusable data** (Abilities) | ✅ Yes | Avoid duplication, many-to-many |
| **Complex relationships** (Evolution) | ✅ Yes | Hierarchy, ordering, multiple connections |
| **Extra metadata** (isHidden) | ✅ Yes (join table) | Data specific to the relationship |

---

## 📚 Learning Resources

If you want to learn more about database design:

1. **Normalization** - How to organize data efficiently
2. **ACID Properties** - Transaction safety
3. **Indexing** - Making queries faster
4. **SQL Joins** - How relationships work under the hood

Your Pokédex uses **Third Normal Form (3NF)** - a well-normalized design that avoids data duplication while maintaining flexibility!

---

**Questions?** This is the foundation of relational database design. Understanding these concepts will help you design any database system! 🚀
