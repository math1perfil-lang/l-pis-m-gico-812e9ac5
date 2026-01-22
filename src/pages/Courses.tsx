import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CourseCard } from "@/components/CourseCard";
import { AgeSelector } from "@/components/AgeSelector";
import { CoinDisplay } from "@/components/CoinDisplay";
import { courses, getCoursesForAge } from "@/data/courses";

const categories = [
  "Todos",
  "Linguagem",
  "Matemática",
  "Ciências",
  "Finanças",
  "Tecnologia",
  "História",
  "Idiomas",
];

export default function Courses() {
  const navigate = useNavigate();
  const [selectedAge, setSelectedAge] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses.filter((course) => {
    const ageMatch = !selectedAge || (selectedAge >= course.ageMin && selectedAge <= course.ageMax);
    const categoryMatch = selectedCategory === "Todos" || course.category === selectedCategory;
    const searchMatch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return ageMatch && categoryMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-card/80 backdrop-blur-lg border-b border-border z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Trilha do Conhecimento</h1>
                <p className="text-sm text-muted-foreground">
                  {filteredCourses.length} cursos disponíveis
                </p>
              </div>
            </div>
            <CoinDisplay amount={2340} size="sm" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search and filters */}
        <div className="space-y-6 mb-8">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar cursos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 rounded-xl"
            />
          </div>

          {/* Age selector */}
          <AgeSelector selectedAge={selectedAge} onAgeSelect={setSelectedAge} />

          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "gradient-primary text-primary-foreground shadow-soft"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Courses grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
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
                completedLessons={index % 3 === 0 ? Math.floor(course.totalLessons * 0.5) : 0}
                progress={index % 3 === 0 ? 50 : 0}
                category={course.category}
                onStart={() => navigate(`/course/${course.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Nenhum curso encontrado
            </h3>
            <p className="text-muted-foreground mb-4">
              Tente ajustar os filtros ou busca
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedAge(null);
                setSelectedCategory("Todos");
                setSearchQuery("");
              }}
            >
              Limpar filtros
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
