import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const floatingKeywords = [
  { text: 'HTML', delay: 0, x: -180, y: -80, rotate: -15 },
  { text: 'CSS', delay: 0.2, x: 200, y: -50, rotate: 10 },
  { text: 'Logic', delay: 0.4, x: -100, y: 100, rotate: 5 },
  { text: 'Java', delay: 0.6, x: 160, y: 80, rotate: -8 },
  { text: 'Curiosity', delay: 0.8, x: 50, y: -120, rotate: 12 },
  { text: 'Python', delay: 0.3, x: -220, y: 20, rotate: -10 },
  { text: 'Debug', delay: 0.5, x: 240, y: -100, rotate: 8 },
  { text: 'Ideas', delay: 0.7, x: -150, y: -130, rotate: -5 },
  { text: 'Build', delay: 0.9, x: 180, y: 120, rotate: 15 },
  { text: 'Learn', delay: 1.0, x: -60, y: 140, rotate: -12 },
  { text: 'Code', delay: 0.1, x: 280, y: 30, rotate: 6 },
  { text: 'Create', delay: 0.55, x: -250, y: -40, rotate: 18 },
];

const TheBeginning = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3], [100, 0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="beginning"
      ref={ref}
      className="min-h-screen flex items-center justify-center px-6 py-32 relative"
    >
      <motion.div style={{ opacity, y }} className="max-w-3xl text-center relative">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed text-foreground/90"
        >
          "I didn't start with{' '}
          <span className="text-gradient font-medium">frameworks</span>.{' '}
          <br className="hidden md:block" />
          I started with{' '}
          <span className="text-gradient font-medium">curiosity</span>."
        </motion.p>

        {/* Floating keywords */}
        {floatingKeywords.map((keyword, index) => (
          <motion.span
            key={keyword.text}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={
              isVisible
                ? {
                    opacity: [0, 1, 1, 0],
                    scale: [0.5, 1, 1, 0.8],
                    x: [0, keyword.x * 0.5, keyword.x],
                    y: [0, keyword.y * 0.5, keyword.y],
                    rotate: [0, keyword.rotate * 0.5, keyword.rotate],
                  }
                : {}
            }
            transition={{
              duration: 4,
              delay: keyword.delay + 0.5,
              repeat: Infinity,
              repeatDelay: 2,
            }}
            className="absolute left-1/2 top-1/2 font-mono text-sm md:text-base text-primary/60 pointer-events-none"
            style={{ 
              '--drift-x': `${keyword.x}px`,
              '--drift-y': `${keyword.y}px`,
              '--drift-rotate': `${keyword.rotate}deg`,
            } as React.CSSProperties}
          >
            {keyword.text}
          </motion.span>
        ))}
      </motion.div>

      {/* Decorative line */}
      <motion.div
        style={{ scaleY: scrollYProgress }}
        className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent origin-top"
      />
    </section>
  );
};

export default TheBeginning;
