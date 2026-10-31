-- Gestão de conteúdo: edições feitas no painel de educação ficam aqui e são
-- aplicadas por cima do conteúdo que já existe no código do app.

CREATE OR REPLACE FUNCTION public.is_content_editor(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('admin'::public.app_role, 'educador'::public.app_role)
  )
$$;

-- CURSOS (novos ou edições de cursos existentes)
CREATE TABLE public.content_courses (
  id text PRIMARY KEY,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  school_year text,
  position numeric,
  is_custom boolean NOT NULL DEFAULT false,
  deleted boolean NOT NULL DEFAULT false,
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- GRUPOS (módulos de um curso)
CREATE TABLE public.content_groups (
  id text PRIMARY KEY,
  course_id text NOT NULL,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  position numeric,
  is_custom boolean NOT NULL DEFAULT false,
  deleted boolean NOT NULL DEFAULT false,
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_content_groups_course ON public.content_groups(course_id);

-- ATIVIDADES
CREATE TABLE public.content_activities (
  id text PRIMARY KEY,
  group_id text NOT NULL,
  course_id text NOT NULL,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  position numeric,
  is_custom boolean NOT NULL DEFAULT false,
  deleted boolean NOT NULL DEFAULT false,
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_content_activities_group ON public.content_activities(group_id);
CREATE INDEX idx_content_activities_course ON public.content_activities(course_id);

CREATE TRIGGER trg_content_courses_updated BEFORE UPDATE ON public.content_courses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_content_groups_updated BEFORE UPDATE ON public.content_groups FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_content_activities_updated BEFORE UPDATE ON public.content_activities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Permissões: todos leem (o app aplica o conteúdo); só admin e educador escrevem.
GRANT SELECT ON public.content_courses, public.content_groups, public.content_activities TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.content_courses, public.content_groups, public.content_activities TO authenticated;
GRANT ALL ON public.content_courses, public.content_groups, public.content_activities TO service_role;

ALTER TABLE public.content_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Todos leem cursos" ON public.content_courses FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Editores gerenciam cursos" ON public.content_courses FOR ALL TO authenticated
  USING (public.is_content_editor(auth.uid())) WITH CHECK (public.is_content_editor(auth.uid()));

CREATE POLICY "Todos leem grupos" ON public.content_groups FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Editores gerenciam grupos" ON public.content_groups FOR ALL TO authenticated
  USING (public.is_content_editor(auth.uid())) WITH CHECK (public.is_content_editor(auth.uid()));

CREATE POLICY "Todos leem atividades" ON public.content_activities FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Editores gerenciam atividades" ON public.content_activities FOR ALL TO authenticated
  USING (public.is_content_editor(auth.uid())) WITH CHECK (public.is_content_editor(auth.uid()));

-- Educadores também precisam ver os próprios papéis (já coberto por "Users can view own roles").

-- Concede o papel educador a um e-mail. Só admin pode chamar.
CREATE OR REPLACE FUNCTION public.grant_educator(_email text)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _uid uuid;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN
    RAISE EXCEPTION 'Apenas administradores podem conceder o papel educador';
  END IF;
  SELECT id INTO _uid FROM auth.users WHERE lower(email) = lower(_email);
  IF _uid IS NULL THEN RETURN false; END IF;
  INSERT INTO public.user_roles (user_id, role) VALUES (_uid, 'educador'::public.app_role)
  ON CONFLICT (user_id, role) DO NOTHING;
  RETURN true;
END; $$;
REVOKE ALL ON FUNCTION public.grant_educator(text) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.grant_educator(text) TO authenticated;

-- Imagens das atividades
INSERT INTO storage.buckets (id, name, public) VALUES ('content-images', 'content-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Imagens de conteúdo são públicas" ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'content-images');
CREATE POLICY "Editores enviam imagens" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'content-images' AND public.is_content_editor(auth.uid()));
CREATE POLICY "Editores atualizam imagens" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'content-images' AND public.is_content_editor(auth.uid()));
CREATE POLICY "Editores removem imagens" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'content-images' AND public.is_content_editor(auth.uid()));
