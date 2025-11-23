export const FRUTAS = [
  "abacate",
  "abacaxi",
  "acerola",
  "amora",
  "banana",
  "caju",
  "carambola",
  "cereja",
  "cupuaçu",
  "damasco",
  "figo",
  "framboesa",
  "goiaba",
  "graviola",
  "jabuticaba",
  "jaca",
  "kiwi",
  "laranja",
  "limão",
  "maçã",
  "mamão",
  "manga",
  "maracujá",
  "melancia",
  "melão",
  "morango",
  "nectarina",
  "pera",
  "pêssego",
  "pitaya",
  "pitanga",
  "romã",
  "tangerina",
  "uva",
];

export const ANIMAIS = [
  "abelha",
  "águia",
  "anta",
  "aranha",
  "avestruz",
  "baleia",
  "beija-flor",
  "bode",
  "borboleta",
  "búfalo",
  "cabra",
  "cachorro",
  "camelo",
  "caranguejo",
  "cavalo",
  "cobra",
  "coala",
  "coruja",
  "elefante",
  "esquilo",
  "foca",
  "formiga",
  "galo",
  "gato",
  "girafa",
  "golfinho",
  "hamster",
  "hipopótamo",
  "jacaré",
  "jaguatirica",
  "lagarto",
  "leão",
  "lobo",
  "macaco",
  "morcego",
  "ovelha",
  "panda",
  "pato",
  "peixe",
  "pinguim",
  "porco",
  "puma",
  "raposa",
  "rinoceronte",
  "sapo",
  "tartaruga",
  "tigre",
  "touro",
  "tubarão",
  "urso",
  "veado",
  "zebra",
];

export type Categoria = "fruta" | "animal";

export interface PalavraSelecionada {
  palavra: string;
  categoria: Categoria;
}

export function selecionarPalavraAleatoria(): PalavraSelecionada {
  const todasPalavras: Array<{ palavra: string; categoria: Categoria }> = [
    ...FRUTAS.map((p) => ({ palavra: p, categoria: "fruta" as Categoria })),
    ...ANIMAIS.map((p) => ({ palavra: p, categoria: "animal" as Categoria })),
  ];

  const indiceAleatorio = Math.floor(Math.random() * todasPalavras.length);
  return todasPalavras[indiceAleatorio];
}

export function calcularErrosMaximos(palavra: string): number {
  return palavra.length + 3;
}
