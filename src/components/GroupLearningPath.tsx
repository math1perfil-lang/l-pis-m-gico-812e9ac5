import { CheckCircle2, Lock, Play, Rocket, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LessonGroup } from "@/data/alfabetizacaoGrupos";

interface GroupLearningPathProps {
  groups: LessonGroup[];
  currentIndex: number;
  videosWatched: number[];
  groupsCompleted: number[];
  onSelectGroup: (index: number) => void;
}

export const GroupLearningPath = ({
  groups,
  currentIndex,
  videosWatched,
  groupsCompleted,
  onSelectGroup,
}: GroupLearningPathProps) => {
  return (
    <div className="space-y-3">
      {groups.map((group, index) => {
        const isCompleted = groupsCompleted.includes(index);
        const isVideoWatched = videosWatched.includes(index);
        const isUnlocked = index === 0 || groupsCompleted.includes(index - 1);
        const isCurrent = index === currentIndex && !isCompleted;

        let statusLabel = "Bloqueado";
        if (isCompleted) statusLabel = "Concluído";
        else if (isVideoWatched) statusLabel = "Atividades pendentes";
        else if (isUnlocked) statusLabel = "Assista o vídeo";

        return (
          <button
            key={group.id}
            onClick={() => isUnlocked && onSelectGroup(index)}
            disabled={!isUnlocked}
            className={cn(
              "w-full p-4 rounded-2xl text-left transition-all border-2 animate-fade-in",
              isCompleted
                ? "border-accent bg-accent/10"
                : isCurrent
                ? "border-primary bg-primary/10 shadow-soft"
                : isUnlocked
                ? "border-border bg-muted/40 hover:bg-muted hover-scale"
                : "border-border/50 bg-muted/30 opacity-60 cursor-not-allowed"
            )}
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center shrink-0",
                  isCompleted
                    ? "gradient-accent"
                    : isCurrent
                    ? "gradient-primary"
                    : isUnlocked
                    ? "bg-primary/20"
                    : "bg-muted-foreground/20"
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-6 h-6 text-accent-foreground" />
                ) : !isUnlocked ? (
                  <Lock className="w-5 h-5 text-muted-foreground" />
                ) : isVideoWatched ? (
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                ) : (
                  <Rocket className="w-5 h-5 text-primary-foreground" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-muted-foreground">
                    Grupo {index + 1}
                  </span>
                  <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                    +{group.groupCoinsBonus} 🪙 bônus
                  </span>
                </div>
                <h4 className="font-bold text-foreground text-sm mt-0.5 truncate">
                  {group.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  🎬 {group.videoDurationLabel} • 📝 {group.activities.length} atividades
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  {isCompleted ? (
                    <span className="text-xs font-medium text-accent">✓ {statusLabel}</span>
                  ) : isVideoWatched ? (
                    <span className="text-xs font-medium text-primary">
                      📝 {statusLabel}
                    </span>
                  ) : isUnlocked ? (
                    <span className="text-xs font-medium text-primary flex items-center gap-1">
                      <Play className="w-3 h-3" /> {statusLabel}
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-muted-foreground">
                      🔒 {statusLabel}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
