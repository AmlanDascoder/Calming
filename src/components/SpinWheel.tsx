import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { useInView } from "framer-motion";

const traits = [
  { text: "Resilient", color: "#F97316", emoji: "💪" },
  { text: "Kind", color: "#EC4899", emoji: "🌟" },
  { text: "Creative", color: "#A855F7", emoji: "🎨" },
  { text: "Brave", color: "#3B82F6", emoji: "🦁" },
  { text: "Inspiring", color: "#EAB308", emoji: "✨" },
  { text: "Authentic", color: "#10B981", emoji: "💎" },
  { text: "Talented", color: "#F59E0B", emoji: "🏆" },
  { text: "Unstoppable", color: "#EF4444", emoji: "🚀" },
];

export const SpinWheel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedTrait, setSelectedTrait] = useState<typeof traits[0] | null>(null);
  const [showResult, setShowResult] = useState(false);

  const spin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setShowResult(false);
    
    const spins = 5 + Math.random() * 3;
    const extraDegrees = Math.random() * 360;
    const totalRotation = spins * 360 + extraDegrees;
    
    setRotation((prev) => prev + totalRotation);
    
    setTimeout(() => {
      const finalAngle = (rotation + totalRotation) % 360;
      const segmentAngle = 360 / traits.length;
      const index = Math.floor((360 - finalAngle + segmentAngle / 2) % 360 / segmentAngle);
      setSelectedTrait(traits[index % traits.length]);
      setShowResult(true);
      setIsSpinning(false);
    }, 4000);
  };

  const segmentAngle = 360 / traits.length;

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative z-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Spin to Discover Your Superpower
        </h2>
        <p className="text-muted-foreground mb-12 text-lg">
          (Spoiler: You have all of them)
        </p>

        <div className="relative inline-block">
          {/* Pointer */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 text-3xl drop-shadow-lg">
            ▼
          </div>

          {/* Wheel Container */}
          <div className="relative">
            <motion.svg
              width="320"
              height="320"
              viewBox="0 0 320 320"
              className="drop-shadow-xl"
              animate={{ rotate: rotation }}
              transition={{ duration: 4, ease: [0.32, 0.72, 0, 1] }}
            >
              {traits.map((trait, index) => {
                const startAngle = index * segmentAngle - 90;
                const endAngle = (index + 1) * segmentAngle - 90;
                const startRad = (startAngle * Math.PI) / 180;
                const endRad = (endAngle * Math.PI) / 180;
                const radius = 150;
                const centerX = 160;
                const centerY = 160;

                const x1 = centerX + radius * Math.cos(startRad);
                const y1 = centerY + radius * Math.sin(startRad);
                const x2 = centerX + radius * Math.cos(endRad);
                const y2 = centerY + radius * Math.sin(endRad);

                const largeArc = segmentAngle > 180 ? 1 : 0;
                const pathD = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

                const textAngle = startAngle + segmentAngle / 2;
                const textRad = (textAngle * Math.PI) / 180;
                const textRadius = radius * 0.65;
                const textX = centerX + textRadius * Math.cos(textRad);
                const textY = centerY + textRadius * Math.sin(textRad);

                return (
                  <g key={trait.text}>
                    <path
                      d={pathD}
                      fill={trait.color}
                      stroke="white"
                      strokeWidth="2"
                    />
                    <text
                      x={textX}
                      y={textY}
                      fill="white"
                      fontSize="12"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${textAngle + 90}, ${textX}, ${textY})`}
                      style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
                    >
                      {trait.emoji} {trait.text}
                    </text>
                  </g>
                );
              })}
              
              {/* Center circle */}
              <circle cx="160" cy="160" r="30" fill="white" className="drop-shadow-md" />
              <text x="160" y="160" textAnchor="middle" dominantBaseline="middle" fontSize="24">
                🎯
              </text>
            </motion.svg>
          </div>

          {/* Spin button */}
          <motion.button
            onClick={spin}
            disabled={isSpinning}
            className="mt-8 bg-gradient-button hover:bg-gradient-button-hover text-primary-foreground font-semibold text-lg px-8 py-3 rounded-full shadow-soft disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSpinning ? "Spinning..." : "Spin the Wheel! 🎰"}
          </motion.button>
        </div>

        {/* Result */}
        <AnimatePresence>
          {showResult && selectedTrait && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="mt-10"
            >
              <div className="bg-card/90 backdrop-blur-sm px-8 py-6 rounded-3xl shadow-card inline-block">
                <p className="text-muted-foreground mb-2">You are...</p>
                <p 
                  className="text-4xl sm:text-5xl font-bold"
                  style={{ color: selectedTrait.color }}
                >
                  {selectedTrait.emoji} {selectedTrait.text}!
                </p>
                <p className="text-muted-foreground mt-3">And don't you forget it! ✨</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
