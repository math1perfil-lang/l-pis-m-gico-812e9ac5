import { grupo, IMG, IMG_CRIANCAS, IMG_FLORESTA, IMG_LETRAS, IMG_LIVRO, mc, read, txt, withImage } from "./shared";
import type { GrupoParcial } from "./shared";
import { leituraSoneto, leituraTempo } from "./unidade2a";

// Unidade 2 — Amor. Capítulo 1 (parte B: tira, adjetivos pátrios, poema e paródia) e Capítulo 2 (início).

const I = "Toque na resposta certa";

// ---------------------------------------------------------------------------
// G12 — Adjetivos pátrios: conceito
// ---------------------------------------------------------------------------
const patriosTeoria = read("p9u2-patrios-teoria", "Adjetivos pátrios: o conceito", [
  "Adjetivo pátrio (ou gentílico) é a palavra que indica a origem de alguém ou de algo: país, estado ou cidade. Exemplos: brasileiro, mineiro, curitibano, chileno. Muitos terminam em -ês, -ense, -eiro, -ão e -ano, mas há formas irregulares, como carioca (cidade do Rio de Janeiro) e capixaba (Espírito Santo).",
  "A mesma palavra pode ser substantivo ou adjetivo. Como substantivo, nomeia a pessoa ou o idioma: “O português é falado no Brasil.” Como adjetivo, acompanha um substantivo e indica a origem: “O idioma português está entre os mais falados do mundo.”",
  "Quando o adjetivo junta duas origens, forma-se um adjetivo composto, em que o primeiro elemento aparece em forma reduzida e alatinada: sino- (chinês), luso- (português), ítalo- (italiano), anglo- (inglês), hispano- (espanhol). Exemplos: “aliança luso-brasileira”, “conflito sino-japonês”.",
]);

const eteAmo = read("p9u2-eteamo", "Eu te amo em vários idiomas", [
  "Descrição de um cartaz: um globo terrestre e vários balões de fala em forma de coração, com a expressão “Eu te amo” escrita em diferentes idiomas: albanês, dinamarquês, inglês, japonês, francês, polonês, chinês e alemão.",
]);

const g12: GrupoParcial = grupo(
  "Adjetivos pátrios: o que são?",
  "Reconhecer adjetivos pátrios e a diferença entre o uso como substantivo e como adjetivo.",
  "Brasileiro, mineiro, carioca, nipônico: palavras que mostram de onde alguém ou algo vem.",
  IMG_LETRAS,
  [
    patriosTeoria,
    eteAmo,
    ...txt("p9u2-eteamo",
      mc("p9u2-g12-a1", "Qual é, em português, a expressão que aparece em vários idiomas no cartaz descrito?", I,
        "“Eu te amo”.",
        ["“Bom dia”.", "“Boa viagem”.", "“Até logo”."]),
      mc("p9u2-g12-a2", "Os nomes dos idiomas (albanês, japonês, francês...) podem ser substantivos ou adjetivos. O que indicam quando são substantivos?", I,
        "O nome do idioma. Exemplo: “O português é falado no Brasil.”",
        ["Uma qualidade de uma pessoa.", "Um lugar de nascimento.", "Uma ação."], "medium"),
      mc("p9u2-g12-a3", "E o que indicam quando são adjetivos?", I,
        "A origem, a nacionalidade. Exemplo: “O idioma português está entre os mais falados do mundo.”",
        ["O nome do idioma, sempre.", "Uma ação que se pratica.", "Um número."], "medium"),
      mc("p9u2-g12-a4", "Qual alternativa define melhor os adjetivos pátrios?", I,
        "Adjetivos que indicam país, estado, cidade ou origem de alguém ou algo, formados geralmente com -ês, -ense, -eiro, -ão e -ano.",
        ["Palavras que indicam ações de um país.", "Adjetivos que indicam só a idade.", "Palavras que indicam só nomes de rios."], "medium"),
      mc("p9u2-g12-a5", "Qual adjetivo pátrio corresponde ao estado de Alagoas?", I,
        "Alagoano.",
        ["Alagoês.", "Alagotano.", "Alagoeiro."], "medium"),
      mc("p9u2-g12-a6", "Em “conflito sino-japonês”, a forma “sino-” é:", I,
        "A forma reduzida e alatinada de “chinês”.",
        ["A forma reduzida de “sinal”.", "A forma reduzida de “sinônimo”.", "Um prefixo que significa “sem”."], "medium"),
      mc("p9u2-g12-a7", "Qual forma alatinada corresponde a “português”?", I,
        "Luso-.",
        ["Anglo-.", "Teuto-.", "Ítalo-."]),
    ),
  ]
);

// ---------------------------------------------------------------------------
// G13 — Adjetivos pátrios: gráfico do Pisa e cidades
// ---------------------------------------------------------------------------
const pisa = read("p9u2-pisa", "Leitura dos latino-americanos no Pisa 2018", [
  "Um gráfico mostra o desempenho em Leitura de países latino-americanos no teste internacional Pisa de 2018. Os melhores colocados são os alunos chilenos, seguidos pelos mexicanos, costa-riquenhos e uruguaios, todos à frente dos brasileiros.",
  "Em seguida aparecem os alunos brasileiros. Atrás deles estão os alunos colombianos, argentinos, peruanos e panamenhos. Na última posição, a 76ª, estão os alunos dominicanos.",
], "Baseado em “Pisa: como o desempenho do Brasil no exame se compara ao de outros países da América Latina”, BBC News Brasil, 3 dez. 2019.");

const g13: GrupoParcial = grupo(
  "Pátrios: países e cidades",
  "Usar adjetivos pátrios para países e cidades, com base em um gráfico e em exemplos.",
  "Chileno, mexicano, uruguaio… e curitibano, belenense, palmense. Treinamos os gentílicos de países e cidades.",
  IMG_CRIANCAS,
  [
    pisa,
    ...txt("p9u2-pisa",
      mc("p9u2-g13-a1", "Os alunos ___ são os mais bem posicionados entre os latino-americanos em Leitura.", I,
        "chilenos",
        ["colombianos", "peruanos", "dominicanos"]),
      mc("p9u2-g13-a2", "Além dos chilenos, estão à frente dos brasileiros os alunos ___.", I,
        "mexicanos, costa-riquenhos e uruguaios",
        ["colombianos, argentinos e peruanos", "dominicanos e panamenhos", "chilenos e brasileiros"], "medium"),
      mc("p9u2-g13-a3", "Na 76ª posição estão os alunos ___.", I,
        "dominicanos",
        ["chilenos", "uruguaios", "mexicanos"]),
      mc("p9u2-g13-a4", "Atrás dos brasileiros estão também os alunos ___.", I,
        "colombianos, argentinos, peruanos e panamenhos (ou panamenses)",
        ["chilenos, mexicanos e uruguaios", "costa-riquenhos e mexicanos", "só os argentinos"], "medium"),
    ),
    mc("p9u2-g13-a5", "Qual é o adjetivo pátrio de Curitiba?", I,
      "Curitibano.",
      ["Curitiense.", "Curitês.", "Curitão."]),
    mc("p9u2-g13-a6", "Qual é o adjetivo pátrio de Belém?", I,
      "Belenense.",
      ["Belemano.", "Belemita.", "Belenês."]),
    mc("p9u2-g13-a7", "Qual é o adjetivo pátrio de Florianópolis?", I,
      "Florianopolitano.",
      ["Florianense.", "Floriano.", "Florianês."], "medium"),
    mc("p9u2-g13-a8", "Qual é o adjetivo pátrio do Piauí?", I,
      "Piauiense.",
      ["Piauíno.", "Piauês.", "Piauiano."]),
    mc("p9u2-g13-a9", "Qual é o adjetivo pátrio de Aracaju?", I,
      "Aracajuense ou aracajuano.",
      ["Aracajês.", "Aracano.", "Aracajeiro."], "medium"),
    mc("p9u2-g13-a10", "Qual é o adjetivo pátrio de Palmas?", I,
      "Palmense.",
      ["Palmês.", "Palmeiro.", "Palmano."], "medium"),
  ]
);

// ---------------------------------------------------------------------------
// G14 — Adjetivos pátrios: formas irregulares e compostos
// ---------------------------------------------------------------------------
const g14: GrupoParcial = grupo(
  "Pátrios irregulares e compostos",
  "Associar adjetivos pátrios irregulares a seus lugares e decifrar adjetivos compostos.",
  "Capixaba, potiguar, carioca, fluminense: nem todo pátrio segue a regra. E “ítalo-brasileiro” mostra dois países de uma vez.",
  IMG_LIVRO,
  [
    mc("p9u2-g14-a1", "“Capixaba” se refere a qual lugar?", I,
      "Espírito Santo.",
      ["Rio de Janeiro.", "Bahia.", "Pará."]),
    mc("p9u2-g14-a2", "“Potiguar” se refere a qual lugar?", I,
      "Rio Grande do Norte.",
      ["Rio Grande do Sul.", "Paraíba.", "Pernambuco."]),
    mc("p9u2-g14-a3", "“Carioca” se refere a qual lugar?", I,
      "A cidade do Rio de Janeiro.",
      ["O estado do Rio de Janeiro.", "A cidade de São Paulo.", "O estado do Rio Grande do Sul."], "medium"),
    mc("p9u2-g14-a4", "“Fluminense” se refere a qual lugar?", I,
      "Ao estado do Rio de Janeiro.",
      ["À cidade do Rio de Janeiro.", "Ao estado de São Paulo.", "À cidade de Niterói apenas."], "medium"),
    mc("p9u2-g14-a5", "“Paulista” se refere a qual lugar?", I,
      "Ao estado de São Paulo.",
      ["À cidade de São Paulo.", "Ao estado do Rio de Janeiro.", "À cidade de Santos."], "medium"),
    mc("p9u2-g14-a6", "“Paulistano” se refere a qual lugar?", I,
      "À cidade de São Paulo.",
      ["Ao estado de São Paulo.", "À cidade do Rio de Janeiro.", "À cidade de Salvador."], "medium"),
    mc("p9u2-g14-a7", "“Soteropolitano” se refere a qual lugar?", I,
      "Salvador.",
      ["São Paulo.", "Sorocaba.", "Sobral."], "medium"),
    mc("p9u2-g14-a8", "Em “Círculo Ítalo-Brasileiro”, a que países o adjetivo composto se refere?", I,
      "Itália e Brasil.",
      ["Itália e Bolívia.", "Inglaterra e Brasil.", "Irlanda e Brasil."]),
    mc("p9u2-g14-a9", "Em “literatura hispano-lusitana”, a que países o adjetivo composto se refere?", I,
      "Espanha e Portugal.",
      ["Espanha e Brasil.", "Portugal e França.", "Hungria e Portugal."], "medium"),
    mc("p9u2-g14-a10", "Em “colégio teuto-brasileiro”, a que países o adjetivo composto se refere?", I,
      "Alemanha e Brasil.",
      ["Áustria e Brasil.", "Turquia e Brasil.", "França e Brasil."], "medium"),
    mc("p9u2-g14-a11", "Em “produto sino-coreano”, a que países o adjetivo composto se refere?", I,
      "China e Coreia.",
      ["Japão e Coreia.", "China e Japão.", "Índia e Coreia."], "medium"),
  ]
);

// ---------------------------------------------------------------------------
// G15 — Produção: poema (métrica, soneto, rimas)
// ---------------------------------------------------------------------------
const g15: GrupoParcial = grupo(
  "Poema: métrica, soneto e rimas",
  "Aprender a contar sílabas poéticas, a estrutura do soneto e as figuras de linguagem, usando os poemas de Drummond e Vinicius.",
  "Contar sílabas poéticas, ver como as rimas se organizam e achar metáforas e aliterações.",
  IMG_LETRAS,
  [
    read("p9u2-metrica-teoria", "Métrica, soneto e figuras: o conceito", [
      "Métrica é a medida do verso, feita contando as sílabas poéticas (até a última sílaba tônica do verso; vogais que se encontram podem se juntar). A redondilha maior tem 7 sílabas, muito usada em cantigas de roda e no repente. O decassílabo tem 10 sílabas e é mais solene.",
      "Soneto é um poema de 14 versos em quatro estrofes: dois quartetos (quatro versos cada) e dois tercetos (três versos cada). As rimas recebem letras: versos que rimam entre si recebem a mesma letra (ABAB = o 1º rima com o 3º e o 2º com o 4º; ABBA = o 1º com o 4º e o 2º com o 3º).",
      "Figuras de linguagem que vamos procurar: metáfora (comparação sem “como”: “o amor é uma chama”); antítese (palavras de sentido oposto: riso e choro); pleonasmo (repetição de ideia para dar ênfase: “viver a vida”); paradoxo (ideias contraditórias que fazem sentido juntas).",
    ]),
    leituraTempo("p9u2-tempo-g15", [
      "Palavras que terminam os versos da estrofe citada acima, na ordem: brotou, idade, escutou, eternidade. Verso para contar: “E nosso amor, que brotou” (7 sílabas poéticas).",
    ]),
    leituraSoneto("p9u2-soneto-g15", [
      "Palavras que terminam os versos do soneto, na ordem: atento, tanto, encanto, pensamento; momento, canto, pranto, contentamento; procure, vive, ama; tive, chama, dure. Os versos têm dez sílabas poéticas, e o poema tem 14 versos.",
    ]),
    ...txt("p9u2-tempo-g15",
      mc("p9u2-g15-a1", "Drummond usa a redondilha maior, comum em cantigas de roda, quadrinhas e repente. Quantas sílabas poéticas têm versos como “E nosso amor, que brotou”?", I,
        "Sete.",
        ["Cinco.", "Dez.", "Doze."]),
      mc("p9u2-g15-a2", "Como se organizam as rimas na estrofe de Drummond (brotou, idade, escutou, eternidade)?", I,
        "De modo alternado: ABAB.",
        ["Em pares: AABB.", "Não há rimas.", "Todas rimam com o mesmo som."], "medium"),
      mc("p9u2-g15-a3", "Que verso ou expressão do poema de Drummond usa metáfora?", I,
        "“no abismo do coração” ou “amar é o sumo da vida”.",
        ["“o tempo passa”.", "“cada vez mais”.", "“duas estrofes”."], "medium"),
    ),
    ...txt("p9u2-soneto-g15",
      mc("p9u2-g15-a4", "Qual é a métrica usada por Vinicius de Moraes no soneto?", I,
        "O decassílabo (versos de dez sílabas poéticas).",
        ["A redondilha maior.", "O verso de quatro sílabas.", "O verso livre."], "medium"),
      mc("p9u2-g15-a5", "Quantas estrofes tem o soneto e quantos versos tem cada uma?", I,
        "Quatro estrofes: duas de quatro versos e duas de três.",
        ["Três estrofes de quatro versos.", "Duas estrofes de seis versos.", "Uma estrofe de catorze versos."], "medium"),
      mc("p9u2-g15-a6", "Como se organizam as rimas no soneto de Vinicius, a partir das palavras finais dos versos?", I,
        "ABBA, ABBA, CDE, DEC.",
        ["AABB, CCDD, EEF, FFE.", "ABAB, CDCD, EFE, FEF.", "Sem rimas."], "hard"),
      mc("p9u2-g15-a7", "Qual par de palavras do soneto forma uma antítese (sentidos opostos)?", I,
        "“Riso” e “pranto” (ou “pesar” e “contentamento”).",
        ["“Amor” e “zelo”.", "“Canto” e “louvor”.", "“Morte” e “solidão”."], "medium"),
      mc("p9u2-g15-a8", "Qual expressão do soneto é um pleonasmo (repetição de ideia para dar ênfase)?", I,
        "“Rir meu riso”.",
        ["“Quem sabe a morte”.", "“Infinito enquanto dure”.", "“Maior encanto”."], "medium"),
    ),
  ]
);

// ---------------------------------------------------------------------------
// G16 — Quadro do gênero poema
// ---------------------------------------------------------------------------
const g16: GrupoParcial = grupo(
  "Quadro do gênero poema",
  "Resumir as características do poema: leitores, objetivo, circulação, estrutura, sonoridade e linguagem.",
  "Um resumo do gênero poema, com a aliteração e as ideias principais.",
  IMG_LIVRO,
  [
    read("p9u2-quadro-poema", "O gênero poema em resumo", [
      "O poema é um texto em versos (cada linha) agrupados em estrofes. Pode ser lido por pessoas de todas as idades e tem como objetivo emocionar, entreter e provocar reflexão. Circula principalmente em livros, mas também em jornais, revistas, sites e redes.",
      "Sua estrutura pode ser livre ou seguir regras, como a métrica (contagem de sílabas) e as rimas, como vimos no soneto de Vinicius e no poema de Drummond. A sonoridade e o ritmo nascem dessas escolhas e também de recursos como a aliteração (repetição de um som consonante: “O rato roeu a roupa do rei de Roma”, em que o /r/ se repete) e a assonância (repetição de um som vogal).",
      "A linguagem costuma ser cuidadosa e cheia de figuras, como metáforas e antíteses, mas pode ser simples e próxima da fala.",
    ]),
    ...txt("p9u2-quadro-poema",
    mc("p9u2-g16-a1", "A aliteração é a repetição de um mesmo som consonantal ou de sons próximos. Em “O rato roeu a roupa do rei de Roma”, qual som se repete?", I,
      "O som do /r/.",
      ["O som do /a/ no final das palavras.", "O som do /m/ no começo de todas as palavras.", "O som do /s/ em todos os versos."], "medium"),
    mc("p9u2-g16-a2", "Quem são os leitores do poema?", I,
      "Pessoas de todas as idades.",
      ["Só crianças.", "Só professores.", "Só poetas."]),
    mc("p9u2-g16-a3", "Qual é o objetivo de um poema?", I,
      "Entreter, emocionar e provocar reflexões.",
      ["Vender produtos.", "Dar ordens.", "Anunciar uma promoção."]),
    mc("p9u2-g16-a4", "Por onde circulam os poemas?", I,
      "Principalmente em livros, mas também em jornais, revistas e na internet.",
      ["Só em avisos de elevador.", "Só em placas de trânsito.", "Só em notas fiscais."]),
    mc("p9u2-g16-a5", "Como um poema costuma se estruturar?", I,
      "Em versos (linhas) e estrofes (conjuntos de versos), que podem ser livres ou seguir métrica e rimas.",
      ["Em parágrafos longos, sem versos.", "Em capítulos numerados.", "Em tópicos com números."], "medium"),
    mc("p9u2-g16-a6", "Como são construídos a sonoridade e o ritmo do poema?", I,
      "Pela métrica dos versos e das estrofes, com rimas, aliterações e assonâncias.",
      ["Pelo tamanho da letra.", "Pelo número de páginas.", "Pelo uso de ilustrações."], "medium"),
    ),
  ]
);

// ---------------------------------------------------------------------------
// G17 — Paródia: soneto da (in)felicidade
// ---------------------------------------------------------------------------
const parodia = read("p9u2-parodia", "Paródia do soneto (resumo)", [
  "O “Soneto da (in)felicidade”, de Antonio Sousa Brito, é uma paródia do “Soneto de fidelidade”, de Vinicius de Moraes. Em vez de falar do amor, o poema fala de um professor atento à aula, que tenta ensinar bem, mas teme que a aula não saia como planejada e pede ajuda ao giz, ao livro e até a um santo.",
  "O texto mantém palavras e a organização do original (duas estrofes de quatro versos e duas de três, com as mesmas rimas) e um ritmo parecido na leitura, mas os versos não têm sempre o mesmo número de sílabas. Troca o tema e usa um tom bem-humorado e uma linguagem simples. Tem poucas figuras de linguagem, como a metáfora em “me jogar na lama”. A felicidade ou infelicidade do título depende de a aula do professor dar certo ou não.",
], "Baseado em Antonio Sousa Brito, “Soneto da (in)felicidade”, blog Reticências poéticas, 17 maio 2010.");

const g17: GrupoParcial = grupo(
  "Paródia de poema: o soneto da (in)felicidade",
  "Reconhecer a intertextualidade e comparar um poema com sua paródia.",
  "Uma paródia imita um texto conhecido, mas muda o tema para criar humor, ironia ou crítica.",
  IMG_CRIANCAS,
  [
    read("p9u2-parodia-teoria", "Paródia: o conceito", [
      "Paródia é um texto que imita outro, já conhecido, mudando o tema ou o ponto de vista para criar humor, ironia ou crítica. Para a graça funcionar, o leitor precisa reconhecer o texto original: a paródia mantém palavras, estrutura ou ritmo dele. Esse diálogo entre textos se chama intertextualidade.",
    ]),
    leituraSoneto("p9u2-soneto-g17", [
      "Características do soneto de Vinicius, para comparação: versos decassílabos; duas estrofes de quatro versos e duas de três, com rimas ABBA, ABBA, CDE, DEC; linguagem elevada e complexa; várias figuras, como antíteses, paradoxo, pleonasmo e metáfora.",
    ]),
    parodia,
    ...txt("p9u2-parodia",
      mc("p9u2-g17-a1", "As rimas do poema original e da paródia se assemelham ou se diferenciam?", I,
        "Assemelham-se.",
        ["Diferenciam-se totalmente.", "A paródia não tem rimas.", "O original não tem rimas."]),
      mc("p9u2-g17-a2", "E quanto à métrica?", I,
        "Diferenciam-se: no original os versos são decassílabos; na paródia a métrica é variável.",
        ["São idênticas.", "Os dois são em verso livre.", "Os dois usam redondilha maior."], "medium"),
      mc("p9u2-g17-a3", "E quanto ao ritmo?", I,
        "Assemelham-se.",
        ["Diferenciam-se totalmente.", "A paródia não tem ritmo.", "O original não tem ritmo."], "medium"),
      mc("p9u2-g17-a4", "E quanto ao tipo de composição?", I,
        "Assemelham-se: os dois são sonetos (duas quadras e dois tercetos).",
        ["Diferenciam-se: um é soneto e o outro é haicai.", "Diferenciam-se: um é conto e o outro é poema.", "Os dois são cantigas de roda."], "medium"),
      mc("p9u2-g17-a5", "E quanto à linguagem e à seleção vocabular?", I,
        "Diferenciam-se: o original tem linguagem mais elevada e complexa; a paródia é mais simples.",
        ["São exatamente iguais.", "A paródia é mais formal.", "Os dois usam gírias de internet."], "medium"),
      mc("p9u2-g17-a6", "E quanto ao uso de antíteses, metáforas e paradoxos?", I,
        "Diferenciam-se: o original tem várias, a paródia tem poucas (metáfora em “me jogar na lama”).",
        ["São iguais.", "A paródia tem mais figuras que o original.", "Nenhum dos dois tem figuras de linguagem."], "hard"),
      mc("p9u2-g17-a7", "Qual é o tema central da paródia?", I,
        "O magistério e a dedicação de um professor ao seu trabalho.",
        ["O amor romântico.", "O futebol.", "A saudade da infância."]),
      mc("p9u2-g17-a8", "Do que depende a felicidade ou infelicidade no título “Soneto da (in)felicidade”?", I,
        "Do sucesso do professor.",
        ["Do clima do dia.", "Da quantidade de provas.", "Da cor do giz."], "medium"),
    ),
  ]
);

// ---------------------------------------------------------------------------
// G18 — Quadro da paródia
// ---------------------------------------------------------------------------
const g18: GrupoParcial = grupo(
  "Quadro do gênero paródia de poema",
  "Resumir as características da paródia e conhecer exemplos famosos, como as paródias da “Canção do exílio”.",
  "A paródia quase sempre tem humor. A “Canção do exílio”, de Gonçalves Dias, inspirou várias.",
  IMG_FLORESTA,
  [
    read("p9u2-quadro-parodia", "A paródia de poema em resumo", [
      "A paródia de poema é lida por pessoas de todas as idades que gostam de poesia e circula em livros, jornais, revistas e na internet. Seu objetivo é entreter, criando humor, ironia ou sátira a partir de um poema conhecido.",
      "Para isso, usa palavras, versos inteiros, rimas, ritmo e figuras que lembram o original, mas muda algo e surpreende o leitor (quebra de expectativa). A linguagem não tem regra: pode manter o registro do original, formal ou informal, ou ser irreverente.",
      "Um exemplo famoso: Gonçalves Dias escreveu, na “Canção do exílio”, “Minha terra tem palmeiras, / Onde canta o sabiá”. Esse início foi retomado e transformado por muitos poetas, entre eles Cacaso, em “Jogos florais”, que usa a mesma ideia para dar um tom irônico e bem-humorado.",
    ], "Baseado em Gonçalves Dias, “Canção do exílio” (1843), e Cacaso, “Jogos florais”."),
    ...txt("p9u2-quadro-parodia",
    mc("p9u2-g18-a1", "Quem são os leitores de uma paródia de poema?", I,
      "Pessoas de todas as idades que se interessam por poesia.",
      ["Só pessoas que nunca leram poemas.", "Só juízes.", "Só atletas."]),
    mc("p9u2-g18-a2", "Qual é o objetivo desses textos?", I,
      "Entreter e criar humor a partir de poemas conhecidos, ironizando ou satirizando o texto original.",
      ["Substituir o poema original.", "Ensinar a dirigir.", "Vender seguros."], "medium"),
    mc("p9u2-g18-a3", "Por onde circulam?", I,
      "Em publicações impressas e digitais: jornais, livros, revistas e internet.",
      ["Só em bulas de remédio.", "Só em contratos.", "Só em placas de ônibus."]),
    mc("p9u2-g18-a4", "Que recursos de construção as paródias usam?", I,
      "Palavras, trechos de versos ou versos inteiros, rimas, ritmo e figuras de linguagem que remetem ao texto original.",
      ["Nada que lembre o original.", "Apenas números.", "Somente imagens."], "medium"),
    mc("p9u2-g18-a5", "Como se constrói o humor, a ironia ou a sátira?", I,
      "Pela quebra de expectativa: as mudanças feitas no texto conhecido surpreendem o leitor.",
      ["Pela cópia exata do original.", "Pela supressão de todas as palavras.", "Pelo uso de números."], "medium"),
    mc("p9u2-g18-a6", "Como é a linguagem de uma paródia?", I,
      "Não há regra: pode manter o registro do original, formal ou informal, ou ser irreverente.",
      ["Sempre muito formal.", "Sempre em outra língua.", "Sempre em forma de siglas."], "medium"),
    mc("p9u2-g18-a7", "Na versão “Jogos florais”, de Cacaso, qual poema de Gonçalves Dias é retomado e transformado?", I,
      "“Canção do exílio”.",
      ["“Soneto de fidelidade”.", "“O tempo passa? Não passa”.", "“Quadrilha”."], "medium"),
    ),
  ]
);

// ---------------------------------------------------------------------------
// G19 — Capítulo 2: Felicidade clandestina
// ---------------------------------------------------------------------------
const felicidade = read("p9u2-felicidade", "Felicidade clandestina (resumo)", [
  "Conto de Clarice Lispector, em resumo. A narradora, quando criança, vivia no Recife e adorava ler. Uma colega de classe, filha do dono de uma livraria, era sardenta, de cabelos muito crespos e arruivados, e tinha o corpo bem diferente do das meninas esbeltas da turma. Ela chupava balas com barulho e dava, de aniversário, cartões-postais da loja do pai, em vez de livros. A narradora diz que ela tinha “talento para a crueldade” e só emprestava livros a quem implorasse; vê nela um desejo de vingança contra as meninas bonitas, esguias e de cabelos livres.",
  "Um dia, a menina anunciou, “como casualmente”, que tinha o livro “As reinações de Narizinho”, de Monteiro Lobato, e que o emprestaria. A narradora passou a noite sonhando. No dia seguinte, a menina disse que tinha emprestado o livro a outra pessoa; mandou voltar no outro dia, e assim fez durante muito tempo, até a narradora ficar com olheiras.",
  "Até que a mãe da menina apareceu, estranhou a cena diária e descobriu que o livro nunca tinha saído de casa. Horrorizada, mandou a filha emprestá-lo na hora e disse à narradora: “Você fica com o livro pelo tempo que quiser”. A narradora voltou para casa andando devagar, apertando o livro no peito. Em casa, demorou a ler: fingia que não o tinha, abria e fechava, comia pão com manteiga, só para prolongar a felicidade, que sempre seria “clandestina”. Sentada na rede, com o livro aberto no colo, sem nem tocá-lo, sentia um êxtase: não era mais uma menina com um livro, mas uma mulher com seu amante.",
], "Baseado em Clarice Lispector, “Felicidade clandestina”, Felicidade clandestina (Rocco, 1971).");

const g19: GrupoParcial = grupo(
  "Felicidade clandestina: o amor pelos livros",
  "Ler e interpretar o conto de Clarice Lispector: personagens, descrições e a crueldade da filha do dono da livraria.",
  "Um conto sobre uma menina apaixonada por livros e sobre a espera por um empréstimo que nunca chegava.",
  IMG_LIVRO,
  [
    felicidade,
    ...txt("p9u2-felicidade",
      mc("p9u2-g19-a1", "Quem são as personagens principais da história?", I,
        "A narradora e a menina filha do dono de livraria, na época em que ambas eram crianças.",
        ["A mãe da menina e o pai da narradora.", "A narradora e o autor Monteiro Lobato.", "Duas professoras do Recife."]),
      mc("p9u2-g19-a2", "Como a narradora descreve as personagens e a si mesma: de modo superficial ou minucioso?", I,
        "De modo minucioso, aprofundado.",
        ["De modo superficial.", "Sem descrever nada.", "Só descreve a mãe."]),
      mc("p9u2-g19-a3", "Que aspectos são descritos com mais ênfase no começo do conto?", I,
        "Aspectos físicos e psicológicos: a filha do dono da livraria é sardenta, de cabelos crespos e arruivados e cruel, enquanto as outras meninas são bonitas e esguias.",
        ["Apenas a roupa das meninas.", "Apenas a cidade do Recife.", "Apenas os livros da loja."], "medium"),
      mc("p9u2-g19-a4", "Embora a filha do dono de livraria não despertasse simpatia, algo a fazia parecer superior. O que era?", I,
        "O fato de o pai ser dono de livraria, o que dava acesso aos livros tão desejados.",
        ["O fato de ela ser a mais bonita da turma.", "O fato de ser a melhor aluna.", "O fato de ser a mais velha."], "medium"),
      mc("p9u2-g19-a5", "Por que, para a narradora, a outra menina tinha “talento para a crueldade”?", I,
        "Porque parecia ter prazer em exercer seu poder e humilhar as demais, só emprestando livros a quem implorasse.",
        ["Porque era muito inteligente.", "Porque lia todos os livros.", "Porque ajudava os pobres."], "medium"),
      mc("p9u2-g19-a6", "Como a narradora interpretava as atitudes da filha do dono de livraria?", I,
        "Com um desejo de vingança, por inveja das meninas bonitinhas, esguias e de cabelos livres.",
        ["Como uma demonstração de amizade.", "Como uma brincadeira inocente.", "Como pura distração."], "hard"),
      mc("p9u2-g19-a7", "A expressão “como casualmente” dá a entender que a iniciativa da filha do dono de livraria foi casual ou planejada?", I,
        "Planejada, embora ela quisesse dar a impressão de que era casual.",
        ["Totalmente casual.", "Imposta pela mãe.", "Pedida pela narradora."], "medium"),
      mc("p9u2-g19-a8", "Por que a menina teria escolhido “As reinações de Narizinho” para prolongar a espera da narradora?", I,
        "Porque já sabia da paixão da narradora por livros e do poder que tinha por ser filha do dono de livraria.",
        ["Porque era o único livro que tinha.", "Porque a narradora já o tinha lido.", "Porque a mãe pediu."], "hard"),
    ),
  ]
);

export const unidade2bGrupos: GrupoParcial[] = [g12, g13, g14, g15, g16, g17, g18, g19];
