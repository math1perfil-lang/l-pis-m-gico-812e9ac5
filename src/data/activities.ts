// Types for interactive activities
export type ActivityType = 
  | "multiple-choice" 
  | "matching" 
  | "fill-blank" 
  | "ordering" 
  | "true-false";

export interface ActivityOption {
  id: string;
  text: string;
  isCorrect?: boolean;
  matchId?: string; // For matching activities
  imageUrl?: string; // Optional picture option
}

export interface Activity {
  id: string;
  type: ActivityType;
  question: string;
  instruction: string;
  options: ActivityOption[];
  correctAnswer?: string; // For fill-blank
  correctOrder?: string[]; // For ordering
  coinsReward: number;
  difficulty: "easy" | "medium" | "hard";
  imageUrl?: string; // Illustration shown above the question
  imageCaption?: string;
  poem?: string[]; // Optional poem/text lines shown with the illustration
  poemTitle?: string;
}

export interface LessonActivities {
  lessonId: string;
  activities: Activity[];
}

// Activities for "Alfabetização Divertida" - Ages 6-8
export const alfabetizacaoActivities: LessonActivities[] = [
  {
    lessonId: "l1", // As Vogais Cantantes
    activities: [
      {
        id: "alf-l1-a1",
        type: "multiple-choice",
        question: "Qual é a primeira vogal do alfabeto?",
        instruction: "Toque na letra correta",
        options: [
          { id: "a", text: "A", isCorrect: true },
          { id: "b", text: "B", isCorrect: false },
          { id: "c", text: "E", isCorrect: false },
          { id: "d", text: "C", isCorrect: false },
        ],
        coinsReward: 10,
        difficulty: "easy",
      },
      {
        id: "alf-l1-a2",
        type: "true-false",
        question: "A letra 'U' é uma vogal?",
        instruction: "Responda Verdadeiro ou Falso",
        options: [
          { id: "true", text: "Verdadeiro", isCorrect: true },
          { id: "false", text: "Falso", isCorrect: false },
        ],
        coinsReward: 10,
        difficulty: "easy",
      },
      {
        id: "alf-l1-a3",
        type: "ordering",
        question: "Coloque as vogais na ordem correta",
        instruction: "Arraste as letras para a ordem certa",
        options: [
          { id: "a", text: "A" },
          { id: "e", text: "E" },
          { id: "i", text: "I" },
          { id: "o", text: "O" },
          { id: "u", text: "U" },
        ],
        correctOrder: ["a", "e", "i", "o", "u"],
        coinsReward: 15,
        difficulty: "medium",
      },
      {
        id: "alf-l1-a4",
        type: "matching",
        question: "Ligue cada vogal à palavra que começa com ela",
        instruction: "Conecte a vogal à imagem correta",
        options: [
          { id: "a1", text: "A", matchId: "a2" },
          { id: "a2", text: "🍎 Abelha", matchId: "a1" },
          { id: "e1", text: "E", matchId: "e2" },
          { id: "e2", text: "🐘 Elefante", matchId: "e1" },
          { id: "i1", text: "I", matchId: "i2" },
          { id: "i2", text: "🏝️ Ilha", matchId: "i1" },
        ],
        coinsReward: 15,
        difficulty: "medium",
      },
      {
        id: "alf-l1-a5",
        type: "multiple-choice",
        question: "Quantas vogais existem no alfabeto?",
        instruction: "Escolha o número correto",
        options: [
          { id: "a", text: "3", isCorrect: false },
          { id: "b", text: "4", isCorrect: false },
          { id: "c", text: "5", isCorrect: true },
          { id: "d", text: "6", isCorrect: false },
        ],
        coinsReward: 10,
        difficulty: "easy",
      },
    ],
  },
  {
    lessonId: "l2", // Consoantes Mágicas
    activities: [
      {
        id: "alf-l2-a1",
        type: "multiple-choice",
        question: "Qual destas é uma consoante?",
        instruction: "Toque na letra correta",
        options: [
          { id: "a", text: "A", isCorrect: false },
          { id: "b", text: "B", isCorrect: true },
          { id: "c", text: "E", isCorrect: false },
          { id: "d", text: "I", isCorrect: false },
        ],
        coinsReward: 10,
        difficulty: "easy",
      },
      {
        id: "alf-l2-a2",
        type: "true-false",
        question: "A letra 'M' é uma vogal?",
        instruction: "Responda Verdadeiro ou Falso",
        options: [
          { id: "true", text: "Verdadeiro", isCorrect: false },
          { id: "false", text: "Falso", isCorrect: true },
        ],
        coinsReward: 10,
        difficulty: "easy",
      },
      {
        id: "alf-l2-a3",
        type: "multiple-choice",
        question: "Com qual letra começa a palavra 'Casa'?",
        instruction: "Escolha a letra correta",
        options: [
          { id: "a", text: "K", isCorrect: false },
          { id: "b", text: "S", isCorrect: false },
          { id: "c", text: "C", isCorrect: true },
          { id: "d", text: "Q", isCorrect: false },
        ],
        coinsReward: 10,
        difficulty: "easy",
      },
      {
        id: "alf-l2-a4",
        type: "matching",
        question: "Ligue a consoante à palavra que começa com ela",
        instruction: "Conecte as letras às palavras",
        options: [
          { id: "b1", text: "B", matchId: "b2" },
          { id: "b2", text: "🏀 Bola", matchId: "b1" },
          { id: "c1", text: "C", matchId: "c2" },
          { id: "c2", text: "🐱 Gato", matchId: "c1" },
          { id: "d1", text: "D", matchId: "d2" },
          { id: "d2", text: "🦷 Dente", matchId: "d1" },
        ],
        coinsReward: 15,
        difficulty: "medium",
      },
      {
        id: "alf-l2-a5",
        type: "ordering",
        question: "Coloque as letras em ordem alfabética",
        instruction: "Arraste as letras para a ordem correta",
        options: [
          { id: "b", text: "B" },
          { id: "c", text: "C" },
          { id: "d", text: "D" },
          { id: "f", text: "F" },
        ],
        correctOrder: ["b", "c", "d", "f"],
        coinsReward: 15,
        difficulty: "medium",
      },
    ],
  },
];

// Activities for "Números em Brincadeira" - Ages 6-8
export const numerosActivities: LessonActivities[] = [
  {
    lessonId: "lesson-1",
    activities: [
      {
        id: "num-l1-a1",
        type: "multiple-choice",
        question: "Quanto é 2 + 2?",
        instruction: "Escolha o resultado correto",
        options: [
          { id: "a", text: "3", isCorrect: false },
          { id: "b", text: "4", isCorrect: true },
          { id: "c", text: "5", isCorrect: false },
          { id: "d", text: "6", isCorrect: false },
        ],
        coinsReward: 10,
        difficulty: "easy",
      },
      {
        id: "num-l1-a2",
        type: "ordering",
        question: "Coloque os números em ordem crescente",
        instruction: "Arraste os números para a ordem correta",
        options: [
          { id: "1", text: "1" },
          { id: "2", text: "2" },
          { id: "3", text: "3" },
          { id: "4", text: "4" },
          { id: "5", text: "5" },
        ],
        correctOrder: ["1", "2", "3", "4", "5"],
        coinsReward: 15,
        difficulty: "easy",
      },
      {
        id: "num-l1-a3",
        type: "true-false",
        question: "5 é maior que 3?",
        instruction: "Responda Verdadeiro ou Falso",
        options: [
          { id: "true", text: "Verdadeiro", isCorrect: true },
          { id: "false", text: "Falso", isCorrect: false },
        ],
        coinsReward: 10,
        difficulty: "easy",
      },
      {
        id: "num-l1-a4",
        type: "matching",
        question: "Ligue o número à quantidade de objetos",
        instruction: "Conecte os números às imagens",
        options: [
          { id: "n2", text: "2", matchId: "i2" },
          { id: "i2", text: "🍎🍎", matchId: "n2" },
          { id: "n3", text: "3", matchId: "i3" },
          { id: "i3", text: "⭐⭐⭐", matchId: "n3" },
          { id: "n4", text: "4", matchId: "i4" },
          { id: "i4", text: "🌙🌙🌙🌙", matchId: "n4" },
        ],
        coinsReward: 15,
        difficulty: "medium",
      },
      {
        id: "num-l1-a5",
        type: "multiple-choice",
        question: "Qual número vem depois do 7?",
        instruction: "Escolha o número correto",
        options: [
          { id: "a", text: "6", isCorrect: false },
          { id: "b", text: "8", isCorrect: true },
          { id: "c", text: "9", isCorrect: false },
          { id: "d", text: "5", isCorrect: false },
        ],
        coinsReward: 10,
        difficulty: "easy",
      },
    ],
  },
];

// Activities for "Matemática: Desafios" - Ages 9-11
export const matematicaDesafiosActivities: LessonActivities[] = [
  {
    lessonId: "lesson-1",
    activities: [
      {
        id: "mat-l1-a1",
        type: "multiple-choice",
        question: "Quanto é 7 × 8?",
        instruction: "Escolha o resultado correto",
        options: [
          { id: "a", text: "54", isCorrect: false },
          { id: "b", text: "56", isCorrect: true },
          { id: "c", text: "58", isCorrect: false },
          { id: "d", text: "64", isCorrect: false },
        ],
        coinsReward: 15,
        difficulty: "medium",
      },
      {
        id: "mat-l1-a2",
        type: "true-false",
        question: "O resultado de 144 ÷ 12 é 12?",
        instruction: "Responda Verdadeiro ou Falso",
        options: [
          { id: "true", text: "Verdadeiro", isCorrect: true },
          { id: "false", text: "Falso", isCorrect: false },
        ],
        coinsReward: 15,
        difficulty: "medium",
      },
      {
        id: "mat-l1-a3",
        type: "multiple-choice",
        question: "Qual é 1/2 de 50?",
        instruction: "Escolha a resposta correta",
        options: [
          { id: "a", text: "20", isCorrect: false },
          { id: "b", text: "25", isCorrect: true },
          { id: "c", text: "30", isCorrect: false },
          { id: "d", text: "15", isCorrect: false },
        ],
        coinsReward: 15,
        difficulty: "medium",
      },
      {
        id: "mat-l1-a4",
        type: "ordering",
        question: "Ordene as frações da menor para a maior",
        instruction: "Arraste as frações na ordem correta",
        options: [
          { id: "14", text: "1/4" },
          { id: "12", text: "1/2" },
          { id: "34", text: "3/4" },
          { id: "1", text: "1" },
        ],
        correctOrder: ["14", "12", "34", "1"],
        coinsReward: 20,
        difficulty: "hard",
      },
      {
        id: "mat-l1-a5",
        type: "multiple-choice",
        question: "Se João tem 24 figurinhas e dá 1/3 para Maria, quantas ele fica?",
        instruction: "Calcule e escolha a resposta",
        options: [
          { id: "a", text: "8", isCorrect: false },
          { id: "b", text: "12", isCorrect: false },
          { id: "c", text: "16", isCorrect: true },
          { id: "d", text: "18", isCorrect: false },
        ],
        coinsReward: 20,
        difficulty: "hard",
      },
    ],
  },
];

// Activities for "Álgebra & Geometria" - Ages 12-15
export const algebraGeometriaActivities: LessonActivities[] = [
  {
    lessonId: "lesson-1",
    activities: [
      {
        id: "alg-l1-a1",
        type: "multiple-choice",
        question: "Se x + 5 = 12, qual é o valor de x?",
        instruction: "Resolva a equação",
        options: [
          { id: "a", text: "5", isCorrect: false },
          { id: "b", text: "7", isCorrect: true },
          { id: "c", text: "8", isCorrect: false },
          { id: "d", text: "6", isCorrect: false },
        ],
        coinsReward: 20,
        difficulty: "medium",
      },
      {
        id: "alg-l1-a2",
        type: "true-false",
        question: "A área de um quadrado com lado 5 é 25?",
        instruction: "Responda Verdadeiro ou Falso",
        options: [
          { id: "true", text: "Verdadeiro", isCorrect: true },
          { id: "false", text: "Falso", isCorrect: false },
        ],
        coinsReward: 20,
        difficulty: "medium",
      },
      {
        id: "alg-l1-a3",
        type: "multiple-choice",
        question: "Qual é o perímetro de um retângulo com lados 4 e 6?",
        instruction: "Calcule o perímetro",
        options: [
          { id: "a", text: "10", isCorrect: false },
          { id: "b", text: "20", isCorrect: true },
          { id: "c", text: "24", isCorrect: false },
          { id: "d", text: "14", isCorrect: false },
        ],
        coinsReward: 20,
        difficulty: "medium",
      },
      {
        id: "alg-l1-a4",
        type: "multiple-choice",
        question: "Resolva: 2x - 4 = 10. Qual é x?",
        instruction: "Encontre o valor de x",
        options: [
          { id: "a", text: "3", isCorrect: false },
          { id: "b", text: "5", isCorrect: false },
          { id: "c", text: "7", isCorrect: true },
          { id: "d", text: "8", isCorrect: false },
        ],
        coinsReward: 25,
        difficulty: "hard",
      },
      {
        id: "alg-l1-a5",
        type: "ordering",
        question: "Ordene os passos para resolver x + 3 = 10",
        instruction: "Coloque na ordem correta",
        options: [
          { id: "1", text: "Identificar a equação" },
          { id: "2", text: "Isolar o x" },
          { id: "3", text: "Subtrair 3 dos dois lados" },
          { id: "4", text: "x = 7" },
        ],
        correctOrder: ["1", "2", "3", "4"],
        coinsReward: 25,
        difficulty: "hard",
      },
    ],
  },
];

 // Activities for "Natureza Nossa Amiga" - Ages 6-8
 export const naturezaAmigaActivities: LessonActivities[] = [
   {
     lessonId: "lesson-1",
     activities: [
       {
         id: "nat-l1-a1",
         type: "multiple-choice",
         question: "Qual animal é mamífero?",
         instruction: "Escolha o animal correto",
         options: [
           { id: "a", text: "🐕 Cachorro", isCorrect: true },
           { id: "b", text: "🐟 Peixe", isCorrect: false },
           { id: "c", text: "🦎 Lagarto", isCorrect: false },
           { id: "d", text: "🐦 Passarinho", isCorrect: false },
         ],
         coinsReward: 10,
         difficulty: "easy",
       },
       {
         id: "nat-l1-a2",
         type: "true-false",
         question: "As plantas precisam de água e luz do sol para viver?",
         instruction: "Responda Verdadeiro ou Falso",
         options: [
           { id: "true", text: "Verdadeiro", isCorrect: true },
           { id: "false", text: "Falso", isCorrect: false },
         ],
         coinsReward: 10,
         difficulty: "easy",
       },
       {
         id: "nat-l1-a3",
         type: "matching",
         question: "Ligue cada animal ao seu habitat",
         instruction: "Conecte o animal ao lugar onde vive",
         options: [
           { id: "p1", text: "🐟 Peixe", matchId: "p2" },
           { id: "p2", text: "🌊 Água", matchId: "p1" },
           { id: "a1", text: "🐦 Pássaro", matchId: "a2" },
           { id: "a2", text: "🌳 Árvore", matchId: "a1" },
           { id: "f1", text: "🐜 Formiga", matchId: "f2" },
           { id: "f2", text: "🏔️ Terra", matchId: "f1" },
         ],
         coinsReward: 15,
         difficulty: "medium",
       },
       {
         id: "nat-l1-a4",
         type: "ordering",
         question: "Ordene o ciclo de vida da borboleta",
         instruction: "Arraste na ordem correta",
         options: [
           { id: "1", text: "🥚 Ovo" },
           { id: "2", text: "🐛 Lagarta" },
           { id: "3", text: "🫛 Casulo" },
           { id: "4", text: "🦋 Borboleta" },
         ],
         correctOrder: ["1", "2", "3", "4"],
         coinsReward: 15,
         difficulty: "medium",
       },
       {
         id: "nat-l1-a5",
         type: "multiple-choice",
         question: "Qual parte da planta absorve água do solo?",
         instruction: "Escolha a resposta correta",
         options: [
           { id: "a", text: "🌸 Flor", isCorrect: false },
           { id: "b", text: "🌿 Folha", isCorrect: false },
           { id: "c", text: "🌱 Raiz", isCorrect: true },
           { id: "d", text: "🌾 Caule", isCorrect: false },
         ],
         coinsReward: 10,
         difficulty: "easy",
       },
     ],
   },
 ];
 
 // Activities for "Português: Uma Aventura" - Ages 9-11
 export const portuguesAventuraActivities: LessonActivities[] = [
   {
     lessonId: "lesson-1",
     activities: [
       {
         id: "port-l1-a1",
         type: "multiple-choice",
         question: "Qual é o sujeito da frase: 'O gato pulou o muro'?",
         instruction: "Identifique o sujeito",
         options: [
           { id: "a", text: "pulou", isCorrect: false },
           { id: "b", text: "O gato", isCorrect: true },
           { id: "c", text: "o muro", isCorrect: false },
           { id: "d", text: "pulou o muro", isCorrect: false },
         ],
         coinsReward: 15,
         difficulty: "medium",
       },
       {
         id: "port-l1-a2",
         type: "true-false",
         question: "'Livro' é um substantivo?",
         instruction: "Responda Verdadeiro ou Falso",
         options: [
           { id: "true", text: "Verdadeiro", isCorrect: true },
           { id: "false", text: "Falso", isCorrect: false },
         ],
         coinsReward: 15,
         difficulty: "easy",
       },
       {
         id: "port-l1-a3",
         type: "matching",
         question: "Ligue o substantivo ao seu adjetivo correto",
         instruction: "Faça as conexões corretas",
         options: [
           { id: "s1", text: "Casa", matchId: "a1" },
           { id: "a1", text: "Grande", matchId: "s1" },
           { id: "s2", text: "Menino", matchId: "a2" },
           { id: "a2", text: "Esperto", matchId: "s2" },
           { id: "s3", text: "Flor", matchId: "a3" },
           { id: "a3", text: "Bonita", matchId: "s3" },
         ],
         coinsReward: 15,
         difficulty: "medium",
       },
       {
         id: "port-l1-a4",
         type: "ordering",
         question: "Ordene as palavras para formar uma frase correta",
         instruction: "Arraste as palavras na ordem certa",
         options: [
           { id: "1", text: "A" },
           { id: "2", text: "menina" },
           { id: "3", text: "leu" },
           { id: "4", text: "o livro" },
         ],
         correctOrder: ["1", "2", "3", "4"],
         coinsReward: 15,
         difficulty: "medium",
       },
       {
         id: "port-l1-a5",
         type: "multiple-choice",
         question: "Qual é o antônimo de 'alto'?",
         instruction: "Escolha o oposto",
         options: [
           { id: "a", text: "Grande", isCorrect: false },
           { id: "b", text: "Baixo", isCorrect: true },
           { id: "c", text: "Largo", isCorrect: false },
           { id: "d", text: "Forte", isCorrect: false },
         ],
         coinsReward: 15,
         difficulty: "easy",
       },
     ],
   },
 ];
 
 // Activities for "Ciências: Experimentos" - Ages 9-11
 export const cienciasExperimentosActivities: LessonActivities[] = [
   {
     lessonId: "lesson-1",
     activities: [
       {
         id: "cie-l1-a1",
         type: "multiple-choice",
         question: "Qual é o estado físico da água em temperatura ambiente?",
         instruction: "Escolha a resposta correta",
         options: [
           { id: "a", text: "Sólido", isCorrect: false },
           { id: "b", text: "Líquido", isCorrect: true },
           { id: "c", text: "Gasoso", isCorrect: false },
           { id: "d", text: "Plasma", isCorrect: false },
         ],
         coinsReward: 15,
         difficulty: "easy",
       },
       {
         id: "cie-l1-a2",
         type: "true-false",
         question: "O gelo é água no estado sólido?",
         instruction: "Responda Verdadeiro ou Falso",
         options: [
           { id: "true", text: "Verdadeiro", isCorrect: true },
           { id: "false", text: "Falso", isCorrect: false },
         ],
         coinsReward: 15,
         difficulty: "easy",
       },
       {
         id: "cie-l1-a3",
         type: "ordering",
         question: "Ordene o ciclo da água",
         instruction: "Coloque na ordem correta",
         options: [
           { id: "1", text: "☀️ Evaporação" },
           { id: "2", text: "☁️ Condensação" },
           { id: "3", text: "🌧️ Precipitação" },
           { id: "4", text: "💧 Acumulação" },
         ],
         correctOrder: ["1", "2", "3", "4"],
         coinsReward: 20,
         difficulty: "medium",
       },
       {
         id: "cie-l1-a4",
         type: "matching",
         question: "Ligue o órgão à sua função",
         instruction: "Conecte corretamente",
         options: [
           { id: "c1", text: "❤️ Coração", matchId: "c2" },
           { id: "c2", text: "Bombear sangue", matchId: "c1" },
           { id: "p1", text: "🫁 Pulmões", matchId: "p2" },
           { id: "p2", text: "Respirar", matchId: "p1" },
           { id: "e1", text: "🧠 Cérebro", matchId: "e2" },
           { id: "e2", text: "Pensar", matchId: "e1" },
         ],
         coinsReward: 20,
         difficulty: "medium",
       },
       {
         id: "cie-l1-a5",
         type: "multiple-choice",
         question: "O que acontece quando aquecemos a água a 100°C?",
         instruction: "Escolha a mudança de estado",
         options: [
           { id: "a", text: "Congela", isCorrect: false },
           { id: "b", text: "Ferve e vira vapor", isCorrect: true },
           { id: "c", text: "Fica mais densa", isCorrect: false },
           { id: "d", text: "Não muda", isCorrect: false },
         ],
         coinsReward: 15,
         difficulty: "medium",
       },
     ],
   },
 ];
 
 // Activities for "Meu Primeiro Cofrinho" - Ages 9-11
 export const educacaoFinanceiraKidsActivities: LessonActivities[] = [
   {
     lessonId: "lesson-1",
     activities: [
       {
         id: "fin-k-l1-a1",
         type: "multiple-choice",
         question: "O que é melhor fazer com o dinheiro que você ganha?",
         instruction: "Escolha a opção mais inteligente",
         options: [
           { id: "a", text: "Gastar tudo de uma vez", isCorrect: false },
           { id: "b", text: "Guardar uma parte e gastar outra", isCorrect: true },
           { id: "c", text: "Jogar fora", isCorrect: false },
           { id: "d", text: "Dar tudo para os amigos", isCorrect: false },
         ],
         coinsReward: 15,
         difficulty: "easy",
       },
       {
         id: "fin-k-l1-a2",
         type: "true-false",
         question: "Poupar significa guardar dinheiro para o futuro?",
         instruction: "Responda Verdadeiro ou Falso",
         options: [
           { id: "true", text: "Verdadeiro", isCorrect: true },
           { id: "false", text: "Falso", isCorrect: false },
         ],
         coinsReward: 15,
         difficulty: "easy",
       },
       {
         id: "fin-k-l1-a3",
         type: "ordering",
         question: "Ordene os passos para comprar algo que você quer",
         instruction: "Coloque na ordem correta",
         options: [
           { id: "1", text: "💭 Decidir o que quer" },
           { id: "2", text: "💰 Ver quanto custa" },
           { id: "3", text: "🐷 Juntar dinheiro" },
           { id: "4", text: "🛍️ Comprar" },
         ],
         correctOrder: ["1", "2", "3", "4"],
         coinsReward: 15,
         difficulty: "medium",
       },
       {
         id: "fin-k-l1-a4",
         type: "matching",
         question: "Ligue o conceito à sua definição",
         instruction: "Conecte corretamente",
         options: [
           { id: "p1", text: "Poupar", matchId: "p2" },
           { id: "p2", text: "Guardar dinheiro", matchId: "p1" },
           { id: "g1", text: "Gastar", matchId: "g2" },
           { id: "g2", text: "Usar dinheiro", matchId: "g1" },
           { id: "m1", text: "Meta", matchId: "m2" },
           { id: "m2", text: "Objetivo", matchId: "m1" },
         ],
         coinsReward: 15,
         difficulty: "medium",
       },
       {
         id: "fin-k-l1-a5",
         type: "multiple-choice",
         question: "Se você tem R$10 e quer algo de R$15, o que fazer?",
         instruction: "Escolha a melhor decisão",
         options: [
           { id: "a", text: "Desistir de comprar", isCorrect: false },
           { id: "b", text: "Economizar mais R$5", isCorrect: true },
           { id: "c", text: "Pedir emprestado e não devolver", isCorrect: false },
           { id: "d", text: "Ficar triste", isCorrect: false },
         ],
         coinsReward: 15,
         difficulty: "medium",
       },
     ],
   },
 ];
 
 // Activities for "Redação Nota Mil" - Ages 12-15
 export const redacaoNotaMilActivities: LessonActivities[] = [
   {
     lessonId: "lesson-1",
     activities: [
       {
         id: "red-l1-a1",
         type: "multiple-choice",
         question: "Qual é a estrutura básica de uma redação dissertativa?",
         instruction: "Escolha a estrutura correta",
         options: [
           { id: "a", text: "Início, meio e fim", isCorrect: false },
           { id: "b", text: "Introdução, desenvolvimento e conclusão", isCorrect: true },
           { id: "c", text: "Título, texto e assinatura", isCorrect: false },
           { id: "d", text: "Parágrafo único", isCorrect: false },
         ],
         coinsReward: 20,
         difficulty: "medium",
       },
       {
         id: "red-l1-a2",
         type: "true-false",
         question: "A tese é a ideia principal que você defende na redação?",
         instruction: "Responda Verdadeiro ou Falso",
         options: [
           { id: "true", text: "Verdadeiro", isCorrect: true },
           { id: "false", text: "Falso", isCorrect: false },
         ],
         coinsReward: 20,
         difficulty: "medium",
       },
       {
         id: "red-l1-a3",
         type: "ordering",
         question: "Ordene os elementos de um parágrafo argumentativo",
         instruction: "Coloque na ordem correta",
         options: [
           { id: "1", text: "Tópico frasal" },
           { id: "2", text: "Argumento" },
           { id: "3", text: "Exemplo ou evidência" },
           { id: "4", text: "Conclusão parcial" },
         ],
         correctOrder: ["1", "2", "3", "4"],
         coinsReward: 25,
         difficulty: "hard",
       },
       {
         id: "red-l1-a4",
         type: "matching",
         question: "Ligue o conectivo à sua função",
         instruction: "Conecte corretamente",
         options: [
           { id: "p1", text: "Portanto", matchId: "p2" },
           { id: "p2", text: "Conclusão", matchId: "p1" },
           { id: "e1", text: "Entretanto", matchId: "e2" },
           { id: "e2", text: "Oposição", matchId: "e1" },
           { id: "a1", text: "Além disso", matchId: "a2" },
           { id: "a2", text: "Adição", matchId: "a1" },
         ],
         coinsReward: 20,
         difficulty: "medium",
       },
       {
         id: "red-l1-a5",
         type: "multiple-choice",
         question: "O que NÃO deve aparecer em uma redação formal?",
         instruction: "Identifique o erro",
         options: [
           { id: "a", text: "Argumentos bem fundamentados", isCorrect: false },
           { id: "b", text: "Gírias e linguagem coloquial", isCorrect: true },
           { id: "c", text: "Citações de especialistas", isCorrect: false },
           { id: "d", text: "Dados estatísticos", isCorrect: false },
         ],
         coinsReward: 20,
         difficulty: "medium",
       },
     ],
   },
 ];
 
 // Activities for "Programação para Jovens" - Ages 12-15
 export const programacaoIniciantesActivities: LessonActivities[] = [
   {
     lessonId: "lesson-1",
     activities: [
       {
         id: "prog-l1-a1",
         type: "multiple-choice",
         question: "O que é um algoritmo?",
         instruction: "Escolha a definição correta",
         options: [
           { id: "a", text: "Um tipo de computador", isCorrect: false },
           { id: "b", text: "Uma sequência de passos para resolver um problema", isCorrect: true },
           { id: "c", text: "Uma linguagem de programação", isCorrect: false },
           { id: "d", text: "Um jogo de computador", isCorrect: false },
         ],
         coinsReward: 20,
         difficulty: "medium",
       },
       {
         id: "prog-l1-a2",
         type: "true-false",
         question: "Em programação, uma 'variável' armazena dados que podem mudar?",
         instruction: "Responda Verdadeiro ou Falso",
         options: [
           { id: "true", text: "Verdadeiro", isCorrect: true },
           { id: "false", text: "Falso", isCorrect: false },
         ],
         coinsReward: 20,
         difficulty: "medium",
       },
       {
         id: "prog-l1-a3",
         type: "ordering",
         question: "Ordene os passos para criar um programa simples",
         instruction: "Coloque na ordem correta",
         options: [
           { id: "1", text: "Entender o problema" },
           { id: "2", text: "Planejar a solução" },
           { id: "3", text: "Escrever o código" },
           { id: "4", text: "Testar e corrigir" },
         ],
         correctOrder: ["1", "2", "3", "4"],
         coinsReward: 25,
         difficulty: "medium",
       },
       {
         id: "prog-l1-a4",
         type: "matching",
         question: "Ligue o conceito à sua descrição",
         instruction: "Conecte corretamente",
         options: [
           { id: "l1", text: "Loop", matchId: "l2" },
           { id: "l2", text: "Repetir ações", matchId: "l1" },
           { id: "c1", text: "Condição", matchId: "c2" },
           { id: "c2", text: "Se... então...", matchId: "c1" },
           { id: "f1", text: "Função", matchId: "f2" },
           { id: "f2", text: "Bloco reutilizável", matchId: "f1" },
         ],
         coinsReward: 25,
         difficulty: "hard",
       },
       {
         id: "prog-l1-a5",
         type: "multiple-choice",
         question: "Qual estrutura usamos para tomar decisões no código?",
         instruction: "Escolha a estrutura correta",
         options: [
           { id: "a", text: "for", isCorrect: false },
           { id: "b", text: "if/else", isCorrect: true },
           { id: "c", text: "print", isCorrect: false },
           { id: "d", text: "variable", isCorrect: false },
         ],
         coinsReward: 20,
         difficulty: "medium",
       },
     ],
   },
 ];
 
 // Activities for "Finanças para o Futuro" - Ages 12-15
 export const educacaoFinanceiraTeensActivities: LessonActivities[] = [
   {
     lessonId: "lesson-1",
     activities: [
       {
         id: "fin-t-l1-a1",
         type: "multiple-choice",
         question: "O que são juros compostos?",
         instruction: "Escolha a definição correta",
         options: [
           { id: "a", text: "Juros sobre o valor inicial apenas", isCorrect: false },
           { id: "b", text: "Juros sobre juros acumulados", isCorrect: true },
           { id: "c", text: "Taxa de inflação", isCorrect: false },
           { id: "d", text: "Desconto em compras", isCorrect: false },
         ],
         coinsReward: 25,
         difficulty: "hard",
       },
       {
         id: "fin-t-l1-a2",
         type: "true-false",
         question: "Diversificar investimentos reduz o risco?",
         instruction: "Responda Verdadeiro ou Falso",
         options: [
           { id: "true", text: "Verdadeiro", isCorrect: true },
           { id: "false", text: "Falso", isCorrect: false },
         ],
         coinsReward: 20,
         difficulty: "medium",
       },
       {
         id: "fin-t-l1-a3",
         type: "ordering",
         question: "Ordene as etapas de um planejamento financeiro",
         instruction: "Coloque na ordem correta",
         options: [
           { id: "1", text: "Analisar receitas e despesas" },
           { id: "2", text: "Definir metas" },
           { id: "3", text: "Criar orçamento" },
           { id: "4", text: "Acompanhar e ajustar" },
         ],
         correctOrder: ["1", "2", "3", "4"],
         coinsReward: 25,
         difficulty: "hard",
       },
       {
         id: "fin-t-l1-a4",
         type: "matching",
         question: "Ligue o tipo de investimento à sua característica",
         instruction: "Conecte corretamente",
         options: [
           { id: "p1", text: "Poupança", matchId: "p2" },
           { id: "p2", text: "Baixo risco", matchId: "p1" },
           { id: "a1", text: "Ações", matchId: "a2" },
           { id: "a2", text: "Alto risco", matchId: "a1" },
           { id: "t1", text: "Tesouro Direto", matchId: "t2" },
           { id: "t2", text: "Renda fixa", matchId: "t1" },
         ],
         coinsReward: 25,
         difficulty: "hard",
       },
       {
         id: "fin-t-l1-a5",
         type: "multiple-choice",
         question: "O que é inflação?",
         instruction: "Escolha a definição correta",
         options: [
           { id: "a", text: "Aumento geral dos preços ao longo do tempo", isCorrect: true },
           { id: "b", text: "Queda dos salários", isCorrect: false },
           { id: "c", text: "Aumento do dólar", isCorrect: false },
           { id: "d", text: "Taxa de desemprego", isCorrect: false },
         ],
         coinsReward: 20,
         difficulty: "medium",
       },
     ],
   },
 ];
 
 // Activities for "História: Brasil & Mundo" - Ages 12-15
 export const historiaBrasilMundoActivities: LessonActivities[] = [
   {
     lessonId: "lesson-1",
     activities: [
       {
         id: "hist-l1-a1",
         type: "multiple-choice",
         question: "Em que ano o Brasil foi descoberto?",
         instruction: "Escolha o ano correto",
         options: [
           { id: "a", text: "1492", isCorrect: false },
           { id: "b", text: "1500", isCorrect: true },
           { id: "c", text: "1822", isCorrect: false },
           { id: "d", text: "1889", isCorrect: false },
         ],
         coinsReward: 20,
         difficulty: "easy",
       },
       {
         id: "hist-l1-a2",
         type: "true-false",
         question: "A Independência do Brasil ocorreu em 1822?",
         instruction: "Responda Verdadeiro ou Falso",
         options: [
           { id: "true", text: "Verdadeiro", isCorrect: true },
           { id: "false", text: "Falso", isCorrect: false },
         ],
         coinsReward: 20,
         difficulty: "easy",
       },
       {
         id: "hist-l1-a3",
         type: "ordering",
         question: "Ordene os períodos históricos do Brasil",
         instruction: "Do mais antigo para o mais recente",
         options: [
           { id: "1", text: "Colônia" },
           { id: "2", text: "Império" },
           { id: "3", text: "República Velha" },
           { id: "4", text: "República Atual" },
         ],
         correctOrder: ["1", "2", "3", "4"],
         coinsReward: 25,
         difficulty: "medium",
       },
       {
         id: "hist-l1-a4",
         type: "matching",
         question: "Ligue o evento ao seu período",
         instruction: "Conecte corretamente",
         options: [
           { id: "d1", text: "Descobrimento", matchId: "d2" },
           { id: "d2", text: "1500", matchId: "d1" },
           { id: "i1", text: "Independência", matchId: "i2" },
           { id: "i2", text: "1822", matchId: "i1" },
           { id: "r1", text: "República", matchId: "r2" },
           { id: "r2", text: "1889", matchId: "r1" },
         ],
         coinsReward: 20,
         difficulty: "medium",
       },
       {
         id: "hist-l1-a5",
         type: "multiple-choice",
         question: "Quem proclamou a Independência do Brasil?",
         instruction: "Escolha a resposta correta",
         options: [
           { id: "a", text: "Dom João VI", isCorrect: false },
           { id: "b", text: "Dom Pedro I", isCorrect: true },
           { id: "c", text: "Getúlio Vargas", isCorrect: false },
           { id: "d", text: "Marechal Deodoro", isCorrect: false },
         ],
         coinsReward: 20,
         difficulty: "medium",
       },
     ],
   },
 ];
 
 // Activities for "Inglês Fluente" - Ages 12-15
 export const inglesFuenteActivities: LessonActivities[] = [
   {
     lessonId: "lesson-1",
     activities: [
       {
         id: "eng-l1-a1",
         type: "multiple-choice",
         question: "How do you say 'Olá' in English?",
         instruction: "Choose the correct translation",
         options: [
           { id: "a", text: "Goodbye", isCorrect: false },
           { id: "b", text: "Hello", isCorrect: true },
           { id: "c", text: "Thanks", isCorrect: false },
           { id: "d", text: "Please", isCorrect: false },
         ],
         coinsReward: 20,
         difficulty: "easy",
       },
       {
         id: "eng-l1-a2",
         type: "true-false",
         question: "'She is a teacher' is a correct sentence?",
         instruction: "Answer True or False",
         options: [
           { id: "true", text: "True", isCorrect: true },
           { id: "false", text: "False", isCorrect: false },
         ],
         coinsReward: 20,
         difficulty: "easy",
       },
       {
         id: "eng-l1-a3",
         type: "ordering",
         question: "Put the words in order to form a sentence",
         instruction: "Arrange correctly",
         options: [
           { id: "1", text: "I" },
           { id: "2", text: "am" },
           { id: "3", text: "learning" },
           { id: "4", text: "English" },
         ],
         correctOrder: ["1", "2", "3", "4"],
         coinsReward: 25,
         difficulty: "medium",
       },
       {
         id: "eng-l1-a4",
         type: "matching",
         question: "Match the word with its translation",
         instruction: "Connect correctly",
         options: [
           { id: "b1", text: "Book", matchId: "b2" },
           { id: "b2", text: "Livro", matchId: "b1" },
           { id: "h1", text: "House", matchId: "h2" },
           { id: "h2", text: "Casa", matchId: "h1" },
           { id: "s1", text: "School", matchId: "s2" },
           { id: "s2", text: "Escola", matchId: "s1" },
         ],
         coinsReward: 20,
         difficulty: "medium",
       },
       {
         id: "eng-l1-a5",
         type: "multiple-choice",
         question: "Complete: 'They ___ students.'",
         instruction: "Choose the correct verb",
         options: [
           { id: "a", text: "is", isCorrect: false },
           { id: "b", text: "are", isCorrect: true },
           { id: "c", text: "am", isCorrect: false },
           { id: "d", text: "be", isCorrect: false },
         ],
         coinsReward: 20,
         difficulty: "medium",
       },
     ],
   },
 ];
 
// Map course IDs to their activities
export const courseActivitiesMap: Record<string, LessonActivities[]> = {
  "alfabetizacao-divertida": alfabetizacaoActivities,
  "numeros-brincadeira": numerosActivities,
  "matematica-desafios": matematicaDesafiosActivities,
  "algebra-geometria": algebraGeometriaActivities,
   "natureza-amiga": naturezaAmigaActivities,
   "portugues-aventura": portuguesAventuraActivities,
   "ciencias-experimentos": cienciasExperimentosActivities,
   "educacao-financeira-kids": educacaoFinanceiraKidsActivities,
   "redacao-nota-mil": redacaoNotaMilActivities,
   "programacao-iniciantes": programacaoIniciantesActivities,
   "educacao-financeira-teens": educacaoFinanceiraTeensActivities,
   "historia-brasil-mundo": historiaBrasilMundoActivities,
   "ingles-fluente": inglesFuenteActivities,
};

// Generate default activities for courses without specific ones
export const generateDefaultActivities = (
  lessonId: string,
  courseTitle: string,
  ageMin: number
): Activity[] => {
  const difficulty = ageMin <= 8 ? "easy" : ageMin <= 11 ? "medium" : "hard";
  const coinBase = ageMin <= 8 ? 10 : ageMin <= 11 ? 15 : 20;

  return [
    {
      id: `${lessonId}-a1`,
      type: "multiple-choice",
      question: `Qual é o tema principal desta aula de ${courseTitle}?`,
      instruction: "Escolha a opção correta",
      options: [
        { id: "a", text: "Opção A - Correta", isCorrect: true },
        { id: "b", text: "Opção B", isCorrect: false },
        { id: "c", text: "Opção C", isCorrect: false },
        { id: "d", text: "Opção D", isCorrect: false },
      ],
      coinsReward: coinBase,
      difficulty,
    },
    {
      id: `${lessonId}-a2`,
      type: "true-false",
      question: `Esta aula faz parte do curso ${courseTitle}?`,
      instruction: "Responda Verdadeiro ou Falso",
      options: [
        { id: "true", text: "Verdadeiro", isCorrect: true },
        { id: "false", text: "Falso", isCorrect: false },
      ],
      coinsReward: coinBase,
      difficulty,
    },
    {
      id: `${lessonId}-a3`,
      type: "multiple-choice",
      question: "Você prestou atenção no vídeo?",
      instruction: "Escolha a resposta correta",
      options: [
        { id: "a", text: "Sim, muito!", isCorrect: true },
        { id: "b", text: "Não vi o vídeo", isCorrect: false },
        { id: "c", text: "Mais ou menos", isCorrect: false },
        { id: "d", text: "Não lembro", isCorrect: false },
      ],
      coinsReward: coinBase,
      difficulty,
    },
    {
      id: `${lessonId}-a4`,
      type: "true-false",
      question: "Aprender é divertido?",
      instruction: "Responda Verdadeiro ou Falso",
      options: [
        { id: "true", text: "Verdadeiro", isCorrect: true },
        { id: "false", text: "Falso", isCorrect: false },
      ],
      coinsReward: coinBase,
      difficulty,
    },
    {
      id: `${lessonId}-a5`,
      type: "multiple-choice",
      question: "O que você deve fazer após cada aula?",
      instruction: "Escolha a melhor opção",
      options: [
        { id: "a", text: "Praticar o que aprendeu", isCorrect: true },
        { id: "b", text: "Esquecer tudo", isCorrect: false },
        { id: "c", text: "Dormir", isCorrect: false },
        { id: "d", text: "Nada", isCorrect: false },
      ],
      coinsReward: coinBase,
      difficulty,
    },
  ];
};

// Get activities for a specific lesson
export const getActivitiesForLesson = (
  courseId: string,
  lessonId: string,
  courseTitle: string,
  ageMin: number
): Activity[] => {
  const courseActivities = courseActivitiesMap[courseId];
  if (courseActivities) {
    const lessonActivities = courseActivities.find(
      (la) => la.lessonId === lessonId
    );
    if (lessonActivities) {
      return lessonActivities.activities;
    }
  }
  return generateDefaultActivities(lessonId, courseTitle, ageMin);
};
