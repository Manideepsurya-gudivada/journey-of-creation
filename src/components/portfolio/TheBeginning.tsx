import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const floatingKeywords = [
  { text: 'HTML', delay: 0, x: -120, y: -60, rotate: -15 },
  { text: 'CSS', delay: 0.2, x: 150, y: -40, rotate: 10 },
  { text: 'Logic', delay: 0.4, x: -80, y: 80, rotate: 5 },
  { text: 'Java', delay: 0.6, x: 100, y: 60, rotate: -8 },
  { text: 'Curiosity', delay: 0.8, x: 0, y: -100, rotate: 12 },
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
