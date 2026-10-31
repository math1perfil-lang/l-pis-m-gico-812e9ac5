import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageField } from "./ImageField";
import type { GroupFields } from "@/lib/contentApi";

interface Props {
  open: boolean;
  initial: GroupFields;
  isNew: boolean;
  onClose: () => void;
  onSave: (f: GroupFields) => Promise<void>;
}

export const GroupDialog = ({ open, initial, isNew, onClose, onSave }: Props) => {
  const [f, setF] = useState<GroupFields>(initial);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (open) setF(initial);
  }, [open, initial]);
  const set = <K extends keyof GroupFields>(k: K, v: GroupFields[K]) => setF((p) => ({ ...p, [k]: v }));

  const submit = async () => {
    if (!f.title.trim()) return toast.error("Informe o título do grupo");
    setSaving(true);
    try {
      await onSave({ ...f, title: f.title.trim(), videoTitle: f.videoTitle.trim() || f.title.trim() });
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
          <DialogTitle>{isNew ? "Novo grupo" : "Editar grupo"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Título do grupo</Label>
            <Input value={f.title} onChange={(e) => set("title", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Título do vídeo</Label>
            <Input value={f.videoTitle} onChange={(e) => set("videoTitle", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Objetivo</Label>
            <Textarea value={f.videoObjective} onChange={(e) => set("videoObjective", e.target.value)} rows={2} />
          </div>
          <div className="space-y-2">
            <Label>Roteiro / texto do vídeo</Label>
            <Textarea value={f.videoScript} onChange={(e) => set("videoScript", e.target.value)} rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Duração do vídeo</Label>
              <Input value={f.videoDurationLabel} onChange={(e) => set("videoDurationLabel", e.target.value)} placeholder="3 min" />
            </div>
            <div className="space-y-2">
              <Label>Bônus do grupo (moedas)</Label>
              <Input type="number" min={0} value={f.groupCoinsBonus} onChange={(e) => set("groupCoinsBonus", Math.max(0, Number(e.target.value) || 0))} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Endereço do vídeo</Label>
            <Input value={f.videoUrl} onChange={(e) => set("videoUrl", e.target.value)} placeholder="/videos/arquivo.mp4" />
          </div>
          <ImageField label="Miniatura do vídeo" value={f.videoThumbnail} onChange={(u) => set("videoThumbnail", u)} folder="grupos" />
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
