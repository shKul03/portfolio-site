import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Extended Q&A — Shloka Kulkarni',
  description:
    'Extended context about Shloka Kulkarni for the portfolio chatbot.',
};

const qa = [
  {
    q: 'What got Shloka into AI?',
    a: 'She was drawn in by two things: the concept of intelligence existing inside machines, and the mathematics behind it. What fascinated her most was the "black box" problem — the fact that even the creators of powerful AI models cannot fully explain why a model makes a particular decision. That bafflement is something she finds exciting rather than frustrating. Her long-term goal is to build a model like this from scratch herself. For now, she finds deep satisfaction in applying these models to real-world problems.',
  },
  {
    q: "What is Shloka's philosophy on art and science?",
    a: 'She believes the separation is mostly artificial. Science done well has aesthetic qualities — a clean architecture is satisfying the same way a good painting is. She was the lead singer in her school choir, spent years sketching and painting as a child, and follows modern artists on social media. She thinks about visual composition the way she thinks about software architecture. To her, building anything — a model, a microservice, a melody — is fundamentally the same creative act.',
  },
  {
    q: 'How does Shloka approach building software?',
    a: 'She is data-first. Before writing a single line of code, she figures out what her data looks like — input, output, and every meaningful shape in between. She thinks of data structures as lego bricks: discrete, well-defined pieces she can reason about and connect. Once the data design is clear, the architecture tends to follow. She always builds from scratch and drives the data design herself, even when using AI agents to help plan. She wants to know exactly what a payload looks like before it leaves a service and what the receiving end expects.',
  },
  {
    q: 'Why has Shloka built so many different types of projects?',
    a: "It wasn't a deliberate strategy — it followed her curiosity. She discovered RAG and thought it was a beautiful architecture, so she built one. She came across OCR and had the same reaction. WhatsApp bots taught her you could build a real product with no traditional UI at all. Then she wanted to make RAG more efficient by removing the database layer entirely, and that became LiveMind. Each project was a question she answered by building the answer.",
  },
  {
    q: 'What kind of work environment does Shloka thrive in?',
    a: 'Collaborative teams with good management. She values teammates she can genuinely rely on — not just people she technically works alongside. That distinction matters more to her than company size or industry. She appreciates when people take both the work and each other seriously.',
  },
  {
    q: 'What does Shloka want to work on next?',
    a: "Agentic workflows. She's been using existing MCPs (Model Context Protocols) and wants to start writing her own from scratch. She's interested in systems that can reason, plan, and take action across multiple steps without constant human steering. She also wants to work more with n8n for agentic automation.",
  },
  {
    q: 'What does Shloka do outside of work?',
    a: "Music accompanies almost everything she does — working, reading, travelling, thinking. Her taste spans languages, genres, and moods. She's a film and television enthusiast who enjoys ambitious sci-fi (Interstellar, Tenet), intelligent character work (Sherlock), and emotionally rich storytelling (When Life Gives You Tangerines, The Good Bad Mother). She also loves anime, K-pop, K-dramas, and the occasional German show. She reads science fiction, young adult fiction, and fanfiction — she's been reading and writing fanfic since her teens and maintains a Tumblr account for it.\n\nShe has a small, close group of friends she values deeply. She loves road trips and has driven to Goa, Pondicherry, Chandigarh, and across Maharashtra. The habit started from childhood — she grew up travelling by road between Pune, Hyderabad, and Nashik regularly.",
  },
  {
    q: 'What are some fun facts about Shloka?',
    a: 'She loves anime and K-pop. She writes fanfiction on Tumblr (account not disclosed). She was the lead singer in her school choir. She follows modern artists on social media. She has strong opinions about road trips.',
  },
  {
    q: 'Does Shloka enjoy movies?',
    a: "Yes — she's a passionate film and television enthusiast. She appreciates thoughtful storytelling, memorable direction, and narratives that stay with you. Favourites include Interstellar, Tenet, Sherlock, When Life Gives You Tangerines, The Good Bad Mother. She enjoys mysteries, thrillers, psychological horror, and slice-of-life stories. She also watches anime and K-dramas.",
  },
  {
    q: 'What inspired Shloka to work on such a wide range of projects?',
    a: "Curiosity, mostly. She got into AI, learned about RAG, thought it was a lovely architecture, and built one. Then OCR, then WhatsApp bots (exploring UI-less development with an AI layer), then the idea of removing the database layer from RAG entirely (LiveMind). One idea led to the next. She didn't plan to have a diverse portfolio — she just kept finding new questions she wanted to answer by building something.",
  },
  {
    q: "What is the connection between Shloka's love of art and her work in tech?",
    a: 'She believes anything done well has structure, method, and architecture — and that structure can be executed artfully. Neural networks are beautiful to her in the same way a painting can be beautiful. A clean API design has the same kind of satisfaction as a well-composed image. She was a visual artist and musician growing up, and those instincts haven\'t left — they\'ve just found a different medium.',
  },
  {
    q: 'Has Shloka done client-facing work?',
    a: "Yes. On SentiCore she drove client discovery meetings, delivered technical walkthroughs and live demos to hospital stakeholders, and contributed to the formal sales pitch. On SmartRevenueCollector she presented to stakeholders with a live demo and incorporated their feedback into the product. She's comfortable translating technical systems into accessible language for non-technical audiences.",
  },
  {
    q: "What is Shloka's educational background?",
    a: 'B.Tech in Computer Science Engineering from MIT World Peace University, CGPA 9.41. She ranked first in two semesters with a perfect 10.0 GPA and received a merit scholarship in Year 2.',
  },
  {
    q: 'Where is Shloka based and is she open to remote work?',
    a: "She's based in Pune, Maharashtra, India. She's open to remote roles globally and hybrid or on-site roles in Pune or Mumbai.",
  },
];

export default function BotContextPage() {
  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px 96px', fontFamily: 'system-ui, sans-serif', lineHeight: 1.6, color: '#222' }}>
      <p style={{ fontSize: 13, fontStyle: 'italic', color: '#666', marginBottom: 32, borderLeft: '3px solid #ccc', paddingLeft: 12 }}>
        This page exists for the portfolio chatbot. It is not part of the main site.
      </p>

      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
        Extended Q&amp;A — Shloka Kulkarni
      </h1>
      <p style={{ fontSize: 14, color: '#666', marginBottom: 40 }}>
        This page provides extended context about Shloka for the portfolio chatbot.
        It is not linked from the main navigation.
      </p>

      {qa.map(({ q, a }) => (
        <section key={q} style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{q}</h2>
          {a.split('\n\n').map((para, i) => (
            <p key={i} style={{ fontSize: 15, color: '#333', marginBottom: 8 }}>
              {para}
            </p>
          ))}
        </section>
      ))}
    </main>
  );
}
