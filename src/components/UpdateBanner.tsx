import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UPDATE_EVENT, forceUpdateNow, hasPendingUpdate } from "@/versionCheck";

// Aviso "Nova versão disponível". Só aparece quando a atualização automática foi adiada
// (por exemplo, com uma atividade aberta) ou não conseguiu se completar.
export const UpdateBanner = () => {
  const [show, setShow] = useState(hasPendingUpdate());
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const on = () => setShow(true);
    window.addEventListener(UPDATE_EVENT, on);
    return () => window.removeEventListener(UPDATE_EVENT, on);
  }, []);

  if (!show) return null;
  return (
    <div className="fixed bottom-4 left-4 right-4 z-[60] mx-auto max-w-md rounded-2xl bg-card border border-border shadow-card p-3 flex items-center gap-3">
      <RefreshCw className="w-5 h-5 text-primary shrink-0" />
      <p className="text-sm text-foreground flex-1">Tem uma versão nova do app!</p>
      <Button
        size="sm"
        disabled={busy}
        onClick={() => {
          setBusy(true);
          void forceUpdateNow();
        }}
      >
        Atualizar agora
      </Button>
    </div>
  );
};
