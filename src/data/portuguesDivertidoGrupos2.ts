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

// Português Divertido — grupos 12 a 21 (baseados nos temas da Parte 2 do livro
// "Português Linguagens – 6º ano"): figuras de linguagem, dígrafos, encontros
// consonantais e vocálicos, divisão silábica, quadrinhos, onomatopeias e interjeições.
// Textos e questões criados do zero para 6 anos; nada foi copiado, por isso não há "Fonte".

/** Marca várias questões como dependentes do mesmo texto-base. */
const txt = (readingId: string, ...acts: Activity[]): Activity[] =>
  acts.map((a) => fromText(readingId, a));

// ---------------------------------------------------------------------------
// Grupo 12 — Os bichos falam! (personificação)
// ---------------------------------------------------------------------------
const g12Activities: Activity[] = [
  read("pd-g12-leitura", "A chuva e o guarda-chuva", [
    "Ploc, ploc, ploc! A chuva bateu na janela e disse:",
    "— Bom dia, guarda-chuva! Vamos passear?",
    "— Hoje não! — respondeu o guarda-chuva, bocejando. — Estou com sono. Só abro quando for preciso.",
    "A nuvem riu lá do alto: — Hi, hi, hi! Eu vou chorar um pouquinho, e você vai ter que acordar!",
    "Assim foi. A nuvem chorou, o guarda-chuva abriu os braços e dançou com a chuva até o sol voltar.",
  ]),
  ...txt("pd-g12-leitura",
    mc("pd-g12-a1", "Quem falou primeiro no texto?", "Toque na resposta certa",
      "A chuva", ["O sol", "O vento", "O guarda-chuva"]),
    mc("pd-g12-a2", "Por que o guarda-chuva não quis passear?", "Toque na resposta certa",
      "Estava com sono", ["Estava com fome", "Estava com medo", "Estava molhado"]),
    tf("pd-g12-a3", "No texto, a nuvem riu.", true),
    mc("pd-g12-a4", "Chuva, nuvem e guarda-chuva falam de verdade?", "Toque na resposta certa",
      "Não! O texto faz de conta que eles agem como gente",
      ["Sim, todos falam", "Só a nuvem fala", "Só falam quando trovoa"], "medium"),
    match("pd-g12-a5", "Ligue cada personagem ao que ele fez", [
      ["A chuva", "Bateu na janela"],
      ["O guarda-chuva", "Bocejou de sono"],
      ["A nuvem", "Riu e chorou"],
    ], "medium"),
    order("pd-g12-a6", "Coloque os fatos na ordem certa", [
      "A chuva bateu na janela.",
      "O guarda-chuva disse que estava com sono.",
      "A nuvem chorou.",
      "O guarda-chuva dançou com a chuva.",
    ]),
  ),
  mc("pd-g12-a7", "Quando damos jeito de gente a bichos e objetos, isso se chama personificação. Qual frase tem personificação?", "Toque na resposta certa",
    "O relógio resmungou: “Já é tarde!”",
    ["O relógio marca oito horas.", "O relógio é redondo.", "Comprei um relógio novo."], "medium"),
  tf("pd-g12-a8", "Em “O sol sorriu para as crianças”, o sol faz algo que só gente faz.", true, "medium"),
  mc("pd-g12-a9", "Nas fábulas, os bichos agem como...", "Toque na resposta certa",
    "Pessoas", ["Pedras", "Nuvens", "Árvores"]),
  mc("pd-g12-a10", "Qual destes faz de conta que a bola é gente?", "Toque na resposta certa",
    "A bola chorou quando foi esquecida no quintal.",
    ["A bola é redonda.", "A bola rolou até o muro.", "A bola é de borracha."], "medium"),
];

// ---------------------------------------------------------------------------
// Grupo 13 — Rimas e sons que se repetem
// ---------------------------------------------------------------------------
const g13Activities: Activity[] = [
  read("pd-g13-leitura", "Festa na floresta", [
    "O pato pintou o prato,",
    "o gato dançou no mato.",
    "O sapo saltou e sorriu,",
    "e a festa na floresta seguiu.",
  ]),
  ...txt("pd-g13-leitura",
    mc("pd-g13-a1", "Qual palavra do texto rima com PRATO?", "Toque na resposta certa",
      "mato", ["sapo", "festa", "floresta"]),
    mc("pd-g13-a2", "Qual palavra do texto rima com SORRIU?", "Toque na resposta certa",
      "seguiu", ["saltou", "pintou", "dançou"]),
    mc("pd-g13-a3", "Em “pato, pintou, prato”, qual som se repete?", "Toque na resposta certa",
      "O som do P", ["O som do M", "O som do L", "O som do V"]),
    tf("pd-g13-a4", "Em “O sapo saltou e sorriu”, o som do S se repete.", true),
    mc("pd-g13-a5", "Repetir o mesmo som deixa o texto...", "Toque na resposta certa",
      "Divertido e gostoso de falar em voz alta", ["Sem graça", "Mais curto", "Mudo"], "medium"),
  ),
  mc("pd-g13-a6", "Qual palavra rima com BOLA?", "Toque na resposta certa",
    "cola", ["bolo", "boca", "bota"]),
  mc("pd-g13-a7", "Qual palavra rima com PÃO?", "Toque na resposta certa",
    "mão", ["pá", "pé", "pó"]),
  match("pd-g13-a8", "Ligue as palavras que rimam", [
    ["gato", "pato"],
    ["casa", "brasa"],
    ["flor", "cor"],
    ["botão", "feijão"],
  ]),
  mc("pd-g13-a9", "Qual é um trava-língua?", "Toque na resposta certa",
    "O rato roeu a roupa do rei de Roma.",
    ["Eu gosto de sorvete.", "A bola é azul.", "Hoje vai chover."], "medium"),
  mc("pd-g13-a10", "Qual frase repete mais o som do F?", "Toque na resposta certa",
    "A foca fofa foi fazer festa.",
    ["O gato dormiu no sofá.", "A bola rolou na rua.", "Maria comeu uma maçã."], "medium"),
];

// ---------------------------------------------------------------------------
// Grupo 14 — Parece ou é? (comparação e metáfora)
// ---------------------------------------------------------------------------
const g14Activities: Activity[] = [
  read("pd-g14-leitura", "O gigante Dudu", [
    "Dudu é um menino forte como um touro.",
    "Quando corre, parece um foguete.",
    "A voz dele é um trovão, mas o coração é um algodão-doce.",
    "Todo mundo gosta do Dudu: ele é um raio de sol na escola.",
  ]),
  ...txt("pd-g14-leitura",
    mc("pd-g14-a1", "Dudu é forte como...", "Toque na resposta certa",
      "um touro", ["um gatinho", "um pássaro", "um peixe"]),
    mc("pd-g14-a2", "Quando Dudu corre, ele parece...", "Toque na resposta certa",
      "um foguete", ["uma tartaruga", "um sapo", "um caracol"]),
    tf("pd-g14-a3", "Dudu é um touro de verdade.", false, "medium"),
    mc("pd-g14-a4", "Em “forte COMO um touro”, a palavra COMO serve para...", "Toque na resposta certa",
      "comparar duas coisas", ["contar números", "fazer uma pergunta", "dar uma ordem"], "medium"),
    mc("pd-g14-a5", "“O coração é um algodão-doce” quer dizer que o coração do Dudu é...", "Toque na resposta certa",
      "bondoso e macio", ["feito de açúcar de verdade", "vermelho", "muito duro"], "medium"),
    mc("pd-g14-a6", "“Ele é um raio de sol” quer dizer que Dudu...", "Toque na resposta certa",
      "deixa todo mundo alegre", ["queima as pessoas", "só aparece de dia", "é muito quente"], "medium"),
  ),
  match("pd-g14-a7", "Ligue a comparação ao seu significado", [
    ["Rápido como um raio", "Muito veloz"],
    ["Lento como uma tartaruga", "Bem devagar"],
    ["Bonito como uma flor", "Muito bonito"],
    ["Forte como um leão", "Muito forte"],
  ], "medium"),
  mc("pd-g14-a8", "Qual frase é uma comparação (usa a palavra COMO)?", "Toque na resposta certa",
    "Meu irmão é veloz como o vento.",
    ["Meu irmão é veloz.", "Meu irmão correu ontem.", "Meu irmão tem um carro."], "medium"),
  mc("pd-g14-a9", "Se alguém diz “Ela é uma estrela”, quer dizer que ela é...", "Toque na resposta certa",
    "brilhante e especial", ["feita de gás", "muito distante", "pequena e fria"], "medium"),
  mc("pd-g14-a10", "Qual frase compara sem usar a palavra COMO?", "Toque na resposta certa",
    "A lua é uma bola de prata.",
    ["A lua brilha à noite.", "A lua é bonita como uma flor.", "A lua nasceu cedo."], "hard"),
];

// ---------------------------------------------------------------------------
// Grupo 15 — Ditados e expressões
// ---------------------------------------------------------------------------
const g15Activities: Activity[] = [
  mc("pd-g15-a1", "Um ditado popular é...", "Toque na resposta certa",
    "Uma frase curta que ensina algo, usada por muita gente",
    ["Uma receita de bolo", "Um endereço", "Um bilhete para a professora"]),
  mc("pd-g15-a2", "“Quem avisa amigo é.” O que quer dizer?", "Toque na resposta certa",
    "Um bom amigo avisa quando algo pode dar errado",
    ["Amigo só fala por telefone", "Amigos nunca brigam", "Só amigos usam avisos"], "medium"),
  mc("pd-g15-a3", "“Água mole em pedra dura, tanto bate até que fura.” O que quer dizer?", "Toque na resposta certa",
    "Quem insiste e não desiste acaba conseguindo",
    ["A pedra é muito mole", "Água faz mal para pedras", "É melhor desistir logo"], "medium"),
  mc("pd-g15-a4", "“Devagar se vai ao longe.” O que quer dizer?", "Toque na resposta certa",
    "Com calma e sem pressa a gente chega longe",
    ["É preciso correr sempre", "Quem anda devagar fica parado", "Só se viaja de carro"], "medium"),
  mc("pd-g15-a5", "“De grão em grão a galinha enche o papo.” O que quer dizer?", "Toque na resposta certa",
    "Pouco a pouco, juntando um pouquinho de cada vez, a gente consegue muito",
    ["A galinha só come arroz", "Grãos são perigosos", "Galinhas não gostam de milho"], "medium"),
  mc("pd-g15-a6", "“Cada macaco no seu galho.” O que quer dizer?", "Toque na resposta certa",
    "Cada um cuida do que é seu, no seu lugar",
    ["Macacos moram em árvores baixas", "Todos devem subir na mesma árvore", "Ninguém pode ter amigos"], "medium"),
  match("pd-g15-a7", "Ligue a expressão ao significado", [
    ["Estar com a cabeça nas nuvens", "Estar distraído"],
    ["Ficar com água na boca", "Ter muita vontade de comer"],
    ["Pôr a mão na massa", "Começar a trabalhar"],
    ["Ficar de queixo caído", "Ficar muito surpreso"],
  ], "medium"),
  tf("pd-g15-a8", "“Cabeça nas nuvens” quer dizer que a pessoa subiu no céu de verdade.", false, "medium"),
  mc("pd-g15-a9", "Alguém diz: “Estou morrendo de fome!”. Como essa pessoa está?", "Toque na resposta certa",
    "Com muita fome", ["Muito doente", "Sem vontade de comer", "Dormindo"]),
  mc("pd-g15-a10", "Qual ditado combina com quem tenta de novo e não desiste?", "Toque na resposta certa",
    "Água mole em pedra dura, tanto bate até que fura.",
    ["Cada macaco no seu galho.", "Quem avisa amigo é.", "Devagar se vai ao longe."], "medium"),
];

// ---------------------------------------------------------------------------
// Grupo 16 — Pares de letras (dígrafos)
// ---------------------------------------------------------------------------
const g16Activities: Activity[] = [
  read("pd-g16-leitura", "A chuva no ninho", [
    "Naquela manhã, a chuva molhou o ninho do passarinho.",
    "O filhote chorou baixinho. A mamãe passarinho trouxe uma folha e fez um telhadinho.",
    "Depois, o sol voltou, bem quente, e secou tudo.",
    "Que alívio! Que carinho!",
  ]),
  ...txt("pd-g16-leitura",
    mc("pd-g16-a1", "Qual palavra do texto começa com CH?", "Toque na resposta certa",
      "chuva", ["ninho", "folha", "sol"]),
    mc("pd-g16-a2", "Qual par de letras aparece em NINHO?", "Toque na resposta certa",
      "NH", ["LH", "CH", "RR"]),
    mc("pd-g16-a3", "Qual par de letras aparece em FOLHA?", "Toque na resposta certa",
      "LH", ["NH", "CH", "SS"]),
    mc("pd-g16-a4", "Qual palavra do texto tem NH?", "Toque na resposta certa",
      "carinho", ["alívio", "quente", "sol"]),
  ),
  mc("pd-g16-a5", "Dígrafo é quando...", "Toque na resposta certa",
    "Duas letras juntas fazem um só som", ["Uma letra faz dois sons", "Três letras fazem um som", "Não há som nenhum"], "medium"),
  mc("pd-g16-a6", "Qual palavra tem LH?", "Toque na resposta certa",
    "coelho", ["casa", "bola", "gato"]),
  mc("pd-g16-a7", "Qual palavra tem NH?", "Toque na resposta certa",
    "unha", ["mesa", "lápis", "fita"]),
  mc("pd-g16-a8", "Qual palavra tem RR (dois erres)?", "Toque na resposta certa",
    "carro", ["caro", "cara", "rato"]),
  mc("pd-g16-a9", "Qual palavra tem SS?", "Toque na resposta certa",
    "osso", ["oco", "uso", "asa"]),
  mc("pd-g16-a10", "Qual palavra tem QU?", "Toque na resposta certa",
    "queijo", ["casa", "gato", "bola"]),
  match("pd-g16-a11", "Ligue o par de letras à palavra", [
    ["LH", "abelha"],
    ["NH", "galinha"],
    ["CH", "chapéu"],
    ["RR", "terra"],
  ]),
];

// ---------------------------------------------------------------------------
// Grupo 17 — Encontros de consoantes e o som do nariz
// ---------------------------------------------------------------------------
const g17Activities: Activity[] = [
  mc("pd-g17-a1", "Em PRATO, qual par de consoantes fica junto, cada uma com o seu som?", "Toque na resposta certa",
    "PR", ["LH", "NH", "SS"]),
  mc("pd-g17-a2", "Qual palavra tem BR?", "Toque na resposta certa",
    "braço", ["bola", "barco", "bico"]),
  mc("pd-g17-a3", "Qual palavra tem TR?", "Toque na resposta certa",
    "trem", ["tela", "tapete", "tomate"]),
  mc("pd-g17-a4", "Qual palavra tem FL?", "Toque na resposta certa",
    "flor", ["fita", "faca", "foca"]),
  mc("pd-g17-a5", "Qual palavra tem PL?", "Toque na resposta certa",
    "planta", ["pato", "pipa", "pera"]),
  mc("pd-g17-a6", "Qual palavra tem GR?", "Toque na resposta certa",
    "grilo", ["gato", "galo", "gelo"]),
  tf("pd-g17-a7", "Em PR de PRATO, a gente ouve o P e o R.", true, "medium"),
  tf("pd-g17-a8", "Em NH de NINHO, a gente ouve o N e o H separados.", false, "medium"),
  match("pd-g17-a9", "Ligue a palavra ao encontro de consoantes", [
    ["braço", "BR"],
    ["prato", "PR"],
    ["flor", "FL"],
    ["grilo", "GR"],
  ], "medium"),
  mc("pd-g17-a10", "Qual palavra tem o som “no nariz” (M ou N depois da vogal)?", "Toque na resposta certa",
    "samba", ["bola", "gato", "pato"], "medium"),
  mc("pd-g17-a11", "Antes de P e B, a gente escreve...", "Toque na resposta certa",
    "M", ["N", "S", "Z"], "medium"),
  mc("pd-g17-a12", "Qual palavra está escrita certa?", "Toque na resposta certa",
    "campo", ["canpo", "capmo", "camppo"], "medium"),
];

// ---------------------------------------------------------------------------
// Grupo 18 — Vogais que se encontram (ditongo e hiato)
// ---------------------------------------------------------------------------
const g18Activities: Activity[] = [
  read("pd-g18-leitura", "A lua e o pai", [
    "O pai de Luana mostrou a lua no céu.",
    "— Olha, filha, a lua está cheia! — disse ele.",
    "Luana sentiu saudade da vovó e mandou um beijo para o céu.",
  ]),
  ...txt("pd-g18-leitura",
    mc("pd-g18-a1", "Quantas sílabas tem a palavra LUA?", "Toque na resposta certa",
      "2 (lu-a)", ["1", "3", "4"]),
    mc("pd-g18-a2", "Em PAI, as vogais A e I ficam...", "Toque na resposta certa",
      "Juntas, na mesma sílaba", ["Em sílabas diferentes", "Separadas por hífen", "Em palavras diferentes"], "medium"),
    mc("pd-g18-a3", "Em LUA, as vogais U e A ficam...", "Toque na resposta certa",
      "Em sílabas diferentes (lu-a)", ["Na mesma sílaba", "Em outra palavra", "Sem som"], "medium"),
    mc("pd-g18-a4", "Qual palavra do texto tem as vogais E e U juntas na mesma sílaba?", "Toque na resposta certa",
      "céu", ["lua", "Luana", "vovó"], "medium"),
  ),
  mc("pd-g18-a5", "Quando duas vogais ficam juntas na mesma sílaba (como em PAI), chamamos de...", "Toque na resposta certa",
    "ditongo", ["hiato", "dígrafo", "rima"], "medium"),
  mc("pd-g18-a6", "Quando duas vogais ficam em sílabas diferentes (como em LU-A), chamamos de...", "Toque na resposta certa",
    "hiato", ["ditongo", "dígrafo", "rima"], "medium"),
  mc("pd-g18-a7", "Qual palavra tem ditongo?", "Toque na resposta certa",
    "boi", ["lua", "saída", "poeta"], "medium"),
  mc("pd-g18-a8", "Qual palavra tem hiato?", "Toque na resposta certa",
    "saída", ["pai", "meu", "mãe"], "medium"),
  match("pd-g18-a9", "Ligue cada palavra à sua separação em sílabas", [
    ["lua", "lu-a"],
    ["mãe", "mãe (1 sílaba)"],
    ["saída", "sa-í-da"],
    ["meu", "meu (1 sílaba)"],
  ], "medium"),
  mc("pd-g18-a10", "Quantas sílabas tem a palavra SAÚDE?", "Toque na resposta certa",
    "3 (sa-ú-de)", ["1", "2", "4"], "hard"),
];

// ---------------------------------------------------------------------------
// Grupo 19 — Dividir em sílabas
// ---------------------------------------------------------------------------
const g19Activities: Activity[] = [
  mc("pd-g19-a1", "Bata palmas para cada pedacinho. Quantas sílabas tem GATO?", "Toque na resposta certa",
    "2 (ga-to)", ["1", "3", "4"]),
  mc("pd-g19-a2", "Quantas sílabas tem SOL?", "Toque na resposta certa",
    "1", ["2", "3", "4"]),
  mc("pd-g19-a3", "Quantas sílabas tem BANANA?", "Toque na resposta certa",
    "3 (ba-na-na)", ["2", "4", "5"]),
  mc("pd-g19-a4", "Quantas sílabas tem ELEFANTE?", "Toque na resposta certa",
    "4 (e-le-fan-te)", ["2", "3", "5"]),
  mc("pd-g19-a5", "Quantas sílabas tem BORBOLETA?", "Toque na resposta certa",
    "4 (bor-bo-le-ta)", ["2", "3", "5"], "medium"),
  mc("pd-g19-a6", "Como se separa a palavra CARRO?", "Toque na resposta certa",
    "car-ro", ["ca-rro", "c-arro", "carr-o"], "medium"),
  mc("pd-g19-a7", "Como se separa a palavra OSSO?", "Toque na resposta certa",
    "os-so", ["o-sso", "oss-o", "o-s-so"], "medium"),
  mc("pd-g19-a8", "Como se separa a palavra CHUVA?", "Toque na resposta certa",
    "chu-va", ["c-hu-va", "ch-u-va", "chuv-a"], "medium"),
  mc("pd-g19-a9", "Como se separa a palavra NINHO?", "Toque na resposta certa",
    "ni-nho", ["nin-ho", "n-i-nho", "ninh-o"], "medium"),
  order("pd-g19-a10", "Coloque as sílabas na ordem para formar JANELA", ["ja", "ne", "la"], "easy"),
  match("pd-g19-a11", "Ligue a palavra ao número de sílabas", [
    ["pé", "1 sílaba"],
    ["mesa", "2 sílabas"],
    ["sapato", "3 sílabas"],
    ["computador", "4 sílabas"],
  ], "medium"),
  mc("pd-g19-a12", "Quando uma palavra não cabe no fim da linha, usamos o...", "Toque na resposta certa",
    "hífen (-)", ["ponto final", "ponto de interrogação", "ponto de exclamação"], "medium"),
];

// ---------------------------------------------------------------------------
// Grupo 20 — O mundo dos quadrinhos (balões)
// ---------------------------------------------------------------------------
const g20Activities: Activity[] = [
  read("pd-g20-leitura", "Tirinha: O pato e o balão (contada em palavras)", [
    "Quadrinho 1 — Um pato olha para o céu. Balão de pensamento (em forma de nuvem): “Eu queria voar!”",
    "Quadrinho 2 — O pato pega um balão colorido. Balão de fala (linha normal): “Vou tentar!”",
    "Quadrinho 3 — O pato sobe, sobe, sobe! Balão de grito (pontudo): “SOCORRO, ESTOU MUITO ALTO!”",
    "Quadrinho 4 — Lá embaixo, a tartaruga cochicha. Balão de cochicho (linha pontilhada): “Pato, é só soltar o balão devagarinho...”",
  ]),
  ...txt("pd-g20-leitura",
    mc("pd-g20-a1", "Quantos quadrinhos tem essa tirinha?", "Toque na resposta certa",
      "4", ["2", "3", "5"]),
    mc("pd-g20-a2", "No quadrinho 1, o balão em forma de nuvem mostra o que o pato...", "Toque na resposta certa",
      "pensa", ["grita", "canta", "cochicha"]),
    mc("pd-g20-a3", "No quadrinho 3, o balão pontudo mostra...", "Toque na resposta certa",
      "um grito", ["um cochicho", "um pensamento", "uma canção"]),
    mc("pd-g20-a4", "O balão de linha pontilhada mostra...", "Toque na resposta certa",
      "um cochicho, uma voz bem baixinha", ["um grito", "um pensamento", "uma gargalhada"]),
    tf("pd-g20-a5", "O pato queria voar.", true),
    mc("pd-g20-a6", "Quem cochicha para o pato?", "Toque na resposta certa",
      "A tartaruga", ["O gato", "A coruja", "O coelho"]),
    order("pd-g20-a7", "Coloque os fatos na ordem certa", [
      "O pato olha para o céu.",
      "O pato pega um balão colorido.",
      "O pato sobe e grita por socorro.",
      "A tartaruga cochicha uma dica.",
    ]),
  ),
  match("pd-g20-a8", "Ligue o balão ao que ele mostra", [
    ["Balão de linha normal", "Fala"],
    ["Balão em forma de nuvem", "Pensamento"],
    ["Balão pontudo", "Grito"],
    ["Balão de linha pontilhada", "Cochicho"],
  ], "medium"),
  mc("pd-g20-a9", "Uma história contada em vários quadrinhos, com desenhos e balões, é uma...", "Toque na resposta certa",
    "história em quadrinhos", ["receita", "lista de compras", "carta"]),
  mc("pd-g20-a10", "O desenho ajuda a contar a história nos quadrinhos?", "Toque na resposta certa",
    "Sim, desenho e palavras contam a história juntos", ["Não, só as palavras contam", "Não, o desenho é só enfeite", "Só ajuda no último quadrinho"], "medium"),
];

// ---------------------------------------------------------------------------
// Grupo 21 — Au! Pof! Oba! (onomatopeias e interjeições)
// ---------------------------------------------------------------------------
const g21Activities: Activity[] = [
  read("pd-g21-leitura", "Um dia cheio de sons", [
    "Tic-tac, tic-tac, fazia o relógio da sala.",
    "Ding-dong! A campainha tocou.",
    "Au-au! O cachorro correu até a porta.",
    "— Oba! É a vovó! — gritou Mel.",
    "— Ufa, que calor! — disse a vovó, entrando.",
    "Plof! Mel pulou no colo dela, e as duas riram: — Ha-ha-ha!",
  ]),
  ...txt("pd-g21-leitura",
    mc("pd-g21-a1", "Qual palavra imita o som do relógio?", "Toque na resposta certa",
      "Tic-tac", ["Ding-dong", "Au-au", "Plof"]),
    mc("pd-g21-a2", "O que faz “Ding-dong”?", "Toque na resposta certa",
      "A campainha", ["O relógio", "O cachorro", "A vovó"]),
    mc("pd-g21-a3", "Qual palavra imita o latido do cachorro?", "Toque na resposta certa",
      "Au-au", ["Tic-tac", "Ding-dong", "Ha-ha-ha"]),
    mc("pd-g21-a4", "A palavra “Oba!” mostra...", "Toque na resposta certa",
      "alegria", ["tristeza", "medo", "sono"]),
    tf("pd-g21-a5", "“Plof!” é um som que aparece no texto.", true),
    mc("pd-g21-a6", "Uma palavra que imita um som (como tic-tac e au-au) se chama...", "Toque na resposta certa",
      "onomatopeia", ["rima", "legenda", "sílaba"], "medium"),
  ),
  match("pd-g21-a7", "Ligue o som ao animal", [
    ["Au-au", "Cachorro"],
    ["Miau", "Gato"],
    ["Muuu", "Vaca"],
    ["Piu-piu", "Passarinho"],
  ]),
  mc("pd-g21-a8", "Qual palavra mostra dor?", "Toque na resposta certa",
    "Ai!", ["Oba!", "Eba!", "Ufa!"]),
  mc("pd-g21-a9", "Qual palavra mostra nojo?", "Toque na resposta certa",
    "Eca!", ["Eba!", "Oba!", "Tchau!"]),
  mc("pd-g21-a10", "Qual palavra mostra surpresa?", "Toque na resposta certa",
    "Nossa!", ["Tchau!", "Obrigado!", "Silêncio!"]),
  mc("pd-g21-a11", "Palavras como Oba!, Ai! e Eca! mostram sentimentos e se chamam...", "Toque na resposta certa",
    "interjeições", ["onomatopeias", "rimas", "sílabas"], "medium"),
  mc("pd-g21-a12", "Qual onomatopeia imita uma batida na porta?", "Toque na resposta certa",
    "Toc! Toc!", ["Miau!", "Splash!", "Ding-dong!"]),
];

export const portuguesDivertidoGrupos2: LessonGroup[] = [
  grupo(12, "Os Bichos Falam!",
    "Personificação: quando bichos e objetos agem como gente.",
    "Lili escuta a chuva conversando com o guarda-chuva e descobre que, nas histórias, até as nuvens podem rir.",
    IMG_FLORESTA, g12Activities),
  grupo(13, "Rimas e Sons que se Repetem",
    "Rimas, trava-línguas e palavras que repetem o mesmo som.",
    "Lili entra numa festa de rimas e aprende a brincar com os sons das palavras.",
    IMG_LETRAS, g13Activities),
  grupo(14, "Parece ou É?",
    "Comparação e metáfora: dizer que uma coisa parece outra.",
    "Lili conhece o gigante Dudu, forte como um touro e doce como um algodão-doce.",
    IMG_CRIANCAS, g14Activities),
  grupo(15, "Ditados e Expressões",
    "Ditados populares e expressões com outro sentido.",
    "Lili pergunta aos avós quais frases antigas ensinam a viver melhor.",
    IMG_LIVRO, g15Activities),
  grupo(16, "Pares de Letras",
    "Dígrafos: CH, LH, NH, QU, RR e SS.",
    "Lili descobre que duas letras juntas podem fazer um único som.",
    IMG_LETRAS, g16Activities),
  grupo(17, "Encontros de Consoantes",
    "BR, PR, TR, FL, GR... e o som do nariz com M e N.",
    "Lili brinca com consoantes que dão as mãos e com o som que faz cócegas no nariz.",
    IMG_LETRAS, g17Activities),
  grupo(18, "Vogais que se Encontram",
    "Ditongo e hiato: vogais juntas na mesma sílaba ou separadas.",
    "Lili olha para a lua e descobre vogais que moram juntas e vogais que moram em casas separadas.",
    IMG_LETRAS, g18Activities),
  grupo(19, "Dividir em Sílabas",
    "Contar sílabas com palmas e separar palavras no fim da linha.",
    "Lili bate palmas para cada pedacinho das palavras e aprende a separar sílabas.",
    IMG_LETRAS, g19Activities),
  grupo(20, "O Mundo dos Quadrinhos",
    "Quadrinhos e tipos de balão: fala, pensamento, grito e cochicho.",
    "Lili entra numa tirinha e descobre o que cada balão quer dizer.",
    IMG_CRIANCAS, g20Activities),
  grupo(21, "Au! Pof! Oba!",
    "Onomatopeias (sons) e interjeições (sentimentos).",
    "Lili escuta um dia cheio de sons e de palavrinhas que mostram o que a gente sente.",
    IMG_CRIANCAS, g21Activities),
];
