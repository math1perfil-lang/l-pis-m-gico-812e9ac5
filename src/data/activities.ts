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

// Map course IDs to their activities
export const courseActivitiesMap: Record<string, LessonActivities[]> = {
  "alfabetizacao-divertida": alfabetizacaoActivities,
  "numeros-brincadeira": numerosActivities,
  "matematica-desafios": matematicaDesafiosActivities,
  "algebra-geometria": algebraGeometriaActivities,
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
