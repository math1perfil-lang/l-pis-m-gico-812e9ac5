import { Clock, Star, Lock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CoinDisplay } from "./CoinDisplay";
import { ProgressBar } from "./ProgressBar";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  ageRange: string;
  duration: string;
  coinsReward: number;
  progress?: number;
  totalLessons: number;
  completedLessons?: number;
  category: string;
  isLocked?: boolean;
  onStart?: () => void;
}

export const CourseCard = ({
  title,
  description,
  image,
  ageRange,
  duration,
  coinsReward,
  progress = 0,
  totalLessons,
  completedLessons = 0,
  category,
  isLocked = false,
  onStart,
}: CourseCardProps) => {
  const isCompleted = completedLessons === totalLessons && totalLessons > 0;

  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden bg-card shadow-card transition-all duration-300 hover:shadow-glow hover:scale-[1.02]",
        isLocked && "opacity-70"
      )}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold gradient-primary text-primary-foreground">
            {category}
          </span>
        </div>

        {/* Age range badge */}
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-card/90 text-foreground backdrop-blur-sm">
            {ageRange} anos
          </span>
        </div>

        {/* Lock overlay */}
        {isLocked && (
          <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center backdrop-blur-sm">
            <div className="text-center">
              <Lock className="w-12 h-12 text-white mx-auto mb-2" />
              <p className="text-white font-medium">Complete o curso anterior</p>
            </div>
          </div>
        )}

        {/* Completed overlay */}
        {isCompleted && (
          <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
            <CheckCircle2 className="w-16 h-16 text-accent" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-gold" />
            <span>{totalLessons} aulas</span>
          </div>
        </div>

        {/* Progress */}
        {progress > 0 && (
          <div className="mb-4">
            <ProgressBar
              value={completedLessons}
              max={totalLessons}
              variant="accent"
              size="sm"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {completedLessons} de {totalLessons} aulas concluídas
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <CoinDisplay amount={coinsReward} size="sm" />
          <Button
            variant={isCompleted ? "accent" : "default"}
            size="sm"
            disabled={isLocked}
            onClick={onStart}
          >
            {isCompleted ? "Revisar" : progress > 0 ? "Continuar" : "Começar"}
          </Button>
        </div>
      </div>
    </div>
  );
};
