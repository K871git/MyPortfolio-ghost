import { motion } from 'framer-motion';

// Rename whichever photo you want to use to exactly this filename and
// place it directly in frontend/public/. Delete the other profile* files
// so there's no ambiguity about which one is active.
const PROFILE_IMAGE_PATH = '/profile.png';

function ProfilePhoto() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative mx-auto mb-8"
      style={{ width: 176, height: 176 }}
    >
      {/*
        CSS background-image instead of <img>. This is a different browser
        rendering path entirely, and it cannot paint pure black — if the
        file fails to load, backgroundColor shows through as solid gray
        instead, so we get an unambiguous signal either way.
      */}
      <div
        className="relative w-full h-full rounded-full"
        style={{
          backgroundImage: `url('${PROFILE_IMAGE_PATH}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#3a3a3a',
        }}
      />

      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: -5,
          border: '1.5px solid transparent',
          backgroundOrigin: 'border-box',
          backgroundClip: 'content-box, border-box',
        }}
      />

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 300, damping: 18 }}
        className="absolute bottom-2 right-2 flex items-center justify-center w-7 h-7 rounded-full bg-bg border-2 border-bg"
      >
        <span className="relative flex h-full w-full items-center justify-center rounded-full bg-elevated">
          <span className="animate-pulseDot absolute inline-flex h-2.5 w-2.5 rounded-full bg-success opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function Hero({ identity }) {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 pb-16"
    >
      <div className="container-os relative z-10 text-center">
        <ProfilePhoto />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-blue mb-6 px-4 py-1.5 rounded-full border border-blue/20 bg-blue/5"
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
          className="mt-10 flex items-center justify-center gap-4"
        >
          <a href="#projects" data-cursor="interactive" className="btn btn-primary">
            View Projects
          </a>
          <a href="#contact" data-cursor="interactive" className="btn btn-secondary">
            Connect
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-6 flex flex-col items-center gap-2 text-muted"
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
