import { grupo, IMG, IMG_CRIANCAS, IMG_FLORESTA, IMG_LETRAS, IMG_LIVRO, mc, read, txt, withImage } from "./shared";
import type { GrupoParcial } from "./shared";

// Capítulo 3 — "Posto... logo, existo!": artigo de opinião "Selfies", pronome relativo, E/I e O/U.
// Cada pergunta ou item do livro virou exatamente uma atividade. Textos e tiras reescritos com palavras próprias.

const I = "Toque na resposta certa";
const IMG_PLACEBO = `${IMG}/c3-tira-placebo.jpg`;
const IMG_RELOGIO = `${IMG}/c3-tira-relogio.jpg`;
const IMG_SAPO = `${IMG}/c3-tira-sapo.jpg`;
const IMG_HQ = `${IMG}/c3-hq-coracao.jpg`;

// ---------------------------------------------------------------------------
// C1 — Artigo de opinião "Selfies" (compreensão, parte 1)
// ---------------------------------------------------------------------------
const selfies = read("p9c3-selfies", "Selfies (artigo de opinião)", [
  "1. Muita gente se irrita, e com razão, com o uso indiscriminado dos celulares. Se servissem só para falar, já seria ruim, mas eles também tiram fotos, e assim somos invadidos por imagens de gatos subindo na cortina, focinhos de cachorro diante da câmera, pratos de torresmo, brownie e feijoada.",
  "2. Pelo que o autor vê com os filhos, de 10 e 12 anos, o tempo dos “selfies” está chegando ao fim: eles já acham ridícula a mania de tirar retratos de si em qualquer ocasião e até têm preconceito com os colegas que fazem isso: “Fulaninha? Tira foto na frente do espelho.”",
  "3. O hábito pode ser compreensível: alguém que quer melhorar a forma física e registra o progresso a cada semana, ou um adolescente que começa a se descobrir. Já a bobeira aparece quando alguém tira um “selfie” com a torre Eiffel ao fundo ou (pior) ao lado de, sei lá, um ator famoso.",
  "4. Seria apenas o registro de algo importante que nos acontece, e tudo bem. O problema se complica com as fotos de comida. Em primeiro lugar, o autor vê nisso uma espécie de “degradação da experiência”: como se o que vivemos de fato, uma estada em Paris, um jantar, não pudesse ser vivido e sentido como é.",
  "5. Quem se entrega a fotografar a si mesmo na viagem, em vez de simplesmente viajar, pode estar fugindo das próprias sensações. Desdobra o “self” em duas entidades: a pessoa que está em Paris e a que tira a foto de quem está em Paris.",
  "6. Pode ser narcisismo, claro, mas o narcisismo não precisa viajar. A complicação vem do objeto: o que fazer diante da torre Eiffel? Dá para unir-se à paisagem, sentir a respiração diante daquela elevação de ferro e nuvem, deixar o olhar atravessar o rendilhado que brilha ao sol.",
  "7. Mas ele pega o celular e tira uma foto de si na torre. O mundo se fecha no visor do aparelho. Não por acaso faz uma careta idiota e dá as costas para o monumento: na verdade, dá as costas para a vida.",
  "8. Talvez as coisas não sejam tão desesperadoras. Imagine que, daqui a cem anos, depois de uma guerra atômica e de uma catástrofe climática, um pesquisador encontre os “selfies” e as fotos de batata frita. Ele poderá dizer “Como as pessoas eram felizes naquela época!” ou “Como eram tontas!”. Dependerá dos humores do pesquisador.",
], "Baseado em Marcelo Coelho, “Selfies”, Folha de S.Paulo, 23 abr. 2014.");

const c1: GrupoParcial = grupo(
  "Selfies: o que o autor pensa",
  "Ler um artigo de opinião sobre selfies e compreender o ponto de vista do autor sobre o uso do celular.",
  "Um colunista critica o uso indiscriminado do celular e das selfies. Vamos descobrir os argumentos dele e o exemplo da torre Eiffel.",
  IMG_CRIANCAS,
  [
    selfies,
    ...txt("p9c3-selfies",
      mc("p9c3-g1-a1", "O autor aborda o uso do celular. Ele vê esse uso de forma positiva ou negativa? Por quê?", I,
        "De forma negativa: quando usado de modo indiscriminado, o celular tira a privacidade das pessoas.",
        ["De forma positiva: o celular só traz vantagens.", "De forma indiferente: ele não tem opinião.", "De forma positiva: porque as fotos ficam lindas."], "medium"),
      mc("p9c3-g1-a2", "Das múltiplas funções do celular, qual é a que mais incomoda o autor?", I,
        "A função de máquina fotográfica.",
        ["A função de despertador.", "A função de calculadora.", "A função de telefone."]),
      mc("p9c3-g1-a3", "O que o autor pensa de fotos banais, como gatos subindo na cortina e pratos de feijoada?", I,
        "Considera que dizem respeito à vida particular e mostram situações corriqueiras e desinteressantes.",
        ["Considera obras de arte.", "Considera documentos históricos importantes.", "Considera as melhores fotos da internet."]),
      mc("p9c3-g1-a4", "Apesar do uso quase ilimitado do celular para tirar fotos, a selfie é uma unanimidade entre os adolescentes? Por quê?", I,
        "Não: há adolescentes que rejeitam o hábito de se autofotografar a todo instante e têm preconceito com quem o tem.",
        ["Sim: todos os adolescentes adoram.", "Sim: porque os pais obrigam.", "Não: porque os adolescentes não têm celular."], "medium"),
      mc("p9c3-g1-a5", "Em que situação o autor acha que haveria sentido alguém fotografar a si mesmo?", I,
        "Quando há uma finalidade prática, como registrar o progresso de um programa de exercícios.",
        ["Quando o autor está em frente a uma torre famosa.", "Quando a pessoa está no meio de uma refeição.", "Quando alguém quer aparecer ao lado de um famoso."], "medium"),
      mc("p9c3-g1-a6", "Em que tipo de situação ele rejeita as selfies?", I,
        "Na selfie banal, como fotografar-se com a torre Eiffel ao fundo ou ao lado de pessoas famosas.",
        ["Na selfie para registrar exercícios.", "Na selfie de adolescentes que se descobrem.", "Em qualquer foto tirada por outra pessoa."], "medium"),
      mc("p9c3-g1-a7", "Segundo o autor, a onda das selfies provocou uma “espécie de degradação da experiência”. O que ele quer dizer com isso?", I,
        "Que a experiência vivida (a comida, a viagem, conhecer um artista) foi banalizada, pois tudo é publicado: o que importa passa a ser divulgar, não viver.",
        ["Que as selfies estragam os celulares.", "Que as experiências deixaram de existir.", "Que os jovens passaram a viajar menos por falta de dinheiro."], "hard"),
    ),
  ]
);

// ---------------------------------------------------------------------------
// C2 — "Selfies": a viagem a Paris, a vida e o pesquisador do futuro
// ---------------------------------------------------------------------------
const c2: GrupoParcial = grupo(
  "Paris, a torre e o pesquisador do futuro",
  "Entender o exemplo da viagem a Paris, o narcisismo e a imagem final do pesquisador do futuro.",
  "O autor usa uma viagem a Paris para defender sua ideia: quem só fotografa a si mesmo deixa de viver o lugar.",
  IMG_LETRAS,
  [
    ...txt("p9c3-selfies",
      mc("p9c3-g2-a1", "Para ilustrar seu ponto de vista, o autor cita uma viagem a Paris. Em tese, o que uma pessoa procura quando viaja?", I,
        "Conhecimento e emoções novas.",
        ["Apenas descanso e silêncio.", "Apenas fotos para postar.", "Apenas lugares para comprar roupas."]),
      mc("p9c3-g2-a2", "O que muda quando a pessoa fotografa a si mesma no lugar onde faz turismo?", I,
        "O foco deixa de ser a cidade (o objeto) e passa a ser quem fotografa (o sujeito).",
        ["Nada muda: o foco continua na cidade.", "O foco passa a ser o guia turístico.", "O foco passa a ser a câmera do celular."], "medium"),
      mc("p9c3-g2-a3", "Por que o autor vê narcisismo nesse tipo de atitude?", I,
        "Porque a própria pessoa quer ver-se a todo instante nos diferentes lugares por onde passa.",
        ["Porque a pessoa quer ver só os outros turistas.", "Porque a pessoa evita as fotos.", "Porque a pessoa só fotografa paisagens."], "medium"),
      mc("p9c3-g2-a4", "O autor diz: “Desdobro o meu ‘self’ em duas entidades: quem está em Paris e quem tira a foto de quem está em Paris”. Qual procedimento NÃO seria próprio de uma “pessoa que está em Paris”?", I,
        "Fazer uma careta para a câmera, de costas para o monumento.",
        ["Unir-se à paisagem.", "Sentir como respira diante da torre.", "Deixar o olhar atravessar o rendilhado de ferro."], "hard"),
      mc("p9c3-g2-a5", "Por que, para o autor, a selfie indiscriminada é uma forma de negação da vida (“dou as costas para a vida”)?", I,
        "Porque a prática impede a pessoa de viver plenamente o lugar e o momento ou de interagir com os outros, limitando-se a olhar a imagem da realidade.",
        ["Porque a selfie tira a vida da pessoa fotografada.", "Porque a selfie é proibida em monumentos.", "Porque a selfie só se usa à noite."], "hard"),
      mc("p9c3-g2-a6", "No final, o autor imagina um pesquisador do futuro que recupera as selfies e as fotos de batata frita. O que você acha que o pesquisador diria?", I,
        "Depende do humor dele: tanto “Como eram felizes!” quanto “Como eram tontas!” seriam possíveis, dependendo de como ele interpreta aquelas imagens.",
        ["Diria sempre “Como eram felizes!”, sem exceção.", "Diria sempre “Como eram tontas!”, sem exceção.", "Não diria nada, pois as fotos não existem mais."]),
      mc("p9c3-g2-a7", "Se Marcelo Coelho fosse o pesquisador, o que ele diria?", I,
        "“Como eram tontas!”.",
        ["“Como as pessoas eram felizes naquela época!”.", "“Que fotos incríveis!”.", "“Quero tirar uma selfie agora!”."]),
      mc("p9c3-g2-a8", "E você, o que diria como pesquisador?", I,
        "Que as fotos mostram um pouco de tudo: momentos felizes, mas também pessoas distraídas do que viviam.",
        ["Que ninguém sabia tirar foto.", "Que ninguém tinha celular.", "Que todos mentiam em todas as fotos."]),
    ),
  ]
);

// ---------------------------------------------------------------------------
// C3 — A linguagem do texto + Trocando ideias
// ---------------------------------------------------------------------------
const c3: GrupoParcial = grupo(
  "A linguagem do artigo e a sua opinião",
  "Observar escolhas de linguagem do autor (fulaninha, bobeira, sei lá, parênteses, primeira pessoa) e discutir o tema com os colegas.",
  "O autor escolhe palavras que mostram sua opinião. Depois, é a nossa vez de opinar sobre selfies, privacidade e viver o momento.",
  IMG_LIVRO,
  [
    ...txt("p9c3-selfies",
      mc("p9c3-g3-a1", "Na frase “Fulaninha? Tira foto na frente do espelho”, qual é o sentido da palavra “fulaninha”? Refere-se a uma pessoa específica?", I,
        "Tem sentido vago e pode se referir a alguém cujo nome não se conhece ou não se quer dizer; não é uma pessoa específica.",
        ["Refere-se a uma pessoa específica, a filha do autor.", "Refere-se a uma atriz famosa.", "Refere-se ao nome de uma rede social."], "medium"),
      mc("p9c3-g3-a2", "Que efeito, quanto ao sentido, o diminutivo tem em “fulaninha”?", I,
        "Cria um sentido pejorativo, preconceituoso.",
        ["Cria um sentido carinhoso.", "Indica que a pessoa é pequena.", "Não muda o sentido."], "medium"),
      mc("p9c3-g3-a3", "Que palavra ou expressão do trecho “A bobeira se revela em outras situações [...] ao lado de, sei lá, um ator famoso” mostra que o autor busca uma linguagem informal?", I,
        "A palavra “bobeira” e a expressão “sei lá”.",
        ["As palavras “situações” e “revela”.", "As palavras “fundo” e “torre”.", "A palavra “famoso” apenas."], "medium"),
      mc("p9c3-g3-a4", "Por que o autor empregou a palavra “pior” entre parênteses?", I,
        "Para isolar um comentário dele mesmo a respeito do exemplo que deu.",
        ["Para corrigir um erro de ortografia.", "Para citar outra pessoa.", "Para indicar o nome de um lugar."], "medium"),
      mc("p9c3-g3-a5", "No trecho em que ele pega o celular e tira a foto, por que o autor usa verbos e pronomes na primeira pessoa do singular? A quem se referem?", I,
        "A primeira pessoa tem função impessoal e generalizante: refere-se a qualquer pessoa que aja daquela forma.",
        ["Refere-se só ao autor, que viajou a Paris.", "Refere-se aos filhos do autor.", "Refere-se apenas aos leitores adultos."], "hard"),
      mc("p9c3-g3-a6", "Pelo uso de “fulaninha” e “bobeira”, a visão contrária do autor às selfies fica clara. Considerando que o texto é de 2014, ele ainda teria essa visão hoje?", I,
        "Provavelmente em parte: pode ter se acostumado às selfies, mas talvez ainda critique o exagero e a perda da experiência.",
        ["Com certeza ele se tornou fã de selfies.", "Ele nunca viu uma selfie na vida.", "Ele passou a odiar todas as fotografias."], "hard"),
      mc("p9c3-g3-a7", "A palavra “selfie” é um substantivo de dois gêneros: “a selfie” ou “o selfie”. Qual forma costuma ser mais usada onde você mora?", I,
        "“A selfie”, que hoje é a forma mais comum.",
        ["“O selfie”, em todos os lugares.", "Nenhuma das duas, pois a palavra não existe.", "“Os selfies”, só no plural."]),
      mc("p9c3-g3-a8", "Qual é a origem da palavra “selfie” e por que ela é substantivo de dois gêneros?", I,
        "Vem do inglês “self-portrait” (autorretrato), masculino; mas também é um tipo de fotografia (“a fotografia selfie”), feminino.",
        ["Vem do latim e significa viagem.", "Vem do espanhol e significa selvagem.", "Vem do francês e significa torre."], "hard"),
    ),
    mc("p9c3-g3-a9", "Você tem o hábito de publicar nas redes fatos do cotidiano, como gatos subindo em cortinas ou pratos de comida? O que pensa disso?", I,
      "Às vezes publico coisas do dia a dia, mas penso se isso ajuda alguém ou se é só para aparecer.",
      ["Publico absolutamente tudo sem pensar.", "Nunca publico nada porque acho tudo ridículo.", "Publico só para ganhar curtidas, nunca por vontade própria."]),
    mc("p9c3-g3-a10", "Você concorda com o autor de que o uso indiscriminado do celular para registrar fatos cotidianos rouba a privacidade das pessoas? Por quê?", I,
      "Concordo em parte: quando se posta sem cuidado, expõem-se dados e imagens de outras pessoas; por isso é preciso controlar quem vê o que postamos.",
      ["Discordo: nunca há problema em postar qualquer foto.", "Concordo totalmente: ninguém deveria usar celular.", "Não tenho opinião e prefiro nem pensar no assunto."], "medium"),
    mc("p9c3-g3-a11", "Para você, sentir a paisagem é mais importante do que fotografá-la e compartilhá-la? Como se relaciona com o que fotografa e posta?", I,
      "Procuro viver o momento primeiro e fotografar depois, sem deixar a foto roubar a experiência.",
      ["Prefiro só fotografar e nem olhar para a paisagem.", "Nunca olho para a paisagem, só para as curtidas.", "Acho que fotografar sempre estraga tudo."]),
  ]
);

// ---------------------------------------------------------------------------
// C4 — Pronome relativo: construindo o conceito + tira "Placebo" (parte 1)
// ---------------------------------------------------------------------------
const placebo = withImage(read("p9c3-placebo", "Tira: alimentar a rede social", [
  "Tira em 3 quadrinhos, com um adolescente de moletom e, atrás dele, a “rede social” desenhada como um monstrinho peludo que parece uma sombra.",
  "Quadrinho 1. O monstro da rede social fica grudado atrás do adolescente, olhando-o com fome.",
  "Quadrinho 2. Adolescente: “Hora de alimentar a minha rede social!” O monstro abre a boca.",
  "Quadrinho 3. O adolescente joga na boca do monstro: “Alimento a minha rede social com livros que não li. Alimento a minha rede social com coisas que não sou.” O monstro mastiga contente, e o adolescente fica preso a ele por uma coleira.",
]), IMG_PLACEBO, "Tira: um adolescente alimenta o monstro da rede social");

const c4: GrupoParcial = grupo(
  "Pronome relativo: o que liga e substitui",
  "Descobrir que o pronome relativo liga duas orações e substitui um termo já citado.",
  "A palavra que pode ligar e substituir ao mesmo tempo. Vemos o conceito de pronome relativo e uma tira sobre alimentar as redes sociais.",
  IMG_LETRAS,
  [
    read("p9c3-g4-frase", "Uma frase do artigo", [
      "Frase: “Seria apenas o registro de algo importante que nos acontece.”",
    ], "Trecho de Marcelo Coelho, “Selfies”, Folha de S.Paulo, 23 abr. 2014."),
    ...txt("p9c3-g4-frase",
      mc("p9c3-g4-a1", "Quantos verbos ou locuções verbais há nesse período? Quais são?", I,
        "Dois verbos: “seria” e “acontece”.",
        ["Um verbo: “seria”.", "Três verbos: “seria”, “registro” e “nos”.", "Nenhum verbo."]),
      mc("p9c3-g4-a2", "Quais são as orações que compõem esse período?", I,
        "“Seria apenas o registro de algo importante” e “que nos acontece”.",
        ["“Seria apenas” e “o registro de algo importante que nos acontece”.", "“Registro de algo” e “importante”.", "O período tem uma só oração."], "medium"),
      mc("p9c3-g4-a3", "A palavra “que” liga duas orações e substitui um termo da oração anterior. Que termo é esse?", I,
        "“Algo importante”.",
        ["“Registro”.", "“Seria”.", "“Apenas”."], "medium"),
      mc("p9c3-g4-a4", "Qual afirmação sobre o “que” nesse trecho é verdadeira?", I,
        "O “que” restringe o sentido do termo “algo [importante]”, ao qual se refere.",
        ["O “que” explica o termo “registro”.", "O “que” enumera os tipos de registro.", "O “que” substitui o verbo “seria”."], "hard"),
    ),
    read("p9c3-g4-conceito", "Pronome relativo", [
      "Pronome relativo é aquele que liga duas orações e, na segunda, substitui um termo já dito na primeira, chamado antecedente. Em “Seria apenas o registro de algo importante / que nos acontece”, o “que” liga as orações e substitui “algo importante”.",
      "Os pronomes relativos são: que, quem, o qual (a qual, os quais, as quais), onde, quanto (quanta, quantos, quantas), como e cujo (cuja, cujos, cujas). Podem vir precedidos de preposição: “A turista com quem falei é polonesa”; “O bairro onde moro é antigo”.",
      "Os relativos, exceto “cujo” e suas formas, podem ser trocados por “o qual” e suas variantes: “a menina de quem lhe falei” = “a menina da qual lhe falei”. É o sexto tipo de pronome, ao lado dos pessoais, possessivos, demonstrativos, indefinidos e interrogativos.",
    ]),
    placebo,
    ...txt("p9c3-placebo",
      withImage(mc("p9c3-g4-a5", "A tira constrói humor a partir de uma situação comum de quem usa redes sociais. Qual é o sentido mais usual da expressão “alimentar a minha rede social”? Com o que se alimenta uma rede?", I,
        "O de fazer novas postagens: uma rede é alimentada com textos, fotos, imagens da internet, etc.",
        ["O de dar comida ao computador.", "O de cozinhar para os amigos virtuais.", "O de apagar todos os perfis."], "medium"), IMG_PLACEBO, "Tira: um adolescente alimenta o monstro da rede social"),
      mc("p9c3-g4-a6", "Observe a imagem do primeiro quadrinho. Como a rede social é retratada?", I,
        "Como um monstrinho que fica como uma sombra atrás do dono.",
        ["Como uma árvore florida.", "Como um robô amigável.", "Como um prédio de escritórios."]),
      mc("p9c3-g4-a7", "Associando o desenho à fala do segundo quadrinho, que sentido a expressão “alimentar a minha rede social” ganha?", I,
        "O sentido de dar comida, literalmente.",
        ["O sentido de apagar fotos antigas.", "O sentido de pesquisar na internet.", "O sentido de desligar o celular."]),
      mc("p9c3-g4-a8", "O humor do último quadrinho vem de uma quebra de expectativa. Como ela se dá?", I,
        "Pela mudança de sentido do verbo “alimentar” e pelos itens listados, todos negativos, o que dá a entender que a pessoa é prisioneira da rede.",
        ["Pelo fato de o monstro fugir.", "Pelo fato de o adolescente dormir.", "Pelo fato de a rede ser desligada."], "hard"),
    ),
  ]
);

// ---------------------------------------------------------------------------
// C5 — Placebo (parte 2): verbos, orações e antecedentes; juntar orações com “que”
// ---------------------------------------------------------------------------
const c5: GrupoParcial = grupo(
  "Juntando orações com que",
  "Contar verbos e orações, identificar o antecedente do que e unir orações com pronomes relativos.",
  "Duas frases viram uma só com a ajuda do “que”. Treinamos também com preposição e com quem, o qual e onde.",
  IMG_FLORESTA,
  [
    ...txt("p9c3-placebo",
      mc("p9c3-g5-a1", "Observe: “Alimento a minha rede social com livros que não li” e “Alimento a minha rede social com coisas que não sou”. Quantos verbos há em cada período? Identifique-os.", I,
        "Dois em cada: “alimento” e “li”, no primeiro; “alimento” e “sou”, no segundo.",
        ["Um em cada: “alimento”.", "Três em cada.", "Nenhum em cada."]),
      mc("p9c3-g5-a2", "Logo, quantas orações há em cada período?", I,
        "Duas.",
        ["Uma.", "Três.", "Quatro."]),
      mc("p9c3-g5-a3", "Quais são as orações de cada período?", I,
        "Primeiro: “Alimento a minha rede social com livros” / “que não li”; segundo: “Alimento a minha rede social com coisas” / “que não sou”.",
        ["Primeiro: “Alimento” / “a minha rede social com livros que não li”.", "Segundo: “Alimento a minha rede” / “social com coisas que”.", "Os dois períodos têm uma única oração."], "medium"),
      mc("p9c3-g5-a4", "A palavra “que”, nos dois períodos, liga as orações e substitui um termo da primeira. Qual é esse termo em cada período?", I,
        "No primeiro, “livros”; no segundo, “coisas”.",
        ["No primeiro, “rede”; no segundo, “social”.", "Nos dois, “alimento”.", "No primeiro, “não”; no segundo, “sou”."], "medium"),
      mc("p9c3-g5-a5", "Una as orações usando “que”: “O professor de Espanhol está de mudança para outro país. Os alunos amam o professor de Espanhol.”", I,
        "O professor de Espanhol, que os alunos amam, está de mudança para outro país.",
        ["O professor de Espanhol, os alunos amam, está de mudança para outro país.", "O professor de Espanhol que está mudança os alunos amam outro país.", "Os alunos amam o professor de Espanhol e outro país."], "medium"),
      mc("p9c3-g5-a6", "Una usando “que”: “Comprei um celular. O celular é ótimo.”", I,
        "Comprei um celular que é ótimo.",
        ["Comprei um celular o celular é ótimo.", "Comprei que um celular é ótimo.", "Comprei ótimo um celular que."]),
      mc("p9c3-g5-a7", "Una usando “que”: “Vi umas fotos antigas. As fotos antigas foram tiradas na minha infância.”", I,
        "Vi umas fotos antigas que foram tiradas na minha infância.",
        ["Vi umas fotos antigas as fotos foram tiradas na minha infância.", "Vi que umas fotos antigas infância.", "Vi na minha infância que antigas fotos."]),
      mc("p9c3-g5-a8", "Una usando “que”: “Esta é a calça nova? Você comprou uma calça nova?”", I,
        "Esta é a calça nova que você comprou?",
        ["Esta é a calça nova você comprou?", "Esta é que a calça nova comprou?", "Esta calça é você comprou nova?"]),
      mc("p9c3-g5-a9", "Una as orações empregando um pronome relativo coerente: “O problema ___ tenho me referido é outro.”", I,
        "ao qual / a que",
        ["quem", "onde", "cujo"], "hard"),
    ),
  ]
);

// ---------------------------------------------------------------------------
// C6 — Pronome relativo precedido de preposição
// ---------------------------------------------------------------------------
const c6: GrupoParcial = grupo(
  "Relativos e preposições",
  "Completar e unir períodos com os pronomes relativos que, quem, o qual e onde, atendendo à preposição exigida pelo verbo.",
  "Às vezes o relativo precisa de uma preposição: de que, a que, em que, com quem. É o verbo da segunda oração que manda.",
  IMG_LETRAS,
  [
    mc("p9c3-g6-a1", "Complete com o pronome relativo adequado: “Eu emprestarei meus lápis coloridos a ___ estiver precisando.”", I,
      "quem",
      ["onde", "cujo", "como"]),
    mc("p9c3-g6-a2", "Complete: “É ele ___ faz os melhores trabalhos.”", I,
      "quem / que",
      ["onde", "cujo", "quanto"]),
    mc("p9c3-g6-a3", "Complete: “A escola ___ estudei continua bonita.”", I,
      "onde / em que",
      ["quem", "cujos", "a que"]),
    mc("p9c3-g6-a4", "O relativo vem depois de preposição quando o verbo da segunda oração a exige. Una: “Habito um bairro. O bairro é antigo.”", I,
      "O bairro em que (onde) habito é antigo.",
      ["O bairro que habito em é antigo.", "O bairro habito é antigo.", "O bairro cujo habito é antigo."], "medium"),
    mc("p9c3-g6-a5", "Una: “Quero sair com meus amigos. Gosto muito dos meus amigos.”", I,
      "Quero sair com meus amigos, dos quais gosto muito.",
      ["Quero sair com meus amigos, que gosto muito dos.", "Quero sair com meus amigos, onde gosto muito.", "Quero sair com meus amigos, cujos gosto muito."], "hard"),
    mc("p9c3-g6-a6", "Una: “As regras são rígidas. As pessoas obedecem a essas regras.”", I,
      "As regras a que as pessoas obedecem são rígidas.",
      ["As regras que as pessoas obedecem a são rígidas.", "As regras quem as pessoas obedecem são rígidas.", "As regras onde as pessoas obedecem são rígidas."], "hard"),
    mc("p9c3-g6-a7", "Una: “Assistimos à peça. A peça é maravilhosa.”", I,
      "A peça a que assistimos é maravilhosa.",
      ["A peça que assistimos à é maravilhosa.", "A peça quem assistimos é maravilhosa.", "A peça cujo assistimos é maravilhosa."], "hard"),
    mc("p9c3-g6-a8", "Una: “Eu comprei ontem uma HQ. A HQ é excelente.”", I,
      "A HQ que (a qual) comprei ontem é excelente.",
      ["A HQ onde comprei ontem é excelente.", "A HQ quem comprei ontem é excelente.", "A HQ cujo comprei ontem é excelente."], "medium"),
    mc("p9c3-g6-a9", "Una: “Ela ouviu um cantor famoso. Gostava muito desse cantor.”", I,
      "Ela ouviu o cantor famoso, de quem gostava muito.",
      ["Ela ouviu o cantor famoso, que gostava muito de.", "Ela ouviu o cantor famoso, onde gostava muito.", "Ela ouviu o cantor famoso, cujo gostava muito."], "hard"),
    mc("p9c3-g6-a10", "Una: “Fomos ao Rio de Janeiro. A sede da Academia Brasileira de Letras se localiza no Rio de Janeiro.”", I,
      "Fomos ao Rio de Janeiro, onde se localiza a sede da Academia Brasileira de Letras.",
      ["Fomos ao Rio de Janeiro, quem se localiza a sede da Academia.", "Fomos ao Rio de Janeiro, cujo se localiza a sede da Academia.", "Fomos ao Rio de Janeiro, como se localiza a sede da Academia."], "medium"),
    mc("p9c3-g6-a11", "Sobre o pronome relativo depois de preposição, qual é a regra?", I,
      "O relativo deve ser antecedido de preposição quando o verbo da segunda oração a exige (ex.: “A permissão de que preciso é obrigatória”).",
      ["O relativo nunca aceita preposição.", "A preposição vem sempre depois do relativo.", "A preposição só aparece com o relativo “cujo”."], "medium"),
  ]
);

// ---------------------------------------------------------------------------
// C7 — Função sintática do pronome relativo: tira do relógio e tira do sapo
// ---------------------------------------------------------------------------
const relogio = withImage(read("p9c3-relogio", "Tira: o relógio no pulso", [
  "Tira em 3 quadrinhos, com dois amigos num pátio: um garoto de boné e uma garota de maria-chiquinha.",
  "Quadrinho 1. O garoto desenha um relógio no pulso da garota e diz: “Este relógio que eu vou desenhar no seu pulso é especial!”",
  "Quadrinho 2. Garoto: “As horas nunca mudam! Você vai ficar presa no tempo!”",
  "Quadrinho 3. A garota, animada, responde: “Presa no tempo? Então marca a hora do recreio!”",
]), IMG_RELOGIO, "Tira: um garoto desenha um relógio no pulso de uma garota");

const sapo = withImage(read("p9c3-sapo", "Tira: o sapo que canta à meia-noite", [
  "Tira em 3 quadrinhos, com um sapo verde, chamado Tito, em cima de um telhado, à noite, e a janela de um prédio ao fundo.",
  "Quadrinho 1. Tito, de peito estufado, diz: “Sou um sapo que canta quando quer! Vou cantar e coaxar à meia-noite, e a sapa Lola vai me ouvir!”",
  "Quadrinho 2. Tito coaxa bem alto, e luzes se acendem nas janelas.",
  "Quadrinho 3. Um homem furioso, de pijama, aparece na janela e joga um chinelo em Tito. Tito, de olhos arregalados: “Eu não contava com isso...”",
]), IMG_SAPO, "Tira: um sapo coaxa à meia-noite num telhado");

const c7: GrupoParcial = grupo(
  "A função do relativo na oração",
  "Identificar a função sintática do pronome relativo: substituir pelo antecedente e classificar.",
  "Para descobrir a função do relativo, basta trocá-lo pelo antecedente. Veja como isso funciona numa tira do relógio e numa do sapo.",
  IMG_LIVRO,
  [
    read("p9c3-g7-funcao", "Como analisar o pronome relativo", [
      "Na frase “Este relógio que eu vou desenhar no seu pulso é especial”, o “que” liga duas orações e se refere a “este relógio”. Para descobrir a função sintática, substitui-se o relativo pelo antecedente: “Eu vou desenhar este relógio no seu pulso”. Nessa oração, “este relógio” é objeto direto; logo, o “que” também é objeto direto.",
      "O pronome relativo tem, na segunda oração, a mesma função que o antecedente teria nela: sujeito, objeto direto, objeto indireto, complemento nominal, predicativo, agente da passiva, adjunto adverbial ou adjunto adnominal. Exemplos: “Viajarão apenas os alunos que jogarão no sábado” (“que” é sujeito); “O remédio de que preciso é descanso” (“de que” é objeto indireto).",
    ]),
    relogio,
    ...txt("p9c3-relogio",
      withImage(mc("p9c3-g7-a1", "A garota da tira parece surpresa com a brincadeira do outro personagem. O que provoca o humor?", I,
        "A garota acredita que a brincadeira é real e escolhe um horário que lhe agrada, achando que de fato ficará presa no tempo: eternamente no recreio.",
        ["O garoto desenha o relógio na parede.", "A garota fica com medo e foge.", "O garoto perde o boné."], "medium"), IMG_RELOGIO, "Tira: um garoto desenha um relógio no pulso de uma garota"),
    ),
    sapo,
    ...txt("p9c3-sapo",
      withImage(mc("p9c3-g7-a2", "O sapo quer cantar e coaxar à meia-noite. Considerando que ele tenta conquistar a sapa Lola, por que isso é importante para ele?", I,
        "É importante para firmar sua identidade de sapo e para impressionar Lola, mostrando que é livre e faz o que quer.",
        ["Porque ele quer acordar os vizinhos de propósito.", "Porque ele precisa dormir cedo.", "Porque ele quer fugir de Lola."], "medium"), IMG_SAPO, "Tira: um sapo coaxa à meia-noite num telhado"),
      mc("p9c3-g7-a3", "Com que o sapo não contava?", I,
        "Com a ira do vizinho, que jogou um chinelo nele; o humor está em a manifestação dele poder ser impedida, e ele não ter a liberdade que aparentava ter.",
        ["Com o frio da madrugada.", "Com a chegada de Lola.", "Com a falta de telhado."], "medium"),
      mc("p9c3-g7-a4", "Releia o primeiro balão do primeiro quadrinho (“Sou um sapo que canta quando quer!”). Que pronome relativo foi empregado?", I,
        "“Que”.",
        ["“Quem”.", "“Cujo”.", "“Onde”."]),
      mc("p9c3-g7-a5", "Qual é o antecedente desse pronome?", I,
        "“Sapo”.",
        ["“Canta”.", "“Quando”.", "“Quer”."]),
      mc("p9c3-g7-a6", "Qual é a função sintática desse pronome?", I,
        "Sujeito.",
        ["Objeto direto.", "Adjunto adverbial.", "Complemento nominal."], "medium"),
    ),
    mc("p9c3-g7-a7", "Em “3 signos que não têm pressa de dizer ‘eu te amo’”, qual é a função sintática do pronome relativo “que”?", I,
      "Sujeito.",
      ["Objeto direto.", "Adjunto adnominal.", "Predicativo do sujeito."], "medium"),
    mc("p9c3-g7-a8", "Em “O anel que tu me deste era vidro e se quebrou / o amor que tu me tinhas era pouco e se acabou”, qual é a função dos dois pronomes “que”?", I,
      "Objeto direto, nos dois casos.",
      ["Sujeito, nos dois casos.", "Objeto indireto, nos dois casos.", "Adjunto adverbial, nos dois casos."], "hard"),
    mc("p9c3-g7-a9", "Em “Psicóloga policial é uma das autoras de livro que será indicado ao prêmio Jabuti”, qual é a função sintática do pronome “que”?", I,
      "Sujeito.",
      ["Objeto direto.", "Objeto indireto.", "Aposto."], "medium"),
  ]
);

// ---------------------------------------------------------------------------
// C8 — Cujo e onde + história em quadrinhos “Coração vibrar”
// ---------------------------------------------------------------------------
const hq = withImage(read("p9c3-hq", "HQ: a frase que faz parar", [
  "História em quadrinhos com um rapaz diante do computador, em tons de sépia. Quem fala é o próprio rapaz, em legendas (não há balões).",
  "Quadro 1. Legenda: “Tava à toa, passando o olho nas futilidades que pipocam na rede, quando uma frase em letras grandes me fez parar: ‘Opte por aquilo que faz o seu coração vibrar!’ Frase de álbum de figurinha de menina adolescente! Ainda assim, nem dei bola. Ou quase.” O rapaz faz uma cara de irritação, com a mão no queixo.",
  "Quadro 2. Legenda: “Aí pensei: o que faz o meu coração vibrar?”",
  "Quadro 3. Legenda: “Não queria este emprego, não queria esta cidade, não queria esta vida. Parece que estou aonde não deveria estar.” O rapaz arregala os olhos.",
  "Quadro 4. Legenda: “Nunca tinha parado para pensar dessa forma.” O rapaz continua com os olhos arregalados.",
  "Quadro 5. Legenda: “Compartilhar.” O rapaz aparece de costas, sozinho no escuro, e clica no botão de compartilhar a frase.",
]), IMG_HQ, "HQ: um rapaz lê uma frase motivacional na rede");

const c8: GrupoParcial = grupo(
  "Cujo, onde e a frase que faz parar",
  "Entender os pronomes relativos cujo e onde e analisar uma HQ sobre uma frase de efeito nas redes sociais.",
  "Cujo indica posse e nunca leva artigo; onde indica lugar. Depois, uma HQ mostra como uma frase motivacional pode fazer alguém refletir.",
  IMG_FLORESTA,
  [
    read("p9c3-g8-cujo", "Cujo, onde e aonde", [
      "Cujo liga dois termos estabelecendo uma relação de posse: “O professor, cuja casa foi assaltada, mora aqui perto” (a casa do professor). Ele varia em gênero e número com o termo que o sucede (cujo, cuja, cujos, cujas), nunca é seguido de artigo e geralmente tem função de adjunto adnominal.",
      "Onde, segundo a norma-padrão, indica um lugar concreto: “O clube onde treino estará fechado no domingo”. Quando se trata de uma situação, e não de um lugar, usa-se “em que”: “Parecia um debate em que ninguém sabia nada”. Sua função é adjunto adverbial de lugar. Aonde se usa com verbos de movimento que pedem a preposição a (ir, chegar, levar): “O lugar aonde vou é agradável”. Quando o verbo pede “de”, usa-se “donde” ou “de onde”.",
    ]),
    hq,
    ...txt("p9c3-hq",
      withImage(mc("p9c3-g8-a1", "Não há balões de fala, e toda a parte verbal é voz do narrador. Qual é a relação do narrador com o personagem retratado?", I,
        "O narrador é o próprio personagem retratado.",
        ["O narrador é um vizinho.", "O narrador é o dono do computador.", "O narrador é um robô."], "medium"), IMG_HQ, "HQ: um rapaz lê uma frase motivacional na rede"),
      mc("p9c3-g8-a2", "Observe as expressões do personagem. Que sentimentos têm relação com elas?", I,
        "Inquietação, identificação e irritação.",
        ["Alegria e felicidade.", "Tristeza e ponderação.", "Raiva e tranquilidade."], "medium"),
      mc("p9c3-g8-a3", "Por que a frase “Opte por aquilo que faz o seu coração vibrar!” aparece entre aspas e com letras de formato diferente?", I,
        "As aspas indicam que a frase foi copiada de uma rede social; o formato diferente mostra que ela chamou a atenção do personagem.",
        ["Porque o personagem escreveu sozinho.", "Porque é um erro de impressão.", "Porque é uma lei."], "medium"),
      mc("p9c3-g8-a4", "Que expressões indicam informalidade na linguagem do narrador?", I,
        "“Tava à toa”, “passando o olho”, “pipocam” e “dar bola”.",
        ["“Futilidades” e “opte”.", "“Coração” e “vibrar”.", "“Compartilhar” e “cidade”."], "medium"),
      mc("p9c3-g8-a5", "No primeiro quadro, há duas ocorrências de pronome relativo. Quais são e quais são seus antecedentes?", I,
        "“Que” (futilidades) e “que” (aquilo).",
        ["“Quando” (rede) e “que” (frase).", "“Cujo” (futilidades) e “onde” (aquilo).", "“Quem” (rapaz) e “como” (frase)."], "hard"),
      mc("p9c3-g8-a6", "Como o narrador julga a frase “Opte por aquilo que faz o seu coração vibrar!”?", I,
        "Como um apelo motivacional, que aparece em álbum de figurinhas de meninas adolescentes.",
        ["Como uma ordem do governo.", "Como uma receita de bolo.", "Como uma notícia de jornal."]),
      mc("p9c3-g8-a7", "O narrador diz: “Parece que estou aonde não deveria estar.” Avalie o emprego de “aonde” segundo a gramática normativa.", I,
        "Está inadequado: “aonde” se usa com verbos de movimento, e “estar” é estático; o correto seria “onde”.",
        ["Está adequado: “aonde” é sempre o certo.", "Está inadequado: deveria ser “cujo”.", "Está adequado: porque há uma preposição “a”."], "hard"),
      mc("p9c3-g8-a8", "O que o personagem percebe ao avaliar a vida a partir da reflexão motivada pela frase?", I,
        "Percebe que em sua vida não há nada que faça seu coração vibrar.",
        ["Percebe que está feliz com tudo.", "Percebe que perdeu o celular.", "Percebe que a frase estava errada."]),
      mc("p9c3-g8-a9", "Levando em conta o último quadro, que relação há entre a situação retratada e o comportamento de muitas pessoas nas redes?", I,
        "Muita gente publica conteúdos que não retratam o que realmente vive: compartilha a frase mesmo sem fazer o que ela sugere.",
        ["Muita gente só publica a verdade sobre sua vida.", "Ninguém compartilha frases motivacionais.", "Todo mundo muda de emprego depois de compartilhar."], "hard"),
    ),
  ]
);

export const cap3aGrupos: GrupoParcial[] = [c1, c2, c3, c4, c5, c6, c7, c8];
