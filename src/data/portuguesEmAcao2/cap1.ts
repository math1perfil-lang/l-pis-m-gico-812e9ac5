import { grupo, IMG, IMG_CRIANCAS, IMG_LETRAS, IMG_LIVRO, mc, read, txt, withImage } from "./shared";
import type { GrupoParcial } from "./shared";

// Capítulo 1 (parte final) — "As fake news e a pós-verdade": Trocando ideias, Cruzando linguagens,
// A língua em foco (período composto por coordenação), Semântica e discurso e Produção de texto (editorial).
// Cada pergunta ou item do livro virou exatamente uma atividade. Os textos foram reescritos com palavras próprias.

const I = "Toque na resposta certa";
const IMG_TIRA_FAKE = `${IMG}/c1-tira-fake.jpg`;
const IMG_TIRA_BESOURO = `${IMG}/c1-tira-besouro.jpg`;

// ---------------------------------------------------------------------------
// Grupo 1 — Pesquisa segura e a tira das fake news (Trocando ideias + tira, itens 1 e 2)
// ---------------------------------------------------------------------------
const g1: GrupoParcial = grupo(
  "Pesquisar sem cair em fake news",
  "Pensar em como pesquisar com segurança e ler uma tira sobre o compartilhamento de mensagens sem conferir.",
  "Duas amigas e um amigo recebem mensagens no celular. Quem confere antes de repassar? A tira mostra como uma notícia falsa corre solta.",
  IMG_CRIANCAS,
  [
    mc("p9c1-g1-a1", "Hoje todo mundo pesquisa na internet, mas ter muitos resultados não garante que eles sejam bons. Qual hábito ajuda mais a conseguir informações confiáveis e bem fundamentadas?", I,
      "Comparar várias fontes, ver quem escreveu e quando, e consultar também livros, artigos e entrevistas.",
      ["Confiar no primeiro resultado que aparece na busca.", "Acreditar no site que tiver mais cores e mais anúncios.", "Escolher o texto que concorda com o que eu já penso."], "medium"),
    mc("p9c1-g1-a2", "Na entrevista, a pesquisadora diz que quem usa redes sociais deve ter postura crítica e ética. O que é ter uma postura ética no mundo digital?", I,
      "Não espalhar informação sem ter certeza de que é verdadeira e não expor dados nem a imagem de outras pessoas.",
      ["Postar tudo o que chega, para os amigos ficarem bem informados.", "Apagar as mensagens dos outros para ninguém discordar.", "Só usar as redes à noite, quando há menos gente."], "medium"),
    mc("p9c1-g1-a3", "Antes de compartilhar uma postagem, qual atitude mostra que a pessoa a avalia com cuidado?", I,
      "Conferir a fonte e pensar nas consequências antes de apertar o botão de compartilhar.",
      ["Compartilhar logo, porque a mensagem pede para repassar.", "Compartilhar se muitos amigos já curtiram.", "Compartilhar se o título for chamativo."]),
    withImage(read(
      "p9c1-tira1",
      "Correria das fake news",
      [
        "Tira em 3 quadrinhos. Duas pessoas jovens olham o celular: a Ana, de cabelo preso com uma presilha verde, e o Rafa, de gorro laranja.",
        "Quadrinho 1. Ana: “Recebi um aviso sobre economizar água.” Rafa: “No meu, dizem que falar palavrão faz bem à saúde!”",
        "Quadrinho 2. Ana: “Fui conferir: o aviso é verdadeiro! Vou mandar para a minha mãe.” Rafa: “Eu já mandei o meu para mais de mil pessoas!”",
        "Quadrinho 3. Ana: “Mas o seu está com cara de fake news!” Rafa: “Que nada! Só de espalhar eu já me sinto mais saudável!”",
      ]
    ), IMG_TIRA_FAKE, "Tira: dois jovens trocam mensagens no celular"),
    ...txt("p9c1-tira1",
      withImage(mc("p9c1-g1-a4", "Com base no primeiro quadrinho, qual das mensagens recebidas parece ser fake news?", I,
        "A do Rafa, que diz que falar palavrão faz bem à saúde, porque a ideia soa estranha e sem prova.",
        ["A da Ana, porque falar de água é assunto de escola.", "As duas, só porque chegaram pelo celular.", "Nenhuma, porque todas as mensagens de celular são verdadeiras."]), IMG_TIRA_FAKE, "Tira: dois jovens trocam mensagens no celular"),
      mc("p9c1-g1-a5", "A outra mensagem (sobre economizar água) também poderia ser fake news? Em que se baseia essa conclusão?", I,
        "Sim, qualquer mensagem pode ser falsa; só dá para saber conferindo a fonte e outras informações.",
        ["Não, porque mensagens sobre água nunca são falsas.", "Não, porque quem manda é sempre amigo e amigo não mente.", "Sim, mas só se ela tiver muitos emojis."], "medium"),
      mc("p9c1-g1-a6", "Comparando os dois, qual toma a decisão mais adequada?", I,
        "A Ana, porque confere a mensagem e a envia só para a mãe.",
        ["O Rafa, porque divulga a mensagem para muita gente.", "Os dois, porque os dois repassaram a mensagem.", "Nenhum, porque ninguém deveria usar o celular."]),
      mc("p9c1-g1-a7", "De que maneira a Ana provavelmente conferiu se a informação era verdadeira?", I,
        "Consultando outra fonte na internet ou um site que checa notícias.",
        ["Perguntando ao Rafa se ele achava verdade.", "Contando quantas pessoas já tinham repassado.", "Lendo só o título da mensagem."]),
      mc("p9c1-g1-a8", "Que maneira de checar se uma informação é verdadeira é a mais segura?", I,
        "Procurar a mesma notícia em veículos confiáveis e em sites de checagem de fatos.",
        ["Perguntar no grupo da turma se alguém já viu.", "Ver se a mensagem usa muitas letras maiúsculas.", "Confiar na mensagem se ela terminar com “repasse!”."]),
      mc("p9c1-g1-a9", "Por que a atitude do Rafa, que repassa a mensagem sem avaliar se é verdadeira, pode ser um problema?", I,
        "Porque a informação falsa pode prejudicar alguém e se espalha para muita gente.",
        ["Porque gasta a bateria do celular da amiga.", "Porque mensagens longas são chatas de ler.", "Porque ninguém pode usar o celular na rua."]),
    ),
  ]
);

// ---------------------------------------------------------------------------
// Grupo 2 — A tira: humor, crítica e objetivos (itens 3 a 8)
// ---------------------------------------------------------------------------
const g2: GrupoParcial = grupo(
  "O humor da tira e a entrevista",
  "Entender por que a tira é engraçada, quem favorece as fake news e qual é o objetivo de cada texto.",
  "Releitura da tira: o que faz a Ana desconfiar, quem espalha a mentira e qual é a graça do último quadrinho. Depois, comparamos a tira com a entrevista da pesquisadora.",
  IMG_LETRAS,
  [
    read("p9c1-g2-leitura", "Duas falas da entrevista", [
      "Para comparar com a tira, releia duas ideias da pesquisadora Pollyana Ferrari, contadas com palavras nossas.",
      "Ideia 1: quando alguém espalha uma mentira para prejudicar outra pessoa, perde a noção do tamanho do estrago; depois que ela se espalha, até dá para tirá-la do ar, mas às vezes o dano já não tem volta.",
      "Ideia 2: muitas vezes as pessoas até sabem que uma informação é falsa, mas, como ela combina com o que desejam, acabam compartilhando.",
      "Ideia 3: uma informação mentirosa pode destruir a vida de alguém, uma reputação, uma empresa, uma escola, uma família.",
    ], "Baseado na entrevista de Pollyana Ferrari à revista Carta Capital, 17 abr. 2018."),
    ...txt("p9c1-tira1",
      withImage(mc("p9c1-g2-a1", "No último quadrinho, a Ana diz: “Mas o seu está com cara de fake news!”. O que a faz desconfiar da mensagem do Rafa?", I,
        "Ela acha improvável que falar palavrão faça bem à saúde.",
        ["Ela não gosta do Rafa e quer implicar com ele.", "Ela percebeu que a mensagem estava em outra língua.", "Ela viu que o celular do Rafa era mais antigo."]), IMG_TIRA_FAKE, "Tira: dois jovens trocam mensagens no celular"),
      mc("p9c1-g2-a2", "A tira contrapõe comportamentos para mostrar como circulam as fake news nas redes. Qual personagem favorece essa circulação e por quê?", I,
        "O Rafa, porque envia a mensagem para mais de mil pessoas sem checar se é verdadeira.",
        ["A Ana, porque confere a mensagem antes de repassar.", "A mãe da Ana, porque recebe a mensagem.", "Nenhum dos dois, porque as fake news nascem sozinhas."], "medium"),
      mc("p9c1-g2-a3", "O que surpreende o leitor e provoca o humor da tira?", I,
        "O Rafa se sentir mais saudável só por espalhar a mensagem, seja ela falsa ou verdadeira.",
        ["O Rafa tirar o gorro no último quadrinho.", "A Ana desistir de usar o celular.", "O fim da tira mostrar que a mensagem era sobre futebol."], "medium"),
      mc("p9c1-g2-a4", "Imagine que você fez a experiência: pesquisou na internet a mensagem que o Rafa recebeu. Qual resultado é o mais provável?", I,
        "Aparecem reportagens explicando que xingar em momentos de dor ou de tensão pode ajudar a aliviar as emoções.",
        ["Não aparece nada sobre o assunto em lugar nenhum.", "Todas as páginas dizem que palavrão cura qualquer doença.", "Aparecem só mensagens pedindo para repassar para mais de mil pessoas."], "medium"),
      mc("p9c1-g2-a5", "Considerando esse resultado, a mensagem do Rafa deve ser entendida como fake news?", I,
        "Depende: é preciso olhar a fonte, o método da pesquisa e o contexto, sem exagerar nem espalhar sem pensar.",
        ["Sim, porque qualquer mensagem sobre saúde é falsa.", "Não, porque se aparece na internet já é verdade.", "Não, porque quanto mais gente repassa, mais verdadeira fica."], "hard"),
      mc("p9c1-g2-a6", "Se o Rafa tivesse pesquisado antes de compartilhar, a atitude dele passaria a ser mais “crítica e ética”?", I,
        "Sim, desde que, além de pesquisar, ele conferisse as fontes e pensasse se valia a pena enviar a mais de mil pessoas.",
        ["Sim, porque pesquisar rápido já resolve tudo.", "Não, porque pesquisar na internet nunca adianta.", "Não, porque uma mensagem verdadeira nunca precisa de cuidado."], "hard"),
    ),
    ...txt("p9c1-g2-leitura",
      mc("p9c1-g2-a7", "A tira e a entrevista são gêneros diferentes. Que semelhança há entre os dois textos?", I,
        "Os dois abordam o tema das fake news.",
        ["Os dois são poemas sobre o amor.", "Os dois contam a história de uma viagem.", "Os dois ensinam uma receita de bolo."]),
      mc("p9c1-g2-a8", "Qual das ideias da entrevista ilustra o comportamento do Rafa na tira?", I,
        "A ideia 2: a pessoa até percebe que a informação é falsa, mas a compartilha porque combina com o que ela quer.",
        ["A ideia 1: o estrago da mentira se perde de vista.", "A ideia 3: a mentira destrói reputações.", "Nenhuma das ideias."], "hard"),
    ),
    ...txt("p9c1-tira1",
      mc("p9c1-g2-a9", "Quais objetivos comunicativos combinam com cada texto? I. A tira quer mostrar, com humor, que não existem fake news. II. A entrevista usa o conhecimento da pesquisadora para alertar sobre fake news e levar o leitor a agir com responsabilidade. III. A entrevista fala de fake news, mas não ajuda o leitor a refletir. IV. A tira critica, com humor, quem compartilha mensagens sem verificar se são confiáveis.", I,
        "Apenas II e IV.",
        ["Apenas I e III.", "Apenas I e II.", "Apenas III e IV."], "medium"),
    ),
  ]
);

// ---------------------------------------------------------------------------
// Grupo 3 — O cartaz contra as fake news + período composto por coordenação (Construindo o conceito)
// ---------------------------------------------------------------------------
const g3: GrupoParcial = grupo(
  "Se é fake, não é notícia",
  "Analisar um cartaz de campanha contra notícias falsas e começar a estudar o período composto por coordenação.",
  "Um cartaz com um celular chama a atenção para as notícias falsas. Em seguida, olhamos duas frases da entrevista para descobrir quando um período é simples ou composto.",
  IMG_LIVRO,
  [
    read("p9c1-g3-cartaz", "Cartaz da campanha contra fake news", [
      "Imagine um cartaz de uma campanha de órgão público contra as notícias falsas. À esquerda, a hashtag “fake news não” aparece em letras enormes sobre uma colagem de papéis rasgados, que lembram jornal impresso e outdoor.",
      "À direita, um celular inclinado ocupa o centro, e sobre ele há a frase “Se é fake, não é news”, acompanhada de um sinal de verificado. Embaixo, aparece o logotipo da instituição que promove a campanha.",
    ]),
    ...txt("p9c1-g3-cartaz",
      mc("p9c1-g3-a1", "Toda peça de propaganda procura convencer o público a aderir a uma ideia. Qual é a ideia dessa peça?", I,
        "Combater as fake news, ou seja, as notícias falsas.",
        ["Vender um celular novo.", "Divulgar um jornal impresso.", "Convidar as pessoas para uma festa."]),
      mc("p9c1-g3-a2", "Além do texto, um telefone celular se destaca no cartaz. Como ele se relaciona com a ideia geral da peça?", I,
        "O celular é um meio onde as informações circulam e onde as fake news costumam se espalhar.",
        ["O celular mostra que a campanha é só para quem não tem internet.", "O celular indica que o cartaz foi feito sem computador.", "O celular não tem relação nenhuma com a ideia da peça."], "medium"),
      mc("p9c1-g3-a3", "“Se é fake, não é news.” O que significam as palavras da língua inglesa nessa frase e qual é a condição que ela estabelece?", I,
        "Fake quer dizer falsa e news quer dizer notícia; se a informação é falsa, ela não pode ser considerada notícia.",
        ["Fake quer dizer rápida e news quer dizer nova; se é rápida, é nova.", "Fake quer dizer grande e news quer dizer jornal; se é grande, é jornal.", "Fake quer dizer verdadeira e news quer dizer boato; se é verdadeira, é boato."], "medium"),
      mc("p9c1-g3-a4", "Como o cartaz se relaciona com a entrevista do capítulo e com a tira estudada?", I,
        "Os três textos chamam a atenção do leitor para o combate às notícias falsas, cada um de um jeito.",
        ["O cartaz ensina a usar o celular e os outros dois ensinam a escrever poemas.", "O cartaz defende as fake news e os outros dois as criticam.", "Não há relação: cada um fala de um assunto diferente."], "medium"),
    ),
    read("p9c1-g3-trechos", "Duas frases para analisar", [
      "Frase I: As fake news sempre existiram. Há registros de jornais falsos desde a Roma Antiga.",
      "Frase II: Não estou falando de opinião política, mas de etapas de apuração.",
    ], "Baseado na entrevista de Pollyana Ferrari à revista Carta Capital, 17 abr. 2018."),
    ...txt("p9c1-g3-trechos",
      mc("p9c1-g3-a5", "Que trecho está organizado em períodos simples?", I,
        "O trecho I, que tem dois períodos simples.",
        ["O trecho II, que tem dois períodos simples.", "Os dois trechos têm só períodos compostos.", "Nenhum dos dois trechos tem períodos."]),
      mc("p9c1-g3-a6", "Que trecho é organizado em período composto por coordenação?", I,
        "O trecho II.",
        ["O trecho I.", "Os dois trechos.", "Nenhum dos dois trechos."]),
      mc("p9c1-g3-a7", "Na frase II, que tipo de relação a conjunção mas estabelece entre as orações?", I,
        "Relação de oposição.",
        ["Relação de adição.", "Relação de conclusão.", "Relação de explicação."]),
      mc("p9c1-g3-a8", "Transforme o trecho I em um período composto, escolhendo a conjunção mais adequada ao sentido do texto. Qual opção fica melhor?", I,
        "As fake news sempre existiram, e há registros de jornais falsos desde a Roma Antiga.",
        ["As fake news sempre existiram, portanto há registros de jornais falsos desde a Roma Antiga.", "As fake news sempre existiram, mas há registros de jornais falsos desde a Roma Antiga.", "As fake news sempre existiram, ou há registros de jornais falsos desde a Roma Antiga."], "medium"),
      mc("p9c1-g3-a9", "Na frase II, a conjunção mas introduz uma oração cujo verbo está subentendido (em elipse). Qual é essa forma verbal?", I,
        "“Estou falando”.",
        ["“Não estou”.", "“Etapas”.", "“Apuração”."], "medium"),
      mc("p9c1-g3-a10", "Na frase II, que elementos a conjunção mas indica que estão em oposição?", I,
        "Opinião política e etapas de apuração.",
        ["Não estou e estou falando.", "Falando e etapas.", "Política e opinião."], "medium"),
    ),
  ]
);

// ---------------------------------------------------------------------------
// Grupo 4 — Orações coordenadas sindéticas e assindéticas (Conceituando + Exercícios)
// ---------------------------------------------------------------------------
const g4: GrupoParcial = grupo(
  "Orações coordenadas",
  "Reconhecer orações coordenadas assindéticas e sindéticas e o sentido das conjunções que as ligam.",
  "Duas orações independentes podem ficar lado a lado, com ou sem conjunção. Vemos as cinco relações possíveis: adição, oposição, alternância, conclusão e explicação.",
  IMG_LETRAS,
  [
    read("p9c1-g4-conceito", "Período composto por coordenação", [
      "Um período composto tem mais de uma oração, e cada oração tem um verbo. Quando as orações são independentes entre si, isto é, uma não faz parte da outra, o período é composto por coordenação.",
      "Oração coordenada assindética é a que não vem introduzida por conjunção. Oração coordenada sindética é a que vem introduzida por conjunção.",
      "As sindéticas se classificam pelo sentido: aditivas (ideia de soma; e, nem), adversativas (oposição; mas, porém, todavia, no entanto), alternativas (escolha; ou, ora… ora, quer… quer), conclusivas (consequência; logo, portanto, por isso) e explicativas (motivo; porque, pois, que).",
      "Exemplos: “Adoro cinema e sempre vejo filmes de arte” (aditiva); “Gostaria de viajar, mas não tenho dinheiro” (adversativa); “Vou ao cinema ou vou dormir cedo?” (alternativa); “Estou com febre, por isso não vou ao clube” (conclusiva); “Não demore, porque sua mãe fica preocupada” (explicativa).",
    ]),
    withImage(read(
      "p9c1-besouro",
      "Tira: o lugar seguro",
      [
        "Tira em 3 quadrinhos, com personagens que são pequenos insetos.",
        "Quadrinho 1. Um besouro olha para um grande sapato de bico fino. Legenda: “Sapato de bico fino é o terror dos besouros...”",
        "Quadrinho 2. Legenda: “mas existe um lugar seguro.”",
        "Quadrinho 3. Dentro do sapato, na ponta do bico, onde os dedos do pé não chegam, o besouro descansa tranquilo.",
      ]
    ), IMG_TIRA_BESOURO, "Tira: um besouro e um sapato de bico fino"),
    ...txt("p9c1-besouro",
      mc("p9c1-g4-a1", "Observe o período formado pelas legendas do primeiro e do segundo quadrinho. Como ele fica dividido em orações?", I,
        "“Sapato de bico fino é o terror dos besouros” / “mas existe um lugar seguro”.",
        ["“Sapato de bico fino” / “é o terror dos besouros mas existe um lugar seguro”.", "“Sapato” / “de bico fino é o terror” / “dos besouros” / “mas existe um lugar seguro”.", "“Sapato de bico fino é o terror dos besouros mas existe” / “um lugar seguro”."], "medium"),
      mc("p9c1-g4-a2", "Quantas orações há nesse período?", I,
        "Duas.",
        ["Uma.", "Três.", "Quatro."]),
      mc("p9c1-g4-a3", "Quais são as orações desse período?", I,
        "Primeira: “Sapato de bico fino é o terror dos besouros”; segunda: “mas existe um lugar seguro”.",
        ["Primeira: “mas existe um lugar seguro”; segunda: “o terror dos besouros”.", "Primeira: “Sapato de bico fino”; segunda: “é o terror dos besouros”.", "Primeira: “Sapato de bico fino é o terror”; segunda: “dos besouros”."], "medium"),
      mc("p9c1-g4-a4", "As orações desse período estão ligadas por uma conjunção. Qual é ela?", I,
        "A conjunção mas.",
        ["A conjunção e.", "A conjunção ou.", "A conjunção porque."]),
      mc("p9c1-g4-a5", "Que relação a conjunção mas estabelece entre as orações, considerando o sentido da frase?", I,
        "Oposição: o que é perigoso para os besouros (o sapato) acaba sendo um lugar seguro visto de outro jeito.",
        ["Adição: soma duas ideias parecidas.", "Alternância: o besouro escolhe entre duas coisas.", "Explicação: a segunda oração dá o motivo da primeira."], "medium"),
      mc("p9c1-g4-a6", "Como se classificam as orações que formam esse período?", I,
        "A primeira é coordenada assindética e a segunda é coordenada sindética adversativa.",
        ["As duas são coordenadas assindéticas.", "A primeira é sindética aditiva e a segunda, assindética.", "A primeira é subordinada e a segunda, coordenada conclusiva."], "medium"),
      mc("p9c1-g4-a7", "O humor da tira vem da surpresa do último quadrinho. Que surpresa é essa?", I,
        "O besouro se esconde na pontinha do sapato de bico fino, onde os dedos do pé não chegam; o que parecia perigo vira abrigo.",
        ["O besouro pisa no sapato e o amassa.", "O sapato some e o besouro fica perdido.", "O besouro vira um sapato de bico fino."], "medium"),
    ),
    read("p9c1-g4-trecho", "Quem produz fake news?", [
      "Em outro trecho da entrevista, a pesquisadora diz que existem escritórios e grupos que ganham dinheiro com as fake news, mas eles respondem por cerca de 30% da circulação de informações falsas. A maior parte vem de pessoas comuns que espalham pequenas mentiras, movidas por ódio a quem pensa diferente, ou conteúdos que perseguem grupos ou indivíduos, como o vazamento de fotos para fazer bullying.",
    ], "Baseado na entrevista de Pollyana Ferrari à revista Carta Capital, 17 abr. 2018."),
    ...txt("p9c1-g4-trecho",
      mc("p9c1-g4-a8", "Observe a conjunção mas no trecho: “Existem escritórios e grupos que ganham dinheiro com as fake news, mas eles respondem por 30% da circulação de informações falsas”. Que orações ela liga?", I,
        "“Existem escritórios e grupos que ganham dinheiro com as fake news” e “eles respondem por 30% da circulação de informações falsas”.",
        ["“A maior parte vem de pessoas comuns” e “movidas por ódio”.", "“Existem escritórios” e “grupos”.", "“Ganham dinheiro” e “fake news”."], "medium"),
      mc("p9c1-g4-a9", "Nesse contexto, o mas não opõe as duas orações diretamente: opõe a primeira a uma conclusão que se tira da segunda. Qual é essa conclusão?", I,
        "Esses escritórios não são os maiores produtores de fake news.",
        ["Esses escritórios veiculam informações falsas.", "Esses escritórios produzem conteúdos inapropriados.", "Esses escritórios são os maiores produtores de fake news."], "hard"),
    ),
  ]
);

// ---------------------------------------------------------------------------
// Grupo 5 — Semântica e discurso: o funil dos boatos (itens 1 e 2)
// ---------------------------------------------------------------------------
const g5: GrupoParcial = grupo(
  "Como não cair em boatos",
  "Analisar uma campanha do Senado contra boatos de internet, relacionando texto e imagem.",
  "Um funil com cinco dicas ajuda a decidir se vale compartilhar uma notícia. Vemos o público, o tom e os verbos no imperativo.",
  IMG_LIVRO,
  [
    read("p9c1-g5-funil", "Como não cair em boatos de internet", [
      "Imagine uma peça de campanha contra notícias falsas, feita pelo Senado Federal para as redes sociais. O título diz: “Como não cair em boatos de internet”.",
      "No centro, há um funil dividido em cinco faixas, com dicas: “Confira a fonte da notícia”; “Use o bom senso e seja um pouco cético em relação ao que lê”; “Leia a notícia completa”; “Veja se não é notícia velha”; “Não caia no alarmismo”. Abaixo do funil, em letras grandes: “Ficou em dúvida? Não compartilhe!”.",
      "Em quadros coloridos ao lado, cada dica é explicada. Um deles diz que há páginas especializadas em inventar boatos e que é preciso evitá-las. Outro avisa que às vezes o título é distorcido só para chamar a atenção, e que, ao ler, “não é nada daquilo”. Outro, com o título “BOMBA!”, lembra que notícias em tom alarmista não costumam ser verdadeiras. Um quadro diz que algumas notícias são verdadeiras, mas estão desatualizadas. Cada quadro é ligado à sua faixa do funil por um traço e pela mesma cor.",
    ]),
    ...txt("p9c1-g5-funil",
      mc("p9c1-g5-a1", "Qual é a finalidade dessa peça de campanha?", I,
        "Ensinar a não ser enganado por notícias falsas da internet.",
        ["Vender uma assinatura de jornal.", "Anunciar um evento no Senado.", "Divulgar um jogo para celular."]),
      mc("p9c1-g5-a2", "Qual é o público-alvo da campanha?", I,
        "Os usuários da internet em geral.",
        ["Só os senadores.", "Apenas os jornalistas.", "Somente os professores."]),
      mc("p9c1-g5-a3", "O que pode justificar o interesse do Senado Federal em tratar de “boatos de internet”?", I,
        "Instituições públicas, sobretudo as ligadas à política, são alvo frequente de notícias falsas e podem perder a credibilidade; por isso querem desmascará-las.",
        ["O Senado vende produtos pela internet.", "O Senado quer proibir o uso de redes sociais.", "O Senado não tem interesse nenhum: foi só uma brincadeira."], "medium"),
      mc("p9c1-g5-a4", "Expressões como “não cair”, “não é nada daquilo”, “BOMBA!” e “bizarra” remetem a um contexto de maior ou de menor formalidade? Que efeito produzem?", I,
        "De menor formalidade; criam proximidade com o público-alvo.",
        ["De maior formalidade; criam distância e seriedade.", "De maior formalidade; dão ar de lei oficial.", "De menor formalidade; mostram que o autor não sabe escrever."], "medium"),
      mc("p9c1-g5-a5", "Que outras expressões poderiam substituir “boatos de internet”, e por que se preferiu essa?", I,
        "“Notícias falsas” ou “fake news”; “boatos de internet” soa mais informal, evita o estrangeirismo e atinge um público maior.",
        ["“Documentos oficiais”; porque é mais difícil de entender.", "“Receitas da internet”; porque é mais curto.", "“Poemas virtuais”; porque é mais bonito."], "medium"),
      mc("p9c1-g5-a6", "O que o desenho central da peça representa?", I,
        "Um funil.",
        ["Uma árvore.", "Um relógio.", "Uma montanha."]),
      mc("p9c1-g5-a7", "Nas frases do funil, como “confira”, “use”, “seja”, “leia”, “veja” e “não caia”, em que modo está a maioria dos verbos e qual é a função dele na peça?", I,
        "No modo imperativo, para aconselhar e dar dicas ao leitor.",
        ["No modo indicativo, para contar fatos do passado.", "No modo subjuntivo, para expressar dúvidas.", "No infinitivo, para dar nome às coisas."], "medium"),
      mc("p9c1-g5-a8", "Sem mudar o sentido, como transformar “Ficou em dúvida? Não compartilhe!” em um período composto por coordenação e como se classifica a oração coordenada criada?", I,
        "“Ficou em dúvida; então não compartilhe”: oração coordenada sindética conclusiva.",
        ["“Ficou em dúvida, mas compartilhe”: coordenada sindética adversativa.", "“Ficou em dúvida e compartilhe”: coordenada sindética aditiva.", "“Ficou em dúvida porque compartilhe”: coordenada sindética explicativa."], "hard"),
      mc("p9c1-g5-a9", "Qual é a relação entre o desenho do funil, as frases dentro dele e o enunciado “Ficou em dúvida? Não compartilhe!”?", I,
        "O funil dá a ideia de que, quanto mais a pessoa se questiona, mais fácil fica descobrir se a notícia é verdadeira; assim, ao passar pelas dicas, ela decide se vale divulgar.",
        ["O funil mostra que toda notícia deve ser compartilhada.", "O funil serve só de enfeite e não se relaciona com o texto.", "O funil indica que notícias velhas são sempre melhores."], "hard"),
    ),
  ]
);

// ---------------------------------------------------------------------------
// Grupo 6 — Semântica e discurso: conjunções (itens 3 a 5)
// ---------------------------------------------------------------------------
const g6: GrupoParcial = grupo(
  "Conjunções em ação",
  "Completar frases com a conjunção adequada e classificar orações coordenadas.",
  "Mas, porém, entretanto, nem, ou… ou: cada conjunção muda o sentido da frase. Praticamos com as dicas do funil dos boatos.",
  IMG_LETRAS,
  [
    ...txt("p9c1-g5-funil",
      mc("p9c1-g6-a1", "Que elementos não verbais ligam cada quadro colorido à faixa do funil que ele explica?", I,
        "Um traço e a cor.",
        ["Uma seta vermelha e um número.", "Uma foto e uma legenda.", "Um balão de fala e um emoji."]),
    ),
    mc("p9c1-g6-a2", "Complete as frases com a conjunção adequada: I. A notícia é absurda; ___, não deve ser verdadeira. II. Leia a notícia completa ___ observe se ela não é velha. III. Não vamos cair no alarmismo, ___ notícias em tom alarmista geralmente são mentirosas. IV. Há páginas que inventam boatos; ___, devemos estar atentos. V. ___ cheque as fontes, ___ não compartilhe.", I,
      "I logo/então; II e; III pois/porque; IV por isso/portanto; V ou… ou.",
      ["I mas; II ou; III logo; IV porque; V e… e.", "I porque; II mas; III então; IV ou; V nem… nem.", "I e; II logo; III mas; IV pois; V porém… porém."], "hard"),
    mc("p9c1-g6-a3", "Classifique as orações que você completou no item anterior (I a V), nessa ordem.", I,
      "I conclusiva; II aditiva; III explicativa; IV conclusiva; V alternativa.",
      ["I explicativa; II adversativa; III conclusiva; IV aditiva; V alternativa.", "I adversativa; II alternativa; III aditiva; IV explicativa; V conclusiva.", "I aditiva; II conclusiva; III alternativa; IV adversativa; V explicativa."], "hard"),
    read("p9c1-g6-bola", "Conjunções que mudam de lugar", [
      "A conjunção mas só pode ficar no início da oração. Já outras adversativas, como porém, contudo e entretanto, aceitam mais de uma posição. Veja uma notícia de futebol: “O time chegou ao estádio em desvantagem, após perder por 1 a 0 fora de casa. Entretanto, com um segundo tempo muito forte, fez 3 a 0”. Também seria possível escrever: “Com um segundo tempo muito forte, entretanto, o time fez 3 a 0”.",
    ]),
    ...txt("p9c1-g5-funil",
      mc("p9c1-g6-a4", "No texto da campanha do Senado, há um período composto por coordenação com oração adversativa. Qual é ele e que conjunção adversativa foi usada?", I,
        "“Algumas notícias são verdadeiras, mas estão desatualizadas”; conjunção mas.",
        ["“Ficou em dúvida? Não compartilhe!”; conjunção não.", "“Leia a notícia completa”; conjunção leia.", "“Há páginas especializadas em inventar boatos”; conjunção em."], "medium"),
    ),
    mc("p9c1-g6-a5", "Reescreva o período “Algumas notícias são verdadeiras, mas estão desatualizadas” com uma conjunção adversativa que aceite mais de uma posição. Qual opção está correta?", I,
      "Algumas notícias são verdadeiras; estão, porém, desatualizadas.",
      ["Algumas notícias são verdadeiras; estão, mas, desatualizadas.", "Algumas notícias, mas, são verdadeiras e estão desatualizadas.", "Mas algumas notícias são verdadeiras; estão desatualizadas."], "hard"),
    mc("p9c1-g6-a6", "A palavra nem tem em geral o mesmo sentido de “e + não”. Por que são comuns frases com “e nem”, como “Notícias alarmistas não costumam ser verdadeiras e nem ajudam a resolver problemas”?", I,
      "Porque o “e nem” dá mais ênfase à ideia apresentada.",
      ["Porque “e nem” é a única forma correta de usar o nem.", "Porque “e nem” transforma a frase em pergunta.", "Porque “e nem” indica oposição entre as orações."], "medium"),
    mc("p9c1-g6-a7", "Escolha duas frases das dicas e, usando nem, forme um período composto coerente com a campanha. Qual opção está certa?", I,
      "Não divulgue dados sem fonte nem compartilhe boatos.",
      ["Divulgue dados sem fonte nem compartilhe boatos.", "Leia toda a notícia nem compartilhe boatos.", "Use o bom senso nem leia toda a notícia."], "hard"),
  ]
);

// ---------------------------------------------------------------------------
// Grupo 7 — Editorial: leitura e estudo (1 e 2)
// ---------------------------------------------------------------------------
const g7: GrupoParcial = grupo(
  "Editorial: tema e estrutura",
  "Ler um editorial sobre fake news e identificar tema, ponto de vista, introdução, tese, desenvolvimento e conclusão.",
  "O editorial é o texto que expressa a opinião de um jornal. Vamos ler um e descobrir onde está a ideia principal e como ela é defendida.",
  IMG_LIVRO,
  [
    read("p9c1-g7-editorial", "Senso crítico e fake news (editorial)", [
      "1. A preocupação com as fake news, ou notícias falsas, é um dos grandes desafios do mundo atual e ganhou dimensão enorme com a internet. A divulgação de informação não é mais restrita aos profissionais e às empresas de comunicação.",
      "2. Hoje, publicar textos, vídeos e fotos está ao alcance de qualquer pessoa. Se isso facilita o acesso e democratiza a informação, também pode gerar conteúdos falsos, criados com a criminosa intenção de destruir reputações e levar a sociedade a erros irreparáveis.",
      "3. O tema foi tratado em uma reportagem do jornal na coluna “Educare”. O texto considera os estudantes vulneráveis às notícias falsas, porque usam a internet como parte do conteúdo pedagógico. É enorme o risco de encontrarem mentiras no mundo virtual.",
      "4. Por isso, recai sobre os professores parte da responsabilidade de alertar os alunos sobre o universo digital de notícias.",
      "5. Um historiador e professor de ensino superior e médio propõe caminhos: “Aprender a raciocinar, conhecer os fatos com base científica e ter senso crítico é muito importante”.",
      "6. Ele acredita que essas habilidades ajudam o aluno a desenvolver a capacidade de discernir as notícias falsas que aparecem nas redes sociais.",
      "7. Em contrapartida, as fake news reforçam a necessidade de valorizar um jornalismo que busque a verdade e siga valores éticos e democráticos. A sociedade precisa, cada vez mais, de uma imprensa séria, independente e que inspire confiança. O tema, portanto, não se limita à educação: alcança todos os setores comprometidos com o interesse de quem lê notícias.",
      "8. Um reitor de uma faculdade de jornalismo dos Estados Unidos, em visita ao Brasil, afirmou que os jornalistas precisam se disciplinar para adotar métodos de verificação de conteúdo digital. Segundo ele, às vezes são criadas campanhas com imagens ou notícias falsas na esperança de que a imprensa as repasse e as legitime.",
      "9. A importância do assunto ganha novos contornos em ano de eleições. A mesma atenção dada às fake news deve valer na avaliação dos candidatos, pois maus políticos usam métodos parecidos para enganar o cidadão com promessas vazias. Cabe aos eleitores, com senso crítico, escolher candidatos sérios e rejeitar os maus políticos.",
    ], "Baseado no editorial “Senso crítico e ‘fake news’”, Cruzeiro do Sul, Sorocaba, 29 jan. 2018."),
    ...txt("p9c1-g7-editorial",
      mc("p9c1-g7-a1", "Um editorial manifesta o ponto de vista do jornal sobre determinado tema. Qual é o tema desse editorial?", I,
        "As fake news, ou notícias falsas.",
        ["A reforma de uma escola.", "A importância dos esportes.", "As festas de fim de ano."]),
      mc("p9c1-g7-a2", "Qual é o ponto de vista do jornal a respeito do tema?", I,
        "A internet democratizou o acesso à informação e à sua produção, mas também permitiu criar conteúdos falsos que podem destruir reputações e enganar a sociedade.",
        ["A internet só trouxe vantagens e nenhum problema.", "Só os jornais impressos dizem a verdade.", "As fake news não afetam as pessoas."], "medium"),
      mc("p9c1-g7-a3", "Em que parágrafo o posicionamento do jornal fica explícito?", I,
        "No segundo parágrafo.",
        ["No primeiro parágrafo.", "No quarto parágrafo.", "No último parágrafo."]),
      mc("p9c1-g7-a4", "A que se deve a relevância do tema do ponto de vista público?", I,
        "As notícias falsas podem influenciar as campanhas eleitorais, inflamando eleitores com informações inverídicas.",
        ["Elas só interessam a quem trabalha em jornal.", "Elas aumentam o preço dos celulares.", "Elas servem apenas para divertir as pessoas."], "medium"),
      mc("p9c1-g7-a5", "Em que parágrafos o editorial constrói a introdução?", I,
        "No primeiro e no segundo parágrafos.",
        ["Do terceiro ao oitavo parágrafos.", "Apenas no último parágrafo.", "No quinto e no sexto parágrafos."]),
      mc("p9c1-g7-a6", "Em que parágrafo é possível identificar a tese defendida, ou a ideia principal?", I,
        "No segundo parágrafo: “Se isso facilita o acesso e democratiza a informação, também pode gerar conteúdos falsos”.",
        ["No quinto parágrafo, na fala do historiador.", "No oitavo parágrafo, sobre os candidatos.", "No terceiro parágrafo, sobre a coluna “Educare”."], "medium"),
      mc("p9c1-g7-a7", "Que parágrafos apresentam o desenvolvimento da argumentação?", I,
        "Do terceiro ao oitavo parágrafos.",
        ["Apenas o primeiro e o segundo.", "Apenas o nono.", "Do primeiro ao quinto."]),
      mc("p9c1-g7-a8", "Que parágrafo corresponde à conclusão?", I,
        "O último parágrafo.",
        ["O primeiro parágrafo.", "O terceiro parágrafo.", "O quinto parágrafo."]),
    ),
  ]
);

// ---------------------------------------------------------------------------
// Grupo 8 — Editorial: argumentos, discurso, conclusão e linguagem (3 a 6)
// ---------------------------------------------------------------------------
const g8: GrupoParcial = grupo(
  "Argumentos e linguagem do editorial",
  "Identificar argumentos, argumento de autoridade, discurso direto e indireto, tipo de conclusão e a linguagem impessoal do editorial.",
  "Um bom editorial defende uma tese com argumentos e vozes de especialistas. Observamos também a linguagem: formal, impessoal e em terceira pessoa.",
  IMG_LETRAS,
  [
    ...txt("p9c1-g7-editorial",
      mc("p9c1-g8-a1", "Que argumentos o editorial apresenta em relação ao papel da educação no enfrentamento do problema?", I,
        "Com base em uma reportagem do próprio jornal, os estudantes estão vulneráveis a notícias falsas, pois usam a internet como recurso pedagógico; por isso, os professores têm a responsabilidade de alertá-los.",
        ["Os estudantes devem ser proibidos de usar a internet.", "Os professores não têm nenhuma responsabilidade.", "As escolas devem apenas usar jornais impressos."], "medium"),
      mc("p9c1-g8-a2", "Que argumento de autoridade é usado para defender medidas contra as fake news na educação?", I,
        "A fala do historiador e professor, que defende raciocinar, conhecer os fatos e ter senso crítico.",
        ["A fala de um jogador de futebol.", "A fala do dono do jornal.", "A fala de um cantor famoso."], "medium"),
      mc("p9c1-g8-a3", "A que outro setor, além da educação, a adoção de medidas contra as fake news diz respeito, e por que esse setor é relevante?", I,
        "Ao jornalismo: a sociedade precisa de uma imprensa séria, pois o jornalismo atinge todos os setores do público que acessa notícias.",
        ["Ao comércio, porque as lojas vendem celulares.", "Ao turismo, porque as pessoas viajam muito.", "Ao esporte, porque os jogos são transmitidos."], "medium"),
      mc("p9c1-g8-a4", "Que argumentos são expostos para chamar a atenção para o setor do jornalismo?", I,
        "A necessidade de um jornalismo que busque a verdade e siga valores éticos e democráticos e a fala do reitor, que pede métodos de verificação de conteúdo digital.",
        ["A quantidade de páginas que o jornal tem.", "O preço do jornal impresso nas bancas.", "O número de fotos publicadas por semana."], "hard"),
      mc("p9c1-g8-a5", "Para defender sua posição, o editorial reproduz a fala de especialistas de duas maneiras. Qual alternativa traz um exemplo de discurso direto e um de discurso indireto?", I,
        "Direto: “Aprender a raciocinar, conhecer os fatos com base científica e ter senso crítico é muito importante”; indireto: “Ele acredita que essas habilidades ajudam o aluno a discernir as notícias falsas”.",
        ["Direto: “Ele acredita que essas habilidades ajudam o aluno”; indireto: “Aprender a raciocinar é muito importante”.", "Direto: “O tema foi tratado em uma reportagem”; indireto: “A preocupação com as fake news”.", "Os dois são discurso indireto."], "hard"),
      mc("p9c1-g8-a6", "A conclusão de um editorial pode ser uma síntese (resumo) ou uma proposta (sugestão de solução). Que tipo de conclusão esse editorial apresenta?", I,
        "Proposta: os eleitores devem usar o senso crítico para escolher candidatos sérios e rejeitar os maus políticos.",
        ["Síntese: só repete o que foi dito no primeiro parágrafo.", "Nenhuma: o editorial termina sem concluir.", "Pergunta: termina com uma dúvida sem resposta."], "hard"),
      mc("p9c1-g8-a7", "Observe a linguagem do texto. Que variedade linguística é adotada?", I,
        "Uma variedade de acordo com a norma-padrão.",
        ["Uma variedade cheia de gírias e abreviações.", "Uma variedade regional, com sotaque.", "Uma variedade usada só em mensagens de celular."]),
      mc("p9c1-g8-a8", "Que pessoa gramatical predomina no texto?", I,
        "A terceira pessoa.",
        ["A primeira pessoa do singular.", "A segunda pessoa do singular.", "A primeira pessoa do plural."]),
      mc("p9c1-g8-a9", "Expressões como “É imenso o risco de depararem com mentiras” e “O referido senso crítico deve ser acionado” revelam o esforço do autor de tornar o texto pessoal ou impessoal? Por quê?", I,
        "Impessoal: o texto não traz marcas de autoria, como a primeira pessoa, e usa sujeitos que não são pessoas.",
        ["Pessoal: o autor fala de si mesmo o tempo todo.", "Pessoal: o texto usa muitas gírias e opiniões íntimas.", "Impessoal: porque o texto é muito curto."], "hard"),
    ),
  ]
);

// ---------------------------------------------------------------------------
// Grupo 9 — Quadro-resumo do editorial (item 7) e artigo de opinião
// ---------------------------------------------------------------------------
const g9: GrupoParcial = grupo(
  "Resumo do editorial",
  "Resumir as características do editorial: interlocutores, objetivo, linguagem, estrutura e onde circula.",
  "Um quadro-resumo organiza tudo o que aprendemos sobre o editorial e abre o caminho para escrever o nosso, dando a opinião do grupo.",
  IMG_LIVRO,
  [
    read("p9c1-g9-artigo", "Abominável mundo novo (artigo de opinião)", [
      "Para refletir antes de escrever um editorial, leia a ideia central de um artigo de opinião do jornalista Lira Neto, contada com palavras nossas.",
      "O autor visita uma escola na hora do intervalo e se assusta: quase todos os alunos, crianças e pré-adolescentes, estão de cabeça baixa, olhando o celular, muitos com fones de ouvido, sem olhar uns para os outros. Estão juntos, mas separados por uma barreira invisível.",
      "Ele esperava encontrar só vaidade e exibição, mas, ao investigar redes, aplicativos e hashtags, percebeu que o quadro era mais sério. Os jovens têm dificuldade com pausas e silêncios, com a reflexão e com a construção de si mesmos, e vivem agitados por estímulos rápidos. Para ele, o verdadeiro perigo está nas mãos das crianças e dos adolescentes, a um clique de distância.",
    ], "Baseado em Lira Neto, “Abominável mundo novo”, Folha de S.Paulo, 15 out. 2017."),
    mc("p9c1-g9-a1", "Quem são os interlocutores de um editorial?", I,
      "O corpo editorial da publicação (jornal ou revista) e os leitores dela.",
      ["Apenas os políticos do país.", "Só os amigos do jornalista.", "Apenas os anunciantes."]),
    mc("p9c1-g9-a2", "Qual é o objetivo de um editorial?", I,
      "Expressar a opinião do jornal ou da revista sobre um assunto em discussão na sociedade.",
      ["Contar uma história de aventura.", "Dar uma receita de culinária.", "Divulgar o resultado de jogos."]),
    mc("p9c1-g9-a3", "Como é a linguagem de um editorial?", I,
      "Geralmente mais formal e impessoal.",
      ["Cheia de gírias e abreviações.", "Sempre em versos e rimas.", "Escrita em primeira pessoa, como um diário."]),
    mc("p9c1-g9-a4", "Como é a estrutura de um editorial?", I,
      "Introdução com o tema e o posicionamento; desenvolvimento com argumentos; conclusão em resumo ou em proposta, geralmente no último parágrafo.",
      ["Título, rimas e refrão.", "Falas de personagens em balões.", "Lista de ingredientes e modo de preparo."], "medium"),
    mc("p9c1-g9-a5", "Por onde circula o editorial?", I,
      "Em jornais e revistas.",
      ["Em embalagens de alimentos.", "Em placas de trânsito.", "Em bulas de remédio."]),
  ]
);

export const cap1Grupos: GrupoParcial[] = [g1, g2, g3, g4, g5, g6, g7, g8, g9];
