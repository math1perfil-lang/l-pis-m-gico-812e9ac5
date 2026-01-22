import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Users, Star, Play, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CoinDisplay } from "@/components/CoinDisplay";
import { ProgressBar } from "@/components/ProgressBar";
import { VideoPlayer } from "@/components/VideoPlayer";
import { LearningPath } from "@/components/LearningPath";
import { getCourseById } from "@/data/courses";
import { toast } from "sonner";

export default function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = getCourseById(courseId || "");
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [showVideo, setShowVideo] = useState(false);

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Curso não encontrado</h2>
          <Button onClick={() => navigate("/courses")}>Voltar aos cursos</Button>
        </div>
      </div>
    );
  }

  // Generate sample lessons if not present
  const lessons = course.lessons.length > 0 
    ? course.lessons 
    : Array.from({ length: course.totalLessons }, (_, i) => ({
        id: `lesson-${i + 1}`,
        title: `Aula ${i + 1}: ${course.title} - Parte ${i + 1}`,
        videoUrl: "",
        thumbnail: course.image,
        duration: "10min",
        coinsReward: Math.floor(course.coinsReward / course.totalLessons),
        description: `Aprenda sobre ${course.title} nesta aula interativa!`,
      }));

  const pathLessons = lessons.map((lesson, index) => ({
    id: lesson.id,
    title: lesson.title,
    status: completedLessons.includes(lesson.id) 
      ? "completed" as const
      : index === currentLesson 
        ? "current" as const 
        : "locked" as const,
    coinsReward: lesson.coinsReward,
  }));

  const handleLessonComplete = () => {
    const lesson = lessons[currentLesson];
    if (!completedLessons.includes(lesson.id)) {
      setCompletedLessons([...completedLessons, lesson.id]);
      toast.success(`🎉 Parabéns! Você ganhou ${lesson.coinsReward} moedas!`);
    }
    setShowVideo(false);
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const progress = (completedLessons.length / lessons.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-card/80 backdrop-blur-lg border-b border-border z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/courses")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-lg font-bold text-foreground line-clamp-1">{course.title}</h1>
                <p className="text-sm text-muted-foreground">{course.category}</p>
              </div>
            </div>
            <CoinDisplay amount={2340} size="sm" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video player or course hero */}
            {showVideo ? (
              <VideoPlayer
                videoUrl={lessons[currentLesson].videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
                title={lessons[currentLesson].title}
                coinsReward={lessons[currentLesson].coinsReward}
                thumbnail={course.image}
                onComplete={handleLessonComplete}
              />
            ) : (
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-card">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="px-3 py-1 rounded-full text-xs font-bold gradient-primary text-primary-foreground mb-3 inline-block">
                    {course.category}
                  </span>
                  <h2 className="text-2xl font-bold text-white mb-2">{course.title}</h2>
                  <p className="text-white/80 mb-4">{course.description}</p>
                  <Button variant="hero" onClick={() => setShowVideo(true)}>
                    <Play className="w-5 h-5 mr-2" />
                    {completedLessons.length > 0 ? "Continuar" : "Começar Agora"}
                  </Button>
                </div>
              </div>
            )}

            {/* Course info */}
            <div className="bg-card rounded-2xl p-6 shadow-card">
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">{course.ageMin}-{course.ageMax} anos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-gold" />
                  <span className="text-muted-foreground">{course.totalLessons} aulas</span>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-foreground">Seu progresso</span>
                  <CoinDisplay amount={course.coinsReward} size="sm" />
                </div>
                <ProgressBar
                  value={completedLessons.length}
                  max={lessons.length}
                  variant="accent"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  {completedLessons.length} de {lessons.length} aulas concluídas
                </p>
              </div>

              {/* About */}
              <div>
                <h3 className="font-bold text-foreground mb-2">Sobre o curso</h3>
                <p className="text-muted-foreground">{course.description}</p>
              </div>
            </div>
          </div>

          {/* Sidebar - Learning path */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 shadow-card sticky top-24">
              <h3 className="font-bold text-lg text-foreground mb-4">Trilha de Aprendizado</h3>
              <div className="max-h-[500px] overflow-y-auto">
                <div className="space-y-3">
                  {lessons.map((lesson, index) => {
                    const isCompleted = completedLessons.includes(lesson.id);
                    const isCurrent = index === currentLesson;
                    const isLocked = index > currentLesson && !isCompleted;

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          if (!isLocked) {
                            setCurrentLesson(index);
                            setShowVideo(true);
                          }
                        }}
                        disabled={isLocked}
                        className={`w-full p-4 rounded-xl text-left transition-all ${
                          isCompleted
                            ? "bg-accent/10 border-2 border-accent"
                            : isCurrent
                              ? "bg-primary/10 border-2 border-primary shadow-soft"
                              : isLocked
                                ? "bg-muted/50 opacity-50 cursor-not-allowed"
                                : "bg-muted hover:bg-muted/80"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              isCompleted
                                ? "gradient-accent"
                                : isCurrent
                                  ? "gradient-primary"
                                  : "bg-muted-foreground/20"
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-5 h-5 text-accent-foreground" />
                            ) : (
                              <span className="text-sm font-bold">{index + 1}</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground text-sm truncate">
                              {lesson.title}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{lesson.duration}</span>
                              <span>•</span>
                              <span>{lesson.coinsReward} 🪙</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
