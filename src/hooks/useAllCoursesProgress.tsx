import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { getCourseGroups } from "@/data/courseGroups";
import type { Course } from "@/data/courses";
import { useContentVersion } from "@/hooks/useContent";

export interface CourseProgressSummary {
  completed: number; // grupos concluídos de verdade
  total: number; // total de grupos do curso
  percent: number; // 0 a 100
}

/** Progresso real de todos os cursos, lido do que a pessoa de fato concluiu (nada de números de exemplo). */
export const useAllCoursesProgress = () => {
  const { user } = useAuth();
  useContentVersion();
  const [done, setDone] = useState<Record<string, number[]>>({});

  useEffect(() => {
    let active = true;
    if (!user) {
      setDone({});
      return;
    }
    supabase
      .from("course_progress")
      .select("course_id, groups_completed")
      .eq("user_id", user.id)
      .then(({ data }) => {
        if (!active) return;
        const map: Record<string, number[]> = {};
        (data ?? []).forEach((row) => {
          map[row.course_id] = row.groups_completed ?? [];
        });
        setDone(map);
      });
    return () => {
      active = false;
    };
  }, [user]);

  const summaryFor = (course: Pick<Course, "id" | "totalLessons">): CourseProgressSummary => {
    const groups = getCourseGroups(course.id);
    const total = groups ? groups.length : course.totalLessons;
    // conta só índices que existem no curso (evita passar de 100%)
    const completed = (done[course.id] ?? []).filter((i) => i >= 0 && i < total).length;
    return { completed, total, percent: total > 0 ? Math.round((completed / total) * 100) : 0 };
  };

  return { summaryFor };
};
