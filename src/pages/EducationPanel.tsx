import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowDown, ArrowLeft, ArrowUp, BookOpen, ChevronDown, ChevronRight, Copy, Eye, EyeOff, FolderPlus,
  Pencil, Plus, RotateCcw, Search, Trash2, Undo2,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActivityDialog, typeLabel } from "@/components/education/ActivityDialog";
import { CourseDialog } from "@/components/education/CourseDialog";
import { GroupDialog } from "@/components/education/GroupDialog";
import { getAllCourses, type Course } from "@/data/courses";
import { getEditableCourseGroups } from "@/data/courseGroups";
import type { EditableActivity, EditableGroup } from "@/data/contentOverlay";
import { useContentVersion, reloadContent } from "@/hooks/useContent";
import { useContentEditor } from "@/hooks/useContentEditor";
import {
  createActivity, createCourse, createGroup, duplicateActivity, groupFieldsOf, moveActivityToGroup,
  removeActivity, removeCourse, removeGroup, reorderActivities, reorderGroups, resetActivity,
  restoreActivity, restoreCourse, restoreGroup, saveActivity, saveCourse, saveGroup,
  type CourseFields, type GroupFields,
} from "@/lib/contentApi";
import { SCHOOL_YEARS, defaultSchoolYear } from "@/lib/schoolYears";
import { cn } from "@/lib/utils";

const EMPTY_GROUP: GroupFields = {
  title: "",
  videoTitle: "",
  videoObjective: "",
  videoScript: "",
  videoDurationLabel: "3 min",
  videoUrl: "/videos/alfabetizacao-grupo-1.mp4",
  videoThumbnail: "",
  groupCoinsBonus: 10,
};

const courseFieldsOf = (c: Course): CourseFields => ({
  title: c.title,
  description: c.description,
  image: c.image,
  ageMin: c.ageMin,
  ageMax: c.ageMax,
  duration: c.duration,
  category: c.category,
  schoolYear: c.schoolYear ?? defaultSchoolYear(c.ageMin),
});

const snippet = (a: EditableActivity) => {
  const t = a.type === "reading" ? `📖 ${a.passageTitle ?? "Texto"}` : a.question;
  return t.length > 110 ? `${t.slice(0, 110)}…` : t;
};

// Campo de moedas editável na própria linha.
const CoinsInput = ({ value, onSave }: { value: number; onSave: (n: number) => void }) => {
  const [v, setV] = useState(String(value));
  const [last, setLast] = useState(value);
  if (value !== last) {
    setLast(value);
    setV(String(value));
  }
  return (
    <Input
      type="number"
      min={0}
      className="w-20 h-8"
      value={v}
      onChange={(e) => setV(e.target.value)}
      onBlur={() => {
        const n = Math.max(0, Math.floor(Number(v) || 0));
        setV(String(n));
        if (n !== value) onSave(n);
      }}
      aria-label="Moedas da atividade"
    />
  );
};

export default function EducationPanel() {
  const navigate = useNavigate();
  const { user, allowed, loading } = useContentEditor();
  const version = useContentVersion();

  const [courseId, setCourseId] = useState<string | null>(null);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [showDeleted, setShowDeleted] = useState(false);
  const [query, setQuery] = useState("");
  const [courseDlg, setCourseDlg] = useState<null | { course: Course | null }>(null);
  const [groupDlg, setGroupDlg] = useState<null | { group: EditableGroup | null }>(null);
  const [actDlg, setActDlg] = useState<null | { groupId: string; activity: EditableActivity | null }>(null);
  const [bulkCoins, setBulkCoins] = useState("5");

  const courses = getAllCourses(true);
  const course = courses.find((c) => c.id === courseId) ?? null;
  const groupsAll = course ? getEditableCourseGroups(course.id, true) : [];
  const groups = showDeleted ? groupsAll : groupsAll.filter((g) => !g._deleted);
  const liveGroups = groupsAll.filter((g) => !g._deleted);

  const byYear = useMemo(() => {
    const years: string[] = [...SCHOOL_YEARS];
    courses.forEach((c) => {
      const y = c.schoolYear ?? "";
      if (y && !years.includes(y)) years.push(y);
    });
    return years
      .map((y) => ({ year: y, items: courses.filter((c) => (c.schoolYear ?? defaultSchoolYear(c.ageMin)) === y && (showDeleted || !c.deleted)) }))
      .filter((x) => x.items.length > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version, showDeleted]);

  const run = async (fn: () => Promise<unknown>, ok?: string) => {
    try {
      await fn();
      if (ok) toast.success(ok);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Não foi possível concluir");
    }
  };

  // ---------- Busca ----------
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const out: Array<{ course: Course; group: EditableGroup; act: EditableActivity }> = [];
    for (const c of courses) {
      if (c.deleted) continue;
      for (const g of getEditableCourseGroups(c.id, false)) {
        for (const a of g.activities) {
          const hay = `${a.question} ${a.passageTitle ?? ""} ${a.options.map((o) => o.text).join(" ")} ${a.id}`.toLowerCase();
          if (hay.includes(q)) out.push({ course: c, group: g, act: a });
          if (out.length >= 60) return out;
        }
      }
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, version]);

  // ---------- Acesso ----------
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Carregando...</div>;
  }
  if (!user || !allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <div className="max-w-md text-center space-y-4">
          <div className="text-6xl">🔒</div>
          <h1 className="text-2xl font-bold text-foreground">Painel de Educação</h1>
          <p className="text-muted-foreground">
            {user
              ? "Sua conta não tem permissão de educador. Peça a um administrador para liberar o acesso."
              : "Entre com uma conta de educador para continuar."}
          </p>
          <div className="flex gap-2 justify-center">
            {!user && <Button onClick={() => navigate("/login", { state: { from: "/painel-educacao" } })}>Entrar</Button>}
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              Voltar ao app
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ---------- Ações ----------
  const swap = <T,>(list: T[], i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= list.length) return list;
    const next = [...list];
    [next[i], next[j]] = [next[j], next[i]];
    return next;
  };

  const moveGroup = (g: EditableGroup, dir: -1 | 1) => {
    const i = liveGroups.findIndex((x) => x.id === g.id);
    if (i + dir < 0 || i + dir >= liveGroups.length) return;
    if (!window.confirm("Mudar a ordem dos grupos também muda o progresso já gravado dos alunos neste curso. Continuar?")) return;
    run(() => reorderGroups(course!.id, swap(liveGroups, i, dir)));
  };

  const deleteGroup = (g: EditableGroup) => {
    if (!window.confirm(`Excluir o grupo “${g.title}” e suas ${g.activities.length} atividades? O progresso dos alunos pode se deslocar.`)) return;
    run(() => removeGroup(course!.id, g), "Grupo excluído");
  };

  const moveAct = (g: EditableGroup, a: EditableActivity, dir: -1 | 1) => {
    const live = g.activities.filter((x) => !x._deleted);
    const i = live.findIndex((x) => x.id === a.id);
    run(() => reorderActivities(course!.id, g.id, swap(live, i, dir)));
  };

  const deleteAct = (a: EditableActivity) => {
    if (!window.confirm("Excluir esta atividade?")) return;
    run(() => removeActivity(course!.id, a), "Atividade excluída");
  };

  const applyBulk = (g: EditableGroup) => {
    const n = Math.max(0, Math.floor(Number(bulkCoins) || 0));
    const live = g.activities.filter((a) => !a._deleted);
    if (!window.confirm(`Definir ${n} moedas em todas as ${live.length} atividades deste grupo?`)) return;
    run(async () => {
      for (const a of live) if (a.coinsReward !== n) await saveActivity(course!.id, g.id, { ...a, coinsReward: n });
    }, "Moedas atualizadas");
  };

  const deleteCourse = (c: Course) => {
    if (!window.confirm(`Excluir a matéria “${c.title}”? Os alunos deixam de vê-la.`)) return;
    run(async () => {
      await removeCourse(c);
      setCourseId(null);
    }, "Matéria excluída");
  };

  const readingsOf = (g: EditableGroup) =>
    g.activities.filter((a) => a.type === "reading" && !a._deleted).map((a) => ({ id: a.id, title: a.passageTitle ?? "Texto" }));

  const openFromSearch = (c: Course, g: EditableGroup) => {
    setCourseId(c.id);
    setOpenGroup(g.id);
    setQuery("");
  };

  const totalActs = liveGroups.reduce((n, g) => n + g.activities.filter((a) => !a._deleted).length, 0);
  const totalCoins = liveGroups.reduce(
    (n, g) => n + g.groupCoinsBonus + g.activities.filter((a) => !a._deleted).reduce((m, a) => m + a.coinsReward, 0),
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-card/90 backdrop-blur border-b border-border">
        <div className="px-4 py-3 flex flex-wrap items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")} title="Voltar ao app">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="mr-auto">
            <h1 className="text-lg font-bold text-foreground leading-tight">Painel de Educação</h1>
            <p className="text-xs text-muted-foreground">Matérias, grupos e atividades por ano escolar</p>
          </div>
          <div className="relative w-full sm:w-72 order-last sm:order-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Buscar atividade em todas as matérias" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowDeleted((v) => !v)}>
            {showDeleted ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            {showDeleted ? "Ocultar excluídos" : "Mostrar excluídos"}
          </Button>
          <Button variant="outline" size="sm" onClick={() => run(reloadContent, "Conteúdo atualizado")}>
            <RotateCcw className="w-4 h-4 mr-2" /> Atualizar
          </Button>
        </div>
      </header>

      <div className="grid lg:grid-cols-[19rem_1fr] gap-0">
        {/* Menu lateral: anos escolares e matérias */}
        <aside className="border-r border-border bg-card/40 p-4 lg:min-h-[calc(100vh-61px)]">
          <Button className="w-full mb-4" onClick={() => setCourseDlg({ course: null })}>
            <Plus className="w-4 h-4 mr-2" /> Nova matéria
          </Button>
          <div className="space-y-4">
            {byYear.map(({ year, items }) => (
              <div key={year}>
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-1">{year}</p>
                <div className="space-y-1">
                  {items.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setCourseId(c.id);
                        setOpenGroup(null);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-muted transition-colors",
                        courseId === c.id && "bg-primary/10 text-primary font-semibold",
                        c.deleted && "opacity-50 line-through"
                      )}
                    >
                      <BookOpen className="w-4 h-4 shrink-0" />
                      <span className="flex-1 truncate">{c.title}</span>
                      <span className="text-xs text-muted-foreground">{c.totalLessons}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main className="p-4 sm:p-6 space-y-6 min-w-0">
          {/* Resultados da busca */}
          {query.trim().length >= 2 && (
            <section className="rounded-xl border border-border bg-card p-4">
              <h2 className="font-bold mb-3">
                {results.length ? `${results.length}${results.length >= 60 ? "+" : ""} resultados` : "Nenhum resultado"}
              </h2>
              <div className="space-y-1 max-h-96 overflow-y-auto">
                {results.map((r) => (
                  <button
                    key={`${r.course.id}:${r.act.id}`}
                    onClick={() => openFromSearch(r.course, r.group)}
                    className="w-full text-left p-2 rounded-lg hover:bg-muted text-sm"
                  >
                    <span className="text-xs text-muted-foreground block">
                      {r.course.schoolYear} · {r.course.title} · {r.group.title}
                    </span>
                    {snippet(r.act)}
                  </button>
                ))}
              </div>
            </section>
          )}

          {!course ? (
            <div className="text-center text-muted-foreground py-24">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40" />
              Escolha uma matéria no menu ou crie uma nova.
            </div>
          ) : (
            <>
              {/* Cabeçalho da matéria */}
              <section className="rounded-xl border border-border bg-card p-4 sm:p-5 flex flex-wrap gap-4 items-start">
                {course.image ? <img src={course.image} alt="" className="w-24 h-24 rounded-lg object-cover bg-muted" onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} /> : null}
                <div className="flex-1 min-w-[14rem]">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-bold">{course.title}</h2>
                    <Badge variant="secondary">{course.schoolYear}</Badge>
                    <Badge variant="outline">{course.category}</Badge>
                    {course.deleted && <Badge variant="destructive">Excluída</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
                  <p className="text-sm mt-2">
                    <b>{liveGroups.length}</b> grupos · <b>{totalActs}</b> atividades · <b>{totalCoins}</b> moedas · idades {course.ageMin}–{course.ageMax}
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button variant="outline" size="sm" onClick={() => setCourseDlg({ course })}>
                    <Pencil className="w-4 h-4 mr-2" /> Editar
                  </Button>
                  {course.deleted ? (
                    <Button size="sm" onClick={() => run(() => restoreCourse(course.id), "Matéria restaurada")}>
                      <Undo2 className="w-4 h-4 mr-2" /> Restaurar
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" onClick={() => deleteCourse(course)}>
                      <Trash2 className="w-4 h-4 mr-2" /> Excluir
                    </Button>
                  )}
                  <Button size="sm" onClick={() => setGroupDlg({ group: null })}>
                    <FolderPlus className="w-4 h-4 mr-2" /> Novo grupo
                  </Button>
                </div>
              </section>

              {/* Grupos */}
              <section className="space-y-3">
                {groups.length === 0 && <p className="text-muted-foreground text-sm">Esta matéria ainda não tem grupos.</p>}
                {groups.map((g) => {
                  const live = g.activities.filter((a) => !a._deleted);
                  const open = openGroup === g.id;
                  const liveIdx = liveGroups.findIndex((x) => x.id === g.id);
                  return (
                    <div key={g.id} className={cn("rounded-xl border border-border bg-card", g._deleted && "opacity-60")}>
                      <div className="flex items-center gap-2 p-3">
                        <button className="flex items-center gap-2 flex-1 min-w-0 text-left" onClick={() => setOpenGroup(open ? null : g.id)}>
                          {open ? <ChevronDown className="w-4 h-4 shrink-0" /> : <ChevronRight className="w-4 h-4 shrink-0" />}
                          <span className="text-sm text-muted-foreground w-7 shrink-0">{g._deleted ? "—" : liveIdx + 1}</span>
                          <span className={cn("font-semibold truncate", g._deleted && "line-through")}>{g.title}</span>
                          <Badge variant="secondary" className="shrink-0">{live.length} ativ.</Badge>
                          {g._custom && <Badge className="shrink-0">nova</Badge>}
                          {g._edited && !g._custom && <Badge variant="outline" className="shrink-0">editada</Badge>}
                        </button>
                        {g._deleted ? (
                          <Button size="sm" onClick={() => run(() => restoreGroup(course.id, g.id), "Grupo restaurado")}>
                            <Undo2 className="w-4 h-4 mr-1" /> Restaurar
                          </Button>
                        ) : (
                          <>
                            <Button variant="ghost" size="icon" disabled={liveIdx === 0} onClick={() => moveGroup(g, -1)} title="Subir grupo">
                              <ArrowUp className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" disabled={liveIdx === liveGroups.length - 1} onClick={() => moveGroup(g, 1)} title="Descer grupo">
                              <ArrowDown className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => setGroupDlg({ group: g })} title="Editar grupo">
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => deleteGroup(g)} title="Excluir grupo">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>

                      {open && !g._deleted && (
                        <div className="border-t border-border p-3 space-y-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <Button size="sm" onClick={() => setActDlg({ groupId: g.id, activity: null })}>
                              <Plus className="w-4 h-4 mr-1" /> Nova atividade
                            </Button>
                            <div className="flex items-center gap-2 ml-auto text-sm">
                              <span className="text-muted-foreground">Moedas de todas:</span>
                              <Input type="number" min={0} className="w-20 h-8" value={bulkCoins} onChange={(e) => setBulkCoins(e.target.value)} />
                              <Button variant="outline" size="sm" onClick={() => applyBulk(g)}>
                                Aplicar
                              </Button>
                            </div>
                          </div>

                          {g.activities.length === 0 ? (
                            <p className="text-sm text-muted-foreground">Sem atividades. Um grupo vazio não abre exercícios para o aluno.</p>
                          ) : (
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="text-left text-xs text-muted-foreground">
                                    <th className="py-1 pr-2 w-8">#</th>
                                    <th className="py-1 pr-2">Atividade</th>
                                    <th className="py-1 pr-2 whitespace-nowrap">Tipo</th>
                                    <th className="py-1 pr-2">Moedas</th>
                                    <th className="py-1 text-right">Ações</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {g.activities.map((a) => {
                                    const liveI = live.findIndex((x) => x.id === a.id);
                                    return (
                                      <tr key={a.id} className={cn("border-t border-border align-top", a._deleted && "opacity-50")}>
                                        <td className="py-2 pr-2 text-muted-foreground">{a._deleted ? "—" : liveI + 1}</td>
                                        <td className="py-2 pr-2">
                                          <span className={cn(a._deleted && "line-through")}>{snippet(a)}</span>
                                          <span className="ml-2 inline-flex gap-1 align-middle">
                                            {a.imageUrl && <Badge variant="outline">imagem</Badge>}
                                            {a._custom && <Badge>nova</Badge>}
                                            {a._edited && !a._custom && <Badge variant="outline">editada</Badge>}
                                          </span>
                                        </td>
                                        <td className="py-2 pr-2 whitespace-nowrap text-muted-foreground">{typeLabel(a.type).split(" (")[0]}</td>
                                        <td className="py-2 pr-2">
                                          <CoinsInput value={a.coinsReward} onSave={(n) => run(() => saveActivity(course.id, g.id, { ...a, coinsReward: n }))} />
                                        </td>
                                        <td className="py-2 text-right whitespace-nowrap">
                                          {a._deleted ? (
                                            <Button size="sm" onClick={() => run(() => restoreActivity(course.id, a), "Atividade restaurada")}>
                                              <Undo2 className="w-4 h-4 mr-1" /> Restaurar
                                            </Button>
                                          ) : (
                                            <>
                                              <Button variant="ghost" size="icon" disabled={liveI === 0} onClick={() => moveAct(g, a, -1)} title="Subir">
                                                <ArrowUp className="w-4 h-4" />
                                              </Button>
                                              <Button variant="ghost" size="icon" disabled={liveI === live.length - 1} onClick={() => moveAct(g, a, 1)} title="Descer">
                                                <ArrowDown className="w-4 h-4" />
                                              </Button>
                                              <Button variant="ghost" size="icon" onClick={() => setActDlg({ groupId: g.id, activity: a })} title="Editar">
                                                <Pencil className="w-4 h-4" />
                                              </Button>
                                              <Button variant="ghost" size="icon" onClick={() => run(() => duplicateActivity(course.id, g.id, g.activities, a), "Atividade duplicada")} title="Duplicar">
                                                <Copy className="w-4 h-4" />
                                              </Button>
                                              {a._edited && !a._custom && (
                                                <Button variant="ghost" size="icon" onClick={() => run(() => resetActivity(course.id, a), "Voltou ao original")} title="Voltar ao original">
                                                  <RotateCcw className="w-4 h-4" />
                                                </Button>
                                              )}
                                              <Button variant="ghost" size="icon" onClick={() => deleteAct(a)} title="Excluir">
                                                <Trash2 className="w-4 h-4" />
                                              </Button>
                                              {liveGroups.length > 1 && (
                                                <Select value="" onValueChange={(target) => run(() => moveActivityToGroup(course.id, a, target), "Atividade movida")}>
                                                  <SelectTrigger className="inline-flex w-28 h-8 ml-1 text-xs" aria-label="Mover para o grupo">
                                                    <SelectValue placeholder="Mover para…" />
                                                  </SelectTrigger>
                                                  <SelectContent>
                                                    {liveGroups
                                                      .filter((x) => x.id !== g.id)
                                                      .map((x) => (
                                                        <SelectItem key={x.id} value={x.id}>
                                                          {liveGroups.findIndex((y) => y.id === x.id) + 1}. {x.title}
                                                        </SelectItem>
                                                      ))}
                                                  </SelectContent>
                                                </Select>
                                              )}
                                            </>
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </section>
            </>
          )}
        </main>
      </div>

      {/* Diálogos */}
      <CourseDialog
        open={!!courseDlg}
        isNew={!courseDlg?.course}
        initial={
          courseDlg?.course
            ? courseFieldsOf(courseDlg.course)
            : { title: "", description: "", image: "", ageMin: 6, ageMax: 8, duration: "", category: "Linguagem", schoolYear: "1º ano" }
        }
        onClose={() => setCourseDlg(null)}
        onSave={async (f) => {
          if (courseDlg?.course) {
            await saveCourse(courseDlg.course.id, f);
            toast.success("Matéria salva");
          } else {
            const id = await createCourse(f);
            setCourseId(id);
            toast.success("Matéria criada");
          }
        }}
      />
      <GroupDialog
        open={!!groupDlg}
        isNew={!groupDlg?.group}
        initial={groupDlg?.group ? groupFieldsOf(groupDlg.group) : EMPTY_GROUP}
        onClose={() => setGroupDlg(null)}
        onSave={async (f) => {
          if (!course) return;
          if (groupDlg?.group) {
            await saveGroup(course.id, groupDlg.group.id, f);
            toast.success("Grupo salvo");
          } else {
            const id = await createGroup(course.id, { ...f, videoThumbnail: f.videoThumbnail || course.image });
            setOpenGroup(id);
            toast.success("Grupo criado");
          }
        }}
      />
      <ActivityDialog
        open={!!actDlg}
        activity={actDlg?.activity ?? null}
        readings={actDlg ? readingsOf(groupsAll.find((g) => g.id === actDlg.groupId) ?? ({ activities: [] } as unknown as EditableGroup)) : []}
        onClose={() => setActDlg(null)}
        onSave={async (a, isNew) => {
          if (!course || !actDlg) return;
          if (isNew) await createActivity(course.id, actDlg.groupId, a);
          else await saveActivity(course.id, actDlg.groupId, { ...a, _groupId: actDlg.groupId } as EditableActivity);
          toast.success(isNew ? "Atividade criada" : "Atividade salva");
        }}
      />
    </div>
  );
}
