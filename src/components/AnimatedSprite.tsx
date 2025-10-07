"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  animatedSrc: string;
  fallbackSrc: string;
  animatedShinySrc?: string;
  fallbackShinySrc?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

/**
 * Displays Pokémon sprites with automatic fallback handling.
 * If shiny sprites are provided, clicking toggles between normal and shiny forms.
 * Falls back to static images if animated GIFs fail to load.
 */
export default function AnimatedSprite({
  animatedSrc,
  fallbackSrc,
  animatedShinySrc,
  fallbackShinySrc,
  alt,
  width,
  height,
  className,
}: Props) {
  const [src, setSrc] = useState(animatedSrc);
  const [isShiny, setIsShiny] = useState(false);

  const toggleShiny = () => {
    if (animatedShinySrc && fallbackShinySrc) {
      setIsShiny(!isShiny);
      setSrc(isShiny ? animatedSrc : animatedShinySrc);
    }
  };

  const handleError = () => {
    // If image fails to load, fall back to static PNG
    if (isShiny && fallbackShinySrc) {
      setSrc(fallbackShinySrc);
    } else {
      setSrc(fallbackSrc);
    }
  };

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      unoptimized
      onError={handleError}
      onClick={toggleShiny}
      className={`${className} ${animatedShinySrc && fallbackShinySrc ? 'cursor-pointer hover:scale-105' : ''} transition-transform`}
    />
  );
}
