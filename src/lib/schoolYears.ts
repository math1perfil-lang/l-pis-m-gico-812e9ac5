// Anos escolares usados para organizar os cursos no painel de educação.
export const SCHOOL_YEARS = [
  "1º ano",
  "2º ano",
  "3º ano",
  "4º ano",
  "5º ano",
  "6º ano",
  "7º ano",
  "8º ano",
  "9º ano",
  "Ensino Médio",
] as const;

export type SchoolYear = (typeof SCHOOL_YEARS)[number];

// Ano sugerido a partir da idade mínima do curso (6 anos = 1º ano, 14 anos = 9º ano).
export const defaultSchoolYear = (ageMin: number): SchoolYear => {
  const n = Math.min(Math.max(ageMin - 5, 1), 10);
  return SCHOOL_YEARS[n - 1];
};
