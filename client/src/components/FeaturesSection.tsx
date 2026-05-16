/**
 * FeaturesSection - Funcionalidades principais do BIOALERT
 * Cards com ícones e descrições das funcionalidades
 */
import { motion } from "framer-motion";
import {
  Map, Bell, MessageSquare, Shield, Camera, Route,
  Gamepad2, Wifi, Brain, Users, Phone, Share2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Map,
    title: "Mapa Colaborativo",
    description: "Mapa em tempo real com pontos de alagamento reportados pela comunidade e sensores IoT distribuídos pela cidade.",
    color: "oklch(0.55 0.18 145)",
    bgColor: "oklch(0.55 0.18 145 / 0.1)",
  },
  {
    icon: Bell,
    title: "Alertas em Tempo Real",
    description: "Sistema de alertas com 5 níveis de risco por cores, enviados automaticamente via push, WhatsApp e SMS.",
    color: "oklch(0.65 0.2 55)",
    bgColor: "oklch(0.65 0.2 55 / 0.1)",
  },
  {
    icon: Brain,
    title: "IA Preditiva",
    description: "Inteligência artificial que analisa histórico de chuvas, dados de sensores e reports para prever áreas críticas.",
    color: "oklch(0.45 0.2 310)",
    bgColor: "oklch(0.45 0.2 310 / 0.1)",
  },
  {
    icon: Camera,
    title: "Visão Computacional",
    description: "Gateway em câmeras de segurança urbanas para detectar nível de água, guarda-chuvas e comportamento de pedestres.",
    color: "oklch(0.55 0.18 230)",
    bgColor: "oklch(0.55 0.18 230 / 0.1)",
  },
  {
    icon: Route,
    title: "Rotas Seguras",
    description: "Cálculo automático de rotas alternativas evitando áreas alagadas, integrado com apps de navegação.",
    color: "oklch(0.55 0.15 150)",
    bgColor: "oklch(0.55 0.15 150 / 0.1)",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp & SMS",
    description: "Comunicação direta com a população via WhatsApp Business API e SMS para áreas sem internet estável.",
    color: "oklch(0.55 0.18 145)",
    bgColor: "oklch(0.55 0.18 145 / 0.1)",
  },
  {
    icon: Shield,
    title: "Botão SOS",
    description: "Botão de emergência com compartilhamento de localização em tempo real para a Defesa Civil e bombeiros.",
    color: "oklch(0.55 0.22 25)",
    bgColor: "oklch(0.55 0.22 25 / 0.1)",
  },
  {
    icon: Users,
    title: "Painel Defesa Civil",
    description: "Dashboard exclusivo para órgãos públicos com visão consolidada de ocorrências, recursos e equipes em campo.",
    color: "oklch(0.65 0.15 250)",
    bgColor: "oklch(0.65 0.15 250 / 0.1)",
  },
  {
    icon: Gamepad2,
    title: "Gamificação",
    description: "Sistema de pontos e badges para incentivar reports da comunidade. Ranking de bairros mais engajados.",
    color: "oklch(0.75 0.15 85)",
    bgColor: "oklch(0.75 0.15 85 / 0.1)",
  },
  {
    icon: Wifi,
    title: "Modo Offline",
    description: "Funcionamento parcial sem internet: mapa em cache, alertas por SMS e reports salvos localmente.",
    color: "oklch(0.65 0.2 55)",
    bgColor: "oklch(0.65 0.2 55 / 0.1)",
  },
  {
    icon: Phone,
    title: "Reports Colaborativos",
    description: "Qualquer cidadão pode reportar alagamentos com foto, localização e nível estimado de água.",
    color: "oklch(0.55 0.15 150)",
    bgColor: "oklch(0.55 0.15 150 / 0.1)",
  },
  {
    icon: Share2,
    title: "Compartilhamento",
    description: "Compartilhe sua localização e status de segurança com familiares durante eventos climáticos extremos.",
    color: "oklch(0.45 0.2 310)",
    bgColor: "oklch(0.45 0.2 310 / 0.1)",
  },
];

export default function FeaturesSection() {
  return (
    <section id="funcionalidades" className="py-16 lg:py-24">
      <div className="container">
        {/* Header */}
        <motion.div
          className="mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-6 bg-[oklch(0.65_0.2_55)] rounded-full" />
            <span className="text-sm font-medium text-[oklch(0.65_0.2_55)] uppercase tracking-wider">
              Funcionalidades
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            Tecnologia a Serviço da Proteção Urbana
          </h2>
          <p className="text-[oklch(0.65_0.01_250)]">
            Cada funcionalidade foi projetada para salvar vidas, reduzir danos e empoderar comunidades
            durante eventos climáticos extremos em Recife.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Card className="h-full bg-[oklch(0.17_0.015_250)] border-[oklch(0.25_0.015_250)] hover:border-[oklch(0.35_0.015_250)] transition-all duration-200 group hover:-translate-y-0.5">
                <CardContent className="p-5">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110"
                    style={{ backgroundColor: f.bgColor }}
                  >
                    <f.icon className="w-5 h-5" style={{ color: f.color }} />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-xs text-[oklch(0.55_0.01_250)] leading-relaxed">{f.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
