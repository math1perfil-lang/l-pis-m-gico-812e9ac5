import { useState, type FormEvent } from "react";
import { Eye, EyeOff, GraduationCap, Lock, LogOut, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import logoPandoorga from "@/assets/logo-pandoorga.png";
import { cn } from "@/lib/utils";

type Profile = "gestao" | "docente";

const PROFILES: Record<Profile, { label: string; title: string; hint: string; icon: typeof ShieldCheck }> = {
  gestao: {
    label: "Gestão",
    title: "Acesso da Gestão",
    hint: "Para quem administra toda a plataforma de educação.",
    icon: ShieldCheck,
  },
  docente: {
    label: "Docentes",
    title: "Acesso de Docentes",
    hint: "Para professores e professoras que criam atividades da sua matéria.",
    icon: GraduationCap,
  },
};

// Tela de entrada exclusiva do portal Educação (gestão e docentes).
// Não tem cadastro: as contas são liberadas pela gestão.
export const EducationLogin = ({ blockedEmail }: { blockedEmail?: string | null }) => {
  const { signIn, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile>("gestao");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const p = PROFILES[profile];

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const { error: err } = await signIn(email.trim(), password);
    setBusy(false);
    if (err) setError(/invalid/i.test(err) ? "E-mail ou senha incorretos." : err);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gradient-hero">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <img src={logoPandoorga} alt="Pandoorga" className="h-20 w-auto mx-auto object-contain" />
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-card/80 px-4 py-1.5 text-sm font-bold text-foreground shadow-soft">
            <GraduationCap className="w-4 h-4 text-primary" />
            Portal Educação · Gestão da Educação
          </div>
        </div>

        <div className="bg-card rounded-2xl shadow-card p-8">
          {blockedEmail ? (
            <div className="text-center space-y-4">
              <div className="text-5xl">🔒</div>
              <h1 className="text-xl font-bold text-foreground">Acesso não liberado</h1>
              <p className="text-sm text-muted-foreground">
                A conta <b className="text-foreground">{blockedEmail}</b> ainda não tem permissão neste portal. Peça à gestão para liberar
                o acesso e entre novamente.
              </p>
              <Button className="w-full" variant="outline" onClick={() => signOut()}>
                <LogOut className="w-4 h-4 mr-2" /> Entrar com outra conta
              </Button>
            </div>
          ) : (
            <>
              <div className="flex mb-5 bg-muted rounded-xl p-1" role="tablist" aria-label="Tipo de acesso">
                {(Object.keys(PROFILES) as Profile[]).map((k) => {
                  const Icon = PROFILES[k].icon;
                  return (
                    <button
                      key={k}
                      type="button"
                      role="tab"
                      aria-selected={profile === k}
                      onClick={() => setProfile(k)}
                      className={cn(
                        "flex-1 py-2 px-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all",
                        profile === k ? "gradient-primary text-primary-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Icon className="w-4 h-4" /> {PROFILES[k].label}
                    </button>
                  );
                })}
              </div>

              <h1 className="text-xl font-bold text-foreground">{p.title}</h1>
              <p className="text-sm text-muted-foreground mb-5">{p.hint}</p>

              <form onSubmit={submit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    required
                    autoComplete="username"
                    placeholder="E-mail institucional"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type={show ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    placeholder="Senha"
                    className="pl-10 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShow((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={show ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" className="w-full" disabled={busy}>
                  {busy ? "Entrando..." : `Entrar como ${p.label}`}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-5">
                Não há cadastro aberto: o acesso é liberado pela gestão.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
