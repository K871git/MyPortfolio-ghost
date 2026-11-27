import { motion } from 'framer-motion';
import { FolderGit2, Sparkles, Code2, ArrowUpRight } from 'lucide-react';

const ACCENTS = [
  {
    text: 'text-blue',    border: 'border-blue/40',    bg: 'bg-blue/10',
    ring: 'rgba(79,140,255,0.12)',  glow: 'rgba(79,140,255,0.4)',
    gradFrom: 'rgb(79 140 255 / 0.07)',
  },
  {
    text: 'text-orange',  border: 'border-orange/40',  bg: 'bg-orange/10',
    ring: 'rgba(255,138,0,0.12)',   glow: 'rgba(255,138,0,0.4)',
    gradFrom: 'rgb(255 138 0 / 0.07)',
  },
  {
    text: 'text-success', border: 'border-success/40', bg: 'bg-success/10',
    ring: 'rgba(61,220,132,0.12)',  glow: 'rgba(61,220,132,0.4)',
    gradFrom: 'rgb(61 220 132 / 0.07)',
  },
];

export default function ProjectRow({ project, index = 0, onOpen }) {
  const accent    = ACCENTS[index % ACCENTS.length];
  const highlight = project.outcome_metrics?.[0];

  return (
    <motion.button
      type="button"
      data-cursor="interactive"
      onClick={() => onOpen(project.slug)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="group relative text-left rounded-xl overflow-hidden border border-border/10 bg-surface flex flex-col h-full"
      style={{
        boxShadow: '0 4px 24px -8px rgba(0,0,0,0.3)',
        transition: 'box-shadow 0.35s ease, border-color 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 8px 40px -8px ${accent.glow}, 0 0 0 1px ${accent.ring.replace('0.12', '0.4')}`;
        e.currentTarget.style.borderColor = accent.glow.replace('0.4', '0.3');
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 24px -8px rgba(0,0,0,0.3)';
        e.currentTarget.style.borderColor = '';
      }}
    >
      {/* Hover gradient wash */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${accent.gradFrom} 0%, transparent 55%)`,
        }}
      />

      {/* Blueprint grid on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${accent.ring} 1px, transparent 1px), linear-gradient(90deg, ${accent.ring} 1px, transparent 1px)`,
          backgroundSize: '22px 22px',
        }}
      />

      {/* Window title bar */}
      <div className="relative z-10 flex items-center gap-2 px-4 py-2.5 border-b border-border/8 bg-elevated/80">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        <span className="ml-2 font-mono text-[11px] text-muted truncate flex-1">{project.slug}.app</span>
        <span className={`font-mono text-[10px] ${accent.text} opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1`}>
          open <ArrowUpRight size={10} />
        </span>
      </div>

      <div className="relative z-10 p-5 flex flex-col flex-1">
        {/* Header: icon + number + title */}
        <div className="flex items-start gap-3 mb-4">
          <span className={`flex-shrink-0 w-9 h-9 rounded-lg ${accent.bg} border ${accent.border} flex items-center justify-center`}>
            <FolderGit2 size={15} className={accent.text} />
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <span className={`font-mono text-[10px] ${accent.text} opacity-60`}>
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className={`font-display text-lg sm:text-xl text-ink group-hover:${accent.text} transition-colors duration-300 leading-tight mt-0.5`}>
              {project.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted text-sm leading-relaxed flex-1 mb-4">{project.description}</p>

        {/* Outcome highlight */}
        {highlight && (
          <div className={`flex items-center gap-2 mb-4 px-3 py-2 rounded-lg ${accent.bg} border ${accent.border}`}>
            <Sparkles size={11} className={`${accent.text} flex-shrink-0`} />
            <span className="font-mono text-[10.5px] text-muted leading-snug">{highlight}</span>
          </div>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tech_stack?.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-md border border-border/10 text-muted bg-elevated/50"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-border/8">
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted">
            <Code2 size={11} /> {project.tech_stack?.length ?? 0} technologies
          </span>
          <span className={`flex items-center gap-1 font-mono text-[11px] ${accent.text} opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0`}>
            case study ↗
          </span>
        </div>
      </div>
    </motion.button>
  );
}
