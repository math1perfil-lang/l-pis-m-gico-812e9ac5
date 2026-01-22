import { Star, Trophy, Crown, Gem, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

interface LevelBadgeProps {
  level: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const getLevelInfo = (level: number) => {
  if (level >= 50) return { icon: Crown, title: "Mestre", gradient: "gradient-gold" };
  if (level >= 30) return { icon: Gem, title: "Diamante", gradient: "gradient-special" };
  if (level >= 20) return { icon: Trophy, title: "Ouro", gradient: "gradient-secondary" };
  if (level >= 10) return { icon: Rocket, title: "Prata", gradient: "gradient-primary" };
  return { icon: Star, title: "Bronze", gradient: "gradient-accent" };
};

export const LevelBadge = ({ level, size = "md", className }: LevelBadgeProps) => {
  const { icon: Icon, title, gradient } = getLevelInfo(level);

  const sizeClasses = {
    sm: "w-12 h-12 text-xs",
    md: "w-16 h-16 text-sm",
    lg: "w-20 h-20 text-base",
  };

  const iconSizes = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center rounded-full shadow-card",
        gradient,
        sizeClasses[size],
        className
      )}
    >
      <Icon className={cn(iconSizes[size], "text-white mb-0.5")} />
      <span className="font-extrabold text-white">{level}</span>
      <span className="absolute -bottom-5 text-xs font-medium text-muted-foreground whitespace-nowrap">
        {title}
      </span>
    </div>
  );
};
