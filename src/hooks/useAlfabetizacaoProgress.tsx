import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "pandoorga.alfabetizacao.progress";
const XP_KEY = "pandoorga.xp";
const MEDALS_KEY = "pandoorga.medals";

export interface AlfabetizacaoProgress {
  videosWatched: number[]; // indices of groups whose intro video was watched
  groupsCompleted: number[]; // indices of groups whose 10 activities are done
}

const DEFAULT: AlfabetizacaoProgress = {
  videosWatched: [],
  groupsCompleted: [],
};

const read = (): AlfabetizacaoProgress => {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT;
    const parsed = JSON.parse(raw);
    return {
      videosWatched: Array.isArray(parsed.videosWatched) ? parsed.videosWatched : [],
      groupsCompleted: Array.isArray(parsed.groupsCompleted) ? parsed.groupsCompleted : [],
    };
  } catch {
    return DEFAULT;
  }
};

export const useAlfabetizacaoProgress = () => {
  const [progress, setProgress] = useState<AlfabetizacaoProgress>(() => read());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const markVideoWatched = useCallback((groupIndex: number) => {
    setProgress((p) =>
      p.videosWatched.includes(groupIndex)
        ? p
        : { ...p, videosWatched: [...p.videosWatched, groupIndex] }
    );
  }, []);

  const markGroupCompleted = useCallback((groupIndex: number) => {
    setProgress((p) =>
      p.groupsCompleted.includes(groupIndex)
        ? p
        : { ...p, groupsCompleted: [...p.groupsCompleted, groupIndex] }
    );
  }, []);

  const addXp = useCallback((amount: number) => {
    const cur = parseInt(window.localStorage.getItem(XP_KEY) || "0", 10);
    window.localStorage.setItem(XP_KEY, String((Number.isFinite(cur) ? cur : 0) + amount));
  }, []);

  const addMedal = useCallback((medalId: string) => {
    try {
      const raw = window.localStorage.getItem(MEDALS_KEY);
      const list: string[] = raw ? JSON.parse(raw) : [];
      if (!list.includes(medalId)) {
        list.push(medalId);
        window.localStorage.setItem(MEDALS_KEY, JSON.stringify(list));
      }
    } catch {
      window.localStorage.setItem(MEDALS_KEY, JSON.stringify([medalId]));
    }
  }, []);

  const reset = useCallback(() => {
    setProgress(DEFAULT);
  }, []);

  const isGroupUnlocked = useCallback(
    (groupIndex: number) => {
      if (groupIndex === 0) return true;
      return progress.groupsCompleted.includes(groupIndex - 1);
    },
    [progress]
  );

  return {
    progress,
    markVideoWatched,
    markGroupCompleted,
    addXp,
    addMedal,
    reset,
    isGroupUnlocked,
  };
};
