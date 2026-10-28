import { Fragment, useState, useEffect } from "react";
import { Check, X, ArrowRight, RotateCcw, Trophy, Star, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CoinDisplay } from "./CoinDisplay";
import { ProgressBar } from "./ProgressBar";
import type { Activity } from "@/data/activities";
import { cn } from "@/lib/utils";
import { setBusy } from "@/updateGuard";

interface ActivityPlayerProps {
  activities: Activity[];
  onComplete: (totalCoins: number) => void;
  onClose: () => void;
  // Modo treino (grupo já concluído): refaz as atividades sem ganhar moedas.
  practice?: boolean;
}

export const ActivityPlayer = ({
  activities,
  onComplete,
  onClose,
  practice = false,
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
  const [rightOrder, setRightOrder] = useState<string[]>([]);

  // Não atualiza o app (recarregando a página) enquanto a criança faz a atividade
  useEffect(() => {
    setBusy(true);
    return () => setBusy(false);
  }, []);

  // Página inteira: volta ao topo a cada atividade nova
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentIndex]);

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

    // Ligar: embaralha a coluna da direita (senão a resposta aparece pela posição)
    if (currentActivity?.type === "matching") {
      const rightIds = currentActivity.options.filter((_, i) => i % 2 === 1).map((o) => o.id);
      let shuffledRight = rightIds;
      for (let t = 0; t < 10 && rightIds.length > 1; t++) {
        shuffledRight = [...rightIds].sort(() => Math.random() - 0.5);
        if (shuffledRight.some((id, i) => id !== rightIds[i])) break;
      }
      setRightOrder(shuffledRight);
    }

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
      const coins = practice ? 0 : currentActivity.coinsReward;
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

  // Leitura do texto base: conta como atividade concluída e já avança para as questões.
  const finishReading = () => {
    if (!currentActivity) return;
    const coins = practice ? 0 : currentActivity.coinsReward;
    const total = earnedCoins + coins;
    setEarnedCoins(total);
    setCompletedActivities([...completedActivities, currentActivity.id]);
    if (currentIndex < activities.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowCelebration(true);
      setTimeout(() => {
        onComplete(total);
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
    if (!currentActivity) return;
    const leftIds = currentActivity.options.filter((_, i) => i % 2 === 0).map((o) => o.id);
    const isLeft = (x: string) => leftIds.includes(x);
    if (!selectedMatch) {
      setSelectedMatch(id);
    } else if (selectedMatch === id) {
      setSelectedMatch(null);
    } else if (isLeft(selectedMatch) === isLeft(id)) {
      // Mesma coluna: troca a seleção (só se liga um item da esquerda com um da direita)
      setSelectedMatch(id);
    } else {
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
          {practice ? (
            <p className="text-muted-foreground mt-2">Treino concluído! (sem moedas, você já tinha ganho neste grupo)</p>
          ) : (
            <>
              <CoinDisplay amount={earnedCoins} size="lg" />
              <p className="text-muted-foreground mt-2">moedas conquistadas!</p>
            </>
          )}
        </div>
      </div>
    );
  }

  if (!currentActivity) return null;

  const isReading = currentActivity.type === "reading";
  const basePassage =
    !isReading && currentActivity.basedOn
      ? activities.find((a) => a.id === currentActivity.basedOn)
      : undefined;

  return (
    <div className="min-h-screen bg-background sm:py-6">
      <div className="bg-card sm:rounded-3xl sm:shadow-card max-w-2xl w-full mx-auto min-h-screen sm:min-h-0">
        {/* Header (fixo no topo, com o botão Sair sempre à mão) */}
        <div className="sticky top-0 z-10 bg-card p-4 sm:p-6 border-b border-border sm:rounded-t-3xl">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2 min-w-0">
              <Star className="w-5 h-5 text-gold shrink-0" />
              <span className="font-bold text-foreground">
                {isReading ? "📖 Leitura • " : ""}Atividade {currentIndex + 1} de {activities.length}
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="shrink-0" aria-label="Sair das atividades">
              <X className="w-4 h-4 mr-1" />
              Sair
            </Button>
          </div>
          <div className="flex items-center justify-end mb-3">
            {practice ? (
              <span className="text-xs font-bold text-muted-foreground bg-muted px-3 py-1 rounded-full">Treino • sem moedas</span>
            ) : (
              <CoinDisplay amount={earnedCoins} size="sm" />
            )}
          </div>
          <ProgressBar value={currentIndex + (isCorrect ? 1 : 0)} max={activities.length} variant="accent" />
        </div>

        {/* Activity Content */}
        <div className="p-4 sm:p-6">
          {currentActivity.imageUrl && (
            <div data-illustration className="mb-6 rounded-2xl bg-secondary/40 p-4">
              <div className="grid gap-4 md:grid-cols-2 items-center">
                {currentActivity.poem && (
                  <div>
                    {currentActivity.poemTitle && (
                      <h4 className="text-lg font-extrabold tracking-wide text-foreground mb-3 uppercase">
                        {currentActivity.poemTitle}
                      </h4>
                    )}
                    <div className="space-y-1">
                      {currentActivity.poem.map((line, i) => (
                        <p key={i} className="text-base font-semibold uppercase text-foreground leading-snug">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
                <img
                  src={currentActivity.imageUrl}
                  alt={currentActivity.imageCaption || currentActivity.question}
                  loading="lazy"
                  className="w-full rounded-xl object-cover"
                  onError={(e) => {
                    // Se a ilustração não carregar, esconde o quadro em vez de mostrar imagem quebrada
                    (e.currentTarget.closest("[data-illustration]") as HTMLElement | null)?.style.setProperty("display", "none");
                  }}
                />
              </div>
            </div>
          )}
          {isReading && (
            <div className="mb-2 rounded-2xl bg-secondary/40 p-5">
              {currentActivity.passageTitle && (
                <h4 className="text-xl font-extrabold text-foreground mb-3">
                  {currentActivity.passageTitle}
                </h4>
              )}
              <div className="space-y-3">
                {currentActivity.passage?.map((paragraph, i) => (
                  <p key={i} className="text-lg leading-relaxed text-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
              {currentActivity.passageCredit && (
                <p className="mt-4 border-t border-primary/20 pt-3 text-sm italic text-muted-foreground">
                  Fonte: {currentActivity.passageCredit}
                </p>
              )}
            </div>
          )}
          {basePassage && (
            <details className="mb-4 rounded-2xl bg-secondary/40 p-4">
              <summary className="cursor-pointer font-bold text-primary flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Reler o texto
              </summary>
              <div className="mt-3">
                {basePassage.passageTitle && (
                  <h4 className="text-lg font-extrabold text-foreground mb-2">
                    {basePassage.passageTitle}
                  </h4>
                )}
                <div className="space-y-2">
                  {basePassage.passage?.map((paragraph, i) => (
                    <p key={i} className="text-base leading-relaxed text-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {basePassage.passageCredit && (
                  <p className="mt-3 border-t border-primary/20 pt-2 text-xs italic text-muted-foreground">
                    Fonte: {basePassage.passageCredit}
                  </p>
                )}
              </div>
            </details>
          )}
          <p className="text-sm text-primary font-medium mb-2">
            {currentActivity.instruction}
          </p>
          <h3 className="text-xl font-bold text-foreground mb-6">
            {currentActivity.question}
          </h3>

          {/* Picture options */}
          {(currentActivity.type === "multiple-choice" ||
            currentActivity.type === "true-false") &&
            currentActivity.options.some((o) => o.imageUrl) && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {currentActivity.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => !isCorrect && setSelectedAnswer(option.id)}
                    disabled={isCorrect !== null}
                    className={cn(
                      "rounded-2xl border-4 overflow-hidden bg-muted/40 text-center",
                      selectedAnswer === option.id
                        ? isCorrect === null
                          ? "border-primary"
                          : isCorrect
                          ? "border-accent"
                          : "border-destructive"
                        : "border-border",
                      isCorrect !== null && option.isCorrect && "border-accent"
                    )}
                  >
                    <img
                      src={option.imageUrl}
                      alt={option.text}
                      loading="lazy"
                      className="w-full aspect-square object-cover"
                    />
                    <div className="p-2 flex items-center justify-center gap-1">
                      <span className="text-sm font-bold text-foreground uppercase">
                        {option.text}
                      </span>
                      {isCorrect !== null && option.isCorrect && (
                        <Check className="w-4 h-4 text-accent" />
                      )}
                      {isCorrect === false &&
                        selectedAnswer === option.id &&
                        !option.isCorrect && (
                          <X className="w-4 h-4 text-destructive" />
                        )}
                    </div>
                  </button>
                ))}
              </div>
            )}

          {/* Multiple Choice / True-False */}
          {(currentActivity.type === "multiple-choice" ||
            currentActivity.type === "true-false") &&
            !currentActivity.options.some((o) => o.imageUrl) && (
            <div className="grid gap-3 auto-rows-fr">
              {currentActivity.options.map((option, optionIndex) => (
                <button
                  key={option.id}
                  onClick={() => !isCorrect && setSelectedAnswer(option.id)}
                  disabled={isCorrect !== null}
                  className={cn(
                    "w-full h-full min-h-[64px] p-4 rounded-xl text-left transition-all border-2",
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
                  <div className="flex items-center gap-3 h-full">
                    <div
                      className={cn(
                        "w-9 h-9 min-w-[2.25rem] shrink-0 aspect-square rounded-full flex items-center justify-center font-bold text-base leading-none",
                        selectedAnswer === option.id
                          ? "gradient-primary text-primary-foreground"
                          : "bg-muted-foreground/20"
                      )}
                    >
                      {String.fromCharCode(65 + optionIndex)}
                    </div>
                    <span className="font-medium text-foreground flex-1">
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
            <div className="grid gap-2 auto-rows-fr">
              {orderedItems.map((itemId, index) => {
                const option = currentActivity.options.find(
                  (o) => o.id === itemId
                );
                return (
                  <div
                    key={itemId}
                    className={cn(
                      "min-h-[64px] p-4 rounded-xl border-2 flex items-center justify-between gap-3",
                      isCorrect === true
                        ? "border-accent bg-accent/10"
                        : isCorrect === false
                        ? "border-destructive bg-destructive/10"
                        : "border-border bg-muted/50"
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-9 h-9 min-w-[2.25rem] shrink-0 aspect-square rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-base leading-none">
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
          {currentActivity.type === "matching" && (() => {
            const leftItems = currentActivity.options.filter((_, i) => i % 2 === 0);
            const defaultRightIds = currentActivity.options.filter((_, i) => i % 2 === 1).map((o) => o.id);
            const rightIds = rightOrder.length === defaultRightIds.length ? rightOrder : defaultRightIds;
            const rightItems = rightIds
              .map((id) => currentActivity.options.find((o) => o.id === id))
              .filter((o): o is NonNullable<typeof o> => Boolean(o));

            const renderMatchButton = (option: (typeof currentActivity.options)[number]) => (
              <button
                key={option.id}
                onClick={() => isCorrect === null && handleMatchClick(option.id)}
                disabled={isCorrect !== null || matchedPairs[option.id] !== undefined}
                className={cn(
                  "w-full h-full min-h-[72px] p-3 rounded-xl border-2 transition-all",
                  "flex items-center justify-center text-center font-semibold text-base leading-snug",
                  selectedMatch === option.id
                    ? "border-primary bg-primary/10"
                    : matchedPairs[option.id]
                    ? "border-accent bg-accent/10"
                    : "border-border bg-muted/50 hover:bg-muted"
                )}
              >
                {option.text}
              </button>
            );

            // Todas as caixas com o mesmo tamanho e alinhadas em linhas (auto-rows-fr)
            return (
              <div className="grid grid-cols-2 gap-3 auto-rows-fr">
                {leftItems.map((left, row) => (
                  <Fragment key={left.id}>
                    {renderMatchButton(left)}
                    {rightItems[row] ? renderMatchButton(rightItems[row]) : <div />}
                  </Fragment>
                ))}
              </div>
            );
          })()}

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

          {isReading && (
            <Button onClick={finishReading} className="flex-1">
              <Check className="w-4 h-4 mr-2" />
              Li o texto
            </Button>
          )}

          {!isReading && isCorrect === null && (
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

          {!isReading && isCorrect === false && (
            <Button onClick={retryActivity} className="flex-1">
              <RotateCcw className="w-4 h-4 mr-2" />
              Tentar Novamente
            </Button>
          )}

          {!isReading && isCorrect === true && (
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
