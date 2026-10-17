import type { Activity } from "./activities";

/**
 * Kit para criar atividades das trilhas de conhecimento.
 *
 * Padrão de cada módulo (10 atividades):
 *   - 1 a 3  → "easy"   (reconhecer / lembrar)
 *   - 4 a 7  → "medium" (aplicar em situações do dia a dia)
 *   - 8 a 10 → "hard"   (raciocinar em mais de uma etapa)
 *   - Tipos: 1 ordenação, 1 ligar pares, 2 ou 3 verdadeiro/falso, o restante múltipla escolha.
 *   - Moedas por atividade variam conforme a dificuldade e a faixa etária.
 */

export type AgeBand = "6-8" | "9-11" | "12-15";
export type Difficulty = Activity["difficulty"];

export const COINS_BY_BAND: Record<AgeBand, Record<Difficulty, number>> = {
  "6-8": { easy: 3, medium: 5, hard: 8 },
  "9-11": { easy: 4, medium: 7, hard: 10 },
  "12-15": { easy: 5, medium: 8, hard: 12 },
};

export const MODULE_BONUS_BY_BAND: Record<AgeBand, number> = {
  "6-8": 10,
  "9-11": 15,
  "12-15": 20,
};

export interface GroupSpec {
  title: string;
  objective: string;
  script: string;
  thumb: string;
  activities: Activity[];
}

export const createKit = (band: AgeBand) => {
  const coins = (d: Difficulty) => COINS_BY_BAND[band][d];

  /** Múltipla escolha: 4 alternativas, exatamente uma correta. */
  const mc = (
    difficulty: Difficulty,
    question: string,
    opts: Array<[string, boolean]>,
    instruction = "Escolha a resposta certa"
  ): Activity => ({
    id: "tmp",
    type: "multiple-choice",
    question,
    instruction,
    options: opts.map(([text, isCorrect], i) => ({ id: `o${i}`, text, isCorrect })),
    coinsReward: coins(difficulty),
    difficulty,
  });

  /** Verdadeiro ou falso. */
  const tf = (difficulty: Difficulty, question: string, answer: boolean): Activity => ({
    id: "tmp",
    type: "true-false",
    question,
    instruction: "Verdadeiro ou Falso",
    options: [
      { id: "true", text: "Verdadeiro", isCorrect: answer },
      { id: "false", text: "Falso", isCorrect: !answer },
    ],
    coinsReward: coins(difficulty),
    difficulty,
  });

  /** Ordenação: passe os itens JÁ NA ORDEM CORRETA (o app embaralha na tela). */
  const ord = (difficulty: Difficulty, question: string, itemsInOrder: string[]): Activity => ({
    id: "tmp",
    type: "ordering",
    question,
    instruction: "Coloque na ordem certa",
    options: itemsInOrder.map((text, i) => ({ id: `i${i}`, text })),
    correctOrder: itemsInOrder.map((_, i) => `i${i}`),
    coinsReward: coins(difficulty),
    difficulty,
  });

  /** Ligar pares: de 3 a 4 pares [esquerda, direita]. */
  const mt = (difficulty: Difficulty, question: string, pairs: Array<[string, string]>): Activity => ({
    id: "tmp",
    type: "matching",
    question,
    instruction: "Conecte os pares",
    options: pairs.flatMap(([left, right], i) => [
      { id: `l${i}`, text: left, matchId: `r${i}` },
      { id: `r${i}`, text: right, matchId: `l${i}` },
    ]),
    coinsReward: coins(difficulty),
    difficulty,
  });

  return { mc, tf, ord, mt };
};
