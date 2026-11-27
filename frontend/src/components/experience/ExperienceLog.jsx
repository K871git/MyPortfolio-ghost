import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

function formatDate(dateStr) {
  if (!dateStr) return 'Present';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function shortHash(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return hash.toString(16).slice(0, 7);
}

function CommitEntry({ exp, index }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="relative pl-10 pb-12 last:pb-0">
      {/* Timeline line */}
      <div className="absolute left-0 top-2 bottom-0 w-px bg-gradient-to-b from-blue/40 via-border/10 to-transparent" />

      {/* Timeline dot */}
      <motion.div
        animate={{
          boxShadow: open ? '0 0 14px 4px rgb(var(--c-blue) / 0.5)' : '0 0 0px 0px transparent',
        }}
        transition={{ duration: 0.4 }}
        className="absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full bg-blue ring-4 ring-bg"
      />

      {/* Clickable header */}
      <button
        type="button"
        data-cursor="interactive"
        onClick={() => setOpen((o) => !o)}
        className="text-left w-full group relative"
      >
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute right-0 top-1 font-mono text-sm text-muted group-hover:text-blue transition-colors"
          aria-hidden="true"
        >
          ▾
        </motion.span>

        {/* Commit meta */}
        <div className="flex flex-wrap items-center gap-3 pr-8">
          <span className="font-mono text-xs text-success bg-success/8 px-2 py-0.5 rounded">
            #{shortHash(exp.company_name + exp.role)}
          </span>
          <span className="font-mono text-xs text-muted">
            {formatDate(exp.start_date)} → {formatDate(exp.end_date)}
          </span>
        </div>

        <h3 className={`font-display text-2xl mt-2 transition-colors duration-250 ${open ? 'text-blue' : 'text-ink group-hover:text-blue'}`}>
          {exp.role}
        </h3>
        <p className="text-muted mt-1">
          {exp.company_name}
          {exp.location ? ` · ${exp.location}` : ''}
        </p>
      </button>

      {/* Expanded panel */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 26 }}
            className="overflow-hidden"
          >
            <div className="mt-5 rounded-xl border border-blue/10 bg-elevated/30 p-5 space-y-6"
              style={{ backdropFilter: 'blur(8px)' }}
            >
              {exp.description && (
                <p className="text-ink/85 leading-relaxed max-w-2xl text-sm">{exp.description}</p>
              )}

              {exp.responsibilities?.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-blue">
                      diff — responsibilities
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-blue/20 to-transparent" />
                  </div>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i} className="flex gap-3 text-sm text-muted">
                        <span className="text-success font-mono text-xs pt-0.5 select-none">+</span>
                        <span className="leading-relaxed">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(exp.challenges?.length > 0 || exp.solutions?.length > 0) && (
                <div className="grid md:grid-cols-2 gap-4">
                  {exp.challenges?.length > 0 && (
                    <div className="rounded-lg border border-orange/15 bg-orange/[0.04] p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange" />
                        <span className="font-mono text-[10px] uppercase tracking-widest text-orange">
                          Challenges
                        </span>
                      </div>
                      <ul className="space-y-1.5">
                        {exp.challenges.map((c, i) => (
                          <li key={i} className="text-sm text-muted leading-relaxed">— {c}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {exp.solutions?.length > 0 && (
                    <div className="rounded-lg border border-blue/15 bg-blue/[0.04] p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue" />
                        <span className="font-mono text-[10px] uppercase tracking-widest text-blue">
                          Solutions
                        </span>
                      </div>
                      <ul className="space-y-1.5">
                        {exp.solutions.map((s, i) => (
                          <li key={i} className="text-sm text-muted leading-relaxed">— {s}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {exp.impact_metrics?.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-success">
                      Impact
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-success/20 to-transparent" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exp.impact_metrics.map((m) => (
                      <span
                        key={m}
                        className="font-mono text-xs px-3 py-1.5 rounded-lg border border-success/25 text-success bg-success/5 flex items-center gap-1.5"
                      >
                        <span className="text-[8px]">✓</span> {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {exp.tech_stack?.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1 border-t border-border/8">
                  {exp.tech_stack.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[11px] uppercase px-2.5 py-1 rounded-md border border-border/10 bg-elevated text-muted hover:border-blue/30 hover:text-blue transition-colors duration-200"
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
    <section id="experience" className="section section-alt relative bg-dots">
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
