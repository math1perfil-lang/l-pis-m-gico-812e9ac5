import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Calendar, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SponsorFooter } from "@/components/SponsorFooter";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [parentName, setParentName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simular autenticação
    setTimeout(() => {
      setLoading(false);
      if (isLogin) {
        toast.success("Bem-vindo de volta! 🎉");
        navigate("/dashboard");
      } else {
        toast.success("Conta criada com sucesso! Vamos começar sua jornada! 🚀");
        navigate("/dashboard");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col gradient-hero">
      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-primary shadow-glow mb-4">
              <span className="text-4xl">🎓</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gradient-primary">EduKids</h1>
            <p className="text-muted-foreground mt-2">
              Aprenda, jogue e transforme seu futuro!
            </p>
          </div>

          {/* Card */}
          <div className="bg-card rounded-2xl shadow-card p-8">
            {/* Tabs */}
            <div className="flex mb-6 bg-muted rounded-xl p-1">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 rounded-lg font-bold transition-all ${
                  isLogin
                    ? "gradient-primary text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Entrar
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 rounded-lg font-bold transition-all ${
                  !isLogin
                    ? "gradient-primary text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Cadastrar
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  {/* Parent name */}
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Nome do responsável"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="pl-10 h-12 rounded-xl"
                      required
                    />
                  </div>

                  {/* Child name */}
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Nome da criança"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      className="pl-10 h-12 rounded-xl"
                      required
                    />
                  </div>

                  {/* Child age */}
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="Idade da criança (6-15 anos)"
                      value={childAge}
                      onChange={(e) => setChildAge(e.target.value)}
                      min="6"
                      max="15"
                      className="pl-10 h-12 rounded-xl"
                      required
                    />
                  </div>
                </>
              )}

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Email do responsável"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 rounded-xl"
                  required
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 rounded-xl"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {!isLogin && (
                /* Facial recognition setup */
                <div className="p-4 rounded-xl bg-primary/10 border-2 border-primary/20">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                      <Camera className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-sm">Reconhecimento Facial</p>
                      <p className="text-xs text-muted-foreground">
                        Configure após o cadastro para garantir a segurança
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                variant="hero"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <span className="animate-pulse">Carregando...</span>
                ) : isLogin ? (
                  "Entrar na Aventura! 🚀"
                ) : (
                  "Criar Minha Conta! 🎮"
                )}
              </Button>
            </form>

            {isLogin && (
              <p className="text-center text-sm text-muted-foreground mt-4">
                Esqueceu a senha?{" "}
                <button className="text-primary font-medium hover:underline">
                  Recuperar
                </button>
              </p>
            )}
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="p-3">
              <div className="text-2xl mb-1">🎮</div>
              <p className="text-xs text-muted-foreground">Aprendizado Gamificado</p>
            </div>
            <div className="p-3">
              <div className="text-2xl mb-1">🪙</div>
              <p className="text-xs text-muted-foreground">Ganhe Moedas Reais</p>
            </div>
            <div className="p-3">
              <div className="text-2xl mb-1">🎁</div>
              <p className="text-xs text-muted-foreground">Troque por Prêmios</p>
            </div>
          </div>
        </div>
      </div>

      <SponsorFooter />
    </div>
  );
}
