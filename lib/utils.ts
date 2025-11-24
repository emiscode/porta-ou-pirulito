import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Mapeia letras acentuadas para suas versões básicas
const MAPA_ACENTOS: Record<string, string> = {
  'Á': 'A', 'À': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A',
  'É': 'E', 'È': 'E', 'Ê': 'E', 'Ë': 'E',
  'Í': 'I', 'Ì': 'I', 'Î': 'I', 'Ï': 'I',
  'Ó': 'O', 'Ò': 'O', 'Ô': 'O', 'Õ': 'O', 'Ö': 'O',
  'Ú': 'U', 'Ù': 'U', 'Û': 'U', 'Ü': 'U',
  'Ç': 'C',
  'á': 'a', 'à': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a',
  'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
  'í': 'i', 'ì': 'i', 'î': 'i', 'ï': 'i',
  'ó': 'o', 'ò': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o',
  'ú': 'u', 'ù': 'u', 'û': 'u', 'ü': 'u',
  'ç': 'c',
};

/**
 * Normaliza uma letra removendo acentos e convertendo para maiúscula
 * Exemplo: "Á" -> "A", "é" -> "E"
 */
export function normalizarLetra(letra: string): string {
  const letraUpper = letra.toUpperCase();
  return MAPA_ACENTOS[letraUpper] || letraUpper;
}

/**
 * Normaliza uma palavra inteira removendo acentos
 * Exemplo: "maçã" -> "MACAA", "pêssego" -> "PESSEGO"
 */
export function normalizarPalavra(palavra: string): string {
  return palavra
    .split('')
    .map(letra => normalizarLetra(letra))
    .join('');
}
