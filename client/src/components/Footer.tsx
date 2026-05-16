/**
 * Footer - BIOALERT footer with links and credits
 */
import { motion } from "framer-motion";
import { Heart, Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-[oklch(0.22_0.015_250)]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-8 items-start">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <img
                src="/manus-storage/bioalert-logo_f3847778.webp"
                alt="Bioalert"
                className="w-8 h-8 object-contain"
              />
              <span
                className="text-lg font-bold text-white"
                style={{ fontFamily: "'ABeeZee', sans-serif" }}
              >
                BIOALERT
              </span>
            </div>
            <p className="text-sm text-[oklch(0.55_0.01_250)] max-w-sm leading-relaxed">
              Plataforma inteligente de monitoramento urbano e alertas climáticos em tempo real.
              Protegendo Recife contra enchentes e alagamentos.
            </p>
            <p className="text-xs text-[oklch(0.4_0.01_250)] mt-4">
              Manus Day 2026 — Hackathon Recife
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-[oklch(0.55_0.01_250)] uppercase tracking-wider mb-1">
              Plataforma
            </span>
            {["Mapa em Tempo Real", "Dashboard", "Alertas", "Reports", "Defesa Civil"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-[oklch(0.65_0.01_250)] hover:text-[oklch(0.55_0.15_150)] transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-[oklch(0.55_0.01_250)] uppercase tracking-wider mb-1">
              Contato
            </span>
            <div className="flex gap-2">
              {[Github, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-[oklch(0.22_0.015_250)] flex items-center justify-center text-[oklch(0.55_0.01_250)] hover:text-[oklch(0.55_0.15_150)] hover:bg-[oklch(0.28_0.015_250)] transition-all"
                  onClick={(e) => e.preventDefault()}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-[oklch(0.22_0.015_250)] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[oklch(0.4_0.01_250)]">
            2026 BIOALERT. Feito com{" "}
            <Heart className="w-3 h-3 inline text-[oklch(0.55_0.22_25)]" />{" "}
            para Recife.
          </p>
          <p className="text-xs text-[oklch(0.4_0.01_250)]">
            A chuva vem mas a informação chega primeiro.
          </p>
        </div>
      </div>
    </footer>
  );
}
