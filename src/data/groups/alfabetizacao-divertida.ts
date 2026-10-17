import { createKit, type GroupSpec } from "../activityKit";

const { mc, tf, ord, mt } = createKit("6-8");

export const specs: GroupSpec[] = [
  {
    title: "Família das Sílabas",
    objective: "Reconhecer e juntar as sílabas BA, BE, BI, BO, BU e outras para formar palavras.",
    script:
      "A Lili mostra como as letras se juntam em famílias: BA, BE, BI, BO, BU. Depois ela monta palavras como BOLA e GATO, juntando sílabas.",
    thumb: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    activities: [
      mc("easy", "Qual sílaba começa a palavra BOLA? 🏐", [["BA", false], ["BO", true], ["BI", false], ["BU", false]]),
      tf("easy", "A palavra BEBÊ 👶 tem a sílaba BE.", true),
      mc("easy", "Qual palavra começa com a sílaba CA?", [["SAPO", false], ["MALA", false], ["CASA 🏠", true], ["BOLO", false]]),
      mt("medium", "Ligue cada palavra à sílaba com que ela começa.", [
        ["🐱 GATO", "GA"],
        ["🦆 PATO", "PA"],
        ["🔔 SINO", "SI"],
        ["🎂 BOLO", "BO"],
      ]),
      mc("medium", "Qual sílaba falta? CA _ SA 👕", [["MA", false], ["ME", false], ["MI", true], ["MO", false]]),
      ord("medium", "Ponha as sílabas na ordem para formar SAPATO 👞", ["SA", "PA", "TO"]),
      tf("medium", "A palavra FADA 🧚 começa com a sílaba FE.", false),
      mc("hard", "Troque a sílaba PA de PATO por GA. Que palavra fica?", [["GOTA", false], ["PATA", false], ["TAPA", false], ["GATO", true]]),
      tf("hard", "Em BA, BE, BI, BO e BU a consoante é sempre B e a vogal muda.", true),
      mc("hard", "Qual palavra tem 3 sílabas?", [["BOLA", false], ["BANANA 🍌", true], ["SAPO", false], ["GATO", false]]),
    ],
  },
  {
    title: "Formando Palavras e Frases",
    objective: "Juntar letras e sílabas para formar palavras e organizar palavras em frases com sentido.",
    script:
      "A Lili brinca de montar palavras com letras soltas. Depois ela coloca as palavras em fila para criar frases que fazem sentido.",
    thumb: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800",
    activities: [
      mc("easy", "Qual é uma frase?", [["gato", false], ["casa bola", false], ["O gato dorme.", true], ["pato e", false]]),
      tf("easy", "Toda frase começa com letra maiúscula.", true),
      mc("easy", "Juntando as letras B, O, L, A, qual palavra formamos? 🏐", [["BOLA", true], ["LABO", false], ["ABLO", false], ["OLBA", false]]),
      ord("medium", "Ponha as palavras na ordem para formar uma frase.", ["Eu", "lavo", "as", "mãos."]),
      mc("medium", "Qual frase está escrita certa?", [["Bola a redonda é.", false], ["É a redonda bola.", false], ["Redonda a bola é.", false], ["A bola é redonda.", true]]),
      mt("medium", "Junte as sílabas e ligue à palavra.", [
        ["BO + LA", "BOLA"],
        ["GA + TO", "GATO"],
        ["PA + TO", "PATO"],
        ["SA + PO", "SAPO"],
      ]),
      mc("medium", "Qual palavra completa a frase? Eu bebo ___. 🥛", [["pedra", false], ["leite", true], ["sapato", false], ["livro", false]]),
      mc("hard", "Qual palavra completa as duas frases? O ___ mia. / Eu faço carinho no ___.", [["pato", false], ["sapo", false], ["gato", true], ["peixe", false]]),
      tf("hard", "A frase \"Gosto de eu sorvete.\" faz sentido.", false),
      mc("hard", "Qual frase tem 4 palavras?", [["Eu corro.", false], ["Papai lê.", false], ["A bola é azul e grande.", false], ["O gato bebe leite.", true]]),
    ],
  },
  {
    title: "Rimas e Sons Iguais",
    objective: "Perceber o som igual no final das palavras e encontrar rimas.",
    script:
      "A Lili canta palavras que terminam com o mesmo som, como GATO e PATO. Ela convida você a descobrir quem rima com quem.",
    thumb: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800",
    activities: [
      mc("easy", "Qual palavra rima com GATO? 🐱", [["GOTA", false], ["PATO", true], ["GALO", false], ["LATA", false]]),
      tf("easy", "A palavra BOLA rima com COLA.", true),
      mc("easy", "Qual palavra rima com CASA?", [["MESA", false], ["CAMA", false], ["ASA", true], ["SAPO", false]]),
      mt("medium", "Ligue cada palavra à que rima com ela.", [
        ["LUA", "RUA"],
        ["GATO", "PATO"],
        ["BOLA", "COLA"],
        ["CHAPÉU", "CÉU"],
      ]),
      mc("medium", "Qual palavra rima com MÃO?", [["PÃO", true], ["MOLA", false], ["MAR", false], ["MEL", false]]),
      ord("medium", "Ponha as palavras da que tem menos sílabas para a que tem mais.", ["SOL", "BOLA", "SAPATO", "BORBOLETA"]),
      tf("medium", "A palavra SOL rima com LUA.", false),
      mc("hard", "Qual par de palavras rima?", [["BOLO e BOLA", false], ["PATO e PIPA", false], ["SOL e SAPO", false], ["MALA e SALA", true]]),
      mc("hard", "Qual palavra NÃO rima com as outras?", [["GATO", false], ["PATO", false], ["BOLA", true], ["RATO", false]]),
      mc("hard", "Qual palavra rima com BOLA e também com COLA?", [["ESTOJO", false], ["ESCOLA", true], ["ESCOVA", false], ["ESPELHO", false]]),
    ],
  },
  {
    title: "Ordem do Alfabeto e Letras",
    objective: "Usar a ordem alfabética e diferenciar letras maiúsculas e minúsculas.",
    script:
      "A Lili canta o alfabeto de A a Z e mostra que cada letra tem uma versão grande e uma pequena. Depois ela organiza palavras na ordem do alfabeto.",
    thumb: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800",
    activities: [
      mc("easy", "Qual letra vem depois do A?", [["C", false], ["B", true], ["D", false], ["E", false]]),
      tf("easy", "A letra b é a forma minúscula da letra B.", true),
      mc("easy", "Qual é a letra minúscula de M?", [["n", false], ["w", false], ["m", true], ["h", false]]),
      ord("medium", "Ponha as palavras na ordem do alfabeto.", ["ABELHA 🐝", "BOLA 🏐", "CASA 🏠", "DADO 🎲"]),
      mt("medium", "Ligue cada letra maiúscula à sua minúscula.", [
        ["R", "r"],
        ["T", "t"],
        ["L", "l"],
        ["Q", "q"],
      ]),
      mc("medium", "Qual nome começa com letra maiúscula?", [["bruno", false], ["Lucas", true], ["carla", false], ["pedro", false]]),
      tf("medium", "Depois da letra D vem a letra F.", false),
      mc("hard", "Qual palavra vem primeiro na ordem do alfabeto?", [["BOLA", false], ["BICO", false], ["BULE", false], ["BALDE", true]]),
      tf("hard", "Na ordem do alfabeto, CASA vem antes de COCO.", true),
      mc("hard", "Qual frase tem as letras maiúsculas todas certas?", [["meu tio mora em Recife.", false], ["Meu primo mora em recife.", false], ["Minha tia mora em Recife.", true], ["minha avó mora em recife.", false]]),
    ],
  },
  {
    title: "Pequenos Textos e Pontuação",
    objective: "Ler textos curtos e reconhecer o ponto final, a interrogação e a exclamação.",
    script:
      "A Lili lê uma historinha curta e mostra os sinais que dão o tom da leitura: ponto, interrogação e exclamação. Depois ela pergunta o que aconteceu no texto.",
    thumb: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800",
    activities: [
      mc("easy", "Qual sinal fecha uma pergunta?", [[".", false], ["?", true], ["!", false], [",", false]]),
      tf("easy", "O ponto final (.) aparece no fim de uma frase que conta algo.", true),
      mc("easy", "Qual sinal mostra surpresa ou alegria forte?", [[".", false], ["?", false], ["!", true], [",", false]]),
      mc("medium", "Qual frase está com o sinal certo?", [["Onde você mora?", true], ["Onde você mora.", false], ["Onde você mora,", false], ["Onde você mora;", false]]),
      mt("medium", "Ligue cada frase ao sinal que vai no final.", [
        ["Qual é o seu nome", "?"],
        ["Eu gosto de pipoca", "."],
        ["Ei, cuidado", "!"],
      ]),
      ord("medium", "Ponha as frases na ordem da história.", ["Eu plantei uma semente.", "Eu reguei todo dia.", "Nasceu uma folhinha.", "Virou uma linda planta."]),
      mc("medium", "Bia tem um cão. O cão se chama Totó. Como o cão se chama?", [["Bia", false], ["Bolo", false], ["Totó", true], ["Rex", false]]),
      mc("hard", "Léo comeu a pizza. Depois, escovou os dentes. O que Léo fez primeiro?", [["Escovou os dentes", false], ["Foi para a escola", false], ["Tomou banho", false], ["Comeu a pizza", true]]),
      tf("hard", "Uma pergunta termina com ponto final.", false),
      mc("hard", "Nina viu a chuva. Pegou o guarda-chuva e saiu. Por que ela pegou o guarda-chuva?", [["Porque fazia sol", false], ["Porque estava chovendo", true], ["Porque era noite", false], ["Porque estava com frio", false]]),
    ],
  },
];
