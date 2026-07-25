import { useEffect, useRef } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion';

/**
 * Same original hand-authored skull silhouette as CustomCursor.jsx, scaled
 * up for use as a full-scene mural. Not a recreation of any copyrighted
 * character mask/logo — a classic front-facing skull shape.
 */
const SKULL_D =
  'M50 6C71 6 86 23 86 44C86 54 82 62 74 69L74 78C74 82 71 85 66 85L66 78L58 78L58 85L50 85L50 78L42 78L42 85L34 85C29 85 26 82 26 78L26 69C18 62 14 54 14 44C14 23 29 6 50 6Z';

function Skull({ fill, opacity = 1 }) {
  return (
    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
      <path d={SKULL_D} fill={fill} fillOpacity={opacity} />
      <ellipse cx="36" cy="40" rx="8" ry="10" fill="#050505" fillOpacity={opacity} />
      <ellipse cx="64" cy="40" rx="8" ry="10" fill="#050505" fillOpacity={opacity} />
      <path d="M50 46L44 59L56 59Z" fill="#050505" fillOpacity={opacity} />
      {/* Jaw teeth dividers, only readable at this larger mural size */}
      <line x1="42" y1="78" x2="42" y2="85" stroke="#050505" strokeWidth="1.4" opacity={opacity} />
      <line x1="50" y1="78" x2="50" y2="85" stroke="#050505" strokeWidth="1.4" opacity={opacity} />
      <line x1="58" y1="78" x2="58" y2="85" stroke="#050505" strokeWidth="1.4" opacity={opacity} />
      <line x1="66" y1="78" x2="66" y2="85" stroke="#050505" strokeWidth="1.4" opacity={opacity} />
    </svg>
  );
}

/**
 * Sits behind all content, fixed to the viewport. A dim "hint" copy of the
 * skull is always faintly visible against the dark background; a brighter
 * copy is masked with a soft radial gradient centered on the mouse, so
 * moving the cursor feels like sweeping a torch across a dark wall.
 * Falls back to a static dim skull (no mouse tracking) under
 * prefers-reduced-motion.
 */
export default function GhostBackground() {
  const wrapRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    function onMove(e) {
      const el = wrapRef.current;
      if (!el) return;
      el.style.setProperty('--gx', `${e.clientX}px`);
      el.style.setProperty('--gy', `${e.clientY}px`);
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [reducedMotion]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ '--gx': '50vw', '--gy': '40vh' }}
    >
      {/* Dim hint layer — always just barely visible, like a shape in the dark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.05]">
        <div style={{ width: 'min(85vh, 85vw)', height: 'min(85vh, 85vw)' }}>
          <Skull fill="#FAFAFA" />
        </div>
      </div>

      {/* Torch-revealed bright layer — masked to a soft circle around the cursor */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={
          reducedMotion
            ? { opacity: 0.08 }
            : {
                WebkitMaskImage:
                  'radial-gradient(circle 200px at var(--gx) var(--gy), black 0%, transparent 72%)',
                maskImage:
                  'radial-gradient(circle 200px at var(--gx) var(--gy), black 0%, transparent 72%)',
              }
        }
      >
        <div style={{ width: 'min(85vh, 85vw)', height: 'min(85vh, 85vw)' }}>
          <Skull fill="#4F8CFF" opacity={0.9} />
        </div>
      </div>
    </div>
  );
}
