import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const PROFILE_IMAGE_PATH = '/profile1.jpeg';

function ProfilePhoto() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative mx-auto mb-8"
      style={{ width: 176, height: 176 }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          backgroundImage: `url('${PROFILE_IMAGE_PATH}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#3a3a3a',
          boxShadow: '0 10px 40px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)',
        }}
      />

      {/* Subtle blue glow ring */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: -3,
          borderRadius: '50%',
          boxShadow: '0 0 32px 4px rgba(79,140,255,0.18)',
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

export default function Hero({ identity, contact }) {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 pb-16"
    >
      <div className="container-os relative z-10 text-center">
        <ProfilePhoto />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex flex-wrap justify-center gap-1.5 mb-6"
        >
          {[identity.role, `${identity.experience_years}+ Years`, identity.location].map((item) => (
            <span
              key={item}
              className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-blue px-3 py-1 rounded-full border border-blue/20 bg-blue/5"
            >
              {item}
            </span>
          ))}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display text-4xl sm:text-5xl md:text-7xl font-semibold text-ink leading-[1.05]"
        >
          {identity.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 max-w-lg mx-auto text-muted text-base sm:text-lg px-2"
        >
          {identity.tagline} Builds products from scratch, turns ideas into
          production systems — APIs, architecture, databases, system design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4"
        >
          <a href="#projects" data-cursor="interactive" className="btn btn-primary w-full sm:w-auto">
            View Projects
          </a>
          <a href="#contact" data-cursor="interactive" className="btn btn-secondary w-full sm:w-auto">
            Connect
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-8 flex items-center justify-center gap-5"
        >
          <span className="h-px w-10 bg-white/10" />
          <div className="flex items-center gap-5">
            {contact?.github && (
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                data-cursor="interactive"
                aria-label="GitHub"
                className="text-muted hover:text-ink transition-colors duration-200"
              >
                <Github size={18} />
              </a>
            )}
            {contact?.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                data-cursor="interactive"
                aria-label="LinkedIn"
                className="text-muted hover:text-ink transition-colors duration-200"
              >
                <Linkedin size={18} />
              </a>
            )}
            {contact?.email && (
              <a
                href={`mailto:${contact.email}`}
                data-cursor="interactive"
                aria-label="Email"
                className="text-muted hover:text-ink transition-colors duration-200"
              >
                <Mail size={18} />
              </a>
            )}
          </div>
          <span className="h-px w-10 bg-white/10" />
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
