import type { Activity } from "./activities";
import { portuguesDivertidoGrupos } from "./portuguesDivertidoGrupos";

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
  activities: Activity[];
}

// Curso "Português Divertido" (id interno: alfabetizacao-divertida).
// Contém apenas os 11 grupos baseados no livro; ver portuguesDivertidoGrupos.ts.
export const alfabetizacaoGrupos: LessonGroup[] = portuguesDivertidoGrupos;

export const getAlfabetizacaoGroups = () => alfabetizacaoGrupos;
