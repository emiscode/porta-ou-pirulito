"use client";

interface LollipopProps {
  foiPegado: boolean;
}

export default function Lollipop({ foiPegado }: LollipopProps) {
  

  return (
    <div className="relative">
      {/* Palito */}
      <div className="w-1 h-16 bg-amber-700 mx-auto" />
      
      {/* Pirulito */}
      <div className="w-16 h-16 bg-gradient-to-br from-pink-400 via-red-400 to-pink-500 rounded-full border-4 border-white shadow-lg relative">
        {/* Espirais decorativas */}
        <div className="absolute inset-2 border-2 border-white rounded-full opacity-50" />
        <div className="absolute inset-4 border-2 border-white rounded-full opacity-30" />
        {/* Brilho */}
        <div className="absolute top-2 left-2 w-4 h-4 bg-white rounded-full opacity-60" />
      </div>
    </div>
  );
}
