import type { Activity } from "../activities";
import type { LessonGroup } from "../alfabetizacaoGrupos";
import { fromText } from "../portuguesDivertidoGrupos";

export { fromText, match, mc, order, read, IMG_CRIANCAS, IMG_FLORESTA, IMG_LETRAS, IMG_LIVRO } from "../portuguesDivertidoGrupos";

// Parte 2 do curso "Português em Ação" (9º ano). Ilustrações novas em /public/ilustracoes/portugues9.
export const IMG = "/ilustracoes/portugues9";

/** Marca várias questões como dependentes de um texto-base já lido. */
export const txt = (readingId: string, ...acts: Activity[]): Activity[] =>
  acts.map((a) => fromText(readingId, a));

/** Anexa uma ilustração (quadrinho etc.) a uma atividade. */
export const withImage = (a: Activity, imageUrl: string, imageCaption: string): Activity => ({
  ...a,
  imageUrl,
  imageCaption,
});

/** Grupo ainda sem número; o index.ts numera todos em sequência (p9-g5, p9-g6…). */
export type GrupoParcial = Omit<LessonGroup, "id" | "index">;

const PLACEHOLDER_VIDEO = "/videos/alfabetizacao-grupo-1.mp4";

export const grupo = (
  title: string,
  videoObjective: string,
  videoScript: string,
  videoThumbnail: string,
  activities: Activity[]
): GrupoParcial => ({
  title,
  videoTitle: title,
  videoObjective,
  videoScript,
  videoDurationLabel: "3 min",
  videoUrl: PLACEHOLDER_VIDEO,
  videoThumbnail,
  groupCoinsBonus: 10,
  activities,
});
