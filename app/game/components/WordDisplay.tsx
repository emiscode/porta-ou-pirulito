"use client";

import { normalizarLetra } from "@/lib/utils";

interface WordDisplayProps {
  palavra: string;
  letrasAcertadas: Set<string>;
}

export default function WordDisplay({ palavra, letrasAcertadas }: WordDisplayProps) {
  const exibirLetra = (letra: string) => {
    // Normaliza a letra para verificar se foi acertada
    const letraNormalizada = normalizarLetra(letra);
    return letrasAcertadas.has(letraNormalizada) ? letra : "_";
  };

  return (
    <div className="flex justify-center items-center gap-2 md:gap-3 flex-wrap my-2">
      {palavra.split("").map((letra, index) => {
        const isEspaco = letra === " " || letra === "-";
        const letraExibida = isEspaco ? letra : exibirLetra(letra);
        const letraNormalizada = normalizarLetra(letra);
        const foiAcertada = letrasAcertadas.has(letraNormalizada);

        return (
          <div
            key={index}
            className={`
              w-10 h-12 md:w-12 md:h-14
              flex items-center justify-center
              text-2xl md:text-3xl font-bold
              border-b-4 border-primary
              transition-all duration-300
              ${foiAcertada ? "text-primary" : "text-muted-foreground"}
            `}
          >
            {letraExibida.toUpperCase()}
          </div>
        );
      })}
    </div>
  );
}
