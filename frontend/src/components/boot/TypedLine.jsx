import { useEffect, useState } from 'react';

/**
 * Types out `text` character by character, calling onDone when finished.
 * Skips straight to the full string under prefers-reduced-motion.
 */
export default function TypedLine({ text, speed = 28, onDone, className = '', reducedMotion = false, startDelay = 0 }) {
  const [display, setDisplay] = useState(reducedMotion ? text : '');

  useEffect(() => {
    if (reducedMotion) {
      onDone && onDone();
      return;
    }

    let i = 0;
    let interval;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setDisplay(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          onDone && onDone();
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span className={className}>
      {display}
      <span className="inline-block w-2 h-4 bg-blue ml-0.5 align-middle animate-blink" />
    </span>
  );
}
