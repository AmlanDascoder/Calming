import { useState, useCallback } from "react";
import confetti from "canvas-confetti";
import { FloatingShapes } from "@/components/FloatingShapes";
import { ProgressMeter } from "@/components/ProgressMeter";

import { HeroSection } from "@/components/HeroSection";
import { CelebrationSection } from "@/components/CelebrationSection";
import { TypewriterQuote } from "@/components/TypewriterQuote";
import { ComplimentGenerator } from "@/components/ComplimentGenerator";
import { VirtualHug } from "@/components/VirtualHug";
import { SpinWheel } from "@/components/SpinWheel";

import { AchievementsSection } from "@/components/AchievementsSection";
import { EmojiRain } from "@/components/EmojiRain";
import { LoveNotes } from "@/components/LoveNotes";
import { ApplauseButton } from "@/components/ApplauseButton";

import { FinalCard } from "@/components/FinalCard";

const Index = () => {
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);

  const triggerConfetti = useCallback(() => {
    if (hasTriggeredConfetti) return;
    
    setHasTriggeredConfetti(true);

    // Big multi-burst confetti
    const colors = ["#FDA4AF", "#FDE68A", "#BFDBFE", "#E9D5FF", "#A7F3D0", "#FECACA"];
    
    // Center burst
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors,
    });

    // Left burst
    setTimeout(() => {
      confetti({
        particleCount: 75,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.6 },
        colors,
      });
    }, 150);

    // Right burst
    setTimeout(() => {
      confetti({
        particleCount: 75,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.6 },
        colors,
      });
    }, 300);

    // Extra sparkles
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 120,
        origin: { y: 0.7 },
        colors,
        scalar: 0.8,
      });
    }, 500);

    // Scroll to celebration section
    setTimeout(() => {
      document.getElementById("celebration")?.scrollIntoView({ 
        behavior: "smooth" 
      });
    }, 1000);
  }, [hasTriggeredConfetti]);

  return (
    <div className="min-h-screen bg-gradient-hero overflow-x-hidden">
      <ProgressMeter />
      <FloatingShapes />
      
      
      <HeroSection onButtonClick={triggerConfetti} />
      
      <div id="celebration">
        <CelebrationSection />
      </div>
      
      <TypewriterQuote />
      
      <ComplimentGenerator />
      
      <VirtualHug />
      
      <SpinWheel />
      
      <AchievementsSection />
      
      <EmojiRain />
      
      <LoveNotes />
      
      <ApplauseButton />
      
      <FinalCard />
    </div>
  );
};

export default Index;
