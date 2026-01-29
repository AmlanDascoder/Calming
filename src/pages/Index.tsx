import { useState, useCallback } from "react";
import confetti from "canvas-confetti";
import { FloatingShapes } from "@/components/FloatingShapes";
import { HeroSection } from "@/components/HeroSection";
import { CelebrationSection } from "@/components/CelebrationSection";
import { ComplimentGenerator } from "@/components/FinalCard"; // Import from FinalCard
import { AchievementsSection } from "@/components/AchievementsSection";
// Remove: import { FinalCard } from "@/components/FinalCard";

const Index = () => {
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);

  const triggerConfetti = useCallback(() => {
    if (hasTriggeredConfetti) return;
    
    setHasTriggeredConfetti(true);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FDA4AF", "#FDE68A", "#BFDBFE", "#E9D5FF", "#A7F3D0"],
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#FDA4AF", "#FDE68A", "#BFDBFE", "#E9D5FF", "#A7F3D0"],
      });
    }, 150);

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#FDA4AF", "#FDE68A", "#BFDBFE", "#E9D5FF", "#A7F3D0"],
      });
    }, 300);

    setTimeout(() => {
      document.getElementById("celebration")?.scrollIntoView({ 
        behavior: "smooth" 
      });
    }, 800);
  }, [hasTriggeredConfetti]);

  return (
    <div className="min-h-screen bg-gradient-hero overflow-x-hidden">
      <FloatingShapes />
      
      <HeroSection onButtonClick={triggerConfetti} />
      
      <div id="celebration">
        <CelebrationSection />
      </div>
      
      <ComplimentGenerator />
      
      <AchievementsSection />
      
      {/* Remove: <FinalCard /> - this is causing the error */}
    </div>
  );
};

export default Index;