import { useCallback, useEffect, useMemo, useState } from "react";
import { BookOpen, Check, Mail, MoreHorizontal, Pencil, Plus, Trash2, UserCheck, UserX } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { contentDb } from "@/hooks/useContent";
import { getAllCourses } from "@/data/courses";
import { SCHOOL_YEARS, defaultSchoolYear } from "@/lib/schoolYears";
import { cn } from "@/lib/utils";

interface Teacher {
  email: string;
  display_name: string;
  course_ids: string[];
  active: boolean;
  user_id: string | null;
}

const yearOf = (c: { schoolYear?: string; ageMin: number }) => c.schoolYear ?? defaultSchoolYear(c.ageMin);

export const TeacherAccess = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [dlg, setDlg] = useState<null | { teacher: Teacher | null }>(null);
  const courses = getAllCourses(false);
  const courseById = useMemo(() => new Map(courses.map((c) => [c.id, c])), [courses]);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await contentDb.from("teachers").select("*").order("display_name", { ascending: true });
    setLoading(false);
    if (error) {
      toast.error("Não foi possível carregar os docentes. Rodou o passo 4 do SQL?");
      return;
    }
    setTeachers((data ?? []) as Teacher[]);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const run = async (fn: () => Promise<{ error: { message: string } | null }>, ok: string) => {
    const { error } = await fn();
    if (error) toast.error(error.message);
    else {
      toast.success(ok);
      load();
    }
  };

  const remove = (t: Teacher) => {
    if (!window.confirm(`Remover o acesso de ${t.display_name || t.email}? A pessoa deixa de editar conteúdo.`)) return;
    run(() => contentDb.rpc("remove_teacher", { _email: t.email }), "Acesso removido");
  };

  const toggle = (t: Teacher) =>
    run(
      () => contentDb.rpc("save_teacher", { _email: t.email, _name: t.display_name, _course_ids: t.course_ids, _active: !t.active }),
      t.active ? "Acesso pausado" : "Acesso reativado"
    );

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold">Acessos de docentes</h2>
          <p className="text-sm text-muted-foreground">Cadastre quem pode criar atividades e escolha as matérias de cada pessoa.</p>
        </div>
        <Button size="sm" onClick={() => setDlg({ teacher: null })}>
          <Plus className="w-4 h-4 mr-2" /> Novo docente
        </Button>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Carregando...</p>
      ) : teachers.length === 0 ? (
        <div className="text-center text-muted-foreground py-16 border border-dashed border-border rounded-xl">
          <UserCheck className="w-10 h-10 mx-auto mb-2 opacity-40" />
          Nenhum docente cadastrado ainda.
        </div>
      ) : (
        <ul className="space-y-2">
          {teachers.map((t) => (
            <li key={t.email} className={cn("rounded-xl border border-border bg-card p-3 flex items-start gap-3", !t.active && "opacity-60")}>
              <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0">
                {(t.display_name || t.email).charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold truncate">{t.display_name || "Sem nome"}</span>
                  {!t.active ? (
                    <Badge variant="outline">Pausado</Badge>
                  ) : t.user_id ? (
                    <Badge>Acesso ativo</Badge>
                  ) : (
                    <Badge variant="secondary">Aguardando primeiro acesso</Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Mail className="w-3 h-3" /> {t.email}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {t.course_ids.length === 0 && <span className="text-xs text-muted-foreground">Nenhuma matéria atribuída</span>}
                  {t.course_ids.map((id) => {
                    const c = courseById.get(id);
                    return (
                      <span key={id} className="inline-flex items-center gap-1 text-xs rounded-full bg-muted px-2.5 py-1">
                        <BookOpen className="w-3 h-3" />
                        {c ? `${c.title} · ${yearOf(c)}` : id}
                      </span>
                    );
                  })}
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Opções do docente">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setDlg({ teacher: t })}>
                    <Pencil className="w-4 h-4 mr-2" /> Editar matérias
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toggle(t)}>
                    {t.active ? <UserX className="w-4 h-4 mr-2" /> : <UserCheck className="w-4 h-4 mr-2" />}
                    {t.active ? "Pausar acesso" : "Reativar acesso"}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive" onClick={() => remove(t)}>
                    <Trash2 className="w-4 h-4 mr-2" /> Remover
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          ))}
        </ul>
      )}

      <TeacherDialog
        key={dlg?.teacher?.email ?? (dlg ? "novo" : "fechado")}
        open={!!dlg}
        teacher={dlg?.teacher ?? null}
        onClose={() => setDlg(null)}
        onSaved={() => {
          setDlg(null);
          load();
        }}
      />
    </div>
  );
};

const TeacherDialog = ({
  open,
  teacher,
  onClose,
  onSaved,
}: {
  open: boolean;
  teacher: Teacher | null;
  onClose: () => void;
  onSaved: () => void;
}) => {
  const courses = getAllCourses(false);
  const isNew = !teacher;
  const [name, setName] = useState(teacher?.display_name ?? "");
  const [email, setEmail] = useState(teacher?.email ?? "");
  const [selected, setSelected] = useState<string[]>(teacher?.course_ids ?? []);
  const [year, setYear] = useState<string>(() => {
    const first = teacher?.course_ids[0] ? courses.find((c) => c.id === teacher.course_ids[0]) : null;
    return first ? yearOf(first) : SCHOOL_YEARS[0];
  });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const years = useMemo(() => {
    const list: string[] = [...SCHOOL_YEARS];
    courses.forEach((c) => {
      const y = yearOf(c);
      if (!list.includes(y)) list.push(y);
    });
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const countByYear = (y: string) => courses.filter((c) => yearOf(c) === y && selected.includes(c.id)).length;
  const inYear = courses.filter((c) => yearOf(c) === year);

  const toggle = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const save = async () => {
    if (!email.includes("@")) {
      toast.error("Informe um e-mail válido");
      return;
    }
    if (selected.length === 0) {
      toast.error("Escolha ao menos uma matéria");
      return;
    }
    setBusy(true);
    const { error } = await contentDb.rpc("save_teacher", {
      _email: email,
      _name: name,
      _course_ids: selected,
      _active: teacher?.active ?? true,
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (isNew) setDone(true);
    else {
      toast.success("Docente atualizado");
      onSaved();
    }
  };

  const link = `${window.location.origin}/painel-educacao`;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && (done ? onSaved() : onClose())}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        {done ? (
          <>
            <DialogHeader>
              <DialogTitle>Docente cadastrado</DialogTitle>
              <DialogDescription>
                O acesso é liberado automaticamente. Envie o endereço abaixo e peça que {name || "a pessoa"} toque em <b>Docentes → Primeiro
                acesso</b> usando o e-mail <b>{email}</b> para criar a própria senha.
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-2">
              <Input readOnly value={link} onFocus={(e) => e.target.select()} />
              <Button
                variant="outline"
                onClick={() => {
                  navigator.clipboard?.writeText(link).then(() => toast.success("Endereço copiado"));
                }}
              >
                Copiar
              </Button>
            </div>
            <DialogFooter>
              <Button onClick={onSaved}>Concluir</Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{isNew ? "Novo docente" : "Editar matérias do docente"}</DialogTitle>
              <DialogDescription>Escolha o ano e marque as matérias que esta pessoa poderá editar.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Nome</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome completo" />
                </div>
                <div className="space-y-1.5">
                  <Label>E-mail</Label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!isNew} placeholder="docente@escola.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Ano escolar</Label>
                <div className="flex flex-wrap gap-1.5">
                  {years.map((y) => {
                    const n = countByYear(y);
                    return (
                      <button
                        key={y}
                        type="button"
                        onClick={() => setYear(y)}
                        className={cn(
                          "text-xs rounded-full border px-3 py-1.5 transition-colors",
                          year === y ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"
                        )}
                      >
                        {y}
                        {n > 0 && <span className="ml-1.5 font-bold">· {n}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Matérias de {year}</Label>
                {inYear.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Nenhuma matéria neste ano.</p>
                ) : (
                  <div className="space-y-1">
                    {inYear.map((c) => {
                      const on = selected.includes(c.id);
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => toggle(c.id)}
                          className={cn(
                            "w-full flex items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm transition-colors",
                            on ? "border-primary bg-primary/5" : "border-border hover:bg-muted"
                          )}
                        >
                          <span className={cn("w-5 h-5 rounded border flex items-center justify-center shrink-0", on ? "bg-primary border-primary text-primary-foreground" : "border-border")}>
                            {on && <Check className="w-3.5 h-3.5" />}
                          </span>
                          <span className="flex-1 truncate">{c.title}</span>
                          <span className="text-xs text-muted-foreground">{c.category}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">{selected.length} matéria(s) selecionada(s) no total.</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button onClick={save} disabled={busy}>
                {busy ? "Salvando..." : isNew ? "Cadastrar e liberar" : "Salvar"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
