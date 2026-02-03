import { useState, useEffect } from "react";
import { Check, X, ArrowRight, RotateCcw, Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CoinDisplay } from "./CoinDisplay";
import { ProgressBar } from "./ProgressBar";
import type { Activity } from "@/data/activities";
import { cn } from "@/lib/utils";

interface ActivityPlayerProps {
  activities: Activity[];
  onComplete: (totalCoins: number) => void;
  onClose: () => void;
}

export const ActivityPlayer = ({
  activities,
  onComplete,
  onClose,
}: ActivityPlayerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [earnedCoins, setEarnedCoins] = useState(0);
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  const [orderedItems, setOrderedItems] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const currentActivity = activities[currentIndex];
  const progress = ((currentIndex + (isCorrect ? 1 : 0)) / activities.length) * 100;

  useEffect(() => {
    // Reset state when activity changes
    setSelectedAnswer(null);
    setIsCorrect(null);
    setAttempts(0);
    setOrderedItems([]);
    setMatchedPairs({});
    setSelectedMatch(null);

    // Initialize ordering if needed
    if (currentActivity?.type === "ordering") {
      const shuffled = [...currentActivity.options]
        .sort(() => Math.random() - 0.5)
        .map((o) => o.id);
      setOrderedItems(shuffled);
    }
  }, [currentIndex, currentActivity]);

  const checkAnswer = () => {
    if (!currentActivity) return;

    let correct = false;

    switch (currentActivity.type) {
      case "multiple-choice":
      case "true-false":
        const selectedOption = currentActivity.options.find(
          (o) => o.id === selectedAnswer
        );
        correct = selectedOption?.isCorrect || false;
        break;

      case "ordering":
        correct =
          JSON.stringify(orderedItems) ===
          JSON.stringify(currentActivity.correctOrder);
        break;

      case "matching":
        const leftItems = currentActivity.options.filter((_, i) => i % 2 === 0);
        correct = leftItems.every(
          (item) => matchedPairs[item.id] === item.matchId
        );
        break;
    }

    setIsCorrect(correct);
    setAttempts(attempts + 1);

    if (correct) {
      const coins = currentActivity.coinsReward;
      setEarnedCoins(earnedCoins + coins);
      setCompletedActivities([...completedActivities, currentActivity.id]);
    }
  };

  const nextActivity = () => {
    if (currentIndex < activities.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // All activities completed!
      setShowCelebration(true);
      setTimeout(() => {
        onComplete(earnedCoins);
      }, 3000);
    }
  };

  const retryActivity = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setMatchedPairs({});
    setSelectedMatch(null);
    if (currentActivity?.type === "ordering") {
      const shuffled = [...currentActivity.options]
        .sort(() => Math.random() - 0.5)
        .map((o) => o.id);
      setOrderedItems(shuffled);
    }
  };

  const handleMatchClick = (id: string) => {
    if (!selectedMatch) {
      setSelectedMatch(id);
    } else {
      // Create a match
      setMatchedPairs({
        ...matchedPairs,
        [selectedMatch]: id,
        [id]: selectedMatch,
      });
      setSelectedMatch(null);
    }
  };

  const moveItem = (fromIndex: number, direction: "up" | "down") => {
    const newOrder = [...orderedItems];
    const toIndex = direction === "up" ? fromIndex - 1 : fromIndex + 1;
    if (toIndex >= 0 && toIndex < newOrder.length) {
      [newOrder[fromIndex], newOrder[toIndex]] = [
        newOrder[toIndex],
        newOrder[fromIndex],
      ];
      setOrderedItems(newOrder);
    }
  };

  if (showCelebration) {
    return (
      <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="text-center animate-scale-in">
          <div className="text-8xl mb-6">🎉</div>
          <Trophy className="w-20 h-20 text-gold mx-auto mb-4 animate-bounce" />
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Parabéns! 100% de Acertos!
          </h2>
          <p className="text-xl text-muted-foreground mb-6">
            Você completou todas as atividades!
          </p>
          <CoinDisplay amount={earnedCoins} size="lg" animated />
          <p className="text-muted-foreground mt-2">moedas conquistadas!</p>
        </div>
      </div>
    );
  }

  if (!currentActivity) return null;

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-3xl shadow-card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-gold" />
              <span className="font-bold text-foreground">
                Atividade {currentIndex + 1} de {activities.length}
              </span>
            </div>
            <CoinDisplay amount={earnedCoins} size="sm" />
          </div>
          <ProgressBar value={currentIndex + (isCorrect ? 1 : 0)} max={activities.length} variant="accent" />
        </div>

        {/* Activity Content */}
        <div className="p-6">
          <p className="text-sm text-primary font-medium mb-2">
            {currentActivity.instruction}
          </p>
          <h3 className="text-xl font-bold text-foreground mb-6">
            {currentActivity.question}
          </h3>

          {/* Multiple Choice / True-False */}
          {(currentActivity.type === "multiple-choice" ||
            currentActivity.type === "true-false") && (
            <div className="grid gap-3">
              {currentActivity.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => !isCorrect && setSelectedAnswer(option.id)}
                  disabled={isCorrect !== null}
                  className={cn(
                    "p-4 rounded-xl text-left transition-all border-2",
                    selectedAnswer === option.id
                      ? isCorrect === null
                        ? "border-primary bg-primary/10"
                        : isCorrect
                        ? "border-accent bg-accent/10"
                        : "border-destructive bg-destructive/10"
                      : "border-border bg-muted/50 hover:bg-muted",
                    isCorrect !== null && option.isCorrect && "border-accent bg-accent/10"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                        selectedAnswer === option.id
                          ? "gradient-primary text-primary-foreground"
                          : "bg-muted-foreground/20"
                      )}
                    >
                      {option.id.toUpperCase()}
                    </div>
                    <span className="font-medium text-foreground">
                      {option.text}
                    </span>
                    {isCorrect !== null && option.isCorrect && (
                      <Check className="w-5 h-5 text-accent ml-auto" />
                    )}
                    {isCorrect === false &&
                      selectedAnswer === option.id &&
                      !option.isCorrect && (
                        <X className="w-5 h-5 text-destructive ml-auto" />
                      )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Ordering */}
          {currentActivity.type === "ordering" && (
            <div className="space-y-2">
              {orderedItems.map((itemId, index) => {
                const option = currentActivity.options.find(
                  (o) => o.id === itemId
                );
                return (
                  <div
                    key={itemId}
                    className={cn(
                      "p-4 rounded-xl border-2 flex items-center justify-between",
                      isCorrect === true
                        ? "border-accent bg-accent/10"
                        : isCorrect === false
                        ? "border-destructive bg-destructive/10"
                        : "border-border bg-muted/50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                        {index + 1}
                      </span>
                      <span className="font-medium text-foreground">
                        {option?.text}
                      </span>
                    </div>
                    {isCorrect === null && (
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveItem(index, "up")}
                          disabled={index === 0}
                        >
                          ↑
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveItem(index, "down")}
                          disabled={index === orderedItems.length - 1}
                        >
                          ↓
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Matching */}
          {currentActivity.type === "matching" && (
            <div className="grid grid-cols-2 gap-4">
              {/* Left column */}
              <div className="space-y-2">
                {currentActivity.options
                  .filter((_, i) => i % 2 === 0)
                  .map((option) => (
                    <button
                      key={option.id}
                      onClick={() =>
                        isCorrect === null && handleMatchClick(option.id)
                      }
                      disabled={
                        isCorrect !== null || matchedPairs[option.id] !== undefined
                      }
                      className={cn(
                        "w-full p-4 rounded-xl border-2 transition-all",
                        selectedMatch === option.id
                          ? "border-primary bg-primary/10"
                          : matchedPairs[option.id]
                          ? "border-accent bg-accent/10"
                          : "border-border bg-muted/50 hover:bg-muted"
                      )}
                    >
                      <span className="font-bold text-xl">{option.text}</span>
                    </button>
                  ))}
              </div>
              {/* Right column */}
              <div className="space-y-2">
                {currentActivity.options
                  .filter((_, i) => i % 2 === 1)
                  .map((option) => (
                    <button
                      key={option.id}
                      onClick={() =>
                        isCorrect === null && handleMatchClick(option.id)
                      }
                      disabled={
                        isCorrect !== null || matchedPairs[option.id] !== undefined
                      }
                      className={cn(
                        "w-full p-4 rounded-xl border-2 transition-all",
                        selectedMatch === option.id
                          ? "border-primary bg-primary/10"
                          : matchedPairs[option.id]
                          ? "border-accent bg-accent/10"
                          : "border-border bg-muted/50 hover:bg-muted"
                      )}
                    >
                      <span className="font-medium">{option.text}</span>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Feedback */}
          {isCorrect !== null && (
            <div
              className={cn(
                "mt-6 p-4 rounded-xl text-center",
                isCorrect
                  ? "bg-accent/20 border-2 border-accent"
                  : "bg-destructive/20 border-2 border-destructive"
              )}
            >
              {isCorrect ? (
                <div className="flex items-center justify-center gap-2 text-accent">
                  <Check className="w-6 h-6" />
                  <span className="font-bold text-lg">Correto! 🎉</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 text-destructive">
                  <X className="w-6 h-6" />
                  <span className="font-bold text-lg">
                    Ops! Tente novamente 💪
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-border flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Sair
          </Button>

          {isCorrect === null && (
            <Button
              onClick={checkAnswer}
              disabled={
                currentActivity.type === "multiple-choice" ||
                currentActivity.type === "true-false"
                  ? !selectedAnswer
                  : currentActivity.type === "matching"
                  ? Object.keys(matchedPairs).length <
                    currentActivity.options.length
                  : false
              }
              className="flex-1"
            >
              Verificar
            </Button>
          )}

          {isCorrect === false && (
            <Button onClick={retryActivity} className="flex-1">
              <RotateCcw className="w-4 h-4 mr-2" />
              Tentar Novamente
            </Button>
          )}

          {isCorrect === true && (
            <Button onClick={nextActivity} className="flex-1">
              {currentIndex < activities.length - 1 ? (
                <>
                  Próxima
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Finalizar
                  <Trophy className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
