import type { GrupoParcial } from "./shared";
import { cap2aGrupos } from "./cap2a";
import { cap2bGrupos } from "./cap2b";

export const cap2Grupos: GrupoParcial[] = [...cap2aGrupos, ...cap2bGrupos];
