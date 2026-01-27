import { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Bug, BookOpen, Cpu, ExternalLink } from 'lucide-react';

const stats = [
  { icon: Bug, label: 'Bugs Fixed', value: 500, suffix: '+' },
  { icon: BookOpen, label: 'Concepts Learned', value: 150, suffix: '+' },
  { icon: Cpu, label: 'Systems Built', value: 25, suffix: '+' },
];

// Coding platform icons as SVG components
const CodeChefIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M11.007 0c-.787.031-1.515.37-2.222.685a12.27 12.27 0 01-1.864.703c-.635.176-1.3.354-1.814.788-.222.186-.39.43-.49.704-.096.278-.136.581-.096.869.028.187.086.368.154.543.06.139.123.276.192.412.168.33.358.651.5.998.087.209.167.422.223.64.056.217.086.454.047.675-.045.244-.16.467-.302.665-.346.482-.752.912-1.051 1.435a5.403 5.403 0 00-.486 1.118c-.132.463-.181.945-.168 1.427.014.476.078.95.176 1.418.097.465.222.923.382 1.366.152.42.339.83.555 1.218.216.387.46.757.732 1.103.273.346.569.669.893.96.162.146.333.281.506.412l.004.003c.192.142.393.27.6.387.358.202.733.376 1.127.498.378.117.77.19 1.163.216.393.026.79.01 1.184-.04.394-.051.786-.134 1.165-.247.191-.057.379-.12.563-.192.386-.15.76-.335 1.107-.558.174-.112.34-.235.497-.367.156-.131.305-.272.44-.423.27-.302.497-.642.666-1.01.169-.37.28-.767.328-1.173.049-.406.039-.82-.016-1.228a5.316 5.316 0 00-.236-.956c-.064-.184-.141-.364-.227-.54l-.135-.27a6.2 6.2 0 01-.149-.328c-.08-.202-.142-.414-.167-.633-.024-.218-.008-.442.057-.653.058-.188.156-.36.286-.505.265-.295.604-.509.94-.71.337-.2.686-.387.99-.633.153-.123.294-.262.41-.421.115-.16.206-.34.256-.535.05-.194.059-.4.021-.597a1.632 1.632 0 00-.202-.523 2.31 2.31 0 00-.349-.423c-.268-.27-.587-.484-.918-.67-.331-.186-.675-.345-1.025-.488-.35-.143-.707-.27-1.07-.382a12.44 12.44 0 00-1.092-.28 6.689 6.689 0 00-1.103-.129c-.098-.003-.197-.003-.294.002z"/>
  </svg>
);

const LeetCodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
  </svg>
);

const GFGIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M21.45 14.315c-.143.28-.334.532-.565.745a3.691 3.691 0 0 1-1.104.695 4.51 4.51 0 0 1-3.116-.016 3.79 3.79 0 0 1-2.135-2.078 3.571 3.571 0 0 1-.174-.637h5.432a.876.876 0 0 0 .876-.875V9.851a.876.876 0 0 0-.876-.876h-7.57a.876.876 0 0 0-.876.876v2.298c0 .483.392.876.876.876h.834c.106.618.344 1.209.694 1.734a4.893 4.893 0 0 0 1.457 1.364c-.24.176-.504.328-.785.447a5.24 5.24 0 0 1-2.199.444 5.34 5.34 0 0 1-2.204-.453 5.451 5.451 0 0 1-1.747-1.226 5.474 5.474 0 0 1-1.152-1.816 5.753 5.753 0 0 1-.42-2.147c0-.754.138-1.478.418-2.163a5.418 5.418 0 0 1 1.156-1.81 5.46 5.46 0 0 1 1.745-1.228 5.32 5.32 0 0 1 2.204-.454c.78 0 1.517.152 2.199.444.281.119.545.271.785.447a4.893 4.893 0 0 0-1.457 1.364 4.706 4.706 0 0 0-.694 1.734h-.834a.876.876 0 0 0-.876.876v2.298c0 .483.392.876.876.876h7.57a.876.876 0 0 0 .876-.876V6.852a.876.876 0 0 0-.876-.875h-5.432c.055-.218.11-.43.174-.637a3.79 3.79 0 0 1 2.135-2.078 4.51 4.51 0 0 1 3.116-.016c.406.14.783.365 1.104.695.231.213.422.465.565.745a.876.876 0 0 0 1.544-.835 4.457 4.457 0 0 0-.887-1.168 4.78 4.78 0 0 0-1.417-.898 6.226 6.226 0 0 0-4.28.02 5.535 5.535 0 0 0-3.122 3.033 6.036 6.036 0 0 0-.4 1.264H8.37a6.036 6.036 0 0 0-.4-1.264A5.535 5.535 0 0 0 4.848 2.84a6.226 6.226 0 0 0-4.28-.02 4.78 4.78 0 0 0-1.417.898A4.457 4.457 0 0 0-1.736 4.886a.876.876 0 0 0 1.544.835c.143-.28.334-.532.565-.745a3.691 3.691 0 0 1 1.104-.695 4.51 4.51 0 0 1 3.116.016 3.79 3.79 0 0 1 2.135 2.078c.064.207.12.419.174.637H1.47a.876.876 0 0 0-.876.876v2.298c0 .483.392.876.876.876h7.57a.876.876 0 0 0 .876-.876V7.988a.876.876 0 0 0-.876-.876h-.834a4.706 4.706 0 0 0-.694-1.734 4.893 4.893 0 0 0-1.457-1.364c.24-.176.504-.328.785-.447a5.24 5.24 0 0 1 2.199-.444c.78 0 1.517.152 2.204.454a5.46 5.46 0 0 1 1.745 1.228 5.418 5.418 0 0 1 1.156 1.81c.28.685.418 1.409.418 2.163 0 .755-.14 1.48-.42 2.147a5.474 5.474 0 0 1-1.152 1.816 5.451 5.451 0 0 1-1.747 1.226 5.34 5.34 0 0 1-2.204.453 5.24 5.24 0 0 1-2.199-.444 4.326 4.326 0 0 1-.785-.447 4.893 4.893 0 0 0 1.457-1.364c.35-.525.588-1.116.694-1.734h.834a.876.876 0 0 0 .876-.876V9.851a.876.876 0 0 0-.876-.876H1.47a.876.876 0 0 0-.876.876v2.298c0 .483.392.876.876.876h5.432c-.055.218-.11.43-.174.637a3.79 3.79 0 0 1-2.135 2.078 4.51 4.51 0 0 1-3.116.016 3.691 3.691 0 0 1-1.104-.695 2.507 2.507 0 0 1-.565-.745.876.876 0 0 0-1.544.835c.207.453.509.863.887 1.168.445.371.953.672 1.417.898a6.226 6.226 0 0 0 4.28-.02 5.535 5.535 0 0 0 3.122-3.033c.156-.41.285-.833.4-1.264h3.26c.115.431.244.854.4 1.264a5.535 5.535 0 0 0 3.122 3.033 6.226 6.226 0 0 0 4.28.02c.464-.226.972-.527 1.417-.898.378-.305.68-.715.887-1.168a.876.876 0 0 0-1.544-.835z"/>
  </svg>
);

const NxtWaveIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
);

const codingPlatforms = [
  { 
    name: 'LeetCode', 
    icon: LeetCodeIcon, 
    username: 'manideep_surya',
    url: 'https://leetcode.com/manideep_surya',
    color: 'hover:text-[#FFA116]',
    badge: null
  },
  { 
    name: 'CodeChef', 
    icon: CodeChefIcon, 
    username: 'manideep_surya',
    url: 'https://www.codechef.com/users/manideep_surya',
    color: 'hover:text-[#5B4638]',
    badge: null
  },
  { 
    name: 'GeeksforGeeks', 
    icon: GFGIcon, 
    username: 'manideep_surya',
    url: 'https://auth.geeksforgeeks.org/user/manideep_surya',
    color: 'hover:text-[#2F8D46]',
    badge: null
  },
  { 
    name: 'NxtWave', 
    icon: NxtWaveIcon, 
    username: 'manideep_surya',
    url: 'https://www.ccbp.in/',
    color: 'hover:text-[#1E88E5]',
    badge: 'Currently Learning'
  },
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

          {/* Coding Platforms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-6"
          >
            <p className="font-mono text-sm text-center text-muted-foreground uppercase tracking-wider">
              Find me solving problems on
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              {codingPlatforms.map((platform, index) => {
                const Icon = platform.icon;
                return (
                  <motion.a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`group relative flex items-center gap-3 px-5 py-3 bg-secondary/50 border border-border/50 rounded-lg transition-all duration-300 hover:border-primary/50 hover:bg-secondary ${platform.color}`}
                  >
                    {platform.badge && (
                      <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-mono rounded-full animate-pulse">
                        {platform.badge}
                      </span>
                    )}
                    <Icon />
                    <div className="text-left">
                      <p className="font-medium text-foreground text-sm">{platform.name}</p>
                      <p className="font-mono text-xs text-muted-foreground">@{platform.username}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
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
