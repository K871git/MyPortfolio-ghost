import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl"
    >
      {eyebrow && (
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-blue">{eyebrow}</span>
      )}
      <h2 className="font-display text-4xl md:text-5xl font-semibold text-ink mt-3">{title}</h2>
      {description && <p className="text-muted text-lg mt-4">{description}</p>}
    </motion.div>
  );
}
