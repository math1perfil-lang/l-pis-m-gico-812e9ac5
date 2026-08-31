import { useCourseGroupsProgress } from "@/hooks/useCourseGroupsProgress";

export interface AlfabetizacaoProgress {
  videosWatched: number[];
  groupsCompleted: number[];
}

const COURSE_ID = "alfabetizacao-divertida";

export const useAlfabetizacaoProgress = () => {
  const base = useCourseGroupsProgress(COURSE_ID);
  return { ...base, reset: () => {} };
};
