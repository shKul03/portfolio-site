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
    <section id="skills" className="py-24 lg:py-32 px-6 lg:px-8 max-w-6xl mx-auto">
      <FadeUp>
        <span className="text-[10px] uppercase tracking-widest text-muted font-body block mb-10">
          Skills
        </span>
      </FadeUp>

      <div className="flex flex-col divide-y divide-border">
        {groups.map((g, i) => (
          <FadeUp key={g.category} delay={i * 0.07}>
            <div className="py-7 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-12">
              <span className="font-body text-xs text-muted uppercase tracking-widest shrink-0 w-28 pt-1">
                {g.category}
              </span>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 font-body text-sm text-ink/80"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent shrink-0" aria-hidden />
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
