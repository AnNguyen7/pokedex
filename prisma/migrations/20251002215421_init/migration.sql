-- CreateEnum
CREATE TYPE "PokemonType" AS ENUM ('BUG', 'FIRE', 'FLYING', 'GRASS', 'NORMAL', 'POISON', 'WATER');

-- CreateTable
CREATE TABLE "Pokemon" (
    "id" SERIAL NOT NULL,
    "nationalDex" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "primaryType" "PokemonType" NOT NULL,
    "secondaryType" "PokemonType",
    "spriteUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_nationalDex_key" ON "Pokemon"("nationalDex");

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_slug_key" ON "Pokemon"("slug");
