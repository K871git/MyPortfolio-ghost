import { motion } from 'framer-motion';

export default function Hero({ identity }) {
  return (
    <section id="top" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="container-os relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-blue mb-6"
        >
          {identity.role} · {identity.experience_years}+ Years · {identity.location}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display text-5xl md:text-7xl font-semibold text-ink leading-[1.05]"
        >
          {identity.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 max-w-xl mx-auto text-muted text-lg"
        >
          {identity.tagline} Builds products from scratch, turns ideas into
          production systems — APIs, architecture, databases, system design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 flex items-center justify-center gap-4 font-mono text-xs uppercase tracking-widest"
        >
          <a
            href="#projects"
            data-cursor="interactive"
            className="px-5 py-3 rounded-md bg-blue/10 border border-blue/40 text-blue hover:bg-blue/20 transition-colors"
          >
            View Projects
          </a>
          <a
            href="#contact"
            data-cursor="interactive"
            className="px-5 py-3 rounded-md border border-white/10 text-muted hover:text-ink hover:border-white/30 transition-colors"
          >
            Connect
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-muted"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-muted to-transparent"
        />
      </motion.div>
    </section>
  );
}
