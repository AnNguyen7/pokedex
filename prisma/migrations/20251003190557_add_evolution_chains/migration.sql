-- CreateTable
CREATE TABLE "EvolutionChain" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EvolutionChain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvolutionStage" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "chainId" INTEGER NOT NULL,
    "pokemonId" INTEGER NOT NULL,

    CONSTRAINT "EvolutionStage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EvolutionChain_slug_key" ON "EvolutionChain"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "EvolutionStage_chainId_order_key" ON "EvolutionStage"("chainId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "EvolutionStage_pokemonId_key" ON "EvolutionStage"("pokemonId");

-- AddForeignKey
ALTER TABLE "EvolutionStage" ADD CONSTRAINT "EvolutionStage_chainId_fkey" FOREIGN KEY ("chainId") REFERENCES "EvolutionChain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvolutionStage" ADD CONSTRAINT "EvolutionStage_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
