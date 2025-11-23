"use client";

import { useState, useEffect, useCallback } from "react";
import { selecionarPalavraAleatoria, calcularErrosMaximos, type Categoria } from "@/lib/game-constants";
import WordDisplay from "./components/WordDisplay";
import Keyboard from "./components/Keyboard";
import Door from "./components/Door";
import Girl from "./components/Girl";
import Lollipop from "./components/Lollipop";
import ProgressBar from "./components/ProgressBar";
import ModalWin from "./components/ModalWin";
import ModalLose from "./components/ModalLose";
import { Button } from "@/components/ui/button";

type EstadoJogo = "jogando" | "vitoria" | "derrota";

export default function GamePage() {
  const [palavraSelecionada, setPalavraSelecionada] = useState("");
  const [categoria, setCategoria] = useState<Categoria>("fruta");
  const [letrasAcertadas, setLetrasAcertadas] = useState<Set<string>>(new Set());
  const [letrasErradas, setLetrasErradas] = useState<Set<string>>(new Set());
  const [errosMaximos, setErrosMaximos] = useState(0);
  const [estadoJogo, setEstadoJogo] = useState<EstadoJogo>("jogando");
  const [atravessou, setAtravessou] = useState(false);
  const [pirulitoPego, setPirulitoPego] = useState(false);

  const iniciarNovoJogo = useCallback(() => {
    const novaPalavra = selecionarPalavraAleatoria();
    setPalavraSelecionada(novaPalavra.palavra);
    setCategoria(novaPalavra.categoria);
    setLetrasAcertadas(new Set());
    setLetrasErradas(new Set());
    setErrosMaximos(calcularErrosMaximos(novaPalavra.palavra));
    setEstadoJogo("jogando");
    setAtravessou(false);
    setPirulitoPego(false);
  }, []);

  useEffect(() => {
    iniciarNovoJogo();
  }, [iniciarNovoJogo]);

  const estadoPorta = estadoJogo === "vitoria" ? 0 : (letrasErradas.size / errosMaximos) * 100;

  const verificarLetra = (letra: string) => {
    if (estadoJogo !== "jogando") return;

    const letraLower = letra.toUpperCase();
    const palavraLower = palavraSelecionada.toUpperCase();

    // Verifica se a letra já foi usada
    if (letrasAcertadas.has(letraLower) || letrasErradas.has(letraLower)) {
      return;
    }

    // Verifica se a letra está na palavra
    if (palavraLower.includes(letraLower)) {
      setLetrasAcertadas((prev) => new Set([...prev, letraLower]));
    } else {
      setLetrasErradas((prev) => new Set([...prev, letraLower]));
    }
  };

  // Verifica vitória
  useEffect(() => {
    if (estadoJogo !== "jogando" || palavraSelecionada === "") return;

    const palavraLower = palavraSelecionada.toUpperCase();
    const letrasUnicas = new Set(
      palavraLower.split("").filter((l) => l !== " " && l !== "-")
    );

    const todasLetrasAcertadas = Array.from(letrasUnicas).every((letra) =>
      letrasAcertadas.has(letra)
    );

    if (todasLetrasAcertadas) {
      setEstadoJogo("vitoria");
      // Animações de vitória: porta abre, menina atravessa e pega o pirulito
      setTimeout(() => setAtravessou(true), 500);
      setTimeout(() => setPirulitoPego(true), 2000);
    }
  }, [letrasAcertadas, palavraSelecionada, estadoJogo]);

  // Verifica derrota
  useEffect(() => {
    if (estadoJogo !== "jogando") return;

    if (letrasErradas.size >= errosMaximos) {
      setEstadoJogo("derrota");
    }
  }, [letrasErradas.size, errosMaximos, estadoJogo]);

  const letrasUsadas = new Set([...letrasAcertadas, ...letrasErradas]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
            PORTA OU PIRULITO
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            ADIVINHE A PALAVRA ANTES DA PORTA SE FECHAR!
          </p>
          <div className="mt-4">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold">
              {categoria === "fruta" ? "🍎 FRUTA" : "🐾 ANIMAL"}
            </span>
          </div>
        </div>

        {/* Porta com Menina e Pirulito */}
        <div className="mb-8 relative flex items-center justify-center">
          <div className="relative w-full max-w-md mx-auto">
            <Door estadoPorta={estadoPorta}>
              {/* Menina fica dentro e atrás da porta quando não atravessou */}
              {!atravessou && <Girl atravessou={atravessou} />}
            </Door>
            {/* Menina fora da porta quando atravessa */}
            {atravessou && (
              <div className="absolute top-1/2 right-0 transform translate-x-full translate-y-[-50%] ml-4 md:ml-8 z-10 pointer-events-none">
                <Girl atravessou={atravessou} />
              </div>
            )}
            {/* Pirulito fica do lado de fora da porta (à direita) */}
            {!pirulitoPego && (
              <div className="absolute top-1/2 right-0 transform translate-x-full translate-y-[-50%] ml-4 md:ml-8 z-10">
                <Lollipop foiPegado={pirulitoPego} />
              </div>
            )}
          </div>
        </div>

        {/* Barra de Progresso */}
        <ProgressBar errosAtuais={letrasErradas.size} errosMaximos={errosMaximos} />

        {/* Exibição da Palavra */}
        <WordDisplay palavra={palavraSelecionada} letrasAcertadas={letrasAcertadas} />

        {/* Teclado */}
        <Keyboard
          onLetraClick={verificarLetra}
          letrasUsadas={letrasUsadas}
          letrasAcertadas={letrasAcertadas}
          disabled={estadoJogo !== "jogando"}
        />

        {/* Botão de Reiniciar */}
        <div className="text-center mt-8">
          <Button
            onClick={iniciarNovoJogo}
            variant="outline"
            size="lg"
            className="text-lg"
          >
            🔄 NOVO JOGO
          </Button>
        </div>

        {/* Modais */}
        <ModalWin
          aberto={estadoJogo === "vitoria"}
          palavra={palavraSelecionada}
          onReiniciar={iniciarNovoJogo}
        />
        <ModalLose
          aberto={estadoJogo === "derrota"}
          palavra={palavraSelecionada}
          onReiniciar={iniciarNovoJogo}
        />
      </div>
    </div>
  );
}
