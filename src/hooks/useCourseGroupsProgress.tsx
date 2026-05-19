import { useCallback, useEffect, useState } from "react";

const XP_KEY = "pandoorga.xp";
const MEDALS_KEY = "pandoorga.medals";

export interface CourseGroupsProgress {
  videosWatched: number[];
  groupsCompleted: number[];
}

const DEFAULT: CourseGroupsProgress = { videosWatched: [], groupsCompleted: [] };

const storageKey = (courseId: string) => `pandoorga.course.${courseId}.progress`;

const read = (courseId: string): CourseGroupsProgress => {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = window.localStorage.getItem(storageKey(courseId));
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

export const useCourseGroupsProgress = (courseId: string) => {
  const [progress, setProgress] = useState<CourseGroupsProgress>(() => read(courseId));

  useEffect(() => {
    setProgress(read(courseId));
  }, [courseId]);

  useEffect(() => {
    window.localStorage.setItem(storageKey(courseId), JSON.stringify(progress));
  }, [courseId, progress]);

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

  const isGroupUnlocked = useCallback(
    (groupIndex: number) => groupIndex === 0 || progress.groupsCompleted.includes(groupIndex - 1),
    [progress]
  );

  return { progress, markVideoWatched, markGroupCompleted, addXp, addMedal, isGroupUnlocked };
};
