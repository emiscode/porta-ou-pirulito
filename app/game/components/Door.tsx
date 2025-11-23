"use client";
import { ReactNode } from "react";

interface DoorProps {
  estadoPorta: number; // 0 a 100 (porcentagem de fechamento)
  children?: ReactNode;
}

export default function Door({ estadoPorta, children }: DoorProps) {
  const alturaPortaFechada = estadoPorta; // 0% = porta aberta, 100% = porta fechada

  return (
    <div className="relative w-full max-w-md mx-auto h-64 md:h-80 bg-gradient-to-b from-blue-200 to-blue-300 rounded-lg overflow-hidden shadow-lg">
      {/* Conteúdo atrás da porta (menina, pirulito, etc.) */}
      {children}
      
      {/* Porta (painel que fecha verticalmente de cima para baixo) */}
      <div
        className="absolute top-0 left-0 right-0 bg-amber-700/80 transition-all duration-500 ease-in-out shadow-inner z-20"
        style={{ height: `${alturaPortaFechada}%` }}
      >
        {/* Detalhes da porta */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-amber-600 rounded-full border-4 border-amber-800" />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-amber-800" />
      </div>

      {/* Moldura da porta (por último para ficar na frente) */}
      <div className="absolute inset-0 border-8 border-amber-800 rounded-lg z-30 pointer-events-none" />
    </div>
  );
}
