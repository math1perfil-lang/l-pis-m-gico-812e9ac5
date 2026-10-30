import type { Activity } from "../activities";
import { grupo, IMG, IMG_CRIANCAS, IMG_FLORESTA, IMG_LETRAS, IMG_LIVRO, match, mc, read, txt, withImage } from "./shared";
import type { GrupoParcial } from "./shared";

// Unidade 2 — "Amor" (Português Linguagens, 9º ano, Cereja e Vianna, Saraiva, 2022).
// Abertura da unidade, Capítulo 1 ("O tempo do amor") completo e início do Capítulo 2 ("Onde está o amor?").
// Cada pergunta ou item do livro virou exatamente uma atividade. Poemas, conto, notícias e demais textos
// foram reescritos com palavras próprias (paráfrase), com crédito "Baseado em". As três tiras ganharam
// versões novas, com personagens originais, para ilustrações geradas depois.
// Produções de texto (declamação em sala, poema ou paródia próprios) não viram questão.

const Q = (
  id: string,
  pergunta: string,
  certa: string,
  erradas: [string, string, string],
  nivel: "easy" | "medium" | "hard" = "medium"
): Activity => mc(id, pergunta, "Toque na resposta certa", certa, erradas, nivel);

const IMG_TIRA_CORUJA = `${IMG}/u2-pai-coruja.jpg`;
const IMG_TIRA_MOSTRE = `${IMG}/u2-mostre-e-conte.jpg`;
const IMG_TIRA_CACHORRO = `${IMG}/u2-cachorro-moto.jpg`;

// ---------------------------------------------------------------------------
// Grupo 1 — Abertura: o amor em imagem e em poesia
// ---------------------------------------------------------------------------
const g1: Activity[] = [
  read(
    "p9u2-g1-leitura",
    "O mundo é grande",
    [
      "Pintura (descrita em palavras): em “O aniversário”, de Marc Chagall, pintada em 1915, um casal está dentro de um quarto simples. A mulher segura um buquê de flores e o homem, com o corpo inclinado e a cabeça virada para trás, a beija. Os dois parecem flutuar, sem os pés no chão. Sobre uma mesa há flores e um bolo. A cena mostra o beijo que o pintor deu na esposa, Bella, no dia do aniversário dela.",
      "Poema (contado com outras palavras): Carlos Drummond de Andrade diz que o mundo é grande, mas cabe numa janela aberta para o mar. O mar também é grande, mas cabe na cama onde duas pessoas se amam. E o amor, maior que tudo isso, cabe no pequeno espaço de um beijo.",
    ],
    "Baseado em Carlos Drummond de Andrade, Amar se aprende amando, Record, 2009, e na pintura O aniversário, de Marc Chagall, 1915."
  ),
  ...txt(
    "p9u2-g1-leitura",
    Q("p9u2-g1-a1", "Em “O aniversário”, de Chagall, o que a pintura retrata?", "Um casal que se beija em um quarto, com flores e um bolo sobre a mesa.",
      ["Uma paisagem de mar com barcos ao entardecer.", "Uma família reunida para o almoço de domingo.", "Um jardim cheio de crianças brincando."], "easy"),
    Q("p9u2-g1-a2", "Os personagens da pintura são o artista e a esposa dele. Pelo nome da obra, que hipótese sobre a cena é a mais razoável?", "Que se trata de uma comemoração de aniversário, com um beijo carinhoso.",
      ["Que é a despedida de um casal que vai viajar.", "Que é uma briga entre duas pessoas muito bravas.", "Que é uma aula de dança em um salão."]),
    Q("p9u2-g1-a3", "Na pintura, os personagens parecem flutuar. O que esse detalhe pode representar?", "A leveza e a euforia do amor, que faz as pessoas se sentirem nas alturas.",
      ["O medo de cair de um lugar muito alto.", "A falta de espaço dentro do quarto.", "O cansaço do pintor depois de um longo dia."]),
    Q("p9u2-g1-a4", "Para o eu lírico do poema “O mundo é grande”, como é o amor?", "Enorme, maior que o mundo e o mar, mas capaz de caber num simples beijo.",
      ["Pequeno e frágil, que desaparece rápido.", "Parecido com o mar, que só existe longe de casa.", "Complicado, e só cabe nos grandes acontecimentos."]),
    Q("p9u2-g1-a5", "Que relação é possível fazer entre a pintura de Chagall e o poema de Drummond?", "Os dois mostram que o amor é grande e se revela em um gesto simples, como o beijo.",
      ["Os dois falam da saudade de uma terra distante.", "Os dois criticam quem se casa muito cedo.", "Os dois tratam da beleza do mar e dos barcos."]),
  ),
  read(
    "p9u2-g1-leitura2",
    "Fique ligado: livros, filmes e canções sobre o amor",
    [
      "A unidade sugere leituras e programas sobre o tema. Um livro, “Diário de um apaixonado”, de Fabrício Carpinejar, mostra a intimidade de quem está apaixonado: não importa a idade, todo apaixonado vive como um adolescente, em uma realidade distante dos seres comuns.",
      "Entre os filmes, “Medianeras: Buenos Aires na era do amor virtual” conta a história de Martin e Mariana, vizinhos solitários e desiludidos com a vida moderna, que passam muito tempo no computador e se conhecem desse jeito. Há ainda canções sobre o amor, como “Eu sei que vou te amar”, de Tom Jobim e Vinicius de Moraes, e “Amado”, de Vanessa da Mata e Marcelo Jeneci.",
      "No final da unidade, a turma vai produzir uma revista literária com poemas e contos sobre o amor e outros temas.",
    ],
    "Baseado nas sugestões da seção “Fique ligado!” (Cereja e Vianna, Português Linguagens 9º ano, Saraiva, 2022)."
  ),
];

// ---------------------------------------------------------------------------
// Grupo 2 — "O tempo passa? Não passa" (Drummond)
// ---------------------------------------------------------------------------
const g2: Activity[] = [
  read(
    "p9u2-g2-leitura",
    "O tempo passa? Não passa",
    [
      "Primeira estrofe: o eu lírico pergunta se o tempo passa e responde logo em seguida: não passa. Dentro do coração, “no abismo do coração”, dura a graça do amor, que floresce em forma de canção. Repare que o verso termina em “não passa” e a ideia só se completa no verso seguinte: é o encadeamento (enjambement). O mesmo acontece quando a frase se parte entre “a graça” e “do amor”.",
      "Segunda estrofe: o tempo aproxima os amantes e os reduz a um só verso e uma só rima, uma “rima de mãos e olhos”, na luz.",
      "Terceira estrofe: para quem ama, não existe tempo gasto nem tempo a poupar. O tempo está inteiro vestido de amor e de tempo de amar.",
      "Quarta estrofe: o tempo do eu lírico e o da amada “transcendem qualquer medida”. Fora do amor não há nada: amar é o “sumo da vida”.",
      "Quinta estrofe: ontem e agora são apenas “mitos de calendário”. O aniversário da amada é um nascer a toda hora.",
      "Sexta estrofe: o amor deles brotou do tempo e não tem idade, pois só quem ama ouviu o apelo da eternidade.",
    ],
    "Baseado em Carlos Drummond de Andrade, “O tempo passa? Não passa”, in Amar se aprende amando, Record, 2009."
  ),
  ...txt(
    "p9u2-g2-leitura",
    Q("p9u2-g2-a1", "Os dois poemas do capítulo usam o enjambement, a continuação de uma frase de um verso para o seguinte. Como ele aparece na primeira estrofe do poema de Drummond?", "A frase se parte entre os versos: “não passa / no abismo do coração” e “a graça / do amor”.",
      ["Os versos terminam sempre em palavras que rimam com a seguinte.", "Cada verso traz uma frase completa, sem ligação com o próximo.", "A estrofe repete três vezes a palavra “tempo” no início dos versos."]),
    Q("p9u2-g2-a2", "O título traz uma pergunta e uma resposta: “O tempo passa? Não passa”. Segundo o eu lírico, em que condição o tempo não passa?", "Quando o tempo está no fundo do coração, ou seja, quando os amantes se amam de verdade.",
      ["Quando as pessoas estão longe uma da outra.", "Quando o calendário é guardado numa gaveta.", "Quando os amantes são muito jovens."]),
    Q("p9u2-g2-a3", "Para o eu lírico, é possível medir o amor? Veja a terceira estrofe: não há tempo gasto nem tempo a economizar.", "Não, pois o amor não se mede em tempo e não se gasta nem se poupa.",
      ["Sim, o amor se mede em anos de convivência.", "Sim, desde que se anote cada dia no calendário.", "Só é possível medir o amor nos aniversários."], "hard"),
    Q("p9u2-g2-a4", "Para os amantes do poema, que importância têm o passado e o presente?", "Nenhuma: o amor está presente a todo instante e passado, presente e futuro viram uma coisa só.",
      ["Muita: eles vivem lembrando apenas o passado.", "Só o presente importa, porque o passado foi triste.", "Só o futuro importa, pois o amor ainda vai começar."]),
    Q("p9u2-g2-a5", "Nos versos “[O tempo] nos reduz / a um só verso e uma rima / de mãos e olhos, na luz”, o que significa uma “rima de mãos e olhos”?", "Uma sintonia, uma grande afinidade entre os amantes.",
      ["Um jogo de palavras escrito pelos dois.", "Uma briga em que ninguém quer ceder.", "Um encontro marcado em lugar escuro."]),
    Q("p9u2-g2-a6", "Para o eu lírico do poema, que relação existe entre amor, tempo e eternidade?", "Quando se ama de verdade, o tempo para; assim, o amor passa a viver num tempo de eternidade.",
      ["O amor termina quando o tempo passa e a eternidade começa.", "O tempo é o inimigo do amor e a eternidade é a morte.", "A eternidade só existe depois dos cem anos de idade."], "hard"),
  ),
];

// ---------------------------------------------------------------------------
// Grupo 3 — "Soneto de fidelidade" (Vinicius de Moraes)
// ---------------------------------------------------------------------------
const g3: Activity[] = [
  read(
    "p9u2-g3-leitura",
    "Soneto de fidelidade",
    [
      "Primeira estrofe: o eu lírico promete que, de tudo na vida, será atento ao seu amor. Será tão dedicado, “com tal zelo, e sempre, e tanto”, que mesmo diante de um grande encanto, de outra pessoa que o encantasse, seu pensamento se encantaria ainda mais com o amor que já tem. A ordem das palavras está invertida: “De tudo, ao meu amor serei atento / Antes...”, em que “antes de tudo” aparece partido entre dois versos.",
      "Segunda estrofe: ele quer viver o amor em cada momento, mesmo nos “vãos”, e espalhar seu canto em louvor da amada. Quer rir o seu riso e derramar o seu pranto, seja no pesar, seja no contentamento dela.",
      "Terceira estrofe: mais tarde, a morte (“angústia de quem vive”) ou a solidão (“fim de quem ama”) podem procurá-lo.",
      "Quarta estrofe: nesse dia, o eu lírico quer poder dizer sobre o amor que viveu que ele talvez não seja imortal, “posto que é chama”, mas que seja “infinito enquanto dure”.",
      "O poema é um soneto: tem duas estrofes de quatro versos e duas de três versos. Comparado ao de Drummond, que fala de um amor que vai à eternidade, este admite que o amor pode acabar um dia.",
    ],
    "Baseado em Vinicius de Moraes, “Soneto de fidelidade”, in Poesia completa e prosa, Aguilar, 1974."
  ),
  ...txt(
    "p9u2-g3-leitura",
    Q("p9u2-g3-a1", "Nos dois primeiros versos do soneto (“De tudo, ao meu amor serei atento / Antes...”), há enjambement e inversão. Como ficariam esses versos na ordem direta?", "“Serei atento ao meu amor antes de tudo e com tal zelo, e sempre, e tanto.”",
      ["“Ao meu amor atento serei, de tudo, antes e com tal zelo.”", "“Antes, de tudo, serei meu amor atento ao zelo e ao tanto.”", "“Meu amor será atento a mim antes de tudo e com tal zelo.”"], "hard"),
    Q("p9u2-g3-a2", "Qual é o tema comum aos dois poemas lidos (o de Drummond e o de Vinicius)?", "O amor e a sua relação com o tempo.",
      ["A saudade de uma cidade natal.", "A beleza das paisagens do mar.", "A passagem da infância para a vida adulta."], "easy"),
    Q("p9u2-g3-a3", "Na primeira estrofe, “serei atento” e “maior encanto” têm sentidos específicos. Quais?", "“Ser atento” é zelar, cuidar; “maior encanto” é outra pessoa encantadora.",
      ["“Ser atento” é desconfiar; “maior encanto” é um presente caro.", "“Ser atento” é ficar calado; “maior encanto” é uma viagem.", "“Ser atento” é fugir; “maior encanto” é a morte."]),
    Q("p9u2-g3-a4", "De acordo com o soneto, o amor verdadeiro implica entrega e exclusividade? Que trecho mostra isso?", "Sim: a entrega está em “com tal zelo, e sempre, e tanto” e a exclusividade nos dois últimos versos da primeira estrofe.",
      ["Não: o poema diz que o amor pode ser dividido com várias pessoas.", "Sim, mas apenas a exclusividade, e só no último verso do poema.", "Não: a entrega só aparece na terceira estrofe, sobre a morte."], "hard"),
    Q("p9u2-g3-a5", "Em que circunstâncias da vida o amor deve se manter forte, e que verso do poema comprova isso?", "Em todas, tristes ou alegres, conforme “Ao seu pesar ou seu contentamento”.",
      ["Só nas festas, segundo “E rir meu riso”.", "Só nas despedidas, conforme “Quem sabe a morte”.", "Só quando o casal está longe, como em “fim de quem ama”."]),
    Q("p9u2-g3-a6", "Na última estrofe, o eu lírico tenta conceituar o amor por meio de uma metáfora: o amor é “chama”. Qual é o sentido dessa metáfora no contexto?", "Como o fogo, o amor pode se apagar, ou seja, pode acabar.",
      ["O amor, como a chama, só aparece à noite.", "O amor é perigoso e deve ser evitado.", "O amor ilumina o caminho de quem está perdido."]),
    Q("p9u2-g3-a7", "O verso “infinito enquanto dure” apresenta um paradoxo. Qual é o sentido dele no contexto?", "O amor pode acabar, mas, enquanto existir, terá uma intensidade e uma qualidade sem limites.",
      ["O amor durará exatamente cem anos.", "O amor não se pode contar em anos, pois nunca existiu.", "O amor é infinito apenas depois de acabar."], "hard"),
    Q("p9u2-g3-a8", "O poema se chama “Soneto de fidelidade”. Qual afirmação traduz melhor o conceito de fidelidade e de amor para o eu lírico?", "O amor talvez não seja eterno, mas, enquanto dura, pede uma entrega intensa e fiel, de qualidade infinita.",
      ["A fidelidade é uma exclusividade que deve durar para sempre, sem exceção.", "O amor só é verdadeiro se for imortal e nunca terminar.", "A fidelidade é ficar junto mesmo quando já não existe amor."], "hard"),
    Q("p9u2-g3-a9", "Compare os poemas de Drummond e de Vinicius quanto à entrega, à intensidade e à fidelidade no amor. O que há em comum?", "Ambos veem o amor como entrega total, persistência, intensidade e fidelidade.",
      ["Só Drummond fala de entrega; Vinicius trata apenas de dinheiro.", "Nenhum deles fala de intensidade, só de rotina.", "Drummond defende a infidelidade e Vinicius a condena."]),
    Q("p9u2-g3-a10", "Compare os dois poemas quanto à duração do amor. Qual é a diferença?", "Em Drummond, o amor chega à eternidade; em Vinicius, ele pode terminar, sendo infinito só “enquanto dure”.",
      ["Em Drummond, o amor dura um dia; em Vinicius, dura cem anos.", "Os dois afirmam que o amor termina no primeiro desentendimento.", "Em Drummond o amor termina com a morte; em Vinicius, nunca termina."], "hard"),
  ),
];

// ---------------------------------------------------------------------------
// Grupo 4 — A linguagem do texto e Trocando ideias
// ---------------------------------------------------------------------------
const g4: Activity[] = [
  read(
    "p9u2-g4-leitura",
    "Duas linguagens para o amor",
    [
      "Drummond e Vinicius de Moraes foram contemporâneos e escreveram de acordo com a norma-padrão, mas de modos diferentes. No poema de Drummond aparecem expressões simples e acessíveis, como “lá dentro”, “cada vez mais” e “toda hora”.",
      "No soneto de Vinicius, a linguagem é mais elaborada, com construções inversas e vocabulário mais elevado, como “mesmo em face”, “hei de espalhar” e “posto que é”.",
      "Outro recurso do soneto é o polissíndeto, a repetição enfática de uma conjunção coordenativa, como no verso “Antes, e com tal zelo, e sempre, e tanto”. Nele, o verbo de ligação do verso “De tudo, ao meu amor serei atento” é o verbo ser.",
    ],
    "Baseado nos poemas de Carlos Drummond de Andrade e de Vinicius de Moraes citados, e no boxe “A linguagem do texto” (Cereja e Vianna, 2022)."
  ),
  ...txt(
    "p9u2-g4-leitura",
    Q("p9u2-g4-a1", "Em qual dos poemas a linguagem é menos elaborada, com vocabulário e construções acessíveis?", "No de Drummond, como mostram expressões do tipo “lá dentro”, “cada vez mais” e “toda hora”.",
      ["No de Vinicius, por causa de “mesmo em face” e “hei de espalhar”.", "Nos dois, que usam exatamente as mesmas palavras.", "Em nenhum deles, pois ambos usam gírias."], "easy"),
    Q("p9u2-g4-a2", "Em qual dos poemas a linguagem é mais elevada e formal?", "No de Vinicius, que usa inversões e construções como “mesmo em face”, “hei de espalhar” e “posto que é”.",
      ["No de Drummond, por causa de “lá dentro” e “toda hora”.", "Em nenhum dos dois, pois ambos são escritos em gíria.", "Nos dois, porque usam palavras estrangeiras."], "easy"),
    Q("p9u2-g4-a3", "No verso “Antes, e com tal zelo, e sempre, e tanto” há polissíndeto. Em que ele consiste e que efeito produz?", "Na repetição da conjunção “e”, o que dá a ideia de ações do amante que se somam sem parar, como prova de dedicação.",
      ["Na repetição do som /t/, que imita o tique-taque do relógio.", "Na troca de uma palavra por outra de sentido oposto, o que gera ironia.", "Na omissão das conjunções, o que deixa o verso mais rápido e seco."], "hard"),
    Q("p9u2-g4-a4", "No verso “De tudo, ao meu amor serei atento”, o verbo ser é de ligação. Se fosse trocado por parecer ou estar, o sentido permaneceria o mesmo?", "Não: com “parecer”, a dedicação seria só aparente; com “estar”, soaria menos duradoura.",
      ["Sim, pois todo verbo de ligação tem o mesmo sentido.", "Sim, porque ser, parecer e estar significam a mesma coisa.", "Não, mas só porque “parecer” tem mais letras que “ser”."], "hard"),
    Q("p9u2-g4-a5", "Trocando ideias: na sua opinião, ainda existe nos dias de hoje o amor “de verdade”?", "Sim, ele existe e se revela no respeito, no cuidado e na presença do dia a dia.",
      ["Não, o amor de verdade só existia em filmes antigos.", "Só existe para quem tem muito dinheiro.", "Não existe, pois todo amor termina em poucos dias."]),
    Q("p9u2-g4-a6", "Trocando ideias: para você, como deve ser o amor, uma entrega total à pessoa amada ou um amor com regras e limites?", "Uma entrega com respeito: dar carinho sem abrir mão de si mesmo, com limites combinados.",
      ["Uma entrega sem limites, mesmo que seja prejudicial.", "Um amor só de regras, sem emoção.", "Um amor sem compromisso, para mudar a qualquer momento."]),
    Q("p9u2-g4-a7", "Trocando ideias: é possível amar uma pessoa eternamente, como sugere Drummond, ou o amor é infinito só enquanto dure, como sugere Vinicius?", "Pode ser as duas coisas: alguns amores duram a vida inteira e outros terminam, mas valem a intensidade vivida.",
      ["Nenhum amor pode ser intenso, seja eterno ou curto.", "Só o amor eterno vale a pena; os outros são mentira.", "Ninguém consegue amar mais de uma vez na vida."]),
  ),
];

// ---------------------------------------------------------------------------
// Grupo 5 — Orações subordinadas adjetivas: construindo o conceito
// ---------------------------------------------------------------------------
const g5: Activity[] = [
  read(
    "p9u2-g5-leitura",
    "Orações subordinadas adjetivas",
    [
      "Relembre este trecho do poema de Drummond: “E nosso amor, que brotou do tempo, não tem idade”. Nele há duas formas verbais, brotou e tem. Por isso, é um período composto, formado por duas orações: “E nosso amor não tem idade”, que é a principal, e “que brotou do tempo”, que depende dela.",
      "A oração “que brotou do tempo” se refere ao termo “nosso amor”, que é seu antecedente, e o caracteriza, como faria um adjetivo. Por isso, é uma oração subordinada adjetiva. Ela poderia ser trocada por um adjetivo: “nosso amor, brotado do tempo”.",
      "Essas orações são introduzidas por pronomes relativos, como que, quem, onde, o qual, cujo. Há dois tipos: as restritivas, que delimitam o sentido do antecedente e não têm vírgula (“Os alunos que tiveram notas baixas terão reforço” indica que só alguns terão); e as explicativas, que vêm entre vírgulas e acrescentam uma informação que vale para todo o antecedente (“Os alunos, que tiveram notas baixas, terão reforço” indica que todos terão).",
    ],
    "Baseado em Cereja e Vianna, Português Linguagens 9º ano, Saraiva, 2022, e em Carlos Drummond de Andrade, “O tempo passa? Não passa”."
  ),
  ...txt(
    "p9u2-g5-leitura",
    Q("p9u2-g5-a1", "Nos versos “E nosso amor, que brotou do tempo, não tem idade”, qual é o sentido de “brotou do tempo”?", "Que o amor entre o eu lírico e a amada nasceu da convivência ao longo do tempo.",
      ["Que o amor surgiu de repente, sem convivência.", "Que o amor é uma planta que cresceu no jardim.", "Que o amor acabou quando o tempo passou."], "easy"),
    Q("p9u2-g5-a2", "Em “E nosso amor, que brotou do tempo, não tem idade”, quais são as formas verbais?", "Brotou e tem.",
      ["Nosso e idade.", "Amor e tempo.", "Que e do."], "easy"),
    Q("p9u2-g5-a3", "Em “E nosso amor, que brotou do tempo, não tem idade”, quais são as duas orações que compõem o período?", "“E nosso amor não tem idade” e “que brotou do tempo”.",
      ["“E nosso amor” e “que brotou”.", "“Não tem idade” e “do tempo”.", "“Nosso amor brotou” e “do tempo não tem”."]),
    Q("p9u2-g5-a4", "Como se transformaria o período “E nosso amor, que brotou do tempo, não tem idade” em duas frases, cada uma com um período simples?", "“E o nosso amor não tem idade. Nosso amor brotou do tempo.”",
      ["“E o nosso amor brotou. Do tempo não tem idade.”", "“Nosso amor não tem. Do tempo ele brotou idade.”", "“Que brotou do tempo. E nosso amor tem idade.”"]),
    Q("p9u2-g5-a5", "A oração “que brotou do tempo” se refere a um termo da oração anterior. Qual?", "“Nosso amor”.",
      ["“Não tem idade”.", "“Do tempo”.", "“Brotou”."], "easy"),
    Q("p9u2-g5-a6", "De que maneira a oração “que brotou do tempo” modifica o termo “nosso amor”?", "Caracterizando-o, como faz um adjetivo.",
      ["Acrescentando uma circunstância de tempo, modo ou lugar.", "Completando o sentido do verbo da oração principal.", "Substituindo o sujeito da oração principal."]),
    Q("p9u2-g5-a7", "A oração “que brotou do tempo” desempenha o papel de um substantivo, de um adjetivo ou de um advérbio?", "Papel de adjetivo, pois caracteriza o termo “nosso amor”.",
      ["Papel de substantivo, pois é o núcleo do sujeito.", "Papel de advérbio, pois indica o tempo em que algo ocorre.", "Papel de verbo, pois traz uma ação."], "easy"),
  ),
];

// ---------------------------------------------------------------------------
// Grupo 6 — Exercícios: restritivas e explicativas (duas tiras e o efeito estufa)
// ---------------------------------------------------------------------------
const g6: Activity[] = [
  withImage(
    read(
      "p9u2-g6-leitura1",
      "Tira: a história para dormir",
      [
        "Tira de 3 quadrinhos com personagens novos. Cenário: o quarto de dois filhotes de coruja, de pijama, deitados em duas caminhas. O pai, uma coruja alta de óculos redondos, está sentado entre as camas com um livro aberto.",
        "Quadro 1: o pai, animado, diz: “Vou contar a história do fiscal do setor de contas, encantado!”. Os filhotes olham para ele, de olhos abertos.",
        "Quadro 2: um dos filhotes, já com cara de tédio, pergunta: “Esta é aquela que mostra o fiscal descobrindo carimbos mágicos que foram assinados em duplicata?”. O pai responde com um sorriso largo: “Exatamente!”.",
        "Quadro 3: os dois filhotes dormem, com “Zzz” sobre as cabeças. O pai, de pé, levanta o polegar e diz baixinho: “Missão cumprida!”.",
      ]
    ),
    IMG_TIRA_CORUJA,
    "Pai coruja contando uma história cansativa para dois filhotes que adormecem"
  ),
  ...txt(
    "p9u2-g6-leitura1",
    withImage(
      Q("p9u2-g6-a1", "Na tira, o pai conta aos filhotes a história do fiscal do setor de contas e dos carimbos assinados em duplicata. Qual é a estratégia dele para fazê-los dormir?", "Contar uma história provavelmente sem graça e sem interesse.",
        ["Cantar uma canção de ninar em voz alta.", "Apagar a luz e sair do quarto.", "Dar-lhes um leite morno antes de deitar."], "easy"),
      IMG_TIRA_CORUJA, "Pai coruja e filhotes na cama"),
    withImage(
      Q("p9u2-g6-a2", "No segundo quadro, em “aquela que mostra o fiscal descobrindo carimbos mágicos que foram assinados em duplicata”, o pronome relativo que aparece duas vezes. Qual é o antecedente de cada um?", "Primeiro: “aquela”; segundo: “carimbos mágicos”.",
        ["Primeiro: “fiscal”; segundo: “duplicata”.", "Primeiro: “história”; segundo: “aquela”.", "Primeiro: “carimbos”; segundo: “filhotes”."]),
      IMG_TIRA_CORUJA, "Pai coruja e filhotes na cama"),
    withImage(
      Q("p9u2-g6-a3", "Como se classificam as orações subordinadas iniciadas por esses dois “que”?", "Subordinadas adjetivas restritivas.",
        ["Subordinadas adjetivas explicativas.", "Subordinadas substantivas objetivas diretas.", "Subordinadas adverbiais temporais."], "easy"),
      IMG_TIRA_CORUJA, "Pai coruja e filhotes na cama"),
  ),
  read(
    "p9u2-g6-leitura2",
    "A poluição causa o efeito estufa?",
    [
      "Em primeiro lugar, o efeito estufa, por si só, é bom: sem ele, a Terra seria um picolé. Ele funciona como um cobertor de gases que retêm o calor da luz do Sol perto da superfície do planeta.",
      "Seu principal causador é o dióxido de carbono, o gás que emitimos quando soltamos o ar na respiração e que não tem efeito tóxico nenhum sobre os seres vivos. Por isso, não dá para chamá-lo de poluente.",
    ],
    "Baseado em “A poluição causa o efeito estufa”, Galileu, São Paulo, n. 172, nov. 2005."
  ),
  ...txt(
    "p9u2-g6-leitura2",
    Q("p9u2-g6-a4", "No texto, há três orações subordinadas adjetivas. Quais são elas?", "“que retêm o calor da luz do Sol perto da superfície do planeta”; “que emitimos quando soltamos o ar na respiração”; “que não tem efeito tóxico nenhum sobre os seres vivos”.",
      ["“sem ele, a Terra seria um picolé”; “por si só”; “em primeiro lugar”.", "“Ele funciona”; “seu principal causador”; “não dá para chamá-lo”.", "“a Terra seria um picolé”; “quando soltamos o ar”; “por isso”."], "hard"),
    Q("p9u2-g6-a5", "Como se classificam as três orações adjetivas do texto, de acordo com o sentido?", "Restritivas: elas restringem o sentido de “cobertor de gases” e de “gás”, apontando qual gás é esse.",
      ["Explicativas: elas dão informações sobre todos os gases do mundo.", "Reduzidas de gerúndio, pois não têm pronome relativo.", "Adverbiais, pois indicam o tempo em que o efeito ocorre."], "hard"),
  ),
  withImage(
    read(
      "p9u2-g6-leitura3",
      "Tira: mostre e conte",
      [
        "Tira de 4 quadrinhos com personagens novos: Nina, uma garota de uns 12 anos, com rabo de cavalo e jaqueta azul, e Davi, um garoto de cabelo despenteado e camiseta amassada. Cenário: o pátio da escola, com uma árvore ao fundo. É dia de “mostre e conte”, atividade em que cada aluno apresenta algo à turma.",
        "Quadro 1: Davi pergunta, curioso: “O que você trouxe para a hora de mostrar e contar, Nina?”. Nina sorri, animada.",
        "Quadro 2: Nina mostra uma folha dobrada e diz, orgulhosa: “Eu trouxe uma carta que escrevi para a nossa vereadora.”. Ela continua sorrindo.",
        "Quadro 3: Nina pergunta: “E você, o que trouxe?”. Davi abre um saquinho e responde: “Besouros mortos que eu achei no parapeito da janela.”. Nina arregala os olhos, com cara de nojo e decepção.",
        "Quadro 4: Nina corre para longe, e só restam nuvens de poeira no lugar dela. Davi, sozinho, sorri com o saquinho e diz: “O melhor é que, assim, minha mãe nem precisa fazer lanche para mim!”.",
      ]
    ),
    IMG_TIRA_MOSTRE,
    "Nina e Davi no pátio: ela mostra uma carta e ele, um saquinho de besouros mortos"
  ),
  ...txt(
    "p9u2-g6-leitura3",
    withImage(
      Q("p9u2-g6-a6", "Na tira, o que a expressão do rosto de Nina indica nos dois primeiros quadrinhos? Considere as falas.", "Que ela está animada, pois parece satisfeita com o que trouxe para mostrar.",
        ["Que ela está com raiva, pois Davi a atrapalhou.", "Que ela está com sono, pois acordou muito cedo.", "Que ela está assustada com a pergunta de Davi."]),
      IMG_TIRA_MOSTRE, "Nina e Davi no pátio"),
    withImage(
      Q("p9u2-g6-a7", "O que a expressão de Nina indica no terceiro quadrinho? Considere as falas.", "Que ela está decepcionada e enojada, pois não gosta do que Davi mostra.",
        ["Que ela está encantada com o presente de Davi.", "Que ela está distraída e nem ouviu o garoto.", "Que ela quer trocar a carta pelos besouros."]),
      IMG_TIRA_MOSTRE, "Nina e Davi no pátio"),
    withImage(
      Q("p9u2-g6-a8", "O que Nina faz na passagem do terceiro para o quarto quadrinho, e o que, no desenho, mostra isso?", "Ela sai correndo, e as nuvens de poeira no lugar onde estava mostram isso.",
        ["Ela chama a professora, e um balão de fala mostra isso.", "Ela desmaia no chão, e estrelas sobre a cabeça mostram isso.", "Ela entra na sala, e uma porta aberta mostra isso."], "easy"),
      IMG_TIRA_MOSTRE, "Nina e Davi no pátio"),
    withImage(
      Q("p9u2-g6-a9", "Que aspecto da relação entre os personagens a fala final de Davi revela?", "O gosto de Davi por provocar Nina: além de mostrar os besouros, ele brinca que serão seu lanche.",
        ["A grande amizade e o respeito que ele tem por ela.", "A vontade de Davi de pedir desculpas pela brincadeira.", "O medo que ele sente de ser punido pela professora."]),
      IMG_TIRA_MOSTRE, "Nina e Davi no pátio"),
    withImage(
      Q("p9u2-g6-a10", "Na tira há duas orações subordinadas adjetivas. Quais são e como se classificam?", "“que escrevi para a nossa vereadora” e “que eu achei no parapeito da janela”: ambas adjetivas restritivas, pois restringem “carta” e “besouros mortos”.",
        ["“que eu achei no parapeito” e “para a nossa vereadora”: ambas adjetivas explicativas.", "“O que você trouxe” e “E você, o que trouxe”: ambas adjetivas restritivas.", "“minha mãe nem precisa” e “fazer lanche”: ambas adjetivas reduzidas."], "hard"),
      IMG_TIRA_MOSTRE, "Nina e Davi no pátio"),
  ),
];

// ---------------------------------------------------------------------------
// Grupo 7 — Orações adjetivas reduzidas
// ---------------------------------------------------------------------------
const g7: Activity[] = [
  read(
    "p9u2-g7-leitura1",
    "Morre o cosmonauta que andou no espaço",
    [
      "Notícia: o cosmonauta russo Alexei Leonov morreu em Moscou, aos 85 anos. Ele foi o primeiro homem a caminhar no espaço. O pioneiro andou do lado de fora de uma espaçonave em 1965. A informação foi confirmada pela agência espacial dos Estados Unidos (Nasa) e por uma agência de notícias russa.",
      "Explicação: a frase “Ele foi o primeiro homem a caminhar no espaço” tem duas orações. “a caminhar no espaço” caracteriza “homem” e é uma oração adjetiva reduzida, pois seu verbo está no infinitivo. Desenvolvida, seria “que caminhou no espaço”. As reduzidas podem ter o verbo no infinitivo, no gerúndio ou no particípio.",
    ],
    "Baseado em “Morre astronauta russo que foi o primeiro homem a caminhar no espaço”, Agência Brasil, 11 out. 2019."
  ),
  ...txt(
    "p9u2-g7-leitura1",
    Q("p9u2-g7-a1", "Na notícia, que palavra é usada para fazer referência a alguém que realizou algo pela primeira vez?", "Pioneiro.",
      ["Cosmonauta.", "Espaçonave.", "Agência."], "easy"),
    Q("p9u2-g7-a2", "No último período, a palavra “informação” se refere a um fato já citado. Qual é esse fato?", "A morte do cosmonauta, ocorrida no mesmo dia da publicação.",
      ["A caminhada no espaço, que ocorreu em 1965.", "A criação da agência espacial americana.", "A idade de 85 anos do cosmonauta."]),
  ),
  read(
    "p9u2-g7-leitura2",
    "Versos de Drummond com orações reduzidas",
    [
      "Dois trechos do poema “O tempo passa? Não passa”: no primeiro, o eu lírico diz que, lá dentro, perdura a graça do amor, florindo em canção. No segundo, afirma que não há tempo consumido nem tempo a economizar.",
      "Observe os trechos em destaque: “florindo em canção” (gerúndio), “consumido” (particípio) e “a economizar” (infinitivo).",
    ],
    "Baseado em Carlos Drummond de Andrade, “O tempo passa? Não passa”, in Amar se aprende amando, Record, 2009."
  ),
  ...txt(
    "p9u2-g7-leitura2",
    Q("p9u2-g7-a3", "Como se classificam as orações “florindo em canção” e “a economizar”, e a que palavras se referem?", "“Florindo em canção”: adjetiva explicativa reduzida de gerúndio, ligada a “amor”; “a economizar”: adjetiva restritiva reduzida de infinitivo, ligada a “tempo”.",
      ["“Florindo em canção”: adjetiva restritiva reduzida de infinitivo, ligada a “graça”; “a economizar”: explicativa de gerúndio, ligada a “nem”.", "Ambas são substantivas objetivas diretas, ligadas ao verbo “perdura”.", "Ambas são adverbiais de tempo, ligadas a “lá dentro”."], "hard"),
    Q("p9u2-g7-a4", "Como ficariam as orações desenvolvidas dos trechos “florindo em canção” e “tempo a economizar”?", "“que está florindo em canção” e “tempo que seja economizado”.",
      ["“quando florir em canção” e “tempo se economizar”.", "“porque floresce em canção” e “tempo para economia”.", "“que floresceu a canção” e “tempo econômico”."], "hard"),
    Q("p9u2-g7-a5", "No trecho “Não há tempo consumido”, qual é a função sintática do termo “consumido”?", "Adjunto adnominal.",
      ["Sujeito.", "Objeto direto.", "Adjunto adverbial de tempo."]),
    Q("p9u2-g7-a6", "Qual é a contribuição das orações subordinadas adjetivas para a construção de sentidos no poema de Drummond?", "Elas caracterizam termos da oração, mostrando o olhar do eu lírico sobre o amor e deixando essa visão mais evidente.",
      ["Elas servem para indicar o lugar e o horário em que o amor aconteceu.", "Elas substituem os verbos, deixando o poema sem ação.", "Elas não têm nenhuma função, pois apenas completam as rimas."]),
  ),
];

// ---------------------------------------------------------------------------
// Grupo 8 — Mãos dadas
// ---------------------------------------------------------------------------
const g8: Activity[] = [
  read(
    "p9u2-g8-leitura",
    "Ficar de mãos dadas reduz a dor",
    [
      "Segundo um estudo, dar a mão a alguém que se ama muda o padrão das ondas cerebrais e pode funcionar como um analgésico natural. Em situações de dor e medo, como tomar vacina, no parto ou antes de um diagnóstico importante, as pessoas procuram instintivamente uma mão para apertar.",
      "Já na barriga desenvolvemos o reflexo de agarrar tudo que toca a palma da mão, por isso gêmeos podem ser vistos de mãos dadas no útero. Na vida adulta, dar as mãos continua ligado à segurança e ao conforto.",
      "O toque pele a pele é um dos grandes gatilhos para a produção de oxitocina, o “hormônio do amor”, que reduz a ansiedade e a dor ao baixar os hormônios de estresse. Isso é muito útil para as mães de recém-nascidos, que são invadidas por muita oxitocina durante o parto e depois, quando sentem o cheiro dos bebês e os tocam. Até segurar a mão de um estranho acalma em situações de estresse; porém, o efeito é muito maior com a mão de alguém que se ama.",
    ],
    "Baseado em Ana Carolina Leonardi, “Ficar de mãos dadas sincroniza cérebros e reduz percepção da dor”, Superinteressante, 1º mar. 2018."
  ),
  ...txt(
    "p9u2-g8-leitura",
    Q("p9u2-g8-a1", "Segundo o texto, quais são os efeitos de dar as mãos?", "Acalma, dá sensação de conforto e segurança e diminui a sensação de dor.",
      ["Provoca sono e cansaço profundos.", "Aumenta a fome e o apetite.", "Dá mais força física e velocidade."], "easy"),
    Q("p9u2-g8-a2", "Dependendo da relação entre as pessoas, há diferença nos efeitos de dar as mãos? Qual?", "Sim: dar as mãos a quem se ama é mais eficiente do que dar as mãos a desconhecidos.",
      ["Não: o efeito é igual com qualquer pessoa.", "Sim: só funciona com desconhecidos.", "Não: dar as mãos nunca produz nenhum efeito."]),
    Q("p9u2-g8-a3", "Qual é a relação entre estas afirmações do texto: dar a mão a quem se ama altera as ondas cerebrais; desenvolvemos na barriga o reflexo de agarrar o que toca a palma da mão; segurar a mão de estranhos acalma?", "O reflexo desenvolvido ainda no útero pode ser a origem do conforto de segurar a mão de alguém, querido ou até estranho.",
      ["As três mostram que o toque da mão sempre causa dor.", "As três mostram que só bebês gostam de dar as mãos.", "As três provam que a oxitocina só existe em adultos."], "hard"),
    Q("p9u2-g8-a4", "Nos trechos “alguém que você ama” e “tudo que toca a palma da mão”, como se classificam as orações subordinadas adjetivas?", "“que você ama” e “que toca a palma da mão” são adjetivas restritivas.",
      ["Ambas são adjetivas explicativas.", "A primeira é restritiva e a segunda é reduzida de infinitivo.", "Ambas são substantivas subjetivas."]),
    Q("p9u2-g8-a5", "Como reescrever “segurar a mão de estranhos tem efeito calmante em situações de estresse”, transformando o adjetivo e a locução adjetiva em orações adjetivas?", "“Segurar a mão de estranhos tem efeito que acalma em situações em que há estresse.”",
      ["“Segurar a mão de estranhos tem efeito calmo em situações estressantes.”", "“Segurar a mão de estranhos acalma porque há estresse.”", "“Segurar a mão que estranhos têm calmante estresse.”"], "hard"),
    Q("p9u2-g8-a6", "No trecho “É superútil para mães de recém-nascidos, que são invadidas por uma enxurrada de oxitocina durante o parto”, qual é a oração adjetiva explicativa e a que palavra se refere?", "“que são invadidas por uma enxurrada de oxitocina durante o parto”, que se refere a “mães”.",
      ["“É superútil para mães”, que se refere a “oxitocina”.", "“de recém-nascidos”, que se refere a “parto”.", "“durante o parto”, que se refere a “enxurrada”."]),
    Q("p9u2-g8-a7", "Por que, nesse trecho, é mais adequada a oração adjetiva explicativa, e não a restritiva?", "Porque a informação vale para todas as mães de recém-nascidos, e não só para algumas.",
      ["Porque a oração restringe a afirmação a poucas mães.", "Porque a vírgula nunca pode ser usada com restritiva.", "Porque a oração explicativa indica o tempo do parto."], "hard"),
  ),
];

// ---------------------------------------------------------------------------
// Grupo 9 — Semântica e discurso: poema acumulativo
// ---------------------------------------------------------------------------
const g9: Activity[] = [
  read(
    "p9u2-g9-leitura",
    "Poema acumulativo",
    [
      "O poema vai empilhando personagens, um depois do outro, como numa lenga-lenga. Primeiro: eis o homem, e eis a casa, a casa que o homem construiu.",
      "Depois entra o trigo, guardado na casa que o homem construiu. Em seguida, o rato, que roeu o trigo guardado na casa que o homem construiu.",
      "Vem o gato, que comeu o rato que roeu o trigo guardado na casa que o homem construiu. Por fim, o cão, que mordeu o gato que comeu o rato que roeu o trigo guardado na casa que o homem construiu.",
    ],
    "Baseado em Affonso Romano de Sant’Anna, “Poema acumulativo”, in Traço de poeta, Global, 2006."
  ),
  ...txt(
    "p9u2-g9-leitura",
    Q("p9u2-g9-a1", "Na frase “eis o homem e eis a casa, a casa que o homem construiu”, qual é o antecedente do pronome relativo que?", "A casa.",
      ["O homem.", "O trigo.", "O verbo construir."], "easy"),
    Q("p9u2-g9-a2", "Nessa mesma frase, qual é a função sintática do pronome relativo que?", "Objeto direto de “construiu”.",
      ["Sujeito de “construiu”.", "Adjunto adverbial de lugar.", "Predicativo do sujeito."]),
    Q("p9u2-g9-a3", "Quem é o sujeito da ação de construir?", "O homem.",
      ["A casa.", "O trigo.", "O rato."], "easy"),
    Q("p9u2-g9-a4", "Como se classifica a oração “que o homem construiu”?", "Oração subordinada adjetiva restritiva.",
      ["Oração subordinada adjetiva explicativa.", "Oração subordinada substantiva objetiva direta.", "Oração coordenada sindética aditiva."]),
    Q("p9u2-g9-a5", "O poema encadeia uma oração adjetiva em outra. Nas estrofes seguintes, quais são os antecedentes do pronome relativo em cada uma: trigo, rato, gato e cão?", "Trigo e casa; rato, trigo e casa; gato, rato, trigo e casa; cão, gato, rato, trigo e casa.",
      ["Só o homem, em todas as estrofes.", "Só a casa, em todas as estrofes.", "Só o cão, em todas as estrofes."], "hard"),
    Q("p9u2-g9-a6", "Qual é a função sintática dos pronomes relativos que, ao longo do poema, nas estrofes do trigo, do rato, do gato e do cão?", "Quase todos são sujeito (de roeu, comeu, mordeu e está), e o último de cada estrofe, o da casa, é objeto direto.",
      ["Todos são objeto direto.", "Todos são adjunto adverbial de lugar.", "Todos são predicativo do sujeito."], "hard"),
    Q("p9u2-g9-a7", "Considerando as funções de objeto direto e de sujeito do pronome relativo que, qual afirmação sobre o poema está correta?", "O homem constrói a casa, representada pelo “que” em função de objeto direto; desse gesto decorrem as ações dos outros agentes.",
      ["O rato, o gato e o cão agem sem relação com o homem, e o “que” é sempre objeto direto.", "A casa é o objeto das ações do rato, do gato e do cão, que não dependem do homem.", "O trigo, o rato, o gato e o cão existem sozinhos, sem a casa."], "hard"),
    Q("p9u2-g9-a8", "Justifique o título “Poema acumulativo”.", "Porque o poema acumula personagens e ações em uma estrutura repetitiva, em que uma ação leva à outra a partir da obra do homem.",
      ["Porque o poema acumula rimas ricas em todos os versos.", "Porque o poema fala do acúmulo de dinheiro numa casa.", "Porque o poema é muito longo e tem muitas páginas."], "hard"),
  ),
];

// ---------------------------------------------------------------------------
// Grupo 10 — Semântica e discurso: a tira do cachorro
// ---------------------------------------------------------------------------
const g10: Activity[] = [
  withImage(
    read(
      "p9u2-g10-leitura",
      "Tira: o presente do cachorro",
      [
        "Tira de 3 quadrinhos com personagens novos. Cenário: a sala de uma casa. Lia, uma menina de 13 anos de cabelo cacheado e moletom amarelo, conversa com Pipoca, o cachorro caramelo da família, sentado no tapete.",
        "Quadro 1: Lia abre os braços, sorrindo, e diz: “Vou lhe dar algo que os cachorros adoram, Pipoca!”. Pipoca, de olhos brilhantes e língua para fora, responde: “Oba!”. Um balão de pensamento mostra uma motocicleta passando na rua, a que ele adora perseguir.",
        "Quadro 2: Lia estende a mão com um biscoito em forma de osso e diz: “Aqui está.”. Pipoca olha, surpreso, com as orelhas levantadas.",
        "Quadro 3: Pipoca, de orelhas caídas, pergunta: “Então não era uma moto?”. Lia, com a mão ainda estendida, o olha desapontada.",
      ]
    ),
    IMG_TIRA_CACHORRO,
    "Lia dá um biscoito a Pipoca, que esperava uma motocicleta"
  ),
  ...txt(
    "p9u2-g10-leitura",
    withImage(
      Q("p9u2-g10-a1", "Ao longo da tira, as expressões do rosto e do corpo de Lia e de Pipoca mudam. Que transformações são essas?", "Lia está animada nos dois primeiros quadrinhos e desapontada no terceiro; Pipoca está animado no primeiro, surpreso no segundo e decepcionado no terceiro.",
        ["Lia está triste o tempo todo; Pipoca dorme nos três quadrinhos.", "Pipoca está bravo no primeiro quadro e Lia ri alto no último.", "Os dois se mantêm com a mesma expressão do início ao fim."], "hard"),
      IMG_TIRA_CACHORRO, "Lia e Pipoca na sala"),
    withImage(
      Q("p9u2-g10-a2", "O que provocou essas transformações?", "Lia ficou desapontada com a decepção de Pipoca, ao perceber que ele não ganharia uma moto, mas só um biscoito.",
        ["O barulho de uma moto que passou na rua e assustou os dois.", "A chegada de um visitante que deixou os dois bravos.", "O fim do passeio no parque, que irritou o cachorro."]),
      IMG_TIRA_CACHORRO, "Lia e Pipoca na sala"),
    withImage(
      Q("p9u2-g10-a3", "Na fala de Lia, no primeiro quadrinho, há um pronome relativo que retoma um termo da oração principal. Qual é o pronome e qual é o termo?", "O pronome é “que”; ele retoma o termo “algo”.",
        ["O pronome é “que”; ele retoma o termo “cachorros”.", "O pronome é “algo”; ele retoma o termo “Pipoca”.", "O pronome é “vou”; ele retoma o termo “dar”."], "easy"),
      IMG_TIRA_CACHORRO, "Lia e Pipoca na sala"),
    withImage(
      Q("p9u2-g10-a4", "No primeiro quadrinho, qual é a oração da fala de Lia que deixou o cachorro entusiasmado, e como ela se classifica?", "“que os cachorros adoram”, oração subordinada adjetiva.",
        ["“Vou lhe dar algo”, oração principal explicativa.", "“Oba!”, oração subordinada adverbial.", "“Pipoca”, oração subordinada substantiva."]),
      IMG_TIRA_CACHORRO, "Lia e Pipoca na sala"),
    withImage(
      Q("p9u2-g10-a5", "O fato de “algo” ser um pronome indefinido contribuiu para a decepção de Pipoca?", "Sim: um pronome indefinido não esclarece a que se refere, e Pipoca imaginou uma moto, e não um biscoito.",
        ["Não: “algo” indica com precisão um biscoito em forma de osso.", "Não: o pronome nunca influencia a compreensão da fala.", "Sim, porque “algo” significa “moto” na língua portuguesa."], "hard"),
      IMG_TIRA_CACHORRO, "Lia e Pipoca na sala"),
    withImage(
      Q("p9u2-g10-a6", "As histórias em quadrinhos costumam ter humor. O que provoca humor nessa tira?", "A quebra de expectativa: o cachorro imagina ganhar uma moto, pois Lia fala de algo que os cachorros adoram, e recebe só um biscoito.",
        ["O fato de Lia falar em voz muito alta com o cachorro.", "A semelhança entre o nome Lia e o nome Pipoca.", "O barulho do motor da moto que passa na rua."]),
      IMG_TIRA_CACHORRO, "Lia e Pipoca na sala"),
  ),
];

// ---------------------------------------------------------------------------
// Grupo 11 — De olho na escrita: “Eu te amo” em vários idiomas
// ---------------------------------------------------------------------------
const g11: Activity[] = [
  read(
    "p9u2-g11-leitura",
    "Eu te amo em vários idiomas",
    [
      "Imagem (descrita em palavras): um grande coração rosa-claro cheio de balões de fala. Em cada balão está escrita, em um idioma diferente, a mesma frase: “Eu te amo”. No centro, há um pequeno coração vermelho e, na parte de baixo, um globo terrestre, como se a frase estivesse espalhada pelo mundo todo.",
      "Entre as versões estão: “Unë të dua”, “Jeg elsker dig”, “I love you”, “我爱你”, “私はあなたが好きです”, “Je t’aime”, “Kocham cię” e “Ich liebe dich”.",
    ]
  ),
  ...txt(
    "p9u2-g11-leitura",
    Q("p9u2-g11-a1", "Qual é, em português, a expressão que aparece repetida nos balões da imagem?", "Eu te amo.",
      ["Eu te vejo.", "Eu te chamo.", "Eu te espero."], "easy"),
    match("p9u2-g11-a2", "Ligue cada versão de “Eu te amo” ao idioma correspondente.", [
      ["Unë të dua", "Albanês"],
      ["Jeg elsker dig", "Dinamarquês"],
      ["I love you", "Inglês"],
      ["我爱你", "Chinês"],
      ["私はあなたが好きです", "Japonês"],
      ["Je t’aime", "Francês"],
      ["Kocham cię", "Polonês"],
      ["Ich liebe dich", "Alemão"],
    ], "medium"),
    Q("p9u2-g11-a3", "Palavras como albanês, polonês ou japonês podem ser substantivos ou adjetivos. O que elas indicam quando são substantivos? Veja um exemplo: “O japonês é difícil de aprender”.", "Indicam o nome do idioma.",
      ["Indicam a cor de um objeto.", "Indicam a quantidade de pessoas.", "Indicam uma ação do passado."], "easy"),
    Q("p9u2-g11-a4", "E o que essas palavras indicam quando são adjetivos? Veja um exemplo: “O idioma japonês é muito falado na Ásia”.", "Indicam a origem ou a nacionalidade do que é caracterizado.",
      ["Indicam o tempo em que algo acontece.", "Indicam o sentimento de uma pessoa.", "Indicam uma dúvida do falante."], "easy"),
    Q("p9u2-g11-a5", "Imagine que Marina nasceu no Brasil. Qual é a nacionalidade dela?", "Brasileira.",
      ["Brasiliana.", "Brasilense.", "Brasilês."], "easy"),
    Q("p9u2-g11-a6", "Marina nasceu em Recife. Em que cidade ela nasceu?", "Recife, capital de Pernambuco.",
      ["Recifeiro, em Pernambuco.", "Pernambuco, no Nordeste.", "Brasil, na América do Sul."], "easy"),
    Q("p9u2-g11-a7", "Marina nasceu em Recife. Qual é o adjetivo que indica a cidade em que ela nasceu?", "Recifense.",
      ["Recifeano.", "Recifês.", "Recifão."]),
  ),
];

// ---------------------------------------------------------------------------
// Grupo 12 — Adjetivos pátrios: o gráfico e as cidades
// ---------------------------------------------------------------------------
const g12: Activity[] = [
  read(
    "p9u2-g12-leitura1",
    "Os adjetivos pátrios",
    [
      "Os adjetivos que indicam o país, o estado e a cidade em que alguém nasce são chamados de pátrios. Derivam de substantivos e indicam nacionalidade, pátria, lugar ou origem. Em geral, formam-se com o acréscimo de -ês, -ense, -eiro, -ão ou -ano ao substantivo: “usos e costumes da Índia” viram “usos e costumes indianos”; uma “cidade de Alagoas” é uma “cidade alagoana”.",
      "Quando formam adjetivos compostos, o primeiro elemento assume uma forma reduzida, de origem latina: euro- (europeu), anglo- (inglês), franco- (francês), hispano- (hispânico, espanhol), greco- (grego), luso- (português), austro- (austríaco), nipo- (nipônico, japonês), ítalo- (italiano), sino- (chinês), teuto- (alemão) e indo- (indiano).",
    ],
    "Baseado em Cereja e Vianna, Português Linguagens 9º ano, Saraiva, 2022."
  ),
  read(
    "p9u2-g12-leitura2",
    "Gráfico do Pisa 2018 na América Latina",
    [
      "Gráfico de barras horizontais, com resultados do Pisa 2018 dos países latino-americanos participantes, do melhor para o pior e com a posição de cada um no total de países. A barra do Brasil aparece em laranja; as outras são verdes.",
      "As notas são: Chile, 444 pontos (45º lugar); Uruguai, 426 (54º); México, 419 (57º); Costa Rica, 416 (60º); Colômbia, 413 (62º); Brasil, 404 (66º); Argentina, 404 (65º); Peru, 404 (64º); Panamá, 365 (76º); e República Dominicana, 336 (78º). A média dos países da OCDE é de 489 pontos.",
    ],
    "Baseado em “Pisa: como o desempenho do Brasil no exame se compara ao de outros países da América Latina”, BBC News Brasil, 3 dez. 2019."
  ),
  ...txt(
    "p9u2-g12-leitura2",
    Q("p9u2-g12-a1", "De acordo com o gráfico, complete: os alunos ___ são os mais bem posicionados entre os países latino-americanos.", "Chilenos.",
      ["Uruguaios.", "Mexicanos.", "Colombianos."], "easy"),
    Q("p9u2-g12-a2", "Complete: além dos chilenos, estão com nota maior que a dos brasileiros os alunos ___.", "Uruguaios, mexicanos, costa-riquenhos e colombianos.",
      ["Argentinos, peruanos, panamenhos e dominicanos.", "Uruguaios, argentinos, peruanos e dominicanos.", "Mexicanos, colombianos, panamenhos e argentinos."], "hard"),
    Q("p9u2-g12-a3", "Complete: na 78ª posição estão os alunos ___.", "Dominicanos.",
      ["Panamenhos.", "Peruanos.", "Argentinos."], "easy"),
    Q("p9u2-g12-a4", "Complete: com nota igual ou menor que a dos brasileiros estão também os alunos ___.", "Argentinos, peruanos, panamenhos (ou panamenses) e dominicanos.",
      ["Chilenos, uruguaios, mexicanos e colombianos.", "Mexicanos, costa-riquenhos, colombianos e peruanos.", "Uruguaios, chilenos, argentinos e panamenhos."], "hard"),
  ),
  Q("p9u2-g12-a5", "Qual é o adjetivo pátrio correspondente a Curitiba?", "Curitibano.",
    ["Curitibense.", "Curitibês.", "Curitiboso."], "easy"),
  Q("p9u2-g12-a6", "Qual é o adjetivo pátrio correspondente a Belém?", "Belenense.",
    ["Belemano.", "Belenês.", "Belemita."], "easy"),
  Q("p9u2-g12-a7", "Qual é o adjetivo pátrio correspondente a Florianópolis?", "Florianopolitano.",
    ["Florianense.", "Florianopolês.", "Floriano."], "easy"),
  Q("p9u2-g12-a8", "Qual é o adjetivo pátrio correspondente ao estado do Piauí?", "Piauiense.",
    ["Piauiano.", "Piauês.", "Piauino."], "easy"),
  Q("p9u2-g12-a9", "Qual é o adjetivo pátrio correspondente a Aracaju?", "Aracajuano ou aracajuense.",
    ["Aracajês.", "Aracajeiro.", "Aracaju-ense-no."]),
  Q("p9u2-g12-a10", "Qual é o adjetivo pátrio correspondente a Palmas, capital do Tocantins?", "Palmense.",
    ["Palmeano.", "Palmês.", "Palmasiano."]),
];

// ---------------------------------------------------------------------------
// Grupo 13 — Adjetivos pátrios irregulares e compostos
// ---------------------------------------------------------------------------
const g13: Activity[] = [
  read(
    "p9u2-g13-leitura",
    "Pátrios diferentes do usual",
    [
      "Muitos adjetivos pátrios, por razões históricas, não seguem a formação usual. É o caso de “gaúcho”, que corresponde ao Rio Grande do Sul e equivale a rio-grandense-do-sul e a sul-rio-grandense.",
      "Já os pátrios compostos indicam dois lugares ao mesmo tempo, como em “Círculo Ítalo-Brasileiro”, “literatura hispano-lusitana”, “colégio teuto-brasileiro” e “produto sino-coreano”.",
    ],
    "Baseado em Cereja e Vianna, Português Linguagens 9º ano, Saraiva, 2022."
  ),
  ...txt(
    "p9u2-g13-leitura",
    Q("p9u2-g13-a1", "A que lugar se refere o adjetivo pátrio “capixaba”?", "Ao estado do Espírito Santo.",
      ["Ao estado do Pará.", "Ao estado de Goiás.", "À cidade de Vitória da Conquista."], "easy"),
    Q("p9u2-g13-a2", "A que lugar se refere o adjetivo pátrio “potiguar”?", "Ao estado do Rio Grande do Norte.",
      ["Ao estado do Piauí.", "Ao estado do Maranhão.", "Ao estado do Ceará."], "easy"),
    Q("p9u2-g13-a3", "A que lugar se refere o adjetivo pátrio “carioca”?", "À cidade do Rio de Janeiro, a capital do estado.",
      ["Ao estado do Rio de Janeiro inteiro.", "Ao estado do Rio Grande do Sul.", "À cidade de Niterói."], "easy"),
    Q("p9u2-g13-a4", "A que lugar se refere o adjetivo pátrio “fluminense”?", "Ao estado do Rio de Janeiro.",
      ["À cidade do Rio de Janeiro.", "Ao estado de São Paulo.", "À cidade de Campos de Jordão."]),
    Q("p9u2-g13-a5", "A que lugar se refere o adjetivo pátrio “paulista”?", "Ao estado de São Paulo.",
      ["À cidade de São Paulo.", "À cidade de São Vicente.", "Ao estado de Santa Catarina."]),
    Q("p9u2-g13-a6", "A que lugar se refere o adjetivo pátrio “paulistano”?", "À cidade de São Paulo, a capital do estado.",
      ["Ao estado de São Paulo inteiro.", "À cidade de Santos.", "Ao estado do Paraná."]),
    Q("p9u2-g13-a7", "A que lugar se refere o adjetivo pátrio “soteropolitano”?", "À cidade de Salvador.",
      ["Ao estado da Bahia.", "À cidade de Sorocaba.", "À cidade de Sobral."]),
    Q("p9u2-g13-a8", "Na frase “O jantar foi promovido pelo Círculo Ítalo-Brasileiro”, a que países se refere o adjetivo composto?", "À Itália e ao Brasil.",
      ["À Índia e ao Brasil.", "À Itália e à Bélgica.", "À Inglaterra e ao Brasil."], "easy"),
    Q("p9u2-g13-a9", "Na frase “Aprecio a literatura hispano-lusitana”, a que países se refere o adjetivo composto?", "À Espanha e a Portugal.",
      ["À Espanha e à Itália.", "À França e a Portugal.", "À Grécia e à Espanha."]),
    Q("p9u2-g13-a10", "Na frase “Os filhos de meus amigos estudam em um colégio teuto-brasileiro”, a que países se refere o adjetivo composto?", "À Alemanha e ao Brasil.",
      ["Ao Tibete e ao Brasil.", "À Turquia e à Argentina.", "À Áustria e ao Chile."]),
    Q("p9u2-g13-a11", "Na frase “Este é um produto sino-coreano”, a que países se refere o adjetivo composto?", "À China e à Coreia.",
      ["Ao Japão e à Coreia.", "À Índia e à Coreia.", "À China e ao Japão."]),
  ),
];

// ---------------------------------------------------------------------------
// Grupo 14 — Produção de texto: métrica, estrofes e figuras no poema
// ---------------------------------------------------------------------------
const g14: Activity[] = [
  read(
    "p9u2-g14-leitura",
    "Como os poemas são construídos",
    [
      "Drummond usa a redondilha maior, a métrica de versos de 7 sílabas poéticas, comum em cantigas de roda, quadrinhas, repente e rap. É o caso de “Lá den-tro, per-du-ra a gra”, em que as sílabas se contam até a última tônica e as vogais átonas se juntam.",
      "Vinicius de Moraes usa uma métrica clássica e a forma de soneto, criada no século XV. O “Soneto de fidelidade” tem quatro estrofes: duas com quatro versos e duas com três. As rimas das quadras seguem o esquema ABBA, ABBA, e as dos tercetos, CDE, DEC. No poema de Drummond, as rimas se organizam em esquemas alternados, como ABAB, CDCD, EFEF.",
      "Entre os recursos do soneto aparecem a metáfora (“amar é o sumo da vida”, de Drummond), o paradoxo, a inversão, o polissíndeto, antíteses, como “riso” e “pranto”, e o pleonasmo “rir meu riso”. A aliteração é a repetição de um mesmo fonema consonantal; em Drummond, em “O meu tempo e o teu, amada, transcendem qualquer medida”, repetem-se os sons /t/ e /d/.",
    ],
    "Baseado em Cereja e Vianna, Português Linguagens 9º ano, Saraiva, 2022, e nos poemas de Drummond e de Vinicius de Moraes citados."
  ),
  ...txt(
    "p9u2-g14-leitura",
    Q("p9u2-g14-a1", "Fazendo a escansão de versos do “Soneto de fidelidade”, como “De tudo, ao meu amor serei atento”, qual é a métrica usada por Vinicius de Moraes?", "O decassílabo, com versos de dez sílabas poéticas.",
      ["A redondilha maior, de sete sílabas.", "O alexandrino, de doze sílabas.", "O verso livre, sem métrica."]),
    Q("p9u2-g14-a2", "Quantas estrofes há no “Soneto de fidelidade” e quantos versos tem cada uma?", "Quatro estrofes: as duas primeiras com 4 versos e as duas últimas com 3.",
      ["Três estrofes, todas com 5 versos.", "Duas estrofes, com 7 versos cada.", "Cinco estrofes, todas com 3 versos."], "easy"),
    Q("p9u2-g14-a3", "Como se organizam as rimas no soneto de Vinicius? Use letras para indicar os sons.", "ABBA, ABBA, CDE, DEC.",
      ["ABAB, CDCD, EFEF.", "AABB, CCDD, EEF.", "ABCD, ABCD, EFG."], "hard"),
    Q("p9u2-g14-a4", "No poema de Drummond, como se organizam as rimas?", "De modo alternado em cada estrofe: ABAB, CDCD, EFEF.",
      ["De modo emparelhado: AABB em todas as estrofes.", "Em esquema ABBA em todas as estrofes.", "Não há rimas no poema."]),
    Q("p9u2-g14-a5", "Qual destas expressões do poema de Drummond é uma metáfora?", "“no abismo do coração”.",
      ["“cada vez mais”.", "“toda hora”.", "“lá dentro”."], "easy"),
    Q("p9u2-g14-a6", "No soneto de Vinicius, quais pares de palavras formam antíteses?", "“riso” e “pranto”; “pesar” e “contentamento”.",
      ["“zelo” e “louvor”; “canto” e “encanto”.", "“morte” e “fim”; “quem” e “vive”.", "“mais tarde” e “antes”; “amor” e “chama”."]),
    Q("p9u2-g14-a7", "Qual expressão do soneto é um pleonasmo?", "“rir meu riso”.",
      ["“espalhar meu canto”.", "“angústia de quem vive”.", "“que seja infinito”."], "easy"),
    Q("p9u2-g14-a8", "Qual das opções mostra a aliteração no soneto de Vinicius?", "A repetição do fonema /t/ na primeira estrofe e do fonema /R/ na segunda.",
      ["A repetição de palavras inteiras em todos os versos.", "A repetição da vogal /a/ no final das estrofes.", "A troca de uma palavra por seu oposto."], "hard"),
  ),
];

// ---------------------------------------------------------------------------
// Grupo 15 — Ficha do gênero poema
// ---------------------------------------------------------------------------
const g15: Activity[] = [
  Q("p9u2-g15-a1", "Em um resumo sobre o gênero poema: quem são os leitores do poema?", "Pessoas de todas as idades.",
    ["Apenas poetas profissionais.", "Apenas crianças pequenas.", "Apenas estudantes de Letras."], "easy"),
  Q("p9u2-g15-a2", "Qual é o objetivo de um poema?", "Entreter, emocionar e provocar reflexões.",
    ["Vender produtos e serviços.", "Dar ordens ao leitor.", "Informar fatos do dia a dia, como uma notícia."], "easy"),
  Q("p9u2-g15-a3", "Por onde os poemas circulam?", "Principalmente em livros, mas também em jornais, revistas e na internet.",
    ["Só em placas de trânsito.", "Só em manuais de instruções.", "Só em embalagens de alimentos."], "easy"),
  Q("p9u2-g15-a4", "Como o poema se estrutura?", "Em versos (cada linha) e estrofes (conjuntos de versos), que podem ser livres ou regulares.",
    ["Em parágrafos longos e títulos com subtítulos.", "Em balões de fala e quadrinhos.", "Em tabelas com linhas e colunas."]),
  Q("p9u2-g15-a5", "Como são construídos a sonoridade e o ritmo de um poema?", "Pela métrica dos versos e das estrofes, com rimas, aliterações e assonâncias.",
    ["Pela ausência de qualquer regularidade nos versos.", "Pelo uso de números e gráficos.", "Pela repetição de uma única palavra no texto todo."]),
  Q("p9u2-g15-a6", "Como é a linguagem do poema?", "Rica em figuras de linguagem, como comparações, metáforas, antíteses e paradoxos, e mais ou menos formal conforme o público.",
    ["Sempre literal, sem figuras de linguagem.", "Sempre formal e sem emoção.", "Sempre uma lista de dados objetivos."], "hard"),
];

// ---------------------------------------------------------------------------
// Grupo 16 — Paródia: “Soneto da (in)felicidade”
// ---------------------------------------------------------------------------
const g16: Activity[] = [
  read(
    "p9u2-g16-leitura",
    "Soneto da (in)felicidade",
    [
      "O poema de Antonio Sousa Brito recria o “Soneto de fidelidade”, de Vinicius de Moraes, e o leva para a rotina de um professor. Ele conserva a forma de soneto, com duas quadras e dois tercetos, o esquema das rimas e várias palavras do original, como “serei atento”, “em cada vão momento” e “enquanto dure”.",
      "Mas o tema muda: o eu lírico, um professor, promete se dedicar às aulas. Fala de largar o giz, de ler o livro, de rezar a um santo e de não deixar a impaciência “me jogar na lama”. No fim, deseja ser lembrado como alguém que faz bonito e que perdura.",
      "Os versos têm tamanhos variados, e não são todos decassílabos, e a linguagem é mais simples e menos elevada que a do original. O título brinca com “(in)felicidade”: a alegria ou o desgosto do professor depende do sucesso das aulas.",
    ],
    "Baseado em Antonio Sousa Brito, “Soneto da (in)felicidade”, blog Reticências poéticas, 17 maio 2010."
  ),
  ...txt(
    "p9u2-g16-leitura",
    Q("p9u2-g16-a1", "Compare o poema com o “Soneto de fidelidade”. Quanto às rimas, eles se assemelham ou se diferenciam?", "Assemelham-se: o esquema das rimas é mantido.",
      ["Diferenciam-se: o poema do professor não tem rimas.", "Diferenciam-se: só o de Vinicius tem rimas.", "Assemelham-se: ambos têm rimas só nos dois últimos versos."]),
    Q("p9u2-g16-a2", "Quanto à métrica, os dois poemas se assemelham ou se diferenciam?", "Diferenciam-se: os versos de Vinicius são decassílabos; os do outro poema têm métrica variável.",
      ["Assemelham-se: todos os versos são redondilhas.", "Assemelham-se: todos os versos têm quatro sílabas.", "Diferenciam-se: o de Vinicius não tem métrica alguma."], "hard"),
    Q("p9u2-g16-a3", "Quanto ao ritmo, os poemas se assemelham ou se diferenciam?", "Assemelham-se: o ritmo do original é reconhecível na paródia.",
      ["Diferenciam-se: a paródia não tem ritmo.", "Diferenciam-se: o de Vinicius é lido em música de rap.", "Assemelham-se: ambos são lidos sem pausa, como prosa."]),
    Q("p9u2-g16-a4", "Quanto ao tipo de composição, os poemas se assemelham ou se diferenciam?", "Assemelham-se: ambos são sonetos, com duas quadras e dois tercetos.",
      ["Diferenciam-se: um é soneto e o outro é haicai.", "Diferenciam-se: um é cordel e o outro é quadrinha.", "Assemelham-se: ambos são poemas de uma só estrofe."], "easy"),
    Q("p9u2-g16-a5", "Quanto à linguagem e à seleção de vocabulário, os poemas se assemelham ou se diferenciam?", "Diferenciam-se: Vinicius usa linguagem mais elevada e complexa; o outro poema usa palavras mais simples.",
      ["Assemelham-se: ambos usam gírias de internet.", "Assemelham-se: ambos são escritos em linguagem muito rebuscada.", "Diferenciam-se: só a paródia usa vocabulário elevado."]),
    Q("p9u2-g16-a6", "Quanto ao uso de antíteses, metáforas e paradoxos, os poemas se assemelham ou se diferenciam?", "Diferenciam-se: o de Vinicius tem muitas dessas figuras; o outro tem poucas, como a metáfora “me jogar na lama” e a brincadeira com “(in)felicidade”.",
      ["Assemelham-se: ambos têm a mesma quantidade de figuras.", "Diferenciam-se: só a paródia tem muitas figuras de linguagem.", "Assemelham-se: nenhum dos dois usa figuras de linguagem."], "hard"),
    Q("p9u2-g16-a7", "No poema do professor, qual é o tema central?", "O magistério e a dedicação de um professor ao seu trabalho.",
      ["O amor entre duas pessoas jovens.", "A saudade da cidade natal.", "A beleza da natureza no inverno."], "easy"),
    Q("p9u2-g16-a8", "O título é “Soneto da (in)felicidade”. Do que depende a felicidade ou a infelicidade do professor?", "Do sucesso do professor em seu trabalho.",
      ["Do tamanho da escola em que trabalha.", "Do salário que recebe a cada mês.", "Da cidade em que ele mora."], "easy"),
  ),
];

// ---------------------------------------------------------------------------
// Grupo 17 — Ficha da paródia de poema
// ---------------------------------------------------------------------------
const g17: Activity[] = [
  read(
    "p9u2-g17-leitura",
    "Paródia: um poema que conversa com outro",
    [
      "O poema da (in)felicidade recria o de Vinicius, mas muda o título e o tema; mesmo assim, guarda palavras, a organização das estrofes e o tipo de rima, para que o diálogo fique claro. Esse procedimento se chama paródia. As paródias costumam ter tom bem-humorado, ironizar ou satirizar o texto de referência.",
      "Outro exemplo vem da “Canção do exílio”, de Gonçalves Dias, poema do século XIX que exalta a terra natal, com palmeiras e o canto do sabiá. O poeta Cacaso o parodia no poema “Jogos florais”: nele, as palmeiras abrigam um tico-tico e o sabiá vive comendo o fubá do eu lírico. A quebra de expectativa gera humor.",
    ],
    "Baseado em Gonçalves Dias, “Canção do exílio”, e em Cacaso, “Jogos florais”, in Lero-lero, 7 Letras, 2002, p. 157."
  ),
  ...txt(
    "p9u2-g17-leitura",
    Q("p9u2-g17-a1", "Em um resumo sobre a paródia de poema: quem são os leitores?", "Pessoas de todas as idades que se interessam por poesia.",
      ["Apenas pessoas que nunca leram poemas.", "Apenas poetas do século XIX.", "Apenas juízes e advogados."], "easy"),
    Q("p9u2-g17-a2", "Qual é o objetivo desses textos?", "Entreter o leitor e criar humor, ironizando ou satirizando o texto de referência.",
      ["Ensinar regras de gramática.", "Fazer propaganda de um produto.", "Dar instruções de montagem."], "easy"),
    Q("p9u2-g17-a3", "Por onde as paródias circulam?", "Em publicações impressas e digitais: jornais, livros, revistas e internet.",
      ["Só em cartas de amor guardadas em gavetas.", "Só em manuais de eletrodomésticos.", "Só em placas de ruas."], "easy"),
    Q("p9u2-g17-a4", "Que recursos de construção são observados nas paródias de poema?", "Procedimentos que remetem ao texto de referência: palavras, trechos de versos ou versos inteiros, rimas, ritmo e figuras de linguagem.",
      ["Uso de números e gráficos para explicar o assunto.", "Cópia total do texto original, sem nenhuma mudança.", "Uso exclusivo de palavras estrangeiras."]),
    Q("p9u2-g17-a5", "Como se constrói o humor, a ironia ou a sátira nesses textos?", "Pela quebra de expectativas: as alterações no texto conhecido surpreendem o leitor e geram humor.",
      ["Pela repetição exata do original, sem nenhuma surpresa.", "Pela troca de todas as palavras por números.", "Pela retirada de todos os versos do poema."]),
    Q("p9u2-g17-a6", "Como é a linguagem da paródia do poema?", "Não há regra: pode manter o registro do original, formal ou informal, ou ser irreverente.",
      ["É sempre idêntica à do texto original.", "É sempre formal, sem possibilidade de humor.", "É sempre composta só de palavras difíceis."], "hard"),
  ),
];

// ---------------------------------------------------------------------------
// Grupo 18 — Capítulo 2, “Felicidade clandestina” (Clarice Lispector)
// ---------------------------------------------------------------------------
const g18: Activity[] = [
  read(
    "p9u2-g18-leitura",
    "Felicidade clandestina",
    [
      "A narradora, uma menina de Recife, conta como era a filha do dono de uma livraria: gorda, sardenta, de cabelos muito crespos e meio arruivados, com um busto enorme e os dois bolsos da blusa cheios de balas. Mas tinha o que toda criança devoradora de histórias queria: um pai livreiro. Mesmo assim, não aproveitava: nos aniversários, em vez de dar um livrinho barato, entregava um cartão-postal da loja, com paisagem do Recife e palavras como “data natalícia” e “saudade”.",
      "A menina tinha “talento para a crueldade”: era “pura vingança”, chupando balas com barulho, como se odiasse as outras meninas, bonitinhas, esguias, altinhas e de cabelos livres. Com a narradora exerceu uma “calma ferocidade”. Na ânsia de ler, a narradora nem percebia as humilhações e continuava a implorar livros que a outra nem lia.",
      "Até que a filha do livreiro, como que por acaso, contou que tinha “As reinações de Narizinho”, de Monteiro Lobato, um livro grosso, para se viver dentro dele. Disse que o emprestaria no dia seguinte. A narradora passou a noite feliz, cheia de esperança.",
      "No dia seguinte, a outra disse que tinha emprestado o livro a outra menina e mandou voltar no dia seguinte. E assim continuou, dia após dia, por muito tempo. A narradora já adivinhava que fora escolhida para sofrer, e as olheiras se cavavam sob seus olhos.",
      "Um dia, a mãe da menina apareceu na porta, estranhou aquela visita muda e diária e pediu explicações. Então entendeu a verdade e exclamou: o livro nunca saíra de casa, e a filha nem quis lê-lo! Horrorizada, mandou a filha emprestar o livro e disse à narradora que ficasse com ele pelo tempo que quisesse.",
      "A narradora, estonteada, saiu andando devagar, sem pular como sempre, com o livro apertado contra o peito. Em casa, fingiu não ter o livro, adiou a leitura, comeu pão com manteiga, escondeu e achou o livro de novo, para demorar o prazer. Sentia “felicidade clandestina”, quase como uma mulher com seu amante.",
    ],
    "Baseado em Clarice Lispector, “Felicidade clandestina”, in Felicidade clandestina, Rocco, 1971."
  ),
  ...txt(
    "p9u2-g18-leitura",
    Q("p9u2-g18-a1", "Os três primeiros parágrafos formam a introdução do conto. Quais são as personagens principais da história?", "A narradora e a menina filha do dono de livraria, na época em que eram crianças.",
      ["A narradora e a mãe da filha do dono da livraria.", "Monteiro Lobato e a filha do dono da livraria.", "A mãe da menina e o pai livreiro."], "easy"),
    Q("p9u2-g18-a2", "A narradora descreve as personagens e a si mesma de modo superficial ou de modo minucioso e aprofundado?", "De modo minucioso e aprofundado.",
      ["De modo superficial, só pelo nome.", "De modo vago, sem citar nenhuma característica.", "Descreve só a si mesma, sem falar das outras."], "easy"),
    Q("p9u2-g18-a3", "Que aspectos das personagens são descritos com mais ênfase pela narradora nesses parágrafos?", "Aspectos físicos e psicológicos: a menina é “gorda, sardenta” e cruel; a narradora e as outras são “bonitinhas, esguias” e desejam livros.",
      ["Só o endereço e a profissão dos pais.", "Só o preço dos livros que elas liam.", "Só as notas que tiravam na escola."], "hard"),
    Q("p9u2-g18-a4", "Embora não despertasse muita simpatia, algo fazia a filha do dono da livraria parecer superior. O que era?", "O fato de o pai ser dono de livraria, o que dava acesso aos livros tão desejados.",
      ["A beleza dela, admirada por todas as meninas.", "A fama que ela tinha de ser a melhor aluna.", "O dinheiro que ela gastava em balas."], "easy"),
    Q("p9u2-g18-a5", "Por que, na opinião da narradora, a outra menina tinha “talento para a crueldade”?", "Porque parecia ter prazer em exercer poder e humilhar as demais, em especial a narradora, emprestando livros só a quem implorasse.",
      ["Porque ensinava as outras meninas a serem más.", "Porque era a mais velha de todas as meninas do bairro.", "Porque nunca emprestava balas a ninguém."]),
    Q("p9u2-g18-a6", "Como a narradora interpretava as atividades da filha do dono da livraria?", "Como um desejo de vingança, por inveja das meninas bonitinhas, esguias e de cabelos livres.",
      ["Como uma brincadeira sem maldade.", "Como uma tentativa de fazer amizade.", "Como uma obrigação dada pelo pai livreiro."]),
    Q("p9u2-g18-a7", "Em “Como casualmente, informou-me que possuía As reinações de Narizinho”, a expressão “como casualmente” dá a entender que a iniciativa da menina foi casual ou planejada?", "Planejada, embora ela quisesse parecer casual.",
      ["Casual, pois a menina nem lembrava do livro.", "Casual, pois a narradora tinha pedido o livro antes.", "Planejada pela mãe da menina, que queria ajudar."]),
    Q("p9u2-g18-a8", "Por que a menina teria usado o livro “As reinações de Narizinho” para começar a exercer sua “tortura chinesa”?", "Porque já sabia da paixão da narradora por livros e do poder que tinha por ser filha do dono da livraria.",
      ["Porque o livro era o único que ela tinha em casa.", "Porque queria ensinar a narradora a ler.", "Porque era o livro que a mãe tinha mandado emprestar."]),
  ),
];

export const unidade2Grupos: GrupoParcial[] = [
  grupo("Amor em imagem e poesia", "Observar a pintura de Chagall e o poema “O mundo é grande”, de Drummond, e perceber como o amor aparece em cada linguagem.", "Vamos olhar uma pintura sobre um beijo flutuante e ler um poema curtinho que diz onde cabe o amor.", IMG_LIVRO, g1),
  grupo("O tempo do amor, por Drummond", "Interpretar o poema “O tempo passa? Não passa”: o enjambement, o tempo e a eternidade.", "Vamos ler o poema de Drummond e descobrir por que, para quem ama, o tempo parece não passar.", IMG_LETRAS, g2),
  grupo("Soneto de fidelidade", "Interpretar o soneto de Vinicius de Moraes e compará-lo ao poema de Drummond.", "Vamos entender o que é ser fiel, segundo Vinicius, e ver o que os dois poetas têm em comum.", IMG_LIVRO, g3),
  grupo("A linguagem dos poetas e a sua opinião", "Comparar a linguagem dos dois poemas, reconhecer o polissíndeto e opinar sobre o amor.", "Vamos ver como cada poeta escolhe as palavras e depois dar a nossa opinião sobre o amor de verdade.", IMG_CRIANCAS, g4),
  grupo("Orações subordinadas adjetivas", "Reconhecer a oração adjetiva e entender o papel do pronome relativo.", "Vamos descobrir como uma oração pode funcionar como um adjetivo e diferenciar restritiva de explicativa.", IMG_LETRAS, g5),
  grupo("Restritivas e explicativas nas tiras e nos textos", "Identificar e classificar orações adjetivas em tiras e em um texto sobre o efeito estufa.", "Vamos treinar com duas tiras novas e com um texto científico para ver as orações adjetivas em ação.", IMG_CRIANCAS, g6),
  grupo("Orações adjetivas reduzidas", "Reconhecer as orações adjetivas reduzidas e desenvolvê-las.", "Vamos ver como a oração adjetiva pode ter o verbo no infinitivo, no gerúndio ou no particípio.", IMG_LETRAS, g7),
  grupo("Mãos dadas e adjetivas no texto", "Analisar orações adjetivas em um texto sobre o poder das mãos dadas.", "Vamos ler um texto sobre mãos dadas e analisar como as orações adjetivas ajudam a explicar as ideias.", IMG_CRIANCAS, g8),
  grupo("Poema acumulativo", "Entender o encadeamento de orações adjetivas e as funções do pronome relativo em um poema.", "Vamos acompanhar um poema que empilha personagens e ver como o pronome que muda de função.", IMG_LIVRO, g9),
  grupo("Humor na tira do cachorro", "Analisar expressões, pronome indefinido e quebra de expectativa em uma tira.", "Vamos descobrir por que a tira é engraçada e como o pronome algo cria a confusão.", IMG_CRIANCAS, g10),
  grupo("Eu te amo pelo mundo", "Observar “Eu te amo” em vários idiomas e diferenciar substantivo de adjetivo pátrio.", "Vamos viajar por vários idiomas e entender quando um nome de língua é substantivo ou adjetivo.", IMG_FLORESTA, g11),
  grupo("Adjetivos pátrios no gráfico e nas cidades", "Formar adjetivos pátrios de países, estados e cidades.", "Vamos ler um gráfico de países e aprender a formar os adjetivos pátrios das cidades.", IMG_FLORESTA, g12),
  grupo("Pátrios irregulares e compostos", "Reconhecer pátrios irregulares e compostos.", "Vamos descobrir de onde vêm capixaba, potiguar e carioca e o que significam as formas ítalo- e teuto-.", IMG_FLORESTA, g13),
  grupo("Métrica, rima e figuras no poema", "Reconhecer a métrica, o esquema de rimas e as figuras de linguagem nos poemas do capítulo.", "Vamos contar sílabas, ver rimas e achar metáforas, antíteses e aliterações nos poemas.", IMG_LETRAS, g14),
  grupo("As características do gênero poema", "Resumir quem lê, para que serve e como se constrói um poema.", "Vamos montar a ficha do poema com leitores, objetivo, estrutura, sonoridade e linguagem.", IMG_LIVRO, g15),
  grupo("Paródia de poema", "Comparar a paródia “Soneto da (in)felicidade” com o poema original.", "Vamos comparar a paródia do professor com o soneto de Vinicius e ver o que muda e o que fica.", IMG_LETRAS, g16),
  grupo("A ficha da paródia", "Resumir as características da paródia de poema.", "Vamos descobrir como a paródia conversa com outro texto para gerar humor, ironia ou sátira.", IMG_LIVRO, g17),
  grupo("Felicidade clandestina", "Ler e interpretar o conto de Clarice Lispector sobre a paixão por um livro.", "Vamos ler uma história sobre uma menina que sonha com um livro e descobrir como ela é tratada por quem o tem.", IMG_LIVRO, g18),
];
