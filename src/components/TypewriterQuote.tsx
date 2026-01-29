import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const quotes = [
  {
    text: "You put so much effort into things, even when no one's watching.",
    author: "Your Biggest Fan",
  },
  {
    text: "You make hard work look graceful.",
    author: "The Universe",
  },
  {
    text: "You are already more than enough.",
    author: "Your Future Self",
  },
  {
    text: "You carry a lot, and you do it with so much strength.",
    author: "Everyone Who Knows You",
  },
];

export const TypewriterQuote = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentQuote, setCurrentQuote] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showAuthor, setShowAuthor] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    
    const quote = quotes[currentQuote];
    let charIndex = 0;
    setIsTyping(true);
    setShowAuthor(false);
    setDisplayedText("");

    const typeInterval = setInterval(() => {
      if (charIndex < quote.text.length) {
        setDisplayedText(quote.text.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        setShowAuthor(true);
        
        // Move to next quote after delay
        setTimeout(() => {
          setCurrentQuote((prev) => (prev + 1) % quotes.length);
        }, 4000);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [currentQuote, isInView]);

  return (
    <section
      ref={ref}
      className="min-h-[50vh] flex flex-col items-center justify-center px-6 py-20 relative z-10 bg-gradient-celebration"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="text-center max-w-3xl mx-auto"
      >
        <div className="mb-8">
          <span className="text-6xl">📜</span>
        </div>

        <div className="min-h-[120px] flex flex-col items-center justify-center">
          <motion.p
            key={currentQuote}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground"
          >
            "{displayedText}
            {isTyping && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block ml-1"
              >
                |
              </motion.span>
            )}
            {!isTyping && '"'}
          </motion.p>

          {showAuthor && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-muted-foreground mt-4 text-lg"
            >
              — {quotes[currentQuote].author} ✨
            </motion.p>
          )}
        </div>

        {/* Quote indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {quotes.map((_, index) => (
            <motion.div
              key={index}
              className="w-2 h-2 rounded-full"
              animate={{
                backgroundColor: index === currentQuote 
                  ? "hsl(15, 90%, 70%)" 
                  : "hsl(var(--muted))",
                scale: index === currentQuote ? 1.3 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};
