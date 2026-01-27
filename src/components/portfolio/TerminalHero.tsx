import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const bootSequence = [
  { text: '> Initializing developer environment...', delay: 0 },
  { text: '> Loading curiosity...', delay: 600 },
  { text: '> Compiling ideas...', delay: 1200 },
  { text: '> Ready.', delay: 1800 },
];

const headlineWords = ['I', 'build', 'systems', 'that', 'start', 'simple', '—', 'and', 'scale', 'beautifully.'];

const TerminalHero = () => {
  const [bootComplete, setBootComplete] = useState(false);
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [showHeadline, setShowHeadline] = useState(false);
  const [visibleWords, setVisibleWords] = useState<number[]>([]);

  useEffect(() => {
    bootSequence.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, index]);
        if (index === bootSequence.length - 1) {
          setTimeout(() => setBootComplete(true), 800);
        }
      }, line.delay);
    });
  }, []);

  useEffect(() => {
    if (bootComplete) {
      setTimeout(() => setShowHeadline(true), 300);
    }
  }, [bootComplete]);

  useEffect(() => {
    if (showHeadline) {
      headlineWords.forEach((_, index) => {
        setTimeout(() => {
          setVisibleWords(prev => [...prev, index]);
        }, index * 120);
      });
    }
  }, [showHeadline]);

  const scrollToJourney = () => {
    document.getElementById('beginning')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-4xl w-full relative z-10">
        {/* Terminal boot sequence */}
        <AnimatePresence>
          {!bootComplete && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="font-mono text-sm md:text-base space-y-2"
            >
              {bootSequence.map((line, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={visibleLines.includes(index) ? { opacity: 1, x: 0 } : {}}
                  className={`${index === bootSequence.length - 1 ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  {line.text}
                  {index === visibleLines[visibleLines.length - 1] && index !== bootSequence.length - 1 && (
                    <span className="cursor-blink ml-1" />
                  )}
                </motion.p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main headline */}
        <AnimatePresence>
          {showHeadline && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                {headlineWords.map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={visibleWords.includes(index) ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className={`inline-block mr-3 ${
                      ['simple', 'beautifully.'].includes(word) ? 'text-gradient' : ''
                    }`}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="space-y-8"
              >
                <p className="font-mono text-muted-foreground text-lg">
                  <span className="text-primary">Java</span> • <span className="text-foreground">Web</span> • <span className="text-primary">DSA</span> • <span className="text-foreground">Problem Solver</span>
                </p>

                <motion.button
                  onClick={scrollToJourney}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-3 text-lg font-medium text-primary hover:text-foreground transition-colors duration-300"
                >
                  <span className="relative">
                    Explore the Journey
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  </span>
                  <motion.span
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Name watermark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showHeadline ? 0.05 : 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 right-10 text-8xl md:text-[12rem] font-bold select-none pointer-events-none"
      >
        GMS
      </motion.div>
    </section>
  );
};

export default TerminalHero;
