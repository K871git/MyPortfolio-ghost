import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Github,
  ExternalLink,
  FolderGit2,
  AlertTriangle,
  Network,
  Database,
  Workflow,
  Award,
  GitCompare,
  Lightbulb,
  TrendingUp,
  ShieldAlert,
  Image as ImageIcon,
  ArrowRight,
} from 'lucide-react';
import ArchitectureDiagram from './ArchitectureDiagram';
import SchemaViz from './SchemaViz';

function ListBlock({ title, items, Icon, colorClass, bgClass, borderClass }) {
  if (!items?.length) return null;
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className={`flex items-center justify-center w-6 h-6 rounded ${bgClass} border ${borderClass}`}>
          <Icon size={12} className={colorClass} />
        </span>
        <h4 className={`font-mono text-xs uppercase tracking-widest ${colorClass}`}>{title}</h4>
      </div>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-muted text-sm leading-relaxed">
            <span className={`mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full ${bgClass.replace('/10', '')}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionLabel({ Icon, colorClass, bgClass, borderClass, children }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <span className={`flex items-center justify-center w-7 h-7 rounded ${bgClass} border ${borderClass}`}>
        <Icon size={14} className={colorClass} />
      </span>
      <h3 className="font-mono text-xs uppercase tracking-widest text-muted">{children}</h3>
    </div>
  );
}

const TABS = [
  { id: 'problem', label: 'Problem', Icon: ShieldAlert, color: 'text-orange', bg: 'bg-orange/10', border: 'border-orange/30', show: (p) => !!p.problem_statement },
  { id: 'architecture', label: 'Architecture', Icon: Network, color: 'text-blue', bg: 'bg-blue/10', border: 'border-blue/30', show: (p) => !!p.architecture_data },
  { id: 'schema', label: 'Schema', Icon: Database, color: 'text-success', bg: 'bg-success/10', border: 'border-success/30', show: (p) => !!p.database_schema },
  { id: 'api-flow', label: 'API Flow', Icon: Workflow, color: 'text-blue', bg: 'bg-blue/10', border: 'border-blue/30', show: (p) => p.api_flow?.steps?.length > 0 },
  { id: 'outcomes', label: 'Outcomes', Icon: Award, color: 'text-orange', bg: 'bg-orange/10', border: 'border-orange/30', show: () => true },
  { id: 'gallery', label: 'Screenshots', Icon: ImageIcon, color: 'text-success', bg: 'bg-success/10', border: 'border-success/30', show: (p) => p.screenshots?.length > 0 },
];

function TabContent({ tab, project }) {
  switch (tab.id) {
    case 'problem':
      return (
        <div>
          <SectionLabel Icon={AlertTriangle} colorClass={tab.color} bgClass={tab.bg} borderClass={tab.border}>
            The situation
          </SectionLabel>
          <p className="text-ink text-base sm:text-lg leading-relaxed max-w-3xl font-display">
            {project.problem_statement}
          </p>
        </div>
      );

    case 'architecture':
      return (
        <div>
          <SectionLabel Icon={Network} colorClass={tab.color} bgClass={tab.bg} borderClass={tab.border}>
            System design
          </SectionLabel>
          {project.architecture_data.style && (
            <p className="text-muted text-sm mb-5 -mt-3 ml-9">{project.architecture_data.style}</p>
          )}
          <div className="glass rounded-lg p-4 mb-6">
            <ArchitectureDiagram data={project.architecture_data} />
          </div>

          {/* Full component list, not just what's legible in the diagram */}
          {project.architecture_data.nodes?.length > 0 && (
            <div className="mb-6">
              <h4 className="font-mono text-[11px] uppercase tracking-widest text-muted mb-2.5">Components</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.architecture_data.nodes.map((node) => (
                  <span
                    key={node}
                    className="font-mono text-[11px] px-2.5 py-1 rounded border border-white/10 bg-white/[0.02] text-ink"
                  >
                    {node}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* The full data-flow description, written out, not just implied by the diagram lines */}
          {project.architecture_data.flow?.length > 0 && (
            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-widest text-muted mb-2.5">Data Flow</h4>
              <ul className="space-y-2">
                {project.architecture_data.flow.map((step, i) => (
                  <li key={i} className="flex items-center gap-2 font-mono text-xs text-muted">
                    <ArrowRight size={11} className="text-blue flex-shrink-0" />
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );

    case 'schema':
      return (
        <div>
          <SectionLabel Icon={Database} colorClass={tab.color} bgClass={tab.bg} borderClass={tab.border}>
            Data model
          </SectionLabel>
          <SchemaViz schema={project.database_schema} />
        </div>
      );

    case 'api-flow':
      return (
        <div>
          <SectionLabel Icon={Workflow} colorClass={tab.color} bgClass={tab.bg} borderClass={tab.border}>
            Request lifecycle
          </SectionLabel>
          <ol className="space-y-3">
            {project.api_flow.steps.map((step, i) => (
              <li
                key={i}
                className="flex gap-4 items-start font-mono text-sm p-3 rounded-lg border border-white/5 bg-white/[0.02]"
              >
                <span className="text-blue flex-shrink-0 w-6 font-semibold">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-muted">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      );

    case 'outcomes':
      return (
        <div>
          <SectionLabel Icon={Award} colorClass={tab.color} bgClass={tab.bg} borderClass={tab.border}>
            Results & retrospective
          </SectionLabel>
          <div className="grid sm:grid-cols-2 gap-8">
            <ListBlock title="Challenges" items={project.challenges} Icon={AlertTriangle} colorClass="text-orange" bgClass="bg-orange/10" borderClass="border-orange/30" />
            <ListBlock title="Trade-Offs" items={project.trade_offs} Icon={GitCompare} colorClass="text-blue" bgClass="bg-blue/10" borderClass="border-blue/30" />
            <ListBlock title="Lessons Learned" items={project.lessons_learned} Icon={Lightbulb} colorClass="text-success" bgClass="bg-success/10" borderClass="border-success/30" />
            <ListBlock title="Outcome Metrics" items={project.outcome_metrics} Icon={TrendingUp} colorClass="text-orange" bgClass="bg-orange/10" borderClass="border-orange/30" />
          </div>
        </div>
      );

    case 'gallery':
      return (
        <div>
          <SectionLabel Icon={ImageIcon} colorClass={tab.color} bgClass={tab.bg} borderClass={tab.border}>
            Screenshots
          </SectionLabel>
          <div className="grid sm:grid-cols-2 gap-4">
            {project.screenshots.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${project.title} screenshot ${i + 1}`}
                loading="lazy"
                className="w-full rounded-lg border border-white/10"
              />
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default function CaseStudyOverlay({ project, onClose }) {
  const tabs = TABS.filter((t) => t.show(project));
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id ?? null);
  const activeTab = tabs.find((t) => t.id === activeTabId) ?? tabs[0];

  useEffect(() => {
    setActiveTabId(tabs[0]?.id ?? null);
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

        {/* Compact overview — full tech stack now, nothing truncated */}
        <div className="px-4 sm:px-6 pt-5 pb-4 border-b border-white/10 flex-shrink-0">
          <h2 className="font-display text-xl sm:text-2xl text-ink">{project.title}</h2>
          <p className="text-muted text-sm mt-1.5 max-w-2xl">{project.description}</p>

          <div className="flex flex-wrap items-center gap-1.5 mt-3">
            {project.tech_stack?.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] uppercase tracking-wide px-2 py-0.5 rounded border border-white/10 text-muted"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-4 mt-3 font-mono text-xs">
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noreferrer" data-cursor="interactive" className="flex items-center gap-1.5 text-blue hover:underline">
                <Github size={12} /> GitHub
              </a>
            )}
            {project.live_url && (
              <a href={project.live_url} target="_blank" rel="noreferrer" data-cursor="interactive" className="flex items-center gap-1.5 text-blue hover:underline">
                <ExternalLink size={12} /> Live
              </a>
            )}
          </div>
        </div>

        {/* Icon + color coded tabs */}
        <div className="border-b border-white/10 bg-bg/80 flex-shrink-0">
          <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2.5 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const isActive = activeTab?.id === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  data-cursor="interactive"
                  onClick={() => setActiveTabId(tab.id)}
                  className={`flex-shrink-0 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide px-3 py-1.5 rounded-full transition-colors whitespace-nowrap border ${
                    isActive ? `${tab.bg} ${tab.color} ${tab.border}` : 'text-muted border-transparent hover:text-ink hover:bg-white/5'
                  }`}
                >
                  <tab.Icon size={12} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active tab content */}
        <div className="overflow-y-auto flex-1" style={{ WebkitOverflowScrolling: 'touch' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab?.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="px-4 sm:px-6 py-6"
            >
              {activeTab && <TabContent tab={activeTab} project={project} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
