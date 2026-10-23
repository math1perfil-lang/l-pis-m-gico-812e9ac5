import { registerSW } from "virtual:pwa-register";

// Atualização automática do app instalado na tela de início.
//
// 1) Procura versão nova ao abrir o app, ao voltar para ele e a cada 30 minutos
//    (um app instalado costuma ficar "congelado" em segundo plano por dias).
// 2) Baixa a versão nova em segundo plano e só a aplica quando o app vai para
//    segundo plano, para nunca recarregar no meio de uma atividade da criança.
//    Na próxima vez que ela abrir o app, já estará na versão mais nova.

const CHECK_EVERY_MS = 30 * 60 * 1000;

let registration: ServiceWorkerRegistration | undefined;
let updateReady = false;

const checkForUpdate = () => {
  if (!registration || !navigator.onLine) return;
  registration.update().catch(() => {
    /* sem rede ou servidor indisponível: tenta de novo na próxima vez */
  });
};

const updateSW = registerSW({
  immediate: true,
  onRegisteredSW(_swUrl, reg) {
    registration = reg;
    if (!reg) return;
    window.setInterval(checkForUpdate, CHECK_EVERY_MS);
  },
  onNeedRefresh() {
    updateReady = true;
    if (document.hidden) void updateSW(true);
  },
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    if (updateReady) void updateSW(true);
  } else {
    checkForUpdate();
  }
});

window.addEventListener("online", checkForUpdate);
