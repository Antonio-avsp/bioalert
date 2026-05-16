/**
 * DashboardSection - Dashboard urbano inteligente
 * Métricas em tempo real, gráficos de precipitação, status de risco
 */
import { motion } from "framer-motion";
import { Cloud, Droplets, Wind, Thermometer, Eye, TrendingUp, Radio, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const metrics = [
  { icon: Cloud, label: "Precipitação", value: "42", unit: "mm/h", trend: "+12%", color: "oklch(0.55 0.18 230)" },
  { icon: Droplets, label: "Nível do Rio", value: "3.8", unit: "m", trend: "+0.4m", color: "oklch(0.55 0.22 25)" },
  { icon: Wind, label: "Vento", value: "28", unit: "km/h", trend: "NE", color: "oklch(0.65 0.15 250)" },
  { icon: Thermometer, label: "Temperatura", value: "24", unit: "°C", trend: "-2°", color: "oklch(0.75 0.15 85)" },
  { icon: Eye, label: "Visibilidade", value: "2.1", unit: "km", trend: "Baixa", color: "oklch(0.65 0.2 55)" },
  { icon: Radio, label: "Sensores Ativos", value: "847", unit: "", trend: "98%", color: "oklch(0.55 0.15 150)" },
  { icon: Users, label: "Reports Hoje", value: "156", unit: "", trend: "+23", color: "oklch(0.55 0.18 145)" },
  { icon: TrendingUp, label: "Alertas Enviados", value: "2.4k", unit: "", trend: "Último: 3min", color: "oklch(0.45 0.2 310)" },
];

const neighborhoods = [
  { name: "Madalena", risk: 85, level: "Crítico", color: "oklch(0.45 0.2 310)" },
  { name: "Afogados", risk: 72, level: "Perigo", color: "oklch(0.55 0.22 25)" },
  { name: "Ag. Magalhães", risk: 65, level: "Alerta", color: "oklch(0.65 0.2 55)" },
  { name: "Derby", risk: 45, level: "Atenção", color: "oklch(0.75 0.15 85)" },
  { name: "Espinheiro", risk: 20, level: "Seguro", color: "oklch(0.55 0.18 145)" },
  { name: "Boa Viagem", risk: 15, level: "Seguro", color: "oklch(0.55 0.18 145)" },
];

const rainfallData = [18, 22, 35, 42, 38, 55, 62, 48, 42, 35, 28, 20, 15, 22, 30, 38, 45, 52, 48, 42, 35, 28, 22, 18];

export default function DashboardSection() {
  const maxRain = Math.max(...rainfallData);

  return (
    <section
      id="dashboard"
      className="relative py-16 lg:py-24"
      style={{
        backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663666098924/ikHyJAV4GospYAy4yicEkh/map-dashboard-bg-58KLGSrtVAroQsj3MeewSZ.webp)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[oklch(0.13_0.015_250/0.85)]" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-6 bg-[oklch(0.55_0.18_230)] rounded-full" />
            <span className="text-sm font-medium text-[oklch(0.55_0.18_230)] uppercase tracking-wider">
              Dashboard Inteligente
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            Centro de Comando Urbano
          </h2>
          <p className="text-[oklch(0.65_0.01_250)] max-w-xl">
            Dados meteorológicos e urbanos consolidados para tomada de decisão rápida e precisa.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="bg-[oklch(0.17_0.015_250/0.8)] backdrop-blur-sm border-[oklch(0.25_0.015_250)] hover:border-[oklch(0.35_0.015_250)] transition-colors duration-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <m.icon className="w-4 h-4" style={{ color: m.color }} />
                    <span className="text-xs text-[oklch(0.55_0.01_250)]">{m.label}</span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className="text-2xl font-bold text-white"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {m.value}
                    </span>
                    <span className="text-xs text-[oklch(0.55_0.01_250)]">{m.unit}</span>
                  </div>
                  <span className="text-[10px] mt-1 block" style={{ color: m.color }}>
                    {m.trend}
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4">
          {/* Rainfall Chart */}
          <motion.div
            className="p-5 rounded-xl bg-[oklch(0.17_0.015_250/0.8)] backdrop-blur-sm border border-[oklch(0.25_0.015_250)]"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">Precipitação — Últimas 24h</h3>
              <span className="text-xs text-[oklch(0.55_0.01_250)]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                mm/h
              </span>
            </div>
            <div className="flex items-end gap-[3px] h-40">
              {rainfallData.map((val, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-sm"
                  style={{
                    height: `${(val / maxRain) * 100}%`,
                    backgroundColor:
                      val > 50
                        ? "oklch(0.55 0.22 25)"
                        : val > 35
                        ? "oklch(0.65 0.2 55)"
                        : val > 25
                        ? "oklch(0.75 0.15 85)"
                        : "oklch(0.55 0.18 145)",
                  }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.02, duration: 0.3 }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[10px] text-[oklch(0.45_0.01_250)]">00:00</span>
              <span className="text-[10px] text-[oklch(0.45_0.01_250)]">06:00</span>
              <span className="text-[10px] text-[oklch(0.45_0.01_250)]">12:00</span>
              <span className="text-[10px] text-[oklch(0.45_0.01_250)]">18:00</span>
              <span className="text-[10px] text-[oklch(0.45_0.01_250)]">Agora</span>
            </div>
          </motion.div>

          {/* Risk by Neighborhood */}
          <motion.div
            className="p-5 rounded-xl bg-[oklch(0.17_0.015_250/0.8)] backdrop-blur-sm border border-[oklch(0.25_0.015_250)]"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-sm font-semibold text-white mb-4">Risco por Bairro</h3>
            <div className="flex flex-col gap-3">
              {neighborhoods.map((n, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <span className="text-xs text-[oklch(0.65_0.01_250)] w-28 truncate">{n.name}</span>
                  <div className="flex-1">
                    <div className="h-2 rounded-full bg-[oklch(0.22_0.015_250)] overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: n.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${n.risk}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                      />
                    </div>
                  </div>
                  <span
                    className="text-xs font-medium w-10 text-right"
                    style={{ fontFamily: "'JetBrains Mono', monospace", color: n.color }}
                  >
                    {n.risk}%
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
