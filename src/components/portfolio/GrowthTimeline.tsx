import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, Award, Rocket, Star } from 'lucide-react';

const milestones = [
  {
    year: '2021',
    title: 'Started the Journey',
    description: 'Wrote my first "Hello World" and fell in love with logic',
    icon: Rocket,
    highlight: false,
  },
  {
    year: '2022',
    title: 'Deep into DSA',
    description: 'Medium-level DSA problem solver, building strong algorithmic thinking',
    icon: Star,
    highlight: false,
  },
  {
    year: '2023',
    title: 'Algorand Campus Ambassador',
    description: 'Selected to represent blockchain technology at my campus',
    icon: Award,
    highlight: true,
  },
  {
    year: '2024',
    title: 'Building Real Systems',
    description: 'Launched FreelanceHub and Digital Queue System',
    icon: Rocket,
    highlight: false,
  },
  {
    year: 'Now',
    title: 'Continuing to Grow',
    description: 'Exploring new technologies and solving bigger problems',
    icon: GraduationCap,
    highlight: false,
  },
];

const GrowthTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="min-h-screen py-32 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 space-y-4"
        >
          <p className="font-mono text-sm text-primary tracking-wider uppercase">The Journey</p>
          <h2 className="text-3xl md:text-5xl font-bold">Growth Timeline</h2>
        </motion.div>

        <div className="relative">
          {/* Static timeline track */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border/30 -translate-x-1/2" />
          
          {/* Animated progress line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 md:left-1/2 top-0 w-px bg-primary -translate-x-1/2 origin-top"
          />

          {/* Milestones */}
          <div className="space-y-16 md:space-y-24">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`relative flex items-center gap-8 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10 ${
                      milestone.highlight ? 'bg-primary animate-pulse-glow' : 'bg-secondary border-2 border-primary'
                    }`}
                  />

                  {/* Content card */}
                  <div className={`ml-12 md:ml-0 md:w-5/12 ${isEven ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`relative p-6 bg-card/50 border rounded-lg transition-all duration-300 ${
                        milestone.highlight
                          ? 'border-primary/50 glow'
                          : 'border-border/50 hover:border-primary/30'
                      }`}
                    >
                      {milestone.highlight && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-mono rounded-full">
                          HIGHLIGHT
                        </div>
                      )}
                      
                      <div className={`flex items-center gap-3 mb-3 ${isEven ? 'md:justify-end' : ''}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          milestone.highlight ? 'bg-primary/20' : 'bg-secondary'
                        }`}>
                          <Icon className={`w-5 h-5 ${milestone.highlight ? 'text-primary' : 'text-foreground'}`} />
                        </div>
                        <span className="font-mono text-sm text-primary">{milestone.year}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </motion.div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthTimeline;
