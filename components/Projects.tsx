'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import FadeUp from './FadeUp';

interface Project {
  name: string;
  slug: string;
  description: string;
  tags: string[];
  githubHref: string;
  liveHref?: string;
}

const projects: Project[] = [
  {
    name: 'LiveMind',
    slug: 'livemind',
    description:
      "An AI chatbot you can deploy on any website — it scrapes the site live, learns it instantly, and answers user questions conversationally. No document uploads, no storage setup.",
    tags: ['Python', 'FastAPI', 'pgvector', 'Playwright', 'Ollama', 'Docker'],
    githubHref: 'https://github.com/ObnoxiousButCool/TechnoAI',
  },
  {
    name: 'Knowledge Engine',
    slug: 'knowledge-engine',
    description:
      'Enterprise RAG backend — chunker → embedder → vector store → re-ranker → LLM response. Full document lifecycle management and test suite.',
    tags: ['Python', 'FastAPI', 'pgvector', 'Re-ranker'],
    githubHref: 'https://github.com/ObnoxiousButCool/KnowledgeEngineBackend',
  },
  {
    name: 'SentiCore',
    slug: 'senticore',
    description:
      'AI-powered patient appointment system over WhatsApp — no app, no website. Patients chat with an AI that takes symptoms, suggests the right specialist, and manages queues.',
    tags: ['AI', 'WhatsApp Integration', 'NLP', 'Python', 'Queue Management'],
    githubHref: 'https://github.com/shKul03/SentiCure.git',
  },
  {
    name: 'OnBoardIQ',
    slug: 'onboardiq',
    description:
      'AI Background Verification pipeline — classifies KYC docs, deduplicates across 3 layers, organises per-candidate, generates audit reports.',
    tags: ['Python', 'Ollama', 'Tesseract OCR', 'Streamlit'],
    githubHref: 'https://github.com/ObnoxiousButCool/OnBoardIQ-Docs',
  },
  {
    name: 'Smart Revenue Collector',
    slug: 'smart-revenue-collector',
    description:
      'Full-stack AI debt-collection system: ML defaulter scoring, LLM outreach generation, priority queue, live React dashboard.',
    tags: ['Python', 'FastAPI', 'React', 'TypeScript', 'Tailwind'],
    githubHref: 'https://github.com/ObnoxiousButCool/SmartRevenueCollector',
  },
  {
    name: 'VoiceBot PoC',
    slug: 'voicebot',
    description:
      'Multi-service voice assistant — Python STT/TTS microservice + C#/.NET orchestrator with Clean Architecture.',
    tags: ['Python', 'FastAPI', 'C#', '.NET'],
    githubHref: 'https://github.com/Voice-Bot-poc/Voicebot-orchestrator-backend',
  },
  {
    name: 'BillSage AI',
    slug: 'billsage',
    description:
      'Async OCR pipeline for intelligent bill classification with analytics dashboard.',
    tags: ['Python', 'OCR', 'FastAPI', 'Streamlit'],
    githubHref: 'https://github.com/shKul03/BillSage',
  },
  {
    name: 'Technossus Design System',
    slug: 'technossus-design-system',
    description:
      'Figma-to-code design system with tokens, Tailwind preset, and React components. Built full website pages from the design system alone.',
    tags: ['TypeScript', 'React', 'Tailwind CSS', 'Figma', 'Design Tokens', 'Vite'],
    githubHref: 'https://github.com/ObnoxiousButCool/Technossus-Design-System',
    liveHref: 'https://technossus-design-system.vercel.app',
  },
];

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const visibleTags = project.tags.slice(0, 4);
  const extraCount = project.tags.length - 4;

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      style={{
        background: '#FFFFFF',
        border: '1px solid #E2E0D9',
        borderRadius: 16,
        padding: 28,
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 8,
          marginBottom: 8,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            flex: 1,
            minWidth: 0,
            flexWrap: 'wrap',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 700,
              fontSize: 18,
              color: '#0F0F0E',
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            {project.name}
          </h3>
          {project.liveHref && (
            <a
              href={project.liveHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: 10,
                fontWeight: 500,
                color: '#16A34A',
                background: 'rgba(22,163,74,0.10)',
                borderRadius: 20,
                padding: '2px 8px',
                whiteSpace: 'nowrap',
                textDecoration: 'none',
                flexShrink: 0,
              }}
            >
              Live ↗
            </a>
          )}
        </div>
        <span
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: 11,
            color: '#5C5A54',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            paddingTop: 3,
          }}
        >
          {project.tags.length} techs
        </span>
      </div>

      {/* Description */}
      <p
        className="line-clamp-2"
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: 14,
          color: '#5C5A54',
          lineHeight: 1.6,
          marginBottom: 14,
          flex: 1,
          margin: '0 0 14px 0',
        }}
      >
        {project.description}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
        {visibleTags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 11,
              color: '#3B47E8',
              background: 'rgba(59,71,232,0.08)',
              borderRadius: 20,
              padding: '3px 10px',
            }}
          >
            {tag}
          </span>
        ))}
        {extraCount > 0 && (
          <span
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 11,
              color: '#5C5A54',
              background: '#F0EEE8',
              borderRadius: 20,
              padding: '3px 10px',
            }}
          >
            +{extraCount} more
          </span>
        )}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: '#E2E0D9', marginBottom: 16 }} />

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link
          href={`/projects/${project.slug}`}
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: 14,
            color: '#3B47E8',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          View project →
        </Link>
        <a
          href={project.githubHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#5C5A54', display: 'flex', alignItems: 'center' }}
          aria-label={`${project.name} on GitHub`}
        >
          <GitHubIcon />
        </a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-16 lg:py-24 px-6 lg:px-8 max-w-6xl mx-auto">
      <FadeUp>
        <div style={{ marginBottom: 40 }}>
          <h2
            className="font-heading font-black text-ink uppercase"
            style={{
              fontSize: 'clamp(32px, 4vw, 56px)',
              letterSpacing: '0.02em',
              lineHeight: 1,
            }}
          >
            Projects
          </h2>
          <div style={{ width: 40, height: 3, background: '#3B47E8', marginTop: 8 }} />
        </div>
      </FadeUp>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        style={{ alignItems: 'stretch' }}
      >
        {projects.map((project, i) => (
          <FadeUp key={project.slug} delay={0.05 + i * 0.04} className="h-full">
            <ProjectCard project={project} />
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
