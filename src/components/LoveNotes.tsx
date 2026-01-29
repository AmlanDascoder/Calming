import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { useInView } from "framer-motion";

const notes = [
  { text: "You are doing great.", color: "bg-pink", rotation: -5, emoji: "🌟" },
  { text: "Quietly impressive.", color: "bg-lavender", rotation: 3, emoji: "💪" },
  { text: "Main character energy", color: "bg-sky", rotation: -2, emoji: "🌈" },
  { text: "So so proud of you", color: "bg-sunshine", rotation: 4, emoji: "⭐" },
  { text: "Your effort matters", color: "bg-mint", rotation: -4, emoji: "✨" },
  { text: "You make a difference", color: "bg-peach", rotation: 2, emoji: "🎉" },
];

export const LoveNotes = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [flippedNotes, setFlippedNotes] = useState<Set<number>>(new Set());

  const flipNote = (index: number) => {
    setFlippedNotes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative z-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Messages for You ✉️
        </h2>
        <p className="text-muted-foreground text-lg">
          Click each note to reveal the message inside
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-12 sm:gap-14 max-w-4xl mx-auto px-4">
        {notes.map((note, index) => {
          const isFlipped = flippedNotes.has(index);
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="perspective-1000"
            >
              <motion.button
                onClick={() => flipNote(index)}
                className={`w-full aspect-square ${note.color} rounded-2xl shadow-card p-6 relative cursor-pointer`}
                style={{ transformStyle: "preserve-3d" }}
                animate={{ 
                  rotateY: isFlipped ? 180 : 0,
                  rotate: note.rotation,
                }}
                whileHover={{ scale: 1.05, rotate: 0 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                {/* Front */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center rounded-2xl"
                  style={{ backfaceVisibility: "hidden" }}
                  animate={{ opacity: isFlipped ? 0 : 1 }}
                >
                  <div className="text-center">
                    <span className="text-5xl mb-2 block">📩</span>
                    <span className="text-sm text-foreground/70 font-medium">Tap me!</span>
                  </div>
                </motion.div>

                {/* Back */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center p-4 rounded-2xl"
                  style={{ 
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                  animate={{ opacity: isFlipped ? 1 : 0 }}
                >
                  <p className="text-foreground font-semibold text-center text-sm sm:text-base">
                    {note.text} {note.emoji}
                  </p>
                </motion.div>
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      {flippedNotes.size === notes.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 text-center"
        >
          <div className="bg-card/90 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-card inline-block">
            <p className="text-xl font-semibold text-foreground">
              You found them all! 🎉
            </p>
          </div>
        </motion.div>
      )}
    </section>
  );
};
