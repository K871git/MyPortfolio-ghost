import { useEffect, useRef } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion';

/**
 * Canvas-based dot grid. A radial "lighting" effect follows the mouse,
 * brightening nearby dots. Runs on requestAnimationFrame and is fully
 * disabled (falls back to a static grid) under prefers-reduced-motion.
 */
export default function DotGrid() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;
    let width, height, cols, rows;
    const gap = 32;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      cols = Math.ceil(width / gap);
      rows = Math.ceil(height / gap);
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * gap;
          const y = j * gap;
          const dx = x - mouse.current.x;
          const dy = y - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radius = 220;
          const intensity = Math.max(0, 1 - dist / radius);

          const base = 0.06;
          const alpha = base + intensity * 0.5;
          const size = 1 + intensity * 1.4;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = intensity > 0.05
            ? `rgba(79, 140, 255, ${Math.min(alpha, 0.9)})`
            : `rgba(255, 255, 255, ${base})`;
          ctx.fill();
        }
      }
      if (!reducedMotion) {
        raf = requestAnimationFrame(draw);
      }
    }

    function onMouseMove(e) {
      mouse.current = { x: e.clientX, y: e.clientY };
    }

    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
