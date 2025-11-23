"use client";

interface GirlProps {
  atravessou: boolean;
}

export default function Girl({ atravessou }: GirlProps) {
  return (
    <div
      className={`
        absolute bottom-4 z-10 transition-all duration-1000 ease-in-out
        ${atravessou ? "left-1/2" : "left-8"}
      `}
      style={{
        transform: atravessou ? "translateX(-50%)" : "translateX(0)",
      }}
    >
      {/* Cabeça */}
      <div className="w-12 h-12 bg-pink-300 rounded-full border-2 border-pink-400 relative mx-auto">
        {/* Cabelo */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-yellow-600 rounded-full" />
        {/* Olhos */}
        <div className="absolute top-3 left-3 w-2 h-2 bg-black rounded-full" />
        <div className="absolute top-3 right-3 w-2 h-2 bg-black rounded-full" />
        {/* Boca */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-4 h-2 border-2 border-pink-500 rounded-b-full" />
      </div>

      {/* Corpo */}
      <div className="w-10 h-16 bg-blue-400 rounded-t-lg mx-auto mt-1 relative">
        {/* Braços */}
        <div className="absolute left-0 top-2 w-3 h-8 bg-pink-300 rounded-full" />
        <div className="absolute right-0 top-2 w-3 h-8 bg-pink-300 rounded-full" />
        {/* Vestido */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-purple-400 rounded-b-lg" />
      </div>

      {/* Pernas */}
      <div className="flex gap-2 justify-center mt-1">
        <div className="w-3 h-8 bg-pink-300 rounded-full" />
        <div className="w-3 h-8 bg-pink-300 rounded-full" />
      </div>
    </div>
  );
}
