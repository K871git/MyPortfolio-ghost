import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Original hand-authored skull silhouette (cranium, cheekbones, jagged
 * teeth line) — not a recreation of any game/film character's mask or logo,
 * just a classic front-facing skull shape.
 */
const SKULL_D =
  'M50 6C71 6 86 23 86 44C86 54 82 62 74 69L74 78C74 82 71 85 66 85L66 78L58 78L58 85L50 85L50 78L42 78L42 85L34 85C29 85 26 82 26 78L26 69C18 62 14 54 14 44C14 23 29 6 50 6Z';

/**
 * Skull-shaped cursor that grows and glows blue when hovering anything
 * marked as interactive (a, button, [data-cursor="interactive"]).
 */
export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onOver = (e) => {
      const el = e.target.closest('a, button, [data-cursor="interactive"]');
      setActive(Boolean(el));
    };

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', onOver);
    };
  }, [visible, x, y]);

  return (
    <motion.div
      className="custom-cursor fixed top-0 left-0 z-[999] pointer-events-none"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        opacity: visible ? 1 : 0,
      }}
      animate={{ width: active ? 36 : 18, height: active ? 36 : 18 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <motion.svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        animate={{
          filter: active
            ? 'drop-shadow(0 0 7px rgba(79,140,255,0.9))'
            : 'drop-shadow(0 0 0px rgba(79,140,255,0))',
        }}
        transition={{ duration: 0.25 }}
      >
        {/* Cranium + jaw */}
        <motion.path
          d={SKULL_D}
          animate={{ fill: active ? '#4F8CFF' : '#FAFAFA' }}
          transition={{ duration: 0.2 }}
        />
        {/* Eye sockets */}
        <ellipse cx="36" cy="40" rx="8" ry="10" fill="#050505" />
        <ellipse cx="64" cy="40" rx="8" ry="10" fill="#050505" />
        {/* Nasal cavity */}
        <path d="M50 46L44 59L56 59Z" fill="#050505" />
      </motion.svg>
    </motion.div>
  );
}
