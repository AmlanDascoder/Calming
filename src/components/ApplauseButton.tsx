import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { useInView } from "framer-motion";

export const ApplauseButton = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [claps, setClaps] = useState(0);
  const [showClap, setShowClap] = useState(false);
  const [clapEmojis, setClapEmojis] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClap = () => {
    setClaps((prev) => prev + 1);
    setShowClap(true);
    
    // Add floating clap emojis
    const newClaps = [...Array(3)].map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100 - 50,
      y: Math.random() * -60 - 20,
    }));
    setClapEmojis((prev) => [...prev, ...newClaps]);
    
    setTimeout(() => {
      setClapEmojis((prev) => prev.filter((c) => !newClaps.find((nc) => nc.id === c.id)));
    }, 1000);
    
    setTimeout(() => setShowClap(false), 150);
  };

  const getMessage = () => {
    if (claps === 0) return "Give yourself some applause!";
    if (claps < 10) return "Keep going!";
    if (claps < 25) return "You're on fire! 🔥";
    if (claps < 50) return "Standing ovation! 👏";
    if (claps < 100) return "Legendary applause! 🌟";
    return "You've transcended! 🚀✨";
  };

  return (
    <section
      ref={ref}
      className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-20 relative z-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          You Deserve Applause 👏
        </h2>
        <p className="text-muted-foreground mb-10 text-lg">
          {getMessage()}
        </p>

        <div className="relative inline-block">
          <motion.button
            onClick={handleClap}
            className="w-32 h-32 rounded-full bg-gradient-button shadow-glow flex items-center justify-center text-6xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            animate={showClap ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.15 }}
          >
            👏
          </motion.button>

          {/* Floating claps */}
          <AnimatePresence>
            {clapEmojis.map((clap) => (
              <motion.span
                key={clap.id}
                className="absolute text-3xl pointer-events-none"
                style={{ left: "50%", top: "50%" }}
                initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
                animate={{
                  opacity: [1, 0],
                  x: clap.x,
                  y: clap.y,
                  scale: [0, 1.2],
                  rotate: Math.random() * 40 - 20,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {["👏", "🎉", "⭐", "✨", "💫"][Math.floor(Math.random() * 5)]}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        {/* Clap counter */}
        <motion.div
          className="mt-8"
          animate={{ scale: claps > 0 && showClap ? [1, 1.1, 1] : 1 }}
        >
          <div className="bg-card/90 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-card inline-block">
            <p className="text-muted-foreground text-sm">Total applause given</p>
            <motion.p
              key={claps}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl font-bold text-gradient"
            >
              {claps}
            </motion.p>
          </div>
        </motion.div>

        {/* Milestone badges */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {[
            { threshold: 10, emoji: "🌟", label: "10 claps" },
            { threshold: 25, emoji: "🔥", label: "25 claps" },
            { threshold: 50, emoji: "👑", label: "50 claps" },
            { threshold: 100, emoji: "🚀", label: "100 claps" },
          ].map((milestone) => (
            <motion.div
              key={milestone.threshold}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                claps >= milestone.threshold 
                  ? "bg-gradient-button text-primary-foreground" 
                  : "bg-muted text-muted-foreground"
              }`}
              animate={claps >= milestone.threshold ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {milestone.emoji} {milestone.label}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
