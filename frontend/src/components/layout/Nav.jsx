import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { label: 'experience', href: '#experience' },
  { label: 'projects', href: '#projects' },
  { label: 'toolbox', href: '#toolbox' },
  { label: 'process', href: '#about' },
  { label: 'resume', href: '#resume' },
  { label: 'contact', href: '#contact' },
];

export default function Nav({ status = 'Available for opportunities' }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 3.4, duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          background: scrolled || menuOpen ? 'rgba(5, 5, 5, 0.92)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        <nav className="container-os flex items-center justify-between py-5">
          {/* Logo */}
          <a
            href="#top"
            data-cursor="interactive"
            onClick={() => setMenuOpen(false)}
            className="font-mono text-sm tracking-widest text-ink"
          >
            GHOST<span className="text-blue">/OS</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-muted">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-cursor="interactive"
                  className="relative py-1 hover:text-ink transition-colors duration-200 group"
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-blue transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {/* Status dot */}
            <div className="flex items-center gap-2 font-mono text-xs text-muted">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-pulseDot absolute inline-flex h-full w-full rounded-full bg-success" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
              </span>
              <span className="hidden sm:inline">{status}</span>
            </div>

            {/* Hamburger button — mobile only */}
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 text-muted hover:text-ink hover:border-white/25 transition-colors"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-bg/95 backdrop-blur-md flex flex-col items-center justify-center md:hidden"
          >
            <ul className="flex flex-col items-center gap-6">
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-mono text-2xl uppercase tracking-widest text-muted hover:text-ink transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Status at bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="absolute bottom-10 flex items-center gap-2 font-mono text-xs text-muted"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-pulseDot absolute inline-flex h-full w-full rounded-full bg-success" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
              </span>
              {status}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
