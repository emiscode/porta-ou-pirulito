"use client";

interface LollipopProps {
  foiPegado: boolean;
}

export default function Lollipop({ foiPegado }: LollipopProps) {
  if (foiPegado) {
    return null; // Não renderiza se já foi pego
  }

  return (
    <div className="absolute top-1/2 right-8 transform -translate-y-1/2 z-20">
      {/* Palito */}
      <div className="w-1 h-16 bg-amber-700 mx-auto" />
      
      {/* Pirulito */}
      <div className="w-16 h-16 bg-gradient-to-br from-pink-400 via-red-400 to-pink-500 rounded-full border-4 border-white shadow-lg relative animate-pulse">
        {/* Espirais decorativas */}
        <div className="absolute inset-2 border-2 border-white rounded-full opacity-50" />
        <div className="absolute inset-4 border-2 border-white rounded-full opacity-30" />
        {/* Brilho */}
        <div className="absolute top-2 left-2 w-4 h-4 bg-white rounded-full opacity-60" />
      </div>
    </div>
  );
}
