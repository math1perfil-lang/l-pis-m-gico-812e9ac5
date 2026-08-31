import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useCoins } from "@/hooks/useCoins";

export interface CourseGroupsProgress {
  videosWatched: number[];
  groupsCompleted: number[];
}

const DEFAULT: CourseGroupsProgress = { videosWatched: [], groupsCompleted: [] };

export const useCourseGroupsProgress = (courseId: string) => {
  const { user } = useAuth();
  const { addXp } = useCoins();
  const [progress, setProgress] = useState<CourseGroupsProgress>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const ref = useRef<CourseGroupsProgress>(DEFAULT);
  ref.current = progress;

  useEffect(() => {
    let active = true;
    const load = async () => {
      if (!user || !courseId) {
        setProgress(DEFAULT);
        setLoading(false);
        return;
      }
      setLoading(true);
      const { data } = await supabase
        .from("course_progress")
        .select("videos_watched, groups_completed")
        .eq("user_id", user.id)
        .eq("course_id", courseId)
        .maybeSingle();
      if (!active) return;
      setProgress({
        videosWatched: data?.videos_watched ?? [],
        groupsCompleted: data?.groups_completed ?? [],
      });
      setLoading(false);
    };
    load();
    return () => {
      active = false;
    };
  }, [user, courseId]);

  const persist = useCallback(
    async (next: CourseGroupsProgress) => {
      if (!user || !courseId) return;
      await supabase.from("course_progress").upsert(
        {
          user_id: user.id,
          course_id: courseId,
          videos_watched: next.videosWatched,
          groups_completed: next.groupsCompleted,
        },
        { onConflict: "user_id,course_id" }
      );
    },
    [user, courseId]
  );

  const markVideoWatched = useCallback(
    (groupIndex: number) => {
      if (ref.current.videosWatched.includes(groupIndex)) return;
      const next = {
        ...ref.current,
        videosWatched: [...ref.current.videosWatched, groupIndex],
      };
      setProgress(next);
      persist(next);
    },
    [persist]
  );

  const markGroupCompleted = useCallback(
    (groupIndex: number) => {
      if (ref.current.groupsCompleted.includes(groupIndex)) return;
      const next = {
        ...ref.current,
        groupsCompleted: [...ref.current.groupsCompleted, groupIndex],
      };
      setProgress(next);
      persist(next);
    },
    [persist]
  );

  const addMedal = useCallback(
    async (medalId: string) => {
      if (!user) return;
      await supabase
        .from("user_medals")
        .upsert({ user_id: user.id, medal_id: medalId }, { onConflict: "user_id,medal_id" });
    },
    [user]
  );

  const isGroupUnlocked = useCallback(
    (groupIndex: number) => groupIndex === 0 || progress.groupsCompleted.includes(groupIndex - 1),
    [progress]
  );

  return {
    progress,
    loading,
    markVideoWatched,
    markGroupCompleted,
    addXp,
    addMedal,
    isGroupUnlocked,
  };
};
