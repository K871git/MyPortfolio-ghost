import { motion, AnimatePresence } from 'framer-motion';

/* ── Rotating sun with 8 rays ───────────────────────────────────── */
function SunIcon() {
  const rays = Array.from({ length: 8 }, (_, i) => {
    const a = ((i * 45 - 90) * Math.PI) / 180;
    return {
      x1: 12 + 6.4 * Math.cos(a),
      y1: 12 + 6.4 * Math.sin(a),
      x2: 12 + 10 * Math.cos(a),
      y2: 12 + 10 * Math.sin(a),
    };
  });

  return (
    <motion.svg
      width="20" height="20" viewBox="0 0 24 24" fill="none"
      animate={{ rotate: 360 }}
      transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      style={{ display: 'block' }}
    >
      <circle cx="12" cy="12" r="4.5" fill="currentColor" />
      {rays.map((r, i) => (
        <line
          key={i}
          x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
        />
      ))}
    </motion.svg>
  );
}

/* ── Moon crescent with twinkling stars ─────────────────────────── */
function MoonIcon() {
  const stars = [
    { cx: 19,   cy: 3.5,  r: 0.9, delay: 0 },
    { cx: 21.5, cy: 9.5,  r: 0.7, delay: 0.45 },
    { cx: 19.5, cy: 16,   r: 0.75, delay: 0.9 },
  ];
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" style={{ display: 'block' }}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" />
      {stars.map((s, i) => (
        <motion.circle
          key={i}
          cx={s.cx} cy={s.cy} r={s.r}
          fill="currentColor"
          animate={{ opacity: [0.15, 1, 0.15], scale: [0.8, 1, 0.8] }}
          transition={{ duration: 2.2 + i * 0.4, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  );
}

/* ── Main toggle button ─────────────────────────────────────────── */
export default function ThemeToggle({ theme, toggleTheme }) {
  const isDark = theme === 'dark';

  return (
    <motion.button
      type="button"
      data-cursor="interactive"
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.88 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative flex items-center justify-center w-10 h-10 rounded-xl overflow-visible select-none"
      style={{
        background: isDark ? 'rgba(79,140,255,0.08)' : 'rgba(234,160,0,0.1)',
        border: isDark ? '1px solid rgba(79,140,255,0.3)' : '1px solid rgba(220,140,0,0.4)',
        boxShadow: isDark
          ? '0 0 20px rgba(79,140,255,0.2), inset 0 1px 0 rgba(255,255,255,0.05)'
          : '0 0 20px rgba(234,160,0,0.25), inset 0 1px 0 rgba(255,255,255,0.3)',
        color: isDark ? 'rgb(var(--c-blue))' : 'rgb(174, 100, 0)',
        transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease, color 0.3s ease',
      }}
    >
      {/* Outer glow ring on hover */}
      <motion.div
        className="absolute inset-[-3px] rounded-xl pointer-events-none"
        style={{
          border: isDark ? '1px solid rgba(79,140,255,0)' : '1px solid rgba(234,160,0,0)',
          transition: 'border-color 0.4s',
        }}
        whileHover={{
          boxShadow: isDark
            ? '0 0 32px rgba(79,140,255,0.4)'
            : '0 0 32px rgba(234,160,0,0.4)',
        }}
      />

      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -20, scale: 0.4, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 20, scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <MoonIcon />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 20, scale: 0.4, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -20, scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <SunIcon />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
