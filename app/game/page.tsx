"use client";

import { useState, useEffect, useCallback } from "react";
import { selecionarPalavraAleatoria, calcularErrosMaximos, type Categoria } from "@/lib/game-constants";
import { useSound } from "@/lib/useSound";
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
  const { playSound, startBackgroundMusic, stopBackgroundMusic } = useSound();

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
    // Inicia música de fundo quando o componente é montado
    //startBackgroundMusic();
    
    // Limpa música de fundo quando o componente é desmontado
    return () => {
      stopBackgroundMusic();
    };
  }, [iniciarNovoJogo, startBackgroundMusic, stopBackgroundMusic]);

  const estadoPorta = 
    estadoJogo === "vitoria" 
      ? 0 
      : errosMaximos > 0 
        ? (letrasErradas.size / errosMaximos) * 100 
        : 0;

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
      playSound("correct");
    } else {
      setLetrasErradas((prev) => new Set([...prev, letraLower]));
      playSound("wrong");
    }
  };

  // Verifica vitória
  useEffect(() => {
    if (estadoJogo !== "jogando" || palavraSelecionada === "" || letrasAcertadas.size === 0) return;

    const palavraLower = palavraSelecionada.toUpperCase();
    const letrasUnicas = new Set(
      palavraLower.split("").filter((l) => l !== " " && l !== "-")
    );

    // Só verifica vitória se houver letras únicas na palavra
    if (letrasUnicas.size === 0) return;

    const todasLetrasAcertadas = Array.from(letrasUnicas).every((letra) =>
      letrasAcertadas.has(letra)
    );

    if (todasLetrasAcertadas) {
      setEstadoJogo("vitoria");
      playSound("win");
      // Animações de vitória: porta abre, menina atravessa e pega o pirulito
      setTimeout(() => setAtravessou(true), 500);
      setTimeout(() => setPirulitoPego(true), 2000);
    }
  }, [letrasAcertadas, palavraSelecionada, estadoJogo]);

  // Verifica derrota
  useEffect(() => {
    if (estadoJogo !== "jogando" || errosMaximos === 0) return;

    if (letrasErradas.size >= errosMaximos) {
      setEstadoJogo("derrota");
      playSound("lose");
    }
  }, [letrasErradas.size, errosMaximos, estadoJogo]);

  const letrasUsadas = new Set([...letrasAcertadas, ...letrasErradas]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-primary">
            PORTA OU PIRULITO
          </h1>
          <p className="text-md text-muted-foreground">
            ADIVINHE A PALAVRA ANTES DA PORTA SE FECHAR!
          </p>
        </div>

        {/* Porta com Menina e Pirulito */}
        <div className="mb-6 relative flex items-center justify-center">
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
            
              <div className="absolute top-1/2 right-0 transform translate-x-full translate-y-[-50%] ml-4 md:ml-8 z-10">
                <Lollipop foiPegado={pirulitoPego} />
              </div>
            
          </div>
        </div>

        {/* Barra de Progresso com Badge */}
        <ProgressBar 
          errosAtuais={letrasErradas.size} 
          errosMaximos={errosMaximos} 
          categoria={categoria}
        />

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
