import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const PROFILE_IMAGE_PATH = '/profile2.jpeg'; // drop your photo into frontend/public/ with this exact name

// Same clean skull motif used by the cursor, reused as a fallback when no
// profile photo has been added yet.
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
    rotateY.set(px * 8);
    rotateX.set(-py * 8);
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
      style={{ width: 176, height: 176, perspective: 900 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={onMouseLeave}
        data-cursor="interactive"
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: 'preserve-3d',
          boxShadow: hover
            ? '0 10px 44px -10px rgba(79,140,255,0.4), 0 0 0 1px rgba(79,140,255,0.3)'
            : '0 10px 36px -14px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)',
        }}
        className="relative w-full h-full rounded-full overflow-hidden bg-surface transition-shadow duration-500"
      >
        {!imgError ? (
          <motion.img
            src={PROFILE_IMAGE_PATH}
            alt="Kishor Sanjay Gangarde"
            onError={() => setImgError(true)}
            initial={{ opacity: 0, filter: 'blur(8px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.6 }}
            className="w-full h-full object-cover"
            style={{
              filter: hover ? 'grayscale(0%) contrast(1.05)' : 'grayscale(45%) contrast(1.08) brightness(0.96)',
              transition: 'filter 0.5s ease',
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-elevated">
            <svg viewBox="0 0 100 100" width="56" height="56">
              <path d={CRANIUM_D} fill={hover ? '#4F8CFF' : '#3a3a3a'} style={{ transition: 'fill 0.3s' }} />
              <ellipse cx="35" cy="38" rx="9" ry="10" fill="#171717" />
              <ellipse cx="65" cy="38" rx="9" ry="10" fill="#171717" />
              <path d={NOSE} fill="#171717" />
            </svg>
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted">no signal</span>
          </div>
        )}

        <div
          className="absolute inset-0 pointer-events-none rounded-full transition-opacity duration-500"
          style={{
            background: 'linear-gradient(180deg, rgba(79,140,255,0.1), rgba(5,5,5,0.15))',
            opacity: hover ? 0.15 : 0.35,
          }}
        />
      </motion.div>

      {/* Thin gradient ring, sits just outside the circle */}
      <div
        className="absolute rounded-full pointer-events-none transition-opacity duration-500"
        style={{
          inset: -5,
          border: '1.5px solid transparent',
          backgroundImage: 'linear-gradient(#050505, #050505), linear-gradient(135deg, #4F8CFF, transparent 60%)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'content-box, border-box',
          opacity: hover ? 1 : 0.55,
        }}
      />

      {/* Availability status badge, LinkedIn-style */}
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
