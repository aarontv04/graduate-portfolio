import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import React, { useState, useRef, useEffect, MouseEvent as ReactMouseEvent } from 'react';
import {
  Code2,
  Cpu,
  Database,
  ExternalLink,
  Github,
  Award,
  Linkedin,
  Mail,
  MapPin,
  Terminal,
  Activity,
  GraduationCap,
  Download,
  Phone,
  ChevronDown
} from 'lucide-react';

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  topBorderClass?: string;
}

function InteractiveCard({
  children,
  className = "",
  glowColor = "rgba(99, 102, 241, 0.15)",
  topBorderClass = "from-transparent via-indigo-500/50 to-transparent"
}: InteractiveCardProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -2, scale: 1.01 }}
      className={`group relative bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/80 rounded-3xl p-8 md:p-10 transition-all shadow-xl overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 40%)`
        }}
      />
      <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${topBorderClass} scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`}></div>

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

function ExpandableProjectCard({
  title,
  date,
  shortDesc,
  children,
  techStack,
  glowColor,
  topBorderClass,
  githubLink
}: {
  title: string;
  date: string;
  shortDesc: string;
  children: React.ReactNode;
  techStack: string[];
  glowColor: string;
  topBorderClass: string;
  githubLink?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative" onClick={() => setIsExpanded(!isExpanded)}>
      <InteractiveCard
        className="cursor-pointer hover:border-zinc-700/80 transition-colors duration-300"
        glowColor={glowColor}
        topBorderClass={topBorderClass}
      >
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
          <h4 className="font-display text-xl md:text-2xl font-bold text-zinc-100 group-hover:text-zinc-300 transition-colors flex items-center gap-3">
            {title}
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-zinc-500 hover:text-white transition-colors p-1"
                title="View Source on GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            )}
          </h4>
          <span className="text-zinc-400 font-mono text-sm mt-2 md:mt-0 px-3 py-1 bg-zinc-800/40 rounded-full border border-zinc-700/50">
            {date}
          </span>
        </div>

        <p className="text-zinc-400 leading-relaxed max-w-4xl pr-8">
          {shortDesc}
        </p>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="overflow-hidden"
            >
              <div
                className="pt-6 mt-6 border-t border-zinc-800/60"
                onClick={(e) => e.stopPropagation()} // Stop propagation when clicking inside the expanded content
              >
                {children}

                <div className="flex flex-wrap gap-2 mt-8">
                  {techStack.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-zinc-950/80 text-zinc-300 rounded-full font-mono text-xs border border-zinc-800/50">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-center mt-6">
          <ChevronDown
            className={`h-5 w-5 text-zinc-500 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </div>
      </InteractiveCard>
    </div>
  );
}

export function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const navLinks = [
    { label: 'Education', id: 'education' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Skills', id: 'skills' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-xl bg-zinc-950/80 border-b border-zinc-800/60 shadow-[0_4px_30px_rgba(0,0,0,0.4)] py-3'
          : 'backdrop-blur-md bg-zinc-950/40 border-b border-zinc-800/20 py-4'
      } px-6`}
    >
      <div className="mx-auto max-w-5xl w-full flex items-center justify-between">
        {/* Logo */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="relative font-display text-xl font-bold tracking-tight group"
        >
          <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 via-indigo-300 to-zinc-100 group-hover:from-indigo-400 group-hover:via-purple-400 group-hover:to-pink-400 transition-all duration-500">
            ATV.
          </span>
          <span className="absolute inset-0 blur-lg bg-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full scale-150" />
        </motion.button>

        {/* Nav Links — hidden on small screens */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <motion.button
              key={link.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo(link.id)}
              className="relative px-4 py-1.5 text-sm font-mono text-zinc-400 hover:text-zinc-100 transition-colors duration-200 rounded-full hover:bg-zinc-800/50 group"
            >
              {link.label}
              <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 group-hover:w-3/4 h-px bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 rounded-full" />
            </motion.button>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-2">
          {[
            { href: 'mailto:aarontom14063@gmail.com', icon: <Mail className="h-4 w-4" />, label: 'Email', color: 'hover:text-rose-400 hover:border-rose-500/40 hover:bg-rose-500/10 hover:shadow-[0_0_12px_rgba(244,63,94,0.3)]' },
            { href: 'https://linkedin.com/in/aaron-tom-varghese', icon: <Linkedin className="h-4 w-4" />, label: 'LinkedIn', target: '_blank', color: 'hover:text-blue-400 hover:border-blue-500/40 hover:bg-blue-500/10 hover:shadow-[0_0_12px_rgba(59,130,246,0.3)]' },
            { href: 'https://github.com/aarontv04', icon: <Github className="h-4 w-4" />, label: 'GitHub', target: '_blank', color: 'hover:text-zinc-100 hover:border-zinc-500/40 hover:bg-zinc-500/10 hover:shadow-[0_0_12px_rgba(161,161,170,0.3)]' },
          ].map(({ href, icon, label, target, color }) => (
            <motion.a
              key={label}
              href={href}
              target={target}
              rel={target ? 'noreferrer' : undefined}
              whileHover={{ scale: 1.1, y: -1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={label}
              className={`p-2 rounded-xl text-zinc-500 border border-transparent transition-all duration-200 ${color}`}
            >
              {icon}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}

export function TypewriterText({ titles }: { titles: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [titles.length]);

  return (
    <div className="h-[40px] md:h-[48px] overflow-hidden flex items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 inline-block font-display text-2xl md:text-3xl font-bold leading-none py-1"
        >
          {titles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsVisible(true);
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-indigo-400 rounded-full pointer-events-none z-[100] mix-blend-screen shadow-[0_0_10px_rgba(99,102,241,0.8)] hidden md:block"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 40, mass: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-purple-500/50 rounded-full pointer-events-none z-[99] mix-blend-screen flex items-center justify-center bg-purple-500/10 backdrop-blur-[1px] hidden md:block"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(168, 85, 247, 0.2)" : "rgba(168, 85, 247, 0.1)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.5 }}
      />
    </>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Clear hash to prevent jumping on reload if they clicked a link before
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    window.scrollTo(0, 0);
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen text-zinc-100 font-sans selection:bg-purple-500/30 selection:text-white overflow-x-hidden">
      <CustomCursor />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left z-[100]"
        style={{ scaleX }}
      />

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(8px)', scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950"
          >
            <div className="relative flex flex-col items-center">
              <motion.div
                animate={{
                  scale: [0.95, 1.05, 0.95],
                  opacity: [0.6, 1, 0.6],
                  filter: ["blur(2px)", "blur(0px)", "blur(2px)"]
                }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="font-display text-5xl md:text-6xl font-bold tracking-widest text-zinc-100"
              >
                ATV.
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-[50px] opacity-20" />

              <div className="w-32 h-[2px] bg-zinc-800 mt-8 rounded-full overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Animated Background - Optimized for Mobile Performance */}
      <div className="fixed inset-0 z-[-1] bg-zinc-950 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] h-[70vh] w-[70vw] origin-center opacity-[0.15] blur-[80px] md:blur-[100px] will-change-transform"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-full" />
        </motion.div>
        {/* Second gradient hidden on mobile to halve GPU load */}
        <motion.div
          animate={{ rotate: -360, x: [0, 50, -50, 0], y: [0, -50, 50, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] h-[80vh] w-[80vw] origin-center opacity-[0.12] blur-[120px] will-change-transform hidden md:block"
        >
          <div className="absolute inset-0 bg-gradient-to-tl from-blue-600 via-teal-600 to-emerald-500 rounded-full" />
        </motion.div>
        {/* SVG Noise filter is notoriously bad for scrolling performance; restricted to desktop only */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay hidden md:block" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12 md:py-24 relative z-10">

        {/* Navigation / Header */}
        <StickyNav />

        {/* Add padding to prevent content from hiding behind fixed nav */}
        <div className="pt-20 md:pt-24" />

        {/* Hero Section */}
        <section className="mb-32 flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
            className="flex-1 max-w-2xl"
          >
            <div className="flex flex-wrap items-center gap-4 text-zinc-400 mb-8 font-mono text-sm">
              <div className="flex items-center gap-2 bg-zinc-900/50 px-3 py-1.5 rounded-full border border-zinc-800">
                <MapPin className="h-4 w-4 text-rose-400" />
                <span>Kozhencherry, Kerala</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-900/50 px-3 py-1.5 rounded-full border border-zinc-800">
                <Mail className="h-4 w-4 text-indigo-400" />
                <span>aarontom14063@gmail.com</span>
              </div>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 via-indigo-100 to-zinc-400 drop-shadow-sm">
                Aaron Tom Varghese
              </span>
            </h1>
            <div className="mb-8">
              <TypewriterText titles={[
                "Full-Stack Developer",
                "AI/ML Enthusiast",
                "UI/UX Innovator",
                "Problem Solver"
              ]} />
            </div>
            <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mb-10">
              Recent Computer Science graduate (TKM Institute of Technology) with a strong foundation in software engineering. I blend practical experience in building MVC applications with a passion for hardware-software integrations and artificial intelligence.
            </p>
            <div className="flex flex-wrap gap-4 font-mono text-sm">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-100 text-zinc-950 px-6 py-3 rounded-full font-bold hover:bg-white transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] group cursor-pointer"
              >
                <Download className="h-4 w-4 group-hover:-translate-y-1 group-hover:text-indigo-600 transition-transform" /> Download Resume
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group border border-zinc-700 bg-zinc-900/30 px-6 py-3 rounded-full hover:bg-zinc-800 hover:border-zinc-500 transition-colors flex items-center gap-2"
              >
                View Work <ExternalLink className="h-4 w-4 group-hover:translate-x-1 group-hover:text-teal-400 transition-transform opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring", bounce: 0.4 }}
            className="relative w-64 h-80 md:w-80 md:h-[420px] group shrink-0 self-center md:self-end md:-mt-10 mr-4 md:mr-0"
          >
            {/* Offset backdrop cards for an aesthetic structural feel */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-700 border border-indigo-500/20 backdrop-blur-sm -z-20"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-teal-500/20 to-emerald-500/20 rounded-3xl -rotate-3 group-hover:-rotate-6 transition-transform duration-700 border border-teal-500/20 backdrop-blur-sm -z-10"></div>

            <div className="absolute inset-0 rounded-3xl overflow-hidden border border-zinc-700/50 bg-zinc-800/80 z-10 transition-all duration-700 group-hover:scale-[1.02] shadow-2xl group-hover:shadow-indigo-500/20">
              {/* Color overlay that fades on hover */}
              <div className="absolute inset-0 bg-indigo-900/30 mix-blend-overlay z-20 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none"></div>

              <img
                src="/profile.jpeg"
                alt="Aaron Tom Varghese"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100 object-top"
                onError={(e) => {
                  // Fallback if image isn't uploaded yet
                  (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%2327272a'/%3E%3Cpath d='M200 220c-33.1 0-60-26.9-60-60s26.9-60 60-60 60 26.9 60 60-26.9 60-60 60zm0-90c-16.5 0-30 13.5-30 30s13.5 30 30 30 30-13.5 30-30-13.5-30-30-30zm-90 280v-30c0-44.2 35.8-80 80-80h20c44.2 0 80 35.8 80 80v30c0 5.5-4.5 10-10 10H120c-5.5 0-10-4.5-10-10zm20 0h140v-30c0-33.1-26.9-60-60-60h-20c-33.1 0-60 26.9-60 60v30z' fill='%2352525b'/%3E%3C/svg%3E`;
                }}
              />
            </div>

            {/* Floating decoration */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-zinc-900 border border-zinc-700/80 p-4 rounded-2xl shadow-xl z-30 backdrop-blur-md"
            >
              <Code2 className="h-6 w-6 text-teal-400" />
            </motion.div>
          </motion.div>
        </section>

        {/* Education */}
        <motion.section
          id="education"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-32"
        >
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-3xl font-bold mb-10 flex items-center gap-3"
          >
            <GraduationCap className="h-7 w-7 text-purple-400" /> Education
          </motion.h3>

          <InteractiveCard
            className="hover:border-purple-500/30 hover:shadow-purple-500/20"
            glowColor="rgba(168, 85, 247, 0.15)"
            topBorderClass="from-transparent via-purple-500/50 to-transparent"
          >
            <div className="mb-2 flex flex-col md:flex-row md:items-baseline md:justify-between py-1">
              <h4 className="font-display text-xl font-bold text-zinc-100 group-hover:text-purple-300 transition-colors">Bachelor of Technology</h4>
              <span className="text-zinc-400 font-mono text-sm mt-2 md:mt-0 bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full border border-purple-500/20 inline-block w-fit">Oct 2022 – May 2026</span>
            </div>
            <div className="text-zinc-300 mb-4 font-medium flex items-center gap-2 flex-wrap">
              TKM Institute of Technology
              <span className="hidden md:inline w-1 h-1 rounded-full bg-zinc-600"></span>
              <span className="text-zinc-400">Computer Science & Engineering</span>
            </div>
            <p className="text-zinc-400 leading-relaxed mb-6 flex items-center gap-2">
              <span className="text-zinc-300 font-medium tracking-wide">Cumulative GPA:</span>
              <span className="font-mono text-emerald-400 font-semibold bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-500/20">8.16 / 10.0</span>
            </p>
            <div className="flex flex-col gap-3">
              <span className="text-sm font-sans font-medium text-zinc-500 uppercase tracking-wider">Relevant Coursework</span>
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                {['Data Structures & Algorithms', 'Automata Theory', 'Database Management', 'Python', 'Java OOP', 'Operating Systems'].map((course) => (
                  <span key={course} className="px-3 py-1.5 bg-zinc-950/80 border border-zinc-800/50 rounded-md text-zinc-400 group-hover:border-purple-500/30 transition-colors">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </InteractiveCard>
        </motion.section>

        {/* Experience */}
        <motion.section
          id="experience"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-32"
        >
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-3xl font-bold mb-10 flex items-center gap-3"
          >
            <Terminal className="h-7 w-7 text-teal-400" /> Experience
          </motion.h3>

          <InteractiveCard
            className="hover:border-teal-500/30 hover:shadow-teal-500/20"
            glowColor="rgba(20, 184, 166, 0.15)"
            topBorderClass="from-transparent via-teal-500/50 to-transparent"
          >
            <div className="mb-2 flex flex-col md:flex-row md:items-baseline md:justify-between py-1">
              <h4 className="font-display text-xl font-bold text-zinc-100 group-hover:text-teal-300 transition-colors">Software Developer Intern</h4>
              <span className="text-zinc-400 font-mono text-sm mt-2 md:mt-0 bg-teal-500/10 text-teal-300 px-3 py-1 rounded-full border border-teal-500/20 inline-block w-fit">Jan 2026 – Apr 2026</span>
            </div>
            <div className="text-zinc-400 mb-6 font-medium">Voyon Technology Services — Kochi, Kerala</div>
            <ul className="space-y-4 text-zinc-400 leading-relaxed list-none ml-0">
              <li className="relative pl-6">
                <span className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-teal-500/50"></span>
                Engineered a mock <strong className="text-zinc-200 font-medium">MVC application</strong> for an Attendance System using C# and .NET, utilizing ADO.NET for efficient data access.
              </li>
              <li className="relative pl-6">
                <span className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-teal-500/50"></span>
                Architected and integrated an <strong className="text-zinc-200 font-medium">AI Agent</strong> feature to automate tracking of employee milestones, improving internal engagement.
              </li>
              <li className="relative pl-6">
                <span className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-teal-500/50"></span>
                Implemented comprehensive <strong className="text-zinc-200 font-medium">Test Automation</strong> using Cypress, conducting end-to-end testing to ensure system stability.
              </li>
            </ul>
          </InteractiveCard>
        </motion.section>

        {/* Featured Project */}
        <motion.section
          id="projects"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-32"
        >
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-display text-3xl font-bold mb-10 flex items-center gap-3"
          >
            <Activity className="h-7 w-7 text-indigo-400" /> Featured Projects
          </motion.h3>

          <div className="space-y-8">
            <ExpandableProjectCard
              title="Work Anniversary AI Agent"
              date="2026"
              shortDesc="An agent-based AI system designed to intelligently handle employee work anniversaries, milestones, and engagement notifications through a conversational interface."
              githubLink="https://github.com/aarontv04/Work-Anniversary-AI-Agent"
              glowColor="rgba(236, 72, 153, 0.15)"
              topBorderClass="from-transparent via-pink-500/50 to-transparent"
              techStack={['C#', 'OpenAI API', 'Microsoft Agent Framework', 'API Integration']}
            >
              <div className="text-zinc-400 space-y-4">
                <p>
                  This system goes beyond a basic chatbot by implementing a decision-making AI agent that routes queries, retrieves employee data, and generates contextual responses using structured plugins and business logic.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <strong className="text-zinc-200 font-medium block mb-1">Intelligent Routing & Logic</strong>
                    Utilizes advanced agentic patterns to understand intent and select the appropriate plugin for data retrieval or response generation.
                  </div>
                  <div>
                    <strong className="text-zinc-200 font-medium block mb-1">Conversational Interface</strong>
                    Provides a natural language interface for employees and HR to query milestones, upcoming anniversaries, and engagement metrics.
                  </div>
                </div>
              </div>
            </ExpandableProjectCard>

            <ExpandableProjectCard
              title="Rash Driving Detection System"
              date="Aug 2025"
              shortDesc="A hybrid edge-cloud framework for public buses to detect aggressive driving (harsh braking, tailgating) in real-time."
              githubLink="https://github.com/aarontv04/OnboardRash"
              glowColor="rgba(99, 102, 241, 0.15)"
              topBorderClass="from-transparent via-indigo-500/50 to-transparent"
              techStack={['Python', 'Raspberry Pi', 'OpenCV', 'React', 'Flask', 'Socket.IO']}
            >
              <div className="grid md:grid-cols-2 gap-6 text-zinc-400 align-start">
                <div className="space-y-4">
                  <div>
                    <strong className="text-zinc-200 font-medium block mb-1">Hardware & Edge</strong>
                    Architected around <span className="text-white">Raspberry Pi 5</span> with a 1D Kalman Filter combining MPU-6050 IMU data and GPS streams.
                  </div>
                  <div>
                    <strong className="text-zinc-200 font-medium block mb-1">Computer Vision</strong>
                    Integrated <span className="text-white">OpenCV</span> for tailgating detection and ultrasonic sensors for side-proximity tracking.
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <strong className="text-zinc-200 font-medium block mb-1">Data Resilience</strong>
                    Engineered a SQLite Store-and-Forward mechanism ensuring zero data loss during network disruptions.
                  </div>
                  <div>
                    <strong className="text-zinc-200 font-medium block mb-1">Full-Stack Ecosystem</strong>
                    React dashboard visualization, Flask backend, and Socket.IO for live fleet alerts.
                  </div>
                </div>
              </div>
            </ExpandableProjectCard>
          </div>
        </motion.section>

        {/* Bento Grid Skills & Certs */}
        <motion.section
          id="skills"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-32"
        >
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-display text-3xl font-bold mb-10 flex items-center gap-3"
          >
            <Code2 className="h-7 w-7 text-emerald-400" /> Skills & Certifications
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">

            {/* Core Languages Card (Large) */}
            <InteractiveCard
              className="md:col-span-2 md:row-span-2 hover:border-emerald-500/30 flex flex-col justify-center"
              glowColor="rgba(16, 185, 129, 0.15)"
              topBorderClass="from-transparent via-emerald-500/50 to-transparent"
            >
              <h4 className="font-display text-xl font-bold text-zinc-100 mb-6 flex items-center gap-2">
                <Database className="h-5 w-5 text-emerald-400" /> Core Languages
              </h4>
              <div className="flex flex-wrap gap-3">
                {['C#', 'Python', 'Java', 'C', 'SQL', 'HTML/CSS'].map((s) => (
                  <span key={s} className="px-4 py-2 bg-zinc-950/80 border border-zinc-800/50 rounded-xl font-mono text-sm text-zinc-300 hover:border-emerald-500/50 transition-colors shadow-sm cursor-pointer">
                    {s}
                  </span>
                ))}
              </div>
            </InteractiveCard>

            {/* Frameworks Card */}
            <InteractiveCard
              className="md:col-span-1 md:row-span-2 hover:border-indigo-500/30 flex flex-col justify-center"
              glowColor="rgba(99, 102, 241, 0.15)"
              topBorderClass="from-transparent via-indigo-500/50 to-transparent"
            >
              <h4 className="font-display text-lg font-bold text-zinc-100 mb-6 flex items-center gap-2">
                <Cpu className="h-5 w-5 text-indigo-400" /> Frameworks
              </h4>
              <div className="flex flex-wrap gap-2">
                {['.NET Framework', 'ADO.NET', 'React', 'Flask', 'Cypress'].map((s) => (
                  <span key={s} className="px-3 py-1.5 bg-indigo-500/5 border border-indigo-500/20 rounded-lg font-mono text-xs text-indigo-200 cursor-pointer hover:bg-indigo-500/10 transition-colors">
                    {s}
                  </span>
                ))}
              </div>
            </InteractiveCard>

            {/* Tools Card */}
            <InteractiveCard
              className="md:col-span-1 hover:border-amber-500/30 flex flex-col justify-center"
              glowColor="rgba(245, 158, 11, 0.15)"
              topBorderClass="from-transparent via-amber-500/50 to-transparent"
            >
              <h4 className="font-display text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2">
                <Terminal className="h-5 w-5 text-amber-400" /> Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Git', 'MS SQL Server', 'Postman'].map((s) => (
                  <span key={s} className="px-3 py-1.5 bg-zinc-950/80 border border-zinc-800/50 rounded-lg font-mono text-xs text-zinc-400 cursor-pointer hover:text-zinc-200 transition-colors">
                    {s}
                  </span>
                ))}
              </div>
            </InteractiveCard>

            {/* Certifications Card (Wide) */}
            <InteractiveCard
              className="md:col-span-2 hover:border-purple-500/30 flex flex-col justify-center"
              glowColor="rgba(168, 85, 247, 0.15)"
              topBorderClass="from-transparent via-purple-500/50 to-transparent"
            >
              <h4 className="font-display text-lg font-bold text-zinc-100 mb-6 flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-400" /> Key Certifications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="group border-l-2 border-purple-500/30 pl-4 hover:border-purple-400 transition-colors cursor-pointer">
                  <h5 className="font-medium text-zinc-200 text-sm">API Fundamentals Student Expert</h5>
                  <p className="text-zinc-500 text-xs mt-1 font-mono">Postman</p>
                </div>
                <div className="group border-l-2 border-purple-500/30 pl-4 hover:border-purple-400 transition-colors cursor-pointer">
                  <h5 className="font-medium text-zinc-200 text-sm">AI and Machine Learning</h5>
                  <p className="text-zinc-500 text-xs mt-1 font-mono">SMEC Institute</p>
                </div>
                <div className="group border-l-2 border-purple-500/30 pl-4 hover:border-purple-400 transition-colors cursor-pointer">
                  <h5 className="font-medium text-zinc-200 text-sm">Programming in Python</h5>
                  <p className="text-zinc-500 text-xs mt-1 font-mono">Meta (Coursera)</p>
                </div>
                <div className="group border-l-2 border-purple-500/30 pl-4 hover:border-purple-400 transition-colors cursor-pointer">
                  <h5 className="font-medium text-zinc-200 text-sm">Python for Data Science</h5>
                  <p className="text-zinc-500 text-xs mt-1 font-mono">NPTEL IIT Madras</p>
                </div>
              </div>
            </InteractiveCard>

          </div>
        </motion.section>

        {/* Footer */}
        <footer className="border-t border-zinc-900 pt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-zinc-500 font-mono text-sm">
          <p>© {new Date().getFullYear()} Aaron Tom Varghese.</p>
          <div className="flex gap-6 relative z-10">
            <a href="mailto:aarontom14063@gmail.com" className="hover:text-zinc-300 transition-colors">Email</a>
            <a href="https://linkedin.com/in/aaron-tom-varghese" target="_blank" rel="noreferrer" className="hover:text-zinc-300 transition-colors">LinkedIn</a>
            <a href="https://github.com/aarontv04" target="_blank" rel="noreferrer" className="hover:text-zinc-300 transition-colors">GitHub</a>
          </div>
        </footer>

      </div>
    </div>
  );
}

