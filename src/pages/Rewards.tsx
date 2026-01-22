import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, GraduationCap, Laptop, BookOpen, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CoinDisplay } from "@/components/CoinDisplay";
import { RewardCard } from "@/components/RewardCard";
import { rewards } from "@/data/rewards";
import { toast } from "sonner";

const categories = [
  { id: "todos", label: "Todos", icon: null },
  { id: "supermercado", label: "Supermercado", icon: ShoppingCart },
  { id: "escola", label: "Escola", icon: GraduationCap },
  { id: "equipamento", label: "Equipamento", icon: Laptop },
  { id: "livros", label: "Livros", icon: BookOpen },
  { id: "educacao", label: "Educação", icon: Utensils },
];

export default function Rewards() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [currentCoins] = useState(2340);

  const filteredRewards = selectedCategory === "todos"
    ? rewards
    : rewards.filter((reward) => reward.category === selectedCategory);

  const handleRedeem = (rewardId: string, coinsRequired: number) => {
    if (currentCoins >= coinsRequired) {
      toast.success("🎉 Parabéns! Seu prêmio foi resgatado! Verifique seu email.");
    } else {
      toast.error("Moedas insuficientes. Continue estudando!");
    }
  };

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
                <h1 className="text-xl font-bold text-foreground">Loja de Recompensas</h1>
                <p className="text-sm text-muted-foreground">
                  Troque suas moedas por benefícios reais!
                </p>
              </div>
            </div>
            <CoinDisplay amount={currentCoins} size="lg" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Info banner */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 mb-8 border border-primary/20">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="text-5xl">🎁</div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl font-bold text-foreground mb-1">
                Transforme seu aprendizado em oportunidades!
              </h2>
              <p className="text-muted-foreground">
                Cada moeda conquistada pode virar alimentos, material escolar, descontos e muito mais para sua família.
              </p>
            </div>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? "gradient-primary text-primary-foreground shadow-soft"
                  : "bg-card text-muted-foreground hover:bg-muted border border-border"
              }`}
            >
              {category.icon && <category.icon className="w-4 h-4" />}
              {category.label}
            </button>
          ))}
        </div>

        {/* Rewards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRewards.map((reward) => (
            <RewardCard
              key={reward.id}
              id={reward.id}
              title={reward.title}
              description={reward.description}
              coinsRequired={reward.coinsRequired}
              category={reward.category}
              partnerName={reward.partnerName}
              currentCoins={currentCoins}
              onRedeem={() => handleRedeem(reward.id, reward.coinsRequired)}
            />
          ))}
        </div>

        {/* Empty state */}
        {filteredRewards.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Nenhuma recompensa encontrada
            </h3>
            <p className="text-muted-foreground">
              Selecione outra categoria
            </p>
          </div>
        )}

        {/* How it works */}
        <section className="mt-12 bg-card rounded-2xl p-8 shadow-card">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            Como Funciona?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full gradient-primary mx-auto flex items-center justify-center mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="font-bold text-foreground mb-2">1. Estude</h3>
              <p className="text-sm text-muted-foreground">
                Complete aulas e atividades para ganhar moedas
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full gradient-gold mx-auto flex items-center justify-center mb-4">
                <span className="text-2xl">🪙</span>
              </div>
              <h3 className="font-bold text-foreground mb-2">2. Acumule</h3>
              <p className="text-sm text-muted-foreground">
                Suas moedas se acumulam a cada conquista
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full gradient-accent mx-auto flex items-center justify-center mb-4">
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="font-bold text-foreground mb-2">3. Resgate</h3>
              <p className="text-sm text-muted-foreground">
                Troque por benefícios reais para sua família
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
