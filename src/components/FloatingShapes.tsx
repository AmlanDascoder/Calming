import { motion } from "framer-motion";

const shapes = [
  { type: "circle", size: 60, color: "bg-pink", delay: 0, duration: 8, x: "10%", y: "15%" },
  { type: "circle", size: 40, color: "bg-lavender", delay: 1, duration: 10, x: "85%", y: "20%" },
  { type: "circle", size: 80, color: "bg-sky", delay: 2, duration: 12, x: "75%", y: "70%" },
  { type: "circle", size: 50, color: "bg-sunshine", delay: 0.5, duration: 9, x: "20%", y: "75%" },
  { type: "circle", size: 35, color: "bg-mint", delay: 1.5, duration: 11, x: "50%", y: "10%" },
  { type: "circle", size: 45, color: "bg-peach", delay: 2.5, duration: 7, x: "90%", y: "50%" },
  { type: "circle", size: 55, color: "bg-coral/40", delay: 3, duration: 13, x: "5%", y: "45%" },
  { type: "circle", size: 30, color: "bg-pink/60", delay: 1.2, duration: 8, x: "60%", y: "85%" },
];

export const FloatingShapes = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full ${shape.color} opacity-60 blur-sm`}
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Sparkle elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute text-2xl"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3 + i * 0.5,
            delay: i * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
};
