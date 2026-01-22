import { Camera, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LevelBadge } from "./LevelBadge";
import { CoinDisplay } from "./CoinDisplay";
import { StreakDisplay } from "./StreakDisplay";
import { ProgressBar } from "./ProgressBar";

interface ChildProfileProps {
  name: string;
  age: number;
  avatar: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalCoins: number;
  currentStreak: number;
  longestStreak: number;
  coursesCompleted: number;
  lessonsCompleted: number;
}

export const ChildProfile = ({
  name,
  age,
  avatar,
  level,
  xp,
  xpToNextLevel,
  totalCoins,
  currentStreak,
  longestStreak,
  coursesCompleted,
  lessonsCompleted,
}: ChildProfileProps) => {
  return (
    <div className="space-y-6">
      {/* Profile header */}
      <div className="bg-card rounded-2xl p-6 shadow-card">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Avatar with camera button */}
          <div className="relative">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary shadow-glow">
              <img
                src={avatar}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full gradient-primary flex items-center justify-center shadow-soft">
              <Camera className="w-5 h-5 text-primary-foreground" />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
              <h2 className="text-2xl font-bold text-foreground">{name}</h2>
              <span className="px-3 py-1 rounded-full text-xs font-bold gradient-secondary text-secondary-foreground">
                {age} anos
              </span>
            </div>
            
            {/* Level and XP */}
            <div className="flex items-center gap-4 mb-4">
              <LevelBadge level={level} size="sm" />
              <div className="flex-1 max-w-xs">
                <ProgressBar
                  value={xp}
                  max={xpToNextLevel}
                  variant="primary"
                  size="md"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {xp}/{xpToNextLevel} XP para o nível {level + 1}
                </p>
              </div>
            </div>

            {/* Quick stats */}
            <div className="flex items-center justify-center sm:justify-start gap-4">
              <CoinDisplay amount={totalCoins} size="md" />
              <Button variant="ghost" size="sm">
                <Edit2 className="w-4 h-4 mr-1" />
                Editar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Streak */}
      <StreakDisplay
        currentStreak={currentStreak}
        longestStreak={longestStreak}
      />

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card rounded-xl p-4 shadow-card text-center">
          <p className="text-3xl font-bold text-primary">{coursesCompleted}</p>
          <p className="text-sm text-muted-foreground">Cursos Completos</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-card text-center">
          <p className="text-3xl font-bold text-accent">{lessonsCompleted}</p>
          <p className="text-sm text-muted-foreground">Aulas Concluídas</p>
        </div>
      </div>

      {/* Face recognition status */}
      <div className="bg-accent/10 rounded-xl p-4 border-2 border-accent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center">
            <Camera className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <p className="font-bold text-foreground">Reconhecimento Facial Ativo</p>
            <p className="text-sm text-muted-foreground">
              Sua identidade está protegida para garantir seu aprendizado
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
