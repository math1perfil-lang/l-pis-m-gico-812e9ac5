import { Building2 } from "lucide-react";

const sponsors = [
  { name: "Supermercado Futuro", logo: "🛒" },
  { name: "Banco Crescer", logo: "🏦" },
  { name: "Escola Nova Era", logo: "🎓" },
  { name: "Tech4Kids", logo: "💻" },
  { name: "Livros & Sonhos", logo: "📚" },
  { name: "Nutrição Saudável", logo: "🥗" },
];

export const SponsorFooter = () => {
  return (
    <footer className="w-full bg-card border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-2">
            <Building2 className="w-5 h-5" />
            <span className="text-sm font-medium">Empresas Parceiras</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Apoiando o futuro da educação brasileira
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <span className="text-3xl mb-2">{sponsor.logo}</span>
              <span className="text-xs font-medium text-muted-foreground text-center">
                {sponsor.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 EduKids. Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Transformando educação em oportunidades
          </p>
        </div>
      </div>
    </footer>
  );
};
