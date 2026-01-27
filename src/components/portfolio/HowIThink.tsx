import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Blocks, Zap, Layers } from 'lucide-react';

type ThinkMode = 'build' | 'optimize' | 'scale';

const modes: { id: ThinkMode; label: string; icon: typeof Blocks; content: { title: string; skills: string[]; description: string } }[] = [
  {
    id: 'build',
    label: 'Build',
    icon: Blocks,
    content: {
      title: 'Crafting Interfaces',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Responsive Design'],
      description: 'I build user interfaces that feel intuitive and look beautiful. Every pixel matters, every interaction counts.',
    },
  },
  {
    id: 'optimize',
    label: 'Optimize',
    icon: Zap,
    content: {
      title: 'Performance & Logic',
      skills: ['Java', 'DSA', 'Algorithm Design', 'Time Complexity', 'Problem Solving'],
      description: 'I think in patterns and optimize for efficiency. Clean code that runs fast and scales well.',
    },
  },
  {
    id: 'scale',
    label: 'Scale',
    icon: Layers,
    content: {
      title: 'Architecture & Systems',
      skills: ['PostgreSQL', 'MongoDB', 'REST APIs', 'System Design', 'Cloud Architecture'],
      description: 'I design systems that grow with your needs. From databases to deployment, built for the long run.',
    },
  },
];

const HowIThink = () => {
  const [activeMode, setActiveMode] = useState<ThinkMode>('build');
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const currentMode = modes.find((m) => m.id === activeMode)!;

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-6 py-32">
      <div className="max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          {/* Section header */}
          <div className="text-center space-y-4">
            <p className="font-mono text-sm text-primary tracking-wider uppercase">How I Think</p>
            <h2 className="text-3xl md:text-5xl font-bold">Different modes for different challenges</h2>
          </div>

          {/* Mode toggle */}
          <div className="flex justify-center">
            <div className="inline-flex bg-secondary/50 p-1.5 rounded-full relative">
              {modes.map((mode) => {
                const Icon = mode.icon;
                const isActive = activeMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setActiveMode(mode.id)}
                    className={`relative px-6 py-3 rounded-full font-medium transition-colors duration-300 flex items-center gap-2 ${
                      isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeMode"
                        className="absolute inset-0 bg-primary rounded-full glow"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <Icon className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">{mode.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mode content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMode}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              {/* Left: Skills visualization */}
              <div className="relative aspect-square max-w-md mx-auto w-full">
                <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse-glow" />
                <div className="absolute inset-8 bg-secondary/30 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="space-y-3 text-center">
                    {currentMode.content.skills.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="font-mono text-sm md:text-base"
                        style={{
                          opacity: 1 - index * 0.15,
                        }}
                      >
                        <span className="text-primary">{`{`}</span>
                        <span className="text-foreground mx-2">{skill}</span>
                        <span className="text-primary">{`}`}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Description */}
              <div className="space-y-6">
                <h3 className="text-2xl md:text-4xl font-bold text-gradient">
                  {currentMode.content.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {currentMode.content.description}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {currentMode.content.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-secondary/50 text-foreground/80 text-sm font-mono rounded-full border border-border/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default HowIThink;
