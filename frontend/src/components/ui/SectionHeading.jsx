import { motion } from 'framer-motion';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
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
        <motion.span variants={item} className="font-mono text-xs uppercase tracking-[0.3em] text-blue">
          {eyebrow}
        </motion.span>
      )}
      <motion.h2 variants={item} className="font-display text-4xl md:text-5xl font-semibold text-ink mt-3">
        {title}
      </motion.h2>
      {description && (
        <motion.p variants={item} className="text-muted text-lg mt-4">
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
