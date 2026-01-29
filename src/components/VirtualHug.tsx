import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { useInView } from "framer-motion";

export const VirtualHug = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHugging, setIsHugging] = useState(false);
  const [hugCount, setHugCount] = useState(0);

  const triggerHug = () => {
    setIsHugging(true);
    setHugCount((prev) => prev + 1);
    setTimeout(() => setIsHugging(false), 2000);
  };

  return (
    <section
      ref={ref}
      className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-20 relative z-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Need a hug?
        </h2>
        <p className="text-muted-foreground mb-8 text-lg">
          Here's a virtual one, just for you.
        </p>

        <div className="relative">
          <motion.button
            onClick={triggerHug}
            disabled={isHugging}
            className="relative w-40 h-40 rounded-full bg-gradient-button shadow-glow flex items-center justify-center text-7xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={isHugging ? { scale: [1, 1.3, 1.1] } : {}}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              animate={isHugging ? { 
                scale: [1, 1.5, 1],
                rotate: [0, 10, -10, 0]
              } : {}}
              transition={{ duration: 0.8 }}
            >
              🤗
            </motion.span>
          </motion.button>

          {/* Hug animation overlay */}
          <AnimatePresence>
            {isHugging && (
              <>
                {/* Expanding rings */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border-4 border-primary/30"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 3, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, delay: i * 0.2 }}
                  />
                ))}
                
                {/* Floating emojis */}
                {[...Array(12)].map((_, i) => (
                  <motion.span
                    key={`emoji-${i}`}
                    className="absolute text-3xl pointer-events-none"
                    style={{ left: "50%", top: "50%" }}
                    initial={{ opacity: 1, x: -15, y: -15, scale: 0 }}
                    animate={{
                      opacity: [1, 1, 0],
                      x: Math.cos((i * Math.PI * 2) / 12) * 120 - 15,
                      y: Math.sin((i * Math.PI * 2) / 12) * 120 - 15,
                      scale: [0, 1.2, 0.8],
                      rotate: Math.random() * 60 - 30,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, delay: i * 0.05 }}
                  >
                    {["🌟", "✨", "💫", "🙌", "⭐", "🎉"][i % 6]}
                  </motion.span>
                ))}

                {/* Big message */}
                <motion.div
                  className="absolute -bottom-24 left-1/2 -translate-x-1/2 whitespace-nowrap"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-2xl font-bold text-gradient">
                    *virtual hug sent* 🫂
                  </span>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {hugCount > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-20 text-muted-foreground"
          >
            You've received <span className="font-bold text-primary">{hugCount}</span> virtual hug{hugCount > 1 ? "s" : ""} 🤗
          </motion.p>
        )}
      </motion.div>
    </section>
  );
};
