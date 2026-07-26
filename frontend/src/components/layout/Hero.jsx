import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const PROFILE_IMAGE_PATH = '/Profile.jpeg'; // drop your photo into frontend/public/ with this exact name

// Same clean skull motif used by the cursor, reused here as a fallback
// placeholder when no profile photo has been added yet.
const CRANIUM_D =
  'M50 4C70 4 85 20 85 40C85 52 80 61 72 68C75 73 72 79 67 77C66 83 60 82 58 88C55 82 52 86 50 86C48 86 45 82 42 88C40 82 34 83 33 77C28 79 25 73 28 68C20 61 15 52 15 40C15 20 30 4 50 4Z';
const NOSE = 'M50 46L44 58L56 58Z';

function ProfilePhoto() {
  const ref = useRef(null);
  const [imgError, setImgError] = useState(false);
  const [hover, setHover] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  function onMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 10);
    rotateX.set(-py * 10);
  }

  function onMouseLeave() {
    setHover(false);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative mx-auto mb-8"
      style={{ width: 128, height: 128, perspective: 800 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={onMouseLeave}
        data-cursor="interactive"
        style={{ rotateX: springX, rotateY: springY, transformStyle: 'preserve-3d' }}
        className="relative w-full h-full rounded-full overflow-hidden bg-surface border border-blue/30"
      >
        {!imgError ? (
          <img
            src={PROFILE_IMAGE_PATH}
            alt="Kishor Sanjay Gangarde"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-all duration-500"
            style={{
              filter: hover ? 'grayscale(0%) contrast(1.05)' : 'grayscale(85%) contrast(1.1) brightness(0.9)',
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-elevated">
            <svg viewBox="0 0 100 100" width="48" height="48">
              <path d={CRANIUM_D} fill={hover ? '#4F8CFF' : '#3a3a3a'} style={{ transition: 'fill 0.3s' }} />
              <ellipse cx="35" cy="38" rx="9" ry="10" fill="#171717" />
              <ellipse cx="65" cy="38" rx="9" ry="10" fill="#171717" />
              <path d={NOSE} fill="#171717" />
            </svg>
            <span className="font-mono text-[8px] uppercase tracking-widest text-muted">
              no signal
            </span>
          </div>
        )}
        <div
          className="absolute inset-0 pointer-events-none rounded-full transition-opacity duration-500"
          style={{
            background: 'linear-gradient(180deg, rgba(79,140,255,0.15), rgba(5,5,5,0.15))',
            opacity: hover ? 0.2 : 0.5,
          }}
        />
      </motion.div>

      {/* Slowly rotating scanner ring — sits just outside the circular frame */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: -8,
          border: '1px dashed',
          borderColor: hover ? 'rgba(79,140,255,0.7)' : 'rgba(79,140,255,0.3)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      />

      {/* Soft ambient glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none transition-all duration-500"
        style={{
          boxShadow: hover
            ? '0 0 28px 4px rgba(79,140,255,0.35)'
            : '0 0 14px 1px rgba(79,140,255,0.12)',
        }}
      />
    </motion.div>
  );
}

export default function Hero({ identity }) {
  return (
    <section id="top" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="container-os relative z-10 text-center">
        <ProfilePhoto />

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
