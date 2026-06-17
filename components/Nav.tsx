'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { label: 'About', href: '/about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Contact', href: '/#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href.replace('/', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // On-page section links only get the smooth-scroll treatment when we're
  // already on the home page; everywhere else they should behave like a
  // normal navigation link (browser jumps to the hash after routing home).
  const isOnPageHash = (href: string) => href.startsWith('/#') && pathname === '/';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? 'bg-bg/95 backdrop-blur-sm border-b border-border' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Monogram */}
          <a
            href="#"
            className="font-heading text-2xl font-black text-accent tracking-tight"
            aria-label="Shloka Kulkarni — home"
          >
            SK
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) =>
              isOnPageHash(l.href) ? (
                <button
                  key={l.label}
                  onClick={() => handleNavClick(l.href)}
                  className="nav-link text-sm font-body text-muted hover:text-ink transition-colors duration-200 cursor-pointer bg-transparent border-none"
                >
                  {l.label}
                </button>
              ) : (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="nav-link text-sm font-body text-muted hover:text-ink transition-colors duration-200"
                >
                  {l.label}
                </Link>
              )
            )}
            <a
              href="/resume.pdf"
              download
              className="text-sm font-body border border-border text-ink px-4 py-1.5 hover:border-accent hover:text-accent transition-colors duration-200"
            >
              Download Resume
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-5 h-px bg-ink transition-transform duration-300 ${
                menuOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`block w-5 h-px bg-ink transition-opacity duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-px bg-ink transition-transform duration-300 ${
                menuOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-40 bg-bg flex flex-col justify-center px-10"
          >
            <div className="flex flex-col gap-8">
              {links.map((l, i) =>
                isOnPageHash(l.href) ? (
                  <motion.button
                    key={l.label}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.1 }}
                    onClick={() => handleNavClick(l.href)}
                    className="text-left font-heading text-5xl font-black text-ink hover:text-accent transition-colors duration-200 cursor-pointer bg-transparent border-none"
                  >
                    {l.label}
                  </motion.button>
                ) : (
                  <motion.div
                    key={l.label}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.1 }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-left font-heading text-5xl font-black text-ink hover:text-accent transition-colors duration-200"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                )
              )}
              <motion.a
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                href="/resume.pdf"
                download
                className="mt-4 self-start text-sm font-body border border-border text-ink px-6 py-2 hover:border-accent hover:text-accent transition-colors duration-200"
              >
                Download Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
