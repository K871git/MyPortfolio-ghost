import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CRANIUM_D =
  'M50 4C70 4 85 20 85 40C85 52 80 61 72 68C75 73 72 79 67 77C66 83 60 82 58 88C55 82 52 86 50 86C48 86 45 82 42 88C40 82 34 83 33 77C28 79 25 73 28 68C20 61 15 52 15 40C15 20 30 4 50 4Z';
const NOSE = 'M50 46L44 58L56 58Z';

const SPRING = { stiffness: 140, damping: 20, mass: 0.55 };

export default function CustomCursor() {
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);
  const x    = useSpring(rawX, SPRING);
  const y    = useSpring(rawY, SPRING);

  const [active,  setActive]  = useState(false);
  const [ghost,   setGhost]   = useState(false);   // transparent skull over logo
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onOver = (e) => {
      setActive(Boolean(e.target.closest('a, button, [data-cursor="interactive"]')));
      // ghost = cursor becomes see-through so you can read the logo through it
      setGhost(Boolean(e.target.closest('[data-cursor="logo"]')));
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover',  onOver, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover',  onOver);
    };
  }, [visible, rawX, rawY]);

  const size = active || ghost ? 42 : 20;

  return (
    <motion.div
      className="custom-cursor fixed top-0 left-0 z-[999] pointer-events-none"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        opacity: visible ? 1 : 0,
      }}
      animate={{ width: size, height: size }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
    >
      <motion.svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        animate={{
          opacity: ghost ? 0.52 : 1,
          filter:  ghost
            ? 'drop-shadow(0 0 6px rgba(79,140,255,0.7))'
            : active
              ? 'drop-shadow(0 0 7px rgba(79,140,255,0.9))'
              : 'drop-shadow(0 0 0px rgba(79,140,255,0))',
        }}
        transition={{ duration: 0.22 }}
      >
        {/* Skull body — transparent outline when ghost, solid otherwise */}
        <motion.path
          d={CRANIUM_D}
          animate={{
            fill:        ghost ? 'rgba(0,0,0,0)'      : active ? '#4F8CFF' : '#FAFAFA',
            stroke:      ghost ? 'rgba(79,140,255,0.9)' : 'none',
            strokeWidth: ghost ? 2.5 : 0,
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Left eye */}
        <motion.ellipse
          cx="35" cy="38" rx="9" ry="10"
          animate={{
            fill:        ghost ? 'rgba(0,0,0,0)'      : '#050505',
            stroke:      ghost ? 'rgba(79,140,255,0.6)' : 'none',
            strokeWidth: ghost ? 1.5 : 0,
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Right eye */}
        <motion.ellipse
          cx="65" cy="38" rx="9" ry="10"
          animate={{
            fill:        ghost ? 'rgba(0,0,0,0)'      : '#050505',
            stroke:      ghost ? 'rgba(79,140,255,0.6)' : 'none',
            strokeWidth: ghost ? 1.5 : 0,
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Nose */}
        <motion.path
          d={NOSE}
          animate={{
            fill:        ghost ? 'rgba(0,0,0,0)'      : '#050505',
            stroke:      ghost ? 'rgba(79,140,255,0.5)' : 'none',
            strokeWidth: ghost ? 1.5 : 0,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.svg>
    </motion.div>
  );
}
