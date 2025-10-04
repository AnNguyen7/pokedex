"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  animatedSrc: string;
  fallbackSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

export default function AnimatedSprite({
  animatedSrc,
  fallbackSrc,
  alt,
  width,
  height,
  className,
}: Props) {
  const [src, setSrc] = useState(animatedSrc);

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      unoptimized
      onError={() => setSrc(fallbackSrc)}
      className={className}
    />
  );
}
