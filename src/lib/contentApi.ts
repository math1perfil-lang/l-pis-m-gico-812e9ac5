import { supabase } from "@/integrations/supabase/client";
import { contentDb } from "@/hooks/useContent";
import {
  getOverlay,
  rowKey,
  setOverlay,
  type ActivityRow,
  type CourseRow,
  type EditableActivity,
  type EditableGroup,
  type GroupRow,
  type Overlay,
} from "@/data/contentOverlay";
import type { Course } from "@/data/courses";
import type { Activity } from "@/data/activities";
import type { LessonGroup } from "@/data/alfabetizacaoGrupos";

// Operações do painel de educação: gravam no banco e atualizam o app na hora.

type Table = "content_courses" | "content_groups" | "content_activities";

const rid = () => Math.random().toString(36).slice(2, 8);
const slug = (t: string) =>
  t
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 30) || "item";

const currentUserId = async () => (await supabase.auth.getUser()).data.user?.id ?? null;

const listFor = (ov: Overlay, table: Table) =>
  (table === "content_courses" ? ov.courses : table === "content_groups" ? ov.groups : ov.activities) as Array<{
    id: string;
  }>;

const withList = (ov: Overlay, table: Table, list: unknown[]): Overlay =>
  table === "content_courses"
    ? { ...ov, courses: list as CourseRow[] }
    : table === "content_groups"
      ? { ...ov, groups: list as GroupRow[] }
      : { ...ov, activities: list as ActivityRow[] };

const mergeLocal = (table: Table, rows: Array<{ id: string }>) => {
  const ov = getOverlay();
  const ids = new Set(rows.map((r) => r.id));
  const kept = listFor(ov, table).filter((r) => !ids.has(r.id));
  setOverlay(withList(ov, table, [...kept, ...rows]));
};

const removeLocal = (table: Table, ids: string[]) => {
  const ov = getOverlay();
  const drop = new Set(ids);
  setOverlay(withList(ov, table, listFor(ov, table).filter((r) => !drop.has(r.id))));
};

async function upsertRows(table: Table, rows: Array<{ id: string } & Record<string, unknown>>) {
  if (!rows.length) return;
  const uid = await currentUserId();
  const payload = rows.map((r) => ({ ...r, updated_by: uid }));
  const { error } = await contentDb.from(table).upsert(payload, { onConflict: "id" });
  if (error) throw new Error(error.message);
  mergeLocal(table, rows);
}

async function deleteRows(table: Table, ids: string[]) {
  if (!ids.length) return;
  const { error } = await contentDb.from(table).delete().in("id", ids);
  if (error) throw new Error(error.message);
  removeLocal(table, ids);
}

const findRow = <T extends { id: string }>(table: Table, id: string) =>
  listFor(getOverlay(), table).find((r) => r.id === id) as T | undefined;

// ---------- Cursos ----------
export interface CourseFields {
  title: string;
  description: string;
  image: string;
  ageMin: number;
  ageMax: number;
  duration: string;
  category: string;
  schoolYear: string;
}

const courseData = (f: CourseFields) => ({
  title: f.title,
  description: f.description,
  image: f.image,
  ageMin: f.ageMin,
  ageMax: f.ageMax,
  duration: f.duration,
  category: f.category,
});

export async function createCourse(f: CourseFields): Promise<string> {
  const id = `${slug(f.title)}-${rid()}`;
  await upsertRows("content_courses", [
    { id, data: courseData(f), school_year: f.schoolYear, position: null, is_custom: true, deleted: false },
  ]);
  return id;
}

export async function saveCourse(id: string, f: CourseFields) {
  const row = findRow<CourseRow>("content_courses", id);
  await upsertRows("content_courses", [
    {
      id,
      data: courseData(f),
      school_year: f.schoolYear,
      position: row?.position ?? null,
      is_custom: row?.is_custom ?? false,
      deleted: row?.deleted ?? false,
    },
  ]);
}

export async function removeCourse(course: Course) {
  const row = findRow<CourseRow>("content_courses", course.id);
  if (row?.is_custom) {
    const ov = getOverlay();
    await deleteRows("content_activities", ov.activities.filter((r) => r.course_id === course.id).map((r) => r.id));
    await deleteRows("content_groups", ov.groups.filter((r) => r.course_id === course.id).map((r) => r.id));
    await deleteRows("content_courses", [course.id]);
    return;
  }
  await upsertRows("content_courses", [
    {
      id: course.id,
      data: row?.data ?? {},
      school_year: row?.school_year ?? course.schoolYear ?? null,
      position: row?.position ?? null,
      is_custom: false,
      deleted: true,
    },
  ]);
}

export async function restoreCourse(id: string) {
  const row = findRow<CourseRow>("content_courses", id);
  if (!row) return;
  await upsertRows("content_courses", [{ ...row, deleted: false }]);
}

// ---------- Grupos ----------
export interface GroupFields {
  title: string;
  videoTitle: string;
  videoObjective: string;
  videoScript: string;
  videoDurationLabel: string;
  videoUrl: string;
  videoThumbnail: string;
  groupCoinsBonus: number;
}

export const groupFieldsOf = (g: EditableGroup | LessonGroup): GroupFields => ({
  title: g.title,
  videoTitle: g.videoTitle,
  videoObjective: g.videoObjective,
  videoScript: g.videoScript,
  videoDurationLabel: g.videoDurationLabel,
  videoUrl: g.videoUrl,
  videoThumbnail: g.videoThumbnail,
  groupCoinsBonus: g.groupCoinsBonus,
});

export async function createGroup(courseId: string, f: GroupFields): Promise<string> {
  const gid = `g-${rid()}`;
  await upsertRows("content_groups", [
    {
      id: rowKey(courseId, gid),
      course_id: courseId,
      data: { ...f, id: gid, index: 0 },
      position: null,
      is_custom: true,
      deleted: false,
    },
  ]);
  return gid;
}

export async function saveGroup(courseId: string, groupId: string, f: GroupFields) {
  const key = rowKey(courseId, groupId);
  const row = findRow<GroupRow>("content_groups", key);
  await upsertRows("content_groups", [
    {
      id: key,
      course_id: courseId,
      data: { ...(row?.data ?? {}), ...f },
      position: row?.position ?? null,
      is_custom: row?.is_custom ?? false,
      deleted: row?.deleted ?? false,
    },
  ]);
}

export async function removeGroup(courseId: string, group: EditableGroup) {
  const key = rowKey(courseId, group.id);
  const row = findRow<GroupRow>("content_groups", key);
  if (row?.is_custom) {
    const acts = getOverlay().activities.filter((r) => r.course_id === courseId && r.group_id === group.id);
    await deleteRows("content_activities", acts.map((r) => r.id));
    await deleteRows("content_groups", [key]);
    return;
  }
  await upsertRows("content_groups", [
    {
      id: key,
      course_id: courseId,
      data: row?.data ?? {},
      position: row?.position ?? null,
      is_custom: false,
      deleted: true,
    },
  ]);
}

export async function restoreGroup(courseId: string, groupId: string) {
  const row = findRow<GroupRow>("content_groups", rowKey(courseId, groupId));
  if (row) await upsertRows("content_groups", [{ ...row, deleted: false }]);
}

// Grava a nova ordem dos grupos (atenção: o progresso dos alunos é guardado pela posição).
export async function reorderGroups(courseId: string, ordered: EditableGroup[]) {
  const rows = ordered.map((g, i) => {
    const key = rowKey(courseId, g.id);
    const row = findRow<GroupRow>("content_groups", key);
    return {
      id: key,
      course_id: courseId,
      data: row?.data ?? {},
      position: i * 10,
      is_custom: row?.is_custom ?? false,
      deleted: row?.deleted ?? false,
    };
  });
  await upsertRows("content_groups", rows);
}

// ---------- Atividades ----------
const STRIP = ["_groupId", "_custom", "_edited", "_deleted", "id"];
export const activityData = (a: EditableActivity | Activity): Record<string, unknown> => {
  const out: Record<string, unknown> = {};
  Object.entries(a).forEach(([k, v]) => {
    if (!STRIP.includes(k) && v !== undefined) out[k] = v;
  });
  return out;
};

export async function createActivity(courseId: string, groupId: string, a: Activity): Promise<string> {
  const aid = `${groupId}-n${rid()}`;
  await upsertRows("content_activities", [
    {
      id: rowKey(courseId, aid),
      group_id: groupId,
      course_id: courseId,
      data: activityData(a),
      position: null,
      is_custom: true,
      deleted: false,
    },
  ]);
  return aid;
}

export async function saveActivity(courseId: string, groupId: string, a: EditableActivity) {
  const key = rowKey(courseId, a.id);
  const row = findRow<ActivityRow>("content_activities", key);
  await upsertRows("content_activities", [
    {
      id: key,
      group_id: row?.group_id ?? groupId,
      course_id: courseId,
      data: activityData(a),
      position: row?.position ?? null,
      is_custom: row?.is_custom ?? !!a._custom,
      deleted: row?.deleted ?? false,
    },
  ]);
}

export async function removeActivity(courseId: string, a: EditableActivity) {
  const key = rowKey(courseId, a.id);
  const row = findRow<ActivityRow>("content_activities", key);
  if (row?.is_custom || a._custom) {
    await deleteRows("content_activities", [key]);
    return;
  }
  await upsertRows("content_activities", [
    {
      id: key,
      group_id: row?.group_id ?? a._groupId,
      course_id: courseId,
      data: row?.data ?? {},
      position: row?.position ?? null,
      is_custom: false,
      deleted: true,
    },
  ]);
}

export async function restoreActivity(courseId: string, a: EditableActivity) {
  const row = findRow<ActivityRow>("content_activities", rowKey(courseId, a.id));
  if (row) await upsertRows("content_activities", [{ ...row, deleted: false }]);
}

// Volta uma atividade editada ao texto original do código.
export async function resetActivity(courseId: string, a: EditableActivity) {
  const key = rowKey(courseId, a.id);
  const row = findRow<ActivityRow>("content_activities", key);
  if (!row || row.is_custom) return;
  await deleteRows("content_activities", [key]);
}

// Grava a nova ordem das atividades de um grupo.
export async function reorderActivities(courseId: string, groupId: string, ordered: EditableActivity[]) {
  const rows = ordered.map((a, i) => {
    const key = rowKey(courseId, a.id);
    const row = findRow<ActivityRow>("content_activities", key);
    return {
      id: key,
      group_id: groupId,
      course_id: courseId,
      data: row?.data ?? (a._custom ? activityData(a) : {}),
      position: i * 10,
      is_custom: row?.is_custom ?? !!a._custom,
      deleted: row?.deleted ?? false,
    };
  });
  await upsertRows("content_activities", rows);
}

// Duplica uma atividade logo depois da original.
export async function duplicateActivity(courseId: string, groupId: string, all: EditableActivity[], a: EditableActivity) {
  const aid = `${groupId}-n${rid()}`;
  const copy: EditableActivity = { ...a, id: aid, _groupId: groupId, _custom: true, _edited: false, _deleted: false };
  const live = all.filter((x) => !x._deleted);
  const at = live.findIndex((x) => x.id === a.id);
  const ordered = [...live.slice(0, at + 1), copy, ...live.slice(at + 1)];
  await upsertRows("content_activities", [
    {
      id: rowKey(courseId, aid),
      group_id: groupId,
      course_id: courseId,
      data: activityData(a),
      position: null,
      is_custom: true,
      deleted: false,
    },
  ]);
  await reorderActivities(courseId, groupId, ordered);
  return aid;
}

// Move uma atividade para outro grupo do mesmo curso (vai para o fim).
export async function moveActivityToGroup(courseId: string, a: EditableActivity, targetGroupId: string) {
  const key = rowKey(courseId, a.id);
  const row = findRow<ActivityRow>("content_activities", key);
  await upsertRows("content_activities", [
    {
      id: key,
      group_id: targetGroupId,
      course_id: courseId,
      data: row?.data ?? (a._custom ? activityData(a) : {}),
      position: null,
      is_custom: row?.is_custom ?? !!a._custom,
      deleted: false,
    },
  ]);
}

// ---------- Imagens ----------
const resizeToJpeg = (file: File, max = 1000): Promise<Blob> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Não foi possível processar a imagem"));
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Falha ao converter a imagem"))), "image/jpeg", 0.82);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Arquivo de imagem inválido"));
    };
    img.src = url;
  });

export async function uploadContentImage(file: File, folder: string): Promise<string> {
  const blob = await resizeToJpeg(file);
  const path = `${slug(folder)}/${Date.now()}-${rid()}.jpg`;
  const { error } = await supabase.storage.from("content-images").upload(path, blob, {
    contentType: "image/jpeg",
    upsert: false,
  });
  if (error) throw new Error(error.message);
  return supabase.storage.from("content-images").getPublicUrl(path).data.publicUrl;
}
