import { motion, useScroll, useTransform } from "framer-motion";

export const ProgressMeter = () => {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const hue = useTransform(scrollYProgress, [0, 0.5, 1], [15, 340, 280]);
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-2 bg-muted/50 backdrop-blur-sm">
      <motion.div
        className="h-full rounded-r-full"
        style={{ 
          width,
          background: useTransform(hue, (h) => `linear-gradient(90deg, hsl(${h}, 80%, 70%), hsl(${h + 40}, 70%, 75%))`)
        }}
      />
      <motion.div
        className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-soft text-sm font-semibold flex items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <span className="text-muted-foreground">Awesomeness:</span>
        <motion.span className="text-foreground">
          {useTransform(scrollYProgress, (v) => `${Math.round(v * 100)}%`)}
        </motion.span>
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
        >
          ⭐
        </motion.span>
      </motion.div>
    </div>
  );
};
