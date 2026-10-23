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

// ---------------------------------------------------------------------------
// CAPÍTULO 1 — ERA UMA VEZ
// ---------------------------------------------------------------------------

// Grupo 1 — Como é um conto de fadas
const g1Activities: Activity[] = [
  mc("pd-g1-a1", "Muitas histórias de fadas começam com a frase:", "Toque na resposta certa",
    "Era uma vez...", ["Fim de papo!", "Tchau, pessoal!", "Quem quer pipoca?"]),
  mc("pd-g1-a2", "Em “Era uma vez...”, a história acontece em um tempo...", "Toque na resposta certa",
    "Bem antigo, sem data certa", ["Hoje de manhã", "Ontem à noite", "Daqui a dez anos"], "medium"),
  tf("pd-g1-a3", "Um conto de fadas conta uma história inventada.", true),
  mc("pd-g1-a4", "Onde costumam acontecer os contos de fadas?", "Toque na resposta certa",
    "Em castelos, florestas e reinos distantes",
    ["Dentro de uma loja de sapatos", "Em um estacionamento", "Na fila do banco"]),
  order("pd-g1-a5", "Coloque a história na ordem certa", [
    "Era uma vez uma menina que morava na floresta.",
    "Um dia, ela perdeu seu gatinho mágico.",
    "Ela procurou por toda parte e o encontrou.",
    "E todos ficaram felizes.",
  ]),
  mc("pd-g1-a6", "Quando uma história tem um PROBLEMA, o que acontece depois?", "Toque na resposta certa",
    "Os personagens tentam resolvê-lo",
    ["A história acaba na hora", "Todos esquecem a história", "O livro desaparece"], "medium"),
  match("pd-g1-a7", "Ligue cada parte da história ao que ela faz", [
    ["Começo", "Mostra os personagens e o lugar"],
    ["Problema", "Acontece algo que dá errado"],
    ["Final", "Tudo se resolve"],
  ], "medium"),
  mc("pd-g1-a8", "Qual destes é um problema de conto de fadas?", "Toque na resposta certa",
    "Uma bruxa enfeitiça o castelo",
    ["O rei toma suco", "A princesa pinta um quadro", "O cavalo come grama"], "medium"),
  mc("pd-g1-a9", "O que quer dizer “E foram felizes para sempre”?", "Toque na resposta certa",
    "Que a história termina bem",
    ["Que a história está só no começo", "Que todos ficaram tristes", "Que o livro se perdeu"]),
  tf("pd-g1-a10", "Nos contos de fadas, a magia pode transformar pessoas e bichos.", true),
];

// Grupo 2 — Heróis, vilões e sentimentos
const g2Activities: Activity[] = [
  mc("pd-g2-a1", "Quem é o personagem PRINCIPAL de uma história?", "Toque na resposta certa",
    "Aquele que vive as maiores aventuras",
    ["Aquele que aparece só uma vez", "Aquele que escreve o livro", "Aquele que vende ingressos"], "medium"),
  mc("pd-g2-a2", "Quem costuma atrapalhar o herói na história?", "Toque na resposta certa",
    "O vilão", ["O ajudante", "O amigo", "O narrador"]),
  match("pd-g2-a3", "Ligue cada personagem ao que ele faz", [
    ["🦸 Herói", "Vence os desafios"],
    ["🧙 Bruxa má", "Faz o feitiço"],
    ["🧚 Fada madrinha", "Ajuda o herói"],
  ]),
  mc("pd-g2-a4",
    "Uma menina corajosa saiu pelo mundo para salvar seus irmãos, que tinham sido enfeitiçados. 🧙 Quem é a heroína?",
    "Leia e escolha",
    "A menina corajosa", ["O feitiço", "A estrada", "O sol"], "medium"),
  mc("pd-g2-a5", "Quando estamos com raiva, o que é bom fazer ANTES de falar?", "Toque na resposta certa",
    "Respirar fundo e pensar",
    ["Gritar bem alto", "Falar a primeira coisa que vier à cabeça", "Bater a porta"], "medium"),
  mc("pd-g2-a6", "Quando alguém erra e fica chateado, o que é bom fazer?", "Toque na resposta certa",
    "Pedir desculpas e tentar consertar",
    ["Culpar os outros", "Fingir que nada aconteceu", "Se esconder para sempre"]),
  mc("pd-g2-a7", "Uma menina arregala os olhos e abre a boca. 😲 Como ela se sente?", "Olhe a carinha e escolha",
    "Surpresa", ["Com sono", "Com sede", "Com frio"]),
  match("pd-g2-a8", "Ligue a carinha ao sentimento", [
    ["😠", "Raiva"],
    ["😢", "Tristeza"],
    ["😄", "Alegria"],
  ]),
  mc("pd-g2-a9", "Uma mãe e uma filha brigaram, mas fizeram as pazes com um abraço. 🤗 O que isso ensina?",
    "Toque na resposta certa",
    "Conversar e perdoar ajuda a família",
    ["Brigar é sempre melhor", "Nunca devemos abraçar", "É melhor ficar sozinho"], "medium"),
  tf("pd-g2-a10", "Irmãos devem cuidar uns dos outros.", true),
];

// Grupo 3 — Palavras que fazem mágica (linguagem do texto)
const g3Activities: Activity[] = [
  mc("pd-g3-a1", "“Ele andou, andou, andou.” O que a repetição mostra?", "Toque na resposta certa",
    "Que ele andou por muito tempo",
    ["Que ele correu rápido", "Que ele ficou parado", "Que ele dormiu"], "medium"),
  mc("pd-g3-a2", "Que sinal mostra susto ou surpresa? “Olha o dragão__”", "Toque no sinal certo",
    "!", ["?", ",", "."]),
  mc("pd-g3-a3", "Que sinal usamos para fazer uma pergunta?", "Toque no sinal certo",
    "?", ["!", ".", ","]),
  order("pd-g3-a4", "Coloque na ordem do tempo", [
    "De manhã, a fada acordou.",
    "À tarde, ela voou até o castelo.",
    "À noite, ela dormiu feliz.",
  ]),
  mc("pd-g3-a5", "Qual expressão mostra que passou muito tempo?", "Toque na resposta certa",
    "Muitos anos depois", ["Agora mesmo", "Neste instante", "Num piscar de olhos"], "medium"),
  mc("pd-g3-a6", "“Ela moveu mundos e fundos para ajudar os irmãos.” Isso quer dizer que ela...",
    "Toque na resposta certa",
    "Fez de tudo, com muito esforço",
    ["Mudou os móveis da casa", "Viajou de avião", "Brincou de esconde-esconde"], "hard"),
  mc("pd-g3-a7", "Quando alguém “cai em si”, ele...", "Toque na resposta certa",
    "Percebe o que fez", ["Cai no chão", "Fica com sono", "Dorme"], "hard"),
  match("pd-g3-a8", "Ligue cada bicho ao seu som", [
    ["🐶 Cachorro", "Au au"],
    ["🐱 Gato", "Miau"],
    ["🐮 Vaca", "Muuu"],
  ]),
  mc("pd-g3-a9", "Qual palavra tem o mesmo sentido de “bonita”?", "Toque na resposta certa",
    "Linda", ["Feia", "Pequena", "Fria"]),
  mc("pd-g3-a10", "“A sala estava gelada.” Gelada quer dizer:", "Toque na resposta certa",
    "Muito fria", ["Muito quente", "Muito escura", "Muito barulhenta"]),
];

// Grupo 4 — Falar com gestos, imagens e palavras (linguagem verbal e não verbal)
const g4Activities: Activity[] = [
  mc("pd-g4-a1", "Qual destas formas de comunicar usa PALAVRAS?", "Toque na resposta certa",
    "Uma carta", ["Um abraço", "Um sorriso", "Uma dança"]),
  mc("pd-g4-a2", "Qual destas formas de comunicar NÃO usa palavras?", "Toque na resposta certa",
    "Um aceno de mão 👋", ["Um bilhete", "Um livro", "Uma mensagem escrita"]),
  tf("pd-g4-a3", "Um desenho também pode contar uma história.", true),
  mc("pd-g4-a4", "Há muito, muito tempo, as pessoas desenhavam nas paredes das cavernas para...",
    "Toque na resposta certa",
    "Contar e guardar o que viam",
    ["Fazer a lição de casa", "Mandar e-mails", "Jogar videogame"], "medium"),
  mc("pd-g4-a5", "Uma história em quadrinhos usa...", "Toque na resposta certa",
    "Desenhos e palavras juntos", ["Só palavras", "Só desenhos", "Só sons"]),
  mc("pd-g4-a6",
    "Um menino desenhou um polvo na parede da sala. A mãe perguntou: “O que é isso na parede?” Por que ela perguntou?",
    "Pense no que a mãe queria dizer",
    "Para mostrar que ele não podia desenhar ali",
    ["Para saber o nome do desenho", "Para comprar o desenho", "Para aprender a desenhar"], "hard"),
  mc("pd-g4-a7", "No jogo da “língua do pê”, colocamos PÊ antes de cada sílaba. Como fica LUA (LU-A)?",
    "Toque na resposta certa",
    "pêlu pêa", ["lupê apê", "pêlua", "pêpêlu"], "hard"),
  mc("pd-g4-a8",
    "Um cartaz diz: “Oficina de contar histórias. Crianças de 6 a 9 anos. Sábados, às 10h.” Para quem é a oficina?",
    "Leia o cartaz e escolha",
    "Para crianças de 6 a 9 anos", ["Só para adultos", "Para bebês", "Para animais"]),
  mc("pd-g4-a9",
    "No mesmo cartaz (“Oficina de contar histórias. Crianças de 6 a 9 anos. Sábados, às 10h.”), em que dia acontece?",
    "Leia o cartaz e escolha",
    "Aos sábados", ["Aos domingos", "Às segundas", "Todos os dias"]),
  mc("pd-g4-a10", "Um cartaz diz: “Criança tem direito de brincar e estudar!” O que ele quer ensinar?",
    "Toque na resposta certa",
    "Que as crianças devem brincar e estudar",
    ["Que crianças devem ficar sem escola", "Que brincar é proibido", "Que só adultos têm direitos"], "medium"),
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
  mc("pd-g6-a3", "Um príncipe e uma princesa passeiam de carruagem. 🐴 Quem conduz a carruagem?",
    "Toque na resposta certa",
    "O cocheiro", ["O padeiro", "O professor", "O pescador"], "medium"),
  tf("pd-g6-a4", "Se um livro se chama “Felizes quase sempre”, às vezes os personagens não ficam felizes.", true, "medium"),
  mc("pd-g6-a5", "Uma história que “brinca” com outra, mudando algumas coisas, se chama:", "Toque na resposta certa",
    "Paródia", ["Receita", "Bilhete", "Lista de compras"], "hard"),
  match("pd-g6-a6", "Ligue cada conto a algo que aparece nele", [
    ["🍎 Branca de Neve", "Sete anões"],
    ["👠 Cinderela", "Sapatinho de cristal"],
    ["🐺 Chapeuzinho Vermelho", "Lobo mau"],
  ], "medium"),
  mc("pd-g6-a7", "Um príncipe e uma princesa já brincaram de tudo e agora não sabem mais o que fazer. Como eles se sentem?",
    "Toque na resposta certa",
    "Entediados, com tédio", ["Com medo", "Com fome", "Com frio"], "medium"),
  mc("pd-g6-a8", "Quando estamos entediados, o que podemos fazer?", "Toque na resposta certa",
    "Inventar uma brincadeira nova",
    ["Ficar parado para sempre", "Quebrar os brinquedos", "Reclamar sem parar"]),
  mc("pd-g6-a9", "Na paródia, o príncipe manda um e-mail para chamar os amigos. O e-mail é uma coisa...",
    "Toque na resposta certa",
    "Do mundo de hoje",
    ["Que só existia nos tempos antigos", "Que se come", "Que se veste"], "medium"),
  mc("pd-g6-a10", "Uma “infelicidadezinha” é...", "Toque na resposta certa",
    "Uma tristeza pequenininha", ["Uma grande festa", "Um castelo", "Um prêmio"], "hard"),
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
  mc("pd-g10-a4", "No texto de teatro, a fala vem depois do nome do personagem. Em “COELHA: Que dia lindo!”, quem fala?",
    "Leia e escolha",
    "A coelha", ["O leitor", "O diretor", "O público"]),
  mc("pd-g10-a5", "As indicações entre parênteses no texto de teatro, como “(entra um leão)”, servem para...",
    "Toque na resposta certa",
    "Dizer aos atores o que fazer no palco",
    ["Enfeitar o texto", "Mostrar as notas da prova", "Contar piadas"], "medium"),
  match("pd-g10-a6", "Ligue cada profissional do teatro ao que ele faz", [
    ["🎭 Ator", "Interpreta o personagem"],
    ["💡 Iluminador", "Cuida das luzes"],
    ["👗 Figurinista", "Prepara as roupas"],
  ], "medium"),
  mc("pd-g10-a7", "Na peça, uma avó conta uma fábula para as crianças. Quem conta a fábula?", "Toque na resposta certa",
    "A avó", ["As crianças", "O leão", "O público"], "medium"),
  mc("pd-g10-a8", "Muitas fábulas começam com “Certa vez...”. É parecido com qual começo?", "Toque na resposta certa",
    "Era uma vez...", ["Tchau, pessoal!", "Fim!", "Atenção, passageiros!"]),
  mc("pd-g10-a9", "Qual boneca falante vive no Sítio do Picapau Amarelo?", "Toque na resposta certa",
    "Emília", ["Mônica", "Magali", "Cascão"], "medium"),
  tf("pd-g10-a10", "Em uma peça de teatro, as roupas e o cenário ajudam a contar a história.", true),
];

// Grupo 11 — A raposa esperta (fábula, moral e convivência)
const g11Activities: Activity[] = [
  mc("pd-g11-a1", "Um leão rei ficou doente e pediu que os animais o visitassem. Por que ele fez esse pedido?",
    "Toque na resposta certa",
    "Para receber remédios e conselhos",
    ["Para dar uma festa", "Para ensinar a nadar", "Para vender flores"], "medium"),
  mc("pd-g11-a2", "O lobo contou coisas ruins sobre a raposa só para prejudicá-la. Isso se chama...",
    "Toque na resposta certa",
    "Fofoca", ["Ajuda", "Canção", "Pique-esconde"], "medium"),
  mc("pd-g11-a3", "A raposa é chamada de “astuta”. Isso quer dizer que ela é...", "Toque na resposta certa",
    "Esperta", ["Preguiçosa", "Desastrada", "Assustada"], "medium"),
  mc("pd-g11-a4", "Para falar com um rei, os animais dizem “Vossa Majestade”. Esse é um jeito...",
    "Toque na resposta certa",
    "Respeitoso de falar", ["Engraçado de dormir", "Rápido de correr", "Barulhento de cantar"], "medium"),
  match("pd-g11-a5", "Ligue cada animal ao que ele fez", [
    ["🐰 Coelha", "Levou chá para o rei"],
    ["🐒 Macaco", "Deu conselhos ao rei"],
    ["🦊 Raposa", "Usou a esperteza"],
  ], "medium"),
  mc("pd-g11-a6", "“A raposa chegou. ___ pediu desculpas.” Que palavra completa a frase?", "Toque na resposta certa",
    "Ela", ["Eles", "Nós", "Você"]),
  mc("pd-g11-a7", "Qual é uma boa lição para essa fábula?", "Toque na resposta certa",
    "Não devemos fazer maldade com os outros",
    ["Fofoca é divertida", "Devemos sempre mentir", "Só os fortes têm razão"], "medium"),
  mc("pd-g11-a8", "Se você tem um problema com um amigo, o melhor é...", "Toque na resposta certa",
    "Conversar com calma e ouvir o outro",
    ["Fazer vingança", "Brigar sem escutar", "Contar mentira"]),
  tf("pd-g11-a9", "Nas fábulas, os animais agem como se fossem gente.", true),
  mc("pd-g11-a10", "A “moral da história” é...", "Toque na resposta certa",
    "A lição que a fábula ensina",
    ["O nome do autor", "O primeiro parágrafo", "O preço do livro"]),
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
