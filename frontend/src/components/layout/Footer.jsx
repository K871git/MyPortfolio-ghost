import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer({ identity, contact }) {
  return (
    <footer
      className="relative py-10"
      style={{ background: 'rgb(var(--c-elevated) / 0.4)' }}
    >
      {/* Gradient top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgb(var(--c-blue) / 0.25) 30%, rgb(var(--c-orange) / 0.2) 70%, transparent 100%)',
        }}
      />

      <div className="container-os flex flex-col sm:flex-row items-center justify-between gap-5 font-mono text-xs text-muted text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="text-blue opacity-60">❯_</span>
            {identity?.name ?? 'Kishor Sanjay Gangarde'}
          </span>
          <span className="hidden sm:inline text-border/15">·</span>
          <span className="text-border/40 uppercase tracking-widest text-[10px]">ghost/os v1.0.0</span>
        </div>

        <div className="flex items-center gap-5">
          {contact?.github && (
            <motion.a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-muted"
              whileHover={{ scale: 1.3, y: -3, color: '#e2e8f0' }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            >
              <Github size={14} />
            </motion.a>
          )}
          {contact?.linkedin && (
            <motion.a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-muted"
              whileHover={{ scale: 1.3, y: -3, color: '#4f8cff' }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            >
              <Linkedin size={14} />
            </motion.a>
          )}
          {contact?.email && (
            <motion.a
              href={`mailto:${contact.email}`}
              aria-label="Email"
              className="text-muted"
              whileHover={{ scale: 1.3, y: -3, color: '#ff8a00' }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            >
              <Mail size={14} />
            </motion.a>
          )}
        </div>

        <span className="text-border/25 tracking-wide">React · Laravel · PostgreSQL</span>
      </div>
    </footer>
  );
}
