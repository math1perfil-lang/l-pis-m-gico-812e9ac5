import { useEffect, useMemo, useState } from "react";
import { Eye, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ActivityPlayer } from "@/components/ActivityPlayer";
import { ImageField } from "./ImageField";
import type { Activity, ActivityType } from "@/data/activities";
import type { EditableActivity } from "@/data/contentOverlay";

const TYPE_LABEL: Record<string, string> = {
  "multiple-choice": "Múltipla escolha (A, B, C, D)",
  matching: "Ligar pares",
  ordering: "Colocar em ordem",
  reading: "Texto para ler",
  "true-false": "Verdadeiro ou falso",
  "fill-blank": "Completar",
};
const CREATABLE: ActivityType[] = ["multiple-choice", "matching", "ordering", "reading"];
export const typeLabel = (t: string) => TYPE_LABEL[t] ?? t;

interface Draft {
  type: ActivityType;
  question: string;
  instruction: string;
  difficulty: Activity["difficulty"];
  coinsReward: number;
  imageUrl: string;
  imageCaption: string;
  basedOn: string;
  choices: string[];
  correctIdx: number;
  items: string[];
  pairs: Array<{ l: string; r: string }>;
  passageTitle: string;
  passageText: string;
  passageCredit: string;
  answer: string;
}

const blank = (type: ActivityType = "multiple-choice"): Draft => ({
  type,
  question: "",
  instruction: type === "reading" ? "Leia o texto e toque em “Li o texto”" : "Toque na resposta certa",
  difficulty: "medium",
  coinsReward: 5,
  imageUrl: "",
  imageCaption: "",
  basedOn: "",
  choices: ["", "", "", ""],
  correctIdx: 0,
  items: ["", "", ""],
  pairs: [
    { l: "", r: "" },
    { l: "", r: "" },
  ],
  passageTitle: "",
  passageText: "",
  passageCredit: "",
  answer: "",
});

const toDraft = (a: Activity): Draft => {
  const d = blank(a.type);
  d.question = a.question ?? "";
  d.instruction = a.instruction ?? "";
  d.difficulty = a.difficulty ?? "medium";
  d.coinsReward = a.coinsReward ?? 5;
  d.imageUrl = a.imageUrl ?? "";
  d.imageCaption = a.imageCaption ?? "";
  d.basedOn = a.basedOn ?? "";
  d.answer = a.correctAnswer ?? "";
  if (a.type === "multiple-choice" || a.type === "true-false") {
    d.choices = a.options.map((o) => o.text);
    d.correctIdx = Math.max(0, a.options.findIndex((o) => o.isCorrect));
  } else if (a.type === "ordering") {
    const byId = new Map(a.options.map((o) => [o.id, o.text]));
    d.items = (a.correctOrder ?? a.options.map((o) => o.id)).map((id) => byId.get(id) ?? "");
  } else if (a.type === "matching") {
    const byId = new Map(a.options.map((o) => [o.id, o]));
    const seen = new Set<string>();
    const pairs: Array<{ l: string; r: string }> = [];
    a.options.forEach((o) => {
      if (seen.has(o.id) || !o.matchId) return;
      const other = byId.get(o.matchId);
      seen.add(o.id);
      if (other) seen.add(other.id);
      pairs.push({ l: o.text, r: other?.text ?? "" });
    });
    d.pairs = pairs.length ? pairs : d.pairs;
  } else if (a.type === "reading") {
    d.passageTitle = a.passageTitle ?? "";
    d.passageText = (a.passage ?? []).join("\n\n");
    d.passageCredit = a.passageCredit ?? "";
  }
  return d;
};

// Monta a atividade final, preservando campos que o editor não mexe (poema, etc.).
const toActivity = (d: Draft, base: Partial<EditableActivity> | null, id: string): Activity => {
  const out: Activity = {
    ...(base as Activity),
    id,
    type: d.type,
    question: d.question.trim(),
    instruction: d.instruction.trim(),
    difficulty: d.difficulty,
    coinsReward: d.coinsReward,
    options: [],
    imageUrl: d.imageUrl.trim() || undefined,
    imageCaption: d.imageUrl.trim() ? d.imageCaption.trim() || undefined : undefined,
    basedOn: d.type !== "reading" && d.basedOn ? d.basedOn : undefined,
  };
  if (d.type === "multiple-choice" || d.type === "true-false") {
    const texts = d.type === "true-false" ? ["Verdadeiro", "Falso"] : d.choices.map((c) => c.trim());
    out.options = texts.map((text, i) => ({ id: d.type === "true-false" ? (i === 0 ? "true" : "false") : `o${i}`, text, isCorrect: i === d.correctIdx }));
  } else if (d.type === "ordering") {
    const items = d.items.map((t) => t.trim());
    out.options = items.map((text, i) => ({ id: `i${i}`, text }));
    out.correctOrder = items.map((_, i) => `i${i}`);
  } else if (d.type === "matching") {
    out.options = d.pairs.flatMap((p, i) => [
      { id: `l${i}`, text: p.l.trim(), matchId: `r${i}` },
      { id: `r${i}`, text: p.r.trim(), matchId: `l${i}` },
    ]);
  } else if (d.type === "reading") {
    out.question = d.question.trim() || "Leia o texto com atenção. Depois, responda às perguntas.";
    out.passageTitle = d.passageTitle.trim();
    out.passage = d.passageText
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);
    out.passageCredit = d.passageCredit.trim() || undefined;
  } else if (d.type === "fill-blank") {
    out.correctAnswer = d.answer.trim();
  }
  Object.keys(out).forEach((k) => (out as unknown as Record<string, unknown>)[k] === undefined && delete (out as unknown as Record<string, unknown>)[k]);
  return out;
};

const validate = (d: Draft): string | null => {
  if (d.type !== "reading" && !d.question.trim()) return "Escreva o enunciado da atividade";
  if (!Number.isFinite(d.coinsReward) || d.coinsReward < 0) return "O valor em moedas precisa ser zero ou maior";
  if (d.type === "multiple-choice") {
    if (d.choices.some((c) => !c.trim())) return "Preencha todas as alternativas";
    if (d.choices.length < 2) return "Use pelo menos 2 alternativas";
  }
  if (d.type === "ordering" && (d.items.length < 2 || d.items.some((i) => !i.trim()))) return "Preencha todos os itens (mínimo 2)";
  if (d.type === "matching" && (d.pairs.length < 2 || d.pairs.some((p) => !p.l.trim() || !p.r.trim()))) return "Preencha todos os pares (mínimo 2)";
  if (d.type === "reading") {
    if (!d.passageTitle.trim()) return "Dê um título ao texto";
    if (!d.passageText.trim()) return "Escreva o texto a ser lido";
  }
  return null;
};

interface Props {
  open: boolean;
  activity: EditableActivity | null; // null = nova
  readings: Array<{ id: string; title: string }>; // textos base do grupo
  onClose: () => void;
  onSave: (a: Activity, isNew: boolean) => Promise<void>;
}

export const ActivityDialog = ({ open, activity, readings, onClose, onSave }: Props) => {
  const isNew = !activity;
  const [d, setD] = useState<Draft>(blank());
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (open) {
      setD(activity ? toDraft(activity) : blank());
      setPreview(false);
    }
  }, [open, activity]);

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setD((p) => ({ ...p, [k]: v }));
  const previewActivity = useMemo(() => (validate(d) ? null : toActivity(d, activity, activity?.id ?? "previa")), [d, activity]);
  const isReading = d.type === "reading";
  const isTF = d.type === "true-false";
  const isFill = d.type === "fill-blank";

  const submit = async () => {
    const err = validate(d);
    if (err) return toast.error(err);
    setSaving(true);
    try {
      await onSave(toActivity(d, activity, activity?.id ?? ""), isNew);
      onClose();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Não foi possível salvar");
    } finally {
      setSaving(false);
    }
  };

  const letter = (i: number) => String.fromCharCode(65 + i);
  const typeOptions = CREATABLE.includes(d.type) ? CREATABLE : [...CREATABLE, d.type];

  return (
    <>
      <Dialog open={open && !preview} onOpenChange={(o) => !o && onClose()}>
        <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isNew ? "Nova atividade" : "Editar atividade"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Tipo</Label>
                <Select value={d.type} onValueChange={(v) => isNew && setD(() => ({ ...blank(v as ActivityType), imageUrl: d.imageUrl }))} disabled={!isNew}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {typeOptions.map((t) => (
                      <SelectItem key={t} value={t}>
                        {typeLabel(t)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Moedas</Label>
                  <Input type="number" min={0} value={d.coinsReward} onChange={(e) => set("coinsReward", Math.max(0, Math.floor(Number(e.target.value) || 0)))} />
                </div>
                <div className="space-y-2">
                  <Label>Dificuldade</Label>
                  <Select value={d.difficulty} onValueChange={(v) => set("difficulty", v as Activity["difficulty"])}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Fácil</SelectItem>
                      <SelectItem value="medium">Média</SelectItem>
                      <SelectItem value="hard">Difícil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {isReading ? (
              <>
                <div className="space-y-2">
                  <Label>Título do texto</Label>
                  <Input value={d.passageTitle} onChange={(e) => set("passageTitle", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Texto (separe os parágrafos com uma linha em branco)</Label>
                  <Textarea value={d.passageText} onChange={(e) => set("passageText", e.target.value)} rows={9} />
                </div>
                <div className="space-y-2">
                  <Label>Crédito da fonte (só se o texto for copiado ou baseado em uma obra)</Label>
                  <Input value={d.passageCredit} onChange={(e) => set("passageCredit", e.target.value)} placeholder="Baseado em..." />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label>Enunciado</Label>
                  <Textarea value={d.question} onChange={(e) => set("question", e.target.value)} rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>Instrução</Label>
                  <Input value={d.instruction} onChange={(e) => set("instruction", e.target.value)} />
                </div>
              </>
            )}

            {(d.type === "multiple-choice" || isTF) && (
              <div className="space-y-2">
                <Label>Alternativas (marque a correta)</Label>
                {d.choices.map((c, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correta"
                      checked={d.correctIdx === i}
                      onChange={() => set("correctIdx", i)}
                      className="accent-primary w-4 h-4"
                      aria-label={`Alternativa ${letter(i)} correta`}
                    />
                    <span className="w-5 font-bold text-muted-foreground">{letter(i)}</span>
                    <Input
                      value={c}
                      disabled={isTF}
                      onChange={(e) => set("choices", d.choices.map((x, j) => (j === i ? e.target.value : x)))}
                    />
                    {!isTF && d.choices.length > 2 ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const next = d.choices.filter((_, j) => j !== i);
                          setD((p) => ({ ...p, choices: next, correctIdx: Math.min(p.correctIdx > i ? p.correctIdx - 1 : p.correctIdx, next.length - 1) }));
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    ) : null}
                  </div>
                ))}
                {!isTF && d.choices.length < 6 ? (
                  <Button type="button" variant="outline" size="sm" onClick={() => set("choices", [...d.choices, ""])}>
                    <Plus className="w-4 h-4 mr-1" /> Alternativa
                  </Button>
                ) : null}
              </div>
            )}

            {d.type === "ordering" && (
              <div className="space-y-2">
                <Label>Itens na ordem correta (o aluno vê embaralhado)</Label>
                {d.items.map((it, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-6 text-muted-foreground font-bold">{i + 1}.</span>
                    <Input value={it} onChange={(e) => set("items", d.items.map((x, j) => (j === i ? e.target.value : x)))} />
                    {d.items.length > 2 ? (
                      <Button type="button" variant="ghost" size="icon" onClick={() => set("items", d.items.filter((_, j) => j !== i))}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    ) : null}
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => set("items", [...d.items, ""])}>
                  <Plus className="w-4 h-4 mr-1" /> Item
                </Button>
              </div>
            )}

            {d.type === "matching" && (
              <div className="space-y-2">
                <Label>Pares que se combinam</Label>
                {d.pairs.map((p, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input value={p.l} placeholder="Lado esquerdo" onChange={(e) => set("pairs", d.pairs.map((x, j) => (j === i ? { ...x, l: e.target.value } : x)))} />
                    <span className="text-muted-foreground">↔</span>
                    <Input value={p.r} placeholder="Lado direito" onChange={(e) => set("pairs", d.pairs.map((x, j) => (j === i ? { ...x, r: e.target.value } : x)))} />
                    {d.pairs.length > 2 ? (
                      <Button type="button" variant="ghost" size="icon" onClick={() => set("pairs", d.pairs.filter((_, j) => j !== i))}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    ) : null}
                  </div>
                ))}
                {d.pairs.length < 6 ? (
                  <Button type="button" variant="outline" size="sm" onClick={() => set("pairs", [...d.pairs, { l: "", r: "" }])}>
                    <Plus className="w-4 h-4 mr-1" /> Par
                  </Button>
                ) : null}
              </div>
            )}

            {isFill && (
              <div className="space-y-2">
                <Label>Resposta correta</Label>
                <Input value={d.answer} onChange={(e) => set("answer", e.target.value)} />
              </div>
            )}

            {!isReading && readings.length > 0 && (
              <div className="space-y-2">
                <Label>Texto base (botão “Reler o texto”)</Label>
                <Select value={d.basedOn || "none"} onValueChange={(v) => set("basedOn", v === "none" ? "" : v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nenhum</SelectItem>
                    {readings.map((r) => (
                      <SelectItem key={r.id} value={r.id}>
                        {r.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <ImageField label="Imagem da atividade (opcional)" value={d.imageUrl} onChange={(u) => set("imageUrl", u)} folder="atividades" />
            {d.imageUrl ? (
              <div className="space-y-2">
                <Label>Legenda da imagem</Label>
                <Input value={d.imageCaption} onChange={(e) => set("imageCaption", e.target.value)} />
              </div>
            ) : null}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => (previewActivity ? setPreview(true) : toast.error(validate(d) ?? "Complete a atividade para pré-visualizar"))}>
              <Eye className="w-4 h-4 mr-2" /> Pré-visualizar
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={submit} disabled={saving}>
              {saving ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {open && preview && previewActivity ? (
        <div className="fixed inset-0 z-[100] bg-background overflow-y-auto">
          <ActivityPlayer
            activities={[previewActivity]}
            practice
            onComplete={() => setPreview(false)}
            onClose={() => setPreview(false)}
          />
        </div>
      ) : null}
    </>
  );
};
