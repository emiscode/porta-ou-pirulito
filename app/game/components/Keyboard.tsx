"use client";

interface KeyboardProps {
  onLetraClick: (letra: string) => void;
  letrasUsadas: Set<string>;
  letrasAcertadas: Set<string>;
  disabled?: boolean;
}

// Layout para mobile (3 linhas)
const LINHA1_MOBILE = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
const LINHA2_MOBILE = ["J", "K", "L", "M", "N", "O", "P", "Q"];
const LINHA3_MOBILE = ["R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

// Layout para desktop (2 linhas)
const LINHA1_DESKTOP = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
const LINHA2_DESKTOP = ["N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

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
          w-12 h-12 sm:w-12 sm:h-12 md:w-12 md:h-12
          rounded-lg
          font-bold text-xl sm:text-xl md:text-xl
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
    <div className="flex flex-col gap-2 sm:gap-3 md:gap-3 max-w-2xl mx-auto my-6 px-2">
      {/* Layout mobile - 3 linhas */}
      <div className="flex flex-col gap-2 md:hidden">
        <div className="flex justify-center gap-2">
          {LINHA1_MOBILE.map(renderButton)}
        </div>
        <div className="flex justify-center gap-2">
          {LINHA2_MOBILE.map(renderButton)}
        </div>
        <div className="flex justify-center gap-2">
          {LINHA3_MOBILE.map(renderButton)}
        </div>
      </div>
      
      {/* Layout desktop - 2 linhas */}
      <div className="hidden md:flex flex-col gap-3">
        <div className="flex justify-center gap-3">
          {LINHA1_DESKTOP.map(renderButton)}
        </div>
        <div className="flex justify-center gap-3">
          {LINHA2_DESKTOP.map(renderButton)}
        </div>
      </div>
    </div>
  );
}
