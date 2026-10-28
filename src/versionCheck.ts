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
const CHECK_EVERY_MS = 5 * 60 * 1000;
const RELOADED_KEY = "pandoorga.reloadedForBuild";
const RETRY_AFTER_MS = 10 * 60 * 1000; // se a recarga não trouxe a versão nova, tenta de novo depois disso
export const UPDATE_EVENT = "pandoorga:update-available";

let pendingBuild: string | null = null;

/** Identificador da versão que está rodando (aparece no Perfil para conferência). */
export const runningBuildId = (): string => RUNNING;
export const hasPendingUpdate = (): boolean => pendingBuild !== null;

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
    const raw = localStorage.getItem(RELOADED_KEY);
    if (!raw) return false;
    const [b, at] = raw.split("@");
    // Só desiste daquela versão por alguns minutos; depois tenta de novo.
    return b === build && Date.now() - Number(at || 0) < RETRY_AFTER_MS;
  } catch {
    return false;
  }
};

const hardReload = async (build: string) => {
  // Evita laço de recarregamentos se o servidor ainda entregar o arquivo antigo.
  try {
    localStorage.setItem(RELOADED_KEY, `${build}@${Date.now()}`);
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
  if (!pendingBuild || alreadyTriedFor(pendingBuild)) return;
  if (isBusy()) {
    // Atividade/vídeo aberto: não recarrega, mas avisa que há versão nova.
    window.dispatchEvent(new CustomEvent(UPDATE_EVENT));
    return;
  }
  const build = pendingBuild;
  pendingBuild = null;
  void hardReload(build);
};

/** Atualiza agora, por pedido da pessoa (botão), mesmo que a checagem automática tenha falhado. */
export const forceUpdateNow = async (): Promise<void> => {
  await hardReload(`manual-${Date.now()}`);
};

/** Confere agora; devolve true se havia versão nova (e já inicia a atualização). */
export const checkNow = async (): Promise<boolean> => {
  if (RUNNING === "dev") return false;
  const latest = await findNewerBuild();
  if (!latest) return false;
  await hardReload(latest);
  return true;
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
  // No iPhone, o app salvo na tela de início nem sempre dispara "visibilitychange" ao voltar.
  window.addEventListener("focus", () => void check());
  window.addEventListener("pageshow", () => void check());
}
