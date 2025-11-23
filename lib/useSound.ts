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
      
      // Melodia alegre e divertida para o jogo
      // Sequência de notas em escala maior (C, D, E, F, G, A, B, C)
      const melody = [
        { freq: 261.63, duration: 0.3 }, // C4
        { freq: 293.66, duration: 0.3 }, // D4
        { freq: 329.63, duration: 0.3 }, // E4
        { freq: 349.23, duration: 0.3 }, // F4
        { freq: 392.00, duration: 0.4 }, // G4 (mais longa)
        { freq: 440.00, duration: 0.3 }, // A4
        { freq: 493.88, duration: 0.3 }, // B4
        { freq: 523.25, duration: 0.5 }, // C5 (mais longa)
      ];

      const playMelody = () => {
        if (!backgroundGainRef.current) return; // Para se foi solicitado parar
        
        const startTime = audioContext.currentTime;
        let currentTime = startTime;

        melody.forEach((note, index) => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();

          oscillator.connect(gainNode);
          gainNode.connect(backgroundGainRef.current!);

          oscillator.frequency.value = note.freq;
          oscillator.type = "sine"; // Som suave

          // Volume com fade in/out suave
          gainNode.gain.setValueAtTime(0, currentTime);
          gainNode.gain.linearRampToValueAtTime(0.08, currentTime + 0.05); // Volume baixo
          gainNode.gain.linearRampToValueAtTime(0.08, currentTime + note.duration - 0.05);
          gainNode.gain.linearRampToValueAtTime(0, currentTime + note.duration);

          oscillator.start(currentTime);
          oscillator.stop(currentTime + note.duration);

          currentTime += note.duration + 0.05; // Pequena pausa entre notas

          backgroundOscillatorsRef.current.push(oscillator);
        });

        // Reinicia a melodia após terminar
        const totalDuration = melody.reduce((sum, note) => sum + note.duration + 0.05, 0);
        setTimeout(() => {
          if (backgroundGainRef.current) {
            playMelody();
          }
        }, totalDuration * 1000);
      };

      // Cria o gain node principal
      backgroundGainRef.current = audioContext.createGain();
      backgroundGainRef.current.connect(audioContext.destination);
      backgroundGainRef.current.gain.value = 1;

      // Inicia a melodia
      playMelody();
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

