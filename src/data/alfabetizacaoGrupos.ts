import type { Activity } from "./activities";
import { portuguesDivertidoGrupos } from "./portuguesDivertidoGrupos";
import { portuguesDivertidoGrupos2 } from "./portuguesDivertidoGrupos2";
import { portuguesDivertidoGrupos3 } from "./portuguesDivertidoGrupos3";
import { portuguesDivertidoGrupos4 } from "./portuguesDivertidoGrupos4";

export interface LessonGroup {
  id: string;
  index: number;
  title: string;
  videoTitle: string;
  videoObjective: string;
  videoScript: string;
  videoDurationLabel: string;
  videoUrl: string;
  videoThumbnail: string;
  groupCoinsBonus: number;
  // Vídeo animado feito no próprio app (em vez de arquivo de vídeo). Ver AnimatedGroupVideo.
  animation?: "era-uma-vez";
  activities: Activity[];
}

// Curso "Português Divertido" (id interno: alfabetizacao-divertida).
// Contém apenas os grupos baseados no livro (Parte 1: 1-11; Parte 2: 12-31; Parte 3: 32-47).
// Ver portuguesDivertidoGrupos.ts, ...2.ts e ...3.ts.
export const alfabetizacaoGrupos: LessonGroup[] = [
  ...portuguesDivertidoGrupos,
  ...portuguesDivertidoGrupos2,
  ...portuguesDivertidoGrupos3,
  ...portuguesDivertidoGrupos4,
];

export const getAlfabetizacaoGroups = () => alfabetizacaoGrupos;
