"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import type { CSSProperties } from "react";

type Props = {
  animatedSrc: string;
  fallbackSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Displays Pokémon sprites with automatic fallback handling.
 * Falls back to static images if animated GIFs fail to load.
 * Responds to changes in animatedSrc prop (e.g., when parent toggles shiny).
 * AnN updated: Added style prop for pixelated rendering on 10/12/2025
 */
export default function AnimatedSprite({
  animatedSrc,
  fallbackSrc,
  alt,
  width,
  height,
  className,
  style,
}: Props) {
  const [src, setSrc] = useState(animatedSrc);
  const [hasErrored, setHasErrored] = useState(false);

  // Update src when animatedSrc prop changes (e.g., shiny toggle)
  useEffect(() => {
    setSrc(animatedSrc);
    setHasErrored(false);
  }, [animatedSrc]);

  const handleError = () => {
    // If image fails to load, fall back to static PNG
    if (!hasErrored) {
      setSrc(fallbackSrc);
      setHasErrored(true);
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
      className={className}
      style={style}
    />
  );
}
