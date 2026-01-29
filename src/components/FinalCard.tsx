import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const FinalCard = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative z-10"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="relative"
      >
        {/* Glowing background */}
        <motion.div
          className="absolute inset-0 bg-gradient-button rounded-3xl blur-3xl opacity-30"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative bg-card/95 backdrop-blur-sm rounded-3xl p-10 sm:p-16 shadow-card max-w-2xl mx-auto text-center">
          {/* Decorative elements */}
          <motion.div
            className="absolute -top-6 left-1/2 -translate-x-1/2"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-5xl">🎁</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p className="text-muted-foreground text-lg mb-6">I made this just to say</p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gradient mb-6"
          >
            I'm proud of you.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-muted-foreground text-lg mb-8"
          >
            No reason needed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex justify-center gap-3"
          >
            {["✨", "🌟", "🎉", "⭐", "✨"].map((emoji, i) => (
              <motion.span
                key={i}
                className="text-2xl"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="mt-12 pt-8 border-t border-border/50"
          >
            <p className="text-muted-foreground text-sm italic">
              Made with ✨ for someone who works hard
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom decorative floating hearts */}
      <div className="mt-16 flex gap-8">
        {[...Array(3)].map((_, i) => (
          <motion.span
            key={i}
            className="text-3xl"
            animate={{
              y: [0, -15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2.5,
              delay: i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {["🌟", "✨", "⭐"][i]}
          </motion.span>
        ))}
      </div>
    </section>
  );
};
