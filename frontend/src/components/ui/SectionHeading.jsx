import { motion } from 'framer-motion';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden:   { opacity: 0, y: 18 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="max-w-2xl"
    >
      {eyebrow && (
        <motion.div variants={item} className="flex items-center gap-3 mb-4">
          {/* Terminal prompt prefix */}
          <span className="font-mono text-xs text-blue select-none" aria-hidden="true">❯_</span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted">{eyebrow}</span>
          {/* Gradient separator line */}
          <span
            className="h-px flex-1 max-w-28"
            style={{
              background: 'linear-gradient(90deg, rgb(var(--c-blue) / 0.4) 0%, transparent 100%)',
            }}
          />
        </motion.div>
      )}

      {title && (
        <motion.h2
          variants={item}
          className="font-display text-4xl md:text-5xl font-semibold text-ink leading-[1.1]"
        >
          {title}
        </motion.h2>
      )}

      {description && (
        <motion.p variants={item} className="text-muted text-lg mt-5 leading-relaxed max-w-xl">
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
