import { isBusy } from "./updateGuard";

// Segunda camada de atualização, independente do service worker.
//
// O app instalado na tela de início (principalmente no iPhone) costuma ficar preso
// na versão antiga porque o service worker não termina a troca. Aqui, a cada build
// o site publica /version.json com um id novo. O app compara esse id com o da versão
// que está rodando e, se for diferente, limpa o cache e recarrega (nunca no meio de
// uma atividade ou vídeo).

declare const __BUILD_ID__: string;

const RUNNING = typeof __BUILD_ID__ === "string" ? __BUILD_ID__ : "dev";
const CHECK_EVERY_MS = 15 * 60 * 1000;
const RELOADED_KEY = "pandoorga.reloadedForBuild";

let pendingBuild: string | null = null;

const fetchLatestBuild = async (): Promise<string | null> => {
  try {
    const res = await fetch(`/version.json?ts=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as { id?: unknown };
    return typeof data.id === "string" ? data.id : null;
  } catch {
    return null;
  }
};

const alreadyTriedFor = (build: string) => {
  try {
    return localStorage.getItem(RELOADED_KEY) === build;
  } catch {
    return false;
  }
};

const hardReload = async (build: string) => {
  // Evita laço de recarregamentos se o servidor ainda entregar o arquivo antigo.
  try {
    localStorage.setItem(RELOADED_KEY, build);
  } catch {
    /* sem armazenamento: segue mesmo assim */
  }
  try {
    const registrations = await navigator.serviceWorker?.getRegistrations();
    await Promise.all((registrations ?? []).map((r) => r.unregister()));
  } catch {
    /* ignora */
  }
  try {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));
  } catch {
    /* ignora */
  }
  window.location.reload();
};

const applyIfSafe = () => {
  if (!pendingBuild || isBusy() || alreadyTriedFor(pendingBuild)) return;
  const build = pendingBuild;
  pendingBuild = null;
  void hardReload(build);
};

const check = async () => {
  if (RUNNING === "dev" || !navigator.onLine) return;
  const latest = await fetchLatestBuild();
  if (!latest || latest === RUNNING) return;
  pendingBuild = latest;
  applyIfSafe();
};

if (RUNNING !== "dev") {
  void check(); // ao abrir o app
  window.setInterval(() => void check(), CHECK_EVERY_MS);
  window.addEventListener("online", () => void check());
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) applyIfSafe(); // criança saiu do app: troca agora
    else void check(); // voltou para o app: confere e, se houver versão nova, atualiza
  });
}
