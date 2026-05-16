/**
 * DifferentialsSection - Diferenciais criativos do BIOALERT
 * Showcase de funcionalidades inovadoras com imagens
 */
import { motion } from "framer-motion";
import { Camera, Users, Brain, Zap } from "lucide-react";

const differentials = [
  {
    icon: Camera,
    title: "Visão Computacional em Câmeras Urbanas",
    description:
      "Integramos um gateway inteligente às câmeras de segurança das ruas de Recife. Frame por frame, nossa IA detecta: nível de água nas vias, pedestres usando guarda-chuvas, veículos em áreas alagadas e comportamento de risco. Tudo processado em tempo real para alimentar o mapa de risco.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663666098924/ikHyJAV4GospYAy4yicEkh/smart-camera-analysis-kPqeLDwaiwznvjPSaGuc2s.webp",
    stats: [
      { label: "Câmeras integradas", value: "340+" },
      { label: "Frames/segundo", value: "30fps" },
      { label: "Precisão detecção", value: "94.7%" },
    ],
  },
  {
    icon: Users,
    title: "Inteligência Colaborativa da Comunidade",
    description:
      "A população é nosso maior sensor. Cada cidadão pode reportar alagamentos com foto, localização GPS e estimativa de nível de água. Os reports são validados por IA e cruzados com dados de sensores para criar um mapa de risco hiper-preciso e em tempo real.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663666098924/ikHyJAV4GospYAy4yicEkh/community-reporting-QoBtHE94BYU5eGyyza5T4C.webp",
    stats: [
      { label: "Usuários ativos", value: "12.4k" },
      { label: "Reports/dia", value: "850+" },
      { label: "Tempo validação", value: "<15s" },
    ],
  },
  {
    icon: Brain,
    title: "IA Preditiva com Análise Histórica",
    description:
      "Nosso modelo de machine learning analisa 10 anos de dados pluviométricos, topografia urbana, histórico de alagamentos e reports da comunidade para prever com até 2 horas de antecedência quais áreas serão afetadas e qual o nível de risco esperado.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663666098924/ikHyJAV4GospYAy4yicEkh/map-dashboard-bg-58KLGSrtVAroQsj3MeewSZ.webp",
    stats: [
      { label: "Antecedência", value: "2h" },
      { label: "Acurácia", value: "89%" },
      { label: "Dados analisados", value: "10 anos" },
    ],
  },
  {
    icon: Zap,
    title: "Resposta de Emergência Coordenada",
    description:
      "O painel da Defesa Civil integra todos os dados em uma visão unificada: ocorrências ativas, equipes em campo, recursos disponíveis e rotas de evacuação. Alertas automáticos são disparados para bombeiros, SAMU e voluntários cadastrados na região afetada.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663666098924/ikHyJAV4GospYAy4yicEkh/emergency-response-b9kZUvNVtpSu2c4gpfiYyy.webp",
    stats: [
      { label: "Tempo resposta", value: "<5min" },
      { label: "Equipes", value: "48" },
      { label: "Cobertura", value: "100%" },
    ],
  },
];

export default function DifferentialsSection() {
  return (
    <section id="diferenciais" className="py-16 lg:py-24">
      <div className="container">
        {/* Header */}
        <motion.div
          className="mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-6 bg-[oklch(0.45_0.2_310)] rounded-full" />
            <span className="text-sm font-medium text-[oklch(0.45_0.2_310)] uppercase tracking-wider">
              Diferenciais Criativos
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            Inovação que Salva Vidas
          </h2>
          <p className="text-[oklch(0.65_0.01_250)]">
            Funcionalidades que vão além do convencional, combinando IA, visão computacional
            e inteligência coletiva para criar a plataforma mais avançada de proteção urbana do Brasil.
          </p>
        </motion.div>

        {/* Differential Cards */}
        <div className="flex flex-col gap-6">
          {differentials.map((d, i) => (
            <motion.div
              key={i}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-xl overflow-hidden border border-[oklch(0.25_0.015_250)] bg-[oklch(0.17_0.015_250)]`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Image */}
              <div className={`relative h-64 lg:h-auto ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <img
                  src={d.image}
                  alt={d.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.17_0.015_250)] via-transparent to-transparent lg:bg-none" />
                <div className={`absolute inset-0 hidden lg:block ${
                  i % 2 === 1
                    ? "bg-gradient-to-l from-[oklch(0.17_0.015_250)] via-transparent to-transparent"
                    : "bg-gradient-to-r from-[oklch(0.17_0.015_250)] via-transparent to-transparent"
                }`} />
              </div>

              {/* Content */}
              <div className={`p-6 lg:p-8 flex flex-col justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.45_0.15_150/0.15)] flex items-center justify-center">
                    <d.icon className="w-5 h-5 text-[oklch(0.55_0.15_150)]" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{d.title}</h3>
                </div>
                <p className="text-sm text-[oklch(0.65_0.01_250)] leading-relaxed mb-6">
                  {d.description}
                </p>
                <div className="flex gap-6">
                  {d.stats.map((s, j) => (
                    <div key={j} className="flex flex-col">
                      <span
                        className="text-lg font-bold text-white"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {s.value}
                      </span>
                      <span className="text-[10px] text-[oklch(0.5_0.01_250)] mt-0.5">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
