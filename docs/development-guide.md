# Porta ou Pirulito – Adivinhe a Palavra
### Especificação Técnica Completa para Desenvolvimento do Jogo (React + Tailwind + Shadcn)

![Jogo Porta ou Pirulito](docs/jogo.JPG)

## 1. Objetivo do Jogo
Jogo educativo para crianças baseado no clássico “Jogo da Forca”, porém gentil e divertido:
- A criança deve adivinhar uma palavra (fruta ou animal).
- A cada erro, a porta se fecha um pouco.
- Ao acertar tudo, a menina atravessa a porta e pega o pirulito.
- Sistema de erros proporcional ao tamanho da palavra.

## 2. Stack Técnica
- React (Next.js)
- TailwindCSS
- Shadcn/UI
- Deploy na Vercel

## 3. Estrutura do Projeto
/app  
  /game  
    page.tsx  
    components/  
      Door.tsx  
      Girl.tsx  
      Lollipop.tsx  
      WordDisplay.tsx  
      Keyboard.tsx  
      ProgressBar.tsx  
      ModalWin.tsx  
      ModalLose.tsx  
/layout.tsx  

## 4. Estados do Jogo
- palavraSelecionada  
- categoria  
- letrasAcertadas  
- letrasErradas  
- errosMaximos  
- estadoPorta  
- estadoJogo  

## 5. Lista de Palavras

### Frutas
abacate, abacaxi, acerola, amora, banana, caju, carambola, cereja, cupuaçu, damasco, figo, framboesa, goiaba, graviola, jabuticaba, jaca, kiwi, laranja, limão, maçã, mamão, manga, maracujá, melancia, melão, morango, nectarina, pera, pêssego, pitaya, pitanga, romã, tangerina, uva

### Animais
abelha, águia, anta, aranha, avestruz, baleia, beija-flor, bode, borboleta, búfalo, cabra, cachorro, camelo, caranguejo, cavalo, cobra, coala, coruja, elefante, esquilo, foca, formiga, galo, gato, girafa, golfinho, hamster, hipopótamo, jacaré, jaguatirica, lagarto, leão, lobo, macaco, morcego, ovelha, panda, pato, peixe, pinguim, porco, puma, raposa, rinoceronte, sapo, tartaruga, tigre, touro, tubarão, urso, veado, zebra

