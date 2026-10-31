import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ImageField } from "./ImageField";
import { SCHOOL_YEARS } from "@/lib/schoolYears";
import type { CourseFields } from "@/lib/contentApi";

export const CATEGORIES = [
  "Linguagem",
  "Matemática",
  "Ciências",
  "Finanças",
  "Tecnologia",
  "História",
  "Idiomas",
  "Redação",
  "Outras",
];

interface Props {
  open: boolean;
  initial: CourseFields;
  isNew: boolean;
  onClose: () => void;
  onSave: (f: CourseFields) => Promise<void>;
}

export const CourseDialog = ({ open, initial, isNew, onClose, onSave }: Props) => {
  const [f, setF] = useState<CourseFields>(initial);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (open) setF(initial);
  }, [open, initial]);

  const set = <K extends keyof CourseFields>(k: K, v: CourseFields[K]) => setF((p) => ({ ...p, [k]: v }));
  const categories = CATEGORIES.includes(f.category) ? CATEGORIES : [...CATEGORIES, f.category];

  const submit = async () => {
    if (!f.title.trim()) return toast.error("Informe o nome da matéria");
    if (f.ageMin > f.ageMax) return toast.error("A idade mínima não pode ser maior que a máxima");
    setSaving(true);
    try {
      await onSave({ ...f, title: f.title.trim() });
      onClose();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Não foi possível salvar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isNew ? "Nova matéria" : "Editar matéria"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Nome</Label>
            <Input value={f.title} onChange={(e) => set("title", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Descrição</Label>
            <Textarea value={f.description} onChange={(e) => set("description", e.target.value)} rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Ano escolar</Label>
              <Select value={f.schoolYear} onValueChange={(v) => set("schoolYear", v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SCHOOL_YEARS.map((y) => (
                    <SelectItem key={y} value={y}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select value={f.category} onValueChange={(v) => set("category", v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label>Idade mínima</Label>
              <Input type="number" min={3} max={18} value={f.ageMin} onChange={(e) => set("ageMin", Number(e.target.value) || 0)} />
            </div>
            <div className="space-y-2">
              <Label>Idade máxima</Label>
              <Input type="number" min={3} max={18} value={f.ageMax} onChange={(e) => set("ageMax", Number(e.target.value) || 0)} />
            </div>
            <div className="space-y-2">
              <Label>Duração</Label>
              <Input value={f.duration} onChange={(e) => set("duration", e.target.value)} placeholder="Ex.: 2h" />
            </div>
          </div>
          <ImageField label="Imagem de capa" value={f.image} onChange={(u) => set("image", u)} folder="cursos" />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={submit} disabled={saving}>
            {saving ? "Salvando..." : "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
