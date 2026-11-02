import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { contentDb } from "@/hooks/useContent";

// Diz se a pessoa logada pode usar o painel de educação e com qual alcance:
// gestão (admin) edita tudo; docente (educador) edita só as matérias atribuídas.
export const useContentEditor = () => {
  const { user, loading: authLoading } = useAuth();
  const [allowed, setAllowed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [courseIds, setCourseIds] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;
    if (authLoading) return;
    if (!user) {
      setAllowed(false);
      setIsAdmin(false);
      setCourseIds([]);
      setChecking(false);
      return;
    }
    setChecking(true);
    (async () => {
      const [roles, teacher] = await Promise.all([
        contentDb.from("user_roles").select("role").eq("user_id", user.id),
        contentDb.from("teachers").select("display_name, course_ids, active").eq("user_id", user.id).maybeSingle(),
      ]);
      if (!active) return;
      const list: string[] = ((roles.data ?? []) as Array<{ role: string }>).map((r) => r.role);
      const admin = list.includes("admin");
      const t = teacher.data as { display_name: string; course_ids: string[]; active: boolean } | null;
      const educator = list.includes("educador") && !!t?.active;
      setIsAdmin(admin);
      setAllowed(admin || educator);
      setCourseIds(admin ? [] : educator ? t?.course_ids ?? [] : []);
      setName(t?.display_name ?? "");
      setChecking(false);
    })().catch(() => {
      if (!active) return;
      setAllowed(false);
      setChecking(false);
    });
    return () => {
      active = false;
    };
  }, [user, authLoading]);

  return { user, allowed, isAdmin, courseIds, name, loading: authLoading || checking };
};
