/**
 * Home - Página principal do BIOALERT
 * Compõe todas as seções da plataforma em uma landing page completa
 */
import { useState, useCallback } from "react";
import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import MapSection from "@/components/MapSection";
import DashboardSection from "@/components/DashboardSection";
import FeaturesSection from "@/components/FeaturesSection";
import DifferentialsSection from "@/components/DifferentialsSection";
import ImpactSection from "@/components/ImpactSection";
import MVPSection from "@/components/MVPSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <HeroSection />
        <ProblemSection />
        <MapSection />
        <DashboardSection />
        <FeaturesSection />
        <DifferentialsSection />
        <ImpactSection />
        <MVPSection />
        <Footer />
      </div>
    </>
  );
}
