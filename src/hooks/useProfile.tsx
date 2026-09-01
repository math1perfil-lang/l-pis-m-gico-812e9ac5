import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface Profile {
  name: string;
  age: number | null;
  avatar: string;
}

const avatarFor = (seed: string) =>
  `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(seed)}`;

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile>({
    name: "Aluno",
    age: null,
    avatar: avatarFor("pandoorga"),
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from("profiles")
        .select("display_name, age, avatar_url")
        .eq("id", user.id)
        .maybeSingle();
      if (!active) return;
      const name = data?.display_name || user.email?.split("@")[0] || "Aluno";
      setProfile({
        name,
        age: data?.age ?? null,
        avatar: data?.avatar_url || avatarFor(name),
      });
      setLoading(false);
    };
    load();
    return () => {
      active = false;
    };
  }, [user]);

  const updateProfile = async (values: Partial<{ display_name: string; age: number; avatar_url: string }>) => {
    if (!user) return;
    await supabase.from("profiles").update(values).eq("id", user.id);
    setProfile((p) => ({
      name: values.display_name ?? p.name,
      age: values.age ?? p.age,
      avatar: values.avatar_url ?? p.avatar,
    }));
  };

  return { profile, loading, updateProfile };
};
