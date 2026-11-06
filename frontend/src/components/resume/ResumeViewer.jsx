import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Download, ExternalLink } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const RESUME_PDF_PATH = '/Kishor_Gangarde_Resume1.pdf';

function TypedLine({ children, delay = 0, className = '' }) {
  return (
    <motion.p
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.p>
  );
}

function ResumePreview({ identity, inView }) {
  const lines = [
    { delay: 0.05, content: <><span className="text-orange">#</span> <span className="text-ink font-semibold">{identity.name}</span></> },
    { delay: 0.15, content: <><span className="text-muted/50">&gt;</span> <span className="text-blue">{identity.role}</span> <span className="text-muted/40">·</span> {identity.experience_years}+ years experience</> },
    { delay: 0.25, content: <><span className="text-muted/50">&gt;</span> {identity.location}</> },
    { delay: 0.38, content: <span className="text-white/10">{'─'.repeat(36)}</span> },
    { delay: 0.48, content: <><span className="text-orange">##</span> <span className="text-ink">Core Stack</span></> },
    { delay: 0.56, content: <span className="pl-3 text-muted">PHP · Laravel · React · PostgreSQL · MySQL · Docker</span> },
    { delay: 0.68, content: <><span className="text-orange">##</span> <span className="text-ink">Experience</span></> },
    { delay: 0.76, content: <span className="pl-3 text-muted">Biz Secure Labs (Net Protector) <span className="text-muted/40">·</span> Jun 2024 → Present</span> },
    { delay: 0.88, content: <><span className="text-orange">##</span> <span className="text-ink">Highlights</span></> },
    { delay: 0.96, content: <span className="pl-3 text-muted">20+ modules shipped · 15+ production APIs · 2 datastores integrated</span> },
  ];

  return (
    <div className="font-mono text-xs leading-relaxed space-y-1.5 mb-6">
      {inView && lines.map((line, i) => (
        <TypedLine key={i} delay={line.delay} className="text-muted">
          {line.content}
        </TypedLine>
      ))}
    </div>
  );
}

export default function ResumeViewer({ identity }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <section id="resume" className="section relative">
      <div className="container-os">
        <SectionHeading eyebrow="Documentation" title="Resume.md" />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 max-w-2xl rounded-lg border border-white/10 bg-surface overflow-hidden shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-elevated">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
            <span className="ml-2 font-mono text-xs text-muted">Resume.md</span>
            <span className="ml-auto font-mono text-[11px] px-2 py-0.5 rounded bg-blue/10 text-blue border border-blue/20">
              PDF
            </span>
          </div>

          <div className="p-6">
            <ResumePreview identity={identity} inView={inView} />

            {/* Cursor blink at the end */}
            {inView && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="inline-block font-mono text-xs text-blue animate-blink"
              >
                █
              </motion.span>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-6 pt-5 border-t border-white/5">
              <button
                type="button"
                data-cursor="interactive"
                onClick={() => setOpen(true)}
                className="btn btn-primary"
              >
                <ExternalLink size={13} />
                Open Viewer
              </button>
              <a
                href={RESUME_PDF_PATH}
                download
                data-cursor="interactive"
                className="btn btn-secondary"
              >
                <Download size={13} />
                Download PDF
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Full-screen PDF modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface rounded-lg w-full max-w-3xl h-[85vh] flex flex-col overflow-hidden border border-white/10"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-elevated">
                <span className="font-mono text-xs text-muted truncate pr-2">
                  Resume.md — Document Viewer
                </span>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <a
                    href={RESUME_PDF_PATH}
                    download
                    data-cursor="interactive"
                    className="font-mono text-xs text-blue hover:underline whitespace-nowrap"
                  >
                    Download ↓
                  </a>
                  <button
                    type="button"
                    data-cursor="interactive"
                    onClick={(e) => { e.stopPropagation(); setOpen(false); }}
                    aria-label="Close resume viewer"
                    className="flex items-center justify-center w-9 h-9 rounded-full text-muted hover:text-ink hover:bg-white/5 active:scale-95 transition-all"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <button
                type="button"
                data-cursor="interactive"
                onClick={(e) => { e.stopPropagation(); setOpen(false); }}
                aria-label="Close resume viewer"
                className="fixed top-4 right-4 z-20 flex items-center justify-center w-11 h-11 rounded-full bg-elevated border border-white/15 text-muted hover:text-ink hover:border-blue/40 active:scale-95 transition-all md:hidden"
              >
                ✕
              </button>

              <iframe
                title="Resume"
                src={RESUME_PDF_PATH}
                className="flex-1 w-full bg-white"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
