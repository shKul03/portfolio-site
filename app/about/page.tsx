import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FadeUp from '@/components/FadeUp';

export const metadata: Metadata = {
  title: 'About — Shloka Kulkarni',
  description:
    "Shloka Kulkarni is an AI Engineer based in Pune, India. The story behind her work in RAG systems, LLM engineering, and why her portfolio spans such a wide range of projects.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg">
        {/* Hero */}
        <section
          aria-label="About hero"
          className="relative flex flex-col items-center justify-center text-center px-6 lg:px-8 pt-32 pb-16 overflow-hidden"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(59,71,232,0.12) 2px, transparent 2px)',
            backgroundSize: '28px 28px',
          }}
        >
          <FadeUp>
            <span className="font-body text-[11px] uppercase tracking-[0.2em] text-muted block mb-4">
              The person behind the work
            </span>
            <h1
              className="font-heading font-black text-ink leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}
            >
              About Shloka Kulkarni
            </h1>
          </FadeUp>
        </section>

        {/* Prose body */}
        <article className="px-6 lg:px-8 max-w-2xl mx-auto pb-28">
          <FadeUp delay={0.05}>
            <h2 className="font-heading font-black text-ink text-2xl sm:text-3xl tracking-tight mb-4 mt-12 first:mt-0">
              The thing that started it all
            </h2>
            <p className="font-body text-base text-muted leading-relaxed mb-6">
              I was a teenager when I first encountered the idea that intelligence
              could exist inside a machine. Not simulated intelligence — actual
              emergent behaviour that even the people who built the system couldn&apos;t
              fully explain. The black box problem. The fact that the creators of
              some of the most powerful models in the world genuinely cannot tell you{' '}
              <em>why</em> the model made a particular decision — that baffled me. It
              still does. And that combination of bafflement and fascination is what
              pulled me headfirst into AI.
            </p>
            <p className="font-body text-base text-muted leading-relaxed mb-6">
              What sealed it was realising that mathematics — something I&apos;d always
              loved for its precision and logic — could evolve into something as
              expressive and almost alive as a neural network. The structure of a
              neural network is genuinely beautiful to me. There&apos;s art in it. Not
              metaphorically — actually, visually, conceptually beautiful. I&apos;ve always
              believed that anything done well has an architecture to it, a method, a
              form. And AI made that belief feel like more than just a personal quirk.
            </p>
            <p className="font-body text-base text-muted leading-relaxed mb-6">
              My goal, someday, is to build something like that from scratch.
              Something that surprises even me. For now, I take real pleasure in
              applying these models to real-world problems — building pipelines and
              workflows where I can rely on AI&apos;s intelligence as a genuine
              collaborator, not just a tool.
            </p>
          </FadeUp>

          <FadeUp delay={0.05}>
            <h2 className="font-heading font-black text-ink text-2xl sm:text-3xl tracking-tight mb-4 mt-12">
              How I actually work
            </h2>
            <p className="font-body text-base text-muted leading-relaxed mb-6">
              I am a data-first thinker.
            </p>
            <p className="font-body text-base text-muted leading-relaxed mb-6">
              Before I write a single line of code, I figure out what my data looks
              like. Input, output, and every meaningful shape in between. I think of
              them as lego bricks — discrete, well-defined data structures that I can
              reason about, pass around, and connect. Once I know my data, the rest
              of the architecture tends to follow naturally.
            </p>
            <p className="font-body text-base text-muted leading-relaxed mb-6">
              Even when I&apos;m using AI agents to help plan or generate code, I drive
              the data design myself. I want to know exactly what a payload looks
              like before it leaves a service, and exactly what the receiving end
              expects when it arrives. I sketch these out explicitly — sometimes
              literally, sometimes just mentally — before building starts. This
              approach means I rarely get surprised by integration bugs or mismatched
              contracts halfway through a project.
            </p>
            <p className="font-body text-base text-muted leading-relaxed mb-6">
              I always build from scratch. Not because I&apos;m opposed to frameworks or
              libraries — I use them constantly — but because I want to understand
              the bones of what I&apos;m building before I layer anything on top.
            </p>
          </FadeUp>

          <FadeUp delay={0.05}>
            <h2 className="font-heading font-black text-ink text-2xl sm:text-3xl tracking-tight mb-4 mt-12">
              Why the range
            </h2>
            <p className="font-body text-base text-muted leading-relaxed mb-6">
              My portfolio spans RAG chatbots, OCR pipelines, WhatsApp bots, voice
              microservices, design systems, revenue collection platforms, and kiosk
              UIs. That wasn&apos;t a deliberate strategy. It&apos;s just how curiosity works.
            </p>
            <p className="font-body text-base text-muted leading-relaxed mb-6">
              I got into the world of AI and discovered RAG. I thought it was a
              genuinely lovely architecture — retrieval and generation working
              together as one coherent system. So I built one. Then I came across
              OCR and thought the same thing, so I built that too. WhatsApp bots
              taught me something different: you can build a real product without
              any traditional UI at all, just a conversational interface over an
              existing messaging platform. That idea excited me.
            </p>
            <p className="font-body text-base text-muted leading-relaxed mb-6">
              Then I started thinking about how to make RAG even more efficient —
              what if you removed the database layer entirely, and just crawled the
              website live every time? That became LiveMind. Each project was less
              of a planned decision and more of a question I wanted to answer by
              building the answer.
            </p>
          </FadeUp>

          <FadeUp delay={0.05}>
            <h2 className="font-heading font-black text-ink text-2xl sm:text-3xl tracking-tight mb-4 mt-12">
              The art-and-science thing
            </h2>
            <p className="font-body text-base text-muted leading-relaxed mb-6">
              I&apos;ve spent most of my life refusing to choose between the two, and
              I&apos;ve come to believe the separation is mostly artificial anyway.
            </p>
            <p className="font-body text-base text-muted leading-relaxed mb-6">
              Science done well has aesthetic qualities. A clean system architecture
              is satisfying in the same way a well-composed painting is satisfying. A
              well-designed API feels elegant. Code that reads like prose is
              genuinely pleasurable to write. I was the lead singer in my school
              choir. I spent years sketching and painting as a child. I follow modern
              artists on social media and think about visual composition the way I
              think about software architecture — where does the eye go, what&apos;s the
              flow, what does the structure communicate?
            </p>
            <p className="font-body text-base text-muted leading-relaxed mb-6">
              To me, building something — anything — is a creative act. You&apos;re
              making something that didn&apos;t exist before. Whether it&apos;s a model, a
              microservice, or a melody, the fundamental experience is the same.
            </p>
          </FadeUp>

          <FadeUp delay={0.05}>
            <h2 className="font-heading font-black text-ink text-2xl sm:text-3xl tracking-tight mb-4 mt-12">
              What I&apos;m looking for
            </h2>
            <p className="font-body text-base text-muted leading-relaxed mb-6">
              I do my best work on collaborative teams with good management — places
              where teammates are people you can genuinely rely on, not just people
              you technically work alongside. That distinction matters to me more
              than company size or industry. I want to work somewhere where people
              take the work seriously and take each other seriously.
            </p>
            <p className="font-body text-base text-muted leading-relaxed mb-6">
              In terms of what I want to build next: I&apos;m deeply interested in
              agentic workflows — systems that can reason, plan, and take action
              across multiple steps without constant human steering. I&apos;ve been using
              existing MCPs (Model Context Protocols) for a while and I want to start
              writing my own. There&apos;s something compelling about defining exactly
              what capabilities you give an agent and watching it use them in ways
              you didn&apos;t fully anticipate.
            </p>
          </FadeUp>

          <FadeUp delay={0.05}>
            <h2 className="font-heading font-black text-ink text-2xl sm:text-3xl tracking-tight mb-4 mt-12">
              Outside of work
            </h2>
            <p className="font-body text-base text-muted leading-relaxed mb-6">
              Music accompanies almost everything I do — working, reading,
              travelling, thinking. My taste spans languages, genres, and moods
              because I&apos;m attracted to feeling, not category. K-pop is a genuine
              love, not an ironic one.
            </p>
            <p className="font-body text-base text-muted leading-relaxed mb-6">
              I&apos;m a film and television enthusiast with specific taste: ambitious
              sci-fi (<em>Interstellar</em>, <em>Tenet</em>), intelligent character
              work (<em>Sherlock</em>), emotionally rich storytelling (
              <em>When Life Gives You Tangerines</em>, <em>The Good Bad Mother</em>).
              I also watch anime, the occasional German show, and can go deep on
              K-dramas. My reading covers science fiction, young adult fiction, and —
              I&apos;ll be honest — fanfiction. I&apos;ve been reading and writing fanfic
              since my teenage years and I maintain a Tumblr account for it that I
              will absolutely not be sharing.
            </p>
            <p className="font-body text-base text-muted leading-relaxed mb-6">
              I keep a small, close circle of friends who I value deeply. And I love
              road trips — I grew up travelling by road from Pune to Hyderabad,
              Hyderabad to Nashik, and further, which built a habit I&apos;ve never
              dropped. I&apos;ve done Goa, Pondicherry, Chandigarh, and various cities
              across Maharashtra. The journey matters as much as the destination.
            </p>
            <p className="font-body text-base text-ink leading-relaxed font-medium mb-6">
              At the end of it, I&apos;m an engineer who thinks like an artist, a
              learner who builds to understand, and someone who finds genuine
              excitement in problems that don&apos;t have obvious answers yet.
            </p>
          </FadeUp>
        </article>
      </main>
      <Footer />
    </>
  );
}
