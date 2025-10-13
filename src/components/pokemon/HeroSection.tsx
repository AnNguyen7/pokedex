"use client";

// AnN updated: Toggle sprite with cry sound on 10/11/2025

import { useState, useRef, useEffect } from "react";
import type { PokemonTypeName } from "@/types/pokemon";
import Link from "next/link";
import AnimatedSprite from "@/components/AnimatedSprite";
import { TYPE_BADGE_STYLES } from "@/components/pokemon/typeStyles";

const formatDexNumber = (dex: number) => `#${dex.toString().padStart(3, "0")}`;

type SpriteSources = {
  animated: string;
  fallback: string;
  animatedShiny?: string;
  fallbackShiny?: string;
};

type Props = {
  displayName: string;
  nationalDex: number;
  types: PokemonTypeName[];
  sprites: SpriteSources;
  cryUrl?: string | null;
  // AnN added: MetaCard info on 10/12/2025
  species?: string | null;
  heightM?: number | null;
  weightKg?: number | null;
};

export default function HeroSection({ displayName, nationalDex, types, sprites, cryUrl, species, heightM, weightKg }: Props) {
  const [isShiny, setIsShiny] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // AnN added: Format helper functions on 10/12/2025
  const formatHeight = (m: number) => {
    const totalInches = m * 39.3701;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return `${m.toFixed(1)} m (${feet}′${inches.toString().padStart(2, '0')}″)`;
  };

  const formatWeight = (kg: number) => {
    const lbs = (kg * 2.20462).toFixed(1);
    return `${kg.toFixed(1)} kg (${lbs} lbs)`;
  };

  // Preload shiny sprites to reduce flicker during toggle
  useEffect(() => {
    const preloadSources = [
      sprites.animatedShiny,
      sprites.fallbackShiny,
      sprites.animated,
      sprites.fallback,
    ].filter((src): src is string => Boolean(src));

    preloadSources.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [sprites]);

  // Ensure audio element is ready when cry URL changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.15;
      audioRef.current.load();
    }
  }, [cryUrl]);

  const handleClick = () => {
    // Toggle shiny state
    setIsShiny(prev => !prev);

    // Play cry sound if available
    if (cryUrl && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.12; // Set volume before playing
      audioRef.current
        .play()
        .catch(error => {
          console.error("Failed to play cry:", error);
        });
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 md:flex-row md:items-end md:gap-10">
      {/* Sprite container - AnN updated: made bigger on 10/12/2025 */}
      <button
        onClick={handleClick}
        className={`group relative flex h-64 w-64 flex-shrink-0 items-center justify-center rounded-3xl border shadow-inner transition-all duration-300 hover:shadow-lg ${
          isShiny
            ? "border-lime-200 bg-lime-50/80 hover:border-lime-300"
            : "border-emerald-100 bg-emerald-50/80 hover:border-emerald-200"
        } cursor-pointer md:mx-0`}
        title={cryUrl ? "Click to toggle shiny & hear cry" : "Click to toggle shiny"}
      >
        <AnimatedSprite
          animatedSrc={isShiny ? (sprites.animatedShiny || sprites.animated) : sprites.animated}
          fallbackSrc={isShiny ? (sprites.fallbackShiny || sprites.fallback) : sprites.fallback}
          alt={isShiny ? `${displayName} shiny` : displayName}
          width={256}
          height={256}
          className="h-64 w-64 object-contain drop-shadow"
          style={{ imageRendering: 'pixelated' }}
        />
      </button>

      {/* Info section - AnN updated: added species/height/weight card on 10/12/2025 */}
      <div className="flex flex-col justify-end space-y-4 text-center md:flex-1 md:text-left md:h-64">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-400 transition-colors hover:text-emerald-500 md:tracking-[0.4em]">
            {formatDexNumber(nationalDex)}
          </p>
          <h1 className="text-3xl font-bold text-emerald-900 transition-colors hover:text-emerald-700 break-words md:text-4xl">
            {displayName}
          </h1>
          <div className="flex flex-wrap justify-center gap-3 md:justify-start">
            {types.map(type => (
              <Link
                key={type}
                href={`/?type=${type}`}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold capitalize shadow-sm transition-all duration-200 hover:scale-110 hover:shadow-md cursor-pointer ${
                  TYPE_BADGE_STYLES[type as keyof typeof TYPE_BADGE_STYLES] ?? "bg-emerald-100/80 text-emerald-700"
                }`}
              >
                {type}
              </Link>
            ))}
          </div>
        </div>

        {/* Species/Height/Weight info - AnN updated: removed border, left aligned on 10/12/2025 */}
        {(species || heightM !== null || weightKg !== null) && (
          <div className="space-y-2 text-sm">
            {species && (
              <div className="flex justify-center gap-2 md:justify-start">
                <span className="font-semibold text-emerald-600">Species:</span>
                <span className="text-emerald-800">{species}</span>
              </div>
            )}
            {heightM !== null && heightM !== undefined && (
              <div className="flex justify-center gap-2 md:justify-start">
                <span className="font-semibold text-emerald-600">Height:</span>
                <span className="text-emerald-800">{formatHeight(heightM)}</span>
              </div>
            )}
            {weightKg !== null && weightKg !== undefined && (
              <div className="flex justify-center gap-2 md:justify-start">
                <span className="font-semibold text-emerald-600">Weight:</span>
                <span className="text-emerald-800">{formatWeight(weightKg)}</span>
              </div>
            )}
          </div>
        )}
      </div>
      {cryUrl ? <audio ref={audioRef} src={cryUrl} preload="auto" className="hidden" /> : null}
    </div>
  );
}
