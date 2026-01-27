import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: Mail, label: 'Email', href: 'mailto:contact@example.com' },
];

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-6 py-32 relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      </div>

      <div className="max-w-3xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {/* Main message */}
          <div className="space-y-6">
            <p className="text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed text-foreground/90">
              If this journey resonated with you —
              <br />
              <span className="text-gradient font-medium">
                let's build something meaningful.
              </span>
            </p>
          </div>

          {/* CTA Button */}
          <motion.a
            href="mailto:contact@example.com"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-medium text-lg rounded-full animate-pulse-glow hover:shadow-none transition-shadow duration-300 group"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex justify-center gap-6 pt-8"
          >
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full bg-secondary/50 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors duration-300"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="pt-16"
          >
            <p className="font-mono text-sm text-muted-foreground">
              Designed & Built by{' '}
              <span className="text-foreground">Gudivada Manideep Surya</span>
            </p>
            <p className="font-mono text-xs text-muted-foreground/60 mt-2">
              © {new Date().getFullYear()} • From Curiosity → Code → Creation
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
