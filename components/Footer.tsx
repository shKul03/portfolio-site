const TICKER_TEXT =
  'SHLOKA KULKARNI ✦ AI ENGINEER ✦ RAG SYSTEMS ✦ VOICE BOTS ✦ TECHNOSSUS ✦ EX-CROWDSTRIKE ✦ ';

export default function Footer() {
  return (
    <footer>
      {/* Full-width ticker bar */}
      <div className="w-full bg-accent py-3 overflow-hidden">
        <div className="ticker-track">
          <span className="font-heading font-bold text-sm text-bg tracking-widest whitespace-nowrap">
            {TICKER_TEXT.repeat(6)}
          </span>
          <span className="font-heading font-bold text-sm text-bg tracking-widest whitespace-nowrap" aria-hidden>
            {TICKER_TEXT.repeat(6)}
          </span>
        </div>
      </div>

      {/* Info row */}
      <div className="px-6 lg:px-8 py-8 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border">
        <span className="font-heading text-xl font-black text-accent">SK</span>
        <p className="font-body text-xs text-muted text-center">
          Shloka Kulkarni &nbsp;·&nbsp; AI Engineer &nbsp;·&nbsp;{' '}
          {new Date().getFullYear()}
        </p>
        <a
          href="https://github.com/shKul03"
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-xs text-muted hover:text-accent transition-colors duration-200"
        >
          github.com/shKul03
        </a>
      </div>
    </footer>
  );
}
