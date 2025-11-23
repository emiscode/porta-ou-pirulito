"use client";

interface KeyboardProps {
  onLetraClick: (letra: string) => void;
  letrasUsadas: Set<string>;
  letrasAcertadas: Set<string>;
  disabled?: boolean;
}

const LINHA1 = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
const LINHA2 = ["N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

export default function Keyboard({
  onLetraClick,
  letrasUsadas,
  letrasAcertadas,
  disabled = false,
}: KeyboardProps) {
  const getButtonClass = (letra: string) => {
    const letraLower = letra.toUpperCase();
    if (letrasAcertadas.has(letraLower)) {
      return "bg-green-500 text-white hover:bg-green-600";
    }
    if (letrasUsadas.has(letraLower)) {
      return "bg-red-500 text-white hover:bg-red-600 opacity-50 cursor-not-allowed";
    }
    return "bg-primary text-primary-foreground hover:bg-primary/90";
  };

  const renderButton = (letra: string) => {
    const letraLower = letra.toUpperCase();
    const isUsada = letrasUsadas.has(letraLower) || letrasAcertadas.has(letraLower);

    return (
      <button
        key={letra}
        onClick={() => !disabled && !isUsada && onLetraClick(letraLower)}
        disabled={disabled || isUsada}
        className={`
          w-10 h-10 md:w-12 md:h-12
          rounded-lg
          font-bold text-lg md:text-xl
          transition-all duration-200
          ${getButtonClass(letra)}
          ${isUsada ? "cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        {letra}
      </button>
    );
  };

  return (
    <div className="flex flex-col gap-2 md:gap-3 max-w-2xl mx-auto my-6">
      {/* Primeira linha */}
      <div className="flex justify-center gap-2 md:gap-3">
        {LINHA1.map(renderButton)}
      </div>
      {/* Segunda linha */}
      <div className="flex justify-center gap-2 md:gap-3">
        {LINHA2.map(renderButton)}
      </div>
    </div>
  );
}
