'use client';

import { motion } from 'framer-motion';

const TICKER_TEXT =
  'SHLOKA KULKARNI ✦ AI ENGINEER ✦ RAG SYSTEMS ✦ LLM ENGINEERING ✦ PUNE INDIA ✦ PYTHON DEVELOPER ✦ FASTAPI ✦ PGVECTOR ✦ RETRIEVAL AUGMENTED GENERATION ✦ VOICE BOT ARCHITECT ✦ FULL STACK AI ✦ EX-CROWDSTRIKE ✦ TECHNOSSUS AI STUDIO ✦ MACHINE LEARNING ENGINEER ✦ DOCUMENT INTELLIGENCE ✦ NEXT.JS ✦ REACT DEVELOPER ✦ OPEN TO WORK ✦ ';

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      aria-label="Hero"
      className="relative min-h-screen flex flex-col overflow-hidden bg-bg"
      style={{
        backgroundImage:
          'radial-gradient(circle, rgba(59,71,232,0.12) 2px, transparent 2px)',
        backgroundSize: '28px 28px',
      }}
    >
      {/* Top-left byline */}
      <motion.div
        className="absolute top-20 left-6 lg:left-10 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <span
          className="font-body text-[11px] uppercase tracking-[0.2em] text-muted"
          style={{ fontVariant: 'small-caps' }}
        >
          by Shloka Kulkarni
        </span>
      </motion.div>

      {/* Rotated left label — AI ENGINEER */}
      <div
        className="hidden lg:flex absolute left-3 top-1/2 z-10 items-center"
        style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)' }}
      >
        <span className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-accent">
          AI ENGINEER
        </span>
      </div>

      {/* Rotated right label — 2026 */}
      <div
        className="hidden lg:flex absolute right-3 top-1/2 z-10 items-center"
        style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%)' }}
      >
        <span className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-accent">
          2026
        </span>
      </div>

      {/* Centre — statement headline */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 lg:px-20 pt-16 pb-4 relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Main headline */}
          <h1
            className="font-heading font-black text-ink leading-[0.92] tracking-tight"
            style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}
          >
            I BUILD AI SYSTEMS
            <br />
            THAT WORK IN PRODUCTION.
          </h1>

          {/* Name byline */}
          <p
            className="font-heading font-bold text-accent mt-4 tracking-wide"
            style={{ fontSize: 'clamp(16px, 2.2vw, 24px)' }}
          >
            <span className="text-muted mr-2">—</span>
            SHLOKA KULKARNI · AI ENGINEER · TECHNOSSUS AI STUDIO
          </p>
        </motion.div>

        {/* Subline */}
        <motion.p
          className="font-body text-sm tracking-widest uppercase text-muted mt-5 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          RAG Pipelines&nbsp;·&nbsp;Voice Bots&nbsp;·&nbsp;LLM Engineering&nbsp;·&nbsp;Intelligent Document Systems
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-wrap gap-4 items-center justify-center mt-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <button
            onClick={() => scrollTo('projects')}
            className="inline-flex items-center gap-2 border border-ink text-ink font-body text-sm px-7 py-3 hover:bg-ink hover:text-bg transition-colors duration-200 cursor-pointer bg-transparent"
          >
            See my work ↓
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center gap-2 bg-accent text-bg font-body text-sm px-7 py-3 hover:opacity-90 transition-opacity duration-200 cursor-pointer border-none"
          >
            Get in touch
          </button>
        </motion.div>
      </div>

      {/* Geometric circles — bottom-left */}
      <div className="absolute bottom-12 left-0 z-10 overflow-visible pointer-events-none">
        <div
          className="w-32 h-32 rounded-full bg-accent -translate-x-1/2"
          style={{ marginLeft: '48px' }}
        />
        <div
          className="w-20 h-20 rounded-full bg-accent -translate-x-1/2 -mt-6"
          style={{ marginLeft: '16px' }}
        />
      </div>

      {/* Geometric circles — bottom-right */}
      <div className="absolute bottom-12 right-0 z-10 overflow-visible pointer-events-none">
        <div
          className="w-32 h-32 rounded-full bg-accent translate-x-1/2"
          style={{ marginRight: '48px' }}
        />
        <div
          className="w-20 h-20 rounded-full bg-accent translate-x-1/2 -mt-6"
          style={{ marginRight: '16px' }}
        />
      </div>

      {/* Bottom ticker bar */}
      <div className="w-full bg-accent py-3 overflow-hidden z-20">
        <div className="ticker-track">
          <span className="font-heading font-bold text-sm text-bg tracking-widest whitespace-nowrap">
            {TICKER_TEXT.repeat(4)}
          </span>
          <span className="font-heading font-bold text-sm text-bg tracking-widest whitespace-nowrap" aria-hidden>
            {TICKER_TEXT.repeat(4)}
          </span>
        </div>
      </div>

      {/* SEO hidden text — visible to crawlers and screen readers */}
      <span style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
        Shloka Kulkarni is an AI Engineer based in Pune, India, specialising in Retrieval Augmented Generation, LLM engineering, Python backend development, FastAPI, pgvector, voice bots, and intelligent document processing. Currently at Technossus AI Studio. Previously at CrowdStrike.
      </span>
    </section>
  );
}
