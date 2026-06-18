import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github, Linkedin, Mail, Phone, ArrowUpRight, Sparkles, Brain,
  Code2, Database, Cpu, Layers, Zap, Award, GraduationCap,
  Briefcase, ExternalLink, ChevronRight, Rocket, Globe,
  Bot, Eye, Server, Cloud, Lock, Terminal, BarChart3, FileBadge,
  Filter, Network, ShieldCheck
} from 'lucide-react';

/* ====== USER PHOTO ======
   👉 REPLACE THIS with one of:
   1. Local file:     '/dileep.png'   (after putting image in /public)
   2. Drive thumb:    'https://drive.google.com/thumbnail?id=FILE_ID&sz=w1000'
   3. Imgur direct:   'https://i.imgur.com/yourcode.png'
*/
const PHOTO_URL = '/dileep.png'; // <-- CHANGE ME

/* ====== LIVE DEMO URL ====== */
const INVENTORY_GPT_LIVE = 'https://inventorygpt-1.onrender.com/#/home';
const INVENTORY_GPT_REPO = 'https://github.com/Dileepbiradha/InventoryGPT';

export default function Portfolio() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('home');
  const [imgError, setImgError] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    const particles = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.4,
        c: Math.random() > 0.5 ? '167, 139, 250' : '34, 211, 238',
      });
    }
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c}, 0.7)`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${p.c}, 0.8)`;
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x, dy = p.y - p2.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${p.c}, ${0.15 * (1 - d / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.shadowBlur = 0;
            ctx.stroke();
          }
        }
      });
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    const sections = ['home', 'certificates', 'skills', 'projects', 'experience', 'contact', 'about'];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)),
      { threshold: 0.3 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
    { id: 'about', label: 'About' },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden font-sans">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)',
            transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)`,
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
            transform: `translate(${-mousePos.x * 40}px, ${-mousePos.y * 40}px)`,
          }}
        />
      </div>

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between rounded-full px-4 sm:px-6 py-2.5 border border-white/10 backdrop-blur-xl bg-black/40">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => scrollTo('home')}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #a855f7, #06b6d4)', boxShadow: '0 0 20px rgba(168,85,247,0.6)' }}>
              <span className="font-bold text-sm">D</span>
            </div>
            <span className="font-bold text-xs sm:text-sm hidden sm:block tracking-wider">DILEEP.AI</span>
          </motion.div>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className={`px-3 py-1.5 rounded-full text-xs transition-all ${activeSection === item.id ? 'text-white bg-white/10' : 'text-white/60 hover:text-white'}`}>
                {item.label}
              </button>
            ))}
          </div>

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => scrollTo('contact')} className="px-4 py-1.5 rounded-full text-xs font-medium border border-purple-500/50 hover:border-purple-400 shrink-0" style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(6,182,212,0.2))', boxShadow: '0 0 20px rgba(168,85,247,0.3)' }}>
            Hire Me
          </motion.button>
        </div>

        <div className="lg:hidden mt-2 max-w-6xl mx-auto overflow-x-auto">
          <div className="flex gap-1 px-2 pb-1 w-max">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className={`px-3 py-1 rounded-full text-[10px] whitespace-nowrap transition-all ${activeSection === item.id ? 'text-white bg-white/10 border border-white/20' : 'text-white/50 border border-transparent'}`}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-12 z-10">
        <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2 }} className="space-y-6 relative z-10 order-2 md:order-1">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              <span className="text-xs tracking-widest text-cyan-300">AVAILABLE FOR HIRE</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none">
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="block">DILEEP</motion.span>
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="block" style={{ background: 'linear-gradient(135deg, #a855f7 0%, #06b6d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>BIRADHA</motion.span>
            </h1>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="space-y-2">
              <p className="text-lg md:text-xl text-white/80 font-light">Full Stack Developer · <span className="text-purple-400">AI & RAG Engineer</span></p>
              <p className="text-sm md:text-base text-white/50 max-w-md leading-relaxed">Architecting AI-first products with React, Flask & FastAPI. Building intelligent RAG pipelines with Google Gemini that turn raw data into business decisions.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="flex flex-wrap gap-3 pt-2">
              <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }} onClick={() => scrollTo('projects')} className="group flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm" style={{ background: 'linear-gradient(135deg, #a855f7, #06b6d4)', boxShadow: '0 0 30px rgba(168,85,247,0.5)' }}>
                Explore Work <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              </motion.button>
              <motion.a whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }} href="https://github.com/Dileepbiradha" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm border border-white/20 hover:border-white/40 backdrop-blur-md">
                <Github className="w-4 h-4" /> GitHub
              </motion.a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="flex gap-6 pt-4 text-xs text-white/40">
              <div><div className="text-2xl font-bold text-white">9+</div><div>Certifications</div></div>
              <div className="w-px bg-white/10" />
              <div><div className="text-2xl font-bold text-white">18+</div><div>API Endpoints</div></div>
              <div className="w-px bg-white/10" />
              <div><div className="text-2xl font-bold text-white">4+</div><div>Projects Shipped</div></div>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.4 }} className="relative h-96 md:h-[34rem] flex items-center justify-center order-1 md:order-2" style={{ transform: `perspective(1000px) rotateY(${mousePos.x * 6}deg) rotateX(${-mousePos.y * 6}deg)` }}>
            <PhotoOrb imgError={imgError} setImgError={setImgError} />
          </motion.div>
        </div>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-xs tracking-widest">
          <span>SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </section>

      <Section id="certificates" title="Certifications" subtitle="Validated Expertise">
        <CertificatesGrid />
      </Section>

      <Section id="skills" title="Skill Galaxy" subtitle="An Orbiting Universe of Tech">
        <SkillGalaxy />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          <SkillCategory icon={<Code2 className="w-5 h-5" />} title="Languages" skills={['Python', 'JavaScript ES6+', 'SQL', 'HTML5', 'CSS3']} delay={0} />
          <SkillCategory icon={<Layers className="w-5 h-5" />} title="Frontend" skills={['React.js', 'Vite', 'React Router', 'Chart.js', 'Bootstrap', 'Tailwind']} delay={0.1} />
          <SkillCategory icon={<Server className="w-5 h-5" />} title="Backend" skills={['Flask', 'FastAPI', 'Django', 'SQLAlchemy', 'Alembic', 'JWT']} delay={0.2} />
          <SkillCategory icon={<Brain className="w-5 h-5" />} title="AI / LLM" skills={['RAG Pipelines', 'Google Gemini', 'Prompt Engineering', 'CNN-LSTM', 'OpenCV']} delay={0.3} />
          <SkillCategory icon={<Database className="w-5 h-5" />} title="Databases" skills={['MySQL', 'SQLite', 'Joins', 'Indexing', 'Schema Design']} delay={0.4} />
          <SkillCategory icon={<Terminal className="w-5 h-5" />} title="DevOps & Tools" skills={['Git', 'GitHub', 'Render', 'Vercel', 'Postman', 'Linux', 'Swagger']} delay={0.5} />
        </div>
      </Section>

      <Section id="projects" title="Featured Work" subtitle="Production-Grade AI Systems">
        <FeaturedProject />
        <EmotionProject />
      </Section>

      <Section id="experience" title="Experience" subtitle="The Journey So Far">
        <Timeline />
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <GlassCard delay={0}>
            <GraduationCap className="w-8 h-8 text-purple-400 mb-3" />
            <h4 className="font-bold text-lg mb-1">B.Tech — Information Technology</h4>
            <p className="text-white/60 text-sm mb-1">Aditya College of Engineering & Technology (JNTUK)</p>
            <p className="text-white/40 text-xs">Jun 2020 – May 2024</p>
          </GlassCard>
          <GlassCard delay={0.1}>
            <GraduationCap className="w-8 h-8 text-cyan-400 mb-3" />
            <h4 className="font-bold text-lg mb-1">Intermediate — MPC</h4>
            <p className="text-white/60 text-sm mb-1">Aditya Junior College</p>
            <p className="text-white/40 text-xs">Jun 2018 – Apr 2020</p>
          </GlassCard>
        </div>
      </Section>

      <section id="contact" className="relative py-24 px-6 z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative rounded-3xl overflow-hidden border border-white/10 backdrop-blur-xl p-8 md:p-12 text-center" style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.1), rgba(6,182,212,0.1))', boxShadow: '0 0 60px rgba(168,85,247,0.2)' }}>
            <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(168,85,247,0.4) 0%, transparent 60%)' }} />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="inline-block mb-4">
              <Sparkles className="w-10 h-10 text-purple-400" />
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
              Let's Build
              <span className="block" style={{ background: 'linear-gradient(135deg, #a855f7, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Something Intelligent.</span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto mb-8">Open to full-stack & AI engineering roles. Reach out — I respond fast.</p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <ContactPill icon={<Mail className="w-4 h-4" />} text="dileep.biradha@gmail.com" href="mailto:dileep.biradha@gmail.com" />
              <ContactPill icon={<Phone className="w-4 h-4" />} text="+91 6303998813" href="tel:+916303998813" />
            </div>
            <div className="flex justify-center gap-4">
              <SocialLink icon={<Github className="w-5 h-5" />} href="https://github.com/Dileepbiradha" label="GitHub" />
              <SocialLink icon={<Linkedin className="w-5 h-5" />} href="https://www.linkedin.com/in/dileep-biradha/" label="LinkedIn" />
              <SocialLink icon={<Mail className="w-5 h-5" />} href="mailto:dileep.biradha@gmail.com" label="Email" />
            </div>
          </motion.div>
        </div>
      </section>

      <Section id="about" title="About" subtitle="The Engineer Behind The Code">
        <div className="grid md:grid-cols-3 gap-6">
          <GlassCard delay={0} className="md:col-span-2">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(6,182,212,0.3))', boxShadow: '0 0 20px rgba(168,85,247,0.3)' }}>
                <Sparkles className="w-6 h-6 text-purple-300" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">Building AI-First Products</h3>
                <p className="text-white/50 text-sm">Vibe Coder · System Architect</p>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed mb-4">I'm a Full Stack Developer with a deep specialization in <span className="text-purple-300">AI-integrated web applications</span>. I architect production-grade systems where LLMs aren't just bolted on — they're grounded in real business data through <span className="text-cyan-300">Retrieval-Augmented Generation</span> pipelines.</p>
            <p className="text-white/70 leading-relaxed">My approach blends classical full-stack engineering (REST APIs, JWT auth, RBAC, schema migrations) with the modern <span className="text-purple-300">Vibe Coding methodology</span> — pairing with multiple AI assistants to ship faster without sacrificing maintainability.</p>
          </GlassCard>
          <GlassCard delay={0.1}>
            <div className="space-y-4">
              <Stat icon={<Bot className="w-5 h-5" />} label="LLM Integration" value="Google Gemini" />
              <Stat icon={<Server className="w-5 h-5" />} label="Backend Stack" value="Flask · FastAPI" />
              <Stat icon={<Code2 className="w-5 h-5" />} label="Frontend Stack" value="React · Vite" />
              <Stat icon={<Cloud className="w-5 h-5" />} label="Deployed On" value="Render · Vercel" />
            </div>
          </GlassCard>
          <GlassCard delay={0.2}>
            <Brain className="w-8 h-8 text-purple-400 mb-3" />
            <h4 className="font-bold mb-2">RAG Architect</h4>
            <p className="text-sm text-white/60">Custom Retrieval → Augmentation → Generation pipelines grounded in real data.</p>
          </GlassCard>
          <GlassCard delay={0.3}>
            <Lock className="w-8 h-8 text-cyan-400 mb-3" />
            <h4 className="font-bold mb-2">Production Mindset</h4>
            <p className="text-sm text-white/60">JWT auth, RBAC, Alembic migrations, and Swagger-documented APIs.</p>
          </GlassCard>
          <GlassCard delay={0.4}>
            <Rocket className="w-8 h-8 text-pink-400 mb-3" />
            <h4 className="font-bold mb-2">Ship Fast, Ship Clean</h4>
            <p className="text-sm text-white/60">Vibe Coding methodology — AI pair-programmers for architecture & rapid iteration.</p>
          </GlassCard>
        </div>
        <div className="text-center mt-16 text-white/30 text-xs tracking-widest">
          <p>© 2026 DILEEP BIRADHA · CRAFTED WITH AI & PRECISION</p>
        </div>
      </Section>
    </div>
  );
}

/* ===== PHOTO ORB with graceful fallback ===== */
function PhotoOrb({ imgError, setImgError }) {
  return (
    <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[26rem] md:h-[26rem] flex items-center justify-center">
      {[0, 1, 2].map((i) => (
        <motion.div key={i} animate={{ rotate: i % 2 === 0 ? 360 : -360 }} transition={{ duration: 22 + i * 6, repeat: Infinity, ease: 'linear' }} className="absolute rounded-full border" style={{ width: `${108 + i * 8}%`, height: `${108 + i * 8}%`, borderColor: i === 0 ? 'rgba(168,85,247,0.35)' : i === 1 ? 'rgba(6,182,212,0.35)' : 'rgba(236,72,153,0.25)', borderStyle: i === 2 ? 'dashed' : 'solid', transform: `rotateX(${65 + i * 8}deg)`, boxShadow: `0 0 30px ${i === 0 ? 'rgba(168,85,247,0.3)' : i === 1 ? 'rgba(6,182,212,0.3)' : 'rgba(236,72,153,0.2)'}` }}>
          <div className="absolute w-3 h-3 rounded-full -top-1.5 left-1/2 -translate-x-1/2" style={{ background: i === 0 ? '#a855f7' : i === 1 ? '#06b6d4' : '#ec4899', boxShadow: `0 0 15px ${i === 0 ? '#a855f7' : i === 1 ? '#06b6d4' : '#ec4899'}` }} />
        </motion.div>
      ))}
      <motion.div animate={{ boxShadow: ['0 0 60px rgba(168,85,247,0.5), 0 0 100px rgba(6,182,212,0.3)', '0 0 90px rgba(168,85,247,0.8), 0 0 140px rgba(6,182,212,0.5)', '0 0 60px rgba(168,85,247,0.5), 0 0 100px rgba(6,182,212,0.3)'] }} transition={{ duration: 4, repeat: Infinity }} className="absolute inset-6 rounded-full" />

      <div className="relative w-[78%] h-[78%] rounded-full p-[3px]" style={{ background: 'conic-gradient(from 0deg, #a855f7, #06b6d4, #ec4899, #a855f7)' }}>
        <div className="relative w-full h-full rounded-full overflow-hidden bg-black">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 30%, rgba(168,85,247,0.35) 0%, rgba(6,182,212,0.2) 40%, #000 80%)' }} />
          {!imgError ? (
            <img src={PHOTO_URL} alt="Portrait" className="absolute inset-0 w-full h-full object-cover object-top" style={{ filter: 'contrast(1.05) saturate(0.95) brightness(0.95)' }} onError={() => setImgError(true)} />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <div className="w-24 h-24 rounded-full mb-4 flex items-center justify-center text-5xl font-bold" style={{ background: 'linear-gradient(135deg, #a855f7, #06b6d4)', boxShadow: '0 0 30px rgba(168,85,247,0.6)' }}>D</div>
              <p className="text-xs text-white/50 max-w-[80%] leading-relaxed">Add your portrait to <code className="text-purple-300">/public/dileep.png</code> or update <code className="text-cyan-300">PHOTO_URL</code></p>
            </div>
          )}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.18) 0%, transparent 50%, rgba(6,182,212,0.18) 100%)', mixBlendMode: 'overlay' }} />
          <div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
        </div>
      </div>

      {[
        { top: '8%', left: '4%', icon: <Brain className="w-4 h-4" />, color: '#a855f7', delay: 0, label: 'AI' },
        { top: '20%', right: '0%', icon: <Code2 className="w-4 h-4" />, color: '#06b6d4', delay: 0.5, label: 'React' },
        { bottom: '18%', left: '0%', icon: <Server className="w-4 h-4" />, color: '#ec4899', delay: 1, label: 'Flask' },
        { bottom: '6%', right: '6%', icon: <Bot className="w-4 h-4" />, color: '#10b981', delay: 1.5, label: 'RAG' },
      ].map((b, i) => (
        <motion.div key={i} animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, delay: b.delay }} className="absolute flex items-center gap-1.5 px-2.5 py-1.5 rounded-full backdrop-blur-md border text-[10px] font-medium" style={{ ...b, background: `${b.color}22`, borderColor: `${b.color}66`, color: b.color, boxShadow: `0 0 15px ${b.color}55` }}>
          {b.icon}{b.label}
        </motion.div>
      ))}
    </div>
  );
}

/* ===== CERTIFICATES ===== */
const CERTIFICATES = [
  { title: 'Python Full Stack Developer', issuer: 'Edchart (SME)', category: 'Programming', icon: <Code2 className="w-5 h-5" />, color: '#a855f7', url: 'https://drive.google.com/file/d/1xEG2_abOC3vMc1vqE1kKDC0Az_Y5tR4Y/view' },
  { title: 'Web Development Fundamentals', issuer: 'IBM', category: 'Web', icon: <Globe className="w-5 h-5" />, color: '#06b6d4', url: 'https://drive.google.com/file/d/1KLDAkNAe3qksqTUNZZXehIfuaR_03lSP/view' },
  { title: 'Data Science & Machine Learning', issuer: 'YBI Foundation', category: 'AI / ML', icon: <Brain className="w-5 h-5" />, color: '#ec4899', url: 'https://drive.google.com/file/d/1CBzNG_qDpHaEMA4d4YnxwUXTnfIWHOHE/view' },
  { title: 'Introduction to Programming Using Python', issuer: 'Microsoft (MTA)', category: 'Programming', icon: <Award className="w-5 h-5" />, color: '#f59e0b', url: 'https://drive.google.com/file/d/1m3QCww7n5vcEg8axMGJ3a5uw6LOxX2s2/view' },
  { title: 'Introduction to Internet of Things', issuer: 'NPTEL', category: 'Networking', icon: <Cpu className="w-5 h-5" />, color: '#10b981', url: 'https://drive.google.com/file/d/1_PKfP72nBlE_rrv6UXhlcpc3oakB3vaA/view' },
  { title: 'Privacy and Security in Online Social Media', issuer: 'NPTEL', category: 'Security', icon: <ShieldCheck className="w-5 h-5" />, color: '#ef4444', url: 'https://drive.google.com/file/d/1CpbSQDwqBWczTjZtjqVEdhWgJgEXLEiK/view' },
  { title: 'Python Basic', issuer: 'HackerRank', category: 'Programming', icon: <Terminal className="w-5 h-5" />, color: '#8b5cf6', url: 'https://drive.google.com/file/d/12SvgnL78picQ7oyFfn6yFDC0l48fzwRI/view' },
  { title: 'Networking Basics', issuer: 'Cisco', category: 'Networking', icon: <Network className="w-5 h-5" />, color: '#0ea5e9', url: 'https://drive.google.com/file/d/1G6pwEV6RI4otX8Z0OsBX8DI9fb24ekMg/view' },
  { title: 'SQL Basic', issuer: 'HackerRank', category: 'Database', icon: <Database className="w-5 h-5" />, color: '#22c55e', url: 'https://drive.google.com/file/d/1J0vBYmAfryrDMkttuWpCju0hgliqBoMs/view' },
];

function CertificatesGrid() {
  const [filter, setFilter] = useState('All');
  const categories = useMemo(() => ['All', ...Array.from(new Set(CERTIFICATES.map((c) => c.category)))], []);
  const filtered = filter === 'All' ? CERTIFICATES : CERTIFICATES.filter((c) => c.category === filter);

  return (
    <>
      <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
        <div className="flex items-center gap-2 text-white/40 text-xs mr-2">
          <Filter className="w-3.5 h-3.5" />
          <span className="tracking-widest">FILTER</span>
        </div>
        {categories.map((c) => (
          <motion.button key={c} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setFilter(c)} className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all border backdrop-blur-md ${filter === c ? 'text-white border-purple-400/60' : 'text-white/60 border-white/10 hover:border-white/30'}`} style={{ background: filter === c ? 'linear-gradient(135deg, rgba(168,85,247,0.35), rgba(6,182,212,0.35))' : 'rgba(255,255,255,0.03)', boxShadow: filter === c ? '0 0 20px rgba(168,85,247,0.4)' : 'none' }}>
            {c}
          </motion.button>
        ))}
      </div>

      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((c, i) => (
            <motion.a layout key={c.title} href={c.url} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4, delay: i * 0.05 }} whileHover={{ y: -6, scale: 1.02 }} className="group relative rounded-2xl p-5 border border-white/10 backdrop-blur-xl overflow-hidden cursor-pointer" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))' }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ background: `radial-gradient(circle at 50% 0%, ${c.color}33 0%, transparent 60%)` }} />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${c.color}22`, color: c.color, boxShadow: `0 0 20px ${c.color}33` }}>
                    {c.icon}
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white/80 transition-colors" />
                </div>
                <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider mb-2 border" style={{ background: `${c.color}15`, borderColor: `${c.color}55`, color: c.color }}>
                  {c.category.toUpperCase()}
                </span>
                <h4 className="font-bold text-base text-white leading-snug mb-1">{c.title}</h4>
                <p className="text-xs text-white/50">{c.issuer}</p>
                <div className="flex items-center gap-1 mt-4 text-[10px] text-white/40 group-hover:text-purple-300 transition-colors">
                  <FileBadge className="w-3 h-3" />
                  <span>VIEW CERTIFICATE</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:rotate-45 transition-transform" />
                </div>
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-8 text-xs text-white/40">
        Showing {filtered.length} of {CERTIFICATES.length} certifications
      </motion.div>
    </>
  );
}

/* ===== SKILL GALAXY ===== */
function SkillGalaxy() {
  const skills = [
    { icon: <Bot />, label: 'Gemini', color: '#a855f7', orbit: 1, angle: 0 },
    { icon: <Brain />, label: 'RAG', color: '#06b6d4', orbit: 1, angle: 90 },
    { icon: <Code2 />, label: 'React', color: '#ec4899', orbit: 1, angle: 180 },
    { icon: <Server />, label: 'Flask', color: '#f59e0b', orbit: 1, angle: 270 },
    { icon: <Database />, label: 'SQL', color: '#10b981', orbit: 2, angle: 45 },
    { icon: <Cpu />, label: 'Python', color: '#8b5cf6', orbit: 2, angle: 135 },
    { icon: <Cloud />, label: 'Render', color: '#06b6d4', orbit: 2, angle: 225 },
    { icon: <Lock />, label: 'JWT', color: '#ef4444', orbit: 2, angle: 315 },
  ];
  return (
    <div className="relative h-96 md:h-[28rem] flex items-center justify-center mb-12">
      <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center z-10" style={{ background: 'radial-gradient(circle, #a855f7, #06b6d4)', boxShadow: '0 0 50px rgba(168,85,247,0.8)' }}>
        <Sparkles className="w-8 h-8 text-white" />
      </motion.div>
      {[1, 2].map((orbit) => (
        <div key={orbit} className="absolute rounded-full border border-white/10" style={{ width: `${orbit * 180}px`, height: `${orbit * 180}px` }} />
      ))}
      {skills.map((skill, i) => <OrbitingSkill key={i} skill={skill} />)}
    </div>
  );
}

function OrbitingSkill({ skill }) {
  const radius = skill.orbit * 90;
  const duration = skill.orbit === 1 ? 20 : 30;
  const direction = skill.orbit % 2 === 0 ? -1 : 1;
  return (
    <motion.div className="absolute" style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }} animate={{ rotate: direction * 360 }} transition={{ duration, repeat: Infinity, ease: 'linear' }} initial={{ rotate: skill.angle }}>
      <motion.div whileHover={{ scale: 1.2 }} animate={{ rotate: -direction * 360 }} transition={{ duration, repeat: Infinity, ease: 'linear' }} className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 cursor-pointer">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center backdrop-blur-md border" style={{ background: `${skill.color}33`, borderColor: `${skill.color}66`, boxShadow: `0 0 20px ${skill.color}66`, color: skill.color }}>
          {React.cloneElement(skill.icon, { className: 'w-5 h-5 md:w-6 md:h-6' })}
        </div>
        <span className="text-xs text-white/70 font-medium">{skill.label}</span>
      </motion.div>
    </motion.div>
  );
}

/* ===== FEATURED PROJECT (with LIVE DEMO link) ===== */
function FeaturedProject() {
  return (
    <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8 }} className="relative rounded-3xl overflow-hidden border border-white/10 backdrop-blur-xl mb-8" style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.08), rgba(6,182,212,0.08))' }}>
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ background: 'radial-gradient(circle at 0% 0%, rgba(168,85,247,0.3) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(6,182,212,0.3) 0%, transparent 50%)' }} />
      <div className="relative grid md:grid-cols-2 gap-8 p-6 md:p-10">
        <div className="space-y-5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider" style={{ background: 'linear-gradient(135deg, #a855f7, #06b6d4)', boxShadow: '0 0 20px rgba(168,85,247,0.5)' }}>
              FEATURED · 2026
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] border border-green-500/40 bg-green-500/10 text-green-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
              </span>
              LIVE
            </span>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-bold mb-2">InventoryGPT</h3>
            <p className="text-purple-300 text-sm font-medium">AI-Powered Inventory Management System</p>
          </div>
          <p className="text-white/70 leading-relaxed text-sm">
            A full-stack inventory platform integrating Retrieval-Augmented Generation with Google Gemini LLM.
            Delivers natural-language inventory insights and restock recommendations grounded in real-time business data.
          </p>
          <div className="grid grid-cols-3 gap-3">
            <Metric value="18+" label="API Endpoints" />
            <Metric value="8+" label="Modules" />
            <Metric value="RAG" label="Pipeline" />
          </div>
          <div className="space-y-2">
            {[
              'Custom RAG: Retrieval → Augmentation → Generation → Delivery',
              'JWT Auth + Role-Based Access Control (RBAC)',
              'Alembic migrations · Swagger-documented APIs',
              'Interactive Chart.js dashboard with KPIs',
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white/70">
                <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <span>{f}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {['Flask', 'React', 'SQLAlchemy', 'Gemini', 'JWT', 'RAG', 'Vibe Coding'].map((t) => (
              <span key={t} className="px-3 py-1 rounded-full text-xs border border-white/10 bg-white/5 text-white/70">{t}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <motion.a whileHover={{ scale: 1.05 }} href={INVENTORY_GPT_REPO} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-white/20 hover:border-white/40 backdrop-blur-md">
              <Github className="w-4 h-4" /> View Code
            </motion.a>
            {/* ✅ LIVE DEMO LINK ADDED */}
            <motion.a whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }} href={INVENTORY_GPT_LIVE} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium" style={{ background: 'linear-gradient(135deg, #a855f7, #06b6d4)', boxShadow: '0 0 25px rgba(168,85,247,0.5)' }}>
              <ExternalLink className="w-4 h-4" />
              Live Demo
              <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            </motion.a>
          </div>
          <p className="text-[10px] text-white/40 pt-1">
            🔗 <a href={INVENTORY_GPT_LIVE} target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors break-all">inventorygpt-1.onrender.com</a>
          </p>
        </div>
        <div className="relative flex items-center justify-center">
          <ProjectMockup />
        </div>
      </div>
    </motion.div>
  );
}

function ProjectMockup() {
  return (
    <motion.a href={INVENTORY_GPT_LIVE} target="_blank" rel="noopener noreferrer" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="relative w-full max-w-md block cursor-pointer group">
      <div className="rounded-2xl overflow-hidden border border-white/10 backdrop-blur-xl group-hover:border-purple-400/50 transition-colors" style={{ background: 'rgba(0,0,0,0.6)', boxShadow: '0 20px 60px rgba(168,85,247,0.3)' }}>
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <div className="flex-1 text-center text-xs text-white/40">inventorygpt-1.onrender.com</div>
        </div>
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              { v: '247', l: 'Products', c: '#a855f7' },
              { v: '$48K', l: 'Value', c: '#06b6d4' },
              { v: '12', l: 'Low Stock', c: '#ec4899' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.1 }} className="rounded-lg p-2 border border-white/10" style={{ background: `${s.c}15` }}>
                <div className="text-lg font-bold" style={{ color: s.c }}>{s.v}</div>
                <div className="text-[10px] text-white/50">{s.l}</div>
              </motion.div>
            ))}
          </div>
          <div className="rounded-lg p-3 border border-white/10 bg-white/5">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-3 h-3 text-cyan-400" />
              <span className="text-[10px] text-white/60">Transaction Trends</span>
            </div>
            <div className="flex items-end justify-between h-16 gap-1">
              {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} transition={{ delay: i * 0.05, duration: 0.5 }} className="flex-1 rounded-t" style={{ background: `linear-gradient(to top, #a855f7, #06b6d4)`, boxShadow: '0 0 10px rgba(168,85,247,0.5)' }} />
              ))}
            </div>
          </div>
          <div className="rounded-lg p-3 border border-purple-500/30 bg-purple-500/5">
            <div className="flex items-center gap-2 mb-2">
              <Bot className="w-3 h-3 text-purple-400" />
              <span className="text-[10px] text-purple-300 font-medium">AI Assistant</span>
            </div>
            <p className="text-[10px] text-white/70 leading-relaxed">
              "Restock 'Widget Pro' — current stock: 4 units, avg weekly sales: 12. Recommended: 50 units."
            </p>
          </div>
        </div>
      </div>
      <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1" style={{ background: 'linear-gradient(135deg, #a855f7, #06b6d4)', boxShadow: '0 0 20px rgba(168,85,247,0.6)' }}>
        <Zap className="w-3 h-3" /> AI Powered
      </motion.div>
    </motion.a>
  );
}

function EmotionProject() {
  return (
    <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8 }} className="relative rounded-3xl overflow-hidden border border-white/10 backdrop-blur-xl" style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.08), rgba(168,85,247,0.08))' }}>
      <div className="grid md:grid-cols-2 gap-8 p-6 md:p-10">
        <div className="relative flex items-center justify-center order-2 md:order-1">
          <EmotionVisual />
        </div>
        <div className="space-y-5 order-1 md:order-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs border border-pink-500/30 bg-pink-500/10 text-pink-300">DEEP LEARNING</span>
            <span className="text-xs text-white/40">Sep 2023 – May 2024</span>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-bold mb-2">Dynamic Emotion Recognition</h3>
            <p className="text-pink-300 text-sm font-medium">Real-time Hybrid CNN-LSTM System</p>
          </div>
          <p className="text-white/70 leading-relaxed text-sm">
            Engineered a real-time emotion classification system using a hybrid CNN-LSTM architecture
            to detect 5 emotional states from live webcam feed with low-latency frame-by-frame prediction.
          </p>
          <div className="space-y-2">
            {[
              'Hybrid CNN-LSTM neural architecture',
              '5-class emotion detection from live video',
              'OpenCV preprocessing: face detection, normalization',
              'Optimized for low-latency inference',
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white/70">
                <ChevronRight className="w-4 h-4 text-pink-400 mt-0.5 shrink-0" />
                <span>{f}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {['Python', 'TensorFlow', 'OpenCV', 'CNN-LSTM', 'Deep Learning'].map((t) => (
              <span key={t} className="px-3 py-1 rounded-full text-xs border border-white/10 bg-white/5 text-white/70">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function EmotionVisual() {
  const emotions = [
    { label: 'Happy', value: 87, color: '#10b981' },
    { label: 'Neutral', value: 8, color: '#06b6d4' },
    { label: 'Surprised', value: 3, color: '#f59e0b' },
    { label: 'Sad', value: 1, color: '#a855f7' },
    { label: 'Angry', value: 1, color: '#ef4444' },
  ];
  return (
    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="relative w-full max-w-sm">
      <div className="rounded-2xl overflow-hidden border border-white/10 backdrop-blur-xl p-5" style={{ background: 'rgba(0,0,0,0.6)', boxShadow: '0 20px 60px rgba(236,72,153,0.3)' }}>
        <div className="relative aspect-square rounded-xl mb-4 overflow-hidden border border-pink-500/30" style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.2), rgba(0,0,0,0.8))' }}>
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => <div key={`h${i}`} className="absolute left-0 right-0 border-t border-pink-500/10" style={{ top: `${(i + 1) * 12.5}%` }} />)}
            {[...Array(8)].map((_, i) => <div key={`v${i}`} className="absolute top-0 bottom-0 border-l border-pink-500/10" style={{ left: `${(i + 1) * 12.5}%` }} />)}
          </div>
          <motion.div animate={{ top: ['0%', '100%', '0%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} className="absolute left-0 right-0 h-0.5" style={{ background: 'linear-gradient(to right, transparent, #ec4899, transparent)', boxShadow: '0 0 20px #ec4899' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <Eye className="w-16 h-16 text-pink-300" style={{ filter: 'drop-shadow(0 0 15px #ec4899)' }} />
            </motion.div>
          </div>
        </div>
        <div className="space-y-2">
          {emotions.map((e, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-white/70">{e.label}</span>
                <span style={{ color: e.color }}>{e.value}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${e.value}%` }} transition={{ delay: i * 0.1, duration: 1 }} className="h-full rounded-full" style={{ background: e.color, boxShadow: `0 0 10px ${e.color}` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Timeline() {
  const events = [
    { date: 'Jul 2024 – Aug 2024', title: 'Full Stack Developer Intern', org: 'Infoz IT Solutions', icon: <Briefcase className="w-5 h-5" />, color: '#a855f7', points: ['Built restaurant booking & online ordering platform', 'Integrated multiple payment gateways with live tracking', 'Delivered features in Agile sprint cycles'] },
    { date: 'Aug 2022 – Oct 2022', title: 'Salesforce Developer Intern', org: 'SmartInternz', icon: <Award className="w-5 h-5" />, color: '#06b6d4', points: ['Earned Apex Specialist Superbadge', 'Earned Process Automation Specialist Superbadge', 'Built solutions with Apex, LWC & custom workflows'] },
  ];
  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, transparent, #a855f7, #06b6d4, transparent)' }} />
      {events.map((e, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className={`relative flex items-center mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-4 h-4 rounded-full" style={{ background: e.color, boxShadow: `0 0 20px ${e.color}` }} />
          </div>
          <div className={`ml-12 md:ml-0 md:w-5/12 ${i % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
            <div className="rounded-2xl p-5 border border-white/10 backdrop-blur-xl" style={{ background: `linear-gradient(135deg, ${e.color}11, transparent)` }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${e.color}33`, color: e.color }}>{e.icon}</div>
                <span className="text-xs text-white/40">{e.date}</span>
              </div>
              <h4 className="font-bold text-lg mb-1">{e.title}</h4>
              <p className="text-sm mb-3" style={{ color: e.color }}>{e.org}</p>
              <ul className="space-y-1.5">
                {e.points.map((p, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs text-white/60">
                    <ChevronRight className="w-3 h-3 mt-0.5 shrink-0" style={{ color: e.color }} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="relative py-24 px-6 z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12 text-center">
          <p className="text-xs tracking-widest text-purple-400 mb-3">{subtitle?.toUpperCase()}</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            <span style={{ background: 'linear-gradient(135deg, #fff 0%, #a855f7 50%, #06b6d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{title}</span>
          </h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function GlassCard({ children, delay = 0, className = '' }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay }} whileHover={{ y: -4 }} className={`relative rounded-2xl p-6 border border-white/10 backdrop-blur-xl ${className}`} style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))' }}>
      {children}
    </motion.div>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-purple-300 shrink-0">{icon}</div>
      <div>
        <div className="text-xs text-white/40">{label}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}

function SkillCategory({ icon, title, skills, delay }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay }} whileHover={{ y: -4 }} className="rounded-2xl p-5 border border-white/10 backdrop-blur-xl" style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.05), rgba(6,182,212,0.05))' }}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(168,85,247,0.2)', color: '#c4b5fd' }}>{icon}</div>
        <h4 className="font-bold">{title}</h4>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((s) => <span key={s} className="px-2.5 py-1 rounded-md text-xs text-white/70 border border-white/10 bg-white/5">{s}</span>)}
      </div>
    </motion.div>
  );
}

function Metric({ value, label }) {
  return (
    <div className="rounded-xl p-3 border border-white/10 text-center" style={{ background: 'rgba(255,255,255,0.03)' }}>
      <div className="text-xl font-bold" style={{ background: 'linear-gradient(135deg, #a855f7, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{value}</div>
      <div className="text-[10px] text-white/40 mt-0.5">{label}</div>
    </div>
  );
}

function ContactPill({ icon, text, href }) {
  return (
    <motion.a whileHover={{ scale: 1.05, y: -2 }} href={href} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm border border-white/20 backdrop-blur-md hover:border-purple-400/50" style={{ background: 'rgba(255,255,255,0.03)' }}>
      {icon}<span>{text}</span>
    </motion.a>
  );
}

function SocialLink({ icon, href, label }) {
  return (
    <motion.a whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.95 }} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-12 h-12 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md hover:border-purple-400/50 transition-colors" style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.1), rgba(6,182,212,0.1))' }}>
      {icon}
    </motion.a>
  );
}
