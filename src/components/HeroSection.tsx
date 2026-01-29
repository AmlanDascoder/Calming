import { motion } from "framer-motion";
import { useState } from "react";

interface HeroSectionProps {
  onButtonClick: () => void;
}

export const HeroSection = ({ onButtonClick }: HeroSectionProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const lines = [
    { text: "Hey you.", delay: 0.2 },
    { text: "Yes, you.", delay: 0.8 },
    { text: "This page exists because you work incredibly hard.", delay: 1.4 },
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10">
      <div className="text-center max-w-3xl mx-auto">
        {lines.map((line, index) => (
          <motion.h1
            key={index}
            className={`font-bold mb-4 ${
              index === 2 
                ? "text-2xl sm:text-3xl md:text-4xl text-foreground/90" 
                : "text-4xl sm:text-5xl md:text-6xl text-foreground"
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: line.delay,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {line.text}
          </motion.h1>
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 2.4 }}
          className="mt-12"
        >
          <motion.button
            onClick={onButtonClick}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="bg-gradient-button hover:bg-gradient-button-hover text-primary-foreground font-semibold text-lg px-10 py-4 rounded-full shadow-soft transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            animate={{
              boxShadow: isHovered 
                ? "0 8px 30px -8px hsl(15 90% 70% / 0.4)" 
                : "0 4px 20px -4px hsl(15 90% 70% / 0.2)",
            }}
          >
            <span className="flex items-center gap-2">
              Click for something nice
              <motion.span
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.2 }}
              >
                ✨
              </motion.span>
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-muted-foreground text-sm flex flex-col items-center gap-2"
        >
          <span>scroll for more love</span>
          <span className="text-xl">↓</span>
        </motion.div>
      </motion.div>
    </section>
  );
};
