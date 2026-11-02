-- Acesso de docentes: a gestão cadastra a pessoa (e-mail + matérias) e o acesso é liberado
-- automaticamente no primeiro cadastro/entrada com esse e-mail. Docentes só editam as matérias atribuídas.

CREATE TABLE IF NOT EXISTS public.teachers (
  email text PRIMARY KEY,                       -- sempre em minúsculas
  display_name text NOT NULL DEFAULT '',
  course_ids text[] NOT NULL DEFAULT '{}',      -- matérias (cursos) liberadas
  active boolean NOT NULL DEFAULT true,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_teachers_user ON public.teachers(user_id) WHERE user_id IS NOT NULL;

DROP TRIGGER IF EXISTS trg_teachers_updated ON public.teachers;
CREATE TRIGGER trg_teachers_updated BEFORE UPDATE ON public.teachers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

GRANT SELECT ON public.teachers TO authenticated;
GRANT ALL ON public.teachers TO service_role;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Gestão vê docentes" ON public.teachers;
CREATE POLICY "Gestão vê docentes" ON public.teachers FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));
DROP POLICY IF EXISTS "Docente vê o próprio cadastro" ON public.teachers;
CREATE POLICY "Docente vê o próprio cadastro" ON public.teachers FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Pode editar o conteúdo deste curso? Gestão: todos. Docente: só os atribuídos.
CREATE OR REPLACE FUNCTION public.can_edit_course(_user_id uuid, _course_id text)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_role(_user_id, 'admin'::public.app_role)
    OR EXISTS (
      SELECT 1 FROM public.teachers t
      WHERE t.user_id = _user_id AND t.active AND _course_id = ANY (t.course_ids)
        AND public.has_role(_user_id, 'educador'::public.app_role)
    )
$$;
GRANT EXECUTE ON FUNCTION public.can_edit_course(uuid, text) TO authenticated;

-- Cursos: só a gestão cria, edita e exclui matérias.
DROP POLICY IF EXISTS "Editores gerenciam cursos" ON public.content_courses;
CREATE POLICY "Gestão gerencia cursos" ON public.content_courses FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Grupos e atividades: gestão em tudo; docentes só nas matérias atribuídas.
DROP POLICY IF EXISTS "Editores gerenciam grupos" ON public.content_groups;
CREATE POLICY "Editores gerenciam grupos" ON public.content_groups FOR ALL TO authenticated
  USING (public.can_edit_course(auth.uid(), course_id))
  WITH CHECK (public.can_edit_course(auth.uid(), course_id));

DROP POLICY IF EXISTS "Editores gerenciam atividades" ON public.content_activities;
CREATE POLICY "Editores gerenciam atividades" ON public.content_activities FOR ALL TO authenticated
  USING (public.can_edit_course(auth.uid(), course_id))
  WITH CHECK (public.can_edit_course(auth.uid(), course_id));

-- Cadastra ou atualiza um docente. Só a gestão chama. Se a pessoa já tem conta, libera na hora.
CREATE OR REPLACE FUNCTION public.save_teacher(_email text, _name text, _course_ids text[], _active boolean DEFAULT true)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _mail text := lower(trim(_email)); _uid uuid;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN
    RAISE EXCEPTION 'Apenas a gestão pode cadastrar docentes';
  END IF;
  IF _mail IS NULL OR _mail = '' OR position('@' IN _mail) = 0 THEN
    RAISE EXCEPTION 'E-mail inválido';
  END IF;
  SELECT id INTO _uid FROM auth.users WHERE lower(email) = _mail;
  INSERT INTO public.teachers (email, display_name, course_ids, active, user_id, created_by)
  VALUES (_mail, coalesce(trim(_name), ''), coalesce(_course_ids, '{}'), coalesce(_active, true), _uid, auth.uid())
  ON CONFLICT (email) DO UPDATE
    SET display_name = EXCLUDED.display_name, course_ids = EXCLUDED.course_ids,
        active = EXCLUDED.active, user_id = coalesce(public.teachers.user_id, EXCLUDED.user_id);
  SELECT user_id INTO _uid FROM public.teachers WHERE email = _mail;
  IF _uid IS NOT NULL THEN
    IF coalesce(_active, true) THEN
      INSERT INTO public.user_roles (user_id, role) VALUES (_uid, 'educador'::public.app_role) ON CONFLICT (user_id, role) DO NOTHING;
    ELSE
      DELETE FROM public.user_roles WHERE user_id = _uid AND role = 'educador'::public.app_role;
    END IF;
  END IF;
END; $$;
REVOKE ALL ON FUNCTION public.save_teacher(text, text, text[], boolean) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.save_teacher(text, text, text[], boolean) TO authenticated;

-- Remove o cadastro e o acesso de docente (a conta da pessoa continua existindo).
CREATE OR REPLACE FUNCTION public.remove_teacher(_email text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _mail text := lower(trim(_email)); _uid uuid;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN
    RAISE EXCEPTION 'Apenas a gestão pode remover docentes';
  END IF;
  SELECT user_id INTO _uid FROM public.teachers WHERE email = _mail;
  DELETE FROM public.teachers WHERE email = _mail;
  IF _uid IS NOT NULL THEN
    DELETE FROM public.user_roles WHERE user_id = _uid AND role = 'educador'::public.app_role;
  END IF;
END; $$;
REVOKE ALL ON FUNCTION public.remove_teacher(text) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.remove_teacher(text) TO authenticated;

-- A tela "Primeiro acesso" confere se o e-mail foi liberado (devolve só verdadeiro/falso).
CREATE OR REPLACE FUNCTION public.teacher_invited(_email text)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.teachers WHERE email = lower(trim(_email)) AND active)
$$;
GRANT EXECUTE ON FUNCTION public.teacher_invited(text) TO anon, authenticated;

-- Quando alguém cria conta com um e-mail cadastrado como docente, o acesso é liberado.
CREATE OR REPLACE FUNCTION public.link_teacher_on_signup()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE public.teachers SET user_id = NEW.id
  WHERE email = lower(NEW.email) AND user_id IS NULL AND active;
  IF FOUND THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'educador'::public.app_role) ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END; $$;
REVOKE ALL ON FUNCTION public.link_teacher_on_signup() FROM public, anon, authenticated;
DROP TRIGGER IF EXISTS on_auth_user_link_teacher ON auth.users;
CREATE TRIGGER on_auth_user_link_teacher AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.link_teacher_on_signup();
