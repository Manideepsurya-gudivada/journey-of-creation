import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Coffee, 
  FileCode2, 
  Code2, 
  Globe, 
  Palette, 
  LayoutGrid, 
  Binary, 
  GitBranch,
  Database,
  Link,
  Brain,
  Award,
  Trophy,
  Hexagon,
  ChefHat,
  Terminal
} from 'lucide-react';

const skills = [
  { name: 'Java', icon: Coffee },
  { name: 'JavaScript', icon: FileCode2 },
  { name: 'React.js', icon: Code2 },
  { name: 'Node.js', icon: Code2 },
  { name: 'Python', icon: Code2 },
  { name: 'HTML', icon: Globe },
  { name: 'CSS', icon: Palette },
  { name: 'Bootstrap', icon: LayoutGrid },
  { name: 'Git', icon: GitBranch },
  { name: 'SQL', icon: Database },
  { name: 'Blockchain', icon: Link },
  { name: 'DSA', icon: Brain },
];

const achievements = [
  { title: 'Lead of Algorand Blockchain Club', icon: Award },
  { title: 'Smart Interviews Certificate', icon: Trophy },
];

const codingProfiles = [
  { name: 'LeetCode', icon: Terminal, url: '#', color: 'hsl(var(--primary))' },
  { name: 'HackerRank', icon: Hexagon, url: '#', color: 'hsl(142 70% 45%)' },
  { name: 'CodeChef', icon: ChefHat, url: '#', color: 'hsl(30 80% 50%)' },
  { name: 'InterviewBit', icon: Code2, url: '#', color: 'hsl(200 80% 50%)' },
];

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-12">
    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{children}</h2>
    <div className="w-20 h-1 bg-gradient-to-r from-muted via-muted-foreground to-muted rounded-full mx-auto opacity-50" />
  </div>
);

const SkillCard = ({ skill, index }: { skill: typeof skills[0]; index: number }) => {
  const Icon = skill.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="bg-card/50 border border-border/30 rounded-xl p-6 flex flex-col items-center gap-4 transition-all duration-300 hover:border-primary/30 hover:bg-card/80">
        <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
          <Icon className="w-6 h-6 text-foreground/70 group-hover:text-primary transition-colors" />
        </div>
        <span className="font-medium text-foreground/90">{skill.name}</span>
      </div>
    </motion.div>
  );
};

const AchievementCard = ({ achievement, index }: { achievement: typeof achievements[0]; index: number }) => {
  const Icon = achievement.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-card/50 border border-border/30 rounded-2xl p-6 flex items-center gap-4 hover:border-primary/30 transition-all duration-300"
    >
      <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-foreground/70" />
      </div>
      <span className="text-lg font-medium text-foreground/90">{achievement.title}</span>
    </motion.div>
  );
};

const CodingProfileCard = ({ profile, index }: { profile: typeof codingProfiles[0]; index: number }) => {
  const Icon = profile.icon;
  
  return (
    <motion.a
      href={profile.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative block"
      style={{ '--glow-color': profile.color } as React.CSSProperties}
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{ background: `${profile.color}`, opacity: 0 }}
      />
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"
        style={{ boxShadow: `0 0 40px 10px ${profile.color}, inset 0 0 20px 5px ${profile.color}20` }}
      />
      <div className="relative bg-card/50 border border-border/30 rounded-2xl p-8 md:p-12 flex flex-col items-center gap-4 transition-all duration-300 group-hover:border-transparent group-hover:bg-card/80"
        style={{ 
          transition: 'all 0.3s ease',
        }}
      >
        <div 
          className="w-16 h-16 flex items-center justify-center transition-all duration-300"
          style={{ color: 'hsl(var(--foreground))' }}
        >
          <Icon className="w-12 h-12 group-hover:scale-110 transition-transform duration-300" 
            style={{ color: 'inherit' }}
          />
        </div>
        <span className="text-xl font-semibold text-foreground">{profile.name}</span>
      </div>
      <style>{`
        .group:hover > div:last-of-type {
          border-color: var(--glow-color) !important;
          box-shadow: 0 0 30px -5px var(--glow-color), 0 0 60px -10px var(--glow-color);
        }
      `}</style>
    </motion.a>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="py-24 px-6 relative">
      {/* Skills */}
      <div className="max-w-6xl mx-auto mb-24">
        <SectionTitle>Skills</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="max-w-4xl mx-auto mb-24">
        <SectionTitle>Achievements</SectionTitle>
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <AchievementCard key={achievement.title} achievement={achievement} index={index} />
          ))}
        </div>
      </div>

      {/* Coding Profiles */}
      <div className="max-w-4xl mx-auto">
        <SectionTitle>Coding Profiles</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {codingProfiles.map((profile, index) => (
            <CodingProfileCard key={profile.name} profile={profile} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
