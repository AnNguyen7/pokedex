// AnN added: Sprite URL helper on 10/11/2025
// AnN updated: Animated sprites (Showdown + PokeAPI Gen V) on 10/12/2025

export function spriteUrls(nationalDex: number) {
  // Try multiple sources for best animated sprites
  // Showdown front sprites are animated GIFs, back to Gen V if needed

  return {
    normal: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${nationalDex}.png`,
    shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${nationalDex}.png`,
    // Using Showdown's DexGen animated sprites (front view, animated)
    animated: `https://play.pokemonshowdown.com/sprites/gen5ani/${nationalDex}.gif`,
    fallback: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${nationalDex}.gif`,
    animatedShiny: `https://play.pokemonshowdown.com/sprites/gen5ani-shiny/${nationalDex}.gif`,
    fallbackShiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/${nationalDex}.gif`,
  };
}
