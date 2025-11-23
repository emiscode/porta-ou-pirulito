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
      <div className="relative w-28 h-36 md:w-36 md:h-48">
        <Image
          src="/images/girl.png"
          alt="Menina"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
