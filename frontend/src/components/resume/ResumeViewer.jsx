import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

const RESUME_PDF_PATH = '/resume.pdf'; // drop the actual PDF into frontend/public/resume.pdf

export default function ResumeViewer({ identity }) {
  const [open, setOpen] = useState(false);

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

        <motion.button
          data-cursor="interactive"
          onClick={() => setOpen(true)}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 w-full max-w-md text-left rounded-lg border border-white/10 bg-surface hover:border-blue/40 transition-colors overflow-hidden group"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-elevated">
            <span className="text-muted">📄</span>
            <span className="font-mono text-sm text-ink">Resume.md</span>
            <span className="ml-auto font-mono text-[11px] text-muted">PDF</span>
          </div>
          <div className="p-5">
            <p className="font-mono text-xs text-muted leading-relaxed">
              # {identity.name}
              <br />
              &gt; {identity.role} · {identity.experience_years}+ years
              <br />
              &gt; {identity.location}
            </p>
            <span className="inline-block mt-4 font-mono text-xs text-blue group-hover:underline">
              Open document viewer →
            </span>
          </div>
        </motion.button>
      </div>

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
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-elevated">
                <span className="font-mono text-xs text-muted">Resume.md — Document Viewer</span>
                <div className="flex items-center gap-3">
                  <a
                    href={RESUME_PDF_PATH}
                    download
                    data-cursor="interactive"
                    className="font-mono text-xs text-blue hover:underline"
                  >
                    Download PDF ↓
                  </a>
                  <button
                    data-cursor="interactive"
                    onClick={() => setOpen(false)}
                    className="font-mono text-xs text-muted hover:text-ink"
                  >
                    ✕
                  </button>
                </div>
              </div>
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
