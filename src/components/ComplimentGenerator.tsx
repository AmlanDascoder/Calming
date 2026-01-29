import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { useInView } from "framer-motion";

const compliments = [
  "Your effort does not go unnoticed.",
  "You're quietly impressive.",
  "Hard work looks good on you.",
  "You make difficult things look easy.",
  "Your dedication is inspiring.",
  "The world is better because you try so hard.",
  "You bring light wherever you go.",
  "Your persistence is truly admirable.",
  "You're stronger than you know.",
  "Every step you take matters.",
  "You're making a real difference.",
  "Your work ethic is remarkable.",
  "You inspire others without even knowing it.",
  "You're proof that effort pays off.",
  "The energy you bring is contagious.",
];

export const ComplimentGenerator = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentCompliment, setCurrentCompliment] = useState<string | null>(null);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const generateCompliment = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const randomIndex = Math.floor(Math.random() * compliments.length);
    setCurrentCompliment(compliments[randomIndex]);

    // Generate hearts
    const newHearts = [...Array(5)].map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 200 - 100,
      y: Math.random() * -100 - 50,
    }));
    setHearts(newHearts);

    setTimeout(() => {
      setHearts([]);
      setIsAnimating(false);
    }, 1500);
  };

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mx-auto"
      >
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-4 text-foreground"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          Need a little boost?
        </motion.h2>
        <motion.p
          className="text-muted-foreground mb-12 text-lg"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          Click the button. You deserve this.
        </motion.p>

        <div className="relative">
          <motion.button
            onClick={generateCompliment}
            className="bg-gradient-button hover:bg-gradient-button-hover text-primary-foreground font-semibold text-lg px-10 py-4 rounded-full shadow-soft transition-all duration-300 relative overflow-visible"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <span className="flex items-center gap-2">
              💝 Tell me something good
            </span>
          </motion.button>

          {/* Floating hearts */}
          <AnimatePresence>
            {hearts.map((heart) => (
              <motion.div
                key={heart.id}
                className="absolute left-1/2 top-0 text-2xl pointer-events-none"
                initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
                animate={{
                  opacity: [1, 1, 0],
                  x: heart.x,
                  y: heart.y,
                  scale: [0, 1.2, 0.8],
                  rotate: Math.random() * 60 - 30,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                {["💖", "💗", "💕", "✨", "🌟"][Math.floor(Math.random() * 5)]}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          {currentCompliment && (
            <motion.div
              key={currentCompliment}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
              className="mt-12"
            >
              <div className="bg-card/90 backdrop-blur-sm px-8 py-6 rounded-3xl shadow-card inline-block">
                <motion.p
                  className="text-2xl sm:text-3xl font-semibold text-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  "{currentCompliment}"
                </motion.p>
                <motion.div
                  className="flex justify-center gap-2 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {["✨", "💖", "✨"].map((emoji, i) => (
                    <motion.span
                      key={i}
                      className="text-xl"
                      animate={{ 
                        y: [0, -5, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 1,
                        delay: i * 0.2,
                        repeat: Infinity,
                      }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
