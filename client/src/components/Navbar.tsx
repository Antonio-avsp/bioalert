/**
 * Navbar - Emergency Cartography style
 * Dark background with green accent, logo + navigation
 */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Bell, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Início", href: "#hero" },
  { label: "Mapa", href: "#mapa" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Impacto", href: "#impacto" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[oklch(0.13_0.015_250/0.95)] backdrop-blur-xl border-b border-[oklch(0.28_0.015_250)]"
          : "bg-transparent"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="container flex items-center justify-between h-16 lg:h-18">
        {/* Logo */}
        <a href="#hero" onClick={() => scrollTo("#hero")} className="flex items-center gap-2.5">
          <img
            src="/manus-storage/bioalert-logo_f3847778.webp"
            alt="Bioalert"
            className="w-9 h-9 object-contain"
          />
          <span
            className="text-xl font-bold tracking-tight text-white"
            style={{ fontFamily: "'ABeeZee', sans-serif" }}
          >
            BIOALERT
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="px-3 py-2 text-sm text-[oklch(0.75_0.01_250)] hover:text-white transition-colors duration-200 rounded-md hover:bg-white/5"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-[oklch(0.45_0.15_150)] text-[oklch(0.55_0.15_150)] hover:bg-[oklch(0.45_0.15_150)] hover:text-white gap-1.5"
            onClick={() => {
              import("sonner").then(({ toast }) =>
                toast.info("Alertas em tempo real ativados!")
              );
            }}
          >
            <Bell className="w-3.5 h-3.5" />
            Alertas
          </Button>
          <Button
            size="sm"
            className="bg-[oklch(0.45_0.15_150)] hover:bg-[oklch(0.40_0.15_150)] text-white gap-1.5"
            onClick={() => scrollTo("#mapa")}
          >
            <MapPin className="w-3.5 h-3.5" />
            Ver Mapa
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          className="lg:hidden bg-[oklch(0.13_0.015_250/0.98)] backdrop-blur-xl border-t border-[oklch(0.28_0.015_250)] pb-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.25 }}
        >
          <div className="container flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-left px-3 py-2.5 text-sm text-[oklch(0.75_0.01_250)] hover:text-white hover:bg-white/5 rounded-md transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="flex gap-2 mt-2 px-3">
              <Button
                size="sm"
                className="flex-1 bg-[oklch(0.45_0.15_150)] hover:bg-[oklch(0.40_0.15_150)] text-white gap-1.5"
                onClick={() => scrollTo("#mapa")}
              >
                <MapPin className="w-3.5 h-3.5" />
                Ver Mapa
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
