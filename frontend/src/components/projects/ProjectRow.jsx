import { motion } from 'framer-motion';
import { FolderGit2, Sparkles, Code2 } from 'lucide-react';

const ACCENTS = [
  {
    text: 'text-blue', border: 'border-blue/40', bg: 'bg-blue/10',
    ring: 'rgba(79,140,255,0.15)', glow: 'rgba(79,140,255,0.35)',
  },
  {
    text: 'text-orange', border: 'border-orange/40', bg: 'bg-orange/10',
    ring: 'rgba(255,138,0,0.15)', glow: 'rgba(255,138,0,0.35)',
  },
  {
    text: 'text-success', border: 'border-success/40', bg: 'bg-success/10',
    ring: 'rgba(61,220,132,0.15)', glow: 'rgba(61,220,132,0.35)',
  },
];

export default function ProjectRow({ project, index = 0, onOpen }) {
  const accent = ACCENTS[index % ACCENTS.length];
  const highlight = project.outcome_metrics?.[0];

  return (
    <motion.button
      type="button"
      data-cursor="interactive"
      onClick={() => onOpen(project.slug)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -6,
        boxShadow: `0 0 40px -8px ${accent.glow}, 0 20px 50px -24px rgba(0,0,0,0.7)`,
      }}
      whileTap={{ scale: 0.98 }}
      className={`group relative text-left rounded-lg overflow-hidden border border-white/10 bg-surface hover:${accent.border} transition-colors duration-300 flex flex-col h-full`}
      style={{ boxShadow: '0 20px 50px -24px rgba(0,0,0,0.7)' }}
    >
      {/* Window title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-elevated">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        <span className="ml-2 font-mono text-[11px] text-muted truncate">{project.slug}.app</span>
      </div>

      {/* Blueprint grid texture on hover */}
      <motion.div
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(${accent.ring} 1px, transparent 1px), linear-gradient(90deg, ${accent.ring} 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
        animate="hover"
        whileHover="hover"
      />

      <div className="relative z-10 p-5 flex flex-col flex-1">
        <div className="flex items-start gap-3 mb-3">
          <span className={`mt-0.5 flex-shrink-0 w-8 h-8 rounded-md ${accent.bg} border ${accent.border} flex items-center justify-center`}>
            <FolderGit2 size={15} className={accent.text} />
          </span>
          <div>
            <span className="font-mono text-[10px] text-muted">{String(index + 1).padStart(2, '0')}</span>
            <h3 className={`font-display text-xl text-ink group-hover:${accent.text} transition-colors duration-300 leading-tight`}>
              {project.title}
            </h3>
          </div>
        </div>

        <p className="text-muted text-sm leading-relaxed flex-1">{project.description}</p>

        {highlight && (
          <div className={`flex items-center gap-1.5 mt-3 px-2.5 py-1.5 rounded-md ${accent.bg} border ${accent.border}`}>
            <Sparkles size={11} className={`${accent.text} flex-shrink-0`} />
            <span className="font-mono text-[10.5px] text-muted leading-snug">{highlight}</span>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.tech_stack?.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[10px] uppercase tracking-wide px-2 py-1 rounded border border-white/10 text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5">
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted">
            <Code2 size={11} /> {project.tech_stack?.length ?? 0} technologies
          </span>
          <span className={`flex items-center gap-1.5 font-mono text-xs ${accent.text} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
            open case study ↗
          </span>
        </div>
      </div>
    </motion.button>
  );
}
