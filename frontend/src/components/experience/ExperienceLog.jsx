import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

function formatDate(dateStr) {
  if (!dateStr) return 'Present';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function shortHash(seed) {
  // Deterministic fake short-hash for the "commit" aesthetic.
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return hash.toString(16).slice(0, 7);
}

function CommitEntry({ exp, index }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="relative pl-10 border-l border-white/10 pb-10 last:pb-0">
      <span className="absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full bg-blue ring-4 ring-bg" />

      <button
        data-cursor="interactive"
        onClick={() => setOpen((o) => !o)}
        className="text-left w-full group"
      >
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="font-mono text-xs text-success">
            #{shortHash(exp.company_name + exp.role)}
          </span>
          <span className="font-mono text-xs text-muted">
            {formatDate(exp.start_date)} → {formatDate(exp.end_date)}
          </span>
        </div>
        <h3 className="font-display text-2xl text-ink mt-2 group-hover:text-blue transition-colors">
          {exp.role}
        </h3>
        <p className="text-muted mt-1">
          {exp.company_name}
          {exp.location ? ` · ${exp.location}` : ''}
        </p>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 26 }}
            className="overflow-hidden"
          >
            <div className="mt-6 space-y-8">
              {exp.description && <p className="text-ink/90 leading-relaxed max-w-2xl">{exp.description}</p>}

              {exp.responsibilities?.length > 0 && (
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-blue mb-3">
                    diff — responsibilities
                  </h4>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i} className="flex gap-3 text-sm text-muted">
                        <span className="text-success font-mono">+</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(exp.challenges?.length > 0 || exp.solutions?.length > 0) && (
                <div className="grid md:grid-cols-2 gap-8">
                  {exp.challenges?.length > 0 && (
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-widest text-orange mb-3">
                        Challenges
                      </h4>
                      <ul className="space-y-2">
                        {exp.challenges.map((c, i) => (
                          <li key={i} className="text-sm text-muted">— {c}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {exp.solutions?.length > 0 && (
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-widest text-blue mb-3">
                        Solutions
                      </h4>
                      <ul className="space-y-2">
                        {exp.solutions.map((s, i) => (
                          <li key={i} className="text-sm text-muted">— {s}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {exp.impact_metrics?.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {exp.impact_metrics.map((m) => (
                    <span
                      key={m}
                      className="font-mono text-xs px-3 py-1.5 rounded border border-success/30 text-success bg-success/5"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              )}

              {exp.tech_stack?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {exp.tech_stack.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[11px] uppercase px-2.5 py-1 rounded border border-white/10 text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ExperienceLog({ experiences }) {
  return (
    <section id="experience" className="section relative">
      <div className="container-os">
        <SectionHeading
          eyebrow="Commit History"
          title="Experience, as a log"
          description="Click a commit to expand the diff — responsibilities, challenges, solutions, and impact."
        />

        <div className="mt-16 max-w-3xl">
          {experiences.map((exp, i) => (
            <CommitEntry key={exp.company_name + exp.role} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
