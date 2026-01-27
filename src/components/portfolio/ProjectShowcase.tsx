import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, Database, Clock, Users, Ticket } from 'lucide-react';

interface SystemNode {
  id: string;
  label: string;
  icon: typeof User;
  description: string;
  x: number;
  y: number;
}

interface Project {
  id: string;
  title: string;
  subtitle: string;
  nodes: SystemNode[];
  connections: [string, string][];
}

const projects: Project[] = [
  {
    id: 'freelancehub',
    title: 'FreelanceHub',
    subtitle: 'Secure freelance payment platform',
    nodes: [
      { id: 'user', label: 'User', icon: User, description: 'Freelancers and clients interact through secure profiles', x: 50, y: 30 },
      { id: 'escrow', label: 'Escrow', icon: Lock, description: 'Payments held securely until work is verified', x: 50, y: 70 },
      { id: 'database', label: 'Database', icon: Database, description: 'All transactions and contracts stored securely', x: 85, y: 50 },
    ],
    connections: [['user', 'escrow'], ['escrow', 'database'], ['user', 'database']],
  },
  {
    id: 'queue',
    title: 'Digital Queue System',
    subtitle: 'Smart queue management solution',
    nodes: [
      { id: 'customers', label: 'Customers', icon: Users, description: 'Join queue remotely via mobile or kiosk', x: 20, y: 50 },
      { id: 'token', label: 'Token', icon: Ticket, description: 'Real-time token generation and tracking', x: 50, y: 30 },
      { id: 'timer', label: 'Timer', icon: Clock, description: 'Dynamic wait time estimation', x: 50, y: 70 },
      { id: 'data', label: 'Analytics', icon: Database, description: 'Queue patterns and optimization insights', x: 80, y: 50 },
    ],
    connections: [['customers', 'token'], ['token', 'timer'], ['timer', 'data'], ['token', 'data']],
  },
];

const ProjectShowcase = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const project = projects[activeProject];

  const getNodePosition = (nodeId: string) => {
    const node = project.nodes.find((n) => n.id === nodeId);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-6 py-32">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          {/* Section header */}
          <div className="text-center space-y-4">
            <p className="font-mono text-sm text-primary tracking-wider uppercase">Featured Work</p>
            <h2 className="text-3xl md:text-5xl font-bold">Systems I've Built</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Not cards. Not screenshots. Interact with the architecture.
            </p>
          </div>

          {/* Project tabs */}
          <div className="flex justify-center gap-4">
            {projects.map((p, index) => (
              <button
                key={p.id}
                onClick={() => setActiveProject(index)}
                className={`px-6 py-3 font-medium transition-all duration-300 border ${
                  activeProject === index
                    ? 'bg-primary text-primary-foreground border-primary glow'
                    : 'bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>

          {/* System diagram */}
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gradient">{project.title}</h3>
                <p className="text-muted-foreground">{project.subtitle}</p>
              </div>

              <div className="relative aspect-video max-w-4xl mx-auto bg-secondary/20 border border-border/50 rounded-lg overflow-hidden">
                {/* Connection lines */}
                <svg
                  ref={svgRef}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  {project.connections.map(([from, to], index) => {
                    const fromPos = getNodePosition(from);
                    const toPos = getNodePosition(to);
                    const isHighlighted = hoveredNode === from || hoveredNode === to;
                    return (
                      <motion.line
                        key={`${from}-${to}`}
                        x1={fromPos.x}
                        y1={fromPos.y}
                        x2={toPos.x}
                        y2={toPos.y}
                        stroke={isHighlighted ? 'hsl(217, 91%, 60%)' : 'hsl(0, 0%, 30%)'}
                        strokeWidth={isHighlighted ? 0.5 : 0.3}
                        strokeDasharray={isHighlighted ? '0' : '2 2'}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: index * 0.2, duration: 0.8 }}
                      />
                    );
                  })}
                </svg>

                {/* Nodes */}
                {project.nodes.map((node, index) => {
                  const Icon = node.icon;
                  const isHovered = hoveredNode === node.id;
                  return (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.15, type: 'spring' }}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                      style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    >
                      <motion.div
                        animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                        className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isHovered ? 'bg-primary glow-intense' : 'bg-secondary border border-border'
                        }`}
                      >
                        <Icon className={`w-6 h-6 md:w-8 md:h-8 ${isHovered ? 'text-primary-foreground' : 'text-foreground'}`} />
                      </motion.div>
                      <p className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-xs md:text-sm transition-colors ${
                        isHovered ? 'text-primary' : 'text-muted-foreground'
                      }`}>
                        {node.label}
                      </p>

                      {/* Tooltip */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-12 w-48 p-3 bg-card border border-border rounded-lg shadow-lg z-10"
                          >
                            <p className="text-sm text-foreground">{node.description}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
