/**
 * SplashScreen - Fiel ao design Figma "Abrindo o app"
 * Design: Fundo branco, logo Bioalert centralizado, fonte ABeeZee
 * Animação: Fade in + scale suave, depois transição para o conteúdo principal
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");

  useEffect(() => {
    const holdTimer = setTimeout(() => setPhase("hold"), 600);
    const exitTimer = setTimeout(() => setPhase("exit"), 2800);
    const completeTimer = setTimeout(() => onComplete(), 3400);
    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? null : null}
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === "exit" ? 0 : 1 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* "Seja bem Vindo" text */}
        <motion.p
          className="text-black text-2xl font-normal mb-8"
          style={{ fontFamily: "'ABeeZee', sans-serif" }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          Seja bem Vindo
        </motion.p>

        {/* Logo Bioalert */}
        <motion.img
          src="/manus-storage/bioalert-logo_f3847778.webp"
          alt="Bioalert Logo"
          className="w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] object-contain"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
        />

        {/* Tagline */}
        <motion.p
          className="text-black text-2xl font-normal text-center max-w-[280px] mt-6 leading-relaxed"
          style={{ fontFamily: "'ABeeZee', sans-serif" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          A chuva vem mas a informação chega primeiro.
        </motion.p>

        {/* Loading indicator */}
        <motion.div
          className="mt-12 flex gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-[#1B7A3D]"
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
