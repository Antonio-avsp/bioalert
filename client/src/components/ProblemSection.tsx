/**
 * ProblemSection - Descrição do problema de chuvas e alagamentos em Recife
 */
import { motion } from "framer-motion";
import { AlertTriangle, Clock, MapPinOff, Radio, Users, Car } from "lucide-react";

const problems = [
  {
    icon: Radio,
    title: "Falta de informação centralizada",
    description: "Dados dispersos entre órgãos públicos, sem uma plataforma unificada para a população acessar em tempo real.",
  },
  {
    icon: Clock,
    title: "Alertas tardios",
    description: "Quando os alertas chegam, muitas vezes a água já subiu. A defasagem entre detecção e comunicação custa vidas.",
  },
  {
    icon: Car,
    title: "Trânsito em áreas alagadas",
    description: "Motoristas entram em vias alagadas sem saber, colocando vidas em risco e agravando o caos urbano.",
  },
  {
    icon: MapPinOff,
    title: "Dificuldade na tomada de decisão",
    description: "Sem dados confiáveis e em tempo real, cidadãos e gestores públicos tomam decisões no escuro.",
  },
  {
    icon: Users,
    title: "Comunidades vulneráveis",
    description: "Morros, palafitas e áreas ribeirinhas sofrem desproporcionalmente. São os que mais precisam e menos têm acesso à informação.",
  },
  {
    icon: AlertTriangle,
    title: "Recorrência crescente",
    description: "Com as mudanças climáticas, eventos extremos são cada vez mais frequentes e intensos em Recife.",
  },
];

export default function ProblemSection() {
  return (
    <section id="problema" className="py-16 lg:py-24 bg-[oklch(0.11_0.015_250)]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 items-start">
          {/* Left - Context */}
          <motion.div
            className="lg:sticky lg:top-24"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-6 bg-[oklch(0.55_0.22_25)] rounded-full" />
              <span className="text-sm font-medium text-[oklch(0.55_0.22_25)] uppercase tracking-wider">
                O Problema
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Recife Debaixo D'Água
            </h2>
            <p className="text-[oklch(0.65_0.01_250)] leading-relaxed mb-6">
              Recife é uma das capitais mais vulneráveis a enchentes no Brasil.
              Com 65% do território abaixo do nível do mar, rios que cortam a cidade
              e um sistema de drenagem defasado, cada temporada de chuvas traz
              destruição, perdas materiais e, tragicamente, vidas perdidas.
            </p>
            <div className="flex flex-col gap-3 p-4 rounded-lg bg-[oklch(0.55_0.22_25/0.08)] border border-[oklch(0.55_0.22_25/0.2)]">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[oklch(0.55_0.22_25)]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  128
                </span>
                <span className="text-sm text-[oklch(0.65_0.01_250)]">mortes em 2022</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[oklch(0.65_0.2_55)]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  R$ 2.8bi
                </span>
                <span className="text-sm text-[oklch(0.65_0.01_250)]">em prejuízos anuais</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[oklch(0.75_0.15_85)]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  400k+
                </span>
                <span className="text-sm text-[oklch(0.65_0.01_250)]">pessoas em áreas de risco</span>
              </div>
            </div>
          </motion.div>

          {/* Right - Problem Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {problems.map((p, i) => (
              <motion.div
                key={i}
                className="p-5 rounded-xl bg-[oklch(0.15_0.015_250)] border border-[oklch(0.22_0.015_250)] hover:border-[oklch(0.32_0.015_250)] transition-all duration-200"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <p.icon className="w-5 h-5 text-[oklch(0.55_0.22_25)] mb-3" />
                <h3 className="text-sm font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-xs text-[oklch(0.55_0.01_250)] leading-relaxed">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
