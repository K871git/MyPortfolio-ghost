import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, FolderGit2 } from 'lucide-react';
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

const ALL_TABS = [
  { id: 'problem', label: 'Problem', show: (p) => !!p.problem_statement },
  { id: 'architecture', label: 'Architecture', show: (p) => !!p.architecture_data },
  { id: 'schema', label: 'Schema', show: (p) => !!p.database_schema },
  { id: 'api-flow', label: 'API Flow', show: (p) => p.api_flow?.steps?.length > 0 },
  { id: 'outcomes', label: 'Outcomes', show: () => true },
];

function TabContent({ id, project }) {
  switch (id) {
    case 'problem':
      return (
        <p className="text-ink text-base sm:text-lg leading-relaxed max-w-3xl font-display">
          {project.problem_statement}
        </p>
      );
    case 'architecture':
      return (
        <div>
          {project.architecture_data.style && (
            <p className="text-muted text-sm mb-5">{project.architecture_data.style}</p>
          )}
          <div className="glass rounded-lg p-4">
            <ArchitectureDiagram data={project.architecture_data} />
          </div>
        </div>
      );
    case 'schema':
      return <SchemaViz schema={project.database_schema} />;
    case 'api-flow':
      return (
        <ol className="space-y-3">
          {project.api_flow.steps.map((step, i) => (
            <li key={i} className="flex gap-4 items-start font-mono text-sm">
              <span className="text-blue flex-shrink-0 w-6">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-muted">{step}</span>
            </li>
          ))}
        </ol>
      );
    case 'outcomes':
      return (
        <div className="grid sm:grid-cols-2 gap-8">
          <ListBlock title="Challenges" items={project.challenges} accent="text-orange" />
          <ListBlock title="Trade-Offs" items={project.trade_offs} accent="text-blue" />
          <ListBlock title="Lessons Learned" items={project.lessons_learned} accent="text-success" />
          <ListBlock title="Outcome Metrics" items={project.outcome_metrics} accent="text-orange" />
        </div>
      );
    default:
      return null;
  }
}

export default function CaseStudyOverlay({ project, onClose }) {
  const tabs = ALL_TABS.filter((t) => t.show(project));
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? null);

  useEffect(() => {
    setActiveTab(tabs[0]?.id ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.slug]);

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
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[88vh] rounded-xl border border-white/10 bg-bg overflow-hidden flex flex-col"
        style={{ boxShadow: '0 40px 100px -30px rgba(0,0,0,0.8)' }}
      >
        {/* Panel header */}
        <div className="flex items-center gap-3 px-4 sm:px-5 py-3 border-b border-white/10 bg-elevated flex-shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          <span className="ml-1 font-mono text-xs text-muted truncate flex-1 flex items-center gap-1.5">
            <FolderGit2 size={12} className="flex-shrink-0" /> {project.slug}.case-study
          </span>
          <button
            type="button"
            data-cursor="interactive"
            onClick={onClose}
            aria-label="Close case study"
            className="flex items-center justify-center w-9 h-9 rounded-full text-muted hover:text-ink hover:bg-white/10 active:scale-95 transition-all flex-shrink-0"
            style={{ touchAction: 'manipulation' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Compact overview — always visible, not part of the tab switch */}
        <div className="px-4 sm:px-6 pt-5 pb-4 border-b border-white/10 flex-shrink-0">
          <h2 className="font-display text-xl sm:text-2xl text-ink">{project.title}</h2>
          <p className="text-muted text-sm mt-1.5 max-w-2xl">{project.description}</p>

          <div className="flex flex-wrap items-center gap-1.5 mt-3">
            {project.tech_stack?.slice(0, 6).map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] uppercase tracking-wide px-2 py-0.5 rounded border border-white/10 text-muted"
              >
                {tech}
              </span>
            ))}
            <div className="flex gap-4 ml-auto font-mono text-xs">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="interactive"
                  className="flex items-center gap-1.5 text-blue hover:underline"
                >
                  <Github size={12} /> GitHub
                </a>
              )}
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="interactive"
                  className="flex items-center gap-1.5 text-blue hover:underline"
                >
                  <ExternalLink size={12} /> Live
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Tabs — clicking swaps content directly, no scrolling involved */}
        <div className="border-b border-white/10 bg-bg/80 flex-shrink-0">
          <div className="flex items-center gap-1 px-4 sm:px-6 py-2.5 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                data-cursor="interactive"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 font-mono text-[11px] uppercase tracking-wide px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-blue/15 text-blue' : 'text-muted hover:text-ink hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active tab content only — no long stacked sections, no big gaps */}
        <div className="overflow-y-auto flex-1" style={{ WebkitOverflowScrolling: 'touch' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="px-4 sm:px-6 py-6"
            >
              {activeTab && <TabContent id={activeTab} project={project} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
