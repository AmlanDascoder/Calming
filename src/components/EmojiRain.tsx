import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { useInView } from "framer-motion";

const emojiSets = {
  hugs: ["🤗", "🫂", "🙌", "👐", "🤝", "✨", "💪", "🌟"],
  stars: ["⭐", "🌟", "✨", "💫", "🌠", "⚡", "🔥", "🌈"],
  celebration: ["🎉", "🎊", "🥳", "🎈", "🎆", "🎇", "🪅", "🎁"],
  nature: ["🌸", "🌺", "🌷", "🌻", "🌼", "🍀", "🌿", "🦋"],
};

interface RainDrop {
  id: number;
  emoji: string;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

export const EmojiRain = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [drops, setDrops] = useState<RainDrop[]>([]);
  const [activeSet, setActiveSet] = useState<keyof typeof emojiSets | null>(null);

  const triggerRain = (setName: keyof typeof emojiSets) => {
    setActiveSet(setName);
    const emojis = emojiSets[setName];
    
    const newDrops: RainDrop[] = [...Array(40)].map((_, i) => ({
      id: Date.now() + i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      x: Math.random() * 100,
      delay: Math.random() * 1.5,
      duration: 2 + Math.random() * 2,
      size: 1.5 + Math.random() * 1.5,
    }));
    
    setDrops((prev) => [...prev, ...newDrops]);
    
    setTimeout(() => {
      setDrops((prev) => prev.filter((d) => !newDrops.find((nd) => nd.id === d.id)));
      setActiveSet(null);
    }, 5000);
  };

  const buttons = [
    { key: "hugs" as const, label: "🤗 Hugs", color: "bg-pink" },
    { key: "stars" as const, label: "✨ Stars", color: "bg-sunshine" },
    { key: "celebration" as const, label: "🎉 Party", color: "bg-lavender" },
    { key: "nature" as const, label: "🌸 Nature", color: "bg-mint" },
  ];

  return (
    <section
      ref={ref}
      className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-20 relative z-10 overflow-hidden"
    >
      {/* Rain drops */}
      <AnimatePresence>
        {drops.map((drop) => (
          <motion.span
            key={drop.id}
            className="fixed pointer-events-none z-50"
            style={{
              left: `${drop.x}%`,
              fontSize: `${drop.size}rem`,
            }}
            initial={{ top: "-10%", opacity: 1, rotate: 0 }}
            animate={{ 
              top: "110%", 
              opacity: [1, 1, 0],
              rotate: Math.random() * 360,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: drop.duration,
              delay: drop.delay,
              ease: "linear",
            }}
          >
            {drop.emoji}
          </motion.span>
        ))}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Make It Rain! 🌧️
        </h2>
        <p className="text-muted-foreground mb-10 text-lg">
          Choose your mood, trigger the magic
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {buttons.map((btn) => (
            <motion.button
              key={btn.key}
              onClick={() => triggerRain(btn.key)}
              disabled={activeSet !== null}
              className={`${btn.color} px-6 py-3 rounded-full font-semibold shadow-soft disabled:opacity-50 text-foreground`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {btn.label}
            </motion.button>
          ))}
        </div>

        {activeSet && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-muted-foreground"
          >
            ✨ Look up! ✨
          </motion.p>
        )}
      </motion.div>
    </section>
  );
};
