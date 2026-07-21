import { motion } from 'framer-motion';

export default function SchemaViz({ schema }) {
  if (!schema?.tables?.length) return null;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {schema.tables.map((table, i) => (
        <motion.div
          key={table.name}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="rounded-md border border-white/10 overflow-hidden"
        >
          <div className="bg-elevated px-3 py-2 font-mono text-xs text-orange border-b border-white/10">
            {table.name}
          </div>
          <ul className="bg-surface">
            {table.columns.map((col) => (
              <li
                key={col}
                className="px-3 py-1.5 font-mono text-xs text-muted border-b border-white/5 last:border-b-0"
              >
                {col}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
