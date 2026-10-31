import { grupo, IMG, IMG_CRIANCAS, IMG_FLORESTA, IMG_LETRAS, IMG_LIVRO, mc, read, txt, withImage } from "./shared";
import type { GrupoParcial } from "./shared";

// Unidade 2 — Amor. Capítulo 1: O tempo do amor (parte A).

const I = "Toque na resposta certa";
const IMG_PAI = `${IMG}/u2-tira-historia.jpg`;
const IMG_SHOW = `${IMG}/u2-tira-mostre-conte.jpg`;

// ---------------------------------------------------------------------------
// G1 — Abertura da unidade: pintura e poema
// ---------------------------------------------------------------------------
const abertura = read("p9u2-abertura", "Uma pintura e um poema sobre o amor", [
  "Pintura “O aniversário”, de Marc Chagall (1915): um homem e uma mulher se beijam em um quarto. Ela segura um buquê e fica firme no chão, enquanto ele, de tão feliz, flutua no ar e curva o corpo para alcançá-la. Sobre a mesa há flores e um bolo. A cena lembra o beijo que o artista deu na esposa, Bella, no dia do aniversário dela.",
  "Poema “O mundo é grande”, de Carlos Drummond de Andrade (resumo): o mundo é enorme, mas cabe em uma janela com vista para o mar; o mar é imenso, mas cabe em uma cama de amar; e o amor, que também é grande, cabe no pequeno espaço de um beijo.",
], "Baseado em Marc Chagall, “O aniversário”, 1915, e em Carlos Drummond de Andrade, “O mundo é grande”, Amar se aprende amando (Record, 2009).");

const g1: GrupoParcial = grupo(
  "Um beijo, um poema: abrindo a unidade do Amor",
  "Relacionar uma pintura e um poema que falam do amor e refletir sobre o que o amor representa.",
  "Antes de estudar poemas e contos sobre o amor, olhamos para uma pintura famosa e um poema curtinho.",
  IMG_LETRAS,
  [
    abertura,
    ...txt("p9u2-abertura",
      mc("p9u2-g1-a1", "O que a pintura de Chagall retrata?", I,
        "Um casal que se beija em comemoração, com flores e um bolo sobre a mesa.",
        ["Uma paisagem de campo sem pessoas.", "Uma briga entre dois amigos.", "Uma sala de aula cheia de alunos."]),
      mc("p9u2-g1-a2", "Quem são as pessoas retratadas e que hipótese o nome da obra permite levantar?", I,
        "São o artista e a esposa, e o nome sugere uma comemoração de aniversário.",
        ["São dois desconhecidos, e o nome sugere uma despedida.", "São dois irmãos, e o nome sugere uma viagem.", "São um professor e um aluno, e o nome sugere uma prova."], "medium"),
      mc("p9u2-g1-a3", "Na pintura, os personagens parecem flutuar. O que esse detalhe pode representar?", I,
        "A grande felicidade e o amor entre eles, que parecem leves e “nas alturas”.",
        ["Que o quarto está cheio de água.", "Que eles estão com medo de cair.", "Que a pintura foi feita de cabeça para baixo."], "medium"),
      mc("p9u2-g1-a4", "Para o eu lírico do poema, como é o amor?", I,
        "Grande, mas capaz de caber em algo pequeno, como um beijo.",
        ["Pequeno demais para ser percebido.", "Impossível de sentir.", "Maior que o mundo e que nunca cabe em lugar nenhum."], "medium"),
      mc("p9u2-g1-a5", "Que relação é possível fazer entre a pintura e o poema?", I,
        "Os dois mostram o amor como algo imenso que se concentra em um gesto simples: o beijo.",
        ["Os dois falam de viagens ao redor do mundo.", "Os dois criticam o casamento.", "Não há relação alguma entre eles."], "medium"),
    ),
  ]
);

// ---------------------------------------------------------------------------
// G2 — Poemas lidos e Estudo do texto 1 a 5
// ---------------------------------------------------------------------------
const poemaTempo = read("p9u2-poema-tempo", "O tempo passa? Não passa (resumo)", [
  "Resumo do poema de Carlos Drummond de Andrade. O eu lírico pergunta se o tempo passa e responde que não, porque dentro do “abismo do coração” a graça do amor continua florindo, como uma canção.",
  "O tempo aproxima os amantes cada vez mais e os reduz a um só verso e uma rima de mãos e olhos, na luz. Para eles, não existe tempo gasto nem tempo a economizar: o tempo é todo vestido de amor e de tempo de amar.",
  "O tempo dos dois ultrapassa qualquer medida e, além do amor, não há nada; amar é o sumo da vida. Ontem e hoje são apenas mitos de calendário, e o aniversário da amada é um nascer a toda hora. O amor deles brotou do tempo, mas não tem idade, pois só quem ama escutou o apelo da eternidade.",
], "Baseado em Carlos Drummond de Andrade, “O tempo passa? Não passa”, Amar se aprende amando (Record, 2009).");

const poemaSoneto = read("p9u2-poema-soneto", "Soneto de fidelidade (resumo)", [
  "Resumo do soneto de Vinicius de Moraes. O eu lírico promete ser atento ao seu amor antes de tudo, com zelo, sempre e tanto, de modo que, mesmo diante do maior encanto, o seu pensamento se encante ainda mais com a pessoa amada.",
  "Ele quer viver o amor em cada momento, mesmo os mais banais, cantar seu louvor, rir seu riso e derramar seu pranto, tanto no pesar quanto no contentamento da pessoa amada.",
  "Nos últimos versos, imagina que, quando a morte, a solidão ou a angústia o procurarem, poderá dizer do amor que viveu: que não seja imortal, pois é chama, mas que seja infinito enquanto dure.",
], "Baseado em Vinicius de Moraes, “Soneto de fidelidade”, Poesia completa e prosa (Aguilar, 1974).");

const g2: GrupoParcial = grupo(
  "O tempo do amor em dois poemas",
  "Interpretar os poemas de Drummond e de Vinicius: enjambement, tema e a relação entre amor e tempo.",
  "Dois grandes poetas brasileiros falam do amor: um diz que o tempo não passa, o outro promete fidelidade intensa.",
  IMG_LIVRO,
  [
    poemaTempo,
    poemaSoneto,
    ...txt("p9u2-poema-tempo",
      mc("p9u2-g2-a1", "Enjambement (ou encadeamento) é a continuidade da ideia de um verso no verso seguinte. No começo do poema de Drummond, onde ele aparece?", I,
        "Em “Não passa / no abismo do coração” e em “a graça / do amor”, em que a frase continua no verso seguinte.",
        ["Em cada verso que termina com ponto final.", "Apenas no título do poema.", "Em nenhuma parte do poema."], "hard"),
      mc("p9u2-g2-a2", "Nos primeiros versos do soneto de Vinicius aparece também um enjambement acompanhado de inversão (“Antes de tudo ... atento”). Como ficaria na ordem direta?", I,
        "“Serei atento ao meu amor antes de tudo, e com tal zelo, e sempre, e tanto”.",
        ["“O amor serei antes de atento tudo”.", "“Atento tudo, ao meu antes amor serei”.", "“Serei de tudo antes ao amor atento nunca”."], "hard"),
      mc("p9u2-g2-a3", "Qual é o tema comum aos dois poemas?", I,
        "O amor em sua relação com o tempo.",
        ["A rotina de trabalho.", "A saudade da escola.", "A beleza da natureza."]),
      mc("p9u2-g2-a4", "No título “O tempo passa? Não passa”, em que condição o tempo não passa para o eu lírico?", I,
        "No abismo do coração, quando os amantes se amam de verdade.",
        ["Quando chove o dia inteiro.", "Quando se dorme demais.", "Quando o relógio quebra."], "medium"),
      mc("p9u2-g2-a5", "É possível medir o amor, segundo o eu lírico?", I,
        "Não: para ele, não existe tempo consumido nem tempo a economizar, e o amor ultrapassa qualquer medida.",
        ["Sim: ele pode ser medido em horas.", "Sim: ele diminui com o passar dos anos.", "Sim: ele se mede pela idade dos amantes."], "medium"),
      mc("p9u2-g2-a6", "Que importância têm o passado e o presente para os amantes?", I,
        "Nenhuma: como o amor está presente a todo instante, passado, presente e futuro se fundem em um só.",
        ["O passado importa mais que tudo.", "Só o presente importa, e o passado deve ser esquecido por mágoa.", "Só o futuro tem importância."], "hard"),
      mc("p9u2-g2-a7", "O que seria uma “rima de mãos e olhos”?", I,
        "Uma sintonia, uma grande afinidade entre os amantes.",
        ["Uma brincadeira de adivinhação.", "Um jogo de palavras sem sentido.", "Uma briga entre duas pessoas."], "medium"),
      mc("p9u2-g2-a8", "Qual é a relação entre amor, tempo e eternidade para o eu lírico de Drummond?", I,
        "Quando se ama de verdade, o tempo para, e o amor passa a existir em um tempo de eternidade.",
        ["O tempo destrói o amor aos poucos.", "A eternidade só existe depois que o amor termina.", "O amor depende do calendário para existir."], "hard"),
    ),
  ]
);

// ---------------------------------------------------------------------------
// G3 — Estudo do texto 6 a 9
// ---------------------------------------------------------------------------
const g3: GrupoParcial = grupo(
  "Fidelidade, entrega e duração do amor",
  "Interpretar o “Soneto de fidelidade”, as figuras de linguagem e comparar os dois poemas.",
  "Será que amor verdadeiro significa entrega total? E quanto tempo um amor pode durar? Comparamos o que cada poeta pensa.",
  IMG_FLORESTA,
  [
    ...txt("p9u2-poema-soneto",
      mc("p9u2-g3-a1", "No soneto, o que significam as expressões “serei atento” e “maior encanto”?", I,
        "“Serei atento” significa zelar, cuidar; “maior encanto” é outra pessoa encantadora.",
        ["“Serei atento” significa vigiar; “maior encanto” é um feitiço.", "“Serei atento” significa ficar quieto; “maior encanto” é um presente caro.", "As duas expressões significam “esquecer o amor”."], "medium"),
      mc("p9u2-g3-a2", "De acordo com o poema, o amor verdadeiro implica entrega e exclusividade?", I,
        "Sim: a entrega aparece em “com tal zelo, e sempre, e tanto” e a exclusividade, em ele continuar se encantando com a mesma pessoa mesmo diante do maior encanto.",
        ["Não: o poema diz que o amor é livre e sem compromisso.", "Não: o poema trata só da morte.", "Sim, mas só quando há presentes."], "hard"),
      mc("p9u2-g3-a3", "Em que circunstâncias da vida o amor deve se manter forte?", I,
        "Em todas, tristes ou alegres, como indica “ao seu pesar ou seu contentamento”.",
        ["Apenas nas festas.", "Apenas na juventude.", "Apenas quando há dinheiro."], "medium"),
      mc("p9u2-g3-a4", "Na última estrofe, o eu lírico define o amor com uma metáfora. Qual é ela e o que significa?", I,
        "O amor é equiparado a uma chama: como o fogo, ele se apaga, acaba.",
        ["O amor é uma pedra: dura para sempre.", "O amor é um rio: sempre cheio.", "O amor é um muro: separa as pessoas."], "medium"),
      mc("p9u2-g3-a5", "“Infinito enquanto dure” é um paradoxo. Por quê, e que sentido ele tem aqui?", I,
        "Porque junta ideias opostas (infinito e limite); quer dizer que o amor é sem limite em intensidade e qualidade, mesmo que acabe um dia.",
        ["Porque repete a mesma palavra duas vezes.", "Porque diz que o amor nunca começou.", "Porque promete que o amor jamais terminará."], "hard"),
      mc("p9u2-g3-a6", "Qual afirmação traduz melhor o conceito de fidelidade e de amor no soneto?", I,
        "O amor não é eterno, mas, enquanto dura, exige uma entrega intensa e infinita em qualidade.",
        ["O amor é sempre eterno e nunca acaba.", "O amor é só uma brincadeira passageira.", "A fidelidade é só uma regra social sem valor."], "hard"),
      mc("p9u2-g3-a7", "Compare os poemas quanto à entrega, à intensidade e à fidelidade: o que têm em comum?", I,
        "Os dois veem o amor como entrega total, persistência, intensidade e fidelidade.",
        ["Só o de Drummond fala de entrega.", "Só o de Vinicius fala de intensidade.", "Os dois negam a fidelidade."], "medium"),
      mc("p9u2-g3-a8", "E quanto à duração do amor, o que os poemas dizem?", I,
        "Drummond fala de um amor contínuo, que chega à eternidade; Vinicius admite que o amor pode acabar (“infinito enquanto dure”).",
        ["Os dois dizem que o amor dura um dia só.", "Os dois dizem que o amor é eterno sem exceções.", "Os dois dizem que o amor não existe."], "hard"),
    ),
  ]
);

// ---------------------------------------------------------------------------
// G4 — A linguagem do texto, Trocando ideias e declamação
// ---------------------------------------------------------------------------
const g4: GrupoParcial = grupo(
  "A linguagem dos poemas e a troca de ideias",
  "Comparar o nível de formalidade dos poemas, reconhecer o polissíndeto e refletir sobre o amor “de verdade”.",
  "Um poema usa palavras simples; o outro, uma linguagem elevada. Também conversamos sobre o amor nos dias de hoje.",
  IMG_CRIANCAS,
  [
    mc("p9u2-g4-a1", "Em qual dos poemas a linguagem é menos elaborada, com palavras e construções mais acessíveis?", I,
      "No de Drummond, que usa expressões como “lá dentro”, “cada vez mais” e “toda hora”.",
      ["No de Vinicius, que usa “hei de espalhar”.", "Em nenhum: os dois são iguais.", "No título do poema de Vinicius."], "medium"),
    mc("p9u2-g4-a2", "Em qual dos poemas a linguagem é mais elevada e formal?", I,
      "No de Vinicius, com inversões e construções como “mesmo em face” e “hei de espalhar”.",
      ["No de Drummond, com “lá dentro”.", "Nos dois, com a mesma formalidade.", "Em nenhum dos dois."], "medium"),
    mc("p9u2-g4-a3", "No verso “Antes, e com tal zelo, e sempre, e tanto” há polissíndeto. Em que ele consiste e que efeito produz?", I,
      "Na repetição da conjunção “e”; dá a ideia de ações que se somam sem parar, mostrando dedicação e cuidado.",
      ["Na repetição de um adjetivo; mostra tristeza.", "Na ausência total de conjunções; deixa o verso rápido.", "Na troca de palavras opostas; cria um paradoxo."], "hard"),
    mc("p9u2-g4-a4", "Se, em “De tudo, ao meu amor serei atento”, o verbo de ligação ser fosse trocado por parecer, o sentido permaneceria o mesmo?", I,
      "Não: “parecerei atento” sugere uma dedicação só aparente, não verdadeira.",
      ["Sim: os dois verbos significam exatamente o mesmo.", "Sim: só muda o tempo verbal.", "Não: mas só porque o verso ficaria mais curto."], "hard"),
    mc("p9u2-g4-a5", "E se o verbo fosse estar (“estarei atento”)?", I,
      "O sentido ficaria próximo do original, mas a dedicação soaria menos duradoura, mais passageira.",
      ["O sentido seria exatamente igual.", "O verso significaria o oposto.", "O verso deixaria de fazer sentido."], "hard"),
    mc("p9u2-g4-a6", "Em um debate sobre se ainda existe amor “de verdade” hoje, qual postura ajuda a conversa ser respeitosa?", I,
      "Dar opinião com argumentos, ouvir os colegas e respeitar os turnos de fala.",
      ["Interromper quem pensa diferente.", "Zombar das opiniões dos outros.", "Falar bem baixo para ninguém ouvir."]),
    mc("p9u2-g4-a7", "Para você, o amor deve ser entrega total ou ter regras e limites? Qual resposta apresenta uma justificativa?", I,
      "“Acho que o amor precisa de entrega e de limites, porque sem respeito um dos dois acaba se machucando.”",
      ["“Não sei e não me importo.”", "“Porque sim.”", "“Todo mundo pensa igual a mim.”"]),
    mc("p9u2-g4-a8", "Para declamar bem um poema em dupla, o que vocês devem fazer?", I,
      "Valorizar vírgulas, ritmo e rimas, destacar palavras-chave, treinar e ouvir sugestões do colega.",
      ["Ler o mais rápido possível sem pausas.", "Ler em tom monótono para não errar.", "Decorar só o título."]),
  ]
);

// ---------------------------------------------------------------------------
// G5 — Orações subordinadas adjetivas: construindo o conceito
// ---------------------------------------------------------------------------
const versos = read("p9u2-versos", "Versos para analisar", [
  "Trecho do poema de Drummond: “E nosso amor, que brotou / do tempo, não tem idade, / pois só quem ama escutou / o apelo da eternidade.”",
], "Trecho de Carlos Drummond de Andrade, “O tempo passa? Não passa”, Amar se aprende amando (Record, 2009).");

const g5: GrupoParcial = grupo(
  "Orações subordinadas adjetivas",
  "Reconhecer a oração subordinada adjetiva, que funciona como um adjetivo, e diferenciá-la em restritiva e explicativa.",
  "“Nosso amor, que brotou do tempo, não tem idade.” A parte entre vírgulas é uma oração que descreve um substantivo.",
  IMG_LETRAS,
  [
    versos,
    ...txt("p9u2-versos",
      mc("p9u2-g5-a1", "O que a expressão “brotou do tempo” sugere sobre o amor do eu lírico?", I,
        "Que o amor nasceu da convivência ao longo do tempo.",
        ["Que o amor nasceu de repente, sem convivência.", "Que o amor é uma planta.", "Que o amor já acabou."], "medium"),
      mc("p9u2-g5-a2", "Que formas verbais há na frase “E nosso amor, que brotou do tempo, não tem idade” e que orações ela forma?", I,
        "Brotou e tem; as orações são “nosso amor não tem idade” e “que brotou do tempo”.",
        ["Nosso e idade; as orações são “nosso amor” e “idade”.", "Só há uma forma verbal e uma oração.", "Há três formas verbais e três orações."], "medium"),
      mc("p9u2-g5-a3", "Transforme a frase em duas frases de período simples.", I,
        "“Nosso amor não tem idade. Nosso amor brotou do tempo.”",
        ["“Nosso amor brotou. Idade tem tempo.”", "“Amor que brotou. Não tem tempo idade.”", "“Nosso amor tem idade. Brotou o tempo.”"], "medium"),
      mc("p9u2-g5-a4", "A oração “que brotou do tempo” se refere a qual termo?", I,
        "“Nosso amor”.",
        ["“Tempo”.", "“Idade”.", "“Não tem”."]),
      mc("p9u2-g5-a5", "De que maneira ela modifica esse termo?", I,
        "Descrevendo-o, caracterizando-o, como faz um adjetivo.",
        ["Acrescentando circunstância de tempo ou lugar, como um advérbio.", "Completando o sentido de um verbo.", "Substituindo o sujeito da frase."], "medium"),
      mc("p9u2-g5-a6", "Essa oração tem papel de substantivo, de adjetivo ou de advérbio?", I,
        "De adjetivo: por isso é uma oração subordinada adjetiva.",
        ["De substantivo.", "De advérbio.", "De verbo."]),
      mc("p9u2-g5-a7", "Compare: “Os alunos do 9º ano que tiveram notas baixas terão reforço” e “Os alunos do 9º ano, que tiveram notas baixas, terão reforço”. Qual é a diferença de sentido?", I,
        "Na primeira, só alguns alunos terão reforço; na segunda, todos terão, e a oração explica o porquê.",
        ["Não há nenhuma diferença.", "Na primeira todos terão reforço; na segunda, só alguns.", "Nas duas, ninguém terá reforço."], "hard"),
      mc("p9u2-g5-a8", "A oração adjetiva sem vírgulas, que restringe o sentido do antecedente, chama-se:", I,
        "Restritiva.",
        ["Explicativa.", "Substantiva.", "Adverbial."]),
      mc("p9u2-g5-a9", "E a que vem entre vírgulas e acrescenta uma informação sobre todo o grupo?", I,
        "Explicativa.",
        ["Restritiva.", "Coordenada.", "Reduzida de infinitivo."]),
    ),
  ]
);

// ---------------------------------------------------------------------------
// G6 — Exercícios: tira da história e efeito estufa
// ---------------------------------------------------------------------------
const tiraHistoria = withImage(read("p9u2-tira-historia", "Tira: a história para dormir", [
  "Tira em 3 quadrinhos. Um pai coruja está sentado na beira da cama, com um livro nas mãos, ao lado de dois filhotes deitados.",
  "Quadrinho 1. Pai: “Hoje eu vou contar uma história para vocês dormirem.”",
  "Quadrinho 2. Pai: “Era uma vez aquela fada que cuidava das faturas mágicas que chegavam todo mês...”",
  "Quadrinho 3. Os dois filhotes já estão dormindo, de olhos fechados, com bolinhas de “zzz” sobre a cabeça. O pai sorri, satisfeito.",
]), IMG_PAI, "Tira: um pai conta uma história chata para os filhos dormirem");

const estufa = read("p9u2-estufa", "O efeito estufa (resumo)", [
  "Um texto de divulgação científica explica que o efeito estufa, em si, é bom: sem ele, a Terra seria um picolé. Ele funciona como um cobertor de gases que retêm o calor da luz solar perto da superfície do planeta.",
  "O principal causador é o dióxido de carbono, o gás que soltamos quando respiramos e que não é tóxico para os seres vivos. Por isso, não se pode chamá-lo de poluente.",
], "Baseado em “A poluição causa o efeito estufa”, revista Galileu, n. 172, nov. 2005.");

const g6: GrupoParcial = grupo(
  "Adjetivas restritivas na tira e no texto científico",
  "Identificar antecedentes e classificar orações adjetivas em uma tira e em um texto sobre o efeito estufa.",
  "Um pai que quer ver os filhos dormirem e um texto sobre o efeito estufa ajudam a treinar as orações adjetivas.",
  IMG_FLORESTA,
  [
    tiraHistoria,
    ...txt("p9u2-tira-historia",
      withImage(mc("p9u2-g6-a1", "Qual é a estratégia do pai para fazer os filhos dormirem?", I,
        "Contar uma história provavelmente desinteressante.",
        ["Cantar bem alto.", "Apagar todas as luzes da casa.", "Prometer um brinquedo."]), IMG_PAI, "Tira: um pai conta uma história chata para os filhos dormirem"),
      mc("p9u2-g6-a2", "No segundo quadrinho, o pronome relativo “que” aparece duas vezes. Qual é o antecedente de cada um?", I,
        "Na primeira vez, “fada”; na segunda, “faturas mágicas”.",
        ["Na primeira, “história”; na segunda, “mês”.", "Em ambas, “pai”.", "Na primeira, “filhos”; na segunda, “cama”."], "medium"),
      mc("p9u2-g6-a3", "Como se classificam as orações introduzidas por “que” nessa fala?", I,
        "Orações subordinadas adjetivas restritivas.",
        ["Orações subordinadas adjetivas explicativas.", "Orações coordenadas aditivas.", "Orações subordinadas adverbiais."], "medium"),
    ),
    estufa,
    ...txt("p9u2-estufa",
      mc("p9u2-g6-a4", "Em “cobertor de gases que retêm o calor... perto da superfície do planeta”, “que emitimos” e “que não tem efeito tóxico”, há três orações adjetivas. Quais são elas?", I,
        "“que retêm o calor da luz solar perto da superfície do planeta”, “que emitimos” e “que não tem efeito tóxico nenhum sobre os seres vivos”.",
        ["“sem ele, a Terra seria um picolé”, “que emitimos” e “portanto”.", "“o efeito funciona”, “o gás” e “o dióxido”.", "Só existe uma oração adjetiva."], "hard"),
      mc("p9u2-g6-a5", "Como se classificam essas orações e por quê?", I,
        "São restritivas, pois restringem o sentido de “cobertor de gases” e de “gás”, indicando qual cobertor e qual gás.",
        ["São explicativas, pois dão uma informação sobre todos os gases.", "São substantivas, pois funcionam como sujeito.", "São adverbiais, pois indicam o tempo."], "hard"),
    ),
  ]
);

// ---------------------------------------------------------------------------
// G7 — Tira do "mostre e conte"
// ---------------------------------------------------------------------------
const tiraShow = withImage(read("p9u2-tira-show", "Tira: mostre e conte", [
  "Tira em 4 quadrinhos. Duas crianças, a Bia, de laço roxo, e o Léo, de moletom azul, conversam sobre a atividade “mostre e conte” da escola.",
  "Quadrinho 1. Bia, sorrindo: “Hoje na escola é dia de mostre e conte!”",
  "Quadrinho 2. Bia, animada, mostra um envelope: “Eu trouxe a carta que eu escrevi para o prefeito!”",
  "Quadrinho 3. Léo mostra um potinho: “Eu trouxe insetos mortos que eu peguei no parapeito da janela!” Bia faz cara de nojo.",
  "Quadrinho 4. Bia sai correndo, deixando uma nuvem de poeira. Léo, sozinho, grita: “Depois eu vou comer eles no lanche!”",
]), IMG_SHOW, "Tira: uma criança mostra uma carta e outra, insetos mortos");

const g7: GrupoParcial = grupo(
  "Tira: mostre e conte",
  "Relacionar texto e imagem em uma tira e identificar as orações adjetivas dela.",
  "Duas crianças levam coisas bem diferentes para a atividade “mostre e conte”. As expressões dos rostos e as falas contam a história.",
  IMG_CRIANCAS,
  [
    tiraShow,
    ...txt("p9u2-tira-show",
      withImage(mc("p9u2-g7-a1", "O que a expressão de Bia indica nos dois primeiros quadrinhos?", I,
        "Animação e satisfação com o que levou para mostrar.",
        ["Medo.", "Sono.", "Raiva dos colegas."]), IMG_SHOW, "Tira: uma criança mostra uma carta e outra, insetos mortos"),
      mc("p9u2-g7-a2", "O que a expressão de Bia indica no terceiro quadrinho?", I,
        "Decepção e nojo diante do que Léo mostra.",
        ["Alegria.", "Curiosidade encantada.", "Sono."], "medium"),
      mc("p9u2-g7-a3", "O que Bia faz do terceiro para o quarto quadrinho e o que no desenho mostra isso?", I,
        "Ela sai correndo; a nuvem de poeira no lugar onde ela estava.",
        ["Ela se esconde; a sombra no chão.", "Ela dorme; os “zzz” no ar.", "Ela escreve; o lápis na mão."], "medium"),
      mc("p9u2-g7-a4", "Que aspecto da relação entre as personagens a fala final de Léo revela?", I,
        "O gosto de Léo por provocar a colega, pois, além de mostrar os insetos, ele diz que vai comê-los no lanche.",
        ["A grande amizade e a ajuda mútua entre eles.", "O medo que Léo sente de Bia.", "O respeito de Léo pelo prefeito."], "hard"),
      mc("p9u2-g7-a5", "Há duas orações adjetivas na tira. Quais são e como se classificam?", I,
        "“que eu escrevi para o prefeito” e “que eu peguei no parapeito da janela”; ambas restritivas, pois restringem “carta” e “insetos mortos”.",
        ["“Hoje na escola” e “mostre e conte”; ambas explicativas.", "“Eu trouxe” e “depois eu vou comer”; ambas restritivas.", "“Bia sai correndo” e “Léo grita”; ambas explicativas."], "hard"),
    ),
  ]
);

// ---------------------------------------------------------------------------
// G8 — Adjetivas reduzidas
// ---------------------------------------------------------------------------
const leonov = read("p9u2-leonov", "Notícia: morre um cosmonauta pioneiro", [
  "Uma agência de notícias informou que o cosmonauta russo Alexei Leonov morreu em Moscou, aos 85 anos. Ele foi o primeiro homem a caminhar no espaço sideral, ao andar do lado de fora de uma espaçonave em 1965. A informação foi confirmada pela agência espacial dos Estados Unidos e por uma agência de notícias russa.",
], "Baseado em “Morre astronauta russo que foi o primeiro homem a caminhar no espaço”, Agência Brasil, 11 out. 2019.");

const g8: GrupoParcial = grupo(
  "Orações adjetivas reduzidas",
  "Reconhecer orações adjetivas reduzidas (de infinitivo, gerúndio e particípio) e desenvolvê-las.",
  "“O primeiro homem a caminhar no espaço” é o mesmo que “o primeiro homem que caminhou no espaço”. A primeira forma é reduzida.",
  IMG_LIVRO,
  [
    leonov,
    ...txt("p9u2-leonov",
      mc("p9u2-g8-a1", "No trecho há uma palavra usada para se referir a alguém que fez algo pela primeira vez. Qual é?", I,
        "Pioneiro.",
        ["Cosmonauta.", "Agência.", "Moscou."]),
      mc("p9u2-g8-a2", "No último período, “informação” se refere a qual fato?", I,
        "À morte do cosmonauta, ocorrida no mesmo dia da publicação.",
        ["À viagem de 1965.", "À idade de Leonov.", "À data da publicação da agência."], "medium"),
      mc("p9u2-g8-a3", "“Ele foi o primeiro homem a caminhar no espaço.” A parte em destaque é uma oração adjetiva reduzida. Como ficaria desenvolvida?", I,
        "“Ele foi o primeiro homem que caminhou no espaço.”",
        ["“Ele foi o primeiro homem caminhando no espaço.”", "“Ele foi o primeiro homem em caminhar no espaço.”", "“Ele foi o primeiro homem para caminhar no espaço.”"], "medium"),
    ),
    mc("p9u2-g8-a4", "Os versos “Lá dentro, perdura a graça do amor, florindo em canção” e “nem tempo a economizar” têm orações reduzidas. Classifique-as.", I,
      "“florindo em canção”: adjetiva explicativa reduzida de gerúndio (refere-se a “amor”); “a economizar”: adjetiva restritiva reduzida de infinitivo (refere-se a “tempo”).",
      ["As duas são adjetivas explicativas reduzidas de particípio.", "As duas são adverbiais de finalidade.", "As duas são coordenadas aditivas."], "hard"),
    mc("p9u2-g8-a5", "Desenvolva as reduzidas dessa atividade.", I,
      "“a graça do amor, que está florindo em canção” e “nem tempo que seja economizado”.",
      ["“a graça do amor, que florescer em canção” e “nem tempo se economizar”.", "“a graça do amor, e florindo canção” e “nem tempo e economizar”.", "Não podem ser desenvolvidas."], "hard"),
    mc("p9u2-g8-a6", "Em “Não há tempo consumido”, qual é a função sintática do termo “consumido”?", I,
      "Adjunto adnominal (pode ser visto também como oração adjetiva reduzida de particípio).",
      ["Sujeito.", "Objeto direto.", "Adjunto adverbial."], "hard"),
    mc("p9u2-g8-a7", "Que contribuição as orações adjetivas dão ao poema?", I,
      "Restringem ou exemplificam um termo, caracterizando-o da perspectiva do eu lírico e deixando a visão sobre o amor mais evidente.",
      ["Não fazem diferença nenhuma.", "Só servem para rimar.", "Só servem para encurtar os versos."], "hard"),
  ]
);

// ---------------------------------------------------------------------------
// G9 — Texto "Ficar de mãos dadas"
// ---------------------------------------------------------------------------
const maos = read("p9u2-maos", "Ficar de mãos dadas ajuda a reduzir a dor", [
  "Um texto de divulgação científica explica que, em situações de dor e medo, as pessoas procuram instintivamente a mão de alguém: ao tomar uma vacina, durante o parto ou antes de uma notícia importante. Desde a barriga da mãe, os bebês desenvolvem o reflexo de agarrar o que toca a palma da mão, e por isso gêmeos podem ser vistos de mãos dadas no útero.",
  "O toque pele a pele ajuda a produzir a oxitocina, o “hormônio do amor”, que reduz a ansiedade e a dor ao diminuir hormônios de estresse. Mães de recém-nascidos, que são invadidas por muita oxitocina durante o parto e depois, quando sentem o cheiro do bebê, se beneficiam bastante. Segurar a mão de um estranho já acalma, mas a mão de alguém que se ama é muito mais eficaz.",
], "Baseado em Ana Carolina Leonardi, “Ficar de mãos dadas sincroniza cérebros e reduz percepção da dor”, Superinteressante, 1º mar. 2018.");

const g9: GrupoParcial = grupo(
  "O poder de dar as mãos",
  "Interpretar um texto científico e identificar suas orações adjetivas explicativas e restritivas.",
  "Dar a mão a quem a gente ama pode funcionar como analgésico natural. Lemos um texto e analisamos as orações adjetivas.",
  IMG_CRIANCAS,
  [
    maos,
    ...txt("p9u2-maos",
      mc("p9u2-g9-a1", "Segundo o texto, quais são os efeitos de dar as mãos?", I,
        "Acalmar, dar sensação de conforto e segurança e diminuir a sensação de dor.",
        ["Dar sono e preguiça.", "Aumentar a dor.", "Não produz efeito algum."]),
      mc("p9u2-g9-a2", "Dependendo da relação entre as pessoas, os efeitos mudam?", I,
        "Sim: dar a mão a pessoas amadas é mais eficiente do que dar a mão a desconhecidos.",
        ["Não: é igual com qualquer pessoa.", "Sim: dar a mão a estranhos é mais eficiente.", "Não: só funciona com parentes."], "medium"),
      mc("p9u2-g9-a3", "Que relação existe entre o reflexo de agarrar, desenvolvido na barriga, e o conforto ao segurar uma mão?", I,
        "O reflexo desenvolvido no útero pode ser a origem do conforto que sentimos ao segurar a mão de outra pessoa em situações de estresse.",
        ["Não há relação alguma.", "O reflexo só existe em gêmeos.", "O reflexo faz a dor aumentar."], "hard"),
      mc("p9u2-g9-a4", "Em “Dar as mãos para alguém que você ama...” e “o reflexo de agarrar tudo que toca a palma da mão”, que orações adjetivas há e como se classificam?", I,
        "“que você ama” e “que toca a palma da mão”; ambas restritivas.",
        ["“Dar as mãos” e “agarrar”; ambas explicativas.", "“para alguém” e “a palma”; ambas restritivas.", "“que você ama” é explicativa e “que toca” é substantiva."], "hard"),
      mc("p9u2-g9-a5", "Reescreva “segurar a mão de estranhos tem efeito calmante em situações de estresse” trocando o adjetivo e a locução adjetiva por orações adjetivas.", I,
        "“segurar a mão de estranhos tem efeito que acalma em situações em que há estresse”.",
        ["“segurar estranhos tem efeito calmando nas situações de estresse”.", "“segurar a mão e estranhos acalmar e estresse”.", "Não é possível reescrever."], "hard"),
      mc("p9u2-g9-a6", "Em “mães de recém-nascidos, que são invadidas por uma enxurrada de oxitocina”, qual é a oração adjetiva e a que palavra se refere?", I,
        "“que são invadidas por uma enxurrada de oxitocina durante o parto e depois”; refere-se a “mães”.",
        ["“mães de recém-nascidos”; refere-se a “oxitocina”.", "“durante o parto”; refere-se a “bebês”.", "Não há oração adjetiva no trecho."], "hard"),
      mc("p9u2-g9-a7", "Por que, nesse trecho, a oração explicativa é mais adequada que a restritiva?", I,
        "Porque a informação vale para todas as mães de recém-nascidos, e não só para algumas.",
        ["Porque a restritiva é sempre errada.", "Porque só algumas mães sentem oxitocina.", "Porque a explicativa não leva vírgulas."], "hard"),
    ),
  ]
);

// ---------------------------------------------------------------------------
// G10 — Semântica e discurso: poema acumulativo
// ---------------------------------------------------------------------------
const acumulativo = read("p9u2-acumulativo", "Texto acumulativo: a casa do pintor", [
  "Texto original, inspirado na estrutura do “Poema acumulativo”, de Affonso Romano de Sant’Anna.",
  "Este é o pintor e esta é a escada — que o pintor comprou.",
  "Este é o passarinho — que pousou na escada que o pintor comprou.",
  "Este é o gato — que assustou o passarinho que pousou na escada que o pintor comprou.",
  "Este é o cachorro — que perseguiu o gato que assustou o passarinho que pousou na escada que o pintor comprou.",
], "Inspirado em Affonso Romano de Sant’Anna, “Poema acumulativo”, Traço de poeta (Global, 2006).");

const g10: GrupoParcial = grupo(
  "Texto acumulativo: uma oração dentro da outra",
  "Analisar um texto em que cada oração adjetiva dá origem a outra, identificando antecedentes e funções do pronome relativo.",
  "Um texto em escada: cada frase acrescenta uma nova personagem e todas dependem da primeira ação.",
  IMG_FLORESTA,
  [
    acumulativo,
    ...txt("p9u2-acumulativo",
      mc("p9u2-g10-a1", "Na primeira frase (“Este é o pintor e esta é a escada — que o pintor comprou”), qual é o antecedente do pronome relativo “que”?", I,
        "“Escada”.",
        ["“Pintor”.", "“Comprou”.", "“Este”."]),
      mc("p9u2-g10-a2", "Qual é a função sintática do pronome relativo “que” nessa frase?", I,
        "Objeto direto (o pintor comprou a escada).",
        ["Sujeito.", "Objeto indireto.", "Adjunto adverbial."], "medium"),
      mc("p9u2-g10-a3", "Quem é o sujeito da ação de comprar?", I,
        "O pintor.",
        ["A escada.", "O passarinho.", "O cachorro."]),
      mc("p9u2-g10-a4", "Como se classifica a oração “que o pintor comprou”?", I,
        "Oração subordinada adjetiva restritiva.",
        ["Oração coordenada aditiva.", "Oração subordinada substantiva.", "Oração adverbial de tempo."], "medium"),
      mc("p9u2-g10-a5", "Na terceira frase, “que assustou o passarinho que pousou na escada que o pintor comprou”, quais são os antecedentes dos três “que”, na ordem em que aparecem?", I,
        "Gato, passarinho e escada.",
        ["Pintor, escada e gato.", "Cachorro, gato e pintor.", "Escada, passarinho e gato."], "hard"),
      mc("p9u2-g10-a6", "Qual é a função sintática de cada “que” na terceira frase?", I,
        "Sujeito, sujeito e objeto direto.",
        ["Objeto direto, objeto direto e sujeito.", "Todos sujeito.", "Todos objeto direto."], "hard"),
      mc("p9u2-g10-a7", "Que afirmações sobre o texto estão corretas?", I,
        "O pintor compra a escada (objeto direto) e dessa ação decorrem as ações dos outros seres, que são sujeitos de suas ações, mas dependem da escada.",
        ["O gato e o cachorro agem sozinhos, sem relação com a primeira ação.", "Todos os pronomes “que” são objeto direto.", "A escada não tem importância para as outras ações."], "hard"),
      mc("p9u2-g10-a8", "Justifique o título “texto acumulativo”.", I,
        "Porque personagens e ações vão sendo acrescentados em uma estrutura repetitiva, em que uma ação leva à outra e tudo depende da ação humana inicial.",
        ["Porque o texto é muito curto.", "Porque só tem um personagem.", "Porque não tem verbos."], "medium"),
    ),
  ]
);

export const unidade2aGrupos: GrupoParcial[] = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10];
