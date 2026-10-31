import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { contentDb } from "@/hooks/useContent";

// Diz se a pessoa logada pode editar conteúdo (papel admin ou educador).
export const useContentEditor = () => {
  const { user, loading: authLoading } = useAuth();
  const [allowed, setAllowed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;
    if (authLoading) return;
    if (!user) {
      setAllowed(false);
      setChecking(false);
      return;
    }
    setChecking(true);
    contentDb
      .rpc("is_content_editor", { _user_id: user.id })
      .then(({ data, error }: { data: boolean | null; error: unknown }) => {
        if (!active) return;
        setAllowed(!error && data === true);
        setChecking(false);
      });
    return () => {
      active = false;
    };
  }, [user, authLoading]);

  return { user, allowed, loading: authLoading || checking };
};
