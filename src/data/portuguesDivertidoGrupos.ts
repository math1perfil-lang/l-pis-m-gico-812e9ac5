import type { Activity } from "./activities";
import type { LessonGroup } from "./alfabetizacaoGrupos";

// Atividades originais do "Português Divertido" (6 anos), adaptadas das habilidades
// trabalhadas na Unidade 1 do livro "Português Linguagens – 6º ano" (contos maravilhosos,
// fábulas, variedades linguísticas, fonema e letra, dígrafos e divisão silábica).
// Todo o texto e os exercícios abaixo foram criados do zero para a faixa de 6 anos.

const ACT_COINS = 5;

const TRUE_FALSE = (correct: boolean) => [
  { id: "true", text: "Verdadeiro", isCorrect: correct },
  { id: "false", text: "Falso", isCorrect: !correct },
];

// ---------------------------------------------------------------------------
// Grupo 6 — Era uma vez... (contos maravilhosos e linguagem não verbal)
// ---------------------------------------------------------------------------
const g6Activities: Activity[] = [
  {
    id: "pd-g6-a1",
    type: "multiple-choice",
    question: "Muitas histórias de fadas começam com: \"Era uma ___\"",
    instruction: "Toque na palavra que completa",
    options: [
      { id: "a", text: "vez", isCorrect: true },
      { id: "b", text: "bola", isCorrect: false },
      { id: "c", text: "casa", isCorrect: false },
      { id: "d", text: "festa", isCorrect: false },
    ],
    coinsReward: ACT_COINS,
    difficulty: "easy",
  },
  {
    id: "pd-g6-a2",
    type: "multiple-choice",
    question: "Qual destes personagens aparece nos contos de fadas?",
    instruction: "Toque na resposta certa",
    options: [
      { id: "a", text: "🧚 Fada", isCorrect: true },
      { id: "b", text: "🚌 Ônibus", isCorrect: false },
      { id: "c", text: "💻 Computador", isCorrect: false },
      { id: "d", text: "🚲 Bicicleta", isCorrect: false },
    ],
    coinsReward: ACT_COINS,
    difficulty: "easy",
  },
  {
    id: "pd-g6-a3",
    type: "true-false",
    question: "Nos contos de fadas, a magia pode transformar pessoas e bichos.",
    instruction: "Verdadeiro ou Falso",
    options: TRUE_FALSE(true),
    coinsReward: ACT_COINS,
    difficulty: "easy",
  },
  {
    id: "pd-g6-a4",
    type: "ordering",
    question: "Coloque a história na ordem certa",
    instruction: "Arraste as frases para a ordem certa",
    options: [
      { id: "s1", text: "Era uma vez uma princesa." },
      { id: "s2", text: "Um dragão apareceu no reino." },
      { id: "s3", text: "A princesa e o dragão ficaram amigos." },
      { id: "s4", text: "E todos foram felizes." },
    ],
    correctOrder: ["s1", "s2", "s3", "s4"],
    coinsReward: ACT_COINS,
    difficulty: "medium",
  },
  {
    id: "pd-g6-a5",
    type: "multiple-choice",
    question:
      "Era uma vez uma menina que tinha um chapéu mágico. Quando o colocava na cabeça, ela voava como um passarinho. 🎩 O que o chapéu fazia?",
    instruction: "Leia a história e escolha",
    options: [
      { id: "a", text: "Fazia a menina voar", isCorrect: true },
      { id: "b", text: "Fazia a menina dormir", isCorrect: false },
      { id: "c", text: "Fazia a menina cantar", isCorrect: false },
      { id: "d", text: "Fazia a menina chorar", isCorrect: false },
    ],
    coinsReward: ACT_COINS,
    difficulty: "medium",
  },
  {
    id: "pd-g6-a6",
    type: "matching",
    question: "Ligue cada personagem ao que ele faz na história",
    instruction: "Conecte as duas colunas",
    options: [
      { id: "f1", text: "🧚 Fada", matchId: "f2" },
      { id: "f2", text: "Faz mágica", matchId: "f1" },
      { id: "d1", text: "🐉 Dragão", matchId: "d2" },
      { id: "d2", text: "Solta fogo", matchId: "d1" },
      { id: "r1", text: "👑 Rei", matchId: "r2" },
      { id: "r2", text: "Cuida do reino", matchId: "r1" },
    ],
    coinsReward: ACT_COINS,
    difficulty: "easy",
  },
  {
    id: "pd-g6-a7",
    type: "multiple-choice",
    question: "Como uma história de fadas costuma terminar?",
    instruction: "Toque na resposta certa",
    options: [
      { id: "a", text: "Todos ficaram felizes", isCorrect: true },
      { id: "b", text: "Ninguém sabe o que houve", isCorrect: false },
      { id: "c", text: "A história não tem fim", isCorrect: false },
      { id: "d", text: "Todos foram embora tristes", isCorrect: false },
    ],
    coinsReward: ACT_COINS,
    difficulty: "easy",
  },
  {
    id: "pd-g6-a8",
    type: "true-false",
    question: "Um conto de fadas é uma história inventada.",
    instruction: "Verdadeiro ou Falso",
    options: TRUE_FALSE(true),
    coinsReward: ACT_COINS,
    difficulty: "easy",
  },
  {
    id: "pd-g6-a9",
    type: "multiple-choice",
    question: "O menino está com lágrimas nos olhos e a boca virada para baixo. 😢 Como ele se sente?",
    instruction: "Olhe a carinha e escolha",
    options: [
      { id: "a", text: "Triste", isCorrect: true },
      { id: "b", text: "Feliz", isCorrect: false },
      { id: "c", text: "Com sono", isCorrect: false },
      { id: "d", text: "Com fome", isCorrect: false },
    ],
    coinsReward: ACT_COINS,
    difficulty: "easy",
  },
  {
    id: "pd-g6-a10",
    type: "multiple-choice",
    question: "Qual destas é uma forma de se comunicar SEM falar palavras?",
    instruction: "Toque na resposta certa",
    options: [
      { id: "a", text: "🤗 Um abraço", isCorrect: true },
      { id: "b", text: "📖 Um livro", isCorrect: false },
      { id: "c", text: "✉️ Uma carta", isCorrect: false },
      { id: "d", text: "📝 Um bilhete", isCorrect: false },
    ],
    coinsReward: ACT_COINS,
    difficulty: "medium",
  },
];

// ---------------------------------------------------------------------------
// Grupo 7 — Falamos de Muitos Jeitos (variedades da língua, leitura em voz alta,
// fonema e letra)
// ---------------------------------------------------------------------------
const g7Activities: Activity[] = [
  {
    id: "pd-g7-a1",
    type: "multiple-choice",
    question: "Em alguns lugares do Brasil, a mandioca também se chama...",
    instruction: "Toque na resposta certa",
    options: [
      { id: "a", text: "Macaxeira", isCorrect: true },
      { id: "b", text: "Melancia", isCorrect: false },
      { id: "c", text: "Abacate", isCorrect: false },
      { id: "d", text: "Banana", isCorrect: false },
    ],
    coinsReward: ACT_COINS,
    difficulty: "medium",
  },
  {
    id: "pd-g7-a2",
    type: "matching",
    question: "Cada lugar tem seu jeito de falar! Ligue as palavras que significam a mesma coisa",
    instruction: "Conecte as palavras parecidas",
    options: [
      { id: "p1", text: "Pandorga", matchId: "p2" },
      { id: "p2", text: "🪁 Pipa", matchId: "p1" },
      { id: "b1", text: "Bergamota", matchId: "b2" },
      { id: "b2", text: "🍊 Tangerina", matchId: "b1" },
      { id: "a1", text: "Aipim", matchId: "a2" },
      { id: "a2", text: "Mandioca", matchId: "a1" },
    ],
    coinsReward: ACT_COINS,
    difficulty: "medium",
  },
  {
    id: "pd-g7-a3",
    type: "true-false",
    question: "Pessoas de lugares diferentes podem falar algumas palavras de jeitos diferentes.",
    instruction: "Verdadeiro ou Falso",
    options: TRUE_FALSE(true),
    coinsReward: ACT_COINS,
    difficulty: "easy",
  },
  {
    id: "pd-g7-a4",
    type: "multiple-choice",
    question: "Qual frase é um jeito educado de pedir um lápis emprestado?",
    instruction: "Toque na resposta certa",
    options: [
      { id: "a", text: "Posso pegar o seu lápis, por favor?", isCorrect: true },
      { id: "b", text: "Me dá esse lápis já!", isCorrect: false },
      { id: "c", text: "Esse lápis agora é meu.", isCorrect: false },
      { id: "d", text: "Não quero lápis nenhum.", isCorrect: false },
    ],
    coinsReward: ACT_COINS,
    difficulty: "easy",
  },
  {
    id: "pd-g7-a5",
    type: "multiple-choice",
    question: "Como devemos ler a palavra \"SOCORRO!\" em voz alta?",
    instruction: "Pense em como a pessoa se sente",
    options: [
      { id: "a", text: "Com voz forte, mostrando susto", isCorrect: true },
      { id: "b", text: "Bem baixinho, como quem dorme", isCorrect: false },
      { id: "c", text: "Rindo, como quem conta piada", isCorrect: false },
      { id: "d", text: "Sem mexer a boca", isCorrect: false },
    ],
    coinsReward: ACT_COINS,
    difficulty: "medium",
  },
  {
    id: "pd-g7-a6",
    type: "multiple-choice",
    question: "Que sinal combina com uma frase de alegria? \"Que festa linda__\"",
    instruction: "Toque no sinal certo",
    options: [
      { id: "a", text: "!", isCorrect: true },
      { id: "b", text: "?", isCorrect: false },
      { id: "c", text: ",", isCorrect: false },
      { id: "d", text: "...", isCorrect: false },
    ],
    coinsReward: ACT_COINS,
    difficulty: "medium",
  },
  {
    id: "pd-g7-a7",
    type: "multiple-choice",
    question: "Quantas letras tem a palavra SOL? (S – O – L)",
    instruction: "Conte as letras",
    options: [
      { id: "a", text: "2", isCorrect: false },
      { id: "b", text: "3", isCorrect: true },
      { id: "c", text: "4", isCorrect: false },
      { id: "d", text: "5", isCorrect: false },
    ],
    coinsReward: ACT_COINS,
    difficulty: "easy",
  },
  {
    id: "pd-g7-a8",
    type: "multiple-choice",
    question: "Qual palavra começa com o mesmo som de BOLA?",
    instruction: "Escute o som do começo",
    options: [
      { id: "a", text: "BALDE", isCorrect: true },
      { id: "b", text: "CASA", isCorrect: false },
      { id: "c", text: "DADO", isCorrect: false },
      { id: "d", text: "FOGO", isCorrect: false },
    ],
    coinsReward: ACT_COINS,
    difficulty: "easy",
  },
  {
    id: "pd-g7-a9",
    type: "ordering",
    question: "Organize as sílabas para formar MAGIA ✨",
    instruction: "Coloque na ordem certa",
    options: [
      { id: "ma", text: "MA" },
      { id: "gi", text: "GI" },
      { id: "a", text: "A" },
    ],
    correctOrder: ["ma", "gi", "a"],
    coinsReward: ACT_COINS,
    difficulty: "medium",
  },
  {
    id: "pd-g7-a10",
    type: "multiple-choice",
    question: "Um amigo está contando uma história. O que devemos fazer?",
    instruction: "Toque na resposta certa",
    options: [
      { id: "a", text: "Escutar com atenção e esperar a vez de falar", isCorrect: true },
      { id: "b", text: "Falar por cima dele", isCorrect: false },
      { id: "c", text: "Sair andando", isCorrect: false },
      { id: "d", text: "Tapar os ouvidos", isCorrect: false },
    ],
    coinsReward: ACT_COINS,
    difficulty: "easy",
  },
];

// ---------------------------------------------------------------------------
// Grupo 8 — Fábulas em Cena! (fábulas, jogos de palavras, dígrafos, sílabas, teatro)
// ---------------------------------------------------------------------------
const g8Activities: Activity[] = [
  {
    id: "pd-g8-a1",
    type: "multiple-choice",
    question: "Nas fábulas, quem costuma ser o personagem principal?",
    instruction: "Toque na resposta certa",
    options: [
      { id: "a", text: "🦊 Animais que falam e agem como gente", isCorrect: true },
      { id: "b", text: "🚗 Carros de corrida", isCorrect: false },
      { id: "c", text: "📱 Aparelhos de celular", isCorrect: false },
      { id: "d", text: "🪑 Móveis da sala", isCorrect: false },
    ],
    coinsReward: ACT_COINS,
    difficulty: "easy",
  },
  {
    id: "pd-g8-a2",
    type: "multiple-choice",
    question:
      "O coelho corria muito e nunca olhava o caminho. A tartaruga andava devagar e atenta. Um dia, o coelho caiu num buraco e a tartaruga o ajudou a sair. 🐰🐢 Qual é a lição da história?",
    instruction: "Leia e escolha a lição",
    options: [
      { id: "a", text: "Olhar o caminho e ajudar os outros", isCorrect: true },
      { id: "b", text: "Correr é sempre melhor", isCorrect: false },
      { id: "c", text: "Nunca sair de casa", isCorrect: false },
      { id: "d", text: "Cavar buracos é divertido", isCorrect: false },
    ],
    coinsReward: ACT_COINS,
    difficulty: "medium",
  },
  {
    id: "pd-g8-a3",
    type: "true-false",
    question: "As fábulas costumam deixar uma lição no final.",
    instruction: "Verdadeiro ou Falso",
    options: TRUE_FALSE(true),
    coinsReward: ACT_COINS,
    difficulty: "easy",
  },
  {
    id: "pd-g8-a4",
    type: "matching",
    question: "Ligue cada palavra ao seu contrário",
    instruction: "Conecte os opostos",
    options: [
      { id: "g1", text: "Grande", matchId: "g2" },
      { id: "g2", text: "Pequeno", matchId: "g1" },
      { id: "d1", text: "Dia", matchId: "d2" },
      { id: "d2", text: "Noite", matchId: "d1" },
      { id: "q1", text: "Quente", matchId: "q2" },
      { id: "q2", text: "Frio", matchId: "q1" },
    ],
    coinsReward: ACT_COINS,
    difficulty: "easy",
  },
  {
    id: "pd-g8-a5",
    type: "multiple-choice",
    question: "Qual frase mostra um bicho agindo como gente?",
    instruction: "Toque na resposta certa",
    options: [
      { id: "a", text: "O leão leu o jornal e tomou chá.", isCorrect: true },
      { id: "b", text: "O leão correu pela savana.", isCorrect: false },
      { id: "c", text: "O leão dormiu debaixo da árvore.", isCorrect: false },
      { id: "d", text: "O leão tem uma juba grande.", isCorrect: false },
    ],
    coinsReward: ACT_COINS,
    difficulty: "medium",
  },
  {
    id: "pd-g8-a6",
    type: "multiple-choice",
    question: "Qual frase repete bastante o som do S?",
    instruction: "Leia em voz alta e escute",
    options: [
      { id: "a", text: "O sapo sabido sorriu na sala.", isCorrect: true },
      { id: "b", text: "A bola rolou até o rio.", isCorrect: false },
      { id: "c", text: "O gato pulou no muro.", isCorrect: false },
      { id: "d", text: "A vaca comeu capim.", isCorrect: false },
    ],
    coinsReward: ACT_COINS,
    difficulty: "medium",
  },
  {
    id: "pd-g8-a7",
    type: "matching",
    question: "Ligue cada par de letras à palavra certa",
    instruction: "Conecte o som à palavra",
    options: [
      { id: "ch1", text: "CH", matchId: "ch2" },
      { id: "ch2", text: "🔑 Chave", matchId: "ch1" },
      { id: "lh1", text: "LH", matchId: "lh2" },
      { id: "lh2", text: "🐝 Abelha", matchId: "lh1" },
      { id: "nh1", text: "NH", matchId: "nh2" },
      { id: "nh2", text: "🐔 Galinha", matchId: "nh1" },
    ],
    coinsReward: ACT_COINS,
    difficulty: "medium",
  },
  {
    id: "pd-g8-a8",
    type: "multiple-choice",
    question: "Bata palmas para cada pedacinho: BOR-BO-LE-TA 🦋 Quantas sílabas tem a palavra?",
    instruction: "Conte as palmas",
    options: [
      { id: "a", text: "2", isCorrect: false },
      { id: "b", text: "3", isCorrect: false },
      { id: "c", text: "4", isCorrect: true },
      { id: "d", text: "5", isCorrect: false },
    ],
    coinsReward: ACT_COINS,
    difficulty: "medium",
  },
  {
    id: "pd-g8-a9",
    type: "ordering",
    question: "Organize as sílabas para formar RAPOSA 🦊",
    instruction: "Coloque na ordem certa",
    options: [
      { id: "ra", text: "RA" },
      { id: "po", text: "PO" },
      { id: "sa", text: "SA" },
    ],
    correctOrder: ["ra", "po", "sa"],
    coinsReward: ACT_COINS,
    difficulty: "medium",
  },
  {
    id: "pd-g8-a10",
    type: "multiple-choice",
    question: "Em uma peça de teatro, quem fala as falas dos personagens?",
    instruction: "Toque na resposta certa",
    options: [
      { id: "a", text: "🎭 Os atores", isCorrect: true },
      { id: "b", text: "💡 As luzes", isCorrect: false },
      { id: "c", text: "🪑 As cadeiras", isCorrect: false },
      { id: "d", text: "🎟️ Os ingressos", isCorrect: false },
    ],
    coinsReward: ACT_COINS,
    difficulty: "easy",
  },
];

// Os vídeos destes grupos ainda não foram gravados: por enquanto usam o vídeo
// do Grupo 1 como substituto. Troque os caminhos quando os novos vídeos existirem.
const PLACEHOLDER_VIDEO = "/videos/alfabetizacao-grupo-1.mp4";

export const portuguesDivertidoGrupos: LessonGroup[] = [
  {
    id: "pd-g6",
    index: 5,
    title: "Era Uma Vez...",
    videoTitle: "Era Uma Vez...",
    videoObjective: "Contos de fadas, personagens, final feliz e linguagem sem palavras.",
    videoScript:
      "Lili abre um livro encantado e entra no reino das histórias, onde conhece fadas, dragões e descobre como os contos começam e terminam.",
    videoDurationLabel: "3 min",
    videoUrl: PLACEHOLDER_VIDEO,
    videoThumbnail: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800",
    groupCoinsBonus: 10,
    activities: g6Activities,
  },
  {
    id: "pd-g7",
    index: 6,
    title: "Falamos de Muitos Jeitos",
    videoTitle: "Falamos de Muitos Jeitos",
    videoObjective: "Jeitos diferentes de falar, leitura em voz alta, letras e sons.",
    videoScript:
      "Lili viaja por várias regiões e descobre que uma mesma coisa pode ter nomes diferentes, e que a voz muda conforme a emoção.",
    videoDurationLabel: "3 min",
    videoUrl: PLACEHOLDER_VIDEO,
    videoThumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    groupCoinsBonus: 10,
    activities: g7Activities,
  },
  {
    id: "pd-g8",
    index: 7,
    title: "Fábulas em Cena!",
    videoTitle: "Fábulas em Cena!",
    videoObjective: "Fábulas e suas lições, jogos de palavras, dígrafos, sílabas e teatro.",
    videoScript:
      "Os bichos da floresta montam uma peça de teatro e Lili ajuda a descobrir a lição da história, brincando com sons e sílabas.",
    videoDurationLabel: "3 min",
    videoUrl: PLACEHOLDER_VIDEO,
    videoThumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
    groupCoinsBonus: 10,
    activities: g8Activities,
  },
];
