import { Flame, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreakDisplayProps {
  currentStreak: number;
  longestStreak: number;
  className?: string;
}

export const StreakDisplay = ({
  currentStreak,
  longestStreak,
  className,
}: StreakDisplayProps) => {
  const days = ["D", "S", "T", "Q", "Q", "S", "S"];
  const today = new Date().getDay();

  return (
    <div className={cn("bg-card rounded-2xl p-5 shadow-card", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full gradient-secondary flex items-center justify-center">
            <Flame className="w-6 h-6 text-secondary-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Sequência atual</p>
            <p className="text-2xl font-bold text-foreground">
              {currentStreak} <span className="text-base font-normal">dias</span>
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Recorde</p>
          <p className="text-lg font-bold text-accent">{longestStreak} dias</p>
        </div>
      </div>

      {/* Week calendar */}
      <div className="flex justify-between">
        {days.map((day, index) => {
          const isPast = index < today;
          const isToday = index === today;
          const isCompleted = index <= today && currentStreak > 0;

          return (
            <div key={index} className="flex flex-col items-center gap-1">
              <span className="text-xs text-muted-foreground">{day}</span>
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                  isCompleted && "gradient-accent",
                  isToday && !isCompleted && "border-2 border-primary",
                  !isCompleted && !isToday && "bg-muted"
                )}
              >
                {isCompleted && <Flame className="w-4 h-4 text-accent-foreground" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
