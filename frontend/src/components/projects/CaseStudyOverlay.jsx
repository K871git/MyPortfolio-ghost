import { useEffect } from 'react';
import { motion } from 'framer-motion';
import ArchitectureDiagram from './ArchitectureDiagram';
import SchemaViz from './SchemaViz';

function ListBlock({ title, items, accent = 'text-blue' }) {
  if (!items?.length) return null;
  return (
    <div>
      <h4 className={`font-mono text-xs uppercase tracking-widest ${accent} mb-3`}>{title}</h4>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-muted text-sm leading-relaxed">
            <span className="text-white/20 select-none">—</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CaseStudyOverlay({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-bg overflow-y-auto"
    >
      <div className="sticky top-0 z-10 bg-bg/90 backdrop-blur border-b border-white/10">
        <div className="container-os flex items-center justify-between py-4">
          <span className="font-mono text-xs text-muted uppercase tracking-widest">
            Case Study
          </span>
          <button
            data-cursor="interactive"
            onClick={onClose}
            className="font-mono text-xs text-muted hover:text-ink border border-white/10 rounded px-3 py-1.5 transition-colors"
          >
            ESC / Close ✕
          </button>
        </div>
      </div>

      <div className="container-os py-16 space-y-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="font-display text-4xl md:text-6xl text-ink">{project.title}</h2>
          <p className="text-muted text-lg mt-4 max-w-2xl">{project.description}</p>

          <div className="flex flex-wrap gap-2 mt-6">
            {project.tech_stack?.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[11px] uppercase tracking-wide px-2.5 py-1 rounded border border-white/10 text-muted"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-4 mt-6 font-mono text-xs">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                data-cursor="interactive"
                className="text-blue hover:underline"
              >
                GitHub ↗
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                data-cursor="interactive"
                className="text-blue hover:underline"
              >
                Live ↗
              </a>
            )}
          </div>
        </motion.div>

        {/* Problem statement */}
        {project.problem_statement && (
          <section>
            <h3 className="font-mono text-xs uppercase tracking-widest text-orange mb-4">
              Problem Statement
            </h3>
            <p className="text-ink text-xl leading-relaxed max-w-3xl font-display">
              {project.problem_statement}
            </p>
          </section>
        )}

        {/* Architecture */}
        {project.architecture_data && (
          <section>
            <h3 className="font-mono text-xs uppercase tracking-widest text-orange mb-2">
              Architecture
            </h3>
            {project.architecture_data.style && (
              <p className="text-muted text-sm mb-6">{project.architecture_data.style}</p>
            )}
            <div className="glass rounded-lg p-6">
              <ArchitectureDiagram data={project.architecture_data} />
            </div>
          </section>
        )}

        {/* Database schema */}
        {project.database_schema && (
          <section>
            <h3 className="font-mono text-xs uppercase tracking-widest text-orange mb-6">
              Database Schema
            </h3>
            <SchemaViz schema={project.database_schema} />
          </section>
        )}

        {/* API flow */}
        {project.api_flow?.steps?.length > 0 && (
          <section>
            <h3 className="font-mono text-xs uppercase tracking-widest text-orange mb-6">
              API Flow
            </h3>
            <ol className="space-y-3">
              {project.api_flow.steps.map((step, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  className="flex gap-4 items-start font-mono text-sm"
                >
                  <span className="text-blue flex-shrink-0 w-6">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-muted">{step}</span>
                </motion.li>
              ))}
            </ol>
          </section>
        )}

        {/* Challenges / trade-offs / lessons / outcomes */}
        <section className="grid md:grid-cols-2 gap-12">
          <ListBlock title="Challenges" items={project.challenges} accent="text-orange" />
          <ListBlock title="Trade-Offs" items={project.trade_offs} accent="text-blue" />
          <ListBlock title="Lessons Learned" items={project.lessons_learned} accent="text-success" />
          <ListBlock title="Outcome Metrics" items={project.outcome_metrics} accent="text-orange" />
        </section>
      </div>
    </motion.div>
  );
}
