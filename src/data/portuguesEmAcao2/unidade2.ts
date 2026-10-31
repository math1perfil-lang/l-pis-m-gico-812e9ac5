import type { GrupoParcial } from "./shared";
import { unidade2aGrupos } from "./unidade2a";
import { unidade2bGrupos } from "./unidade2b";

export const unidade2Grupos: GrupoParcial[] = [...unidade2aGrupos, ...unidade2bGrupos];
