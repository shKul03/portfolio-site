'use client';

import FadeUp from './FadeUp';

const stats = [
  { value: '4+', label: 'Companies' },
  { value: '6+', label: 'AI Projects' },
  { value: '9.41', label: 'CGPA' },
  { value: '2×', label: 'Rank First' },
];

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32 px-6 lg:px-8 max-w-6xl mx-auto">
      <FadeUp>
        <span className="text-[10px] uppercase tracking-widest text-muted font-body block mb-10">
          About
        </span>
      </FadeUp>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 lg:gap-24 items-start">
        {/* Bio */}
        <FadeUp delay={0.1}>
          <p className="font-body text-xl lg:text-2xl text-ink/90 leading-relaxed font-light max-w-2xl">
            I build AI systems that actually work in production. Currently part of the{' '}
            <span className="text-accent font-medium">AI Studio</span> team at Technossus — a unit
            focused on researching, experimenting, and shipping AI-first products. My work sits at
            the intersection of LLM engineering and backend architecture: RAG pipelines, intelligent
            document processing, voice bots, and making AI genuinely useful beyond the demo.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-xs font-body text-muted">
            <span>CGPA 9.41</span>
            <span className="text-border">·</span>
            <span>MIT World Peace University</span>
            <span className="text-border">·</span>
            <span>Ex-CrowdStrike</span>
          </div>
        </FadeUp>

        {/* Stats */}
        <FadeUp delay={0.2}>
          <div className="grid grid-cols-2 gap-px bg-border lg:min-w-[260px]">
            {stats.map((s) => (
              <div key={s.label} className="bg-bg p-8 flex flex-col gap-1">
                <span className="font-heading text-4xl font-black text-accent leading-none">
                  {s.value}
                </span>
                <span className="font-body text-xs text-muted uppercase tracking-wider mt-2">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
