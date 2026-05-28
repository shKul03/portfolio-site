'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import FadeUp from './FadeUp';

interface Project {
  name: string;
  description: string;
  subNote?: string;
  tags: string[];
  href: string;
  liveHref?: string;
  badge?: string;
  accentBg?: boolean;
}

const projects: Project[] = [
  // Row 1 — full width hero card
  {
    name: 'LiveMind',
    description:
      'An AI chatbot you can deploy on any website — it scrapes the site live, learns it instantly, and answers user questions conversationally. No document uploads, no storage setup. Point it at a URL and it\'s live in under a day.',
    tags: ['Python', 'FastAPI', 'pgvector', 'Playwright', 'Ollama', 'Docker'],
    href: 'https://github.com/ObnoxiousButCool/TechnoAI',
  },
  // Row 2 — 2 col
  {
    name: 'Knowledge Engine',
    description:
      'Enterprise RAG backend — chunker → embedder → vector store → re-ranker → LLM response. Full document lifecycle management and test suite.',
    tags: ['Python', 'FastAPI', 'pgvector', 'Re-ranker'],
    href: 'https://github.com/ObnoxiousButCool/KnowledgeEngineBackend',
  },
  {
    name: 'Technossus Design System',
    description:
      'Converted Figma designs directly to code — built a complete design system (tokens, Tailwind preset, React components, typography, colour themes) and used it to develop full website pages, including new pages built from the design system alone without any Figma reference.',
    tags: ['TypeScript', 'React', 'Tailwind CSS', 'Figma', 'Design Tokens', 'Vite'],
    href: 'https://github.com/ObnoxiousButCool/Technossus-Design-System',
    liveHref: 'https://technossus-design-system.vercel.app',
  },
  // Row 3 — 2 col
  {
    name: 'SentiCore',
    description:
      'AI-powered patient appointment system over WhatsApp — no app, no website. Patients chat with an AI that takes symptoms, suggests the right specialist, checks doctor availability, manages queues, and sends live appointment updates.',
    subNote:
      'Drove client meetings, delivered technical walkthroughs and demos, contributed to the sales pitch and documentation, and made direct feature additions to the AI implementation.',
    tags: ['AI', 'WhatsApp Integration', 'NLP', 'Python', 'Queue Management'],
    href: 'https://github.com/BikkuKumar-spec/ClinicQueue2/tree/Dev',
    badge: 'Presales & Client-Facing',
    accentBg: true,
  },
  {
    name: 'OnBoardIQ',
    description:
      'AI Background Verification pipeline — classifies KYC docs, deduplicates across 3 layers, organises per-candidate, generates audit reports.',
    tags: ['Python', 'Ollama', 'Tesseract OCR', 'Streamlit'],
    href: 'https://github.com/ObnoxiousButCool/OnBoardIQ-Docs',
  },
  // Row 4 — 3 col
  {
    name: 'Smart Revenue Collector',
    description:
      'Full-stack AI debt-collection system: ML defaulter scoring, LLM outreach generation, priority queue, live React dashboard.',
    tags: ['Python', 'FastAPI', 'React', 'TypeScript', 'Tailwind'],
    href: 'https://github.com/ObnoxiousButCool/SmartRevenueCollector',
  },
  {
    name: 'VoiceBot',
    description:
      'Multi-service voice assistant — Python STT/TTS microservice + C#/.NET orchestrator with Clean Architecture.',
    tags: ['Python', 'FastAPI', 'C#', '.NET'],
    href: 'https://github.com/Voice-Bot-poc/Voicebot-orchestrator-backend',
  },
  {
    name: 'BillSage AI',
    description:
      'Async OCR pipeline for intelligent bill classification with analytics dashboard.',
    tags: ['Python', 'OCR', 'FastAPI', 'Streamlit'],
    href: 'https://github.com/shKul03/BillSage',
  },
];

function ProjectCard({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const baseBg = project.accentBg
    ? 'bg-[rgba(232,76,30,0.055)]'
    : 'bg-transparent';
  const hoverBg = 'hover:bg-[rgba(232,76,30,0.09)]';

  return (
    <div
      className={`group relative border border-border rounded-sm p-8 lg:p-10 transition-colors duration-300 ${baseBg} ${hoverBg}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top-right controls: GitHub arrow + optional Live link */}
      <div className="absolute top-8 right-8 lg:top-10 lg:right-10 flex items-center gap-3">
        {project.liveHref && (
          <a
            href={project.liveHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="font-body text-[11px] text-accent border border-accent/40 px-2 py-0.5 rounded-sm hover:bg-accent hover:text-bg transition-colors duration-200"
            aria-label={`${project.name} — live demo`}
          >
            Live ↗
          </a>
        )}
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} — view on GitHub`}
        >
          <motion.span
            className="font-body text-muted text-lg block"
            animate={hovered ? { x: 3, y: -3 } : { x: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            ↗
          </motion.span>
        </a>
      </div>

      {/* Badge */}
      {project.badge && (
        <span className="inline-block font-body text-[10px] uppercase tracking-widest text-accent border border-accent/30 px-2.5 py-1 rounded-sm mb-4">
          {project.badge}
        </span>
      )}

      {/* Name */}
      <h3
        className={`font-heading font-black text-ink mb-3 pr-28 leading-tight ${
          large ? 'text-4xl lg:text-5xl' : 'text-2xl lg:text-3xl'
        }`}
      >
        {project.name}
      </h3>

      {/* Description */}
      <p className="font-body text-sm text-muted leading-relaxed mb-3 max-w-lg">
        {project.description}
      </p>

      {/* Sub-note (SentiCore presales detail) */}
      {project.subNote && (
        <p className="font-body text-xs text-muted/60 leading-relaxed mb-5 max-w-lg italic">
          {project.subNote}
        </p>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-3">
        {project.tags.map((t) => (
          <span
            key={t}
            className="font-body text-[11px] text-muted/70 bg-surface px-2.5 py-1 rounded-sm tracking-wide"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const [liveMind, knowledgeEngine, technossusDss, sentiCore, onBoardIQ, ...row4] =
    projects;

  return (
    <section id="projects" className="py-24 lg:py-32 px-6 lg:px-8 max-w-6xl mx-auto">
      <FadeUp>
        <span className="text-[10px] uppercase tracking-widest text-muted font-body block mb-10">
          Projects
        </span>
      </FadeUp>

      <div className="flex flex-col gap-4">
        {/* Row 1 — LiveMind, full width */}
        <FadeUp delay={0.05}>
          <ProjectCard project={liveMind} large />
        </FadeUp>

        {/* Row 2 — Knowledge Engine + Technossus Design System */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[knowledgeEngine, technossusDss].map((p, i) => (
            <FadeUp key={p.name} delay={0.08 + i * 0.06}>
              <ProjectCard project={p} />
            </FadeUp>
          ))}
        </div>

        {/* Row 3 — SentiCore + OnBoardIQ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[sentiCore, onBoardIQ].map((p, i) => (
            <FadeUp key={p.name} delay={0.1 + i * 0.06}>
              <ProjectCard project={p} />
            </FadeUp>
          ))}
        </div>

        {/* Row 4 — Smart Revenue Collector + VoiceBot + BillSage AI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {row4.map((p, i) => (
            <FadeUp key={p.name} delay={0.1 + i * 0.06}>
              <ProjectCard project={p} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
