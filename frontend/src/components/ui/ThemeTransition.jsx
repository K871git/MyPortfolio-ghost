import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Full-screen colour flash that plays once every time the theme changes.
 * Golden wash → light mode. Indigo wash → dark mode.
 */
export default function ThemeTransition({ theme }) {
  const [active, setActive] = useState(false);
  const [bg, setBg]         = useState('transparent');
  const prevRef             = useRef(theme);

  useEffect(() => {
    if (prevRef.current === theme) return;
    setBg(theme === 'light' ? 'rgba(255,210,80,0.28)' : 'rgba(20,20,90,0.32)');
    setActive(true);
    prevRef.current = theme;
    const t = setTimeout(() => setActive(false), 600);
    return () => clearTimeout(t);
  }, [theme]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="theme-flash"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.52, ease: 'easeOut' }}
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 9998, background: bg }}
        />
      )}
    </AnimatePresence>
  );
}
