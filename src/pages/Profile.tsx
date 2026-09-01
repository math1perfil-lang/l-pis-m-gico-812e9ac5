import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Settings, Bell, Shield, HelpCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChildProfile } from "@/components/ChildProfile";
import { CoinDisplay } from "@/components/CoinDisplay";
import { useCoins } from "@/hooks/useCoins";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";

const settingsMenu = [
  { icon: Settings, label: "Configurações", description: "Ajuste preferências do app" },
  { icon: Bell, label: "Notificações", description: "Gerencie alertas e lembretes" },
  { icon: Shield, label: "Privacidade", description: "Controle seus dados" },
  { icon: HelpCircle, label: "Ajuda", description: "Suporte e perguntas frequentes" },
];

export default function Profile() {
  const navigate = useNavigate();
  const { balance: totalCoins, level, xpCurrent, xpToNextLevel, streakDays } = useCoins();
  const { profile } = useProfile();
  const { signOut } = useAuth();
  const userData = {
    name: profile.name,
    age: profile.age ?? 0,
    avatar: profile.avatar,
    level,
    xp: xpCurrent,
    xpToNextLevel,
    currentStreak: streakDays,
    longestStreak: streakDays,
    coursesCompleted: 0,
    lessonsCompleted: 0,
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
                <h1 className="text-xl font-bold text-foreground">Meu Perfil</h1>
                <p className="text-sm text-muted-foreground">Gerencie sua conta</p>
              </div>
            </div>
            <CoinDisplay amount={totalCoins} size="sm" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Child profile */}
        <ChildProfile {...userData} totalCoins={totalCoins} />

        {/* Settings menu */}
        <div className="mt-8 bg-card rounded-2xl shadow-card overflow-hidden">
          <h3 className="font-bold text-foreground p-5 border-b border-border">
            Configurações
          </h3>
          <div className="divide-y divide-border">
            {settingsMenu.map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-4 p-5 hover:bg-muted/50 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Parent info */}
        <div className="mt-8 bg-card rounded-2xl p-6 shadow-card">
          <h3 className="font-bold text-foreground mb-4">Responsável</h3>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <span className="text-xl">👤</span>
            </div>
            <div>
              <p className="font-medium text-foreground">Ana Silva</p>
              <p className="text-sm text-muted-foreground">ana.silva@email.com</p>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="mt-8">
          <Button
            variant="outline"
            className="w-full text-destructive border-destructive/30 hover:bg-destructive/10"
            onClick={async () => {
              await signOut();
              navigate("/");
            }}
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sair da Conta
          </Button>
        </div>

        {/* App version */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          Pandoorga v1.0.0 • Transformando educação em oportunidades
        </p>
      </main>
    </div>
  );
}
