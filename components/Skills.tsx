'use client';

import FadeUp from './FadeUp';

const groups = [
  {
    category: 'AI & ML',
    items: ['LLMs', 'RAG', 'pgvector', 'Ollama', 'OCR', 'NLP', 'scikit-learn', 'CNNs'],
  },
  {
    category: 'Backend',
    items: ['Python', 'FastAPI', 'C#/.NET', 'Node.js', 'REST APIs', 'WebSockets'],
  },
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vite'],
  },
  {
    category: 'Databases',
    items: ['PostgreSQL', 'MongoDB', 'MySQL', 'OpenSearch', 'Elasticsearch', 'Redis', 'S3'],
  },
  {
    category: 'DevOps',
    items: ['Docker', 'Kubernetes', 'Rancher', 'Azure DevOps', 'GitHub Actions', 'AWS'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-16 lg:py-24 px-6 lg:px-8 max-w-6xl mx-auto">
      <FadeUp>
        <div style={{ marginBottom: 40 }}>
          <h2
            className="font-heading font-black text-ink uppercase"
            style={{ fontSize: 'clamp(32px, 4vw, 56px)', letterSpacing: '0.02em', lineHeight: 1 }}
          >
            Skills
          </h2>
          <div style={{ width: 40, height: 3, background: '#3B47E8', marginTop: 8 }} />
        </div>
      </FadeUp>

      <div className="flex flex-col divide-y divide-border">
        {groups.map((g, i) => (
          <FadeUp key={g.category} delay={i * 0.07}>
            <div className="py-5 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-10">
              <span className="font-body text-xs text-muted uppercase tracking-widest shrink-0 w-28 pt-1">
                {g.category}
              </span>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center font-body text-sm text-accent bg-bg border border-accent/40 px-3 py-0.5 hover:bg-[rgba(59,71,232,0.06)] transition-colors duration-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
