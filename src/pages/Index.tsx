import { useNavigate } from "react-router-dom";
import { Play, Star, Gift, Users, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SponsorFooter } from "@/components/SponsorFooter";
import logoPandoorga from "@/assets/logo-pandoorga.png";

const features = [
  {
    icon: "🎮",
    title: "Aprendizado Gamificado",
    description: "Aulas que parecem jogos! Ganhe pontos, conquiste níveis e desbloqueie recompensas.",
  },
  {
    icon: "🪙",
    title: "Moedas Reais",
    description: "Estude e acumule moedas que podem ser trocadas por benefícios para sua família.",
  },
  {
    icon: "🎁",
    title: "Recompensas Incríveis",
    description: "Notebooks, livros, cestas básicas, descontos em escolas e muito mais!",
  },
  {
    icon: "📚",
    title: "Conteúdo por Idade",
    description: "Trilhas personalizadas para crianças de 6 a 15 anos, baseadas em neuropsicopedagogia.",
  },
  {
    icon: "👤",
    title: "Reconhecimento Facial",
    description: "Segurança para garantir que é você mesmo estudando e conquistando suas moedas.",
  },
  {
    icon: "💰",
    title: "Educação Financeira",
    description: "Aprenda sobre dinheiro desde cedo e construa um futuro financeiramente saudável.",
  },
];

const stats = [
  { value: "10.000+", label: "Crianças Beneficiadas" },
  { value: "500+", label: "Cursos Disponíveis" },
  { value: "R$50.000+", label: "Em Benefícios Distribuídos" },
  { value: "98%", label: "Taxa de Satisfação" },
];

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero section */}
      <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 text-6xl animate-float">📚</div>
          <div className="absolute top-40 right-20 text-5xl animate-float" style={{ animationDelay: "0.5s" }}>🎮</div>
          <div className="absolute bottom-40 left-20 text-4xl animate-float" style={{ animationDelay: "1s" }}>🪙</div>
          <div className="absolute bottom-20 right-10 text-5xl animate-float" style={{ animationDelay: "1.5s" }}>🎁</div>
          <div className="absolute top-1/3 left-1/4 text-3xl animate-float" style={{ animationDelay: "0.8s" }}>⭐</div>
          <div className="absolute top-1/2 right-1/4 text-4xl animate-float" style={{ animationDelay: "1.2s" }}>🏆</div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo */}
            <img 
              src={logoPandoorga} 
              alt="Pandoorga" 
              className="h-28 md:h-36 w-auto mx-auto mb-6 animate-scale-in object-contain"
            />

            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-slide-up">
              <span className="text-foreground">Aprenda, Jogue, Transforme!</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }}>
              A plataforma educativa que transforma o aprendizado em oportunidades reais. 
              Crianças de 6 a 15 anos estudam, ganham moedas e ajudam suas famílias!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Button variant="hero" size="xl" onClick={() => navigate("/login")}>
                <Play className="w-5 h-5 mr-2" />
                Começar Agora
              </Button>
              <Button variant="outline" size="xl" onClick={() => navigate("/login")}>
                Já tenho conta
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Quick stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              {stats.map((stat) => (
                <div key={stat.label} className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 shadow-card">
                  <p className="text-2xl md:text-3xl font-extrabold text-gradient-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full gradient-primary text-primary-foreground text-sm font-bold mb-4">
              <Sparkles className="w-4 h-4" />
              Como Funciona
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              Educação que muda vidas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-card rounded-2xl p-6 shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How rewards work */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full gradient-gold text-gold-foreground text-sm font-bold mb-4">
              <Gift className="w-4 h-4" />
              Recompensas
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              Transforme moedas em benefícios reais
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Famílias de baixa renda podem trocar as moedas conquistadas por:
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: "🛒", label: "Cestas Básicas" },
              { icon: "💻", label: "Notebooks" },
              { icon: "📚", label: "Livros" },
              { icon: "🎓", label: "Bolsas de Estudo" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-card rounded-2xl p-6 text-center shadow-card hover:shadow-gold transition-all"
              >
                <div className="text-5xl mb-3">{item.icon}</div>
                <p className="font-bold text-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4">
            Pronto para começar essa aventura?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Cadastre-se gratuitamente e comece a transformar educação em oportunidades hoje mesmo!
          </p>
          <Button
            variant="gold"
            size="xl"
            onClick={() => navigate("/login")}
          >
            Criar Conta Grátis
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      <SponsorFooter />
    </div>
  );
}
