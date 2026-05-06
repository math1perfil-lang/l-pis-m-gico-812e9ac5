import { Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CoinDisplayProps {
  amount: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  clickable?: boolean;
}

export const CoinDisplay = ({
  amount,
  size = "md",
  className,
  clickable = true,
}: CoinDisplayProps) => {
  const navigate = useNavigate();
  const sizeClasses = {
    sm: "h-8 px-3 text-sm",
    md: "h-9 px-3.5 text-sm",
    lg: "h-10 px-4 text-base",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const Comp: any = clickable ? "button" : "div";

  return (
    <Comp
      onClick={clickable ? () => navigate("/cofrinho") : undefined}
      className={cn(
        "inline-flex items-center gap-2 bg-amber-50 rounded-full font-bold text-amber-700 border border-amber-200 shrink-0",
        clickable && "hover:bg-amber-100 transition-colors cursor-pointer",
        sizeClasses[size],
        className
      )}
    >
      <Coins className={cn(iconSizes[size], "text-amber-600")} />
      <span>{amount.toLocaleString()}</span>
    </Comp>
  );
};
