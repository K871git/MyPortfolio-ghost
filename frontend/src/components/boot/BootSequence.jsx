import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DotGrid from './DotGrid';
import TypedLine from './TypedLine';
import useReducedMotion from '../../hooks/useReducedMotion';

const BOOT_LINES = [
  'synapse/os v2.4.0',
  'initializing system...',
  'loading engineering profile...',
  'mounting backend services... OK',
  'mounting frontend runtime... OK',
  'system ready.',
];

export default function BootSequence({ identity, onComplete }) {
  const reducedMotion = useReducedMotion();
  const [lineIndex, setLineIndex] = useState(0);
  const [showName, setShowName] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setLineIndex(BOOT_LINES.length);
      setShowName(true);
      const t = setTimeout(finish, 600);
      return () => clearTimeout(t);
    }
  }, [reducedMotion]);

  function handleLineDone() {
    if (lineIndex < BOOT_LINES.length - 1) {
      setTimeout(() => setLineIndex((i) => i + 1), 120);
    } else {
      setTimeout(() => setShowName(true), 400);
    }
  }

  function finish() {
    setExiting(true);
    setTimeout(() => onComplete(), 700);
  }

  useEffect(() => {
    if (showName) {
      const t = setTimeout(finish, 2200);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showName]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="boot"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 bg-bg flex items-center justify-center overflow-hidden"
        >
          <DotGrid />

          <div className="relative z-10 w-full max-w-2xl px-6 font-mono text-sm text-muted">
            <div className="space-y-1.5">
              {BOOT_LINES.slice(0, lineIndex + 1).map((line, i) => (
                <div key={line}>
                  {i < lineIndex ? (
                    <span>
                      <span className="text-success mr-2">$</span>
                      {line}
                    </span>
                  ) : (
                    <span>
                      <span className="text-success mr-2">$</span>
                      <TypedLine text={line} onDone={handleLineDone} reducedMotion={reducedMotion} />
                    </span>
                  )}
                </div>
              ))}
            </div>

            <AnimatePresence>
              {showName && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="mt-10 text-center"
                >
                  <h1 className="font-display text-4xl md:text-6xl font-semibold text-ink">
                    {identity.name}
                  </h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mt-3 font-mono text-sm md:text-base text-blue tracking-widest uppercase"
                  >
                    {identity.role}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
