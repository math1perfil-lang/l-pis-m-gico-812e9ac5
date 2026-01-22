import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  variant?: "primary" | "accent" | "gold" | "secondary";
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const ProgressBar = ({
  value,
  max,
  variant = "primary",
  showLabel = true,
  size = "md",
  className,
}: ProgressBarProps) => {
  const percentage = Math.min((value / max) * 100, 100);

  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };

  const variantClasses = {
    primary: "gradient-primary",
    accent: "gradient-accent",
    gold: "gradient-gold",
    secondary: "gradient-secondary",
  };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between text-sm font-medium mb-1">
          <span className="text-muted-foreground">Progresso</span>
          <span className="text-foreground">{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        className={cn(
          "w-full bg-muted rounded-full overflow-hidden",
          sizeClasses[size]
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            variantClasses[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
