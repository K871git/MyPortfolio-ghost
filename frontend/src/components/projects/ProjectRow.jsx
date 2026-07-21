import { motion } from 'framer-motion';

export default function ProjectRow({ project, onOpen }) {
  return (
    <motion.button
      data-cursor="interactive"
      onClick={() => onOpen(project.slug)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      whileHover="hover"
      className="group relative w-full text-left border-t border-white/10 last:border-b py-8 overflow-hidden"
    >
      {/* Blueprint overlay */}
      <motion.div
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(79,140,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(79,140,255,0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <motion.div
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        className="absolute inset-y-0 left-0 w-1 bg-blue"
      />

      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-2">
        <div>
          <span className="font-mono text-xs text-muted">
            {String(project.id).padStart(2, '0')}
          </span>
          <h3 className="font-display text-2xl md:text-3xl text-ink mt-1 group-hover:text-blue transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-muted mt-2 max-w-lg">{project.description}</p>
        </div>

        <div className="flex flex-wrap gap-2 md:max-w-xs md:justify-end">
          {project.tech_stack?.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[11px] uppercase tracking-wide px-2.5 py-1 rounded border border-white/10 text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <motion.div
        variants={{ hover: { x: 4, opacity: 1 } }}
        initial={{ opacity: 0.4 }}
        className="absolute right-2 bottom-6 font-mono text-xs text-blue hidden md:block"
      >
        open case study →
      </motion.div>
    </motion.button>
  );
}
