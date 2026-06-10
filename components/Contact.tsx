'use client';

import FadeUp from './FadeUp';

const links = [
  {
    label: 'Email',
    href: 'mailto:kulkarni.shloka03@gmail.com',
    display: 'kulkarni.shloka03@gmail.com',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/shlokakulkarni',
    display: 'linkedin.com/in/shlokakulkarni',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/shKul03',
    display: 'github.com/shKul03',
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-16 lg:py-28 px-6 lg:px-8 max-w-6xl mx-auto"
    >
      <FadeUp>
        <div style={{ marginBottom: 16 }}>
          <h2
            className="font-heading font-black text-ink uppercase"
            style={{ fontSize: 'clamp(32px, 4vw, 56px)', letterSpacing: '0.02em', lineHeight: 1 }}
          >
            Contact
          </h2>
          <div style={{ width: 40, height: 3, background: '#3B47E8', marginTop: 8 }} />
        </div>
      </FadeUp>

      <FadeUp delay={0.05}>
        <h3 className="font-heading text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-[0.9] tracking-tight text-ink mb-4">
          LET&apos;S BUILD
          <br />
          <span className="text-accent">SOMETHING.</span>
        </h3>
      </FadeUp>

      <FadeUp delay={0.1}>
        <p className="font-body text-base text-muted mb-10 max-w-md leading-relaxed">
          Open to full-time roles, freelance projects, and interesting conversations.
        </p>
      </FadeUp>

      <div className="flex flex-col gap-4">
        {links.map((l, i) => (
          <FadeUp key={l.label} delay={0.15 + i * 0.07}>
            <a
              href={l.href}
              target={l.href.startsWith('mailto') ? undefined : '_blank'}
              rel={l.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="group flex items-baseline gap-6 py-4 border-b border-border hover:border-accent/40 transition-colors duration-300"
            >
              <span className="font-body text-xs text-muted uppercase tracking-widest w-24 shrink-0">
                {l.label}
              </span>
              <span className="font-body text-xl lg:text-2xl text-ink group-hover:text-accent transition-colors duration-300">
                {l.display}
              </span>
              <span className="ml-auto font-body text-muted group-hover:text-accent transition-colors duration-300 text-lg">
                ↗
              </span>
            </a>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
