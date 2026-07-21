import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

function Chevron({ open }) {
  return (
    <motion.span
      animate={{ rotate: open ? 90 : 0 }}
      transition={{ duration: 0.2 }}
      className="inline-block font-mono text-muted"
    >
      ›
    </motion.span>
  );
}

function Folder({ category, items, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        data-cursor="interactive"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-md transition-colors duration-150 text-left ${
          open ? 'bg-white/[0.06]' : 'hover:bg-white/[0.04]'
        }`}
      >
        <Chevron open={open} />
        <span className="text-orange">📁</span>
        <span className="font-mono text-sm text-ink">{category}</span>
        <span className="font-mono text-xs text-muted ml-auto">{items.length}</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden pl-9 border-l border-white/5 ml-4"
          >
            {items.map((item, i) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03, duration: 0.25 }}
                className="py-1.5 font-mono text-sm text-muted hover:text-ink transition-colors cursor-default"
              >
                <span className="text-blue/70 mr-2">·</span>
                {item.name}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SkillsIDE({ skills }) {
  const categories = Object.entries(skills || {});

  return (
    <section id="toolbox" className="section relative">
      <div className="container-os">
        <SectionHeading
          eyebrow="Engineering Toolbox"
          title="What's actually in the stack"
          description="No bars, no percentages — just the tools, organized the way a project explorer would."
        />

        <div className="mt-16 max-w-2xl rounded-lg overflow-hidden border border-white/10 bg-surface">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-elevated">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
            <span className="ml-3 font-mono text-xs text-muted">explorer — synapse-os</span>
          </div>

          <div className="p-3">
            {categories.map(([category, items], i) => (
              <Folder key={category} category={category} items={items} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
