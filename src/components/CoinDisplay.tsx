import { Coins } from "lucide-react";
import { cn } from "@/lib/utils";

interface CoinDisplayProps {
  amount: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const CoinDisplay = ({ 
  amount, 
  size = "md", 
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
        "inline-flex items-center gap-2 bg-amber-50 rounded-full font-bold text-amber-700 border border-amber-200",
        sizeClasses[size],
        className
      )}
    >
      <Coins className={cn(iconSizes[size], "text-amber-600")} />
      <span>{amount.toLocaleString()}</span>
    </div>
  );
};
