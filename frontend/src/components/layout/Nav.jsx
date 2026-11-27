import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';

/* ── GHOST/OS logo with scramble + scanline + neon glow ─────────── */
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01!#$<>[]{}';
const GHOST_TEXT = 'GHOST';

function GhostLogo({ onClick }) {
  const [display, setDisplay] = useState(GHOST_TEXT);
  const [active,  setActive]  = useState(false);
  const timerRef = useRef(null);
  const tickRef  = useRef(0);

  const scramble = () => {
    setActive(true);
    tickRef.current = 0;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const t = tickRef.current;
      setDisplay(
        GHOST_TEXT.split('').map((ch, i) =>
          i < t / 2.8
            ? ch
            : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
        ).join('')
      );
      tickRef.current += 1;
      if (tickRef.current > 24) {
        clearInterval(timerRef.current);
        setDisplay(GHOST_TEXT);
      }
    }, 46);
  };

  const reset = () => {
    clearInterval(timerRef.current);
    setDisplay(GHOST_TEXT);
    setActive(false);
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  return (
    <a
      href="#top"
      data-cursor="interactive"
      onClick={onClick}
      data-cursor="logo"
      className="relative font-mono text-sm tracking-widest inline-flex items-center select-none group"
      onMouseEnter={scramble}
      onMouseLeave={reset}
    >
      {/* Background glow pill on hover */}
      <motion.span
        className="absolute -inset-x-2 -inset-y-1 rounded-md pointer-events-none"
        animate={{
          opacity:    active ? 1 : 0,
          boxShadow: active ? 'inset 0 0 14px rgba(79,140,255,0.08)' : 'none',
          background: active ? 'rgba(79,140,255,0.05)' : 'transparent',
        }}
        transition={{ duration: 0.25 }}
      />

      {/* GHOST scramble + scanline */}
      <span
        className="relative overflow-hidden inline-block"
        style={{
          textShadow: active
            ? '0 0 7px rgba(79,140,255,0.95), 0 0 22px rgba(79,140,255,0.55), 0 0 48px rgba(79,140,255,0.25)'
            : 'none',
          color: 'rgb(var(--c-ink))',
          transition: 'text-shadow 0.28s ease',
          letterSpacing: 'inherit',
        }}
      >
        {display}

        {/* Scanline sweep */}
        {active && (
          <motion.span
            className="absolute left-0 right-0 h-px pointer-events-none"
            style={{ background: 'rgba(79,140,255,0.75)', mixBlendMode: 'screen' }}
            initial={{ top: '-1px', opacity: 1 }}
            animate={{ top: '110%', opacity: 0.4 }}
            transition={{ duration: 0.42, ease: 'linear', repeat: Infinity, repeatDelay: 0.08 }}
          />
        )}
      </span>

      {/* /OS — deeper glow on hover */}
      <span
        style={{
          color:      active ? '#7db6ff' : 'rgb(var(--c-blue))',
          textShadow: active ? '0 0 10px rgba(79,140,255,1), 0 0 24px rgba(79,140,255,0.6)' : 'none',
          transition: 'all 0.25s ease',
        }}
      >
        /OS
      </span>
    </a>
  );
}

const LINKS = [
  { label: 'experience', href: '#experience' },
  { label: 'projects',   href: '#projects'   },
  { label: 'toolbox',    href: '#toolbox'     },
  { label: 'process',    href: '#about'       },
  { label: 'resume',     href: '#resume'      },
  { label: 'contact',    href: '#contact'     },
];

export default function Nav({ status = 'Available for opportunities', theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isDark = theme === 'dark';
  const navBg = scrolled || menuOpen
    ? isDark ? 'rgba(5,5,5,0.88)' : 'rgba(243,245,250,0.9)'
    : 'transparent';

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 3.4, duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          background: navBg,
          backdropFilter: scrolled || menuOpen ? 'blur(18px)' : 'none',
          WebkitBackdropFilter: scrolled || menuOpen ? 'blur(18px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgb(var(--c-border) / 0.07)'
            : '1px solid transparent',
        }}
      >
        <nav className="container-os flex items-center justify-between py-4">
          {/* Logo */}
          <GhostLogo onClick={() => setMenuOpen(false)} />

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-7 font-mono text-xs uppercase tracking-widest text-muted">
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

          <div className="flex items-center gap-2.5">
            {/* Status dot */}
            <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-muted">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-pulseDot absolute inline-flex h-full w-full rounded-full bg-success" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
              </span>
              <span className="hidden lg:inline">{status}</span>
            </div>

            {/* Animated theme toggle */}
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

            {/* Hamburger — mobile only */}
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-border/15 text-muted hover:text-ink hover:border-border/30 transition-colors"
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={18} />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 flex flex-col items-center justify-center md:hidden"
            style={{
              background: isDark ? 'rgba(5,5,5,0.97)' : 'rgba(237,240,247,0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          >
            {/* Dot grid behind overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-50"
              style={{
                backgroundImage: 'radial-gradient(rgb(var(--c-border) / 0.07) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />

            <ul className="flex flex-col items-center gap-5 relative z-10">
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.055, duration: 0.3 }}
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.42, duration: 0.3 }}
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
