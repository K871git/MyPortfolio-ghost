import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const PROFILE_IMAGE_PATH = '/profile1.jpeg';

const STATS = [
  { value: '2.5+', label: 'yrs exp'  },
  { value: '15+',  label: 'APIs'     },
  { value: '20+',  label: 'modules'  },
];

/* ── Animated social icon with ping ring ─────────────────────────── */
function SocialIcon({ href, label, Icon, hoverColor, pingColor, external = false }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      data-cursor="interactive"
      aria-label={label}
      className="relative flex flex-col items-center gap-1"
      whileHover={{ scale: 1.3, y: -7 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 480, damping: 18 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Expanding ping ring */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            key="ping"
            className="absolute rounded-full pointer-events-none"
            style={{ inset: -8, background: pingColor }}
            initial={{ scale: 0.4, opacity: 0.8 }}
            animate={{ scale: 3.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>

      {/* Icon with color transition */}
      <span style={{ color: hovered ? hoverColor : 'rgb(var(--c-muted))', transition: 'color 0.18s ease', display: 'flex' }}>
        <Icon size={20} />
      </span>

      {/* Label slides up */}
      <motion.span
        className="font-mono text-[9px] uppercase tracking-widest"
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 5 }}
        transition={{ duration: 0.16 }}
        style={{ color: hoverColor }}
      >
        {label}
      </motion.span>
    </motion.a>
  );
}

const TERMINAL_LINES = [
  { prompt: true,  text: 'git status'       },
  { prompt: false, text: '◉ Open for opportunities', color: 'text-success' },
  { prompt: true,  text: 'projects --list'  },
  { prompt: false, text: '3 production apps',color: 'text-blue'   },
  { prompt: true,  text: 'stack --primary'  },
  { prompt: false, text: 'Laravel · React · PG', color: 'text-orange' },
];

/* ── Animated profile photo ───────────────────────────────────────── */
function ProfilePhoto() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
      className="relative mx-auto mb-10"
      style={{ width: 192, height: 192 }}
    >
      {/* Outer slowly-rotating dashed ring with glowing dot */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        className="absolute pointer-events-none"
        style={{
          inset: -20,
          border: '1px dashed rgb(var(--c-blue) / 0.22)',
          borderRadius: '50%',
        }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
          style={{
            background: 'rgb(var(--c-blue))',
            boxShadow: '0 0 10px 3px rgb(var(--c-blue) / 0.55)',
          }}
        />
      </motion.div>

      {/* Inner pulsing ring */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ inset: -6, border: '1px solid rgb(var(--c-blue) / 0.22)', borderRadius: '50%' }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [0.98, 1.02, 0.98] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Photo */}
      <div
        className="w-full h-full rounded-full"
        style={{
          backgroundImage: `url('${PROFILE_IMAGE_PATH}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#3a3a3a',
          boxShadow:
            '0 12px 48px -12px rgba(0,0,0,0.65), 0 0 0 1px rgb(var(--c-blue) / 0.1)',
        }}
      />

      {/* Soft blue ambient glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: -14,
          boxShadow: '0 0 60px 12px rgb(var(--c-blue) / 0.1)',
          borderRadius: '50%',
        }}
      />

      {/* Online indicator */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.9, type: 'spring', stiffness: 300, damping: 18 }}
        className="absolute bottom-2 right-2 flex items-center justify-center w-9 h-9 rounded-full"
        style={{
          background: 'rgb(var(--c-bg))',
          border: '2.5px solid rgb(var(--c-bg))',
        }}
      >
        <span className="relative flex h-full w-full items-center justify-center rounded-full bg-elevated">
          <span className="animate-pulseDot absolute inline-flex h-3 w-3 rounded-full bg-success opacity-60" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ── Floating mini terminal (lg+ only) ───────────────────────────── */
function FloatingTerminal() {
  return (
    <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-6 xl:right-10 z-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8, duration: 0.7, ease: 'easeOut' }}
      >
      <div
        className="glass-panel rounded-xl p-4 w-[216px] font-mono text-[11px]"
        style={{
          boxShadow: '0 20px 60px -16px rgba(0,0,0,0.5)',
          animation: 'floatY 5s ease-in-out infinite',
        }}
      >
        <div className="flex items-center gap-1.5 mb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          <span className="ml-auto text-muted text-[10px]">ghost~</span>
        </div>

        {TERMINAL_LINES.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.1 + i * 0.28, duration: 0.3 }}
            className="mb-1.5"
          >
            {line.prompt ? (
              <div className="text-muted">
                <span className="text-blue mr-1.5">❯</span>
                {line.text}
              </div>
            ) : (
              <div className={`pl-4 ${line.color ?? 'text-muted'}`}>{line.text}</div>
            )}
          </motion.div>
        ))}

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5 }}
          className="inline-block text-blue animate-blink"
        >
          █
        </motion.span>
      </div>
      </motion.div>
    </div>
  );
}

/* ── Stats strip ─────────────────────────────────────────────────── */
function StatsRow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.5 }}
      className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-10 pt-8 pb-4 border-t border-border/10"
    >
      {STATS.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 + i * 0.1 }}
          className="flex flex-col items-center gap-1"
        >
          <span className="font-display text-2xl sm:text-3xl font-semibold text-ink">{s.value}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{s.label}</span>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="flex items-center gap-2 font-mono text-xs text-success px-3 py-1.5 rounded-full border border-success/25 bg-success/5"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-pulseDot absolute inline-flex h-full w-full rounded-full bg-success" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success" />
        </span>
        available
      </motion.div>
    </motion.div>
  );
}

/* ── Main Hero ───────────────────────────────────────────────────── */
export default function Hero({ identity, contact }) {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 pb-28"
    >
      {/* Background radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '80vw',
          height: '80vw',
          maxWidth: 1000,
          maxHeight: 1000,
          background: 'radial-gradient(ellipse at center, rgb(var(--c-blue) / 0.07) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgb(var(--c-border) / 0.07) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="container-os relative z-10 w-full text-center">
        {/* OS system badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0 }}
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted px-4 py-1.5 rounded-full border border-border/15 bg-surface/50 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue" />
          GHOST/OS v1.0.0
          <span className="w-1.5 h-1.5 rounded-full bg-orange" />
        </motion.div>

        <ProfilePhoto />

        {/* Badge pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="inline-flex flex-wrap justify-center gap-2 mb-6"
        >
          {[identity.role, '2.5+ Years', identity.location].map((item) => (
            <span
              key={item}
              className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-blue px-3 py-1 rounded-full border border-blue/20 bg-blue/5"
            >
              {item}
            </span>
          ))}
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="font-display text-4xl sm:text-5xl md:text-7xl font-semibold leading-[1.05]"
        >
          <span className="text-ink">{identity.name?.split(' ').slice(0, -1).join(' ')} </span>
          <span
            style={{
              background: 'linear-gradient(135deg, rgb(var(--c-blue)) 0%, rgb(var(--c-orange)) 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {identity.name?.split(' ').at(-1)}
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.38 }}
          className="mt-6 max-w-lg mx-auto text-muted text-base sm:text-lg px-2"
        >
          {identity.tagline} Builds products from scratch — APIs, architecture, databases, system design.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 px-4"
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
          <span className="h-px w-10 bg-border/10" />
          <div className="flex items-center gap-7">
            {contact?.github && (
              <SocialIcon
                href={contact.github}
                label="github"
                Icon={Github}
                hoverColor="#e2e8f0"
                pingColor="rgba(226,232,240,0.14)"
                external
              />
            )}
            {contact?.linkedin && (
              <SocialIcon
                href={contact.linkedin}
                label="linkedin"
                Icon={Linkedin}
                hoverColor="#4f8cff"
                pingColor="rgba(79,140,255,0.18)"
                external
              />
            )}
            {contact?.email && (
              <SocialIcon
                href={`mailto:${contact.email}`}
                label="email"
                Icon={Mail}
                hoverColor="#ff8a00"
                pingColor="rgba(255,138,0,0.18)"
              />
            )}
          </div>
          <span className="h-px w-10 bg-border/10" />
        </motion.div>

        {/* Stats */}
        <StatsRow />
      </div>

      {/* Floating terminal decoration */}
      <FloatingTerminal />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
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
