import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  PiggyBank,
  Plus,
  Trash2,
  ArrowDownCircle,
  ArrowUpCircle,
  Target,
  TrendingUp,
  Sparkles,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CoinDisplay } from "@/components/CoinDisplay";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useCoins } from "@/hooks/useCoins";

interface DreamBox {
  id: string;
  name: string;
  emoji: string;
  goal: number;
  saved: number;
  color: string;
}

const emojiOptions = ["🎯", "🚲", "🎮", "✈️", "📱", "🎸", "⚽", "🎨", "📚", "🏠", "🎁", "💝"];
const colorOptions = [
  "from-pink-400 to-rose-400",
  "from-purple-400 to-indigo-400",
  "from-sky-400 to-cyan-400",
  "from-emerald-400 to-teal-400",
  "from-amber-400 to-orange-400",
  "from-fuchsia-400 to-pink-400",
];

export default function Cofrinho() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { balance, addCoins, spendCoins } = useCoins();
  const [boxes, setBoxes] = useState<DreamBox[]>([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [transferOpen, setTransferOpen] = useState<DreamBox | null>(null);
  const [withdrawOpen, setWithdrawOpen] = useState<DreamBox | null>(null);
  const [transferAmount, setTransferAmount] = useState("");
  const [newBox, setNewBox] = useState({ name: "", goal: "", emoji: "🎯", color: colorOptions[0] });

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      const { data } = await supabase
        .from("dream_boxes")
        .select("id, name, goal_coins, saved_coins, icon, color")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });
      setBoxes(
        (data ?? []).map((b) => ({
          id: b.id,
          name: b.name,
          emoji: b.icon ?? "🎯",
          goal: b.goal_coins ?? 0,
          saved: b.saved_coins ?? 0,
          color: b.color ?? colorOptions[0],
        }))
      );
    };
    load();
  }, [user]);

  const totalSaved = boxes.reduce((sum, b) => sum + b.saved, 0);
  const totalGoal = boxes.reduce((sum, b) => sum + b.goal, 0);
  const totalCoinsAcumuladas = balance + totalSaved;

  const handleCreate = async () => {
    const goal = parseInt(newBox.goal);
    if (!newBox.name.trim() || !goal || goal <= 0) {
      toast.error("Preencha o nome e a meta da caixinha");
      return;
    }
    if (!user) return;
    const { data, error } = await supabase
      .from("dream_boxes")
      .insert({
        user_id: user.id,
        name: newBox.name.trim(),
        goal_coins: goal,
        saved_coins: 0,
        icon: newBox.emoji,
        color: newBox.color,
      })
      .select("id")
      .single();
    if (error || !data) {
      toast.error("Não foi possível criar a caixinha");
      return;
    }
    setBoxes([
      ...boxes,
      { id: data.id, name: newBox.name.trim(), emoji: newBox.emoji, color: newBox.color, goal, saved: 0 },
    ]);
    setNewBox({ name: "", goal: "", emoji: "🎯", color: colorOptions[0] });
    setCreateOpen(false);
    toast.success("Caixinha criada! 🎉");
  };

  const handleDelete = async (id: string) => {
    const box = boxes.find((b) => b.id === id);
    if (!box) return;
    await supabase.from("dream_boxes").delete().eq("id", id);
    if (box.saved > 0) addCoins(box.saved, `Caixinha excluída: ${box.name}`, id);
    setBoxes(boxes.filter((b) => b.id !== id));
    toast.success(`Caixinha excluída. ${box.saved} moedas voltaram ao saldo.`);
  };

  const updateSaved = async (id: string, saved: number) => {
    await supabase.from("dream_boxes").update({ saved_coins: saved }).eq("id", id);
    setBoxes((prev) => prev.map((b) => (b.id === id ? { ...b, saved } : b)));
  };

  const handleTransfer = async () => {
    if (!transferOpen) return;
    const amount = parseInt(transferAmount);
    if (!amount || amount <= 0) {
      toast.error("Informe um valor válido");
      return;
    }
    if (amount > balance) {
      toast.error("Saldo insuficiente");
      return;
    }
    spendCoins(amount, `Guardado em: ${transferOpen.name}`, transferOpen.id);
    await updateSaved(transferOpen.id, transferOpen.saved + amount);
    toast.success(`${amount} moedas guardadas em "${transferOpen.name}"! 🐷`);
    setTransferAmount("");
    setTransferOpen(null);
  };

  const handleWithdraw = async () => {
    if (!withdrawOpen) return;
    const amount = parseInt(transferAmount);
    if (!amount || amount <= 0) {
      toast.error("Informe um valor válido");
      return;
    }
    if (amount > withdrawOpen.saved) {
      toast.error("A caixinha não tem moedas suficientes");
      return;
    }
    addCoins(amount, `Resgate da caixinha: ${withdrawOpen.name}`, withdrawOpen.id);
    await updateSaved(withdrawOpen.id, withdrawOpen.saved - amount);
    toast.success(`${amount} moedas voltaram ao seu saldo!`);
    setTransferAmount("");
    setWithdrawOpen(null);
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-background to-background">
      <header className="sticky top-0 bg-white/90 backdrop-blur-lg border-b border-border z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <Button variant="ghost" size="icon" className="shrink-0" onClick={() => navigate("/dashboard")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg font-bold text-foreground leading-tight truncate flex items-center gap-2">
                  <PiggyBank className="w-5 h-5 text-amber-500" />
                  Meu Cofrinho
                </h1>
                <p className="text-xs text-muted-foreground truncate">
                  Aprenda a poupar para conquistar seus sonhos
                </p>
              </div>
            </div>
            <CoinDisplay amount={balance} size="sm" clickable={false} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-5xl">
        {/* Saldo principal */}
        <section className="mb-6">
          <div className="rounded-3xl bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 p-6 text-white shadow-lg">
            <p className="text-sm opacity-90 font-medium">Saldo disponível</p>
            <div className="flex items-end justify-between mt-1">
              <div>
                <p className="text-4xl font-extrabold">{balance.toLocaleString()}</p>
                <p className="text-xs opacity-90 mt-1">moedas para usar ou guardar</p>
              </div>
              <PiggyBank className="w-16 h-16 opacity-30" />
            </div>
          </div>
        </section>

        {/* Métricas */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <MetricCard icon={Sparkles} label="Total acumulado" value={totalCoinsAcumuladas.toLocaleString()} color="text-amber-600" bg="bg-amber-50" />
          <MetricCard icon={PiggyBank} label="Guardado" value={totalSaved.toLocaleString()} color="text-pink-600" bg="bg-pink-50" />
          <MetricCard icon={Target} label="Caixinhas" value={String(boxes.length)} color="text-purple-600" bg="bg-purple-50" />
          <MetricCard icon={Trophy} label="Sonhos prontos" value={String(boxes.filter((b) => b.saved >= b.goal).length)} color="text-emerald-600" bg="bg-emerald-50" />
        </section>

        {/* Educação financeira */}
        <section className="mb-8 rounded-2xl bg-sky-50 border border-sky-100 p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-1">Dica de educação financeira</h3>
              <p className="text-sm text-muted-foreground">
                Guardar um pouquinho de cada vez é a melhor forma de conquistar grandes sonhos.
                Crie caixinhas, defina metas e acompanhe seu progresso.
              </p>
            </div>
          </div>
        </section>

        {/* Caixinhas */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Caixinhas de Sonhos</h2>
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="rounded-full">
                  <Plus className="w-4 h-4 mr-1" /> Nova caixinha
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar nova caixinha</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Nome do sonho</Label>
                    <Input
                      value={newBox.name}
                      onChange={(e) => setNewBox({ ...newBox, name: e.target.value })}
                      placeholder="Ex: Bicicleta nova"
                    />
                  </div>
                  <div>
                    <Label>Meta de moedas</Label>
                    <Input
                      type="number"
                      value={newBox.goal}
                      onChange={(e) => setNewBox({ ...newBox, goal: e.target.value })}
                      placeholder="3000"
                    />
                  </div>
                  <div>
                    <Label>Ícone</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {emojiOptions.map((e) => (
                        <button
                          key={e}
                          onClick={() => setNewBox({ ...newBox, emoji: e })}
                          className={cn(
                            "w-10 h-10 rounded-full text-xl flex items-center justify-center border-2 transition-all",
                            newBox.emoji === e ? "border-primary bg-primary/10" : "border-transparent bg-muted"
                          )}
                        >
                          {e}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Cor</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {colorOptions.map((c) => (
                        <button
                          key={c}
                          onClick={() => setNewBox({ ...newBox, color: c })}
                          className={cn(
                            "w-10 h-10 rounded-full bg-gradient-to-br ring-2 ring-offset-2 transition-all",
                            c,
                            newBox.color === c ? "ring-foreground" : "ring-transparent"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreate}>Criar caixinha</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {boxes.length === 0 ? (
            <div className="text-center py-12 rounded-2xl border-2 border-dashed border-border">
              <PiggyBank className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">
                Você ainda não tem caixinhas. Crie a primeira e comece a poupar!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {boxes.map((box) => {
                const progress = Math.min((box.saved / box.goal) * 100, 100);
                const completed = box.saved >= box.goal;
                return (
                  <div key={box.id} className="rounded-2xl bg-white border border-border overflow-hidden shadow-sm">
                    <div className={cn("p-4 bg-gradient-to-r text-white flex items-center justify-between", box.color)}>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center text-2xl">
                          {box.emoji}
                        </div>
                        <div>
                          <h3 className="font-bold">{box.name}</h3>
                          <p className="text-xs opacity-90">Meta: {box.goal.toLocaleString()} moedas</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(box.id)}
                        className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                        aria-label="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-muted-foreground">{box.saved.toLocaleString()} guardadas</span>
                        <span className={cn("font-semibold", completed ? "text-emerald-600" : "text-amber-600")}>
                          {Math.round(progress)}%
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-500 bg-gradient-to-r",
                            box.color
                          )}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => {
                            setTransferAmount("");
                            setTransferOpen(box);
                          }}
                        >
                          <ArrowDownCircle className="w-4 h-4 mr-1" /> Guardar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          disabled={box.saved <= 0}
                          onClick={() => {
                            setTransferAmount("");
                            setWithdrawOpen(box);
                          }}
                        >
                          <ArrowUpCircle className="w-4 h-4 mr-1" /> Resgatar
                        </Button>
                      </div>
                      {completed && (
                        <p className="text-xs text-emerald-600 font-semibold mt-2 text-center">
                          🎉 Sonho conquistado! Você pode resgatar e realizar.
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Transferir */}
      <Dialog open={!!transferOpen} onOpenChange={(o) => !o && setTransferOpen(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Guardar em "{transferOpen?.name}"</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Label>Quantas moedas?</Label>
            <Input
              type="number"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              placeholder="100"
            />
            <p className="text-xs text-muted-foreground">Saldo disponível: {balance.toLocaleString()} moedas</p>
          </div>
          <DialogFooter>
            <Button onClick={handleTransfer}>Guardar moedas</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Resgatar */}
      <Dialog open={!!withdrawOpen} onOpenChange={(o) => !o && setWithdrawOpen(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resgatar de "{withdrawOpen?.name}"</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Label>Quantas moedas?</Label>
            <Input
              type="number"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              placeholder="100"
            />
            <p className="text-xs text-muted-foreground">
              Guardadas nesta caixinha: {withdrawOpen?.saved.toLocaleString()} moedas
            </p>
          </div>
          <DialogFooter>
            <Button onClick={handleWithdraw}>Resgatar moedas</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  color,
  bg,
}: {
  icon: any;
  label: string;
  value: string;
  color: string;
  bg: string;
}) {
  return (
    <div className="rounded-2xl bg-white border border-border p-4">
      <div className={cn("w-9 h-9 rounded-full flex items-center justify-center mb-2", bg)}>
        <Icon className={cn("w-4 h-4", color)} />
      </div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-bold text-foreground text-lg leading-tight">{value}</p>
    </div>
  );
}
