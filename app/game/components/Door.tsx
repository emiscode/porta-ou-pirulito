"use client";

interface DoorProps {
  estadoPorta: number; // 0 a 100 (porcentagem de fechamento)
}

export default function Door({ estadoPorta }: DoorProps) {
  const larguraPorta = 100 - estadoPorta; // Inverte: 0% fechada = 100% aberta

  return (
    <div className="relative w-full max-w-md mx-auto h-64 md:h-80 bg-gradient-to-b from-blue-200 to-blue-300 rounded-lg overflow-hidden shadow-lg">
      {/* Moldura da porta */}
      <div className="absolute inset-0 border-8 border-amber-800 rounded-lg" />
      
      {/* Porta (painel que fecha) */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-amber-700 transition-all duration-500 ease-in-out shadow-inner"
        style={{ height: `${100 - larguraPorta}%` }}
      >
        {/* Detalhes da porta */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-amber-600 rounded-full border-4 border-amber-800" />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-amber-800" />
      </div>

      {/* Abertura da porta (o que fica visível) */}
      <div
        className="absolute top-0 left-0 right-0 bg-gradient-to-b from-blue-400 to-blue-500 transition-all duration-500 ease-in-out"
        style={{ height: `${larguraPorta}%` }}
      >
        {/* Padrão de luz através da porta */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-yellow-200 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
}
