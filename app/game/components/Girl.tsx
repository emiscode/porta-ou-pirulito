"use client";

import Image from "next/image";

interface GirlProps {
  atravessou: boolean;
}

export default function Girl({ atravessou }: GirlProps) {
  return (
    <div
      className={`
        ${atravessou ? "relative" : "absolute bottom-4 left-8 z-10"}
        transition-transform duration-500
        ${atravessou ? "transform translate-x-0" : ""}
      `}
    >
      <div className="relative w-24 h-32 md:w-32 md:h-40">
        <Image
          src="/images/girl.jpg"
          alt="Menina"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
