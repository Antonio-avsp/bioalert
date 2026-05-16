/**
 * MVPSection - MVP do Hackathon com timeline e demonstração
 */
import { motion } from "framer-motion";
import { Check, ArrowRight, Rocket, Target, Lightbulb, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

const mvpFeatures = [
  { text: "Mapa em tempo real com pontos de alagamento", done: true },
  { text: "Sistema de alertas com 5 níveis de risco", done: true },
  { text: "Reports colaborativos da comunidade", done: true },
  { text: "Dashboard com dados meteorológicos", done: true },
  { text: "Previsão básica baseada em dados públicos", done: true },
  { text: "Botão SOS com geolocalização", done: true },
  { text: "Integração com WhatsApp (protótipo)", done: true },
  { text: "Painel simplificado para Defesa Civil", done: true },
];

const roadmap = [
  {
    phase: "MVP",
    period: "Hackathon",
    icon: Rocket,
    color: "oklch(0.55 0.18 145)",
    items: ["Mapa colaborativo", "Alertas básicos", "Reports de usuários", "Dashboard visual"],
  },
  {
    phase: "v1.0",
    period: "3 meses",
    icon: Target,
    color: "oklch(0.75 0.15 85)",
    items: ["App mobile nativo", "Integração WhatsApp", "Sensores IoT piloto", "IA preditiva v1"],
  },
  {
    phase: "v2.0",
    period: "6 meses",
    icon: Lightbulb,
    color: "oklch(0.65 0.2 55)",
    items: ["Visão computacional", "Rotas seguras", "Gamificação", "Modo offline"],
  },
  {
    phase: "Escala",
    period: "12 meses",
    icon: Layers,
    color: "oklch(0.45 0.2 310)",
    items: ["Outras cidades", "API pública", "Parcerias gov.", "Open data"],
  },
];

export default function MVPSection() {
  return (
    <section id="mvp" className="py-16 lg:py-24 bg-[oklch(0.11_0.015_250)]">
      <div className="container">
        {/* Header */}
        <motion.div
          className="mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-6 bg-[oklch(0.55_0.18_145)] rounded-full" />
            <span className="text-sm font-medium text-[oklch(0.55_0.18_145)] uppercase tracking-wider">
              MVP do Hackathon
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            Pronto para Demonstração
          </h2>
          <p className="text-[oklch(0.65_0.01_250)]">
            Uma versão funcional e viável construída em tempo de hackathon,
            demonstrando o potencial completo da plataforma BIOALERT.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* MVP Checklist */}
          <motion.div
            className="p-6 rounded-xl bg-[oklch(0.15_0.015_250)] border border-[oklch(0.22_0.015_250)]"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-white mb-5">Funcionalidades Entregues</h3>
            <div className="flex flex-col gap-3">
              {mvpFeatures.map((f, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="w-5 h-5 rounded-full bg-[oklch(0.55_0.18_145/0.15)] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[oklch(0.55_0.18_145)]" />
                  </div>
                  <span className="text-sm text-[oklch(0.75_0.01_250)]">{f.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Roadmap */}
          <motion.div
            className="p-6 rounded-xl bg-[oklch(0.15_0.015_250)] border border-[oklch(0.22_0.015_250)]"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-white mb-5">Roadmap de Evolução</h3>
            <div className="flex flex-col gap-5">
              {roadmap.map((r, i) => (
                <motion.div
                  key={i}
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  {/* Timeline dot + line */}
                  <div className="flex flex-col items-center">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `color-mix(in oklch, ${r.color}, transparent 85%)` }}
                    >
                      <r.icon className="w-4 h-4" style={{ color: r.color }} />
                    </div>
                    {i < roadmap.length - 1 && (
                      <div className="w-px flex-1 bg-[oklch(0.25_0.015_250)] mt-2" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-white">{r.phase}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[oklch(0.22_0.015_250)] text-[oklch(0.55_0.01_250)]">
                        {r.period}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {r.items.map((item, j) => (
                        <span
                          key={j}
                          className="text-[11px] px-2 py-0.5 rounded-full border text-[oklch(0.65_0.01_250)]"
                          style={{ borderColor: `color-mix(in oklch, ${r.color}, transparent 70%)` }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
