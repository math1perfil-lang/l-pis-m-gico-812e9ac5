export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  ageMin: number;
  ageMax: number;
  duration: string;
  coinsReward: number;
  totalLessons: number;
  category: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  videoUrl: string;
  thumbnail: string;
  duration: string;
  coinsReward: number;
  description: string;
}

export const courses: Course[] = [
  // 6-8 anos - Básico
  {
    id: "alfabetizacao-divertida",
    title: "Português Divertido",
    description: "Contos, fábulas, quadrinhos, letras, sons e palavras: aprenda português brincando!",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    ageMin: 6,
    ageMax: 8,
    duration: "9h",
    coinsReward: 3260,
    totalLessons: 47,
    category: "Linguagem",
    lessons: []
  },
  {
    id: "numeros-brincadeira",
    title: "Números em Brincadeira",
    description: "Conte, some e subtraia enquanto se diverte com jogos matemáticos!",
    image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800",
    ageMin: 6,
    ageMax: 8,
    duration: "2h",
    coinsReward: 450,
    totalLessons: 8,
    category: "Matemática",
    lessons: []
  },
  {
    id: "natureza-amiga",
    title: "Natureza Nossa Amiga",
    description: "Explore animais, plantas e o meio ambiente de forma divertida!",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
    ageMin: 6,
    ageMax: 8,
    duration: "1h 45min",
    coinsReward: 400,
    totalLessons: 7,
    category: "Ciências",
    lessons: []
  },

  // 9-11 anos - Intermediário
  {
    id: "portugues-aventura",
    title: "Português: Uma Aventura",
    description: "Domine gramática, interpretação de texto e redação com histórias incríveis!",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800",
    ageMin: 9,
    ageMax: 11,
    duration: "4h",
    coinsReward: 800,
    totalLessons: 15,
    category: "Linguagem",
    lessons: []
  },
  {
    id: "matematica-desafios",
    title: "Matemática: Desafios",
    description: "Multiplicação, divisão, frações e problemas que desafiam o raciocínio!",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
    ageMin: 9,
    ageMax: 11,
    duration: "5h",
    coinsReward: 1000,
    totalLessons: 20,
    category: "Matemática",
    lessons: []
  },
  {
    id: "ciencias-experimentos",
    title: "Ciências: Experimentos",
    description: "Física, química e biologia através de experimentos práticos e seguros!",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800",
    ageMin: 9,
    ageMax: 11,
    duration: "3h 30min",
    coinsReward: 700,
    totalLessons: 12,
    category: "Ciências",
    lessons: []
  },
  {
    id: "educacao-financeira-kids",
    title: "Meu Primeiro Cofrinho",
    description: "Aprenda a poupar, o valor do dinheiro e como fazer escolhas inteligentes!",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800",
    ageMin: 9,
    ageMax: 11,
    duration: "2h",
    coinsReward: 600,
    totalLessons: 8,
    category: "Finanças",
    lessons: []
  },

  // 12-15 anos - Avançado
  {
    id: "redacao-nota-mil",
    title: "Redação Nota Mil",
    description: "Técnicas de escrita, argumentação e estrutura textual para o sucesso!",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800",
    ageMin: 12,
    ageMax: 15,
    duration: "6h",
    coinsReward: 1200,
    totalLessons: 18,
    category: "Linguagem",
    lessons: []
  },
  {
    id: "algebra-geometria",
    title: "Álgebra & Geometria",
    description: "Equações, funções, geometria plana e espacial de forma descomplicada!",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800",
    ageMin: 12,
    ageMax: 15,
    duration: "8h",
    coinsReward: 1500,
    totalLessons: 25,
    category: "Matemática",
    lessons: []
  },
  {
    id: "programacao-iniciantes",
    title: "Programação para Jovens",
    description: "Lógica de programação, algoritmos e criação de jogos simples!",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
    ageMin: 12,
    ageMax: 15,
    duration: "10h",
    coinsReward: 2000,
    totalLessons: 30,
    category: "Tecnologia",
    lessons: []
  },
  {
    id: "educacao-financeira-teens",
    title: "Finanças para o Futuro",
    description: "Investimentos, empreendedorismo e planejamento financeiro para adolescentes!",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
    ageMin: 12,
    ageMax: 15,
    duration: "5h",
    coinsReward: 1000,
    totalLessons: 15,
    category: "Finanças",
    lessons: []
  },
  {
    id: "historia-brasil-mundo",
    title: "História: Brasil & Mundo",
    description: "Das civilizações antigas ao Brasil contemporâneo, uma viagem no tempo!",
    image: "https://images.unsplash.com/photo-1461360370896-922624d12a74?w=800",
    ageMin: 12,
    ageMax: 15,
    duration: "7h",
    coinsReward: 1400,
    totalLessons: 22,
    category: "História",
    lessons: []
  },
  {
    id: "ingles-fluente",
    title: "Inglês Fluente",
    description: "Gramática, conversação e compreensão para dominar o idioma global!",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800",
    ageMin: 12,
    ageMax: 15,
    duration: "12h",
    coinsReward: 2500,
    totalLessons: 40,
    category: "Idiomas",
    lessons: []
  },
];

export const getCoursesForAge = (age: number): Course[] => {
  return courses.filter(course => age >= course.ageMin && age <= course.ageMax);
};

export const getCourseById = (id: string): Course | undefined => {
  return courses.find(course => course.id === id);
};
