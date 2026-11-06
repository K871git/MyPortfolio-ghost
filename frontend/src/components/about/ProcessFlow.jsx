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

const DELIVERABLES = {
  problem: 'Problem statement + success criteria written down',
  research: 'Prior art notes + tool decision rationale',
  architecture: 'ERD · API contract · service boundary diagram',
  development: 'Working vertical slice + reviewable commits',
  testing: 'Failure-path test cases + auth boundary coverage',
  deployment: 'Deployed feature + rollback plan documented',
  optimization: 'EXPLAIN output reviewed + measured fix applied',
  iteration: 'Changelog entry + next hypothesis queued',
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

        <div className="mt-20 grid md:grid-cols-[260px_1fr] gap-12 md:gap-16">

          {/* Left: node list */}
          <div className="relative md:sticky md:top-32 md:self-start">
            <div className="relative pl-10">
              <div className="absolute left-[15px] top-2 bottom-2 w-px bg-white/10" />
              <motion.div
                style={{ height: lineHeight }}
                className="absolute left-[15px] top-2 w-px bg-gradient-to-b from-blue to-orange origin-top"
              />
              <ul className="space-y-6">
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
          <div className="flex flex-col min-h-[360px]">

            {/* Step progress dots */}
            <div className="flex items-center gap-2 mb-10">
              {steps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  data-cursor="interactive"
                  onClick={() => setActive(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === active ? 'w-8 bg-blue' : 'w-3 bg-white/15 hover:bg-white/30'
                  }`}
                  aria-label={`Step ${i + 1}`}
                />
              ))}
              <span className="ml-auto font-mono text-xs text-muted">
                {String(active + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
              </span>
            </div>

            {steps.map((step, i) =>
              active === i ? (
                <motion.div
                  key={step.step_name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex-1"
                >
                  <div className="flex items-start gap-6">
                    {/* Decorative large step number */}
                    <span className="font-mono font-bold leading-none select-none text-white/[0.04] text-[88px] mt-[-8px] flex-shrink-0 hidden sm:block">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <div className="flex-1">
                      <span className="font-mono text-xs text-orange uppercase tracking-widest">
                        Step {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-display text-3xl md:text-4xl mt-2 mb-4 text-ink">
                        {step.title}
                      </h3>
                      <p className="text-muted text-lg leading-relaxed max-w-lg">
                        {step.description}
                      </p>

                      {/* Deliverable */}
                      {DELIVERABLES[step.step_name] && (
                        <div className="mt-6 flex items-start gap-2.5 px-4 py-3 rounded-lg border border-blue/15 bg-blue/5">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-blue mt-0.5 flex-shrink-0">
                            → output
                          </span>
                          <span className="font-mono text-xs text-muted">
                            {DELIVERABLES[step.step_name]}
                          </span>
                        </div>
                      )}

                      {/* Nav arrows */}
                      <div className="flex items-center gap-3 mt-8">
                        <button
                          type="button"
                          data-cursor="interactive"
                          onClick={() => setActive((a) => Math.max(0, a - 1))}
                          disabled={active === 0}
                          className="font-mono text-xs text-muted hover:text-ink disabled:opacity-20 transition-colors px-3 py-1.5 rounded border border-white/10 hover:border-white/25"
                        >
                          ← prev
                        </button>
                        <button
                          type="button"
                          data-cursor="interactive"
                          onClick={() => setActive((a) => Math.min(steps.length - 1, a + 1))}
                          disabled={active === steps.length - 1}
                          className="font-mono text-xs text-muted hover:text-ink disabled:opacity-20 transition-colors px-3 py-1.5 rounded border border-white/10 hover:border-white/25"
                        >
                          next →
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : null
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
