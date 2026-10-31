-- Papel "educador": pode editar o conteúdo da plataforma (cursos, grupos e atividades).
-- Fica em arquivo separado porque um novo valor de enum não pode ser usado na mesma transação.
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'educador';
