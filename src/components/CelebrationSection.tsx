import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const CelebrationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const messages = [
    { text: "You show up.", emoji: "💪" },
    { text: "You keep going.", emoji: "🚀" },
    { text: "Even when it's hard.", emoji: "🌟" },
    { text: "That matters.", emoji: "💖" },
  ];

  return (
    <section 
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10 bg-gradient-celebration"
    >
      <div className="text-center max-w-2xl mx-auto">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            className="mb-8 last:mb-0"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: index * 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <motion.p
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground flex items-center justify-center gap-4"
              whileHover={{ scale: 1.02 }}
            >
              <motion.span
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.4 + 0.3,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                {message.emoji}
              </motion.span>
              {message.text}
            </motion.p>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 2, duration: 0.5, type: "spring" }}
          className="mt-16"
        >
          <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-card">
            <span className="text-xl">🎉</span>
            <span className="text-muted-foreground font-medium">You're doing amazing</span>
            <span className="text-xl">🎉</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
