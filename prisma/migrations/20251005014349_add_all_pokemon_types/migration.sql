-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PokemonType" ADD VALUE 'DARK';
ALTER TYPE "PokemonType" ADD VALUE 'DRAGON';
ALTER TYPE "PokemonType" ADD VALUE 'ELECTRIC';
ALTER TYPE "PokemonType" ADD VALUE 'FAIRY';
ALTER TYPE "PokemonType" ADD VALUE 'FIGHTING';
ALTER TYPE "PokemonType" ADD VALUE 'GHOST';
ALTER TYPE "PokemonType" ADD VALUE 'GROUND';
ALTER TYPE "PokemonType" ADD VALUE 'ICE';
ALTER TYPE "PokemonType" ADD VALUE 'PSYCHIC';
ALTER TYPE "PokemonType" ADD VALUE 'ROCK';
ALTER TYPE "PokemonType" ADD VALUE 'STEEL';
