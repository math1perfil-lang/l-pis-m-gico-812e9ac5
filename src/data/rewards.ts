export interface Reward {
  id: string;
  title: string;
  description: string;
  coinsRequired: number;
  category: "supermercado" | "educacao" | "equipamento" | "livros" | "escola";
  partnerName: string;
  image?: string;
}

export const rewards: Reward[] = [
  // Supermercado
  {
    id: "cesta-basica-50",
    title: "Vale Cesta Básica R$50",
    description: "Vale compras em alimentos essenciais para sua família",
    coinsRequired: 500,
    category: "supermercado",
    partnerName: "Supermercado Futuro",
  },
  {
    id: "cesta-basica-100",
    title: "Vale Cesta Básica R$100",
    description: "Vale compras completo para o mês",
    coinsRequired: 1000,
    category: "supermercado",
    partnerName: "Supermercado Futuro",
  },
  {
    id: "vale-mercearia",
    title: "Vale Mercearia R$30",
    description: "Itens de mercearia e higiene pessoal",
    coinsRequired: 300,
    category: "supermercado",
    partnerName: "Supermercado Futuro",
  },

  // Educação/Escola
  {
    id: "desconto-escola-10",
    title: "10% Desconto Mensalidade",
    description: "Desconto na mensalidade escolar por 1 mês",
    coinsRequired: 2000,
    category: "escola",
    partnerName: "Escola Nova Era",
  },
  {
    id: "desconto-escola-20",
    title: "20% Desconto Mensalidade",
    description: "Desconto especial na mensalidade escolar por 1 mês",
    coinsRequired: 4000,
    category: "escola",
    partnerName: "Escola Nova Era",
  },
  {
    id: "bolsa-integral",
    title: "Bolsa de Estudos Integral",
    description: "Bolsa completa para 1 mês de estudos",
    coinsRequired: 10000,
    category: "escola",
    partnerName: "Escola Nova Era",
  },

  // Equipamentos
  {
    id: "tablet-educacional",
    title: "Tablet Educacional",
    description: "Tablet com apps educativos pré-instalados",
    coinsRequired: 8000,
    category: "equipamento",
    partnerName: "Tech4Kids",
  },
  {
    id: "notebook-estudante",
    title: "Notebook Estudante",
    description: "Notebook para estudos e atividades escolares",
    coinsRequired: 15000,
    category: "equipamento",
    partnerName: "Tech4Kids",
  },
  {
    id: "kit-material",
    title: "Kit Material Escolar",
    description: "Mochila, cadernos, lápis e todo material necessário",
    coinsRequired: 1500,
    category: "equipamento",
    partnerName: "Tech4Kids",
  },

  // Livros
  {
    id: "livro-escolha",
    title: "Livro à Escolha",
    description: "Escolha qualquer livro até R$50",
    coinsRequired: 400,
    category: "livros",
    partnerName: "Livros & Sonhos",
  },
  {
    id: "colecao-classicos",
    title: "Coleção Clássicos",
    description: "Kit com 5 livros clássicos da literatura",
    coinsRequired: 1200,
    category: "livros",
    partnerName: "Livros & Sonhos",
  },
  {
    id: "assinatura-ebooks",
    title: "Assinatura E-books 3 meses",
    description: "Acesso ilimitado a milhares de e-books educativos",
    coinsRequired: 800,
    category: "livros",
    partnerName: "Livros & Sonhos",
  },

  // Educação extra
  {
    id: "curso-extra-mes",
    title: "Curso Extra - 1 Mês",
    description: "Acesso a curso de reforço escolar por 1 mês",
    coinsRequired: 600,
    category: "educacao",
    partnerName: "Banco Crescer",
  },
  {
    id: "aula-particular",
    title: "Aula Particular (2h)",
    description: "Aula individual com professor especializado",
    coinsRequired: 400,
    category: "educacao",
    partnerName: "Banco Crescer",
  },
];
