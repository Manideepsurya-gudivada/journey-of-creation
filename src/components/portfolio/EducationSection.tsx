import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, BookOpen } from 'lucide-react';

const education = [
  {
    degree: 'B.Tech in Computer Science',
    institution: 'Your University Name',
    location: 'City, State',
    period: '2021 - 2025',
    description: 'Specializing in full-stack development and blockchain technology. Active member of coding clubs and technical communities.',
    highlights: ['CGPA: 8.5+', 'Technical Club Lead', 'Hackathon Winner'],
  },
  {
    degree: 'Intermediate (12th)',
    institution: 'Your College Name',
    location: 'City, State',
    period: '2019 - 2021',
    description: 'Completed with focus on Mathematics, Physics, and Computer Science.',
    highlights: ['90%+ Score', 'Science Stream'],
  },
  {
    degree: 'Secondary Education (10th)',
    institution: 'Your School Name',
    location: 'City, State',
    period: '2019',
    description: 'Built strong foundation in academics with excellent performance.',
    highlights: ['95%+ Score', 'Academic Excellence'],
  },
];

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-16 text-center">
    <motion.h2 
      className="text-4xl md:text-5xl font-bold text-foreground mb-3"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.h2>
    <motion.div 
      className="w-20 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-full mx-auto"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
    />
  </div>
);

const EducationCard = ({ edu, index }: { edu: typeof education[0]; index: number }) => {
  const isLeft = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 80
      }}
      viewport={{ once: true, margin: "-100px" }}
      className={`relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col gap-8 mb-16 last:mb-0`}
    >
      {/* Timeline connector for desktop */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border/50 -translate-x-1/2" />
      
      {/* Timeline dot */}
      <motion.div 
        className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary z-10"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="absolute inset-0 rounded-full bg-primary"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Card */}
      <motion.div 
        className={`w-full md:w-[45%] ${isLeft ? 'md:text-right' : 'md:text-left'}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl p-6 md:p-8 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 group">
          {/* Header */}
          <div className={`flex items-start gap-4 mb-4 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
            <motion.div 
              className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <GraduationCap className="w-6 h-6 text-primary" />
            </motion.div>
            <div className={isLeft ? 'md:text-right' : ''}>
              <h3 className="text-xl font-bold text-foreground mb-1">{edu.degree}</h3>
              <p className="text-primary font-medium">{edu.institution}</p>
            </div>
          </div>

          {/* Meta info */}
          <div className={`flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground ${isLeft ? 'md:justify-end' : ''}`}>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {edu.period}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {edu.location}
            </span>
          </div>

          {/* Description */}
          <p className={`text-foreground/70 mb-4 leading-relaxed ${isLeft ? 'md:text-right' : ''}`}>
            {edu.description}
          </p>

          {/* Highlights */}
          <div className={`flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : ''}`}>
            {edu.highlights.map((highlight, i) => (
              <motion.span
                key={highlight}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.15 + i * 0.1 + 0.3 }}
                viewport={{ once: true }}
                className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
              >
                {highlight}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Spacer for timeline alignment */}
      <div className="hidden md:block w-[45%]" />
    </motion.div>
  );
};

const EducationSection = () => {
  return (
    <section id="education" className="py-24 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
        animate={{ 
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl"
        animate={{ 
          x: [0, -30, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="max-w-5xl mx-auto relative">
        <SectionTitle>Education</SectionTitle>
        
        {/* Education icon header */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <BookOpen className="w-16 h-16 text-primary/30" />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-20 h-20 border border-primary/20 rounded-full" />
            </motion.div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Main timeline line for mobile */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-px bg-border/50" />
          
          {education.map((edu, index) => (
            <EducationCard key={edu.degree} edu={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
