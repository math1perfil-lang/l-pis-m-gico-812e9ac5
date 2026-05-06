import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  BookOpen,
  Gift,
  User,
  LogOut,
  Menu,
  X,
  Flame,
  Trophy,
  Target,
  PiggyBank,
} from "lucide-react";
import logoPandoorga from "@/assets/logo-pandoorga.png";
import { Button } from "@/components/ui/button";
import { CoinDisplay } from "@/components/CoinDisplay";
import { LevelBadge } from "@/components/LevelBadge";
import { CourseCard } from "@/components/CourseCard";
import { ProgressBar } from "@/components/ProgressBar";
import { StreakDisplay } from "@/components/StreakDisplay";
import { AgeSelector } from "@/components/AgeSelector";
import { courses, getCoursesForAge } from "@/data/courses";
import { useCoins } from "@/hooks/useCoins";
import { cn } from "@/lib/utils";

// Simulated user data
const userData = {
  name: "Maria Silva",
  age: 10,
  avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Maria",
  level: 12,
  xp: 450,
  xpToNextLevel: 600,
  // totalCoins now comes from the shared coins store
  currentStreak: 5,
  longestStreak: 14,
  coursesCompleted: 3,
  lessonsCompleted: 28,
  dailyGoal: 3,
  dailyProgress: 2,
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { balance: totalCoins } = useCoins();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedAge, setSelectedAge] = useState<number | null>(userData.age);

  const filteredCourses = selectedAge
    ? getCoursesForAge(selectedAge)
    : courses.slice(0, 6);

  const menuItems = [
    { icon: Home, label: "Início", path: "/dashboard", active: true },
    { icon: BookOpen, label: "Cursos", path: "/courses" },
    { icon: PiggyBank, label: "Cofrinho", path: "/cofrinho" },
    { icon: Gift, label: "Recompensas", path: "/rewards" },
    { icon: User, label: "Perfil", path: "/profile" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50 px-4 flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-muted"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <img src={logoPandoorga} alt="Pandoorga" className="h-8 w-auto object-contain" />
        <CoinDisplay amount={totalCoins} size="sm" />
      </header>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-40 transform transition-transform duration-300 lg:translate-x-0 flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 pt-20 lg:pt-6 flex-1 overflow-y-auto">
          {/* User info */}
          <div className="bg-muted/50 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <img
                src={userData.avatar}
                alt={userData.name}
                className="w-12 h-12 rounded-full border-2 border-primary"
              />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground truncate">{userData.name}</p>
                <p className="text-xs text-muted-foreground">{userData.age} anos</p>
              </div>
              <LevelBadge level={userData.level} size="sm" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                  item.active
                    ? "gradient-primary text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <div className="p-6 border-t border-border">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all w-full"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:ml-64 pt-20 lg:pt-0">
        <div className="p-4 lg:p-8 max-w-7xl mx-auto">
          {/* Welcome section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-extrabold text-foreground">
                  Olá, {userData.name.split(" ")[0]}! 👋
                </h1>
                <p className="text-muted-foreground">
                  Pronto para mais uma aventura de aprendizado?
                </p>
              </div>
              <div className="hidden lg:flex items-center gap-4">
                <CoinDisplay amount={totalCoins} size="lg" />
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 auto-rows-fr">
            {/* Daily goal */}
            <div className="bg-card rounded-2xl p-5 shadow-card flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Meta Diária</p>
                  <p className="font-bold text-foreground">
                    {userData.dailyProgress}/{userData.dailyGoal} aulas
                  </p>
                </div>
              </div>
              <div className="mt-auto">
                <ProgressBar
                value={userData.dailyProgress}
                max={userData.dailyGoal}
                variant="primary"
                showLabel={false}
                size="sm"
                />
              </div>
            </div>

            {/* Streak */}
            <div className="bg-card rounded-2xl p-5 shadow-card flex flex-col justify-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-secondary flex items-center justify-center">
                  <Flame className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sequência</p>
                  <p className="font-bold text-foreground">{userData.currentStreak} dias 🔥</p>
                </div>
              </div>
            </div>

            {/* Level progress */}
            <div className="bg-card rounded-2xl p-5 shadow-card flex flex-col">
              <LevelBadge 
                level={userData.level} 
                size="sm" 
                showProgress={true}
                xp={userData.xp}
                xpToNextLevel={userData.xpToNextLevel}
                showLevelInBadge={false}
              />
            </div>

            {/* Achievements */}
            <div className="bg-card rounded-2xl p-5 shadow-card flex flex-col justify-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-gold-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cursos Completos</p>
                  <p className="font-bold text-foreground">{userData.coursesCompleted} 🏆</p>
                </div>
              </div>
            </div>
          </div>

          {/* Streak display (mobile) */}
          <div className="lg:hidden mb-8">
            <StreakDisplay
              currentStreak={userData.currentStreak}
              longestStreak={userData.longestStreak}
            />
          </div>

          {/* Age filter */}
          <div className="mb-8">
            <AgeSelector selectedAge={selectedAge} onAgeSelect={setSelectedAge} />
          </div>

          {/* Courses section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">
                Trilha do Conhecimento
                {selectedAge && (
                  <span className="text-primary ml-2">({selectedAge} anos)</span>
                )}
              </h2>
              <Button variant="ghost" asChild>
                <Link to="/courses">Ver todos</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.slice(0, 6).map((course, index) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  description={course.description}
                  image={course.image}
                  ageRange={`${course.ageMin}-${course.ageMax}`}
                  duration={course.duration}
                  coinsReward={course.coinsReward}
                  totalLessons={course.totalLessons}
                  completedLessons={index === 0 ? 5 : index === 1 ? 3 : 0}
                  progress={index === 0 ? 50 : index === 1 ? 30 : 0}
                  category={course.category}
                  isLocked={index > 3}
                  onStart={() => navigate(`/course/${course.id}`)}
                />
              ))}
            </div>
          </section>

          {/* Quick actions */}
          <section className="mt-12">
            <h2 className="text-xl font-bold text-foreground mb-6">Ações Rápidas</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                variant="secondary"
                className="h-auto py-6 flex-col gap-2"
                onClick={() => navigate("/rewards")}
              >
                <Gift className="w-8 h-8" />
                <span>Resgatar Prêmios</span>
              </Button>
              <Button
                variant="accent"
                className="h-auto py-6 flex-col gap-2"
                onClick={() => navigate("/courses")}
              >
                <BookOpen className="w-8 h-8" />
                <span>Explorar Cursos</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-6 flex-col gap-2"
                onClick={() => navigate("/profile")}
              >
                <User className="w-8 h-8" />
                <span>Meu Perfil</span>
              </Button>
              <Button
                variant="special"
                className="h-auto py-6 flex-col gap-2"
              >
                <Trophy className="w-8 h-8" />
                <span>Conquistas</span>
              </Button>
            </div>
          </section>
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
