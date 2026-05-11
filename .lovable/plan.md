## Sistemática de 5 Grupos para "Alfabetização Divertida"

Reestruturação do curso para ter 5 grupos sequenciais, cada um com 1 vídeo de introdução + 10 atividades práticas, com progressão bloqueada (precisa concluir o grupo para liberar o próximo).

### Estrutura de dados

**`src/data/courses.ts`** — substituir o curso `alfabetizacao-divertida`:
- Adicionar conceito de `groups` na interface `Course`. Cada `LessonGroup` terá `id`, `title`, `videoTitle`, `videoObjective`, `videoScript`, `videoDuration`, `videoThumbnail`, `groupCoinsBonus: 10`, e `activities: Activity[]` (10 atividades).
- Manter compatibilidade: `lessons` permanece para outros cursos. O Alfabetização passará a usar `groups`.
- 5 grupos:
  1. **As Letras Têm Som!** — vogais, sons iniciais, sílabas, rimas
  2. **A Floresta dos Animais** — animais, habitats, sons
  3. **Amigos e Emoções** — empatia, sentimentos, convivência
  4. **Brincadeiras e Imaginação** — criatividade, lógica
  5. **Comer Bem e Cuidar do Corpo** — alimentação, higiene

### Atividades (50 totais)

**`src/data/activities.ts`** — adicionar `alfabetizacaoGrupos: LessonGroup[]` com as 50 atividades exatas fornecidas:
- Grupo 1: "Qual começa com B?", arrastar letras→animais, rima SAPO/PATO, tocar vogais, completar _ATO, escolher abelha, organizar BO+LA, V/F ELEFANTE, memória A/B/C, MIAU.
- Grupos 2–5: idem, seguindo a especificação.
- Cada atividade: `coinsReward: 5` (10 × 5 = 50 moedas por grupo de atividades) + feedback positivo + animação `animate-scale-in`.
- Bônus de 10 moedas ao concluir o grupo inteiro.

### Componentes

**Novo `src/components/GroupLearningPath.tsx`**:
- Visualiza os 5 grupos como cards/etapas em uma trilha vertical.
- Estados: `locked`, `current` (vídeo pendente), `in-progress` (vídeo visto, atividades pendentes), `completed`.
- Exibe título do grupo, duração do vídeo, número de atividades concluídas (x/10), bônus de 10 moedas.
- Ícone do "foguete" / estrela para o grupo atual.

**Reutilizar `ActivityPlayer.tsx`** sem alteração — ele já recebe `activities: Activity[]`.

**Reutilizar `VideoPlayer.tsx`** — passar o vídeo do grupo (placeholder usando o asset existente `vogais-cantantes.mp4` para o grupo 1 e vídeo sample do BigBuckBunny para os demais, com narração via `<title>` e descrição).

### Página CourseDetail — fluxo

**`src/pages/CourseDetail.tsx`** ajustar para o curso Alfabetização:
- Detectar se `course.groups` existe → renderizar fluxo de grupos.
- Estado persistido em `localStorage` (`pandoorga.alfabetizacao.progress`):
  ```ts
  { currentGroup: 0, videosWatched: number[], groupsCompleted: number[] }
  ```
- Fluxo por grupo:
  1. Assistir vídeo (desbloqueio aos 90%).
  2. Quando vídeo concluído → liberar `ActivityPlayer` com as 10 atividades.
  3. Ao acertar 100% das 10 atividades → marcar grupo como concluído, somar **+10 moedas de bônus** via `addCoins`, e desbloquear próximo grupo.
  4. As moedas das atividades (5 cada) também via `addCoins` durante o jogo.
- Sidebar mostra trilha dos 5 grupos (via `GroupLearningPath`).

### Recompensas e progresso

- Moedas: integradas com `useCoins()` (já existe).
- XP/Medalhas: salvar em `localStorage`:
  - `pandoorga.xp` (somatório de coins ganhas)
  - `pandoorga.medals` (string[] — ex.: `"alfabetizacao-grupo-1"` ao completar cada grupo, `"alfabetizacao-mestre"` ao completar os 5).
- Toast de celebração ao concluir cada grupo + ao concluir a matéria.

### Design

- Cores suaves e vibrantes (já no tema): `primary`, `accent`, `gold` para destaques de conquista.
- Micro animações: `animate-scale-in`, `animate-fade-in`, `hover-scale` nos cards de grupo e nas opções de resposta.
- Sem novas dependências.

### Arquivos afetados

- editar `src/data/courses.ts` — adicionar `groups` ao curso Alfabetização, atualizar interface
- editar `src/data/activities.ts` — adicionar export `alfabetizacaoGrupos` com 50 atividades
- criar `src/components/GroupLearningPath.tsx`
- editar `src/pages/CourseDetail.tsx` — branch para fluxo de grupos
- criar `src/hooks/useAlfabetizacaoProgress.tsx` — estado persistido de grupos/vídeos/medalhas

### Fora do escopo

- Efeitos sonoros reais (não há assets de áudio enviados) — usarei `toast` e animações visuais como feedback. Posso adicionar TTS depois com Lovable AI se você quiser narração real.
- Vídeos novos: usarei o vídeo de vogais existente para o Grupo 1 e um sample público para Grupos 2–5 (substituível depois).

Posso seguir com a implementação?