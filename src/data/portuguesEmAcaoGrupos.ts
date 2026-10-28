import type { Activity } from "./activities";
import type { LessonGroup } from "./alfabetizacaoGrupos";
import { fromText, IMG_CRIANCAS, IMG_LETRAS, IMG_LIVRO, match, mc, read } from "./portuguesDivertidoGrupos";

// Curso "Português em Ação" (id interno: portugues-em-acao), para 14 anos (9º ano).
// Baseado na Parte 1 do livro "Português Linguagens – 9º ano" (Cereja e Vianna, Saraiva, 2022):
// Unidade 1 "Caiu na rede!" e Capítulo 1 "As fake news e a pós-verdade".
//
// Cada pergunta do livro virou exatamente uma atividade, reescrita com palavras próprias e
// mantida no nível do 9º ano. Perguntas de resposta pessoal viraram escolha entre A, B, C e D.
// Os textos-base foram reescritos; por isso a fonte aparece como "baseado em", e não como cópia.
// Só os dois trechinhos citados no grupo 4 são cópia fiel e levam a fonte completa.

const IMG = "/ilustracoes/portugues9";
const IMG_ABERTURA = `${IMG}/abertura.jpg`;
const IMG_BOLHA = `${IMG}/bolha.jpg`;
const IMG_LUPA = `${IMG}/lupa.jpg`;
const IMG_FIQUE = `${IMG}/fique-ligado.jpg`;
const IMG_ESPALHA = `${IMG}/espalha.jpg`;
const IMG_COMPARTILHA = `${IMG}/compartilhar.jpg`;
const IMG_MAPA = `${IMG}/mapa-baloes.jpg`;

const txt = (readingId: string, ...acts: Activity[]): Activity[] =>
  acts.map((a) => fromText(readingId, a));

const withImage = (a: Activity, imageUrl: string, imageCaption: string): Activity => ({
  ...a,
  imageUrl,
  imageCaption,
});

// ---------------------------------------------------------------------------
// Grupo 1 — Caiu na rede! (abertura da unidade + "Fique ligado!")
// ---------------------------------------------------------------------------
const g1Activities: Activity[] = [
  withImage(
    read(
      "p9-g1-leitura",
      "Caiu na rede!",
      [
        "Olhe com calma a ilustração. Muita gente está junta, mas quase todas as pessoas olham para o celular, de cabeça baixa. No meio delas, um jovem de moletom laranja levanta a cabeça e olha para o alto, com um meio sorriso curioso.",
        "A unidade também traz a ideia de um poema de cordel, do poeta Bráulio Bessa, sobre as redes sociais: nelas o mundo é bem diferente, dá para ter milhões de amigos e, mesmo assim, ainda se sentir sozinho, e existe todo tipo de vida e de gente.",
      ],
      "Ideias do cordel de Bráulio Bessa (Poesia que transforma, Sextante, 2018), contadas com palavras nossas."
    ),
    IMG_ABERTURA,
    "Uma multidão olhando para o celular e um jovem de moletom laranja olhando para cima"
  ),
  ...txt(
    "p9-g1-leitura",
    withImage(
      mc("p9-g1-a1", "Para onde as pessoas da ilustração estão olhando e o que estão fazendo?", "Toque na resposta certa",
        "Estão olhando para o celular, de cabeça baixa, usando as redes.",
        ["Estão olhando para o céu e vendo as estrelas.", "Estão olhando umas para as outras e conversando.", "Estão olhando para um palco e assistindo a um show."]),
      IMG_ABERTURA, "Uma multidão olhando para o celular"),
    withImage(
      mc("p9-g1-a2", "Uma pessoa é diferente das outras. O que a expressão do rosto dela mostra?", "Toque na resposta certa",
        "Curiosidade e alegria: ela levantou a cabeça e percebeu o que está em volta.",
        ["Sono, porque ela está bocejando.", "Raiva, porque quer brigar com alguém.", "Medo, porque ela está perdida."]),
      IMG_ABERTURA, "O jovem de moletom laranja que olha para cima"),
    withImage(
      mc("p9-g1-a3", "Essa cena é um exagero, mas lembra algo que acontece na vida real. O quê?", "Toque na resposta certa",
        "Muita gente fica olhando só para o celular, mesmo perto de outras pessoas.",
        ["Todas as pessoas sempre conversam olhando nos olhos.", "Ninguém usa celular na rua.", "As pessoas passeiam sem olhar para nada."], "medium"),
      IMG_ABERTURA, "Uma multidão olhando para o celular"),
    withImage(
      mc("p9-g1-a4", "Qual é a crítica que a cena faz?", "Toque na resposta certa",
        "O uso do celular pode afastar as pessoas umas das outras e do que está ao redor.",
        ["O celular é sempre ruim e ninguém deveria usá-lo.", "As ruas das cidades estão muito sujas.", "As pessoas andam devagar demais."], "medium"),
      IMG_ABERTURA, "Uma multidão olhando para o celular"),
    withImage(
      mc("p9-g1-a5", "Qual é a relação entre a cena da ilustração e a ideia do cordel de Bráulio Bessa?", "Toque na resposta certa",
        "Os dois falam das redes sociais: há muita gente conectada, mas as pessoas podem ficar distantes umas das outras.",
        ["O cordel fala de futebol e a ilustração mostra um jogo.", "O cordel fala de uma viagem e a ilustração mostra um avião.", "Não há relação: um fala de bichos e a outra de árvores."], "medium"),
      IMG_ABERTURA, "Uma multidão olhando para o celular"),
  ),
  withImage(read(
    "p9-g1-leitura2",
    "Fique ligado!",
    [
      "No começo da unidade há sugestões para ler, ver, ouvir e visitar, tudo sobre a vida com telas e redes.",
      "Um livro, chamado “No tempo das telas”, conta a história de oito personagens e mostra como celulares, computadores e redes sociais mudaram o jeito de as pessoas se comunicarem. Um filme conta a história de uma aluna muito esperta que entra em um esquema de trapaça. Há músicas sobre o assunto e até o site de um museu, o Museu do Amanhã, que faz um passeio virtual e pensa nas transformações dos próximos anos.",
      "Também há dois sites sobre segurança na internet: o Internet Segura e o Safernet.",
    ],
    "Baseado nas sugestões da seção “Fique ligado!” (Cereja e Vianna, Português Linguagens 9º ano, Saraiva, 2022)."
  ), IMG_FIQUE, "Livro com celular na capa, claquete de cinema, fones de ouvido, prédio de museu e site com escudo de segurança"),
  ...txt(
    "p9-g1-leitura2",
    withImage(
      mc("p9-g1-a6", "O livro “No tempo das telas” trata de quê?", "Toque na resposta certa",
        "De como as telas, os celulares e as redes sociais mudaram a nossa forma de nos comunicar.",
        ["De como cuidar de uma horta.", "Da história dos dinossauros.", "De regras de um jogo de futebol."]),
      IMG_FIQUE, "Livro, filme, fones de ouvido, museu e site"),
    withImage(
      mc("p9-g1-a7", "Pensando em todas as sugestões, qual pode ser o tema principal da unidade?", "Toque na resposta certa",
        "A vida na internet e nas redes sociais.",
        ["A vida dos animais do mar.", "Receitas de bolo.", "A história dos jogos olímpicos."]),
      IMG_FIQUE, "Livro, filme, fones de ouvido, museu e site"),
  ),
];

// ---------------------------------------------------------------------------
// Grupo 2 — As fake news (abertura do capítulo + primeira parte da entrevista)
// ---------------------------------------------------------------------------
const g2Activities: Activity[] = [
  withImage(
    mc("p9-g2-a1", "Que mal pode haver em curtir e repassar uma notícia sem conferir se ela é verdadeira?", "Toque na resposta certa",
      "Uma mentira pode se espalhar bem rápido e prejudicar pessoas.",
      ["Nenhum, porque repassar é sempre divertido.", "A mensagem fica mais bonita.", "O celular só gasta um pouco mais de bateria."]),
    IMG_LUPA, "Um jovem com uma lupa conferindo uma notícia no celular"),
  withImage(
    mc("p9-g2-a2", "Quando algo chega no seu celular, qual é a melhor reação?", "Toque na resposta certa",
      "Procurar saber se a informação é verdadeira, em fontes confiáveis, antes de repassar.",
      ["Repassar na hora, para ser o primeiro a contar.", "Acreditar em tudo que os amigos mandam.", "Apagar só as mensagens que eu não entendi."], "medium"),
    IMG_LUPA, "Um jovem com uma lupa conferindo uma notícia no celular"),
  withImage(read(
    "p9-g2-leitura",
    "Como sair das bolhas? (primeira parte)",
    [
      "A pesquisadora Pollyana Ferrari estuda as fake news, que são notícias falsas, e conversou sobre isso com uma revista de educação.",
      "Ela explica que as notícias falsas sempre existiram, até na Roma Antiga. O que mudou foi o tamanho: com as redes sociais, todo mundo ganhou voz e pode criar e espalhar conteúdo pelo celular. Nos grandes jornais há etapas para checar as informações. Nas redes, qualquer pessoa pode postar sem ninguém conferir.",
      "Ela conta um caso real: em 2014, Fabiane de Jesus foi linchada no Guarujá (SP) depois de ser acusada, em uma página da internet, de praticar magia negra com crianças. A informação era falsa. Mesmo quando a mentira é tirada do ar, o estrago pode ficar. Uma informação falsa pode destruir a vida de alguém, a fama de uma empresa, uma escola, uma família.",
      "Quem cria fake news? Cerca de 30% vêm de escritórios e grupos que ganham dinheiro com isso. A maior parte vem de pessoas comuns, que querem prejudicar alguém ou espalhar ódio. E quem começou? Quase nunca se descobre, por isso é tão difícil punir.",
    ],
    "Baseado na entrevista “Como sair das bolhas?”, de Pollyana Ferrari, à Carta Educação (Carta Capital, 17 abr. 2018). Texto reescrito."
  ), IMG_ESPALHA, "Uma mensagem falsa se espalhando por uma rede de pessoas"),
  ...txt(
    "p9-g2-leitura",
    mc("p9-g2-a3", "Segundo o texto, qual é a diferença entre as informações dos grandes veículos de comunicação e as das redes sociais?", "Toque na resposta certa",
      "Nos grandes veículos há etapas de checagem; nas redes, qualquer pessoa pode postar sem conferir.",
      ["Na grande imprensa só há mentiras e nas redes só há verdades.", "Não há diferença: ninguém confere nada em lugar nenhum.", "Nas redes, só jornalistas podem postar."]),
    mc("p9-g2-a4", "O que são fake news?", "Toque na resposta certa",
      "São informações ou notícias falsas.",
      ["São notícias muito engraçadas.", "São notícias muito antigas.", "São notícias escritas em inglês."]),
    mc("p9-g2-a5", "Como as fake news nascem? Que interesses podem existir por trás delas?", "Toque na resposta certa",
      "São criadas por pessoas que postam mentiras, muitas vezes por raiva, vingança ou para ganhar dinheiro.",
      ["Nascem sozinhas, sem que ninguém as crie.", "São criadas só para ajudar as pessoas.", "São criadas pelos jornais para ensinar a ler."], "medium"),
    withImage(
      mc("p9-g2-a6", "Por que as fake news podem ser prejudiciais?", "Toque na resposta certa",
        "Podem manchar a imagem de uma pessoa ou de uma empresa e até provocar reações violentas, como no caso de Fabiane de Jesus.",
        ["Porque deixam a internet mais lenta.", "Porque fazem as pessoas ficarem mais bonitas.", "Porque só atingem quem está distraído."], "medium"),
      IMG_ESPALHA, "Uma mensagem falsa se espalhando por uma rede de pessoas"),
    mc("p9-g2-a7", "Por que é difícil combater as fake news?", "Toque na resposta certa",
      "Porque a maioria vem de pessoas comuns, e quase nunca se sabe quem começou, o que dificulta punir.",
      ["Porque elas só existem em um país.", "Porque são sempre fáceis de reconhecer.", "Porque ninguém usa redes sociais."], "medium"),
    mc("p9-g2-a8", "Desmentir uma notícia falsa é uma atitude suficiente para resolver o problema das fake news?", "Toque na resposta certa",
      "Não: a mentira costuma chegar a muito mais gente que o desmentido, e o estrago pode não ter volta. Por isso é preciso outras formas de combate, como checar antes de repassar.",
      ["Sim, porque desmentindo tudo se resolve.", "Sim, porque quem viu a mentira esquece na hora.", "Não faz diferença nenhuma o que fazemos."], "hard"),
  ),
];

// ---------------------------------------------------------------------------
// Grupo 3 — Pós-verdade e bolhas
// ---------------------------------------------------------------------------
const g3Activities: Activity[] = [
  withImage(read(
    "p9-g3-leitura",
    "A pós-verdade",
    [
      "Pós-verdade é uma informação, ou uma afirmação, que muda a verdade de propósito. Ela mexe muito com a emoção e se apoia no que as pessoas já acreditam, em vez de apoiar-se em fatos conferidos. Mesmo assim, passa a ser aceita como verdadeira e acaba influenciando a opinião e o comportamento das pessoas.",
      "A pós-verdade também aparece quando notícias parecem verdadeiras e mexem com as emoções, e ganham destaque, principalmente na vida social e na política, como se fossem fatos comprovados.",
      "Na entrevista, a pesquisadora conta que a pós-verdade aparece quando as pessoas compartilham o que combina com seus desejos e crenças, mesmo que desconfiem que é falso. Ela lembra que o dedo é mais rápido que o cérebro: a gente compartilha sem perguntar de onde veio a foto ou o vídeo. Uma rede social que reúne 2 bilhões de pessoas, cerca de um terço da população do mundo, torna isso ainda mais preocupante.",
    ],
    "Baseado no verbete “pós-verdade” (Academia Brasileira de Letras, Nova Palavra) e na entrevista de Pollyana Ferrari (Carta Capital, 2018). Texto reescrito."
  ), IMG_COMPARTILHA, "Um dedo apertando o botão de compartilhar, enquanto um cérebro com lupa vem correndo atrás"),
  ...txt(
    "p9-g3-leitura",
    mc("p9-g3-a1", "O que é pós-verdade? Que relação ela tem com as fake news?", "Toque na resposta certa",
      "É uma informação falsa ou distorcida que mexe com a emoção e passa a ser aceita como verdade; as fake news reforçam crenças e valores de quem as compartilha.",
      ["É a verdade que aparece depois de uma notícia.", "É um tipo de jornal impresso.", "É um jogo de internet sem relação com notícias."], "medium"),
    mc("p9-g3-a2", "Por que as pessoas passam a acreditar na pós-verdade?", "Toque na resposta certa",
      "Porque confiam em quem enviou, recebem a mesma informação várias vezes e ela combina com o que já pensam.",
      ["Porque a informação sempre vem com provas.", "Porque as pessoas nunca usam a internet.", "Porque elas só acreditam nos professores."], "medium"),
    withImage(
      mc("p9-g3-a3", "A pesquisadora diz: “o dedo é mais rápido que o cérebro”. O que isso quer dizer e como ajuda a criar a pós-verdade?", "Toque na resposta certa",
        "As pessoas repassam antes de pensar e checar. Assim, a informação falsa se espalha e acaba virando “verdade”.",
        ["Que digitar com o dedo é mais rápido que pensar, e isso é bom.", "Que o cérebro dá ordem para o dedo checar tudo.", "Que quem tem dedos rápidos nunca erra."], "hard"),
      IMG_COMPARTILHA, "Um dedo apertando o botão de compartilhar, enquanto um cérebro com lupa vem correndo atrás"),
    mc("p9-g3-a4", "A rede social citada reúne 2 bilhões de pessoas, cerca de um terço da população do mundo. Por que isso preocupa a pesquisadora?", "Toque na resposta certa",
      "Porque uma mentira tomada como verdade pode chegar a muita gente e causar consequências graves.",
      ["Porque a rede fica lotada e trava.", "Porque ninguém mais usa a escola.", "Porque ter muitos amigos é sempre ruim."], "medium"),
  ),
  withImage(
    read(
      "p9-g3-leitura2",
      "Como sair das bolhas? (segunda parte)",
      [
        "Pollyana Ferrari chama as redes sociais de bolhas. Nelas, a gente compartilha mais com os nossos “iguais”, as pessoas que pensam parecido. Isso é confortável, mas a gente perde a chance de ouvir ideias diferentes.",
        "Os algoritmos, que são programas de computador, reforçam as bolhas: se você fala de comida orgânica, só recebe anúncios e marcas sobre isso. Quem cria fake news também compra perfis falsos para entrar nas bolhas e oferecer discursos sob medida.",
        "Para sair da bolha, é preciso conhecer outros grupos, ver mensagens de pessoas que pensam diferente e conversar. Se ficarmos só no que concordamos, repetimos opiniões prontas.",
        "A pesquisadora diz que a escola não pode ignorar esse assunto. Ela ajuda a formar adultos mais críticos e éticos, que sabem pensar sobre os temas por pontos de vista diferentes.",
      ],
      "Baseado na entrevista “Como sair das bolhas?”, de Pollyana Ferrari, à Carta Educação (Carta Capital, 17 abr. 2018)."
    ),
    IMG_BOLHA, "Um grupo de jovens dentro de uma bolha e outros grupos em outras bolhas"
  ),
  ...txt(
    "p9-g3-leitura2",
    withImage(
      mc("p9-g3-a5", "O que caracteriza essas bolhas?", "Toque na resposta certa",
        "São grupos em que as pessoas pensam parecido: é confortável, mas sobra pouco espaço para ideias diferentes.",
        ["São grupos em que todo mundo discorda de todo mundo.", "São bolhas de sabão que sobem pelo céu.", "São grupos que só falam de escola."]),
      IMG_BOLHA, "Um grupo dentro de uma bolha"),
    withImage(
      mc("p9-g3-a6", "Qual é a relação entre as fake news, os algoritmos e as bolhas?", "Toque na resposta certa",
        "Os algoritmos reforçam as bolhas, e as fake news encontram nelas um terreno fácil, porque lá quase não aparecem ideias diferentes.",
        ["Os algoritmos apagam todas as fake news das bolhas.", "As bolhas servem para as fake news irem embora.", "Não existe nenhuma relação entre eles."], "hard"),
      IMG_BOLHA, "Um grupo dentro de uma bolha"),
    withImage(
      mc("p9-g3-a7", "Qual é a relação entre as bolhas e a pós-verdade?", "Toque na resposta certa",
        "Nas bolhas, as pessoas compartilham textos parecidos, mesmo falsos, e isso cria e espalha a pós-verdade.",
        ["As bolhas servem para acabar com a pós-verdade.", "A pós-verdade só existe fora das redes.", "Bolha e pós-verdade são a mesma palavra."], "hard"),
      IMG_BOLHA, "Um grupo dentro de uma bolha"),
    withImage(
      mc("p9-g3-a8", "De acordo com a pesquisadora, como é possível sair das bolhas?", "Toque na resposta certa",
        "Conhecendo outros grupos e jeitos de pensar, lendo outras fontes e conversando com quem pensa diferente.",
        ["Passando mais tempo só com quem pensa igual.", "Compartilhando tudo sem conferir.", "Apagando o aplicativo e nunca mais usando a internet."], "medium"),
      IMG_BOLHA, "Um grupo dentro de uma bolha"),
    mc("p9-g3-a9", "Segundo a pesquisadora, como a escola pode ajudar o jovem a sair da bolha?", "Toque na resposta certa",
      "Estimulando o senso crítico e a reflexão sobre temas e pontos de vista diferentes dos que ele já conhece.",
      ["Proibindo o uso de qualquer tela.", "Ensinando que só existe uma opinião certa.", "Deixando esse assunto de fora das aulas."], "medium"),
    mc("p9-g3-a10", "Qual destas frases é FALSA, de acordo com o que você leu?", "Toque na frase falsa",
      "A pós-verdade é criada nas redes sociais e só tem poder porque ajuda a formar bolhas.",
      [
        "As fake news acontecem muito porque as pessoas repassam informações sem questionar, seja por falta de senso crítico, seja porque a informação combina com o que desejam.",
        "A pós-verdade é uma afirmação falsa ou conveniente, ligada a crenças, emoções e interesses de grupos sociais.",
        "Segundo a pesquisadora, para combater as fake news é preciso desenvolver o senso crítico e ter contato com outras fontes e outros jeitos de pensar.",
      ], "hard"),
  ),
];

// ---------------------------------------------------------------------------
// Grupo 4 — A linguagem do texto
// ---------------------------------------------------------------------------
const g4Activities: Activity[] = [
  withImage(read(
    "p9-g4-leitura",
    "Trechos para observar",
    [
      "“As fake news sempre existiram. No meu livro eu cito relatos e resumos de jornais fake desde Roma Antiga. [...] O que mudou é a questão da escala. Com as redes sociais, basicamente as temos há 14 anos, todo mundo ganhou voz.”",
      "“Bolha são as redes sociais e proponho uma reflexão sobre a necessidade de sairmos desse espaço que te induz a compartilhar com os seus ‘iguais’.”",
      "Nesses trechos, preste atenção nas palavras fake, fake news e timeline, no pronome “as”, no verbo “são”, no pronome “te” e nas aspas de “iguais”.",
    ],
    "FERRARI, Pollyana. [Entrevista cedida a] Ana Luiza Basilio. Carta Capital, São Paulo, 17 abr. 2018. Trechos copiados."
  ), IMG_MAPA, "Um mapa-múndi colorido, com símbolos que lembram línguas diferentes"),
  ...txt(
    "p9-g4-leitura",
    withImage(
      mc("p9-g4-a1", "As palavras fake, fake news e timeline vêm de qual língua?", "Toque na resposta certa",
        "Do inglês.", ["Do espanhol.", "Do francês.", "Do tupi."]),
      IMG_MAPA, "Um mapa-múndi colorido, com símbolos que lembram línguas diferentes"),
    match("p9-g4-a2", "Ligue cada palavra em inglês à palavra ou expressão em português que quer dizer quase o mesmo.",
      [["fake", "falso"], ["fake news", "notícias falsas"], ["timeline", "linha do tempo"]]),
    mc("p9-g4-a3", "Por que você acha que a pesquisadora preferiu usar essas palavras em inglês em vez de palavras em português?", "Toque na resposta certa",
      "Porque esses termos são muito usados no mundo digital e esses fenômenos surgiram primeiro em países de língua inglesa.",
      ["Porque ela não sabe falar português.", "Porque não existe nenhuma palavra em português para isso.", "Porque o jornal só aceita textos em inglês."], "medium"),
    mc("p9-g4-a4", "Se a autora tivesse usado palavras em português, o sentido do texto mudaria?", "Toque na resposta certa",
      "O sentido seria praticamente o mesmo, mas soaria menos comum para quem lê sobre o assunto.",
      ["Mudaria para o contrário.", "O texto ficaria impossível de entender.", "O texto deixaria de falar de internet."], "medium"),
    mc("p9-g4-a5", "No trecho “Com as redes sociais, basicamente as temos há 14 anos”, a que termo anterior se refere o pronome “as”? Justifique.", "Toque na resposta certa",
      "A “redes sociais”: o pronome “as” retoma esse termo e diz que as redes sociais existem há cerca de 14 anos, segundo o texto.",
      ["A “fake news”, porque elas existem desde a Roma Antiga.", "A “jornais”, porque eles têm 14 anos.", "A “escala”, porque ela é feminina."], "hard"),
    mc("p9-g4-a6", "No trecho “Bolha são as redes sociais”, por que o verbo ser está em “são” (plural) e não em “é”?", "Toque na resposta certa",
      "Porque ele concorda com “as redes sociais” (plural), e não com “bolha” (singular).",
      ["Porque houve um erro de digitação.", "Porque “bolha” é o nome de um grupo de pessoas.", "Porque o verbo ser fica sempre no plural."], "hard"),
    mc("p9-g4-a7", "No mesmo trecho, o pronome “te” se refere especificamente a quem lê o texto ou a todos os internautas em geral?", "Toque na resposta certa",
      "A todos os internautas em geral: a pesquisadora fala de algo que acontece com todas as pessoas que participam de redes.",
      ["Só a quem está lendo a revista.", "Só à jornalista que fez a entrevista.", "A nenhuma pessoa, é só enfeite."], "hard"),
    mc("p9-g4-a8", "O que justifica o uso de aspas na palavra “iguais”?", "Toque na resposta certa",
      "As aspas mostram que as pessoas das bolhas não são exatamente iguais: elas só compartilham gostos e ideias parecidas.",
      ["As aspas servem só para enfeitar a palavra.", "As aspas mostram que a palavra está escrita errada.", "As aspas indicam que alguém está gritando."], "hard"),
  ),
];

// ---------------------------------------------------------------------------

const PLACEHOLDER_VIDEO = "/videos/alfabetizacao-grupo-1.mp4";

const grupo9 = (
  num: number,
  title: string,
  videoObjective: string,
  videoScript: string,
  videoThumbnail: string,
  activities: Activity[]
): LessonGroup => ({
  id: `p9-g${num}`,
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

export const portuguesEmAcaoGrupos: LessonGroup[] = [
  grupo9(1, "Caiu na rede!",
    "Observar uma ilustração e ideias de um cordel para descobrir o tema da unidade: a vida na internet e nas redes sociais.",
    "Uma cena de rua com todos olhando o celular e uma pessoa que levanta a cabeça abre a discussão; depois, livros, filmes e sites sobre a vida com telas.",
    IMG_CRIANCAS, g1Activities),
  grupo9(2, "As fake news",
    "Entender o que são fake news, como nascem, quem as cria e por que são tão difíceis de combater.",
    "Uma notícia estranha chega ao celular: será verdade? Uma pesquisadora explica o que são notícias falsas e por que elas se espalham.",
    IMG_LIVRO, g2Activities),
  grupo9(3, "Pós-verdade e bolhas",
    "Compreender a pós-verdade e as bolhas das redes sociais, e como o senso crítico ajuda a sair delas.",
    "Como as redes formam bolhas, como os algoritmos as reforçam e como o senso crítico ajuda a sair delas.",
    IMG_LETRAS, g3Activities),
  grupo9(4, "A linguagem do texto",
    "Observar palavras em inglês, pronomes, o verbo ser e as aspas em trechos da entrevista.",
    "Estrangeirismos, pronomes, concordância do verbo ser e aspas em trechos da entrevista.",
    IMG_LIVRO, g4Activities),
];
