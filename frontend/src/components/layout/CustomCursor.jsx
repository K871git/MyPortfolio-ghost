import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Original hand-authored skull silhouette — smooth rounded cranium, plain
 * round eye sockets (no almond/diamond/triangular shapes), simple
 * triangular nasal cavity. Not a recreation of any character's mask/logo.
 */
const CRANIUM_D =
  'M50 4C70 4 85 20 85 40C85 52 80 61 72 68C75 73 72 79 67 77C66 83 60 82 58 88C55 82 52 86 50 86C48 86 45 82 42 88C40 82 34 83 33 77C28 79 25 73 28 68C20 61 15 52 15 40C15 20 30 4 50 4Z';
const NOSE = 'M50 46L44 58L56 58Z';

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
      animate={{ width: active ? 34 : 18, height: active ? 34 : 18 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <motion.svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        animate={{
          filter: active
            ? 'drop-shadow(0 0 6px rgba(79,140,255,0.8))'
            : 'drop-shadow(0 0 0px rgba(79,140,255,0))',
        }}
        transition={{ duration: 0.25 }}
      >
        <motion.path d={CRANIUM_D} animate={{ fill: active ? '#4F8CFF' : '#FAFAFA' }} transition={{ duration: 0.2 }} />
        <ellipse cx="35" cy="38" rx="9" ry="10" fill="#050505" />
        <ellipse cx="65" cy="38" rx="9" ry="10" fill="#050505" />
        <path d={NOSE} fill="#050505" />
      </motion.svg>
    </motion.div>
  );
}
