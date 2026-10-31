import { useEffect, useSyncExternalStore } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  getOverlayVersion,
  setOverlay,
  subscribeOverlay,
  type ActivityRow,
  type CourseRow,
  type GroupRow,
  type Overlay,
} from "@/data/contentOverlay";

// O cliente do Supabase não conhece as tabelas de conteúdo; usamos um cliente sem tipos para elas.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const contentDb = supabase as any;

const CACHE_KEY = "pandoorga-content-overlay-v1";
const PAGE = 1000;

async function fetchAll<T>(table: string): Promise<T[]> {
  const out: T[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await contentDb
      .from(table)
      .select("*")
      .order("id", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw error;
    out.push(...((data ?? []) as T[]));
    if (!data || data.length < PAGE) break;
  }
  return out;
}

const readCache = (): Overlay | null => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as Overlay) : null;
  } catch {
    return null;
  }
};
const writeCache = (o: Overlay) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(o));
  } catch {
    /* sem armazenamento: segue sem cache */
  }
};

// Busca as edições do painel no banco e aplica ao app.
export async function reloadContent(): Promise<void> {
  try {
    const [courses, groups, activities] = await Promise.all([
      fetchAll<CourseRow>("content_courses"),
      fetchAll<GroupRow>("content_groups"),
      fetchAll<ActivityRow>("content_activities"),
    ]);
    const next = { courses, groups, activities };
    setOverlay(next);
    writeCache(next);
  } catch {
    /* sem rede ou tabelas ainda não criadas: mantém o conteúdo atual */
  }
}

// Chame uma vez no topo do app: aplica o cache na hora e atualiza em seguida.
export const useContentLoader = () => {
  useEffect(() => {
    const cached = readCache();
    if (cached) setOverlay(cached);
    void reloadContent();
  }, []);
};

// Faz o componente redesenhar quando o conteúdo é atualizado.
export const useContentVersion = () => useSyncExternalStore(subscribeOverlay, getOverlayVersion);
