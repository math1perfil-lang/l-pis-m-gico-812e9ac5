import { Coins } from "lucide-react";
import { cn } from "@/lib/utils";

interface CoinDisplayProps {
  amount: number;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
}

export const CoinDisplay = ({ 
  amount, 
  size = "md", 
  animated = false,
  className 
}: CoinDisplayProps) => {
  const sizeClasses = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-12 px-5 text-lg",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 gradient-gold rounded-full font-extrabold text-gold-foreground shadow-gold",
        sizeClasses[size],
        animated && "animate-coin-spin",
        className
      )}
    >
      <Coins className={cn(iconSizes[size], "animate-float")} />
      <span>{amount.toLocaleString()}</span>
    </div>
  );
};
