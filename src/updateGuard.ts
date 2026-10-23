// Marca os momentos em que NÃO se deve recarregar o app para atualizar
// (criança respondendo uma atividade ou assistindo a um vídeo).
let busyCount = 0;

export const setBusy = (busy: boolean) => {
  busyCount = Math.max(0, busyCount + (busy ? 1 : -1));
};

export const isBusy = () => busyCount > 0;
