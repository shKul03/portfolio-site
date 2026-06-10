import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const projects = {
  livemind: {
    name: 'LiveMind',
    description: 'Zero-storage RAG chatbot deployable on any website in under a day.',
    tags: ['Python', 'FastAPI', 'pgvector', 'Playwright', 'Ollama', 'Docker'],
    githubHref: 'https://github.com/ObnoxiousButCool/TechnoAI',
    liveHref: undefined as string | undefined,
  },
  'knowledge-engine': {
    name: 'Knowledge Engine',
    description: 'Enterprise RAG pipeline with re-ranking and document lifecycle management.',
    tags: ['Python', 'FastAPI', 'pgvector', 'Re-ranker', 'LLM'],
    githubHref: 'https://github.com/ObnoxiousButCool/KnowledgeEngineBackend',
    liveHref: undefined as string | undefined,
  },
  onboardiq: {
    name: 'OnBoardIQ',
    description:
      'AI Background Verification pipeline — classifies KYC docs, deduplicates, generates audit reports.',
    tags: ['Python', 'Ollama', 'Tesseract OCR', 'Streamlit'],
    githubHref: 'https://github.com/ObnoxiousButCool/OnBoardIQ-Docs',
    liveHref: undefined as string | undefined,
  },
  senticore: {
    name: 'SentiCore',
    description: 'AI-powered patient appointment system over WhatsApp — no app required.',
    tags: ['AI', 'WhatsApp Integration', 'NLP', 'Python', 'Queue Management'],
    githubHref: 'https://github.com/shKul03/SentiCure.git',
    liveHref: undefined as string | undefined,
  },
  'smart-revenue-collector': {
    name: 'Smart Revenue Collector',
    description: 'Full-stack AI debt-collection system with ML scoring and LLM outreach.',
    tags: ['Python', 'FastAPI', 'React', 'TypeScript', 'Tailwind', 'ML'],
    githubHref: 'https://github.com/ObnoxiousButCool/SmartRevenueCollector',
    liveHref: undefined as string | undefined,
  },
  voicebot: {
    name: 'VoiceBot PoC',
    description: 'Multi-service voice assistant with Python STT/TTS and C#/.NET orchestrator.',
    tags: ['Python', 'FastAPI', 'C#', '.NET', 'STT', 'TTS'],
    githubHref: 'https://github.com/Voice-Bot-poc/Voicebot-orchestrator-backend',
    liveHref: undefined as string | undefined,
  },
  billsage: {
    name: 'BillSage AI',
    description: 'Async OCR pipeline for intelligent bill classification.',
    tags: ['Python', 'OCR', 'FastAPI', 'Streamlit'],
    githubHref: 'https://github.com/shKul03/BillSage',
    liveHref: undefined as string | undefined,
  },
  'technossus-design-system': {
    name: 'Technossus Design System',
    description:
      'Figma-to-code design system with tokens, Tailwind preset, and React components.',
    tags: ['TypeScript', 'React', 'Tailwind CSS', 'Figma', 'Design Tokens', 'Vite'],
    githubHref: 'https://github.com/ObnoxiousButCool/Technossus-Design-System',
    liveHref: 'https://technossus-design-system.vercel.app',
  },
} as const;

type Slug = keyof typeof projects;

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = projects[params.slug as Slug];
  if (!project) {
    return { title: 'Project Not Found — Shloka Kulkarni' };
  }
  return {
    title: `${project.name} — Shloka Kulkarni`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects[params.slug as Slug];

  if (!project) {
    return (
      <>
        <Nav />
        <main className="min-h-screen px-6 lg:px-8 max-w-4xl mx-auto pt-28 pb-24">
          <p className="font-body text-muted mb-6">Project not found.</p>
          <Link
            href="/#projects"
            className="font-body text-sm text-accent hover:underline"
          >
            ← Back to projects
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen px-6 lg:px-8 max-w-4xl mx-auto pt-28 pb-24">
        {/* Back */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-body text-sm text-muted hover:text-accent transition-colors duration-200 mb-12 group"
        >
          ← <span className="group-hover:underline">Back to projects</span>
        </Link>

        {/* Hero heading */}
        <h1
          className="font-heading font-black text-ink leading-none tracking-tight mb-4"
          style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
        >
          {project.name}
        </h1>

        <p className="font-body text-base text-muted mb-8 max-w-2xl leading-relaxed">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {project.tags.map((tag) => (
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
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-3 mb-16">
          <a
            href={project.githubHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-ink text-ink font-body text-sm px-6 py-2.5 hover:bg-ink hover:text-bg transition-colors duration-200"
          >
            View on GitHub ↗
          </a>
          {project.liveHref && (
            <a
              href={project.liveHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-bg font-body text-sm px-6 py-2.5 hover:opacity-90 transition-opacity duration-200"
            >
              Live Demo ↗
            </a>
          )}
        </div>

        {/* Placeholder content */}
        <div
          className="rounded-2xl border border-border p-10 text-center"
          style={{ background: '#FAFAF8' }}
        >
          <p className="font-body text-base text-muted leading-relaxed max-w-md mx-auto">
            Full case study coming soon — including demo video, architecture walkthrough, and key
            decisions.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
