import type { Activity } from "./activities";
import type { LessonGroup } from "./alfabetizacaoGrupos";

// Sobreposição de conteúdo: o painel de educação grava edições no banco
// e elas são aplicadas por cima do conteúdo que já existe no código.

export interface CourseRow {
  id: string;
  data: Record<string, unknown>;
  school_year: string | null;
  position: number | null;
  is_custom: boolean;
  deleted: boolean;
}
export interface GroupRow {
  id: string; // `${courseId}:${groupId}`
  course_id: string;
  data: Record<string, unknown>;
  position: number | null;
  is_custom: boolean;
  deleted: boolean;
}
export interface ActivityRow {
  id: string; // `${courseId}:${activityId}`
  group_id: string; // id do grupo (sem prefixo do curso)
  course_id: string;
  data: Record<string, unknown>;
  position: number | null;
  is_custom: boolean;
  deleted: boolean;
}

export interface Overlay {
  courses: CourseRow[];
  groups: GroupRow[];
  activities: ActivityRow[];
}

export const rowKey = (courseId: string, id: string) => `${courseId}:${id}`;

const EMPTY: Overlay = { courses: [], groups: [], activities: [] };

let overlay: Overlay = EMPTY;
let version = 0;
const listeners = new Set<() => void>();

export const getOverlay = () => overlay;
export const getOverlayVersion = () => version;
export const subscribeOverlay = (fn: () => void) => {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
};
export const setOverlay = (next: Overlay) => {
  overlay = next;
  version += 1;
  listeners.forEach((l) => l());
};

// ---------- Tipos editáveis (usados pelo painel) ----------
export type EditableActivity = Activity & {
  _groupId: string;
  _custom?: boolean;
  _edited?: boolean;
  _deleted?: boolean;
};
export type EditableGroup = Omit<LessonGroup, "activities"> & {
  activities: EditableActivity[];
  _custom?: boolean;
  _edited?: boolean;
  _deleted?: boolean;
};

const LAST = 1e9;

// Aplica o overlay aos grupos de um curso. `base` são os grupos do código.
export const mergeGroups = (
  courseId: string,
  base: LessonGroup[],
  includeDeleted = false,
  ov: Overlay = overlay
): EditableGroup[] => {
  const gRows = ov.groups.filter((r) => r.course_id === courseId);
  const aRows = ov.activities.filter((r) => r.course_id === courseId);
  if (!gRows.length && !aRows.length) {
    return base.map((g) => ({
      ...g,
      activities: g.activities.map((a) => ({ ...a, _groupId: g.id })),
    }));
  }

  const gMap = new Map(gRows.map((r) => [r.id, r]));
  const aMap = new Map(aRows.map((r) => [r.id, r]));

  // Atividades por grupo, com posição
  const buckets = new Map<string, Array<{ pos: number; act: EditableActivity }>>();
  const push = (groupId: string, pos: number, act: EditableActivity) => {
    if (!buckets.has(groupId)) buckets.set(groupId, []);
    buckets.get(groupId)!.push({ pos, act });
  };

  base.forEach((g) => {
    g.activities.forEach((a, i) => {
      const row = aMap.get(rowKey(courseId, a.id));
      if (row?.deleted && !includeDeleted) return;
      const groupId = row?.group_id ?? g.id;
      // Edição completa (tem "type") substitui a atividade inteira; senão só sobrepõe campos.
      const data = row?.data as Partial<Activity> | undefined;
      const merged = (data && "type" in data ? data : { ...a, ...data }) as Activity;
      push(groupId, row?.position ?? (groupId !== g.id ? LAST : i * 10), {
        ...merged,
        id: a.id,
        _groupId: groupId,
        _edited: !!row,
        _deleted: !!row?.deleted,
      });
    });
  });
  const baseActIds = new Set(base.flatMap((g) => g.activities.map((a) => rowKey(courseId, a.id))));
  aRows.forEach((row) => {
    if (baseActIds.has(row.id)) return;
    if (row.deleted && !includeDeleted) return;
    const actId = row.id.slice(courseId.length + 1);
    push(row.group_id, row.position ?? LAST, {
      ...(row.data as unknown as Activity),
      id: actId,
      _groupId: row.group_id,
      _custom: true,
      _deleted: row.deleted,
    });
  });

  const buildGroup = (
    meta: Omit<LessonGroup, "activities">,
    pos: number,
    flags: { custom?: boolean; edited?: boolean; deleted?: boolean }
  ) => {
    const acts = (buckets.get(meta.id) ?? []).sort((a, b) => a.pos - b.pos).map((x) => x.act);
    return {
      pos,
      group: {
        ...meta,
        activities: acts,
        _custom: flags.custom,
        _edited: flags.edited,
        _deleted: flags.deleted,
      } as EditableGroup,
    };
  };

  const built: Array<{ pos: number; group: EditableGroup }> = [];
  base.forEach((g, i) => {
    const row = gMap.get(rowKey(courseId, g.id));
    if (row?.deleted && !includeDeleted) return;
    const { activities: _ignore, ...baseMeta } = g;
    const meta = { ...baseMeta, ...(row?.data as Partial<LessonGroup>), id: g.id } as Omit<LessonGroup, "activities">;
    built.push(buildGroup(meta, row?.position ?? i * 10, { edited: !!row, deleted: !!row?.deleted }));
  });
  const baseGroupIds = new Set(base.map((g) => rowKey(courseId, g.id)));
  gRows.forEach((row) => {
    if (baseGroupIds.has(row.id)) return;
    if (row.deleted && !includeDeleted) return;
    const gid = row.id.slice(courseId.length + 1);
    const meta = { ...(row.data as unknown as Omit<LessonGroup, "activities">), id: gid };
    built.push(buildGroup(meta, row.position ?? LAST, { custom: true, deleted: row.deleted }));
  });

  built.sort((a, b) => a.pos - b.pos);
  let idx = 0;
  return built.map(({ group }) => {
    // O progresso dos alunos é guardado pela posição do grupo na lista.
    const index = group._deleted ? -1 : idx++;
    return { ...group, index };
  });
};
