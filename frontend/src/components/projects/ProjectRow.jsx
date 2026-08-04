import { motion } from 'framer-motion';
import { FolderGit2, ArrowUpRight } from 'lucide-react';

export default function ProjectRow({ project, onOpen }) {
  return (
    <motion.button
      type="button"
      data-cursor="interactive"
      onClick={() => onOpen(project.slug)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group relative text-left rounded-lg overflow-hidden border border-white/10 bg-surface hover:border-blue/40 transition-colors duration-300 flex flex-col h-full"
      style={{ boxShadow: '0 20px 50px -24px rgba(0,0,0,0.7)' }}
    >
      {/* Window title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-elevated">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        <span className="ml-2 font-mono text-[11px] text-muted truncate">
          {project.slug}.app
        </span>
      </div>

      {/* Blueprint hover texture, contained to the card */}
      <motion.div
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(79,140,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(79,140,255,0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
        animate="hover"
        whileHover="hover"
      />

      <div className="relative z-10 p-5 flex flex-col flex-1">
        <div className="flex items-start gap-3 mb-3">
          <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-md bg-blue/10 border border-blue/25 flex items-center justify-center">
            <FolderGit2 size={15} className="text-blue" />
          </span>
          <div>
            <span className="font-mono text-[10px] text-muted">
              {String(project.id).padStart(2, '0')}
            </span>
            <h3 className="font-display text-xl text-ink group-hover:text-blue transition-colors duration-300 leading-tight">
              {project.title}
            </h3>
          </div>
        </div>

        <p className="text-muted text-sm leading-relaxed flex-1">{project.description}</p>

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

        <div className="flex items-center gap-1.5 mt-5 font-mono text-xs text-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          open case study <ArrowUpRight size={13} />
        </div>
      </div>
    </motion.button>
  );
}
