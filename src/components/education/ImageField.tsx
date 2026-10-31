import { useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadContentImage } from "@/lib/contentApi";

interface Props {
  label: string;
  value: string | undefined;
  onChange: (url: string) => void;
  folder: string;
}

// Campo de imagem: cola um endereço ou envia um arquivo (redimensionado e guardado no Supabase).
export const ImageField = ({ label, value, onChange, folder }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    try {
      onChange(await uploadContentImage(file, folder));
      toast.success("Imagem enviada");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Não foi possível enviar a imagem");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {value ? (
        <img
          src={value}
          alt=""
          className="max-h-40 rounded-lg border border-border object-contain bg-muted"
          onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
        />
      ) : null}
      <div className="flex gap-2">
        <Input
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Endereço da imagem (opcional)"
        />
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onFile(e.target.files?.[0])}
        />
        <Button type="button" variant="outline" disabled={busy} onClick={() => inputRef.current?.click()}>
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImagePlus className="w-4 h-4" />}
          <span className="ml-2 hidden sm:inline">Enviar</span>
        </Button>
        {value ? (
          <Button type="button" variant="ghost" size="icon" onClick={() => onChange("")} title="Remover imagem">
            <Trash2 className="w-4 h-4" />
          </Button>
        ) : null}
      </div>
    </div>
  );
};
