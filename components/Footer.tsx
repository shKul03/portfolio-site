export default function Footer() {
  return (
    <footer className="border-t border-border px-6 lg:px-8 py-8 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <span className="font-heading text-sm font-bold text-accent">SK</span>
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
    </footer>
  );
}
