import { useCallback, useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CoinDisplay } from "./CoinDisplay";
import { setBusy } from "@/updateGuard";
import { eraUmaVezSvg } from "./animated/eraUmaVezSvg";
import "./animated/eraUmaVez.css";

// Vídeo animado do grupo 1 ("Era Uma Vez..."): cenas em SVG, legenda e narração pela voz do
// aparelho. Funciona como o VideoPlayer: chama onComplete ao chegar ao fim.

export type AnimationId = "era-uma-vez";

interface Scene {
  dur: number; // ms
  text: string;
}

const SCENES: Record<AnimationId, Scene[]> = {
  "era-uma-vez": [
    { dur: 7000, text: "Oi! Eu sou o Pan. Hoje vamos abrir um livro encantado e entrar no reino das histórias!" },
    { dur: 6000, text: "Os contos de fadas começam com uma frase mágica: Era uma vez!" },
    { dur: 9000, text: "Aí a gente descobre onde a história acontece e quem são os personagens: uma menina, um gato de estrelas e um castelo no alto da montanha." },
    { dur: 8000, text: "Mas toda boa história tem um problema! Uma bruxa ranzinza enfeitiçou o gato, e ele desapareceu." },
    { dur: 8000, text: "Os personagens resolvem o problema. A Lia teve coragem, atravessou a floresta e pediu o gato de volta." },
    { dur: 8000, text: "No fim, tudo se resolve. E foram felizes para sempre! Agora vêm as atividades. Vamos lá?" },
  ],
};

const SVGS: Record<AnimationId, string> = { "era-uma-vez": eraUmaVezSvg };

interface Props {
  animation: AnimationId;
  title: string;
  coinsReward: number;
  onComplete?: () => void;
}

const canSpeak = () => typeof window !== "undefined" && "speechSynthesis" in window;

export const AnimatedGroupVideo = ({ animation, title, coinsReward, onComplete }: Props) => {
  const scenes = SCENES[animation];
  const total = scenes.reduce((s, x) => s + x.dur, 0);
  const starts = scenes.reduce<number[]>((acc, x, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + scenes[i - 1].dur);
    return acc;
  }, []);
  const sceneAt = (ms: number) => {
    for (let i = scenes.length - 1; i >= 0; i--) if (ms >= starts[i]) return i;
    return 0;
  };

  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [sceneIdx, setSceneIdx] = useState(0);
  const [narrate, setNarrate] = useState(true);
  const [done, setDone] = useState(false);
  const [showReward, setShowReward] = useState(false);

  const timeRef = useRef(0);
  const lastRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const idxRef = useRef(-1);
  const narrateRef = useRef(true);
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  narrateRef.current = narrate;

  // Não atualiza o app enquanto o vídeo está aberto
  useEffect(() => {
    setBusy(true);
    return () => setBusy(false);
  }, []);

  const speak = useCallback((text: string) => {
    if (!canSpeak()) return;
    try {
      window.speechSynthesis.cancel();
      if (!narrateRef.current) return;
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "pt-BR";
      u.rate = 0.92;
      u.pitch = 1.1;
      window.speechSynthesis.speak(u);
    } catch {
      /* narração é opcional */
    }
  }, []);

  const stopSpeech = useCallback(() => {
    if (!canSpeak()) return;
    try {
      window.speechSynthesis.cancel();
    } catch {
      /* ignora */
    }
  }, []);

  const finish = useCallback(() => {
    setPlaying(false);
    setDone(true);
    stopSpeech();
    if (!completedRef.current) {
      completedRef.current = true;
      setShowReward(true);
      onCompleteRef.current?.();
      window.setTimeout(() => setShowReward(false), 3000);
    }
  }, [stopSpeech]);

  useEffect(() => {
    if (!playing) return;
    lastRef.current = performance.now();
    const tick = (now: number) => {
      timeRef.current += now - lastRef.current;
      lastRef.current = now;
      if (timeRef.current >= total) {
        timeRef.current = total;
        setTime(total);
        finish();
        return;
      }
      const i = sceneAt(timeRef.current);
      if (i !== idxRef.current) {
        idxRef.current = i;
        setSceneIdx(i);
        speak(scenes[i].text);
      }
      setTime(timeRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  useEffect(() => () => stopSpeech(), [stopSpeech]);

  const start = () => {
    if (done || timeRef.current >= total) {
      timeRef.current = 0;
      idxRef.current = -1;
      setTime(0);
      setSceneIdx(0);
      setDone(false);
    }
    setPlaying(true);
  };
  const pause = () => {
    setPlaying(false);
    stopSpeech();
  };
  const restart = () => {
    stopSpeech();
    timeRef.current = 0;
    idxRef.current = -1;
    setTime(0);
    setSceneIdx(0);
    setDone(false);
    setPlaying(true);
  };
  const toggleNarration = () => {
    const next = !narrate;
    setNarrate(next);
    narrateRef.current = next;
    if (!next) stopSpeech();
    else if (playing) speak(scenes[sceneIdx].text);
  };

  const progress = (time / total) * 100;
  const started = playing || time > 0;

  return (
    <div className="relative rounded-2xl overflow-hidden bg-foreground/5 shadow-card">
      <div className="av-stage relative aspect-video" data-s={sceneIdx + 1}>
        <div className="absolute inset-0" dangerouslySetInnerHTML={{ __html: SVGS[animation] }} />

        <div
          className="absolute left-0 right-0 bottom-0 px-3 pt-6 pb-2 text-center text-white font-bold text-sm sm:text-lg leading-snug"
          style={{ background: "linear-gradient(to top, rgba(12,8,38,.8), rgba(12,8,38,0))" }}
          aria-live="polite"
        >
          {scenes[sceneIdx].text}
        </div>

        {!started && (
          <button
            type="button"
            className="absolute inset-0 flex items-center justify-center bg-foreground/20 cursor-pointer"
            onClick={start}
            aria-label="Assistir ao vídeo"
          >
            <span className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center shadow-glow animate-pulse-soft">
              <Play className="w-10 h-10 text-primary-foreground ml-1" />
            </span>
          </button>
        )}

        {showReward && (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/40 backdrop-blur-sm">
            <div className="text-center animate-scale-in">
              <div className="text-6xl mb-4">🎉</div>
              <p className="text-2xl font-bold text-primary-foreground mb-2">Parabéns!</p>
              {coinsReward > 0 && <CoinDisplay amount={coinsReward} size="lg" />}
              <p className="text-primary-foreground mt-2">Agora é hora das atividades!</p>
            </div>
          </div>
        )}
      </div>

      <div className="h-1 bg-muted">
        <div className="h-full gradient-primary transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <div className="p-4 bg-card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-lg text-foreground truncate pr-4">{title}</h3>
          {done && <span className="text-accent text-sm font-medium">✓ Concluído</span>}
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button variant="default" size="icon" onClick={playing ? pause : start} className="w-12 h-12" aria-label={playing ? "Pausar" : "Assistir"}>
            {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </Button>
          <Button variant="outline" size="icon" onClick={restart} aria-label="Recomeçar">
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleNarration} aria-label={narrate ? "Desligar narração" : "Ligar narração"}>
            {narrate ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};
