import { grupo, IMG, IMG_CRIANCAS, IMG_FLORESTA, IMG_LETRAS, IMG_LIVRO, mc, read, txt, withImage } from "./shared";
import type { GrupoParcial } from "./shared";

// Capítulo 2 (continuação) — poema "Presença", plural dos compostos e artigo de opinião (I).

const I = "Toque na resposta certa";
const IMG_CARTUM = `${IMG}/c2-cartum-semana.jpg`;
const CAP_CARTUM = "Cartum: a semana de uma trabalhadora";

// ---------------------------------------------------------------------------
// B1/B2 — Semântica e discurso: poema "Presença"
// ---------------------------------------------------------------------------
const presenca = read("p9c2-presenca", "Presença", [
  "Poema dedicado a uma amiga poeta e jornalista. O eu lírico fala diretamente com a pessoa de quem sente saudade. Aqui vai o poema contado com palavras nossas, em seis momentos:",
  "1. É preciso que a saudade trace o teu rosto com perfeição e que o vento das horas mexa de leve nos teus cabelos.",
  "2. É preciso que a tua ausência deixe no ar um cheiro suave de trevo amassado e de folhas de alecrim guardadas num móvel antigo.",
  "3. Mas é preciso, também, que seja como abrir uma janela e te respirar, azul e luminosa, no ar.",
  "4. É preciso a saudade para eu sentir, dentro de mim, a presença misteriosa da vida.",
  "5. Mas, quando surges, és tão outra, múltipla e imprevista, que nunca te pareces com o teu retrato.",
  "6. E eu preciso fechar os olhos para te ver!",
], "Baseado em Mário Quintana, “Presença”, Poesia completa, Nova Aguilar, 2006.");

const b1: GrupoParcial = grupo(
  "Presença: a saudade de quem ama",
  "Ler um poema de saudade e entender quem fala, com quem fala e o que a repetição de “É preciso” provoca.",
  "Um eu lírico precisa da saudade para lembrar a pessoa amada. Observamos o interlocutor, o sentimento e a estrutura repetida.",
  IMG_FLORESTA,
  [
    presenca,
    ...txt("p9c2-presenca",
      mc("p9c2-g8-a1", "O eu lírico se dirige diretamente a um interlocutor. Quem é e que termos comprovam sua presença?", I,
        "Uma mulher, como mostram “luminosa”, “outra”, “múltipla” e “imprevista”, no feminino, e “tua”, “teus”, “te”, em segunda pessoa.",
        ["Um homem, como mostram “luminoso” e “imprevisto”.", "O leitor em geral, porque o poema usa “nós”.", "O mar, como mostram “azul” e “vento”."], "medium"),
      mc("p9c2-g8-a2", "O que o eu lírico sente em relação à pessoa a quem se dirige?", I,
        "Saudade; na ausência dela, esforça-se para formar na mente uma imagem dela.",
        ["Raiva, porque ela foi embora.", "Indiferença, porque já a esqueceu.", "Medo, porque ela é perigosa."]),
      mc("p9c2-g8-a3", "Por que o eu lírico afirma que é preciso fechar os olhos para ver essa pessoa?", I,
        "Porque ela, múltipla e imprevista, difere da imagem guardada; então ele busca na lembrança a imagem desenhada pela saudade.",
        ["Porque o quarto está escuro demais.", "Porque ele está com sono.", "Porque a pessoa é invisível."], "medium"),
      mc("p9c2-g8-a4", "O poema se organiza em torno da repetição da estrutura “É preciso”. Que papel ela tem?", I,
        "Introduz os elementos de que o eu lírico necessita para lembrar a interlocutora quando ela está ausente.",
        ["Serve para dar ordens à pessoa amada.", "Marca o fim do poema.", "Só enfeita o texto, sem relação com o sentido."], "medium"),
      mc("p9c2-g8-a5", "Nas frases com “É preciso”, que termos ou orações a complementam?", I,
        "“Que a saudade trace o teu rosto”, “que a tua ausência deixe no ar um cheiro”, “que seja como abrir uma janela” e “a saudade”.",
        ["“Azul e luminosa”, “múltipla” e “imprevista”.", "“No ar”, “num móvel antigo” e “nos teus cabelos”.", "“Os olhos”, “o retrato” e “o vento”."], "hard"),
      mc("p9c2-g8-a6", "Em “É preciso a saudade”, qual é a função sintática de “a saudade”?", I,
        "Sujeito.",
        ["Objeto direto.", "Predicativo do sujeito.", "Adjunto adverbial."], "medium"),
    ),
  ]
);

const b2: GrupoParcial = grupo(
  "Presença: orações e o mas",
  "Classificar as orações formadas com “É preciso” e interpretar o sentido da conjunção mas no poema.",
  "A repetição das orações subjetivas dá o ritmo do poema, e o mas faz o eu lírico virar o jogo: da saudade à pessoa que surge.",
  IMG_LETRAS,
  [
    ...txt("p9c2-presenca",
      mc("p9c2-g9-a1", "Quais são os períodos compostos formados pela estrutura “É preciso” e pelos complementos que você identificou?", I,
        "“É preciso que a saudade trace o teu rosto…”, “É preciso que a tua ausência deixe no ar um cheiro…” e “Mas é preciso, também, que seja como abrir uma janela…”.",
        ["“Mas, quando surges, és tão outra…” e “E eu preciso fechar os olhos…”.", "“Poema dedicado a uma amiga” e “Aqui vai o poema”.", "Nenhum: todos são períodos simples."], "hard"),
      mc("p9c2-g9-a2", "Classifique as orações que compõem esses períodos compostos.", I,
        "Em todos, “É preciso” é a oração principal; os complementos são orações subordinadas substantivas subjetivas.",
        ["“É preciso” é subordinada e os complementos são principais.", "Todas são coordenadas aditivas.", "Os complementos são subordinadas substantivas predicativas."], "hard"),
      mc("p9c2-g9-a3", "O poema tem duas ocorrências da conjunção mas. Em qual delas o mas tem sentido de adição? Justifique.", I,
        "Na do terceiro momento (“Mas é preciso, também…”), pois, junto de “também”, forma a locução “mas também”, de sentido aditivo.",
        ["Na do quinto momento, que introduz uma ideia oposta.", "Em nenhuma delas.", "Nas duas, porque o poema só soma ideias."], "hard"),
      mc("p9c2-g9-a4", "Em qual ocorrência o mas tem o sentido de oposição? Justifique.", I,
        "Na do quinto momento: ela introduz uma situação oposta à anterior, a do surgimento da interlocutora, cuja ausência era o motivo das reflexões do eu lírico.",
        ["Na do primeiro momento, que não tem o mas.", "Na do terceiro momento, por causa do “também”.", "Em nenhuma delas."], "hard"),
      mc("p9c2-g9-a5", "Que oposições de elementos resultam do emprego do mas no poema?", I,
        "Ausência e presença; tranquilidade e inquietude.",
        ["Felicidade e tristeza; sucesso e fracasso.", "Beleza e feiura; riqueza e pobreza.", "Dia e noite; mar e terra."], "hard"),
      mc("p9c2-g9-a6", "A repetição de orações subordinadas substantivas tem papel essencial no poema. Que afirmativas estão corretas? I. A repetição reforça a ideia de dificuldade para reconstituir a imagem. II. “É preciso” sempre necessita de um sujeito, expresso pelas subordinadas subjetivas. III. As subordinadas expressam uma suposta concretização da pessoa e a tornam viva na lembrança. IV. A pessoa é construída como retrato e, assim, a ausência dá lugar à presença.", I,
        "II, III e IV.",
        ["I, II e III.", "I e IV, apenas.", "I, III e IV."], "hard"),
    ),
  ]
);

// ---------------------------------------------------------------------------
// B3 — De olho na escrita: títulos de matérias e substantivos/adjetivos compostos
// ---------------------------------------------------------------------------
const b3: GrupoParcial = grupo(
  "Compostos em manchetes",
  "Identificar substantivos e adjetivos compostos em manchetes e observar como formam o plural.",
  "Abaixo-assinados, arranha-céus e sul-americanos: o que muda quando essas palavras vão para o plural?",
  IMG_LIVRO,
  [
    read("p9c2-manchetes", "Três manchetes", [
      "I. Abaixo-assinados on-line funcionam? Entenda como as petições da internet dão resultado.",
      "II. Definida a equipe brasileira de vela para os Jogos Sul-Americanos.",
      "III. Sete arranha-céus que mudaram o horizonte de Nova York.",
    ]),
    ...txt("p9c2-manchetes",
      mc("p9c2-g10-a1", "Considerando esses títulos, qual é o assunto de cada matéria?", I,
        "I: petições on-line; II: a equipe brasileira de vela para os Jogos Sul-Americanos; III: arranha-céus em Nova York.",
        ["I: esportes de verão; II: moda; III: culinária.", "I: viagens; II: petições; III: vela.", "I: nova York; II: arranha-céus; III: petições."]),
      mc("p9c2-g10-a2", "Dois desses títulos apresentam substantivos compostos. Quais são?", I,
        "“Abaixo-assinados” (I) e “arranha-céus” (III).",
        ["“On-line” (I) e “Sul-Americanos” (II).", "“Equipe” (II) e “horizonte” (III).", "“Petições” (I) e “Nova York” (III)."]),
      mc("p9c2-g10-a3", "Por que “abaixo-assinados” e “arranha-céus” são considerados substantivos?", I,
        "Porque nomeiam, respectivamente, um tipo de documento e um tipo de prédio, e vêm precedidos de artigo ou de numeral.",
        ["Porque estão escritos com hífen.", "Porque indicam ação.", "Porque modificam um verbo."], "medium"),
      mc("p9c2-g10-a4", "Como se deu a formação do plural em “abaixo-assinados” e “arranha-céus”?", I,
        "Nos dois casos, o primeiro elemento ficou invariável e o segundo foi para o plural.",
        ["Nos dois, só o primeiro foi para o plural.", "Nos dois, os dois elementos foram para o plural.", "Nos dois, nenhum elemento mudou."], "medium"),
      mc("p9c2-g10-a5", "Um dos títulos apresenta um adjetivo composto. Qual é?", I,
        "“Sul-Americanos” (II).",
        ["“Brasileira” (II).", "“Mudaram” (III).", "“Definida” (II)."]),
      mc("p9c2-g10-a6", "Por que “Sul-Americanos” é considerado adjetivo?", I,
        "Porque acompanha o substantivo “Jogos”, especificando seu sentido.",
        ["Porque indica uma ação.", "Porque vem antes do verbo.", "Porque nomeia um lugar sem acompanhar nada."], "medium"),
      mc("p9c2-g10-a7", "Como se formou o plural do adjetivo composto “Sul-Americanos”?", I,
        "O primeiro elemento ficou invariável e o segundo foi pluralizado.",
        ["Os dois elementos foram pluralizados.", "Só o primeiro foi pluralizado.", "Nenhum elemento mudou."], "medium"),
    ),
  ]
);

// ---------------------------------------------------------------------------
// B4 — Exercícios: poema "Beija-flor" e cartum
// ---------------------------------------------------------------------------
const b4: GrupoParcial = grupo(
  "Beija-flor e o cartum da semana",
  "Aplicar as regras do plural dos compostos num poema e num cartum.",
  "Um eu lírico solitário pede carinho ao beija-flor, e um cartum mostra como a segunda-feira assusta o domingo. Tudo com plurais de palavras compostas!",
  IMG_FLORESTA,
  [
    read("p9c2-regras", "Plural dos compostos: resumo", [
      "Substantivos compostos: pluralizam-se as palavras variáveis (substantivos, adjetivos, numerais) e não as invariáveis (verbos, advérbios): couves-flores, quintas-feiras, guarda-sóis, bota-foras.",
      "Se o segundo substantivo especifica o primeiro, só o primeiro varia: mangas-rosa. Com “guarda”: guardas-florestais (substantivo + adjetivo) e guarda-sóis (verbo + substantivo). Ligadas por “de”, só a primeira: pés-de-moleque. Palavras repetidas ou onomatopeias: só a segunda varia: tico-ticos, reco-recos.",
      "Adjetivos compostos: pluraliza-se só o último elemento (acordos luso-brasileiros). Exceção: azul-marinho, invariável. Cores com substantivo ficam invariáveis: camisetas amarelo-canário, bolsas verde-água.",
    ]),
    read("p9c2-beijaflor", "Beija-flor", [
      "Poema com um eu lírico em primeira pessoa: ele fala com um beija-flor pequenininho, que beija a flor com carinho, e pede um pouco de amor, porque hoje se sente muito sozinho. Reconhece que não é flor, mas quer um beijinho. Os versos têm sete sílabas e rimam.",
    ], "Inspirado em Roseana Murray, No mundo da lua, Paulus, 2011."),
    ...txt("p9c2-beijaflor",
      mc("p9c2-g11-a1", "No poema, a quem o eu lírico se dirige?", I,
        "A um beija-flor.",
        ["A uma flor gigante.", "A uma pessoa idosa.", "A um professor."]),
      mc("p9c2-g11-a2", "Que sentimento ele demonstra ter no apelo que faz?", I,
        "Solidão.",
        ["Raiva.", "Orgulho.", "Entusiasmo."]),
      mc("p9c2-g11-a3", "O verso é a redondilha maior (sete sílabas), muito usada em cantigas de roda e no cordel. Que efeito isso produz?", I,
        "O poema fica leve, simples, sonoro e fácil de memorizar.",
        ["O poema fica pesado e difícil de ler.", "O poema perde as rimas.", "O poema vira um texto científico."], "medium"),
      mc("p9c2-g11-a4", "A palavra do título é um substantivo composto. Qual é o plural dela?", I,
        "Beija-flores.",
        ["Beijas-flores.", "Beijas-flor.", "Beija-flor."], "medium"),
    ),
    withImage(read("p9c2-cartum", "Cartum: a semana de uma trabalhadora", [
      "Cartum em quatro quadros, com uma moça de crachá, em tons de azul e laranja.",
      "Quadro 1 (quinta-feira): ela olha o relógio e pensa: “Amanhã é sexta e depois vem o fim de semana!”",
      "Quadro 2 (sexta-feira): ela pensa de novo, sorrindo: “Já já é fim de semana!”",
      "Quadro 3 (sábado): ela está esparramada no sofá, muito feliz, e diz: “Fim de semana!”",
      "Quadro 4 (domingo): ela olha pela janela, com cara de aflita, e pensa: “…e amanhã já é segunda-feira.”",
    ]), IMG_CARTUM, CAP_CARTUM),
    ...txt("p9c2-cartum",
      withImage(mc("p9c2-g11-a5", "O cartum retrata o que a moça pensa na quinta e na sexta-feira?", I,
        "Ela pensa na chegada do fim de semana, e só nisso.",
        ["Pensa na prova de matemática.", "Pensa nas férias de julho.", "Pensa em trocar de emprego."]), IMG_CARTUM, CAP_CARTUM),
      mc("p9c2-g11-a6", "Como ela se sente no sábado?", I,
        "Alegre, porque chegou o fim de semana.",
        ["Triste, porque o sábado é chato.", "Cansada, porque trabalhou o dia inteiro.", "Com raiva, porque perdeu o sofá."]),
      mc("p9c2-g11-a7", "No domingo, que ação da personagem surpreende o leitor?", I,
        "Ela pensa na segunda-feira, que está chegando, em vez de aproveitar o domingo.",
        ["Ela vai trabalhar no domingo.", "Ela dança no meio da rua.", "Ela dorme o dia todo."], "medium"),
      mc("p9c2-g11-a8", "Sobre o humor do cartum, qual explicação está certa?", I,
        "O humor está em a moça pensar no sábado e no domingo que chegam, ficar alegre no sábado e, no domingo, aparentar aflição com a segunda-feira, dia de voltar ao trabalho.",
        ["O humor está em ela nunca pensar no trabalho.", "O humor está em ela trabalhar todos os dias.", "O humor está em ela dormir a semana inteira."], "medium"),
      mc("p9c2-g11-a9", "Identifique os substantivos compostos do cartum e escreva o plural deles.", I,
        "Quinta-feira, sexta-feira e segunda-feira: quintas-feiras, sextas-feiras e segundas-feiras.",
        ["Quintas-feira, sextas-feira e segundas-feira.", "Quinta-feiras, sexta-feiras e segunda-feiras.", "Quintas-feiras e sextas-feiras só; segunda-feira não varia."], "medium"),
    ),
  ]
);

// ---------------------------------------------------------------------------
// B5 — Exercícios: adjetivos compostos
// ---------------------------------------------------------------------------
const b5: GrupoParcial = grupo(
  "Adjetivos compostos no plural",
  "Reescrever frases flexionando corretamente os adjetivos compostos.",
  "Castanho-escuros, verde-oliva ou azul-marinho? Cada composto tem a sua regra. Praticamos com frases do dia a dia.",
  IMG_LETRAS,
  [
    mc("p9c2-g12-a1", "Reescreva de acordo com a norma-padrão: “O garotinho tem cabelos castanho-escuro e olhos verde-claro.”", I,
      "O garotinho tem cabelos castanho-escuros e olhos verde-claros.",
      ["O garotinho tem cabelos castanhos-escuros e olhos verdes-claros.", "O garotinho tem cabelos castanho-escuro e olhos verde-claro.", "O garotinho tem cabelos castanhos-escuro e olhos verdes-claro."], "medium"),
    mc("p9c2-g12-a2", "Reescreva de acordo com a norma-padrão: “Você fica sério com essas roupas verde-oliva.”", I,
      "Você fica sério com essas roupas verde-oliva.",
      ["Você fica sério com essas roupas verdes-olivas.", "Você fica sério com essas roupas verde-olivas.", "Você fica sério com essas roupas verdes-oliva."], "medium"),
    mc("p9c2-g12-a3", "Reescreva: “Os alunos decidiram que usarão como uniforme calças azul-marinho e camisetas branco-gelo.”", I,
      "Os alunos decidiram que usarão como uniforme calças azul-marinho e camisetas branco-gelo.",
      ["Os alunos decidiram que usarão como uniforme calças azuis-marinhos e camisetas brancos-gelos.", "Os alunos decidiram que usarão como uniforme calças azul-marinhos e camisetas branco-gelos.", "Os alunos decidiram que usarão como uniforme calças azuis-marinho e camisetas brancas-gelo."], "hard"),
    mc("p9c2-g12-a4", "Reescreva: “Entrem, por favor. Vocês são sempre bem-vindo em minha casa.”", I,
      "Entrem, por favor. Vocês são sempre bem-vindos em minha casa.",
      ["Entrem, por favor. Vocês são sempre bens-vindos em minha casa.", "Entrem, por favor. Vocês são sempre bem-vindo em minha casa.", "Entrem, por favor. Vocês são sempre bens-vindo em minha casa."], "medium"),
    mc("p9c2-g12-a5", "Complete com o adjetivo composto no plural: “O inglês e o alemão são línguas ___.” (anglo-germânico)", I,
      "anglo-germânicas",
      ["anglos-germânicas", "anglo-germânica", "anglos-germânico"], "medium"),
    mc("p9c2-g12-a6", "Complete: “Os políticos precisam buscar soluções para os problemas ___ do país.” (econômico-financeiro)", I,
      "econômico-financeiros",
      ["econômicos-financeiros", "econômico-financeiro", "econômicos-financeiro"], "medium"),
    mc("p9c2-g12-a7", "Complete: “Obras literárias e técnicas ___ são de fácil importação.” (ibero-americano)", I,
      "ibero-americanas",
      ["iberas-americanas", "ibero-americana", "iberos-americanos"], "medium"),
    mc("p9c2-g12-a8", "Complete: “O hospital atende com equipamentos ___ e instrumentos ___ de primeira.” (médico-hospitalar, médico-cirúrgico)", I,
      "médico-hospitalares / médico-cirúrgicos",
      ["médicos-hospitalares / médicos-cirúrgicos", "médico-hospitalar / médico-cirúrgico", "médicas-hospitalares / médicas-cirúrgicas"], "medium"),
  ]
);

// ---------------------------------------------------------------------------
// B6 — Artigo de opinião (I): leitura e estudo
// ---------------------------------------------------------------------------
const sayao = read("p9c2-sayao", "A convivência com a internet (artigo de opinião)", [
  "1. A vida de crianças e adolescentes não está simples nem fácil. São tantas as tentações que fica difícil resistir, sobretudo porque a formação crítica que eles precisariam ter sobre a vida tem sido escassa. Família e escola pouco investem nisso, talvez por subestimarem a capacidade de reflexão dos mais novos.",
  "2. Vamos considerar a convivência deles com a internet. Um passeio por blogues, portais e reportagens mostra, nos comentários, a violência e a agressividade com que as pessoas se manifestam, sejam jovens, sejam adultas. Penso que a internet consegue arrancar o que há de pior em muitas pessoas.",
  "3. Vou reunir alguns casos para ilustrar essa conversa. Um jovem de 17 anos me escreveu contando que abriu uma conta numa rede, mas estava prestes a fechá-la, porque percebeu que muita gente, inclusive ele, escreve coisas por impulso e depois se arrepende, mas aí é tarde demais, porque o texto já se espalhou.",
  "4. Uma garota de 14 anos me escreveu desesperada: namorava, fez vídeos de momentos íntimos com o garoto e agora quer terminar o namoro, mas ele diz que, se ela o deixar, vai publicar os vídeos.",
  "5. O que podemos fazer para ajudar essas crianças e esses jovens a ter uma vida mais saudável? Já temos provas de que aconselhar, mostrar os perigos e regular o uso de recursos tecnológicos têm dado poucos resultados. Talvez devêssemos, então, investir mais na formação deles.",
  "6. Vejo constantemente adultos dizerem que educação moral e ética é papel da família. Mas, hoje, a televisão educa, a internet educa, a publicidade educa, os valores sociais educam. Mesmo que a família invista muito, os mais novos estão sujeitos a inúmeras outras influências.",
  "7. Por isso, investir na formação do espírito crítico pode ser um bom caminho, assim como investir nas virtudes. Isso é papel da família e da escola. Eles precisam saber que os meios de comunicação, os modismos e os valores sociais podem (e devem) ser questionados, mas com ideias ancoradas no conhecimento.",
  "8. Precisamos reconhecer: o potencial de reflexão deles é alto. Só falta acreditarmos nisso.",
], "Baseado em Rosely Sayão, “A convivência com a internet”, Folha de S.Paulo, 19 ago. 2014.");

const b6: GrupoParcial = grupo(
  "Artigo de opinião: a convivência com a internet",
  "Ler um artigo de opinião e analisar introdução, argumentos, pessoa do discurso e recursos de persuasão.",
  "Um artigo de opinião defende um ponto de vista de quem assina. Vemos onde ele aparece, como é apoiado e por que a primeira pessoa fortalece o texto.",
  IMG_CRIANCAS,
  [
    sayao,
    ...txt("p9c2-sayao",
      mc("p9c2-g13-a1", "Em artigos de opinião, é comum a introdução vir logo no primeiro parágrafo, com assunto e posição do autor. Isso acontece no texto lido?", I,
        "Sim: o assunto e a opinião são apresentados no primeiro parágrafo, embora o contexto da internet só fique explícito no segundo.",
        ["Não: a introdução só aparece no último parágrafo.", "Não: o texto não tem introdução.", "Sim: mas o assunto é só a internet, sem opinião."], "medium"),
      mc("p9c2-g13-a2", "Qual é o assunto do artigo de opinião lido?", I,
        "A vida de crianças e adolescentes, que hoje não está simples nem fácil.",
        ["A história das redes sociais.", "A venda de celulares.", "O preço de aparelhos eletrônicos."]),
      mc("p9c2-g13-a3", "Qual é a opinião da autora sobre o assunto?", I,
        "A dificuldade vem da pouca formação crítica que crianças e adolescentes recebem da família e da escola, que subestimam a capacidade de reflexão deles.",
        ["Que as crianças não devem usar a internet.", "Que a escola é a única responsável por tudo.", "Que a internet é sempre boa e não oferece riscos."], "medium"),
      mc("p9c2-g13-a4", "Que argumento fundamentado na observação da realidade a autora apresenta?", I,
        "O de que há muita violência e agressividade nos comentários da internet, observadas em blogues, portais e reportagens.",
        ["O de que todo jovem sabe usar a internet.", "O de que não há comentários na internet.", "O de que os adultos nunca usam a internet."], "medium"),
      mc("p9c2-g13-a5", "Que argumentos ligados às experiências da autora como psicóloga foram usados?", I,
        "Ela conta que recebeu textos escritos (e-mails, cartas) de jovens relatando experiências complicadas na internet.",
        ["Ela conta o que aprendeu em uma viagem ao exterior.", "Ela narra um jogo de futebol.", "Ela copia um texto de um livro de receitas."], "medium"),
      mc("p9c2-g13-a6", "Identifique ocorrências da primeira pessoa do singular no texto.", I,
        "“Penso”, “vou reunir”, “me escreveu” e “vejo”.",
        ["“Vamos considerar”, “podemos” e “temos”.", "“Fica”, “resistir” e “tem sido”.", "“Eles”, “precisam” e “devem”."], "medium"),
      mc("p9c2-g13-a7", "Identifique ocorrências da primeira pessoa do plural.", I,
        "“Vamos considerar”, “podemos fazer”, “temos”, “devêssemos”, “precisamos reconhecer” e “acreditarmos”.",
        ["“Penso”, “vejo” e “vou reunir”.", "“Subestimam”, “investem” e “resistem”.", "“Educa”, “mostra” e “manifestam”."], "medium"),
      mc("p9c2-g13-a8", "Qual é o sujeito dos verbos na primeira pessoa do singular e dos que estão na primeira pessoa do plural?", I,
        "Na primeira do singular, a própria autora; na primeira do plural, a autora e os leitores, provavelmente pais e professores preocupados com a educação dos mais novos.",
        ["Na do singular, os jovens; na do plural, os políticos.", "Na do singular, os leitores; na do plural, a autora sozinha.", "Nas duas, os adolescentes que escreveram para ela."], "hard"),
      mc("p9c2-g13-a9", "Que efeito de sentido cada um desses procedimentos cria?", I,
        "A primeira do singular marca a posição da autora, fundamentada em argumentos; a do plural reproduz uma voz coletiva e envolve os leitores, mobilizando-os e convencendo-os.",
        ["Os dois deixam o texto impessoal e neutro.", "A do singular afasta o leitor; a do plural esconde a autora.", "Os dois servem apenas para citar outros autores."], "hard"),
      mc("p9c2-g13-a10", "Reescrever “Penso que a internet consegue arrancar o que há de pior em muitas pessoas” na terceira pessoa seria:", I,
        "“Pensa-se que a internet consegue arrancar o que há de pior em muitas pessoas.”",
        ["“Penso que a internet consegue arrancar o que há de pior em muitas pessoas.”", "“Pensamos que nós conseguimos arrancar o pior.”", "“Pense que a internet consiga.”"], "hard"),
      mc("p9c2-g13-a11", "Comparando o texto original ao reescrito na terceira pessoa, qual é o efeito de sentido de cada um, considerando o papel do autor de um artigo de opinião?", I,
        "A primeira pessoa destaca a voz de uma psicóloga experiente e fortalece sua posição; a terceira deixa o texto impessoal. Por isso a primeira é mais eficiente para persuadir.",
        ["A terceira pessoa é mais eficiente, pois convence sem autor.", "Os dois têm o mesmo efeito, sem diferença.", "A primeira pessoa enfraquece o texto, pois o autor se expõe."], "hard"),
    ),
  ]
);

// ---------------------------------------------------------------------------
// B7 — Artigo de opinião: argumentos, conclusão e linguagem
// ---------------------------------------------------------------------------
const b7: GrupoParcial = grupo(
  "Soluções, conclusão e linguagem do artigo",
  "Entender o foco nas soluções, o argumento principal, a conclusão e a linguagem do artigo de opinião.",
  "A autora passa do problema às soluções e rebate quem diz que educar é só da família. Vemos como ela conclui e que linguagem usa.",
  IMG_LETRAS,
  [
    ...txt("p9c2-sayao",
      mc("p9c2-g14-a1", "A partir do parágrafo iniciado pela pergunta “O que podemos fazer…?”, qual passa a ser o foco?", I,
        "O enfrentamento do problema e a discussão das possíveis soluções.",
        ["A história da internet.", "A biografia da autora.", "A venda de aplicativos."]),
      mc("p9c2-g14-a2", "Qual é o posicionamento da autora quanto à solução do problema?", I,
        "É preciso investir na formação crítica e na reflexão de crianças e jovens, o que é papel tanto das famílias quanto das escolas.",
        ["Proibir todos os jovens de usar celulares.", "Deixar tudo como está.", "Confiar só na televisão."], "medium"),
      mc("p9c2-g14-a3", "Qual é o outro posicionamento com que a autora diz se deparar com frequência?", I,
        "O de adultos que acreditam que educação moral e ética é papel da família.",
        ["O de adultos que dizem que a escola não existe.", "O de jovens que querem abandonar a escola.", "O de políticos que só falam de esportes."]),
      mc("p9c2-g14-a4", "Qual é o principal argumento da autora para se contrapor a esse outro posicionamento?", I,
        "Hoje muitos veículos e mídias (televisão, internet, publicidade) e os valores sociais educam; a família sozinha não consegue ter sucesso na formação moral dos filhos.",
        ["A família não gosta de educar.", "A escola é mais antiga que a família.", "Só a internet deve educar."], "hard"),
      mc("p9c2-g14-a5", "De que tipo é a conclusão do artigo (retomar o ponto de vista, propor solução ou provocar os leitores)?", I,
        "Muito breve: retoma o ponto de vista (acreditar no potencial dos mais novos e investir na formação deles) e provoca o leitor com “Só falta acreditarmos nisso”.",
        ["Só repete a primeira frase do texto.", "Propõe uma lei e termina.", "Não tem conclusão."], "hard"),
      mc("p9c2-g14-a6", "A linguagem do artigo de opinião lido é direta e clara ou subjetiva?", I,
        "É direta e clara.",
        ["É cheia de sentidos escondidos, difícil de entender.", "É só poética.", "É uma linguagem de código."]),
      mc("p9c2-g14-a7", "A linguagem é formal ou informal? Justifique com trechos do texto.", I,
        "Não é inteiramente formal: há trechos próximos da fala cotidiana, como “mas aí é tarde demais, porque o texto já se espalhou”.",
        ["Totalmente formal, sem nenhum trecho cotidiano.", "Cheia de gírias e abreviações em todo o texto.", "Escrita em linguagem técnica de médicos."], "medium"),
      mc("p9c2-g14-a8", "Qual variedade linguística é utilizada no artigo?", I,
        "Uma variedade próxima da norma-padrão.",
        ["Uma variedade regional carregada de gírias.", "Uma linguagem de mensagens de celular.", "Um dialeto de uma língua indígena."]),
    ),
  ]
);

// ---------------------------------------------------------------------------
// B8 — Quadro-resumo: o artigo de opinião
// ---------------------------------------------------------------------------
const b8: GrupoParcial = grupo(
  "Resumo do artigo de opinião",
  "Resumir as características do artigo de opinião: objetivo, interlocutores, temas, circulação, estrutura, linguagem e pessoa do discurso.",
  "Montamos um quadro com tudo o que vimos sobre o artigo de opinião, para usar na hora de escrever o nosso.",
  IMG_LIVRO,
  [
    mc("p9c2-g15-a1", "Qual é o objetivo do artigo de opinião?", I,
      "Defender um ponto de vista sobre um assunto, geralmente polêmico, por meio de argumentos.",
      ["Contar uma história de ficção.", "Ensinar uma receita.", "Descrever uma paisagem."]),
    mc("p9c2-g15-a2", "Quem são os interlocutores do artigo de opinião?", I,
      "O autor, que expõe sua opinião, e os leitores, que ele quer convencer.",
      ["Só os personagens de uma história.", "Apenas os editores do jornal.", "Somente os anunciantes."]),
    mc("p9c2-g15-a3", "Que temas são abordados no artigo de opinião?", I,
      "Temas muito diversos: comportamento, política, economia, esportes, etc.",
      ["Só receitas de cozinha.", "Só previsão do tempo.", "Só horóscopo."]),
    mc("p9c2-g15-a4", "Por onde o artigo de opinião circula?", I,
      "Em jornais, revistas e sites da internet.",
      ["Em bulas de remédio.", "Em placas de trânsito.", "Em embalagens de alimentos."]),
    mc("p9c2-g15-a5", "Como o artigo de opinião se estrutura?", I,
      "Introdução (assunto e posição do autor), desenvolvimento (argumentos) e conclusão, com a assinatura do autor.",
      ["Título, rimas e refrão.", "Falas de personagens em balões.", "Ingredientes e modo de preparo."]),
    mc("p9c2-g15-a6", "Como é a linguagem do artigo de opinião?", I,
      "Direta e clara; em geral segue a norma-padrão e pode ser mais ou menos formal, conforme o veículo e o público.",
      ["Sempre cheia de gírias.", "Sempre em versos.", "Sempre em códigos secretos."], "medium"),
    mc("p9c2-g15-a7", "Que pessoa do discurso predomina nos verbos e pronomes do artigo de opinião?", I,
      "Varia: pode ser a terceira (mais impessoal), a primeira do plural (parcialmente impessoal) ou a primeira do singular (pessoal).",
      ["Sempre a segunda pessoa do plural.", "Sempre a terceira pessoa do plural.", "Nenhuma pessoa: o texto não usa verbos."], "medium"),
  ]
);

export const cap2bGrupos: GrupoParcial[] = [b1, b2, b3, b4, b5, b6, b7, b8];
