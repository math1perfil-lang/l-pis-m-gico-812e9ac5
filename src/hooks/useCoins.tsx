import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useRef,
} from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface UserStats {
  coins: number;
  xp: number;
  level: number;
  streakDays: number;
}

const ZERO_STATS: UserStats = { coins: 0, xp: 0, level: 1, streakDays: 0 };

export const XP_PER_LEVEL = 600;
export const levelFromXp = (xp: number) => Math.floor(xp / XP_PER_LEVEL) + 1;
export const xpInCurrentLevel = (xp: number) => xp % XP_PER_LEVEL;

interface CoinsContextValue extends UserStats {
  balance: number;
  loading: boolean;
  xpToNextLevel: number;
  xpCurrent: number;
  addCoins: (amount: number, description?: string, referenceId?: string) => void;
  spendCoins: (amount: number, description?: string, referenceId?: string) => boolean;
  addXp: (amount: number) => void;
  refresh: () => Promise<void>;
}

const CoinsContext = createContext<CoinsContextValue | undefined>(undefined);

export const CoinsProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<UserStats>(ZERO_STATS);
  const [loading, setLoading] = useState(true);
  const statsRef = useRef<UserStats>(ZERO_STATS);
  statsRef.current = stats;

  const load = useCallback(async () => {
    if (!user) {
      setStats(ZERO_STATS);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data } = await supabase
      .from("user_stats")
      .select("coins, xp, level, streak_days")
      .eq("user_id", user.id)
      .maybeSingle();

    if (data) {
      setStats({
        coins: data.coins ?? 0,
        xp: data.xp ?? 0,
        level: data.level ?? 1,
        streakDays: data.streak_days ?? 0,
      });
    } else {
      // Nova conta: cria a linha zerada
      await supabase.from("user_stats").insert({ user_id: user.id });
      setStats(ZERO_STATS);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (authLoading) return;
    load();
  }, [authLoading, load]);

  const persist = useCallback(
    async (next: UserStats) => {
      if (!user) return;
      await supabase
        .from("user_stats")
        .upsert(
          {
            user_id: user.id,
            coins: next.coins,
            xp: next.xp,
            level: next.level,
            streak_days: next.streakDays,
            last_activity_date: new Date().toISOString().slice(0, 10),
          },
          { onConflict: "user_id" }
        );
    },
    [user]
  );

  const logTransaction = useCallback(
    async (amount: number, kind: string, description?: string, referenceId?: string) => {
      if (!user) return;
      await supabase.from("coin_transactions").insert({
        user_id: user.id,
        amount,
        kind,
        description: description ?? null,
        reference_id: referenceId ?? null,
      });
    },
    [user]
  );

  const addCoins = useCallback(
    (amount: number, description?: string, referenceId?: string) => {
      if (amount <= 0) return;
      const next = { ...statsRef.current, coins: statsRef.current.coins + amount };
      // Atualiza já a referência: chamadas seguidas (ex.: addCoins + addXp) partem do saldo novo,
      // e não do antigo, que apagava as moedas recém-ganhas.
      statsRef.current = next;
      setStats(next);
      persist(next);
      logTransaction(amount, "earn", description, referenceId);
    },
    [persist, logTransaction]
  );

  const spendCoins = useCallback(
    (amount: number, description?: string, referenceId?: string) => {
      if (amount <= 0) return false;
      if (statsRef.current.coins < amount) return false;
      const next = { ...statsRef.current, coins: statsRef.current.coins - amount };
      statsRef.current = next;
      setStats(next);
      persist(next);
      logTransaction(-amount, "spend", description, referenceId);
      return true;
    },
    [persist, logTransaction]
  );

  const addXp = useCallback(
    (amount: number) => {
      if (amount <= 0) return;
      const xp = statsRef.current.xp + amount;
      const next = { ...statsRef.current, xp, level: levelFromXp(xp) };
      statsRef.current = next;
      setStats(next);
      persist(next);
    },
    [persist]
  );

  return (
    <CoinsContext.Provider
      value={{
        ...stats,
        balance: stats.coins,
        loading,
        xpCurrent: xpInCurrentLevel(stats.xp),
        xpToNextLevel: XP_PER_LEVEL,
        addCoins,
        spendCoins,
        addXp,
        refresh: load,
      }}
    >
      {children}
    </CoinsContext.Provider>
  );
};

export const useCoins = () => {
  const ctx = useContext(CoinsContext);
  if (!ctx) throw new Error("useCoins must be used within CoinsProvider");
  return ctx;
};
