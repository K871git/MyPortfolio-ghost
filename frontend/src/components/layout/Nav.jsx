import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 3.4, duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(5, 5, 5, 0.72)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <nav className="container-os flex items-center justify-between py-5">
        <a
          href="#top"
          data-cursor="interactive"
          className="font-mono text-sm tracking-widest text-ink"
        >
          GHOST<span className="text-blue">/OS</span>
        </a>

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

        <div className="flex items-center gap-2 font-mono text-xs text-muted">
          <span className="relative flex h-2 w-2">
            <span className="animate-pulseDot absolute inline-flex h-full w-full rounded-full bg-success" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
          </span>
          <span className="hidden sm:inline">{status}</span>
        </div>
      </nav>
    </motion.header>
  );
}
