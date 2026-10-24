import type { Activity } from "./activities";
import type { LessonGroup } from "./alfabetizacaoGrupos";
import {
  fromText,
  grupo,
  IMG_CRIANCAS,
  IMG_FLORESTA,
  IMG_LETRAS,
  IMG_LIVRO,
  match,
  mc,
  order,
  read,
  tf,
} from "./portuguesDivertidoGrupos";

// Português Divertido — grupos 22 a 31 (baseados nos temas da Parte 2 do livro
// "Português Linguagens – 6º ano"): substantivo (comum/próprio, gênero, número, grau,
// coletivos, sentimentos), gêneros de texto, direitos da criança, texto de teatro,
// jeitos de falar, resenha e histórias que conversam com outras.
// Textos e questões criados do zero para 6 anos; nada foi copiado, por isso não há "Fonte".

/** Marca várias questões como dependentes do mesmo texto-base. */
const txt = (readingId: string, ...acts: Activity[]): Activity[] =>
  acts.map((a) => fromText(readingId, a));

// ---------------------------------------------------------------------------
// Grupo 22 — Nomes de tudo (substantivo, comum e próprio)
// ---------------------------------------------------------------------------
const g22Activities: Activity[] = [
  read("pd-g22-leitura", "A turma da Bia", [
    "Bia mora em Curitiba. Ela tem um cachorro chamado Totó e uma gata chamada Mimi.",
    "Todos os dias, Bia vai de bicicleta para a escola. Lá, ela encontra a professora Marta e os amigos Léo e Duda.",
    "No recreio, a turma brinca com bola, corda e pião.",
  ]),
  ...txt("pd-g22-leitura",
    mc("pd-g22-a1", "Em que cidade Bia mora?", "Toque na resposta certa",
      "Curitiba", ["Marta", "Mimi", "Totó"]),
    mc("pd-g22-a2", "Qual é o nome do cachorro?", "Toque na resposta certa",
      "Totó", ["Mimi", "Léo", "Duda"]),
    mc("pd-g22-a3", "Quem é a professora?", "Toque na resposta certa",
      "Marta", ["Duda", "Mimi", "Bia"]),
    mc("pd-g22-a4", "Qual é o nome de um brinquedo que aparece no texto?", "Toque na resposta certa",
      "pião", ["Marta", "Curitiba", "escola"]),
    mc("pd-g22-a5", "Palavras que dão nome a pessoas, bichos, lugares e coisas se chamam...", "Toque na resposta certa",
      "substantivos", ["rimas", "legendas", "sílabas"], "medium"),
    mc("pd-g22-a6", "Por que “Curitiba” e “Totó” começam com letra maiúscula?", "Toque na resposta certa",
      "Porque são nomes especiais de um lugar e de um bicho",
      ["Porque são palavras compridas", "Porque rimam", "Porque estão no fim da frase"], "medium"),
  ),
  mc("pd-g22-a7", "Qual palavra é nome próprio (começa com maiúscula)?", "Toque na resposta certa",
    "Brasil", ["país", "cidade", "rio"]),
  mc("pd-g22-a8", "Qual palavra é nome comum?", "Toque na resposta certa",
    "menina", ["Ana", "Paulo", "Recife"]),
  match("pd-g22-a9", "Ligue o nome comum ao nome próprio", [
    ["cidade", "São Paulo"],
    ["menino", "Pedro"],
    ["cachorro", "Rex"],
    ["país", "Brasil"],
  ], "medium"),
  tf("pd-g22-a10", "Os nomes de pessoas começam com letra maiúscula.", true),
  mc("pd-g22-a11", "Qual palavra é nome de uma coisa?", "Toque na resposta certa",
    "mesa", ["pular", "azul", "devagar"]),
];

// ---------------------------------------------------------------------------
// Grupo 23 — Menino, menina, um e vários (gênero e número)
// ---------------------------------------------------------------------------
const g23Activities: Activity[] = [
  mc("pd-g23-a1", "Qual é o feminino de MENINO?", "Toque na resposta certa",
    "menina", ["meninão", "meninos", "menininho"]),
  mc("pd-g23-a2", "Qual é o feminino de GATO?", "Toque na resposta certa",
    "gata", ["gatos", "gatinho", "gatão"]),
  mc("pd-g23-a3", "Qual é o feminino de PROFESSOR?", "Toque na resposta certa",
    "professora", ["professores", "professorzinho", "professorão"]),
  mc("pd-g23-a4", "Qual é o feminino de LEITOR?", "Toque na resposta certa",
    "leitora", ["leitores", "leitorzinho", "leitorão"]),
  mc("pd-g23-a5", "Qual é o feminino de BOI?", "Toque na resposta certa",
    "vaca", ["boia", "boa", "bola"], "medium"),
  mc("pd-g23-a6", "Qual é o masculino de AMIGA?", "Toque na resposta certa",
    "amigo", ["amigos", "amiga", "amigão"]),
  mc("pd-g23-a7", "Um gato, dois...", "Toque na resposta certa",
    "gatos", ["gata", "gatinho", "gato"]),
  mc("pd-g23-a8", "Uma flor, duas...", "Toque na resposta certa",
    "flores", ["flors", "florzinhas", "flor"], "medium"),
  mc("pd-g23-a9", "Um pão, dois...", "Toque na resposta certa",
    "pães", ["pãos", "pões", "pãs"], "medium"),
  mc("pd-g23-a10", "Um balão, dois...", "Toque na resposta certa",
    "balões", ["balãos", "balães", "balãs"], "medium"),
  match("pd-g23-a11", "Ligue o singular ao plural", [
    ["cadeira", "cadeiras"],
    ["luz", "luzes"],
    ["jornal", "jornais"],
    ["limão", "limões"],
  ], "medium"),
  tf("pd-g23-a12", "O plural de “casa” é “casas”.", true),
  mc("pd-g23-a13", "Quando falamos de mais de um, dizemos que a palavra está no...", "Toque na resposta certa",
    "plural", ["singular", "feminino", "diminutivo"]),
  mc("pd-g23-a14", "Qual palavrinha combina com MENINA: ___ menina?", "Toque na resposta certa",
    "a", ["o", "os", "um"]),
];

// ---------------------------------------------------------------------------
// Grupo 24 — Grandão e pequenininho (aumentativo e diminutivo)
// ---------------------------------------------------------------------------
const g24Activities: Activity[] = [
  read("pd-g24-leitura", "A casinha do Zeca", [
    "Zeca tinha uma casinha na árvore. Todo dia ele subia a escada e olhava o jardim.",
    "Um dia, apareceu um cachorrão no quintal. Zeca ficou com medo.",
    "Mas o cachorrão só queria brincar! Então Zeca desceu com um biscoitinho na mão.",
  ]),
  ...txt("pd-g24-leitura",
    mc("pd-g24-a1", "Onde ficava a casinha do Zeca?", "Toque na resposta certa",
      "Em uma árvore", ["No mar", "Na escola", "Na montanha"]),
    mc("pd-g24-a2", "“Casinha” quer dizer...", "Toque na resposta certa",
      "casa pequena", ["casa grande", "casa de doce", "casa quebrada"]),
    mc("pd-g24-a3", "“Cachorrão” quer dizer...", "Toque na resposta certa",
      "cachorro grande", ["cachorro pequeno", "cachorro bravo", "cachorro doente"]),
    mc("pd-g24-a4", "Por que Zeca ficou com medo?", "Toque na resposta certa",
      "Porque apareceu um cachorro grande", ["Porque ficou escuro", "Porque perdeu o biscoito", "Porque caiu da árvore"]),
    mc("pd-g24-a5", "O que o cachorrão queria?", "Toque na resposta certa",
      "Brincar", ["Morder", "Dormir", "Fugir"]),
    mc("pd-g24-a6", "“Biscoitinho” quer dizer...", "Toque na resposta certa",
      "biscoito pequeno", ["biscoito grande", "biscoito velho", "biscoito de chocolate"]),
  ),
  mc("pd-g24-a7", "Qual é o diminutivo (pequeno) de LIVRO?", "Toque na resposta certa",
    "livrinho", ["livrão", "livros", "livraria"]),
  mc("pd-g24-a8", "Qual é o aumentativo (grande) de BOLA?", "Toque na resposta certa",
    "bolão", ["bolinha", "bolo", "bolas"], "medium"),
  mc("pd-g24-a9", "Qual é o diminutivo de FLOR?", "Toque na resposta certa",
    "florzinha", ["florão", "flores", "floresta"], "medium"),
  match("pd-g24-a10", "Ligue a palavra ao seu aumentativo", [
    ["pé", "pezão"],
    ["copo", "copão"],
    ["boca", "bocão"],
    ["nariz", "narigão"],
  ], "medium"),
  tf("pd-g24-a11", "As terminações -inho e -zinho deixam a palavra menor.", true),
  mc("pd-g24-a12", "Quando dizemos “vovozinha”, mostramos...", "Toque na resposta certa",
    "carinho", ["raiva", "medo", "sono"], "medium"),
];

// ---------------------------------------------------------------------------
// Grupo 25 — Bando, manada e cia. (coletivos) e nomes de sentimentos
// ---------------------------------------------------------------------------
const g25Activities: Activity[] = [
  mc("pd-g25-a1", "Um grupo de peixes é um...", "Toque na resposta certa",
    "cardume", ["bando", "enxame", "rebanho"]),
  mc("pd-g25-a2", "Um grupo de aves é um...", "Toque na resposta certa",
    "bando", ["cardume", "enxame", "matilha"]),
  mc("pd-g25-a3", "Um grupo de abelhas é um...", "Toque na resposta certa",
    "enxame", ["bando", "cardume", "rebanho"]),
  mc("pd-g25-a4", "Um grupo de cães é uma...", "Toque na resposta certa",
    "matilha", ["manada", "frota", "turma"]),
  mc("pd-g25-a5", "Um grupo de elefantes é uma...", "Toque na resposta certa",
    "manada", ["matilha", "frota", "turma"]),
  mc("pd-g25-a6", "Um grupo de ovelhas é um...", "Toque na resposta certa",
    "rebanho", ["cardume", "bando", "enxame"], "medium"),
  mc("pd-g25-a7", "Um grupo de alunos de uma sala é uma...", "Toque na resposta certa",
    "turma", ["manada", "frota", "matilha"]),
  match("pd-g25-a8", "Ligue o nome do grupo ao que ele reúne", [
    ["cardume", "peixes"],
    ["bando", "aves"],
    ["enxame", "abelhas"],
    ["matilha", "cães"],
  ], "medium"),
  mc("pd-g25-a9", "Qual palavra é nome de um sentimento?", "Toque na resposta certa",
    "saudade", ["mesa", "bola", "janela"]),
  mc("pd-g25-a10", "Qual palavra é nome de um sentimento?", "Toque na resposta certa",
    "alegria", ["sapato", "porta", "chuva"]),
  tf("pd-g25-a11", "Medo e alegria são nomes de sentimentos.", true),
  mc("pd-g25-a12", "Mesa e sol a gente consegue ver. E a tristeza?", "Toque na resposta certa",
    "A gente não vê, mas sente", ["A gente pega com a mão", "A gente come", "A gente guarda na gaveta"], "medium"),
];

// ---------------------------------------------------------------------------
// Grupo 26 — Tipos de texto (receita, mapa, poema, entrevista, cartaz)
// ---------------------------------------------------------------------------
const g26Activities: Activity[] = [
  read("pd-g26-leitura", "Vitamina de banana", [
    "Ingredientes: 1 banana madura, 1 copo de leite e 1 colher de mel.",
    "Modo de preparo:",
    "1. Descasque a banana.",
    "2. Coloque a banana, o leite e o mel no liquidificador.",
    "3. Bata por 1 minuto.",
    "4. Sirva em um copo.",
  ]),
  ...txt("pd-g26-leitura",
    mc("pd-g26-a1", "Quantas bananas a receita pede?", "Toque na resposta certa",
      "1", ["2", "3", "4"]),
    mc("pd-g26-a2", "O que se usa para bater os ingredientes?", "Toque na resposta certa",
      "O liquidificador", ["O garfo", "A colher de pau", "O ventilador"]),
    mc("pd-g26-a3", "Qual é o primeiro passo?", "Toque na resposta certa",
      "Descascar a banana", ["Bater por 1 minuto", "Servir em um copo", "Colocar o mel"]),
    order("pd-g26-a4", "Coloque os passos da receita na ordem certa", [
      "Descasque a banana.",
      "Coloque tudo no liquidificador.",
      "Bata por 1 minuto.",
      "Sirva em um copo.",
    ]),
    mc("pd-g26-a5", "A parte da receita que lista o que vamos usar se chama...", "Toque na resposta certa",
      "ingredientes", ["título", "rima", "legenda"], "medium"),
    mc("pd-g26-a6", "A parte que explica como fazer se chama...", "Toque na resposta certa",
      "modo de preparo", ["ingredientes", "rima", "título"], "medium"),
  ),
  match("pd-g26-a7", "Ligue o tipo de texto ao que ele faz", [
    ["Receita", "Ensina a fazer um prato"],
    ["Mapa", "Mostra lugares"],
    ["Poema", "Usa versos e rimas"],
    ["Entrevista", "Tem perguntas e respostas"],
  ], "medium"),
  mc("pd-g26-a8", "Qual texto avisa as crianças sobre uma festa na escola?", "Toque na resposta certa",
    "Um cartaz ou convite", ["Uma receita", "Um mapa", "Uma lista de compras"]),
  mc("pd-g26-a9", "Em uma entrevista...", "Toque na resposta certa",
    "Uma pessoa pergunta e outra responde", ["Todos cantam", "Ninguém fala", "Só se desenha"], "medium"),
  tf("pd-g26-a10", "Uma receita tem ingredientes e modo de preparo.", true),
  mc("pd-g26-a11", "Um texto com “Ingredientes” e “Modo de preparo” parece uma...", "Toque na resposta certa",
    "receita", ["carta", "música", "notícia"]),
];

// ---------------------------------------------------------------------------
// Grupo 27 — Direitos das crianças
// ---------------------------------------------------------------------------
const g27Activities: Activity[] = [
  read("pd-g27-leitura", "Toda criança tem direitos", [
    "Toda criança tem direitos, e eles estão escritos em uma lei chamada ECA: o Estatuto da Criança e do Adolescente.",
    "A criança tem direito à vida e à saúde, para crescer forte e saudável.",
    "Tem direito à alimentação, à escola e à brincadeira.",
    "Também tem direito a ser respeitada, a ter uma família e a dar a sua opinião.",
    "Cuidar dos direitos das crianças é dever da família, da escola e de todo mundo.",
  ]),
  ...txt("pd-g27-leitura",
    mc("pd-g27-a1", "Como se chama a lei dos direitos das crianças?", "Toque na resposta certa",
      "ECA", ["ABC", "CEP", "CPF"]),
    mc("pd-g27-a2", "O direito à saúde serve para a criança...", "Toque na resposta certa",
      "crescer forte e saudável", ["ficar sem estudar", "dormir o dia todo", "viver sozinha"]),
    mc("pd-g27-a3", "Qual destes é um direito citado no texto?", "Toque na resposta certa",
      "Brincar", ["Dirigir carro", "Trabalhar o dia inteiro", "Ficar sem comer"]),
    mc("pd-g27-a4", "Quem deve cuidar dos direitos das crianças?", "Toque na resposta certa",
      "A família, a escola e todo mundo", ["Só as crianças", "Só os animais", "Ninguém"], "medium"),
    tf("pd-g27-a5", "A criança tem direito de ser respeitada.", true),
    tf("pd-g27-a6", "A criança não tem direito de ir à escola.", false),
  ),
  match("pd-g27-a7", "Ligue o direito a um exemplo", [
    ["Saúde", "Ir ao médico e tomar vacina"],
    ["Alimentação", "Comer comidas saudáveis"],
    ["Educação", "Aprender na escola"],
    ["Lazer", "Brincar e descansar"],
  ], "medium"),
  mc("pd-g27-a8", "Se uma criança estiver sendo maltratada, o que é bom fazer?", "Toque na resposta certa",
    "Contar para um adulto de confiança", ["Ficar calada", "Esconder de todo mundo", "Fazer o mesmo com outra pessoa"], "medium"),
  mc("pd-g27-a9", "Qual direito é aprender a ler e a escrever?", "Toque na resposta certa",
    "Educação", ["Lazer", "Alimentação", "Saúde"]),
  mc("pd-g27-a10", "Qual direito é brincar e se divertir?", "Toque na resposta certa",
    "Lazer", ["Educação", "Saúde", "Respeito"]),
];

// ---------------------------------------------------------------------------
// Grupo 28 — Hora do teatro (texto dramático)
// ---------------------------------------------------------------------------
const g28Activities: Activity[] = [
  read("pd-g28-leitura", "O sapo e a festa (peça curtinha)", [
    "Personagens: SAPO e PATA.",
    "Cenário: uma lagoa, à noite.",
    "SAPO (pulando, animado): — Vai ter festa na lagoa!",
    "PATA (batendo as asas): — Quem vai tocar música?",
    "SAPO (cantando): — Croac, croac! Eu toco o tambor!",
    "PATA (rindo): — Então eu danço!",
    "(As luzes se acendem devagar e os dois dançam juntos.)",
  ]),
  ...txt("pd-g28-leitura",
    mc("pd-g28-a1", "Onde acontece a peça?", "Toque na resposta certa",
      "Em uma lagoa", ["Em uma escola", "Em um castelo", "Em uma praia"]),
    mc("pd-g28-a2", "Quem diz: “Vai ter festa na lagoa!”?", "Toque na resposta certa",
      "O SAPO", ["A PATA", "O narrador", "A plateia"]),
    mc("pd-g28-a3", "O que o sapo toca na festa?", "Toque na resposta certa",
      "O tambor", ["O violão", "A flauta", "O piano"]),
    mc("pd-g28-a4", "As palavras entre parênteses, como (pulando, animado), mostram...", "Toque na resposta certa",
      "como o ator deve agir", ["quanto custa o ingresso", "o nome do autor", "a hora do fim"], "medium"),
    tf("pd-g28-a5", "O nome do personagem aparece antes da fala dele.", true),
    mc("pd-g28-a6", "O que acontece no final da peça?", "Toque na resposta certa",
      "As luzes se acendem e os dois dançam juntos", ["O sapo vai embora", "A pata dorme", "A lagoa seca"]),
  ),
  match("pd-g28-a7", "Ligue cada pessoa ao que ela faz no teatro", [
    ["Ator", "Dá vida ao personagem"],
    ["Figurinista", "Faz as roupas"],
    ["Diretor", "Orienta o ensaio"],
    ["Plateia", "Assiste à peça"],
  ], "medium"),
  mc("pd-g28-a8", "Quem assiste à peça de teatro?", "Toque na resposta certa",
    "A plateia", ["O diretor", "O cenário", "A luz"]),
  mc("pd-g28-a9", "O cenário é...", "Toque na resposta certa",
    "O lugar e os objetos da cena", ["A música da peça", "O nome do ator", "O bilhete do ingresso"], "medium"),
  mc("pd-g28-a10", "O treino que os atores fazem antes da apresentação se chama...", "Toque na resposta certa",
    "ensaio", ["recreio", "intervalo", "rima"]),
];

// ---------------------------------------------------------------------------
// Grupo 29 — Quem fala, fala com quem? (jeitos de falar e escrever)
// ---------------------------------------------------------------------------
const g29Activities: Activity[] = [
  read("pd-g29-leitura", "Duas mensagens do Davi", [
    "Mensagem 1, para o amigo Caio: “E aí, Caio! Bora jogar bola hoje? Chama a galera!”",
    "Mensagem 2, para a diretora: “Bom dia, diretora Sílvia. Gostaria de pedir permissão para usar a quadra amanhã. Muito obrigado.”",
  ]),
  ...txt("pd-g29-leitura",
    mc("pd-g29-a1", "Para quem Davi escreveu a mensagem 1?", "Toque na resposta certa",
      "Para o amigo Caio", ["Para a diretora", "Para a vovó", "Para o professor"]),
    mc("pd-g29-a2", "Para quem Davi escreveu a mensagem 2?", "Toque na resposta certa",
      "Para a diretora Sílvia", ["Para o amigo Caio", "Para o irmão", "Para o vizinho"]),
    mc("pd-g29-a3", "O que Davi pede na mensagem 2?", "Toque na resposta certa",
      "Para usar a quadra", ["Para ganhar um doce", "Para sair mais cedo", "Para trazer um cachorro"]),
    mc("pd-g29-a4", "Qual mensagem é mais cuidadosa e educada?", "Toque na resposta certa",
      "A mensagem 2", ["A mensagem 1", "As duas são iguais", "Nenhuma delas"], "medium"),
    mc("pd-g29-a5", "Por que Davi escreveu de jeitos diferentes?", "Toque na resposta certa",
      "Porque falou com pessoas diferentes", ["Porque estava com sono", "Porque errou", "Porque o lápis quebrou"], "medium"),
    tf("pd-g29-a6", "Com amigos, podemos usar um jeito mais solto de falar.", true),
  ),
  mc("pd-g29-a7", "Qual é um jeito educado de pedir ajuda à professora?", "Toque na resposta certa",
    "Professora, a senhora pode me ajudar, por favor?",
    ["Ei, me ajuda aí!", "Faz pra mim!", "Anda logo!"]),
  mc("pd-g29-a8", "Qual está escrito do jeito certo para a escola?", "Toque na resposta certa",
    "Você gosta de bolo?", ["Vc gosta d bolo?", "Cê gosta d bolu?", "Voce gosta bolo?"], "medium"),
  mc("pd-g29-a9", "Qual frase é de conversa entre amigos?", "Toque na resposta certa",
    "Oi, amigão, vamos brincar?", ["Prezada senhora, bom dia.", "Excelentíssimo senhor diretor.", "Atenciosamente, a secretária."], "medium"),
  match("pd-g29-a10", "Ligue a situação ao melhor jeito de falar", [
    ["Conversar com a vovó", "Carinhoso e respeitoso"],
    ["Escrever para a diretora", "Educado e cuidadoso"],
    ["Bilhete para um amigo", "Solto e divertido"],
    ["Pedir informação a um desconhecido", "Educado e claro"],
  ], "medium"),
  mc("pd-g29-a11", "Para escolher como falar, a gente pensa em...", "Toque na resposta certa",
    "com quem estamos falando", ["só na cor da roupa", "só no horário", "só no tamanho da letra"], "medium"),
];

// ---------------------------------------------------------------------------
// Grupo 30 — Opinião sobre livros (resenha)
// ---------------------------------------------------------------------------
const g30Activities: Activity[] = [
  read("pd-g30-leitura", "Resenha: O dragão que tinha soluço", [
    "Atenção: o livro desta resenha é de faz de conta, inventado para esta atividade.",
    "O dragão que tinha soluço conta a história de Rex, um dragão que, toda vez que soltava um “hic!”, lançava uma bolinha de fogo e queimava as coisas.",
    "Eu gostei muito do livro porque ele é engraçado e as ilustrações são coloridas. A parte de que mais gostei foi quando o dragão assou um marshmallow sem querer.",
    "Só não gostei de uma coisa: o final é rápido demais.",
    "Eu recomendo para quem gosta de histórias divertidas. Vale a pena ler!",
  ]),
  ...txt("pd-g30-leitura",
    mc("pd-g30-a1", "Quem é Rex?", "Toque na resposta certa",
      "Um dragão", ["Um gato", "Um menino", "Um robô"]),
    mc("pd-g30-a2", "Por que Rex queimava as coisas?", "Toque na resposta certa",
      "Cada soluço soltava uma bolinha de fogo", ["Ele brincava com fósforos", "Ele estava com raiva", "Ele gostava de cozinhar"]),
    mc("pd-g30-a3", "Qual foi a parte de que a pessoa mais gostou?", "Toque na resposta certa",
      "Quando o dragão assou um marshmallow sem querer", ["Quando Rex dormiu", "Quando Rex voou", "Quando o livro acabou"], "medium"),
    mc("pd-g30-a4", "De que a pessoa não gostou?", "Toque na resposta certa",
      "Do final, que é rápido demais", ["Das ilustrações", "Do nome do dragão", "Do título"], "medium"),
    tf("pd-g30-a5", "A pessoa que escreveu recomenda o livro.", true),
    mc("pd-g30-a6", "Por que a pessoa gostou do livro?", "Toque na resposta certa",
      "Porque é engraçado e tem ilustrações coloridas", ["Porque é muito curto", "Porque é triste", "Porque não tem desenhos"], "medium"),
  ),
  mc("pd-g30-a7", "Quando alguém diz “gostei” ou “não gostei”, está dando a sua...", "Toque na resposta certa",
    "opinião", ["rima", "sílaba", "legenda"]),
  mc("pd-g30-a8", "Qual frase é uma opinião?", "Toque na resposta certa",
    "Esse filme é muito emocionante.",
    ["O filme dura duas horas.", "O filme foi feito em 2020.", "O filme tem um cachorro."], "medium"),
  mc("pd-g30-a9", "Spoiler é...", "Toque na resposta certa",
    "Contar o final e estragar a surpresa", ["Desenhar a capa", "Fechar o livro", "Escolher o título"], "medium"),
  mc("pd-g30-a10", "Quem faz os desenhos de um livro é o...", "Toque na resposta certa",
    "ilustrador", ["editor", "leitor", "narrador"]),
  match("pd-g30-a11", "Ligue cada item da ficha do livro ao que ele quer dizer", [
    ["Título", "O nome do livro"],
    ["Autor", "Quem escreveu"],
    ["Ilustrador", "Quem desenhou"],
    ["Editora", "A empresa que publica"],
  ], "medium"),
];

// ---------------------------------------------------------------------------
// Grupo 31 — Histórias que conversam com outras
// ---------------------------------------------------------------------------
const g31Activities: Activity[] = [
  read("pd-g31-leitura", "O capuz e o lobo amigo", [
    "Era uma vez uma menina que usava um capuz vermelho. Um dia, ela foi levar bolo para a vovó.",
    "No meio da floresta, encontrou um lobo.",
    "— Cuidado! — pensou ela. — Dizem que lobos são maus.",
    "Mas o lobo só queria um amigo. — Posso ir com você? — perguntou ele, de cabeça baixa.",
    "A menina riu e deu um pedaço de bolo ao lobo. Os três tomaram chá e viraram amigos.",
  ]),
  ...txt("pd-g31-leitura",
    mc("pd-g31-a1", "De que cor era o capuz da menina?", "Toque na resposta certa",
      "Vermelho", ["Azul", "Amarelo", "Verde"]),
    mc("pd-g31-a2", "O que a menina levava para a vovó?", "Toque na resposta certa",
      "Bolo", ["Flores", "Livros", "Sopa"]),
    mc("pd-g31-a3", "O que o lobo queria?", "Toque na resposta certa",
      "Um amigo", ["Um bolo inteiro", "Assustar a menina", "Dormir na floresta"]),
    mc("pd-g31-a4", "Essa história lembra qual conto conhecido?", "Toque na resposta certa",
      "Chapeuzinho Vermelho", ["Cinderela", "Os Três Porquinhos", "Branca de Neve"], "medium"),
    mc("pd-g31-a5", "No conto conhecido, o lobo é mau. Nesta história, o lobo é...", "Toque na resposta certa",
      "bonzinho e amigo", ["ainda mais mau", "um dragão", "um gato"], "medium"),
    tf("pd-g31-a6", "Nesta história, o lobo engole a vovó.", false),
    order("pd-g31-a7", "Coloque os fatos na ordem certa", [
      "A menina vai levar bolo para a vovó.",
      "Ela encontra o lobo na floresta.",
      "O lobo pede para ir junto.",
      "Os três viram amigos.",
    ]),
  ),
  mc("pd-g31-a8", "Qual conto tem uma menina que perde um sapatinho de cristal no baile?", "Toque na resposta certa",
    "Cinderela", ["Rapunzel", "Pinóquio", "Peter Pan"]),
  mc("pd-g31-a9", "Qual conto tem sete anões?", "Toque na resposta certa",
    "Branca de Neve", ["Cinderela", "Pinóquio", "Aladim"]),
  mc("pd-g31-a10", "Em qual conto aparece um lobo que sopra as casas dos irmãos?", "Toque na resposta certa",
    "Os Três Porquinhos", ["Branca de Neve", "Cinderela", "O Patinho Feio"], "medium"),
  match("pd-g31-a11", "Ligue a pista ao conto", [
    ["Sapatinho de cristal", "Cinderela"],
    ["Sete anões", "Branca de Neve"],
    ["Casa de doces", "João e Maria"],
    ["Capuz vermelho", "Chapeuzinho Vermelho"],
  ], "medium"),
];

export const portuguesDivertidoGrupos3: LessonGroup[] = [
  grupo(22, "Nomes de Tudo",
    "Substantivos: nomes de pessoas, bichos, lugares e coisas; nomes comuns e próprios.",
    "Lili passeia pela cidade e descobre que tudo tem nome, e que os nomes especiais começam com letra grande.",
    IMG_CRIANCAS, g22Activities),
  grupo(23, "Menino, Menina, Um e Vários",
    "Masculino e feminino; singular e plural.",
    "Lili brinca de trocar o menino pela menina e de contar um, dois, vários.",
    IMG_LETRAS, g23Activities),
  grupo(24, "Grandão e Pequenininho",
    "Aumentativo e diminutivo: -inho, -zinho e -ão.",
    "Lili encontra um cachorrão e um biscoitinho e descobre como as palavras ficam grandes ou pequenas.",
    IMG_FLORESTA, g24Activities),
  grupo(25, "Bando, Manada e Cia.",
    "Palavras que nomeiam grupos e nomes de sentimentos.",
    "Lili visita a fazenda e o mar e aprende o nome de cada grupo de bichos.",
    IMG_FLORESTA, g25Activities),
  grupo(26, "Tipos de Texto",
    "Receita, mapa, poema, entrevista e cartaz: para que serve cada um.",
    "Lili prepara uma vitamina e descobre que cada texto tem seu jeito e sua função.",
    IMG_LIVRO, g26Activities),
  grupo(27, "Direitos das Crianças",
    "O que é o ECA e quais são alguns direitos das crianças.",
    "Lili conversa com a turma sobre brincar, estudar, ter saúde e ser respeitada.",
    IMG_CRIANCAS, g27Activities),
  grupo(28, "Hora do Teatro",
    "Peça de teatro: personagens, falas, rubricas, cenário e plateia.",
    "Lili sobe ao palco da lagoa e descobre o que cada pessoa faz em uma peça.",
    IMG_FLORESTA, g28Activities),
  grupo(29, "Quem Fala, Fala com Quem?",
    "Jeito de falar com amigos e com pessoas mais velhas; escrever certinho na escola.",
    "Lili percebe que a gente fala de um jeito com o amigo e de outro com a diretora.",
    IMG_CRIANCAS, g29Activities),
  grupo(30, "Opinião sobre Livros",
    "Resenha: contar um pouco do livro e dizer o que achou, sem estragar a surpresa.",
    "Lili vira crítica de livros e aprende a dar sua opinião com educação.",
    IMG_LIVRO, g30Activities),
  grupo(31, "Histórias que Conversam",
    "Quando uma história lembra outra: contos conhecidos com um toque novo.",
    "Lili encontra um lobo bonzinho e descobre que as histórias podem conversar entre si.",
    IMG_LIVRO, g31Activities),
];
