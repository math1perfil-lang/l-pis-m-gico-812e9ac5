import { Check, Lock, Play, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface LessonNode {
  id: string;
  title: string;
  status: "completed" | "current" | "locked";
  coinsReward: number;
}

interface LearningPathProps {
  lessons: LessonNode[];
  onLessonClick?: (lessonId: string) => void;
}

export const LearningPath = ({ lessons, onLessonClick }: LearningPathProps) => {
  return (
    <div className="relative py-8">
      {/* Path line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-muted -translate-x-1/2" />

      <div className="relative space-y-8">
        {lessons.map((lesson, index) => {
          const isLeft = index % 2 === 0;
          const isCompleted = lesson.status === "completed";
          const isCurrent = lesson.status === "current";
          const isLocked = lesson.status === "locked";

          return (
            <div
              key={lesson.id}
              className={cn(
                "relative flex items-center",
                isLeft ? "flex-row" : "flex-row-reverse"
              )}
            >
              {/* Content card */}
              <div
                className={cn(
                  "w-[calc(50%-2rem)] p-4 rounded-xl cursor-pointer transition-all duration-300",
                  isCompleted && "bg-accent/10 border-2 border-accent",
                  isCurrent && "bg-primary/10 border-2 border-primary shadow-glow",
                  isLocked && "bg-muted/50 border-2 border-muted opacity-60",
                  !isLocked && "hover:scale-105"
                )}
                onClick={() => !isLocked && onLessonClick?.(lesson.id)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      isCompleted && "gradient-accent",
                      isCurrent && "gradient-primary animate-pulse-soft",
                      isLocked && "bg-muted"
                    )}
                  >
                    {isCompleted && <Check className="w-5 h-5 text-accent-foreground" />}
                    {isCurrent && <Play className="w-5 h-5 text-primary-foreground" />}
                    {isLocked && <Lock className="w-4 h-4 text-muted-foreground" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-foreground">{lesson.title}</h4>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="w-3 h-3 text-gold" />
                      <span>{lesson.coinsReward} moedas</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center node */}
              <div
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-4 z-10",
                  isCompleted && "bg-accent border-accent",
                  isCurrent && "bg-primary border-primary animate-pulse",
                  isLocked && "bg-muted border-muted"
                )}
              />

              {/* Spacer */}
              <div className="w-[calc(50%-2rem)]" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
