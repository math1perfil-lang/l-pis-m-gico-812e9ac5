import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowDown, ArrowUp, BookOpen, ChevronDown, ChevronRight, Coins, Copy, Eye, EyeOff, FolderPlus, GraduationCap,
  LogOut, MoreHorizontal, Pencil, Plus, RotateCcw, Search, Trash2, Undo2,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub,
  DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EducationLogin } from "@/components/education/EducationLogin";
import { useAuth } from "@/hooks/useAuth";
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
  const { signOut } = useAuth();
  const [openYear, setOpenYear] = useState<string | null>(null);
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
  if (!user) return <EducationLogin />;
  if (!allowed) return <EducationLogin blockedEmail={user.email ?? "sua conta"} />;

  const leave = async () => {
    await signOut();
    navigate("/painel-educacao", { replace: true });
  };

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
    setOpenYear(c.schoolYear ?? defaultSchoolYear(c.ageMin));
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
        <div className="px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="mr-auto min-w-0">
            <h1 className="text-base font-bold text-foreground leading-tight truncate">Portal Educação</h1>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
          <div className="relative flex-1 max-w-md hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Buscar atividade em todas as matérias" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Opções do painel">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowDeleted((v) => !v)}>
                {showDeleted ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                {showDeleted ? "Ocultar excluídos" : "Mostrar excluídos"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => run(reloadContent, "Conteúdo atualizado")}>
                <RotateCcw className="w-4 h-4 mr-2" /> Atualizar conteúdo
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" onClick={leave}>
            <LogOut className="w-4 h-4 sm:mr-2" /> <span className="hidden sm:inline">Sair</span>
          </Button>
        </div>
        <div className="px-4 pb-3 sm:hidden relative">
          <Search className="absolute left-7 top-1/2 -translate-y-[70%] w-4 h-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Buscar atividade" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </header>

      <div className="grid lg:grid-cols-[17rem_1fr] gap-0">
        {/* Menu lateral: um botão por ano; ao abrir mostra as matérias */}
        <aside className="border-b lg:border-b-0 lg:border-r border-border bg-card/40 p-3 lg:sticky lg:top-[61px] lg:h-[calc(100vh-61px)] lg:overflow-y-auto">
          <Button className="w-full mb-3" onClick={() => setCourseDlg({ course: null })}>
            <Plus className="w-4 h-4 mr-2" /> Nova matéria
          </Button>
          <nav className="space-y-1">
            {byYear.map(({ year, items }) => {
              const isOpen = openYear === year;
              const hasActive = items.some((c) => c.id === courseId);
              return (
                <div key={year}>
                  <button
                    onClick={() => setOpenYear(isOpen ? null : year)}
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-muted transition-colors",
                      hasActive && "text-primary"
                    )}
                    aria-expanded={isOpen}
                  >
                    {isOpen ? <ChevronDown className="w-4 h-4 shrink-0" /> : <ChevronRight className="w-4 h-4 shrink-0" />}
                    <span className="flex-1 text-left">{year}</span>
                    <span className="text-xs font-normal text-muted-foreground bg-muted rounded-full px-2 py-0.5">{items.length}</span>
                  </button>
                  {isOpen && (
                    <div className="ml-4 pl-3 border-l border-border mt-1 mb-2 space-y-0.5">
                      {items.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => {
                            setCourseId(c.id);
                            setOpenGroup(null);
                          }}
                          className={cn(
                            "w-full text-left px-2.5 py-1.5 rounded-md text-sm flex items-center gap-2 hover:bg-muted transition-colors",
                            courseId === c.id && "bg-primary/10 text-primary font-semibold",
                            c.deleted && "opacity-50 line-through"
                          )}
                        >
                          <BookOpen className="w-3.5 h-3.5 shrink-0" />
                          <span className="flex-1 truncate">{c.title}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        <main className="p-4 sm:p-6 space-y-5 min-w-0 max-w-5xl">
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
              Abra um ano no menu e escolha uma matéria, ou crie uma nova.
            </div>
          ) : (
            <>
              {/* Cabeçalho da matéria */}
              <section className="flex items-center gap-4">
                {course.image ? (
                  <img src={course.image} alt="" className="w-14 h-14 rounded-xl object-cover bg-muted shrink-0" onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
                ) : null}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-bold truncate">{course.title}</h2>
                    <Badge variant="secondary">{course.schoolYear}</Badge>
                    {course.deleted && <Badge variant="destructive">Excluída</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {liveGroups.length} grupos · {totalActs} atividades · {totalCoins} moedas · {course.category} · {course.ageMin}–{course.ageMax} anos
                  </p>
                </div>
                <Button size="sm" onClick={() => setGroupDlg({ group: null })}>
                  <FolderPlus className="w-4 h-4 mr-2" /> Novo grupo
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" aria-label="Opções da matéria">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setCourseDlg({ course })}>
                      <Pencil className="w-4 h-4 mr-2" /> Editar matéria
                    </DropdownMenuItem>
                    {course.deleted ? (
                      <DropdownMenuItem onClick={() => run(() => restoreCourse(course.id), "Matéria restaurada")}>
                        <Undo2 className="w-4 h-4 mr-2" /> Restaurar matéria
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem className="text-destructive" onClick={() => deleteCourse(course)}>
                        <Trash2 className="w-4 h-4 mr-2" /> Excluir matéria
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </section>

              {/* Grupos */}
              <section className="space-y-2">
                {groups.length === 0 && <p className="text-muted-foreground text-sm">Esta matéria ainda não tem grupos.</p>}
                {groups.map((g) => {
                  const live = g.activities.filter((a) => !a._deleted);
                  const open = openGroup === g.id;
                  const liveIdx = liveGroups.findIndex((x) => x.id === g.id);
                  return (
                    <div key={g.id} className={cn("rounded-xl border border-border bg-card overflow-hidden", open && "ring-1 ring-primary/30", g._deleted && "opacity-60")}>
                      <div className="flex items-center gap-2 px-3 py-2.5">
                        <button className="flex items-center gap-3 flex-1 min-w-0 text-left" onClick={() => setOpenGroup(open ? null : g.id)}>
                          {open ? <ChevronDown className="w-4 h-4 shrink-0 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 shrink-0 text-muted-foreground" />}
                          <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                            {g._deleted ? "—" : liveIdx + 1}
                          </span>
                          <span className={cn("font-semibold truncate", g._deleted && "line-through")}>{g.title}</span>
                          <span className="text-xs text-muted-foreground shrink-0">{live.length} ativ.</span>
                          {g._custom && <Badge className="shrink-0">nova</Badge>}
                          {g._edited && !g._custom && <Badge variant="outline" className="shrink-0">editada</Badge>}
                        </button>
                        {g._deleted ? (
                          <Button size="sm" onClick={() => run(() => restoreGroup(course.id, g.id), "Grupo restaurado")}>
                            <Undo2 className="w-4 h-4 mr-1" /> Restaurar
                          </Button>
                        ) : (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" aria-label="Opções do grupo">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setGroupDlg({ group: g })}>
                                <Pencil className="w-4 h-4 mr-2" /> Editar grupo
                              </DropdownMenuItem>
                              <DropdownMenuItem disabled={liveIdx === 0} onClick={() => moveGroup(g, -1)}>
                                <ArrowUp className="w-4 h-4 mr-2" /> Subir
                              </DropdownMenuItem>
                              <DropdownMenuItem disabled={liveIdx === liveGroups.length - 1} onClick={() => moveGroup(g, 1)}>
                                <ArrowDown className="w-4 h-4 mr-2" /> Descer
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive" onClick={() => deleteGroup(g)}>
                                <Trash2 className="w-4 h-4 mr-2" /> Excluir grupo
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>

                      {open && !g._deleted && (
                        <div className="border-t border-border bg-muted/20 p-3 space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <Button size="sm" onClick={() => setActDlg({ groupId: g.id, activity: null })}>
                              <Plus className="w-4 h-4 mr-1" /> Nova atividade
                            </Button>
                            <div className="flex items-center gap-2 ml-auto text-xs text-muted-foreground">
                              <Coins className="w-4 h-4" />
                              <span className="hidden sm:inline">Moedas de todas</span>
                              <Input type="number" min={0} className="w-16 h-8" value={bulkCoins} onChange={(e) => setBulkCoins(e.target.value)} aria-label="Moedas para todas as atividades" />
                              <Button variant="outline" size="sm" onClick={() => applyBulk(g)}>
                                Aplicar
                              </Button>
                            </div>
                          </div>

                          {g.activities.length === 0 ? (
                            <p className="text-sm text-muted-foreground py-2">Sem atividades. Um grupo vazio não abre exercícios para o aluno.</p>
                          ) : (
                            <ul className="space-y-1.5">
                              {g.activities.map((a) => {
                                const liveI = live.findIndex((x) => x.id === a.id);
                                return (
                                  <li key={a.id} className={cn("flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2", a._deleted && "opacity-50")}>
                                    <span className="w-6 text-xs text-muted-foreground text-center shrink-0">{a._deleted ? "—" : liveI + 1}</span>
                                    <div className="flex-1 min-w-0">
                                      <p className={cn("text-sm line-clamp-2", a._deleted && "line-through")}>{snippet(a)}</p>
                                      <p className="text-xs text-muted-foreground mt-0.5 flex flex-wrap items-center gap-x-2">
                                        <span>{typeLabel(a.type).split(" (")[0]}</span>
                                        {a.imageUrl && <span>· com imagem</span>}
                                        {a._custom && <span className="text-primary">· nova</span>}
                                        {a._edited && !a._custom && <span className="text-primary">· editada</span>}
                                      </p>
                                    </div>
                                    {a._deleted ? (
                                      <Button size="sm" onClick={() => run(() => restoreActivity(course.id, a), "Atividade restaurada")}>
                                        <Undo2 className="w-4 h-4 mr-1" /> Restaurar
                                      </Button>
                                    ) : (
                                      <>
                                        <CoinsInput value={a.coinsReward} onSave={(n) => run(() => saveActivity(course.id, g.id, { ...a, coinsReward: n }))} />
                                        <Button variant="ghost" size="icon" onClick={() => setActDlg({ groupId: g.id, activity: a })} title="Editar" aria-label="Editar atividade">
                                          <Pencil className="w-4 h-4" />
                                        </Button>
                                        <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" aria-label="Mais opções">
                                              <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent align="end">
                                            <DropdownMenuItem disabled={liveI === 0} onClick={() => moveAct(g, a, -1)}>
                                              <ArrowUp className="w-4 h-4 mr-2" /> Subir
                                            </DropdownMenuItem>
                                            <DropdownMenuItem disabled={liveI === live.length - 1} onClick={() => moveAct(g, a, 1)}>
                                              <ArrowDown className="w-4 h-4 mr-2" /> Descer
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => run(() => duplicateActivity(course.id, g.id, g.activities, a), "Atividade duplicada")}>
                                              <Copy className="w-4 h-4 mr-2" /> Duplicar
                                            </DropdownMenuItem>
                                            {liveGroups.length > 1 && (
                                              <DropdownMenuSub>
                                                <DropdownMenuSubTrigger>
                                                  <FolderPlus className="w-4 h-4 mr-2" /> Mover para o grupo
                                                </DropdownMenuSubTrigger>
                                                <DropdownMenuSubContent className="max-h-72 overflow-y-auto">
                                                  <DropdownMenuLabel>Escolha o destino</DropdownMenuLabel>
                                                  {liveGroups
                                                    .filter((x) => x.id !== g.id)
                                                    .map((x) => (
                                                      <DropdownMenuItem key={x.id} onClick={() => run(() => moveActivityToGroup(course.id, a, x.id), "Atividade movida")}>
                                                        {liveGroups.findIndex((y) => y.id === x.id) + 1}. {x.title}
                                                      </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuSubContent>
                                              </DropdownMenuSub>
                                            )}
                                            {a._edited && !a._custom && (
                                              <DropdownMenuItem onClick={() => run(() => resetActivity(course.id, a), "Voltou ao original")}>
                                                <RotateCcw className="w-4 h-4 mr-2" /> Voltar ao original
                                              </DropdownMenuItem>
                                            )}
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-destructive" onClick={() => deleteAct(a)}>
                                              <Trash2 className="w-4 h-4 mr-2" /> Excluir
                                            </DropdownMenuItem>
                                          </DropdownMenuContent>
                                        </DropdownMenu>
                                      </>
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
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
            setOpenYear(f.schoolYear);
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
