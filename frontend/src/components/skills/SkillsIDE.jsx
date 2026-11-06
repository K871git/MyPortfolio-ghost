import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, FolderOpen } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import getSkillIcon from '../../utils/skillIcons';

export default function SkillsIDE({ skills }) {
  const categories = Object.entries(skills || {});
  const [activeCategory, setActiveCategory] = useState(categories[0]?.[0] ?? null);
  const activeItems = activeCategory ? (skills[activeCategory] || []) : [];

  return (
    <section id="toolbox" className="section relative">
      <div className="container-os">
        <SectionHeading
          eyebrow="Engineering Toolbox"
          title="What's actually in the stack"
          description="No bars, no percentages — just the tools, organized the way a project explorer would."
        />

        <div className="mt-16 grid md:grid-cols-[260px_1fr] gap-4 items-start">

          {/* LEFT: Category explorer */}
          <div className="rounded-lg overflow-hidden border border-white/10 bg-surface shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-elevated">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
              <span className="ml-3 font-mono text-xs text-muted">explorer — ghost-os</span>
            </div>
            <div className="p-2">
              {categories.map(([category, items]) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    data-cursor="interactive"
                    onClick={() => setActiveCategory(category)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-md transition-all duration-150 text-left border ${
                      isActive
                        ? 'bg-blue/10 border-blue/20'
                        : 'border-transparent hover:bg-white/[0.04]'
                    }`}
                  >
                    {isActive
                      ? <FolderOpen size={14} className="text-blue flex-shrink-0" />
                      : <Folder size={14} className="text-orange flex-shrink-0" />
                    }
                    <span className={`font-mono text-sm ${isActive ? 'text-blue' : 'text-ink'}`}>
                      {category}
                    </span>
                    <span className="font-mono text-xs text-muted ml-auto">{items.length}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Active category skill cards */}
          <div className="rounded-lg overflow-hidden border border-white/10 bg-surface shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] min-h-[260px]">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-elevated">
              <span className="font-mono text-xs text-muted">
                {activeCategory ? (
                  <>
                    <span className="text-blue">{activeCategory}</span>
                    <span className="text-white/20 mx-1.5">/</span>
                    <span>{activeItems.length} tools</span>
                  </>
                ) : 'select a category'}
              </span>
            </div>

            <AnimatePresence mode="wait">
              {activeCategory && (
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="p-5 grid grid-cols-2 sm:grid-cols-3 gap-3"
                >
                  {activeItems.map((item, i) => {
                    const Icon = getSkillIcon(item.name);
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.04, duration: 0.2 }}
                        className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-elevated hover:border-blue/25 hover:bg-blue/5 transition-all duration-200 group"
                      >
                        <Icon size={15} className="text-blue/60 group-hover:text-blue flex-shrink-0 transition-colors" />
                        <span className="font-mono text-sm text-muted group-hover:text-ink transition-colors leading-tight">
                          {item.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
