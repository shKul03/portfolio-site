'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const socials = [
  { label: 'GitHub (shKul03)', href: 'https://github.com/shKul03' },
  { label: 'GitHub (ObnoxiousButCool)', href: 'https://github.com/ObnoxiousButCool' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/shlokakulkarni' },
];

export default function Hero() {
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const [magnetPos, setMagnetPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.35;
    const dy = (e.clientY - cy) * 0.35;
    setMagnetPos({ x: dx, y: dy });
  };

  const handleMouseLeave = () => {
    setMagnetPos({ x: 0, y: 0 });
    setHovered(false);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center px-6 lg:px-8 pt-24 pb-16 max-w-6xl mx-auto"
      aria-label="Hero"
    >
      {/* Headline */}
      <div className="mb-8">
        <motion.h1
          className="font-heading text-[clamp(3rem,9vw,7.5rem)] font-black leading-[0.92] tracking-tight text-ink"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          I build AI systems
          <br />
          <span className="text-accent italic">that work</span>
          <br />
          in production.
        </motion.h1>
      </div>

      {/* Subline */}
      <motion.p
        className="font-body text-sm tracking-widest uppercase text-muted mb-12 max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        AI Engineer&nbsp;&nbsp;·&nbsp;&nbsp;RAG Pipelines&nbsp;&nbsp;·&nbsp;&nbsp;Voice Bots&nbsp;&nbsp;·&nbsp;&nbsp;Intelligent Document Systems
      </motion.p>

      {/* Social links */}
      <motion.div
        className="flex flex-wrap gap-x-6 gap-y-2 mb-12"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link text-xs font-body text-muted hover:text-ink transition-colors duration-200"
          >
            {s.label}
          </a>
        ))}
      </motion.div>

      {/* CTAs */}
      <motion.div
        className="flex flex-wrap gap-4 items-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Magnetic CTA */}
        <motion.a
          ref={ctaRef}
          href="#projects"
          onClick={(e) => { e.preventDefault(); scrollTo('projects'); }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleMouseLeave}
          animate={{ x: magnetPos.x, y: magnetPos.y }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="relative inline-flex items-center gap-2 bg-accent text-bg font-body font-semibold text-sm px-7 py-3.5 rounded-full overflow-hidden group"
          style={{ willChange: 'transform' }}
        >
          <span className="relative z-10">See my work</span>
          <motion.span
            className="relative z-10 inline-block"
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.2 }}
          >
            →
          </motion.span>
          {/* Hover fill */}
          <span className="absolute inset-0 bg-[#c93a12] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-full" />
        </motion.a>

        <button
          onClick={() => scrollTo('contact')}
          className="inline-flex items-center gap-2 border border-border text-ink font-body text-sm px-7 py-3.5 rounded-full hover:border-accent hover:text-accent transition-colors duration-300 cursor-pointer bg-transparent"
        >
          Get in touch
        </button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-6 lg:left-8 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="w-px h-10 bg-muted/40"
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ originY: 0 }}
        />
        <span className="text-[10px] uppercase tracking-widest text-muted font-body">Scroll</span>
      </motion.div>
    </section>
  );
}
