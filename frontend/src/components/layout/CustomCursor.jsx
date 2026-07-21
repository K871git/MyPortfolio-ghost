import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Small dot cursor that grows and fills when hovering anything
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
      className="custom-cursor fixed top-0 left-0 z-[999] pointer-events-none rounded-full"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        opacity: visible ? 1 : 0,
      }}
      animate={{
        width: active ? 40 : 8,
        height: active ? 40 : 8,
        backgroundColor: active ? 'rgba(79,140,255,0.15)' : '#FAFAFA',
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '9999px',
          border: active ? '1px solid #4F8CFF' : 'none',
        }}
      />
    </motion.div>
  );
}
