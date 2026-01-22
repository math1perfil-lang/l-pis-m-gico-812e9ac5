import { ShoppingCart, GraduationCap, Laptop, BookOpen, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CoinDisplay } from "./CoinDisplay";
import { cn } from "@/lib/utils";

interface RewardCardProps {
  id: string;
  title: string;
  description: string;
  coinsRequired: number;
  category: "supermercado" | "educacao" | "equipamento" | "livros" | "escola";
  partnerName: string;
  currentCoins: number;
  onRedeem?: () => void;
}

const categoryConfig = {
  supermercado: {
    icon: ShoppingCart,
    gradient: "gradient-secondary",
    label: "Supermercado",
  },
  educacao: {
    icon: GraduationCap,
    gradient: "gradient-primary",
    label: "Educação",
  },
  equipamento: {
    icon: Laptop,
    gradient: "gradient-special",
    label: "Equipamento",
  },
  livros: {
    icon: BookOpen,
    gradient: "gradient-accent",
    label: "Livros",
  },
  escola: {
    icon: Utensils,
    gradient: "gradient-gold",
    label: "Escola",
  },
};

export const RewardCard = ({
  title,
  description,
  coinsRequired,
  category,
  partnerName,
  currentCoins,
  onRedeem,
}: RewardCardProps) => {
  const config = categoryConfig[category];
  const Icon = config.icon;
  const canRedeem = currentCoins >= coinsRequired;
  const progress = Math.min((currentCoins / coinsRequired) * 100, 100);

  return (
    <div className="relative rounded-2xl overflow-hidden bg-card shadow-card hover:shadow-glow transition-all duration-300">
      {/* Header with icon */}
      <div className={cn("p-6", config.gradient)}>
        <div className="flex items-center justify-between">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
            <Icon className="w-7 h-7 text-white" />
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white">
            {config.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <p className="text-xs text-muted-foreground mb-4">
          Parceiro: <span className="font-medium">{partnerName}</span>
        </p>

        {/* Progress to goal */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Seu progresso</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all duration-500", config.gradient)}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="text-muted-foreground">Necessário: </span>
            <CoinDisplay amount={coinsRequired} size="sm" />
          </div>
          <Button
            variant={canRedeem ? "gold" : "outline"}
            size="sm"
            disabled={!canRedeem}
            onClick={onRedeem}
          >
            {canRedeem ? "Resgatar" : "Continuar"}
          </Button>
        </div>
      </div>
    </div>
  );
};
