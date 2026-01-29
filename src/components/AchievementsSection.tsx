import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const achievements = [
  { icon: "🏆", title: "Stayed strong on a tough day", color: "bg-sunshine" },
  { icon: "🌟", title: "Gave more effort than required", color: "bg-lavender" },
  { icon: "🥇", title: "Didn't give up", color: "bg-sky" },
  { icon: "💪", title: "Pushed through when tired", color: "bg-pink" },
  { icon: "🎯", title: "Focused when it was hard", color: "bg-mint" },
  { icon: "🔥", title: "Brought your best", color: "bg-peach" },
];

interface AchievementCardProps {
  achievement: typeof achievements[0];
  index: number;
  isInView: boolean;
}

const AchievementCard = ({ achievement, index, isInView }: AchievementCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleClick = () => {
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      className="cursor-pointer"
    >
      <motion.div
        className={`${achievement.color} rounded-3xl p-6 shadow-card relative overflow-hidden`}
        whileHover={{ scale: 1.03, y: -5 }}
        whileTap={{ scale: 0.98 }}
        animate={{
          boxShadow: isHovered 
            ? "0 12px 40px -12px hsl(280 60% 50% / 0.25)"
            : "0 8px 30px -8px hsl(280 60% 50% / 0.15)",
        }}
      >
        <motion.div
          className="text-5xl mb-4"
          animate={isHovered ? { scale: 1.2, rotate: [0, -10, 10, 0] } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {achievement.icon}
        </motion.div>
        <h3 className="font-bold text-lg text-foreground">{achievement.title}</h3>
        
        {/* Celebration burst */}
        {showCelebration && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-lg pointer-events-none"
                style={{
                  left: "50%",
                  top: "50%",
                }}
                initial={{ opacity: 1, scale: 0 }}
                animate={{
                  opacity: [1, 0],
                  scale: [0, 1],
                  x: Math.cos((i * Math.PI * 2) / 8) * 60 - 10,
                  y: Math.sin((i * Math.PI * 2) / 8) * 60 - 10,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {["⭐", "✨", "💫", "🌟"][i % 4]}
              </motion.div>
            ))}
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export const AchievementsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative z-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
          Your Achievements Today
        </h2>
        <p className="text-muted-foreground text-lg">
          (Click them — you've earned it!)
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {achievements.map((achievement, index) => (
          <AchievementCard
            key={index}
            achievement={achievement}
            index={index}
            isInView={isInView}
          />
        ))}
      </div>
    </section>
  );
};
