import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FadeUp from '@/components/FadeUp';

type ExtraSection = { heading: string; body: string };

type Project = {
  name: string;
  description: string;
  problem: string;
  howItWorks: string;
  extra?: ExtraSection;
  tags: readonly string[];
  githubHref: string;
  liveHref?: string;
};

const projects: Record<string, Project> = {
  livemind: {
    name: 'LiveMind',
    description:
      'A RAG chatbot that goes live on any website in under a day — no database maintenance, no document uploads, just a URL.',
    problem:
      'Most RAG chatbots require you to manually upload documents, keep them updated, and maintain an ever-growing knowledge base. LiveMind sidesteps that entirely. You give it a URL. It crawls the site, chunks the content, embeds it, and starts answering questions. When the site updates, you re-ingest. No stale documents, no manual curation.',
    howItWorks:
      'Playwright crawls the target website (sitemap-first, with fallback path discovery). The content is chunked, embedded using nomic-embed-text via Ollama, and stored in PostgreSQL with pgvector. Each user session gets its own UUID for memory. Cosine similarity retrieval pulls the most relevant chunks, which are passed into a local LLM for generation. Re-ingestion clears and rebuilds automatically — one API call.',
    extra: {
      heading: 'What makes it interesting',
      body: 'The decision to remove the database maintenance layer entirely came from thinking about what gets in the way when you try to give a non-technical team an AI assistant over their own content. The answer is usually "someone has to keep feeding it documents." LiveMind removes that person from the equation.',
    },
    tags: ['Python', 'FastAPI', 'pgvector', 'Playwright', 'Ollama', 'Docker'],
    githubHref: 'https://github.com/ObnoxiousButCool/TechnoAI',
    liveHref: undefined as string | undefined,
  },
  'knowledge-engine': {
    name: 'Knowledge Engine',
    description:
      'An enterprise RAG pipeline built for documents that actually matter — with re-ranking, document lifecycle management, and a modular architecture you can swap piece by piece.',
    problem:
      "Basic RAG is easy to prototype but fragile at scale. Documents get updated, chunks go stale, retrieval quality drops for long or ambiguous queries, and there's no clean way to update or remove a specific document without rebuilding the whole store. KnowledgeEngine addresses all of this.",
    howItWorks:
      'Documents flow through an ingestion pipeline into pgvector. Retrieval uses cosine similarity to pull candidates, which are then re-ranked by a cross-encoder to improve precision. The LLM generates responses grounded in the re-ranked context. Every component — embedder, retriever, reranker, LLM — is modular and swappable. Documents have a full lifecycle: ingest, update, delete, re-embed.',
    extra: {
      heading: 'What makes it interesting',
      body: 'The re-ranking step is often the difference between a RAG system that feels useful and one that feels like a keyword search with extra steps. The cross-encoder sees the full query and each candidate chunk together, which gives it much better relevance signal than embedding similarity alone. Adding that layer, and making it optional and configurable, was the core design challenge.',
    },
    tags: ['Python', 'FastAPI', 'pgvector', 'Re-ranker', 'LLM'],
    githubHref: 'https://github.com/ObnoxiousButCool/KnowledgeEngineBackend',
    liveHref: undefined as string | undefined,
  },
  onboardiq: {
    name: 'OnBoardIQ',
    description:
      'Drop a folder of candidate documents — any format, any order, any naming convention — and get back organised per-candidate folders, classified documents, and an Excel audit report.',
    problem:
      'HR and recruitment teams dealing with high-volume onboarding receive documents in chaos: a single PDF containing someone\'s Aadhaar, PAN, and degree certificate, renamed to something like "docs_final_FINAL_v3.pdf". OnBoardIQ takes that chaos and produces a clean, structured output.',
    howItWorks:
      'The pipeline processes every PDF in a folder recursively. A rule-based classifier (fast regex/keyword matching) handles obvious document types. Ambiguous cases fall through to an Ollama AI classifier (moondream for vision, phi3:mini for reasoning). A three-layer deduplication system — byte hash, perceptual image hash, then semantic text similarity — catches duplicates at every level. Each document gets canonically renamed and placed into a per-candidate folder. An Excel report summarises what was found, what\'s missing, and confidence scores.',
    extra: {
      heading: 'What makes it interesting',
      body: 'The three-layer deduplication is the part that took the most thought. Byte-hash catches exact duplicates instantly. Perceptual hashing catches the same scan at different compressions or rotations. Semantic similarity catches documents that are the same information presented differently. Each layer catches what the previous one misses.',
    },
    tags: ['Python', 'Ollama', 'Tesseract OCR', 'Streamlit'],
    githubHref: 'https://github.com/ObnoxiousButCool/OnBoardIQ-Docs',
    liveHref: undefined as string | undefined,
  },
  senticore: {
    name: 'SentiCore',
    description:
      'A hospital appointment system that lives entirely inside WhatsApp — no app, no website, no login.',
    problem:
      'Hospital appointment systems typically require patients to download an app, create an account, navigate a UI, and remember a password. SentiCore assumes none of that. If you have WhatsApp, you can book an appointment, check your queue position, and get notified when it\'s your turn.',
    howItWorks:
      "The system handles the full appointment flow conversationally: symptom collection, specialist suggestion, availability check, slot booking, queue management, and live queue position updates. Natural conversation flow — patients don't need to know any commands or syntax. The AI layer interprets what they're trying to do and acts accordingly.",
    extra: {
      heading: 'What it involved',
      body: 'Shloka drove client discovery meetings with hospital stakeholders, delivered technical walkthroughs and live demos, contributed to the formal sales pitch and documentation, and directly built AI feature additions. This was a full product development cycle including client-facing work.',
    },
    tags: ['AI', 'WhatsApp Integration', 'NLP', 'Python', 'Queue Management'],
    githubHref: 'https://github.com/shKul03/SentiCure.git',
    liveHref: undefined as string | undefined,
  },
  'smart-revenue-collector': {
    name: 'Smart Revenue Collector',
    description:
      'AI-powered debt collection automation — scoring, personalised outreach, multi-channel dispatch, and CFO approval flows for complex accounts receivable.',
    problem:
      "Manual debt collection is slow, inconsistent, and doesn't scale. The same generic reminder goes to everyone regardless of their payment history, relationship, or likelihood to pay. Smart Revenue Collector changes that with ML-based scoring, personalised AI-generated messages per debtor, and a priority queue that surfaces the cases most likely to convert.",
    howItWorks:
      'The system ingests invoice data, runs behavioural defaulter scoring (based on historical write-off rates, partial payment rates, days-late patterns), applies a dynamic penalty/incentive calculator, generates personalised outreach using Claude or Ollama, and dispatches through a fallback chain: email → SMS → WhatsApp. A CFO approval pipeline handles high-value incentives. A React/TypeScript dashboard gives visibility into queue, reminders, tasks, and insights.',
    extra: {
      heading: 'What makes it interesting',
      body: "The AI message generation is context-aware — it knows the debtor's risk profile, how many times they've been contacted, what channel they typically respond to, and what regulatory constraints apply (SMS messages follow TRAI compliance). The system doesn't just send reminders; it reasons about what kind of message is most likely to work for this specific person.",
    },
    tags: ['Python', 'FastAPI', 'React', 'TypeScript', 'Tailwind', 'ML'],
    githubHref: 'https://github.com/ObnoxiousButCool/SmartRevenueCollector',
    liveHref: undefined as string | undefined,
  },
  voicebot: {
    name: 'VoiceBot PoC',
    description:
      'A voice AI pipeline with clean architecture — Python handles the speech, C#/.NET handles the orchestration, and the two talk through a well-defined interface.',
    problem:
      'Voice AI proofs-of-concept are usually monolithic — one script that handles input, processing, and output in a single file. VoiceBot PoC demonstrates a production-grade architecture where each concern is isolated and the LLM backend is swappable without touching the rest of the system.',
    howItWorks:
      'A Python/FastAPI microservice handles speech-to-text and text-to-speech. A C#/.NET orchestrator manages the pipeline via a strategy pattern (ILlmBackend interface), with a phone-number capture flow and session state management. The IVoiceOrchestrator interface decouples the API from any specific pipeline implementation, so the voice backend, LLM backend, and orchestration logic can each evolve independently.',
    extra: {
      heading: 'What makes it interesting',
      body: 'The Clean Architecture layering (API → Application → Infrastructure → Domain) in a voice AI context was the interesting design challenge. Most voice AI demos skip this entirely. The goal was to show that a voice AI system doesn\'t have to be a fragile one-file PoC — it can have the same structural rigour as any production backend.',
    },
    tags: ['Python', 'FastAPI', 'C#', '.NET', 'STT', 'TTS'],
    githubHref: 'https://github.com/Voice-Bot-poc/Voicebot-orchestrator-backend',
    liveHref: undefined as string | undefined,
  },
  billsage: {
    name: 'BillSage AI',
    description:
      'Upload a bill — image or PDF — and get back a classified, structured output with confidence scores. Async, concurrent, fast.',
    problem:
      'Manual bill processing is tedious at scale. BillSage automates the classification and data extraction step — handling utility bills, grocery receipts, medical invoices, retail bills — and exposes the results through a Streamlit dashboard with accuracy metrics.',
    howItWorks:
      'Image and PDF uploads are processed asynchronously through a concurrent pipeline. OCR extracts text from scanned documents. An LLM classifier categorises the bill type. The result — type, subtype, extracted data, confidence score — is surfaced in the dashboard. The system is async load-tested to confirm it holds up under concurrent requests.',
    tags: ['Python', 'OCR', 'FastAPI', 'Streamlit'],
    githubHref: 'https://github.com/shKul03/BillSage',
    liveHref: undefined as string | undefined,
  },
  'technossus-design-system': {
    name: 'Technossus Design System',
    description:
      'W3C design tokens, CSS variables, custom Tailwind preset, and React components — single source of truth for the Technossus frontend.',
    problem:
      'Design inconsistency across products: different teams using different spacing, colours, and component implementations. The Technossus Design System establishes a single source of truth that designers and developers share.',
    howItWorks:
      'Design tokens follow W3C conventions and are exposed as CSS variables and a custom Tailwind preset. React components — Tag, Stats Card, Testimonial, SearchBar, Nav — are built on top of these tokens and documented with variant coverage. Full pages were built both from Figma files and from content requirements alone. Deployed and documented for adoption across Technossus products.',
    extra: {
      heading: 'What makes it interesting',
      body: 'Building a design system from Figma is one thing. Building pages from a content brief alone — with no design file — requires you to make principled decisions about layout, hierarchy, and visual language. Both modes were used, which tested whether the system was actually expressive enough to work independently of the designer.',
    },
    tags: ['TypeScript', 'React', 'Tailwind CSS', 'Figma', 'Design Tokens', 'Vite'],
    githubHref: 'https://github.com/ObnoxiousButCool/Technossus-Design-System',
    liveHref: 'https://technossus-design-system.vercel.app',
  },
};

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

        {/* Tagline / subtitle */}
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

        {/* Case study content */}
        <div className="max-w-2xl space-y-12 mb-16">
          <FadeUp>
            <h2 className="font-heading font-black text-ink text-xl sm:text-2xl tracking-tight mb-3">
              The problem it solves
            </h2>
            <p className="font-body text-base text-muted leading-relaxed">
              {project.problem}
            </p>
          </FadeUp>

          <FadeUp delay={0.05}>
            <h2 className="font-heading font-black text-ink text-xl sm:text-2xl tracking-tight mb-3">
              How it works
            </h2>
            <p className="font-body text-base text-muted leading-relaxed">
              {project.howItWorks}
            </p>
          </FadeUp>

          {project.extra && (
            <FadeUp delay={0.1}>
              <h2 className="font-heading font-black text-ink text-xl sm:text-2xl tracking-tight mb-3">
                {project.extra.heading}
              </h2>
              <p className="font-body text-base text-muted leading-relaxed">
                {project.extra.body}
              </p>
            </FadeUp>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
