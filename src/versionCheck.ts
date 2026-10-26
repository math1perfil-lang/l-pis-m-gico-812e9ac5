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

// Arquivo principal (com hash no nome) que está rodando agora.
const runningAsset = (): string | null => {
  const el = document.querySelector('script[type="module"][src*="/assets/"]');
  return el?.getAttribute("src") ?? null;
};

const fetchVersionId = async (): Promise<string | null> => {
  try {
    const res = await fetch(`/version.json?ts=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as { id?: unknown };
    return typeof data.id === "string" ? data.id : null;
  } catch {
    return null;
  }
};

// Segunda forma de descobrir versão nova, que não depende do version.json:
// lê o index.html no servidor e vê qual arquivo principal ele carrega.
// (O "?__v=" evita que o service worker devolva o index.html antigo guardado.)
const fetchLatestAsset = async (): Promise<string | null> => {
  try {
    const res = await fetch(`/?__v=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) return null;
    const html = await res.text();
    const m = html.match(/<script[^>]+type="module"[^>]+src="([^"]*\/assets\/[^"]+)"/);
    return m ? m[1] : null;
  } catch {
    return null;
  }
};

// Devolve um identificador da versão nova, ou null se este app já é a versão mais recente.
const findNewerBuild = async (): Promise<string | null> => {
  const [id, asset] = await Promise.all([fetchVersionId(), fetchLatestAsset()]);
  const current = runningAsset();
  const idDiffers = !!id && id !== RUNNING;
  const assetDiffers = !!asset && !!current && asset !== current;
  if (!idDiffers && !assetDiffers) return null;
  return `${id ?? "?"}|${asset ?? "?"}`;
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
  const latest = await findNewerBuild();
  if (!latest) return;
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
