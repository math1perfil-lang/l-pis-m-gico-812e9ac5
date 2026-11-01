import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Calendar, Camera } from "lucide-react";
import logoPandoorga from "@/assets/logo-pandoorga.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SponsorFooter } from "@/components/SponsorFooter";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  // Volta para a página de onde a pessoa veio (ex.: painel de educação); por padrão, o app dos alunos.
  const fromState = (location.state as { from?: string } | null)?.from;
  const destination = fromState && fromState.startsWith("/") && !fromState.startsWith("//") ? fromState : "/dashboard";
  const { user, loading: authLoading, signIn, signUp, signInWithGoogle } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [parentName, setParentName] = useState("");

  useEffect(() => {
    if (!authLoading && user) navigate(destination, { replace: true });
  }, [authLoading, user, navigate, destination]);

  const translateError = (msg: string) => {
    if (/Invalid login credentials/i.test(msg)) return "E-mail ou senha incorretos.";
    if (/already registered|User already/i.test(msg))
      return "Este e-mail já possui uma conta. Faça login.";
    if (/Password should be at least/i.test(msg))
      return "A senha deve ter pelo menos 6 caracteres.";
    if (/Email not confirmed/i.test(msg)) return "Confirme seu e-mail para entrar.";
    return msg;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { error } = await signIn(email.trim(), password);
      setLoading(false);
      if (error) {
        toast.error(translateError(error));
        return;
      }
      toast.success("Bem-vindo de volta! 🎉");
      navigate(destination);
    } else {
      const { error } = await signUp({
        email: email.trim(),
        password,
        childName: childName.trim() || "Aluno",
        childAge: childAge ? parseInt(childAge, 10) : undefined,
        parentName: parentName.trim(),
      });
      setLoading(false);
      if (error) {
        toast.error(translateError(error));
        return;
      }
      toast.success("Conta criada! Sua jornada começa do zero. 🚀");
      navigate(destination);
    }
  };

  const handleGoogle = async () => {
    const { error } = await signInWithGoogle();
    if (error) toast.error(translateError(error));
  };


  return (
    <div className="min-h-screen flex flex-col gradient-hero">
      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <img 
              src={logoPandoorga} 
              alt="Pandoorga" 
              className="h-20 w-auto mx-auto object-contain"
            />
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

            <div className="flex items-center gap-3 my-4">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">ou</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 rounded-xl font-bold"
              onClick={handleGoogle}
            >
              Continuar com Google
            </Button>


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
