/**
 * ImpactSection - Impacto social do BIOALERT
 * Métricas de impacto e depoimentos
 */
import { motion } from "framer-motion";
import { Heart, Shield, Building2, TrendingDown, Users, Clock } from "lucide-react";

const impacts = [
  {
    icon: TrendingDown,
    value: "60%",
    label: "Redução de riscos",
    description: "Diminuição estimada de danos materiais e humanos com alertas antecipados de até 2 horas.",
    color: "oklch(0.55 0.18 145)",
  },
  {
    icon: Clock,
    value: "30s",
    label: "Tempo de alerta",
    description: "Da detecção ao alerta na palma da mão. Cada segundo conta quando a água sobe.",
    color: "oklch(0.65 0.2 55)",
  },
  {
    icon: Users,
    value: "500k+",
    label: "Pessoas protegidas",
    description: "Potencial de cobertura para toda a população de áreas de risco de Recife e região metropolitana.",
    color: "oklch(0.55 0.15 150)",
  },
  {
    icon: Building2,
    value: "94",
    label: "Bairros monitorados",
    description: "Cobertura completa de todos os bairros de Recife com sensores, câmeras e reports comunitários.",
    color: "oklch(0.55 0.18 230)",
  },
  {
    icon: Shield,
    value: "48",
    label: "Equipes integradas",
    description: "Defesa Civil, Bombeiros, SAMU e voluntários coordenados em uma única plataforma.",
    color: "oklch(0.55 0.22 25)",
  },
  {
    icon: Heart,
    value: "∞",
    label: "Vidas protegidas",
    description: "O valor imensurável de cada vida salva por um alerta que chegou a tempo.",
    color: "oklch(0.45 0.2 310)",
  },
];

export default function ImpactSection() {
  return (
    <section id="impacto" className="py-16 lg:py-24">
      <div className="container">
        {/* Header */}
        <motion.div
          className="text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-1 h-6 bg-[oklch(0.55_0.22_25)] rounded-full" />
            <span className="text-sm font-medium text-[oklch(0.55_0.22_25)] uppercase tracking-wider">
              Impacto Social
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            Tecnologia com Propósito
          </h2>
          <p className="text-[oklch(0.65_0.01_250)]">
            O BIOALERT não é apenas uma plataforma tecnológica. É um compromisso com a vida,
            a segurança e a dignidade das comunidades mais vulneráveis de Recife.
          </p>
        </motion.div>

        {/* Impact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {impacts.map((item, i) => (
            <motion.div
              key={i}
              className="relative p-6 rounded-xl bg-[oklch(0.17_0.015_250)] border border-[oklch(0.25_0.015_250)] overflow-hidden group hover:border-[oklch(0.35_0.015_250)] transition-all duration-200"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              {/* Background glow */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-5 group-hover:opacity-10 transition-opacity"
                style={{ backgroundColor: item.color }}
              />

              <div className="relative z-10">
                <item.icon className="w-6 h-6 mb-4" style={{ color: item.color }} />
                <div
                  className="text-4xl font-extrabold text-white mb-1"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {item.value}
                </div>
                <div className="text-sm font-semibold text-white mb-2">{item.label}</div>
                <p className="text-xs text-[oklch(0.55_0.01_250)] leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pitch Quote */}
        <motion.div
          className="mt-16 p-8 lg:p-12 rounded-2xl bg-gradient-to-br from-[oklch(0.45_0.15_150/0.1)] to-[oklch(0.17_0.015_250)] border border-[oklch(0.45_0.15_150/0.2)] text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <blockquote className="text-xl lg:text-2xl font-medium text-white leading-relaxed max-w-3xl mx-auto mb-4" style={{ fontFamily: "'ABeeZee', sans-serif" }}>
            "Em Recife, a chuva não avisa. Mas agora, o BIOALERT avisa por ela.
            Cada alerta enviado é uma família protegida, cada report é um ato de solidariedade,
            cada dado analisado é uma vida que pode ser salva."
          </blockquote>
          <p className="text-sm text-[oklch(0.55_0.15_150)]">
            — Equipe BIOALERT, Manus Day 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
}
