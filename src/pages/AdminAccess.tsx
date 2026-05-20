import { useState } from "react";
import {
  LayoutDashboard, Brain, Wallet, Trophy, Users, Sparkles, TrendingUp,
  Store, Leaf, Gift, FileText, Settings, Search, Bell, ChevronRight,
  Activity, Zap, Globe, Target, Award, Heart, BarChart3, Download,
  ArrowUpRight, ArrowDownRight, Cpu, Radio, Shield, MapPin, BookOpen,
  Coins, Star, Flame, Medal, Baby, Home, Lightbulb, AlertTriangle,
  DollarSign, ShoppingBag, TreePine, FileBarChart, Cog,
} from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { cn } from "@/lib/utils";

// ────────────────────────────────────────────────────────────────────
// DESIGN TOKENS (inline for this admin shell)
// ────────────────────────────────────────────────────────────────────
const ACCENT = {
  blue: "#3B82F6",
  cyan: "#06B6D4",
  green: "#10B981",
  gold: "#F5C24D",
  violet: "#8B5CF6",
  pink: "#EC4899",
  red: "#EF4444",
};

const CHART_COLORS = [ACCENT.blue, ACCENT.cyan, ACCENT.green, ACCENT.gold, ACCENT.violet, ACCENT.pink];

// ────────────────────────────────────────────────────────────────────
// MOCK DATA
// ────────────────────────────────────────────────────────────────────
const weeklyGrowth = [
  { d: "Seg", users: 4200, learning: 3100, impact: 2400 },
  { d: "Ter", users: 4800, learning: 3600, impact: 2900 },
  { d: "Qua", users: 5400, learning: 4200, impact: 3300 },
  { d: "Qui", users: 6100, learning: 4900, impact: 3800 },
  { d: "Sex", users: 7200, learning: 5800, impact: 4500 },
  { d: "Sáb", users: 8400, learning: 6900, impact: 5300 },
  { d: "Dom", users: 9100, learning: 7600, impact: 6100 },
];

const regions = [
  { name: "Sudeste", value: 42, families: 18420 },
  { name: "Nordeste", value: 28, families: 12280 },
  { name: "Sul", value: 14, families: 6140 },
  { name: "Centro-Oeste", value: 9, families: 3950 },
  { name: "Norte", value: 7, families: 3070 },
];

const subjects = [
  { name: "Alfabetização", access: 92, retention: 88 },
  { name: "Matemática", access: 84, retention: 79 },
  { name: "Ciências", access: 71, retention: 74 },
  { name: "Ed. Financeira", access: 68, retention: 82 },
  { name: "Inglês", access: 54, retention: 67 },
  { name: "História", access: 47, retention: 71 },
];

const cognitive = [
  { skill: "Leitura", A: 86 },
  { skill: "Lógica", A: 78 },
  { skill: "Memória", A: 82 },
  { skill: "Atenção", A: 74 },
  { skill: "Criatividade", A: 88 },
  { skill: "Resolução", A: 80 },
];

const partners = [
  { name: "Atacadão Brasil", families: 4820, flow: "R$ 184k", growth: 18 },
  { name: "Rede Verde", families: 3210, flow: "R$ 128k", growth: 12 },
  { name: "SuperFamília", families: 2870, flow: "R$ 96k", growth: 9 },
  { name: "Mercado Bom", families: 1940, flow: "R$ 72k", growth: -3 },
  { name: "Compre Aqui", families: 1640, flow: "R$ 58k", growth: 7 },
];

const rewards = [
  { name: "Cesta Básica", redeemed: 8420, impact: "R$ 420k" },
  { name: "Material Escolar", redeemed: 6310, impact: "R$ 189k" },
  { name: "Livros", redeemed: 4870, impact: "R$ 97k" },
  { name: "Vale Higiene", redeemed: 3920, impact: "R$ 78k" },
  { name: "Brinquedos Edu.", redeemed: 2840, impact: "R$ 57k" },
];

// ────────────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
// ────────────────────────────────────────────────────────────────────
const Panel = ({ children, className = "" }: any) => (
  <div className={cn(
    "rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl",
    "shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-5",
    className,
  )}>
    {children}
  </div>
);

const Stat = ({ icon: Icon, label, value, delta, tone = "blue" }: any) => {
  const up = delta >= 0;
  return (
    <Panel className="relative overflow-hidden group hover:border-white/10 transition-all">
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-20 blur-2xl"
        style={{ background: ACCENT[tone as keyof typeof ACCENT] }} />
      <div className="flex items-start justify-between relative">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-white/40 font-medium">{label}</div>
          <div className="mt-2 text-2xl font-bold text-white tabular-nums">{value}</div>
          {delta !== undefined && (
            <div className={cn("mt-1 inline-flex items-center gap-1 text-xs font-semibold",
              up ? "text-emerald-400" : "text-rose-400")}>
              {up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {Math.abs(delta)}% vs semana anterior
            </div>
          )}
        </div>
        <div className="p-2.5 rounded-xl border border-white/10"
          style={{ background: `${ACCENT[tone as keyof typeof ACCENT]}15` }}>
          <Icon className="w-5 h-5" style={{ color: ACCENT[tone as keyof typeof ACCENT] }} />
        </div>
      </div>
    </Panel>
  );
};

const SectionTitle = ({ icon: Icon, title, subtitle }: any) => (
  <div className="flex items-center justify-between mb-5">
    <div className="flex items-center gap-3">
      {Icon && (
        <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-white/10">
          <Icon className="w-4 h-4 text-cyan-300" />
        </div>
      )}
      <div>
        <h2 className="text-lg font-bold text-white">{title}</h2>
        {subtitle && <p className="text-xs text-white/40">{subtitle}</p>}
      </div>
    </div>
  </div>
);

const ChartFrame = ({ title, children, action }: any) => (
  <Panel>
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-semibold text-white/80">{title}</h3>
      {action}
    </div>
    <div className="h-64">{children}</div>
  </Panel>
);

const Insight = ({ icon: Icon = Lightbulb, text, tone = "blue" }: any) => (
  <div className="flex gap-3 p-4 rounded-xl border border-white/5 bg-gradient-to-r from-white/[0.03] to-transparent">
    <div className="p-2 h-fit rounded-lg" style={{ background: `${ACCENT[tone as keyof typeof ACCENT]}20` }}>
      <Icon className="w-4 h-4" style={{ color: ACCENT[tone as keyof typeof ACCENT] }} />
    </div>
    <p className="text-sm text-white/70 leading-relaxed">{text}</p>
  </div>
);

const tooltipStyle = {
  background: "rgba(10,14,28,0.95)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 12,
  color: "white",
  fontSize: 12,
};

// ────────────────────────────────────────────────────────────────────
// MODULES
// ────────────────────────────────────────────────────────────────────
const OverviewModule = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Stat icon={Activity} label="Crianças ativas agora" value="12.847" delta={14} tone="blue" />
      <Stat icon={BookOpen} label="Horas de aprendizado" value="284.5k" delta={22} tone="cyan" />
      <Stat icon={Gift} label="Benefícios distribuídos" value="48.291" delta={8} tone="green" />
      <Stat icon={DollarSign} label="Impacto econômico" value="R$ 2.84M" delta={31} tone="gold" />
      <Stat icon={Zap} label="Engajamento médio" value="87%" delta={4} tone="violet" />
      <Stat icon={TrendingUp} label="Evolução semanal" value="+18.2%" delta={5} tone="pink" />
      <Stat icon={Store} label="Parceiros ativos" value="346" delta={11} tone="cyan" />
      <Stat icon={Heart} label="Retenção 30d" value="92%" delta={-1} tone="green" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <ChartFrame title="Crescimento e impacto — 7 dias">
        <ResponsiveContainer>
          <AreaChart data={weeklyGrowth}>
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={ACCENT.blue} stopOpacity={0.5} />
                <stop offset="100%" stopColor={ACCENT.blue} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={ACCENT.green} stopOpacity={0.45} />
                <stop offset="100%" stopColor={ACCENT.green} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="d" stroke="rgba(255,255,255,0.4)" fontSize={11} />
            <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="users" stroke={ACCENT.blue} fill="url(#g1)" strokeWidth={2} />
            <Area type="monotone" dataKey="impact" stroke={ACCENT.green} fill="url(#g2)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartFrame>

      <ChartFrame title="Distribuição regional">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={regions} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>
              {regions.map((_, i) => <Cell key={i} fill={CHART_COLORS[i]} stroke="transparent" />)}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }} />
          </PieChart>
        </ResponsiveContainer>
      </ChartFrame>

      <Panel>
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-4 h-4 text-cyan-300" />
          <h3 className="text-sm font-semibold text-white/80">Mapa de impacto — Brasil</h3>
        </div>
        <div className="space-y-3">
          {regions.map((r, i) => (
            <div key={r.name}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/70">{r.name}</span>
                <span className="text-white/40 tabular-nums">{r.families.toLocaleString()} fam.</span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full rounded-full"
                  style={{ width: `${r.value * 2.2}%`, background: `linear-gradient(90deg, ${CHART_COLORS[i]}, ${CHART_COLORS[i]}80)` }} />
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { icon: Users, label: "Famílias impactadas", value: "43.860", tone: "blue" },
        { icon: BookOpen, label: "Acesso educacional", value: "284.502h", tone: "cyan" },
        { icon: Coins, label: "Inclusão econômica", value: "R$ 2.84M", tone: "gold" },
        { icon: Wallet, label: "Ed. financeira ativa", value: "31.420", tone: "green" },
      ].map((esg) => (
        <Panel key={esg.label} className="border-l-2" >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl" style={{ background: `${ACCENT[esg.tone as keyof typeof ACCENT]}18` }}>
              <esg.icon className="w-5 h-5" style={{ color: ACCENT[esg.tone as keyof typeof ACCENT] }} />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-white/40">{esg.label}</div>
              <div className="text-xl font-bold text-white">{esg.value}</div>
              <div className="text-[10px] text-emerald-400 mt-0.5">ESG · em tempo real</div>
            </div>
          </div>
        </Panel>
      ))}
    </div>
  </div>
);

const EducationModule = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Stat icon={Brain} label="Evolução cognitiva" value="+24%" delta={6} tone="violet" />
      <Stat icon={BookOpen} label="Tempo médio /sessão" value="18min" delta={3} tone="cyan" />
      <Stat icon={Target} label="Retenção média" value="84%" delta={2} tone="green" />
      <Stat icon={Award} label="Conteúdos eficientes" value="142" delta={9} tone="gold" />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ChartFrame title="Acesso vs Retenção por matéria">
        <ResponsiveContainer>
          <BarChart data={subjects}>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={10} />
            <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="access" fill={ACCENT.blue} radius={[6, 6, 0, 0]} />
            <Bar dataKey="retention" fill={ACCENT.green} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartFrame>
      <ChartFrame title="Evolução cognitiva — radar">
        <ResponsiveContainer>
          <RadarChart data={cognitive}>
            <PolarGrid stroke="rgba(255,255,255,0.08)" />
            <PolarAngleAxis dataKey="skill" tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11 }} />
            <PolarRadiusAxis stroke="rgba(255,255,255,0.1)" tick={false} />
            <Radar dataKey="A" stroke={ACCENT.cyan} fill={ACCENT.cyan} fillOpacity={0.35} />
          </RadarChart>
        </ResponsiveContainer>
      </ChartFrame>
    </div>
    <Panel>
      <SectionTitle icon={Cpu} title="IA educacional" subtitle="Insights gerados automaticamente" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Insight tone="green" text="Crianças expostas à Alfabetização Divertida por 5+ sessões têm 38% mais retenção em Matemática." />
        <Insight tone="gold" icon={AlertTriangle} text="42 crianças em risco de abandono nesta semana — recomendação de missão personalizada enviada." />
        <Insight tone="violet" icon={Sparkles} text="Conteúdo 'Sons das Letras' identificado como mais eficiente para 6-8 anos. Replicar formato." />
        <Insight tone="cyan" text="Dificuldade média do módulo Inglês acima do esperado. Sugerido ajuste adaptativo automático." />
      </div>
    </Panel>
  </div>
);

const FinanceModule = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Stat icon={Coins} label="Moedas acumuladas" value="8.42M" delta={19} tone="gold" />
      <Stat icon={Wallet} label="Taxa de economia" value="64%" delta={7} tone="green" />
      <Stat icon={Target} label="Índice planejamento" value="78/100" delta={3} tone="cyan" />
      <Stat icon={Brain} label="Consciência financeira" value="+22%" delta={5} tone="violet" />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ChartFrame title="Comportamento financeiro semanal">
        <ResponsiveContainer>
          <LineChart data={weeklyGrowth}>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="d" stroke="rgba(255,255,255,0.4)" fontSize={11} />
            <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="impact" stroke={ACCENT.gold} strokeWidth={3} dot={{ r: 4, fill: ACCENT.gold }} />
            <Line type="monotone" dataKey="learning" stroke={ACCENT.green} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </ChartFrame>
      <ChartFrame title="Recompensas mais escolhidas">
        <ResponsiveContainer>
          <BarChart data={rewards} layout="vertical">
            <CartesianGrid stroke="rgba(255,255,255,0.04)" />
            <XAxis type="number" stroke="rgba(255,255,255,0.4)" fontSize={11} />
            <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.5)" fontSize={11} width={110} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="redeemed" fill={ACCENT.cyan} radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartFrame>
    </div>
    <Insight tone="gold" icon={Lightbulb} text="Crianças que acumulam moedas por mais de 7 dias antes de trocar demonstram 41% mais retenção educacional." />
  </div>
);

const GamificationModule = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Stat icon={Trophy} label="Missões completas" value="184.2k" delta={16} tone="gold" />
      <Stat icon={Flame} label="Streak médio" value="6.4 dias" delta={9} tone="pink" />
      <Stat icon={Medal} label="Badges conquistadas" value="48.1k" delta={12} tone="violet" />
      <Stat icon={Star} label="Nível médio" value="14.7" delta={4} tone="cyan" />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Panel className="lg:col-span-2">
        <h3 className="text-sm font-semibold text-white/80 mb-4">Ranking de progressão</h3>
        <div className="space-y-3">
          {["Ana, 7", "Lucas, 9", "Sofia, 8", "Pedro, 10", "Helena, 6"].map((n, i) => (
            <div key={n} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
                style={{ background: `linear-gradient(135deg, ${CHART_COLORS[i]}, ${CHART_COLORS[i]}60)` }}>
                {i + 1}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white">{n}</div>
                <div className="text-xs text-white/40">Nível {28 - i * 3} · {1480 - i * 120} XP</div>
              </div>
              <div className="h-2 w-24 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full" style={{ width: `${95 - i * 8}%`, background: CHART_COLORS[i] }} />
              </div>
            </div>
          ))}
        </div>
      </Panel>
      <ChartFrame title="Engajamento por recompensa">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={rewards} dataKey="redeemed" nameKey="name" innerRadius={45} outerRadius={85}>
              {rewards.map((_, i) => <Cell key={i} fill={CHART_COLORS[i]} />)}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
      </ChartFrame>
    </div>
  </div>
);

const FamiliesModule = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Stat icon={Home} label="Famílias ativas" value="43.860" delta={11} tone="blue" />
      <Stat icon={Baby} label="Crianças cadastradas" value="58.214" delta={14} tone="cyan" />
      <Stat icon={Heart} label="Recorrência" value="78%" delta={3} tone="pink" />
      <Stat icon={DollarSign} label="Impacto acumulado" value="R$ 12.4M" delta={28} tone="gold" />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Panel>
        <h3 className="text-sm font-semibold text-white/80 mb-4">Jornadas em destaque</h3>
        <div className="space-y-4">
          {[
            { n: "Família Silva", c: "3 crianças", h: "142h aprendizado · R$ 480 em benefícios" },
            { n: "Família Rocha", c: "2 crianças", h: "98h aprendizado · R$ 320 em benefícios" },
            { n: "Família Lima", c: "4 crianças", h: "186h aprendizado · R$ 612 em benefícios" },
          ].map((f) => (
            <div key={f.n} className="p-4 rounded-xl border border-white/5 bg-gradient-to-r from-rose-500/5 to-transparent">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-600 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{f.n}</div>
                  <div className="text-xs text-white/40">{f.c}</div>
                </div>
              </div>
              <div className="text-xs text-white/60">{f.h}</div>
            </div>
          ))}
        </div>
      </Panel>
      <ChartFrame title="Engajamento familiar — evolução">
        <ResponsiveContainer>
          <AreaChart data={weeklyGrowth}>
            <defs>
              <linearGradient id="gFam" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={ACCENT.pink} stopOpacity={0.5} />
                <stop offset="100%" stopColor={ACCENT.pink} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="d" stroke="rgba(255,255,255,0.4)" fontSize={11} />
            <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="users" stroke={ACCENT.pink} fill="url(#gFam)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartFrame>
    </div>
  </div>
);

const PredictiveModule = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Stat icon={Cpu} label="Modelos ativos" value="14" tone="violet" />
      <Stat icon={AlertTriangle} label="Em risco de evasão" value="284" delta={-12} tone="red" />
      <Stat icon={Radio} label="Predições/dia" value="48.2k" delta={22} tone="cyan" />
      <Stat icon={Shield} label="Precisão média" value="94.2%" delta={2} tone="green" />
    </div>
    <Panel>
      <SectionTitle icon={Sparkles} title="Insights neurais em tempo real" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Insight tone="red" icon={AlertTriangle} text="Padrão de queda detectado: 184 crianças com engajamento -40% nos últimos 5 dias. Intervenção sugerida." />
        <Insight tone="violet" icon={Brain} text="Cluster identificado: 6-8 anos respondem 2.3x melhor a vídeos curtos (<3min) com música." />
        <Insight tone="cyan" text="Dificuldade adaptativa ajustada automaticamente em 12 conteúdos com base em 8.4k interações." />
        <Insight tone="green" text="Predição: crescimento de 18% na próxima semana com base no padrão regional do Nordeste." />
      </div>
    </Panel>
    <ChartFrame title="Atividade neural — fluxo de predições">
      <ResponsiveContainer>
        <AreaChart data={weeklyGrowth}>
          <defs>
            <linearGradient id="gNeural" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={ACCENT.violet} stopOpacity={0.6} />
              <stop offset="100%" stopColor={ACCENT.violet} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="d" stroke="rgba(255,255,255,0.4)" fontSize={11} />
          <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
          <Tooltip contentStyle={tooltipStyle} />
          <Area type="monotone" dataKey="learning" stroke={ACCENT.violet} fill="url(#gNeural)" strokeWidth={2} />
          <Area type="monotone" dataKey="users" stroke={ACCENT.cyan} fill="transparent" strokeWidth={2} strokeDasharray="4 4" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartFrame>
  </div>
);

const EconomyModule = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Stat icon={DollarSign} label="Valor movimentado" value="R$ 12.4M" delta={28} tone="gold" />
      <Stat icon={TrendingUp} label="Ticket médio" value="R$ 84" delta={6} tone="green" />
      <Stat icon={Store} label="Fluxo p/ parceiros" value="R$ 8.2M" delta={19} tone="cyan" />
      <Stat icon={Heart} label="Recorrência famílias" value="78%" delta={3} tone="pink" />
    </div>
    <Panel className="bg-gradient-to-br from-amber-500/10 via-transparent to-transparent border-amber-500/20">
      <div className="flex items-center gap-3">
        <Sparkles className="w-5 h-5 text-amber-300" />
        <p className="text-white/90 font-medium">O aprendizado gerou <span className="text-amber-300 font-bold">R$ 2.84M</span> em impacto econômico este mês.</p>
      </div>
    </Panel>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ChartFrame title="Fluxo econômico — 7 dias">
        <ResponsiveContainer>
          <BarChart data={weeklyGrowth}>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="d" stroke="rgba(255,255,255,0.4)" fontSize={11} />
            <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="impact" fill={ACCENT.gold} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartFrame>
      <ChartFrame title="Comparativo regional">
        <ResponsiveContainer>
          <BarChart data={regions}>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={11} />
            <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="families" fill={ACCENT.cyan} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartFrame>
    </div>
  </div>
);

const PartnersModule = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Stat icon={Store} label="Parceiros ativos" value="346" delta={11} tone="blue" />
      <Stat icon={Users} label="Famílias atendidas" value="43.860" delta={14} tone="green" />
      <Stat icon={ShoppingBag} label="Ticket pós-resgate" value="R$ 142" delta={9} tone="gold" />
      <Stat icon={TrendingUp} label="ROI social médio" value="3.8x" delta={4} tone="cyan" />
    </div>
    <Panel>
      <SectionTitle icon={Trophy} title="Ranking de parceiros" />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-white/40 text-xs uppercase tracking-wider">
            <tr><th className="pb-3">#</th><th className="pb-3">Parceiro</th><th className="pb-3">Famílias</th><th className="pb-3">Fluxo</th><th className="pb-3">Variação</th></tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {partners.map((p, i) => (
              <tr key={p.name} className="hover:bg-white/[0.02]">
                <td className="py-3 text-white/40">{i + 1}</td>
                <td className="py-3 font-medium text-white">{p.name}</td>
                <td className="py-3 text-white/70 tabular-nums">{p.families.toLocaleString()}</td>
                <td className="py-3 text-amber-300 font-semibold">{p.flow}</td>
                <td className={cn("py-3 font-semibold", p.growth >= 0 ? "text-emerald-400" : "text-rose-400")}>
                  {p.growth >= 0 ? "+" : ""}{p.growth}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  </div>
);

const ESGModule = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Stat icon={Leaf} label="Score ESG" value="A+" tone="green" />
      <Stat icon={BookOpen} label="Horas de educação" value="284.5k" delta={22} tone="cyan" />
      <Stat icon={Users} label="Famílias impactadas" value="43.860" delta={11} tone="blue" />
      <Stat icon={MapPin} label="Regiões vulneráveis" value="184" delta={8} tone="gold" />
    </div>
    <Panel className="bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent border-emerald-500/20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Relatório ESG executivo</h3>
          <p className="text-sm text-white/60">Storytelling visual de impacto, dashboards executivos e exportação automática.</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-200 text-sm font-semibold hover:bg-emerald-500/30 inline-flex items-center gap-2">
          <Download className="w-4 h-4" /> Exportar PDF
        </button>
      </div>
    </Panel>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { i: TreePine, l: "Sustentabilidade", v: "92/100", c: "green" },
        { i: Users, l: "Social", v: "96/100", c: "blue" },
        { i: Shield, l: "Governança", v: "89/100", c: "violet" },
      ].map((x) => (
        <Panel key={x.l}>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl" style={{ background: `${ACCENT[x.c as keyof typeof ACCENT]}20` }}>
              <x.i className="w-6 h-6" style={{ color: ACCENT[x.c as keyof typeof ACCENT] }} />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-white/40">{x.l}</div>
              <div className="text-2xl font-bold text-white">{x.v}</div>
            </div>
          </div>
        </Panel>
      ))}
    </div>
  </div>
);

const RewardsModule = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Stat icon={Gift} label="Resgates totais" value="48.291" delta={16} tone="pink" />
      <Stat icon={Coins} label="Moedas distribuídas" value="8.42M" delta={22} tone="gold" />
      <Stat icon={ShoppingBag} label="Categorias ativas" value="24" tone="cyan" />
      <Stat icon={Heart} label="Satisfação" value="4.8/5" delta={3} tone="green" />
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {rewards.map((r, i) => (
        <Panel key={r.name} className="text-center hover:scale-[1.02] transition-transform">
          <div className="w-14 h-14 mx-auto rounded-2xl mb-3 flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${CHART_COLORS[i]}, ${CHART_COLORS[i]}40)` }}>
            <Gift className="w-6 h-6 text-white" />
          </div>
          <div className="text-sm font-semibold text-white mb-1">{r.name}</div>
          <div className="text-xs text-white/40">{r.redeemed.toLocaleString()} resgates</div>
          <div className="text-sm font-bold text-amber-300 mt-2">{r.impact}</div>
        </Panel>
      ))}
    </div>
  </div>
);

const ReportsModule = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        { t: "Relatório ESG", d: "Indicadores socioambientais e governança" },
        { t: "Relatório Educacional", d: "Performance e evolução cognitiva" },
        { t: "Relatório Econômico", d: "Fluxo financeiro e impacto regional" },
        { t: "Relatório p/ Investidores", d: "Métricas-chave e crescimento" },
        { t: "Relatório Municipal", d: "Impacto por região e cidade" },
        { t: "Relatório para Editais", d: "Documentação técnica e social" },
      ].map((r) => (
        <Panel key={r.t} className="group hover:border-cyan-500/30 transition-all cursor-pointer">
          <div className="flex items-start justify-between mb-3">
            <FileBarChart className="w-8 h-8 text-cyan-300" />
            <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="font-bold text-white mb-1">{r.t}</h3>
          <p className="text-xs text-white/50 mb-4">{r.d}</p>
          <div className="flex gap-2">
            <button className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-white/80 border border-white/5">PDF</button>
            <button className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-white/80 border border-white/5">Excel</button>
          </div>
        </Panel>
      ))}
    </div>
  </div>
);

const SettingsModule = () => (
  <div className="space-y-6">
    <Panel>
      <SectionTitle icon={Cog} title="Configurações gerais" subtitle="Preferências do painel administrativo" />
      <div className="space-y-4">
        {["Notificações em tempo real", "Alertas de IA preditiva", "Exportação automática semanal", "Modo apresentação executiva"].map((s) => (
          <div key={s} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-sm text-white/80">{s}</span>
            <div className="w-11 h-6 rounded-full bg-blue-500/40 relative cursor-pointer">
              <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 right-0.5 shadow-lg" />
            </div>
          </div>
        ))}
      </div>
    </Panel>
  </div>
);

// ────────────────────────────────────────────────────────────────────
// SHELL
// ────────────────────────────────────────────────────────────────────
const NAV = [
  { id: "overview", label: "Visão Geral", icon: LayoutDashboard, C: OverviewModule },
  { id: "edu", label: "Inteligência Educacional", icon: Brain, C: EducationModule },
  { id: "fin", label: "Educação Financeira", icon: Wallet, C: FinanceModule },
  { id: "gam", label: "Gamificação", icon: Trophy, C: GamificationModule },
  { id: "fam", label: "Crianças & Famílias", icon: Users, C: FamiliesModule },
  { id: "ia", label: "Inteligência Preditiva", icon: Sparkles, C: PredictiveModule },
  { id: "eco", label: "Inteligência Econômica", icon: TrendingUp, C: EconomyModule },
  { id: "par", label: "Parceiros & Varejo", icon: Store, C: PartnersModule },
  { id: "esg", label: "ESG & Impacto Social", icon: Leaf, C: ESGModule },
  { id: "rew", label: "Recompensas", icon: Gift, C: RewardsModule },
  { id: "rep", label: "Relatórios", icon: FileText, C: ReportsModule },
  { id: "set", label: "Configurações", icon: Settings, C: SettingsModule },
];

export default function AdminAccess() {
  const [active, setActive] = useState("overview");
  const current = NAV.find((n) => n.id === active)!;
  const Current = current.C;

  return (
    <div className="min-h-screen flex text-white"
      style={{
        background: "radial-gradient(ellipse at top left, rgba(59,130,246,0.15), transparent 50%), radial-gradient(ellipse at bottom right, rgba(16,185,129,0.1), transparent 50%), #050813",
      }}>
      {/* SIDEBAR */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-white/5 bg-black/30 backdrop-blur-xl sticky top-0 h-screen">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-cyan-400 to-emerald-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold">Pandoorga</div>
              <div className="text-[10px] uppercase tracking-widest text-cyan-300/70">Central de Inteligência</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {NAV.map((n) => {
            const isActive = active === n.id;
            return (
              <button
                key={n.id}
                onClick={() => setActive(n.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/10 text-white border border-cyan-500/20 shadow-lg shadow-blue-500/10"
                    : "text-white/50 hover:text-white hover:bg-white/[0.03] border border-transparent",
                )}
              >
                <n.icon className={cn("w-4 h-4", isActive && "text-cyan-300")} />
                <span className="flex-1 text-left">{n.label}</span>
                {isActive && <ChevronRight className="w-3 h-3 text-cyan-300" />}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/5">
          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/20">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-3.5 h-3.5 text-emerald-300" />
              <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-semibold">Acesso seguro</span>
            </div>
            <p className="text-[11px] text-white/50">Administrador autenticado</p>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 min-w-0">
        {/* TOP BAR */}
        <header className="sticky top-0 z-20 backdrop-blur-xl bg-black/30 border-b border-white/5">
          <div className="flex items-center gap-4 px-6 py-4">
            <div className="flex items-center gap-2 text-xs text-white/40">
              <span>Admin</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white">{current.label}</span>
            </div>
            <div className="flex-1 max-w-md relative ml-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                placeholder="Buscar métricas, crianças, parceiros…"
                className="w-full pl-10 pr-4 py-2 bg-white/[0.03] border border-white/5 rounded-xl text-sm placeholder:text-white/30 focus:outline-none focus:border-cyan-500/30"
              />
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-xl hover:bg-white/5">
                <Bell className="w-4 h-4 text-white/60" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              </button>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-xs font-bold">A</div>
                <div className="hidden md:block">
                  <div className="text-xs font-semibold leading-tight">Admin</div>
                  <div className="text-[10px] text-emerald-400 leading-tight">● Online</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* HERO */}
        <div className="px-6 pt-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{current.label}</h1>
              <p className="text-sm text-white/40 mt-1">
                Infraestrutura inteligente de transformação social · dados em tempo real
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-300 font-medium">Sistemas operacionais</span>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="px-6 pb-12">
          <Current />
        </div>
      </main>
    </div>
  );
}
