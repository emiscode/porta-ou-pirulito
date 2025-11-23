"use client";

import { useRef, useCallback } from "react";

type SoundType = "background" | "correct" | "wrong" | "win" | "lose";

export function useSound() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null);
  const backgroundGainRef = useRef<GainNode | null>(null);
  const backgroundOscillatorsRef = useRef<OscillatorNode[]>([]);
  const backgroundIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback((frequency: number, duration: number, type: "sine" | "square" | "triangle" = "sine") => {
    try {
      const audioContext = getAudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      console.warn("Erro ao reproduzir som:", error);
    }
  }, [getAudioContext]);

  const playSound = useCallback((type: SoundType) => {
    try {
      const audioContext = getAudioContext();

      switch (type) {
        case "correct":
          // Som agradável para acerto (nota alta e curta)
          playTone(800, 0.1, "sine");
          setTimeout(() => playTone(1000, 0.1, "sine"), 50);
          break;

        case "wrong":
          // Som de erro (nota baixa e desagradável)
          playTone(200, 0.3, "square");
          break;

        case "win":
          // Sequência de notas alegres para vitória
          playTone(523, 0.15, "sine"); // C
          setTimeout(() => playTone(659, 0.15, "sine"), 150); // E
          setTimeout(() => playTone(784, 0.15, "sine"), 300); // G
          setTimeout(() => playTone(1047, 0.3, "sine"), 450); // C alto
          break;

        case "lose":
          // Som triste para derrota (notas descendentes)
          playTone(440, 0.2, "sine"); // A
          setTimeout(() => playTone(392, 0.2, "sine"), 200); // G
          setTimeout(() => playTone(349, 0.4, "sine"), 400); // F
          break;

        default:
          break;
      }
    } catch (error) {
      console.warn("Erro ao reproduzir som:", error);
    }
  }, [playTone, getAudioContext]);

  const startBackgroundMusic = useCallback(() => {
    try {
      const audioContext = getAudioContext();
      
      // Cria um som de fundo suave e repetitivo que toca em loop
      const createBackgroundTone = () => {
        if (!backgroundGainRef.current) return; // Para se foi solicitado parar
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Nota suave e baixa
        oscillator.frequency.value = 220; // Lá (A3)
        oscillator.type = "sine";
        gainNode.gain.value = 0.05; // Volume muito baixo para não incomodar

        const startTime = audioContext.currentTime;
        oscillator.start(startTime);
        
        // Para após 4 segundos e reinicia
        oscillator.stop(startTime + 4);
        
        oscillator.onended = () => {
          // Reinicia o som após um pequeno intervalo
          if (backgroundGainRef.current) {
            setTimeout(() => {
              if (backgroundGainRef.current) {
                createBackgroundTone();
              }
            }, 500);
          }
        };

        backgroundOscillatorsRef.current.push(oscillator);
      };

      // Cria o gain node principal
      backgroundGainRef.current = audioContext.createGain();
      backgroundGainRef.current.connect(audioContext.destination);
      backgroundGainRef.current.gain.value = 1;

      // Inicia o primeiro ciclo
      createBackgroundTone();
    } catch (error) {
      console.warn("Erro ao iniciar música de fundo:", error);
    }
  }, [getAudioContext]);

  const stopBackgroundMusic = useCallback(() => {
    try {
      // Para todos os oscillators
      backgroundOscillatorsRef.current.forEach(osc => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (e) {
          // Ignora erros se já foi desconectado
        }
      });
      backgroundOscillatorsRef.current = [];

      // Limpa o intervalo se existir
      if (backgroundIntervalRef.current) {
        clearInterval(backgroundIntervalRef.current);
        backgroundIntervalRef.current = null;
      }

      // Desconecta o gain node
      if (backgroundGainRef.current) {
        backgroundGainRef.current.disconnect();
        backgroundGainRef.current = null;
      }
    } catch (error) {
      console.warn("Erro ao parar música de fundo:", error);
    }
  }, []);

  return {
    playSound,
    startBackgroundMusic,
    stopBackgroundMusic,
  };
}

