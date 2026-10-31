import type { GrupoParcial } from "./shared";
import { cap3aGrupos } from "./cap3a";
import { cap3bGrupos } from "./cap3b";

export const cap3Grupos: GrupoParcial[] = [...cap3aGrupos, ...cap3bGrupos];
