 import { useState } from "react";
 import { useNavigate } from "react-router-dom";
 import { ArrowLeft, ShoppingCart, GraduationCap, Laptop, BookOpen, School } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { CoinDisplay } from "@/components/CoinDisplay";
 import { RewardCard } from "@/components/RewardCard";
import { rewards } from "@/data/rewards";
import { useCoins } from "@/hooks/useCoins";
import { toast } from "sonner";
 
 const categories = [
   { id: "todos", label: "Todos", icon: null },
   { id: "supermercado", label: "Supermercado", icon: ShoppingCart },
   { id: "escola", label: "Escola", icon: School },
   { id: "equipamento", label: "Equipamento", icon: Laptop },
   { id: "livros", label: "Livros", icon: BookOpen },
   { id: "educacao", label: "Educação", icon: GraduationCap },
 ];
 
export default function Rewards() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const { balance: currentCoins, spendCoins } = useCoins();

  const filteredRewards = selectedCategory === "todos"
    ? rewards
    : rewards.filter((reward) => reward.category === selectedCategory);

  const handleRedeem = (rewardId: string, coinsRequired: number) => {
    if (spendCoins(coinsRequired)) {
      toast.success("🎉 Parabéns! Seu prêmio foi resgatado! Verifique seu email.");
    } else {
      toast.error("Moedas insuficientes. Continue estudando!");
    }
  };
 
   return (
     <div className="min-h-screen bg-gradient-to-b from-sky-50 to-background">
       {/* Header */}
       <header className="sticky top-0 bg-white/90 backdrop-blur-lg border-b border-border z-50">
         <div className="container mx-auto px-4 py-3">
           <div className="flex items-center justify-between gap-3">
             <div className="flex items-center gap-3 min-w-0 flex-1">
               <Button variant="ghost" size="icon" className="shrink-0" onClick={() => navigate("/dashboard")}>
                 <ArrowLeft className="w-5 h-5" />
               </Button>
               <div className="min-w-0">
                 <h1 className="text-base sm:text-lg font-bold text-foreground leading-tight truncate">Loja de Recompensas</h1>
                 <p className="text-xs text-muted-foreground truncate">
                   Troque suas moedas por benefícios reais!
                 </p>
               </div>
             </div>
             <CoinDisplay amount={currentCoins} size="sm" />
           </div>
         </div>
       </header>
 
       <main className="container mx-auto px-4 py-6">
         {/* Category filter */}
         <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
           {categories.map((category) => (
             <button
               key={category.id}
               onClick={() => setSelectedCategory(category.id)}
               className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                 selectedCategory === category.id
                   ? "bg-teal-500 text-white shadow-md"
                   : "bg-white text-muted-foreground hover:bg-muted border border-border"
               }`}
             >
               {category.icon && <category.icon className="w-4 h-4" />}
               {category.label}
             </button>
           ))}
         </div>
 
         {/* Rewards list */}
         <div className="space-y-4">
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
       </main>
     </div>
   );
 }