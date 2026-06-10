'use client';

import FadeUp from './FadeUp';

const roles = [
  {
    role: 'AI Engineer',
    company: 'Technossus — AI Studio',
    period: 'Jan 2026 – Present',
    location: 'Pune',
    bullets: [
      'Researching, experimenting and shipping AI-first products as part of a dedicated AI Studio team.',
      'Built production RAG systems, intelligent document pipelines, voice bots, and agentic tooling.',
      'End-to-end ownership from architecture through deployment for AI-native features.',
    ],
  },
  {
    role: 'Backend Developer',
    company: 'Kashnate Solutions',
    period: 'Jul – Dec 2025',
    location: 'Pune',
    bullets: [
      'Built Python backend services and AI-assisted Node.js frontend features for client-facing web apps.',
      'Integrated LLM-powered features to accelerate content generation and workflow automation.',
    ],
  },
  {
    role: 'Malware Research Engineer',
    company: 'CrowdStrike',
    period: 'Jun 2024 – Jun 2025',
    location: 'Remote',
    bullets: [
      'Deployed production services in Python, TypeScript, and React across distributed security infrastructure.',
      'Built a fault-tolerant scheduling microservice that reduced processing delays by 30%.',
      'Worked across Docker, Kubernetes, Rancher, OpenSearch, and S3.',
    ],
  },
  {
    role: 'Backend Software Engineer',
    company: 'Comarete Technologies',
    period: 'Jan – Jun 2024',
    location: 'Pune',
    bullets: [
      'Built Python microservices and REST APIs for production client applications.',
      'Achieved a 20% performance improvement through targeted query optimisation.',
      'Stack: pytest, MySQL, MongoDB.',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-16 lg:py-24 px-6 lg:px-8 max-w-6xl mx-auto">
      <FadeUp>
        <div style={{ marginBottom: 40 }}>
          <h2
            className="font-heading font-black text-ink uppercase"
            style={{ fontSize: 'clamp(32px, 4vw, 56px)', letterSpacing: '0.02em', lineHeight: 1 }}
          >
            Experience
          </h2>
          <div style={{ width: 40, height: 3, background: '#3B47E8', marginTop: 8 }} />
        </div>
      </FadeUp>

      <div className="relative">
        <div className="hidden md:block absolute left-0 top-2 bottom-0 w-px bg-gradient-to-b from-border to-transparent" />

        <div className="flex flex-col gap-0">
          {roles.map((r, i) => (
            <FadeUp key={r.company} delay={i * 0.08}>
              <div className="md:pl-10 pb-10 relative group">
                <div className="hidden md:block absolute left-0 top-2 w-px h-full" />
                <div className="hidden md:block absolute -left-[3px] top-[7px] w-1.5 h-1.5 rounded-full bg-accent ring-2 ring-bg" />

                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                  <div>
                    <span className="font-heading text-xl font-bold text-ink">{r.role}</span>
                    <span className="font-body text-sm text-muted"> · </span>
                    <span className="font-body text-sm font-medium text-accent">{r.company}</span>
                  </div>
                  <span className="font-body text-xs text-muted whitespace-nowrap">
                    {r.period} &nbsp;·&nbsp; {r.location}
                  </span>
                </div>

                <ul className="flex flex-col gap-1.5">
                  {r.bullets.map((b) => (
                    <li key={b} className="font-body text-sm text-ink/70 leading-relaxed flex gap-3">
                      <span className="text-accent mt-1 shrink-0">—</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
