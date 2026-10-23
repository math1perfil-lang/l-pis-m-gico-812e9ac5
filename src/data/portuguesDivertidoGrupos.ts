import type { Activity } from "./activities";
import type { LessonGroup } from "./alfabetizacaoGrupos";

// Atividades originais do "Português Divertido" (6 anos, 11 grupos), adaptadas das habilidades
// trabalhadas na Parte 1 do livro "Português Linguagens – 6º ano":
//   Cap. 1 – Era uma vez (conto maravilhoso, linguagem, oralidade)
//   Cap. 2 – Depois do final feliz (paródia, variedades da língua, fonema e letra)
//   Cap. 3 – Fábulas em cena! (texto teatral e fábula – parte inicial)
// Todo o texto e os exercícios abaixo foram criados do zero para a faixa de 6 anos;
// nada foi copiado do livro.

const ACT_COINS = 5;

type Difficulty = Activity["difficulty"];

// Posição da resposta certa varia de forma estável, para não ficar sempre na 1ª opção.
const slotFor = (id: string, total: number) =>
  Array.from(id).reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % total;

/** Múltipla escolha: 1 resposta certa + 3 erradas. */
const mc = (
  id: string,
  question: string,
  instruction: string,
  correct: string,
  wrongs: [string, string, string],
  difficulty: Difficulty = "easy"
): Activity => {
  const texts = [...wrongs];
  texts.splice(slotFor(id, 4), 0, correct);
  return {
    id,
    type: "multiple-choice",
    question,
    instruction,
    options: texts.map((text, i) => ({
      id: String.fromCharCode(97 + i),
      text,
      isCorrect: text === correct,
    })),
    coinsReward: ACT_COINS,
    difficulty,
  };
};

/** Verdadeiro ou falso. */
const tf = (
  id: string,
  question: string,
  correct: boolean,
  difficulty: Difficulty = "easy"
): Activity => ({
  id,
  type: "true-false",
  question,
  instruction: "Verdadeiro ou Falso",
  options: [
    { id: "true", text: "Verdadeiro", isCorrect: correct },
    { id: "false", text: "Falso", isCorrect: !correct },
  ],
  coinsReward: ACT_COINS,
  difficulty,
});

/** Ligar pares (esquerda ↔ direita). */
const match = (
  id: string,
  question: string,
  pairs: [string, string][],
  difficulty: Difficulty = "easy"
): Activity => ({
  id,
  type: "matching",
  question,
  instruction: "Conecte cada item ao par certo",
  options: pairs.flatMap(([left, right], i) => [
    { id: `p${i}a`, text: left, matchId: `p${i}b` },
    { id: `p${i}b`, text: right, matchId: `p${i}a` },
  ]),
  coinsReward: ACT_COINS,
  difficulty,
});

/** Ordenar: informe os itens já na ordem correta. */
const order = (
  id: string,
  question: string,
  items: string[],
  difficulty: Difficulty = "medium"
): Activity => ({
  id,
  type: "ordering",
  question,
  instruction: "Arraste para a ordem certa",
  options: items.map((text, i) => ({ id: `s${i + 1}`, text })),
  correctOrder: items.map((_, i) => `s${i + 1}`),
  coinsReward: ACT_COINS,
  difficulty,
});

/** Leitura do texto base: vira uma atividade do grupo e libera as questões que dependem dele. */
const read = (id: string, title: string, passage: string[]): Activity => ({
  id,
  type: "reading",
  question: "Leia o texto com atenção. Depois, responda às perguntas.",
  instruction: "Leia o texto e toque em “Li o texto”",
  passageTitle: title,
  passage,
  options: [],
  coinsReward: ACT_COINS,
  difficulty: "easy",
});

/** Marca uma questão como dependente de um texto base (aparece o botão “Reler o texto”). */
const fromText = (readingId: string, activity: Activity): Activity => ({
  ...activity,
  basedOn: readingId,
});

// ---------------------------------------------------------------------------
// CAPÍTULO 1 — ERA UMA VEZ
// ---------------------------------------------------------------------------

// Grupo 1 — Como é um conto de fadas
const g1Activities: Activity[] = [
  read("pd-g1-leitura", "Lia e o gato de estrelas", [
    "Era uma vez uma menina chamada Lia, que morava em um castelo no alto da montanha.",
    "Lia tinha um gato mágico, feito de estrelas. À noite, ele brilhava no escuro.",
    "Um dia, uma bruxa ranzinza enfeitiçou o gato, e ele desapareceu!",
    "Lia ficou triste, mas teve coragem. Atravessou a floresta, cruzou o rio e subiu até a torre da bruxa.",
    "— Devolva o meu gato, por favor! — pediu Lia.",
    "A bruxa viu que a menina era corajosa e desfez o feitiço. O gato voltou a brilhar.",
    "E Lia e o gato foram felizes para sempre.",
  ]),
  fromText("pd-g1-leitura", mc("pd-g1-a1", "Como essa história começa?", "Toque na resposta certa",
    "Era uma vez...", ["Fim de papo!", "Tchau, pessoal!", "Quem quer pipoca?"])),
  fromText("pd-g1-leitura", mc("pd-g1-a2", "Em “Era uma vez...”, a história do texto acontece em um tempo...", "Toque na resposta certa",
    "Bem antigo, sem data certa", ["Hoje de manhã", "Ontem à noite", "Daqui a dez anos"], "medium")),
  fromText("pd-g1-leitura", tf("pd-g1-a3", "No texto, Lia morava em um castelo no alto da montanha.", true)),
  fromText("pd-g1-leitura", mc("pd-g1-a4", "Como era o gato de Lia?", "Toque na resposta certa",
    "Um gato mágico que brilhava no escuro", ["Um gato de pelúcia", "Um gato de pedra", "Um gato que nadava no mar"])),
  fromText("pd-g1-leitura", order("pd-g1-a5", "Coloque os fatos da história na ordem certa", [
    "Lia vivia no castelo com seu gato de estrelas.",
    "A bruxa enfeitiçou o gato.",
    "Lia atravessou a floresta e foi até a torre da bruxa.",
    "A bruxa desfez o feitiço.",
  ])),
  fromText("pd-g1-leitura", mc("pd-g1-a6", "Qual foi o PROBLEMA da história?", "Toque na resposta certa",
    "A bruxa enfeitiçou o gato de Lia",
    ["A chuva molhou o castelo", "Lia perdeu o sapato", "O rio secou"], "medium")),
  fromText("pd-g1-leitura", match("pd-g1-a7", "Ligue cada parte da história ao que aconteceu nela", [
    ["Começo", "Lia mora no castelo com o gato"],
    ["Problema", "A bruxa enfeitiça o gato"],
    ["Final", "O gato volta e todos ficam felizes"],
  ], "medium")),
  fromText("pd-g1-leitura", mc("pd-g1-a8", "Como Lia resolveu o problema?", "Toque na resposta certa",
    "Foi até a torre da bruxa e pediu o gato de volta",
    ["Fugiu para bem longe", "Esperou sem fazer nada", "Pediu ajuda a um dragão"], "medium")),
  fromText("pd-g1-leitura", mc("pd-g1-a9", "Como Lia se sentiu quando o gato desapareceu?", "Toque na resposta certa",
    "Triste", ["Com sono", "Com fome", "Com preguiça"])),
  fromText("pd-g1-leitura", mc("pd-g1-a10", "Como termina a história?", "Toque na resposta certa",
    "Lia e o gato foram felizes para sempre",
    ["A bruxa ficou com o gato", "O castelo desapareceu", "Lia nunca mais viu o gato"])),
];

// Grupo 2 — Heróis, vilões e sentimentos
const g2Activities: Activity[] = [
  read("pd-g2-leitura", "Teo e o dragão do vento", [
    "Em um reino distante, o vento de repente sumiu. As flores murcharam e os barcos ficaram parados.",
    "O rei ficou muito preocupado. Um dragão ranzinza tinha prendido o vento dentro de uma caverna.",
    "Teo, um menino corajoso, decidiu salvar o reino. Sua amiga, a fada Nina, foi junto para ajudar.",
    "Na caverna, o dragão rugiu: — Ninguém vai pegar o meu vento!",
    "Teo ficou com medo, mas respirou fundo e disse: — Se você soltar o vento, eu convido você para brincar com a gente.",
    "O dragão, que estava muito sozinho, ficou surpreso e feliz. Soltou o vento e ganhou novos amigos.",
  ]),
  fromText("pd-g2-leitura", mc("pd-g2-a1", "Quem é o herói da história?", "Toque na resposta certa",
    "Teo", ["O dragão", "O rei", "O vento"])),
  fromText("pd-g2-leitura", mc("pd-g2-a2", "Quem atrapalha o herói? Ou seja, quem é o vilão?", "Toque na resposta certa",
    "O dragão", ["A fada Nina", "O rei", "As flores"])),
  fromText("pd-g2-leitura", match("pd-g2-a3", "Ligue cada personagem ao que ele faz no texto", [
    ["🧒 Teo", "Salva o reino"],
    ["🐉 Dragão", "Prende o vento"],
    ["🧚 Nina", "Ajuda o herói"],
  ])),
  fromText("pd-g2-leitura", mc("pd-g2-a4", "O que aconteceu quando o vento sumiu?", "Toque na resposta certa",
    "As flores murcharam e os barcos pararam",
    ["Choveu muito", "O castelo caiu", "O rei foi viajar"], "medium")),
  fromText("pd-g2-leitura", mc("pd-g2-a5", "Quando o dragão rugiu, Teo ficou com...", "Toque na resposta certa",
    "Medo", ["Sono", "Fome", "Calor"])),
  fromText("pd-g2-leitura", mc("pd-g2-a6", "O que Teo fez para se acalmar?", "Toque na resposta certa",
    "Respirou fundo", ["Gritou bem alto", "Saiu correndo", "Foi dormir"], "medium")),
  fromText("pd-g2-leitura", mc("pd-g2-a7", "Como o dragão estava se sentindo?", "Toque na resposta certa",
    "Sozinho", ["Muito rico", "Com sono", "Com pressa"], "medium")),
  fromText("pd-g2-leitura", mc("pd-g2-a8", "O que Teo ofereceu ao dragão?", "Toque na resposta certa",
    "Brincar com a turma", ["Um bolo", "Um castelo", "Uma espada"])),
  fromText("pd-g2-leitura", mc("pd-g2-a9", "Como o problema foi resolvido?", "Toque na resposta certa",
    "Com uma conversa gentil", ["Com uma luta", "Com um feitiço", "Com um grito"], "medium")),
  match("pd-g2-a10", "Ligue a carinha ao sentimento", [
    ["😠", "Raiva"],
    ["😢", "Tristeza"],
    ["😄", "Alegria"],
  ]),
];

// Grupo 3 — Palavras que fazem mágica (linguagem do texto)
const g3Activities: Activity[] = [
  read("pd-g3-leitura", "A viagem de Bia", [
    "Bia queria encontrar a Montanha de Cristal, onde estava seu irmão. Ela andou, andou, andou.",
    "Passou um dia. Passaram muitos dias. Muitos meses depois, ela viu uma luz brilhando ao longe.",
    "— Ah! Que lindo! — gritou Bia.",
    "No caminho, uma ave perguntou: — Para onde você vai?",
    "— Vou salvar o meu irmão! — respondeu Bia.",
    "De repente, Bia caiu em si: tinha esquecido a lanterna em casa!",
    "Mesmo assim, ela moveu mundos e fundos para chegar até a montanha. E o irmão apareceu, sorrindo.",
  ]),
  fromText("pd-g3-leitura", mc("pd-g3-a1", "“Ela andou, andou, andou.” O que a repetição mostra?", "Toque na resposta certa",
    "Que ela andou por muito tempo", ["Que ela correu rápido", "Que ela ficou parada", "Que ela dormiu"], "medium")),
  fromText("pd-g3-leitura", mc("pd-g3-a2", "O que o ponto de exclamação mostra em “Ah! Que lindo!”?", "Toque na resposta certa",
    "Surpresa e alegria", ["Sono", "Dúvida", "Tristeza"])),
  fromText("pd-g3-leitura", mc("pd-g3-a3", "Que sinal aparece na pergunta da ave: “Para onde você vai__”?", "Toque no sinal certo",
    "?", ["!", ".", ","])),
  fromText("pd-g3-leitura", order("pd-g3-a4", "Coloque na ordem do que aconteceu com Bia", [
    "Bia começou a andar.",
    "Passaram muitos dias.",
    "Ela viu uma luz brilhando ao longe.",
    "O irmão apareceu, sorrindo.",
  ])),
  fromText("pd-g3-leitura", mc("pd-g3-a5", "Qual expressão do texto mostra que passou muito tempo?", "Toque na resposta certa",
    "Muitos meses depois", ["Agora mesmo", "Neste instante", "Num piscar de olhos"], "medium")),
  fromText("pd-g3-leitura", mc("pd-g3-a6", "“Ela moveu mundos e fundos para chegar.” Isso quer dizer que ela...",
    "Toque na resposta certa",
    "Fez de tudo, com muito esforço",
    ["Mudou os móveis da casa", "Viajou de avião", "Brincou de esconde-esconde"], "hard")),
  fromText("pd-g3-leitura", mc("pd-g3-a7", "Quando Bia “caiu em si”, ela...", "Toque na resposta certa",
    "Percebeu que tinha esquecido a lanterna", ["Caiu no chão", "Ficou com sono", "Começou a dormir"], "hard")),
  match("pd-g3-a8", "Ligue cada bicho ao seu som", [
    ["🐶 Cachorro", "Au au"],
    ["🐱 Gato", "Miau"],
    ["🐮 Vaca", "Muuu"],
  ]),
  fromText("pd-g3-leitura", mc("pd-g3-a9", "Bia diz “Que lindo!”. Qual palavra tem o mesmo sentido de lindo?", "Toque na resposta certa",
    "Bonito", ["Feio", "Pequeno", "Frio"])),
  fromText("pd-g3-leitura", mc("pd-g3-a10", "Quem Bia queria salvar?", "Toque na resposta certa",
    "O irmão", ["A ave", "A mãe", "A montanha"])),
];

// Grupo 4 — Falar com gestos, imagens e palavras (linguagem verbal e não verbal)
const g4Activities: Activity[] = [
  mc("pd-g4-a1", "Qual destas formas de comunicar usa PALAVRAS?", "Toque na resposta certa",
    "Uma carta", ["Um abraço", "Um sorriso", "Uma dança"]),
  mc("pd-g4-a2", "Qual destas formas de comunicar NÃO usa palavras?", "Toque na resposta certa",
    "Um aceno de mão 👋", ["Um bilhete", "Um livro", "Uma mensagem escrita"]),
  mc("pd-g4-a3", "Há muito, muito tempo, as pessoas desenhavam nas paredes das cavernas para...",
    "Toque na resposta certa",
    "Contar e guardar o que viam",
    ["Fazer a lição de casa", "Mandar e-mails", "Jogar videogame"], "medium"),
  mc("pd-g4-a4", "Uma história em quadrinhos usa...", "Toque na resposta certa",
    "Desenhos e palavras juntos", ["Só palavras", "Só desenhos", "Só sons"]),
  read("pd-g4-leitura1", "A girafa na parede (tirinha)", [
    "Quadrinho 1: Um menino desenhou uma girafa roxa na parede da sala.",
    "Quadrinho 2: A mãe chega, de braços cruzados, e pergunta: — O que é isso na parede?",
    "Quadrinho 3: O menino sorri e responde: — Uma girafa! A mãe faz cara de brava.",
  ]),
  fromText("pd-g4-leitura1", mc("pd-g4-a5", "O que o menino desenhou na parede?", "Toque na resposta certa",
    "Uma girafa roxa", ["Um gato azul", "Uma casa", "Um sol amarelo"])),
  fromText("pd-g4-leitura1", mc("pd-g4-a6", "Por que a mãe perguntou: “O que é isso na parede?”", "Pense no que a mãe queria dizer",
    "Para mostrar que ele não podia desenhar ali",
    ["Para saber o nome do desenho", "Para comprar o desenho", "Para aprender a desenhar"], "hard")),
  mc("pd-g4-a7", "No jogo da “língua do pê”, colocamos PÊ antes de cada sílaba. Como fica LUA (LU-A)?",
    "Toque na resposta certa",
    "pêlu pêa", ["lupê apê", "pêlua", "pêpêlu"], "hard"),
  read("pd-g4-leitura2", "Cartaz: Oficina de contar histórias", [
    "OFICINA DE CONTAR HISTÓRIAS",
    "Para crianças de 6 a 9 anos.",
    "Todos os sábados, às 10 horas.",
    "Inscrições na biblioteca da cidade.",
  ]),
  fromText("pd-g4-leitura2", mc("pd-g4-a8", "Para quem é a oficina?", "Leia o cartaz e escolha",
    "Para crianças de 6 a 9 anos", ["Só para adultos", "Para bebês", "Para animais"])),
  fromText("pd-g4-leitura2", mc("pd-g4-a9", "Em que dia acontece a oficina?", "Leia o cartaz e escolha",
    "Aos sábados", ["Aos domingos", "Às segundas", "Todos os dias"])),
  fromText("pd-g4-leitura2", mc("pd-g4-a10", "Onde é preciso fazer a inscrição?", "Leia o cartaz e escolha",
    "Na biblioteca da cidade", ["No mercado", "Na praia", "No cinema"])),
];

// Grupo 5 — A hora da história (oralidade, podcast, leitura expressiva)
const g5Activities: Activity[] = [
  mc("pd-g5-a1", "Podcast é um arquivo de áudio que a gente...", "Toque na resposta certa",
    "Escuta no celular ou no computador",
    ["Come no almoço", "Veste de manhã", "Planta no jardim"]),
  mc("pd-g5-a2", "Quando alguém conta uma história, a voz pode mudar para...", "Toque na resposta certa",
    "Mostrar os sentimentos dos personagens",
    ["Fazer a história acabar", "Esconder o final", "Apagar a luz"], "medium"),
  mc("pd-g5-a3", "Que sons deixam uma história de suspense mais emocionante?", "Toque na resposta certa",
    "Música e barulhos misteriosos",
    ["Buzina de festa", "Aplausos", "Risadas altas"]),
  match("pd-g5-a4", "Ligue o som à cena", [
    ["🔔 Sino", "O castelo acordou"],
    ["🌧️ Chuva", "Dia de tempestade"],
    ["🐺 Uivo", "Lobo na floresta"],
  ]),
  mc("pd-g5-a5", "Como devemos ler “Cuidado!” em voz alta?", "Toque na resposta certa",
    "Com voz forte e atenta",
    ["Bem baixinho e sem vontade", "Rindo muito", "Sem abrir a boca"]),
  mc("pd-g5-a6", "O que ajuda a ler uma história para os amigos?", "Toque na resposta certa",
    "Fazer pausas e mudar a voz de cada personagem",
    ["Ler bem rápido", "Ler sem olhar o texto", "Ler só uma palavra"], "medium"),
  tf("pd-g5-a7", "Quando um amigo conta uma história, devemos escutar e esperar nossa vez de falar.", true),
  order("pd-g5-a8", "O que fazer para contar uma história? Coloque na ordem", [
    "Escolher a história",
    "Treinar a leitura",
    "Contar para os amigos",
    "Receber os aplausos",
  ]),
  mc("pd-g5-a9", "Se o narrador fala bem baixinho, o que pode acontecer?", "Toque na resposta certa",
    "Os ouvintes podem não entender a história",
    ["A história fica mais curta", "Os ouvintes viram personagens", "O livro muda de cor"], "medium"),
  mc("pd-g5-a10", "Quem conta histórias é chamado de...", "Toque na resposta certa",
    "Contador de histórias", ["Cozinheiro", "Motorista", "Jardineiro"]),
];

// ---------------------------------------------------------------------------
// CAPÍTULO 2 — DEPOIS DO FINAL FELIZ
// ---------------------------------------------------------------------------

// Grupo 6 — E foram felizes... quase! (paródia de conto)
const g6Activities: Activity[] = [
  mc("pd-g6-a1", "Quem desenha as imagens de um livro?", "Toque na resposta certa",
    "O ilustrador", ["O leitor", "O pedreiro", "O cantor"]),
  mc("pd-g6-a2", "Quem escreve a história de um livro?", "Toque na resposta certa",
    "O autor", ["O leitor", "O padeiro", "O motorista"]),
  read("pd-g6-leitura", "Felizes... quase sempre", [
    "Depois do casamento, o príncipe Leo e a princesa Mel viveram felizes para sempre. Todos os dias eles brincavam, passeavam de carruagem e comiam doces.",
    "Um dia, perceberam algo estranho: estavam entediados! Nada mais tinha graça.",
    "— A gente precisa de uma aventura! — disse Mel.",
    "Então Leo mandou um e-mail para todos os personagens dos contos: — Quem quer fazer uma reunião no castelo?",
    "Vieram a Branca de Neve, o Lobo Mau e os Três Porquinhos. Todos disseram que também estavam entediados.",
    "Decidiram inventar uma gincana. Foi uma bagunça muito divertida, uma verdadeira balbúrdia!",
    "E assim ficaram felizes... quase sempre, porque de vez em quando precisavam de uma aventura.",
  ]),
  fromText("pd-g6-leitura", mc("pd-g6-a3", "Depois de muito tempo felizes, como o príncipe e a princesa se sentiram?", "Toque na resposta certa",
    "Entediados", ["Com medo", "Com fome", "Com frio"], "medium")),
  fromText("pd-g6-leitura", mc("pd-g6-a4", "Quem disse: “A gente precisa de uma aventura!”?", "Toque na resposta certa",
    "A princesa Mel", ["O príncipe Leo", "O Lobo Mau", "A Branca de Neve"])),
  fromText("pd-g6-leitura", mc("pd-g6-a5", "Como o príncipe chamou os outros personagens?", "Toque na resposta certa",
    "Mandou um e-mail", ["Mandou uma carta de papel", "Tocou um sino", "Bateu na porta de cada um"], "medium")),
  fromText("pd-g6-leitura", match("pd-g6-a6", "Ligue cada personagem ao que ele fez no texto", [
    ["👸 Mel", "Pediu uma aventura"],
    ["🤴 Leo", "Mandou o e-mail"],
    ["🐺 Lobo Mau", "Veio à reunião"],
  ], "medium")),
  fromText("pd-g6-leitura", mc("pd-g6-a7", "O que eles inventaram para se divertir?", "Toque na resposta certa",
    "Uma gincana", ["Uma viagem à Lua", "Uma prova de matemática", "Um jantar de gala"])),
  fromText("pd-g6-leitura", mc("pd-g6-a8", "No texto, “balbúrdia” quer dizer...", "Toque na resposta certa",
    "Bagunça", ["Silêncio", "Sopa", "Música suave"], "hard")),
  fromText("pd-g6-leitura", mc("pd-g6-a9", "Como a história termina?", "Toque na resposta certa",
    "Felizes... quase sempre", ["Tristes para sempre", "Eles se mudaram", "O castelo sumiu"], "medium")),
  mc("pd-g6-a10", "Uma história que “brinca” com outra, mudando algumas coisas, se chama:", "Toque na resposta certa",
    "Paródia", ["Receita", "Bilhete", "Lista de compras"], "hard"),
];

// Grupo 7 — Brincando com as palavras
const g7Activities: Activity[] = [
  mc("pd-g7-a1", "Qual é o diminutivo de “casa”?", "Toque na resposta certa",
    "Casinha", ["Casarão", "Casal", "Casaca"]),
  mc("pd-g7-a2", "“Bolinha” é uma bola...", "Toque na resposta certa",
    "Pequena", ["Gigante", "Quebrada", "Azul"]),
  match("pd-g7-a3", "Ligue a palavra ao seu diminutivo", [
    ["Gato", "Gatinho"],
    ["Flor", "Florzinha"],
    ["Pé", "Pezinho"],
  ]),
  mc("pd-g7-a4", "Qual é o aumentativo de “bola”?", "Toque na resposta certa",
    "Bolão", ["Bolinha", "Bolo", "Bolsa"], "medium"),
  mc("pd-g7-a5", "Qual palavra é o contrário de “feliz”?", "Toque na resposta certa",
    "Infeliz", ["Alegre", "Contente", "Risonho"]),
  match("pd-g7-a6", "Ligue cada palavra ao seu contrário", [
    ["Fazer", "Desfazer"],
    ["Possível", "Impossível"],
    ["Feliz", "Infeliz"],
  ], "medium"),
  mc("pd-g7-a7", "“Entediado” é quem...", "Toque na resposta certa",
    "Está com tédio", ["Está com fome", "Está com frio", "Está com sede"], "medium"),
  mc("pd-g7-a8", "“Balbúrdia” quer dizer...", "Toque na resposta certa",
    "Bagunça", ["Silêncio", "Sopa", "Música suave"], "hard"),
  mc("pd-g7-a9", "“Inquieto” quer dizer...", "Toque na resposta certa",
    "Agitado", ["Quietinho", "Dormindo", "Distante"], "medium"),
  mc("pd-g7-a10", "Se alguém diz “esperei, esperei, esperei...”, como foi a espera?", "Toque na resposta certa",
    "Muito longa", ["Bem rápida", "Nem existiu", "Durou um segundo"], "medium"),
];

// Grupo 8 — Cada um fala do seu jeito (variedades da língua)
const g8Activities: Activity[] = [
  mc("pd-g8-a1", "Em alguns lugares, a mandioca se chama macaxeira. Isso mostra que...", "Toque na resposta certa",
    "Cada lugar pode ter nomes diferentes para a mesma coisa",
    ["Só um nome é permitido", "A mandioca muda de cor", "Ninguém se entende"], "medium"),
  match("pd-g8-a2", "Cada lugar tem seu jeito de falar! Ligue as palavras que significam a mesma coisa", [
    ["Pandorga", "🪁 Pipa"],
    ["Bergamota", "🍊 Tangerina"],
    ["Aipim", "Mandioca"],
  ], "medium"),
  match("pd-g8-a3", "No Brasil e em Portugal, algumas palavras são diferentes. Ligue as palavras", [
    ["🚌 Ônibus (Brasil)", "Autocarro (Portugal)"],
    ["🍦 Sorvete (Brasil)", "Gelado (Portugal)"],
    ["📱 Celular (Brasil)", "Telemóvel (Portugal)"],
  ], "medium"),
  mc("pd-g8-a4", "A Chapeuzinho Vermelho do Brasil se chama Capuchinho Vermelho em Portugal. Por quê?",
    "Toque na resposta certa",
    "Porque os dois países usam algumas palavras diferentes",
    ["Porque são duas histórias totalmente diferentes", "Porque o lobo mudou", "Porque o livro encolheu"], "medium"),
  mc("pd-g8-a5", "No dia a dia, muita gente diz “pra”. Qual é a forma completa dessa palavra?", "Toque na resposta certa",
    "Para", ["Paro", "Pare", "Parada"]),
  mc("pd-g8-a6", "Quando um vídeo é visto por muita, muita gente, dizemos que ele...", "Toque na resposta certa",
    "Viralizou", ["Evaporou", "Congelou", "Dormiu"], "hard"),
  mc("pd-g8-a7", "Com a diretora da escola, qual jeito de falar combina mais?", "Toque na resposta certa",
    "Bom dia! Posso entrar, por favor?",
    ["E aí, beleza? Vou entrando!", "Ô, abre aí!", "Fala logo, tô com pressa!"], "medium"),
  mc("pd-g8-a8", "Falar de modo mais sério ou mais descontraído depende de...", "Toque na resposta certa",
    "Com quem e onde estamos falando",
    ["Da cor da roupa", "Do dia da semana", "Do tamanho do sapato"], "hard"),
  tf("pd-g8-a9", "Pessoas surdas podem conversar usando a língua de sinais, com as mãos.", true),
  mc("pd-g8-a10", "Se um colega fala de um jeito diferente do seu, o que é bom fazer?", "Toque na resposta certa",
    "Respeitar e escutar com atenção",
    ["Rir dele", "Imitar para zombar", "Pedir que fique calado"]),
];

// Grupo 9 — Letras e sons (fonema e letra, sílabas)
const g9Activities: Activity[] = [
  mc("pd-g9-a1", "Quantas letras tem a palavra PATO?", "Conte as letras",
    "4", ["3", "5", "6"]),
  mc("pd-g9-a2", "Quantas sílabas tem a palavra BOLA? (BO-LA)", "Bata palmas e conte",
    "2", ["1", "3", "4"]),
  mc("pd-g9-a3", "Bata palmas: BOR-BO-LE-TA 🦋 Quantas sílabas tem a palavra?", "Conte as palmas",
    "4", ["2", "3", "5"], "medium"),
  order("pd-g9-a4", "Organize as sílabas para formar SAPATO 👟", ["SA", "PA", "TO"]),
  mc("pd-g9-a5", "Qual palavra começa com o mesmo som de BOLA?", "Escute o som do começo",
    "BALDE", ["CASA", "DADO", "FOGO"]),
  mc("pd-g9-a6", "Qual palavra rima com CHAPÉU?", "Escute o final das palavras",
    "CÉU", ["BOLA", "SAPO", "LIVRO"], "medium"),
  mc("pd-g9-a7", "Na palavra CASA, a letra S faz som de...", "Escute com atenção",
    "Z", ["T", "P", "M"], "medium"),
  mc("pd-g9-a8", "Se trocarmos a primeira letra de GATO por P, que palavra aparece?", "Troque a letra",
    "PATO", ["RATO", "BOLO", "SAPO"], "medium"),
  match("pd-g9-a9", "Ligue cada par de letras à palavra certa", [
    ["CH", "🔑 Chave"],
    ["LH", "🐝 Abelha"],
    ["NH", "🐔 Galinha"],
  ], "medium"),
  tf("pd-g9-a10", "Uma palavra com mais letras sempre tem mais sílabas.", false, "hard"),
];

// ---------------------------------------------------------------------------
// CAPÍTULO 3 — FÁBULAS EM CENA! (parte inicial, até a página 68 do livro)
// ---------------------------------------------------------------------------

// Grupo 10 — Fábulas em cena (texto teatral)
const g10Activities: Activity[] = [
  mc("pd-g10-a1", "O que é uma fábula?", "Toque na resposta certa",
    "Uma história curta, com animais que falam e uma lição",
    ["Uma lista de compras", "Uma notícia de jornal", "Uma receita de bolo"]),
  mc("pd-g10-a2", "Em uma peça de teatro, quem dá vida aos personagens?", "Toque na resposta certa",
    "Os atores", ["Os ingressos", "As cadeiras", "As luzes"]),
  mc("pd-g10-a3", "Onde os atores se apresentam?", "Toque na resposta certa",
    "No palco", ["Na cozinha", "Na piscina", "No elevador"]),
  read("pd-g10-leitura", "A cigarra e a formiga (peça de teatro)", [
    "PERSONAGENS: Cigarra e Formiga.",
    "(Cenário: um jardim. A Formiga carrega folhas nas costas.)",
    "CIGARRA: (cantando) Que dia lindo para cantar!",
    "FORMIGA: Boa tarde, Cigarra! Estou guardando comida para o inverno.",
    "CIGARRA: (rindo) Inverno? Está tão longe! Vou cantar mais um pouquinho.",
    "(A luz fica fraca. O vento sopra. Chegou o inverno.)",
    "CIGARRA: (tremendo) Estou com frio e com fome...",
    "FORMIGA: (generosa) Entre, Cigarra. Eu divido a minha comida com você. Mas, no ano que vem, vamos nos preparar juntas.",
  ]),
  fromText("pd-g10-leitura", mc("pd-g10-a4", "No texto, quem diz: “Estou guardando comida para o inverno”?", "Leia e escolha",
    "A Formiga", ["A Cigarra", "O leitor", "O diretor"])),
  fromText("pd-g10-leitura", mc("pd-g10-a5", "As indicações entre parênteses, como (cantando) e (tremendo), servem para...",
    "Toque na resposta certa",
    "Dizer ao ator como falar ou o que fazer no palco",
    ["Enfeitar o texto", "Mostrar as notas da prova", "Contar piadas"], "medium")),
  fromText("pd-g10-leitura", mc("pd-g10-a6", "Onde acontece a peça?", "Toque na resposta certa",
    "Em um jardim", ["Em uma escola", "No fundo do mar", "Em um castelo"])),
  fromText("pd-g10-leitura", mc("pd-g10-a7", "Por que a Cigarra ficou com frio e com fome?", "Toque na resposta certa",
    "Porque só cantou e não guardou comida",
    ["Porque a Formiga pegou a comida dela", "Porque ficou doente", "Porque se perdeu"], "medium")),
  fromText("pd-g10-leitura", mc("pd-g10-a8", "O que a Formiga fez no final?", "Toque na resposta certa",
    "Dividiu a comida com a Cigarra", ["Mandou a Cigarra embora", "Escondeu a comida", "Foi dormir"])),
  fromText("pd-g10-leitura", mc("pd-g10-a9", "Qual é a lição (a moral) dessa fábula?", "Toque na resposta certa",
    "Devemos nos preparar e ajudar os outros",
    ["Cantar é proibido", "Só a formiga tem razão", "É melhor não trabalhar nunca"], "medium")),
  match("pd-g10-a10", "Ligue cada profissional do teatro ao que ele faz", [
    ["🎭 Ator", "Interpreta o personagem"],
    ["💡 Iluminador", "Cuida das luzes"],
    ["👗 Figurinista", "Prepara as roupas"],
  ], "medium"),
];

// Grupo 11 — A raposa esperta (fábula, moral e convivência)
const g11Activities: Activity[] = [
  read("pd-g11-leitura", "O leão doente (fábula)", [
    "Um leão muito velho ficou doente. Ele chamou todos os animais da floresta para visitá-lo e trazer remédios e conselhos.",
    "A coelha levou chá. O macaco deu conselhos. Só a raposa não apareceu.",
    "O lobo, que não gostava da raposa, fez fofoca: — Majestade, a raposa não veio porque nem liga para o senhor!",
    "O leão ficou furioso e mandou chamar a raposa.",
    "A raposa chegou e fez uma reverência: — Perdão, Vossa Majestade! Fui bem longe buscar uma erva rara, a única que pode curar o senhor.",
    "Ela preparou o chá e o leão melhorou. Então a raposa disse: — O lobo ficou aqui e só fez fofoca. Eu fui ajudar.",
    "O leão entendeu quem era amigo de verdade e mandou o lobo pedir desculpas.",
  ]),
  fromText("pd-g11-leitura", mc("pd-g11-a1", "Por que o leão chamou os animais?", "Toque na resposta certa",
    "Estava doente e queria remédios e conselhos",
    ["Queria dar uma festa", "Queria ensinar a nadar", "Queria vender flores"], "medium")),
  fromText("pd-g11-leitura", mc("pd-g11-a2", "O que a coelha levou para o leão?", "Toque na resposta certa",
    "Chá", ["Flores", "Um bolo", "Uma coroa"])),
  fromText("pd-g11-leitura", mc("pd-g11-a3", "O que o lobo fez contra a raposa?", "Toque na resposta certa",
    "Fofoca", ["Um presente", "Uma música", "Um jogo"], "medium")),
  fromText("pd-g11-leitura", mc("pd-g11-a4", "Os animais chamam o leão de “Vossa Majestade”. Isso mostra...", "Toque na resposta certa",
    "Respeito", ["Raiva", "Sono", "Pressa"], "medium")),
  fromText("pd-g11-leitura", match("pd-g11-a5", "Ligue cada animal ao que ele fez", [
    ["🐰 Coelha", "Levou chá para o rei"],
    ["🐒 Macaco", "Deu conselhos ao rei"],
    ["🦊 Raposa", "Buscou uma erva rara"],
  ], "medium")),
  fromText("pd-g11-leitura", mc("pd-g11-a6", "Por que a raposa não tinha ido visitar o leão antes?", "Toque na resposta certa",
    "Estava longe, buscando uma erva rara", ["Estava dormindo", "Não gostava do leão", "Tinha esquecido"], "medium")),
  fromText("pd-g11-leitura", mc("pd-g11-a7", "A raposa é esperta. Por quê?", "Toque na resposta certa",
    "Ela usou a inteligência para mostrar a verdade", ["Ela correu mais rápido", "Ela gritou mais alto", "Ela se escondeu"], "hard")),
  fromText("pd-g11-leitura", mc("pd-g11-a8", "Qual é uma boa lição para essa fábula?", "Toque na resposta certa",
    "Não devemos fazer fofoca nem maldade",
    ["Fofoca é divertida", "Devemos sempre mentir", "Só os fortes têm razão"], "medium")),
  mc("pd-g11-a9", "Se você tem um problema com um amigo, o melhor é...", "Toque na resposta certa",
    "Conversar com calma e ouvir o outro",
    ["Fazer vingança", "Brigar sem escutar", "Contar mentira"]),
  tf("pd-g11-a10", "Nas fábulas, os animais agem como se fossem gente.", true),
];

// ---------------------------------------------------------------------------
// Grupos
// ---------------------------------------------------------------------------

// Os vídeos destes grupos ainda não foram gravados: por enquanto usam o vídeo
// do Grupo 1 como substituto. Troque os caminhos quando os novos vídeos existirem.
const PLACEHOLDER_VIDEO = "/videos/alfabetizacao-grupo-1.mp4";

const grupo = (
  num: number,
  title: string,
  videoObjective: string,
  videoScript: string,
  videoThumbnail: string,
  activities: Activity[]
): LessonGroup => ({
  id: `pd-g${num}`,
  index: num - 1,
  title,
  videoTitle: title,
  videoObjective,
  videoScript,
  videoDurationLabel: "3 min",
  videoUrl: PLACEHOLDER_VIDEO,
  videoThumbnail,
  groupCoinsBonus: 10,
  activities,
});

const IMG_LIVRO = "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800";
const IMG_LETRAS = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800";
const IMG_FLORESTA = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800";
const IMG_CRIANCAS = "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800";

export const portuguesDivertidoGrupos: LessonGroup[] = [
  grupo(1, "Era Uma Vez...",
    "Como começa e termina um conto de fadas: tempo, lugar, problema e final feliz.",
    "Lili abre um livro encantado e entra no reino das histórias, onde descobre como os contos começam, o que atrapalha os personagens e como terminam.",
    IMG_LIVRO, g1Activities),
  grupo(2, "Heróis, Vilões e Sentimentos",
    "Personagens principais, vilões, ajudantes e os sentimentos que sentem.",
    "Lili encontra fadas, bruxas e heróis e aprende que todo personagem sente alegria, raiva, medo e tristeza.",
    IMG_LIVRO, g2Activities),
  grupo(3, "Palavras que Fazem Mágica",
    "Repetições, sinais de pontuação, expressões de tempo e sentidos das palavras.",
    "Lili descobre que um ponto de exclamação pode virar susto e que “andou, andou, andou” faz a viagem parecer bem longa.",
    IMG_LETRAS, g3Activities),
  grupo(4, "Gestos, Imagens e Palavras",
    "Linguagem com e sem palavras, quadrinhos, desenhos e cartazes.",
    "Lili viaja pelo mundo da comunicação: da pintura nas cavernas aos cartazes de hoje.",
    IMG_CRIANCAS, g4Activities),
  grupo(5, "A Hora da História",
    "Escuta e leitura em voz alta, podcast e sons que dão vida às histórias.",
    "Lili monta um estúdio de podcast para contar histórias com voz, pausas e efeitos sonoros.",
    IMG_CRIANCAS, g5Activities),
  grupo(6, "E Foram Felizes... Quase!",
    "Livro, autor e ilustrador; paródia de conto de fadas e o que vem depois do final feliz.",
    "Depois do “felizes para sempre”, o príncipe e a princesa ficam entediados. Lili ajuda a turma a inventar uma solução.",
    IMG_LIVRO, g6Activities),
  grupo(7, "Brincando com as Palavras",
    "Diminutivo e aumentativo, palavras opostas e vocabulário novo.",
    "Lili entra na fábrica de palavras, onde tudo pode ficar grandão, pequenininho ou do contrário.",
    IMG_LETRAS, g7Activities),
  grupo(8, "Cada Um Fala do Seu Jeito",
    "Variedades da língua: regiões, Brasil e Portugal, jeito formal e informal, respeito.",
    "Lili viaja de pandorga por vários lugares e descobre que uma mesma coisa pode ter muitos nomes.",
    IMG_CRIANCAS, g8Activities),
  grupo(9, "Letras e Sons",
    "Letras, sons, sílabas, rimas e pares de letras como CH, LH e NH.",
    "Lili brinca de escutar os sons das palavras e de bater palmas para cada sílaba.",
    IMG_LETRAS, g9Activities),
  grupo(10, "Fábulas em Cena!",
    "O que é uma fábula, como é um texto de teatro e quem trabalha em uma peça.",
    "Os bichos da floresta montam uma peça de teatro e Lili descobre quem faz o quê nos bastidores.",
    IMG_FLORESTA, g10Activities),
  grupo(11, "A Raposa Esperta",
    "Fábula com lição de vida: esperteza, fofoca, respeito e conversa para resolver problemas.",
    "No reino do leão doente, uma raposa esperta mostra a verdade, e Lili conversa com a turma sobre a lição da história.",
    IMG_FLORESTA, g11Activities),
];
