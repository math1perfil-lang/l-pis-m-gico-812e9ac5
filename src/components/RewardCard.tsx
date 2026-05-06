import { ShoppingCart, GraduationCap, Laptop, BookOpen, Utensils, Drama } from "lucide-react";
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
    bgColor: "bg-gradient-to-r from-amber-400 to-orange-400",
    label: "Supermercado",
  },
  educacao: {
    icon: GraduationCap,
    bgColor: "bg-gradient-to-r from-teal-400 to-cyan-400",
    label: "Educação",
  },
  equipamento: {
    icon: Laptop,
    bgColor: "bg-gradient-to-r from-purple-400 to-indigo-400",
    label: "Equipamento",
  },
  livros: {
    icon: BookOpen,
    bgColor: "bg-gradient-to-r from-green-400 to-emerald-400",
    label: "Livros",
  },
  escola: {
    icon: Utensils,
    bgColor: "bg-gradient-to-r from-pink-400 to-rose-400",
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
  const overrideIcon: Record<string, typeof Drama> = {
    "ingresso-teatro": Drama,
    "bolsa-integral": GraduationCap,
  };
  const Icon = overrideIcon[arguments[0]?.id] || config.icon;
  const canRedeem = currentCoins >= coinsRequired;
  const progress = Math.min((currentCoins / coinsRequired) * 100, 100);

  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100">
      {/* Header */}
      <div className={cn("px-5 py-4", config.bgColor)}>
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/30 text-white">
            {config.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
        <p className="text-xs text-muted-foreground mb-3">
          Parceiro: <span className="font-medium">{partnerName}</span>
        </p>

        {/* Progress to goal */}
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1 text-amber-600">
            <span className="text-muted-foreground">Seu progresso</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 bg-amber-400"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-sm">
            <span className="text-muted-foreground">Necessário: </span>
            <CoinDisplay amount={coinsRequired} size="sm" />
          </div>
          <button
            className={cn(
              "px-4 py-2 rounded-full text-sm font-semibold transition-all",
              canRedeem
                ? "bg-amber-100 text-amber-700 hover:bg-amber-200 border border-amber-300"
                : "bg-gray-100 text-gray-400 border border-gray-200"
            )}
            disabled={!canRedeem}
            onClick={onRedeem}
          >
            {canRedeem ? "Resgatar" : "Continuar"}
          </button>
        </div>
      </div>
    </div>
  );
};
