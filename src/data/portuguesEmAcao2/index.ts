import type { LessonGroup } from "../alfabetizacaoGrupos";
import type { GrupoParcial } from "./shared";
import { cap1Grupos } from "./cap1";
import { cap2Grupos } from "./cap2";
import { cap3Grupos } from "./cap3";
import { unidade2Grupos } from "./unidade2";

// Parte 2 do 9º ano: capítulo 1 (fim), capítulos 2 e 3 da unidade 1 e unidade 2.
// Os grupos continuam a numeração da Parte 1 (que tem 4 grupos): p9-g5, p9-g6…
const FIRST_NUMBER = 5;

const todos: GrupoParcial[] = [...cap1Grupos, ...cap2Grupos, ...cap3Grupos, ...unidade2Grupos];

export const portuguesEmAcaoGrupos2: LessonGroup[] = todos.map((g, i) => ({
  ...g,
  id: `p9-g${FIRST_NUMBER + i}`,
  index: FIRST_NUMBER - 1 + i,
}));
