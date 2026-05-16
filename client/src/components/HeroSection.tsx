/**
 * HeroSection - Emergency Cartography style
 * Full-bleed hero with dramatic Recife rain image, overlay, and CTA
 */
import { motion } from "framer-motion";
import { MapPin, AlertTriangle, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663666098924/ikHyJAV4GospYAy4yicEkh/hero-recife-rain-3ro8enwWsTfKqFJL7F238A.webp"
          alt="Recife durante chuvas fortes"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.08_0.015_250/0.92)] via-[oklch(0.10_0.015_250/0.80)] to-[oklch(0.08_0.015_250/0.70)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.13_0.015_250)] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-24 pb-16">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[oklch(0.45_0.15_150/0.15)] border border-[oklch(0.45_0.15_150/0.3)] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[oklch(0.55_0.18_145)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[oklch(0.55_0.18_145)]" />
            </span>
            <span className="text-xs font-medium text-[oklch(0.55_0.15_150)]">
              Manus Day 2026 — Hackathon Recife
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-white mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            A chuva vem,
            <br />
            <span className="text-[oklch(0.55_0.15_150)]">a informação</span>
            <br />
            chega primeiro.
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg text-[oklch(0.75_0.01_250)] max-w-lg mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Plataforma inteligente de monitoramento urbano e alertas climáticos em tempo real.
            Protegendo Recife contra enchentes e alagamentos com tecnologia, IA e colaboração comunitária.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-[oklch(0.45_0.15_150)] hover:bg-[oklch(0.40_0.15_150)] text-white gap-2 px-6 h-12 text-base shadow-lg shadow-[oklch(0.45_0.15_150/0.25)] active:scale-[0.97] transition-transform duration-150"
              onClick={() => scrollTo("#mapa")}
            >
              <MapPin className="w-4.5 h-4.5" />
              Ver Mapa em Tempo Real
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[oklch(0.55_0.22_25)] text-[oklch(0.65_0.2_25)] hover:bg-[oklch(0.55_0.22_25)] hover:text-white gap-2 px-6 h-12 text-base active:scale-[0.97] transition-transform duration-150"
              onClick={() => scrollTo("#dashboard")}
            >
              <AlertTriangle className="w-4.5 h-4.5" />
              Reportar Alagamento
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            {[
              { value: "94", unit: "bairros", label: "monitorados" },
              { value: "< 30s", unit: "", label: "tempo de alerta" },
              { value: "24/7", unit: "", label: "monitoramento" },
              { value: "5", unit: "níveis", label: "de risco" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-2xl font-bold text-white" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {stat.value}
                  {stat.unit && <span className="text-sm font-normal text-[oklch(0.55_0.15_150)] ml-1">{stat.unit}</span>}
                </span>
                <span className="text-xs text-[oklch(0.55_0.01_250)] mt-0.5">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="w-5 h-5 text-[oklch(0.5_0.01_250)]" />
      </motion.div>
    </section>
  );
}
