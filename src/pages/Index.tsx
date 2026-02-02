import TerminalHero from '@/components/portfolio/TerminalHero';
import TheBeginning from '@/components/portfolio/TheBeginning';
import HowIThink from '@/components/portfolio/HowIThink';
import ProjectShowcase from '@/components/portfolio/ProjectShowcase';
import SkillsSection from '@/components/portfolio/SkillsSection';
import EducationSection from '@/components/portfolio/EducationSection';
import GrowthTimeline from '@/components/portfolio/GrowthTimeline';
import ContactSection from '@/components/portfolio/ContactSection';
import CustomCursor from '@/components/portfolio/CustomCursor';
const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <CustomCursor />
      
      {/* Navigation bar - minimal */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md bg-background/50 border-b border-border/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="font-mono text-sm text-primary">GMS</span>
          <div className="flex gap-6">
            <a 
              href="#beginning" 
              className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Journey
            </a>
            <a 
              href="mailto:contact@example.com" 
              className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main>
        <TerminalHero />
        <TheBeginning />
        <HowIThink />
        <ProjectShowcase />
        <SkillsSection />
        <EducationSection />
        <GrowthTimeline />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
