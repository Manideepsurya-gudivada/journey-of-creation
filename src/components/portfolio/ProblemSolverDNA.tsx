import { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Bug, BookOpen, Cpu } from 'lucide-react';

const stats = [
  { icon: Bug, label: 'Bugs Fixed', value: 500, suffix: '+' },
  { icon: BookOpen, label: 'Concepts Learned', value: 150, suffix: '+' },
  { icon: Cpu, label: 'Systems Built', value: 25, suffix: '+' },
];

const Counter = ({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: [0.25, 0.46, 0.45, 0.94],
        onUpdate: (v) => setDisplayValue(Math.floor(v)),
      });
      return () => controls.stop();
    }
  }, [inView, value]);

  return (
    <span className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
};

const ProblemSolverDNA = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-6 py-32 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-5xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          {/* Section header */}
          <div className="text-center space-y-4">
            <p className="font-mono text-sm text-primary tracking-wider uppercase">Problem Solver DNA</p>
            <h2 className="text-3xl md:text-5xl font-bold">
              I don't just write code.{' '}
              <span className="text-gradient">I solve constraints.</span>
            </h2>
          </div>

          {/* Stats grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="group relative p-8 bg-card/50 border border-border/50 rounded-lg text-center hover:border-primary/50 transition-all duration-500 noise-overlay"
                >
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
                  
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="w-16 h-16 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-500"
                  >
                    <Icon className="w-8 h-8 text-primary" />
                  </motion.div>

                  <div className="text-5xl md:text-6xl font-bold text-foreground mb-2">
                    <Counter value={stat.value} suffix={stat.suffix} inView={isInView} />
                  </div>
                  
                  <p className="font-mono text-sm text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-center"
          >
            <p className="text-xl md:text-2xl text-muted-foreground italic">
              "The best solutions come from understanding the problem,
              <br className="hidden md:block" />
              not just the syntax."
            </p>
          </motion.blockquote>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSolverDNA;
