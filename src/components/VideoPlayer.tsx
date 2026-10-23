import { useState, useRef, useEffect } from "react";
import { Play, Pause, Square, Volume2, VolumeX, Maximize, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CoinDisplay } from "./CoinDisplay";
import { setBusy } from "@/updateGuard";

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  coinsReward: number;
  onComplete?: () => void;
  thumbnail?: string;
}

export const VideoPlayer = ({
  videoUrl,
  title,
  coinsReward,
  onComplete,
  thumbnail,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [playbackError, setPlaybackError] = useState<string | null>(null);

  // Não atualiza o app enquanto o vídeo está aberto
  useEffect(() => {
    setBusy(true);
    return () => setBusy(false);
  }, []);

  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    setShowReward(false);
    setHasCompleted(false);
    setPlaybackError(null);
    videoRef.current?.load();
  }, [videoUrl]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (!video.duration || Number.isNaN(video.duration)) return;

      const percentage = (video.currentTime / video.duration) * 100;
      setProgress(percentage);

      if (percentage >= 95 && !hasCompleted) {
        setHasCompleted(true);
        setShowReward(true);
        onComplete?.();
        setTimeout(() => setShowReward(false), 3000);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [hasCompleted, onComplete]);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (!videoUrl) {
      setPlaybackError("Vídeo indisponível para esta lição.");
      return;
    }

    try {
      if (video.paused) {
        setPlaybackError(null);
        await video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    } catch (err) {
      console.error("Video play failed:", err);
      // Try muted autoplay fallback (mobile/iOS restriction)
      try {
        video.muted = true;
        setIsMuted(true);
        await video.play();
        setIsPlaying(true);
      } catch (fallbackError) {
        console.error("Muted video play failed:", fallbackError);
        setPlaybackError("Não foi possível reproduzir este vídeo. Toque em tentar novamente.");
        setIsPlaying(false);
      }
    }
  };

  const stopVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
    setIsPlaying(false);
    setProgress(0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-foreground/5 shadow-card">
      {/* Video Element */}
      <div className="relative aspect-video bg-foreground/10">
        <video
          key={videoUrl}
          ref={videoRef}
          className="w-full h-full object-cover"
          poster={thumbnail}
          playsInline
          controls={false}
          preload="metadata"
          onLoadedMetadata={() => setPlaybackError(null)}
          onError={() => setPlaybackError("Não foi possível carregar este vídeo.")}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>

        {playbackError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-card/90 p-6 text-center">
            <p className="font-bold text-foreground">{playbackError}</p>
            <Button variant="default" onClick={togglePlay}>
              Tentar novamente
            </Button>
          </div>
        ) : !isPlaying && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-foreground/20 cursor-pointer"
            onClick={togglePlay}
          >
            <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center shadow-glow animate-pulse-soft">
              <Play className="w-10 h-10 text-primary-foreground ml-1" />
            </div>
          </div>
        )}

        {/* Reward animation */}
        {showReward && (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/40 backdrop-blur-sm">
            <div className="text-center animate-scale-in">
              <div className="text-6xl mb-4">🎉</div>
              <p className="text-2xl font-bold text-primary-foreground mb-2">Parabéns!</p>
              <CoinDisplay amount={coinsReward} size="lg" />
              <p className="text-primary-foreground mt-2">moedas conquistadas!</p>
            </div>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-muted">
        <div
          className="h-full gradient-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls */}
      <div className="p-4 bg-card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-lg text-foreground truncate pr-4">{title}</h3>
          <div className="flex items-center gap-2">
            <CoinDisplay amount={coinsReward} size="sm" />
            {hasCompleted && (
              <span className="text-accent text-sm font-medium">✓ Concluído</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Button
            variant="default"
            size="icon"
            onClick={togglePlay}
            className="w-12 h-12"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={stopVideo}
          >
            <Square className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
          >
            <Maximize className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
