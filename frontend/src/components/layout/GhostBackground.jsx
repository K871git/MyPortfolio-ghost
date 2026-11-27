import { useEffect, useRef } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion';

const DIGIT_SPACING    = 42;
const DIGIT_JITTER     = 9;
const DIGIT_TORCH_OPACITY = 0.5;
const TORCH_RADIUS_PX  = 190;
const FLICKER_MS       = 220;
const FLICKER_FRACTION = 0.015;

export default function GhostBackground({ theme }) {
  const canvasRef    = useRef(null);
  const mouseRef     = useRef({ x: -9999, y: -9999 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Theme-aware colour + base opacity
    const COLOR        = theme === 'light' ? '37, 99, 235' : '79, 140, 255';
    const BASE_OPACITY = theme === 'light' ? 0.06 : 0.03;

    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let width, height, points = [];
    let rafScheduled = false;
    let flickerTimer;

    function rebuild() {
      width  = canvas.width  = window.innerWidth;
      height = canvas.height = window.innerHeight;

      const cols = Math.ceil(width  / DIGIT_SPACING) + 1;
      const rows = Math.ceil(height / DIGIT_SPACING) + 1;
      const next = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * DIGIT_SPACING + (Math.random() - 0.5) * DIGIT_JITTER;
          const y = r * DIGIT_SPACING + (Math.random() - 0.5) * DIGIT_JITTER;
          next.push({ x, y, digit: Math.random() > 0.5 ? '1' : '0' });
        }
      }
      points = next;
      render();
    }

    function render() {
      rafScheduled = false;
      ctx.clearRect(0, 0, width, height);
      ctx.font         = '13px "JetBrains Mono", monospace';
      ctx.textBaseline = 'middle';
      ctx.textAlign    = 'center';

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < points.length; i++) {
        const pt   = points[i];
        const dx   = pt.x - mx;
        const dy   = pt.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const near = reducedMotion ? 0 : Math.max(0, 1 - dist / TORCH_RADIUS_PX);

        const alpha = Math.min(1, BASE_OPACITY + near * DIGIT_TORCH_OPACITY);
        if (alpha < 0.015) continue;

        ctx.fillStyle = `rgba(${COLOR}, ${alpha})`;
        ctx.fillText(pt.digit, pt.x, pt.y);
      }
    }

    function scheduleRender() {
      if (rafScheduled) return;
      rafScheduled = true;
      requestAnimationFrame(render);
    }

    function onMouseMove(e) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      scheduleRender();
    }

    function flickerTick() {
      const swapCount = Math.max(1, Math.floor(points.length * FLICKER_FRACTION));
      for (let i = 0; i < swapCount; i++) {
        const p = points[(Math.random() * points.length) | 0];
        if (p) p.digit = Math.random() > 0.5 ? '1' : '0';
      }
      scheduleRender();
    }

    rebuild();
    window.addEventListener('resize', rebuild);

    if (!reducedMotion) {
      window.addEventListener('mousemove', onMouseMove, { passive: true });
      flickerTimer = setInterval(flickerTick, FLICKER_MS);
    }

    return () => {
      window.removeEventListener('resize', rebuild);
      window.removeEventListener('mousemove', onMouseMove);
      clearInterval(flickerTimer);
    };
  }, [reducedMotion, theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
