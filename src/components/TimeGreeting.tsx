import { motion } from "framer-motion";
import { useMemo } from "react";

export const TimeGreeting = () => {
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return { text: "Good morning, superstar", emoji: "☀️", subtext: "Ready to shine today?" };
    } else if (hour >= 12 && hour < 17) {
      return { text: "Good afternoon, champion", emoji: "🌤️", subtext: "Keep that momentum going!" };
    } else if (hour >= 17 && hour < 21) {
      return { text: "Good evening, hero", emoji: "🌅", subtext: "You made it through another day!" };
    } else {
      return { text: "Hello, night owl", emoji: "🌙", subtext: "Even now, you're amazing." };
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="absolute top-6 left-6 z-20"
    >
      <div className="bg-card/80 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-soft">
        <div className="flex items-center gap-3">
          <motion.span
            className="text-2xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            {greeting.emoji}
          </motion.span>
          <div>
            <p className="font-semibold text-foreground">{greeting.text}</p>
            <p className="text-sm text-muted-foreground">{greeting.subtext}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
