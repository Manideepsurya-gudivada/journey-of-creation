import { motion } from 'framer-motion';
import { useRef } from 'react';
import { 
  Coffee, 
  FileCode2, 
  Code2, 
  Globe, 
  Palette, 
  LayoutGrid, 
  GitBranch,
  Database,
  Link,
  Brain,
  Award,
  Trophy
} from 'lucide-react';
import leetcodeLogo from '@/assets/logos/leetcode.svg';
import hackerrankLogo from '@/assets/logos/hackerrank.svg';
import codechefLogo from '@/assets/logos/codechef.svg';

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
  { 
    name: 'LeetCode', 
    url: 'https://leetcode.com/u/manideep_gudivada/', 
    color: 'hsl(40 100% 50%)',
    logo: leetcodeLogo
  },
  { 
    name: 'HackerRank', 
    url: 'https://www.hackerrank.com/profile/gudivadamanideep', 
    color: 'hsl(142 70% 45%)',
    logo: hackerrankLogo
  },
  { 
    name: 'CodeChef', 
    url: 'https://www.codechef.com/users/manideep_2412', 
    color: 'hsl(30 80% 50%)',
    logo: codechefLogo
  },
  { 
    name: 'InterviewBit', 
    url: 'https://www.interviewbit.com/profile/manideep_surya/', 
    color: 'hsl(200 80% 50%)',
    logo: null // Will use custom SVG icon
  },
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
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.05,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="bg-card/50 border border-border/30 rounded-xl p-6 flex flex-col items-center gap-4 transition-all duration-300 hover:border-primary/30 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5">
        <motion.div 
          className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="w-6 h-6 text-foreground/70 group-hover:text-primary transition-colors" />
        </motion.div>
        <span className="font-medium text-foreground/90">{skill.name}</span>
      </div>
    </motion.div>
  );
};

const AchievementCard = ({ achievement, index }: { achievement: typeof achievements[0]; index: number }) => {
  const Icon = achievement.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 80
      }}
      whileHover={{ x: 10 }}
      viewport={{ once: true }}
      className="bg-card/50 border border-border/30 rounded-2xl p-6 flex items-center gap-4 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
    >
      <motion.div 
        className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center flex-shrink-0"
        whileHover={{ scale: 1.2, rotate: 15 }}
      >
        <Icon className="w-5 h-5 text-foreground/70" />
      </motion.div>
      <span className="text-lg font-medium text-foreground/90">{achievement.title}</span>
    </motion.div>
  );
};

// Custom InterviewBit icon component
const InterviewBitIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current">
    <path d="M21.338 11.636L12.302.376a.396.396 0 0 0-.604 0L2.662 11.636a.4.4 0 0 0 .302.66h4.873v11.308c0 .22.18.396.4.396h7.526a.397.397 0 0 0 .4-.396V12.296h4.873a.4.4 0 0 0 .302-.66z"/>
  </svg>
);

const CodingProfileCard = ({ profile, index }: { profile: typeof codingProfiles[0]; index: number }) => {
  return (
    <motion.a
      href={profile.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.03,
        transition: { duration: 0.2 }
      }}
      viewport={{ once: true }}
      className="group relative block overflow-hidden"
      style={{ '--glow-color': profile.color } as React.CSSProperties}
    >
      {/* Animated glow background */}
      <motion.div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
        style={{ 
          background: `radial-gradient(circle at center, ${profile.color}40, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Border glow */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ 
          boxShadow: `0 0 30px 5px ${profile.color}30, inset 0 0 20px 2px ${profile.color}10`,
          border: `1px solid ${profile.color}50`
        }}
      />
      
      <div className="relative bg-card/60 border border-border/30 rounded-2xl p-8 md:p-12 flex flex-col items-center gap-5 transition-all duration-300 group-hover:border-transparent group-hover:bg-card/90 backdrop-blur-sm">
        <motion.div 
          className="w-16 h-16 flex items-center justify-center"
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.4 }}
        >
          {profile.logo ? (
            <img 
              src={profile.logo} 
              alt={profile.name} 
              className="w-12 h-12 object-contain transition-all duration-300 brightness-0 invert opacity-70 group-hover:opacity-100 group-hover:scale-110"
            />
          ) : (
            <div className="text-foreground/70 group-hover:text-foreground transition-colors group-hover:scale-110 duration-300">
              <InterviewBitIcon />
            </div>
          )}
        </motion.div>
        <span className="text-xl font-semibold text-foreground/90 group-hover:text-foreground transition-colors">{profile.name}</span>
        
        {/* Hover arrow indicator */}
        <motion.div
          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ x: -10 }}
          whileHover={{ x: 0 }}
        >
          <svg className="w-5 h-5 text-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </motion.div>
      </div>
    </motion.a>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);

  return (
    <section ref={ref} className="py-24 px-6 relative">
      {/* Skills */}
      <div className="max-w-6xl mx-auto mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <SectionTitle>Skills</SectionTitle>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="max-w-4xl mx-auto mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <SectionTitle>Achievements</SectionTitle>
        </motion.div>
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <AchievementCard key={achievement.title} achievement={achievement} index={index} />
          ))}
        </div>
      </div>

      {/* Coding Profiles */}
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <SectionTitle>Coding Profiles</SectionTitle>
        </motion.div>
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
