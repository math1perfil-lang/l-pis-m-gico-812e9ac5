import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";

interface CoinsContextValue {
  balance: number;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
  setBalance: (amount: number) => void;
}

const CoinsContext = createContext<CoinsContextValue | undefined>(undefined);

const STORAGE_KEY = "pandoorga.coins.balance";
const DEFAULT_BALANCE = 2340;

export const CoinsProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalanceState] = useState<number>(() => {
    if (typeof window === "undefined") return DEFAULT_BALANCE;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === null) return DEFAULT_BALANCE;
    const parsed = parseInt(stored, 10);
    return Number.isFinite(parsed) ? parsed : DEFAULT_BALANCE;
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, String(balance));
  }, [balance]);

  const addCoins = useCallback((amount: number) => {
    setBalanceState((prev) => prev + amount);
  }, []);

  const spendCoins = useCallback((amount: number) => {
    let ok = false;
    setBalanceState((prev) => {
      if (prev >= amount) {
        ok = true;
        return prev - amount;
      }
      return prev;
    });
    return ok;
  }, []);

  const setBalance = useCallback((amount: number) => {
    setBalanceState(amount);
  }, []);

  return (
    <CoinsContext.Provider value={{ balance, addCoins, spendCoins, setBalance }}>
      {children}
    </CoinsContext.Provider>
  );
};

export const useCoins = () => {
  const ctx = useContext(CoinsContext);
  if (!ctx) throw new Error("useCoins must be used within CoinsProvider");
  return ctx;
};
