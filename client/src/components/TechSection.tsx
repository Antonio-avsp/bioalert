/**
 * TechSection - Stack tecnológica do BIOALERT
 * Visual moderno com cards de tecnologias organizados por categoria
 */
import { motion } from "framer-motion";
import { Code2, Database, Cloud, Cpu, Smartphone, Globe } from "lucide-react";

const techCategories = [
  {
    icon: Code2,
    title: "Frontend",
    color: "oklch(0.55 0.18 230)",
    techs: [
      { name: "React / Next.js", desc: "Interface reativa e SSR" },
      { name: "Tailwind CSS", desc: "Estilização utilitária" },
      { name: "Framer Motion", desc: "Animações fluidas" },
      { name: "Leaflet / Google Maps", desc: "Mapas interativos" },
    ],
  },
  {
    icon: Database,
    title: "Backend & Dados",
    color: "oklch(0.55 0.15 150)",
    techs: [
      { name: "Firebase", desc: "Realtime DB + Auth" },
      { name: "Node.js", desc: "API REST" },
      { name: "PostgreSQL", desc: "Dados estruturados" },
      { name: "Redis", desc: "Cache de alertas" },
    ],
  },
  {
    icon: Cloud,
    title: "APIs & Integrações",
    color: "oklch(0.65 0.2 55)",
    techs: [
      { name: "OpenWeatherMap", desc: "Dados meteorológicos" },
      { name: "INMET API", desc: "Dados públicos BR" },
      { name: "WhatsApp API", desc: "Alertas via mensagem" },
      { name: "Twilio SMS", desc: "Alertas por SMS" },
    ],
  },
  {
    icon: Cpu,
    title: "IA & Machine Learning",
    color: "oklch(0.45 0.2 310)",
    techs: [
      { name: "TensorFlow.js", desc: "Classificação de risco" },
      { name: "YOLO v8", desc: "Detecção em câmeras" },
      { name: "Prophet", desc: "Previsão de séries" },
      { name: "Scikit-learn", desc: "Análise preditiva" },
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile & IoT",
    color: "oklch(0.75 0.15 85)",
    techs: [
      { name: "React Native", desc: "App multiplataforma" },
      { name: "PWA", desc: "Modo offline" },
      { name: "Arduino / ESP32", desc: "Sensores de nível" },
      { name: "LoRaWAN", desc: "Rede de sensores" },
    ],
  },
  {
    icon: Globe,
    title: "Infraestrutura",
    color: "oklch(0.55 0.22 25)",
    techs: [
      { name: "Docker", desc: "Containerização" },
      { name: "AWS / GCP", desc: "Cloud hosting" },
      { name: "Cloudflare", desc: "CDN e proteção" },
      { name: "GitHub Actions", desc: "CI/CD" },
    ],
  },
];

export default function TechSection() {
  return (
    <section id="tecnologias" className="py-16 lg:py-24 bg-[oklch(0.11_0.015_250)]">
      <div className="container">
        {/* Header */}
        <motion.div
          className="mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-6 bg-[oklch(0.55_0.18_230)] rounded-full" />
            <span className="text-sm font-medium text-[oklch(0.55_0.18_230)] uppercase tracking-wider">
              Stack Tecnológica
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            Tecnologias Modernas para Problemas Reais
          </h2>
          <p className="text-[oklch(0.65_0.01_250)]">
            Uma stack robusta e escalável, combinando as melhores ferramentas open-source
            com serviços cloud para máxima performance e confiabilidade.
          </p>
        </motion.div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {techCategories.map((cat, i) => (
            <motion.div
              key={i}
              className="p-5 rounded-xl bg-[oklch(0.15_0.015_250)] border border-[oklch(0.22_0.015_250)] hover:border-[oklch(0.32_0.015_250)] transition-all duration-200"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `oklch(from ${cat.color} l c h / 0.12)` }}
                >
                  <cat.icon className="w-4.5 h-4.5" style={{ color: cat.color }} />
                </div>
                <h3 className="text-sm font-semibold text-white">{cat.title}</h3>
              </div>
              <div className="flex flex-col gap-2.5">
                {cat.techs.map((t, j) => (
                  <div key={j} className="flex items-center justify-between">
                    <span className="text-sm text-white font-medium">{t.name}</span>
                    <span className="text-[11px] text-[oklch(0.5_0.01_250)]">{t.desc}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
