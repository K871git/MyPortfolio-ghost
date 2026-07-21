import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

const ICONS = {
  target: '◎',
  search: '⌕',
  layers: '▤',
  code: '</>',
  'check-circle': '✓',
  'upload-cloud': '⇧',
  zap: '⚡',
  'refresh-cw': '↻',
};

export default function ProcessFlow({ steps }) {
  const containerRef = useRef(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="about" ref={containerRef} className="section relative">
      <div className="container-os">
        <SectionHeading
          eyebrow="How I Think"
          title="Process, not personality"
          description="This is the loop every piece of work goes through — not a highlight reel, the actual sequence."
        />

        <div className="mt-20 grid md:grid-cols-[280px_1fr] gap-12 md:gap-20">
          {/* Left: node diagram */}
          <div className="relative md:sticky md:top-32 md:self-start">
            <div className="relative pl-10">
              <div className="absolute left-[15px] top-2 bottom-2 w-px bg-white/10" />
              <motion.div
                style={{ height: lineHeight }}
                className="absolute left-[15px] top-2 w-px bg-gradient-to-b from-blue to-orange origin-top"
              />
              <ul className="space-y-8">
                {steps.map((step, i) => (
                  <li key={step.step_name} className="relative">
                    <button
                      data-cursor="interactive"
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      className="flex items-center gap-4 text-left group"
                    >
                      <span
                        className={`absolute -left-10 flex items-center justify-center w-8 h-8 rounded-full border font-mono text-xs transition-all duration-300 ${
                          active === i
                            ? 'bg-blue border-blue text-bg scale-110'
                            : 'bg-surface border-white/15 text-muted'
                        }`}
                      >
                        {ICONS[step.icon] ?? i + 1}
                      </span>
                      <span
                        className={`font-mono text-sm uppercase tracking-wider transition-colors duration-300 ${
                          active === i ? 'text-ink' : 'text-muted group-hover:text-ink'
                        }`}
                      >
                        {step.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: description panel */}
          <div className="min-h-[280px]">
            {steps.map((step, i) =>
              active === i ? (
                <motion.div
                  key={step.step_name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="font-mono text-xs text-orange uppercase tracking-widest">
                    Step {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-3xl md:text-4xl mt-2 mb-4 text-ink">
                    {step.title}
                  </h3>
                  <p className="text-muted text-lg leading-relaxed max-w-xl">
                    {step.description}
                  </p>
                </motion.div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
