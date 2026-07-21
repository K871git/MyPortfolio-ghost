import { motion } from 'framer-motion';

export default function ArchitectureDiagram({ data }) {
  if (!data?.nodes?.length) return null;
  const nodes = data.nodes;
  const cols = Math.min(3, nodes.length);
  const rows = Math.ceil(nodes.length / cols);
  const cellW = 220;
  const cellH = 90;
  const width = cols * cellW;
  const height = rows * cellH;

  const positions = nodes.map((_, i) => ({
    x: (i % cols) * cellW + cellW / 2,
    y: Math.floor(i / cols) * cellH + cellH / 2,
  }));

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        style={{ minWidth: 480 }}
        className="font-mono"
      >
        {/* connecting lines drawn first, animated as if wires being laid */}
        {positions.slice(1).map((pos, i) => (
          <motion.line
            key={`line-${i}`}
            x1={positions[i].x}
            y1={positions[i].y}
            x2={pos.x}
            y2={pos.y}
            stroke="#4F8CFF"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
          />
        ))}

        {nodes.map((node, i) => (
          <motion.g
            key={node}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
          >
            <rect
              x={positions[i].x - 90}
              y={positions[i].y - 26}
              width="180"
              height="52"
              rx="8"
              fill="#111111"
              stroke="#4F8CFF"
              strokeOpacity="0.5"
              strokeWidth="1"
            />
            <text
              x={positions[i].x}
              y={positions[i].y + 5}
              textAnchor="middle"
              fill="#FAFAFA"
              fontSize="11"
            >
              {node.length > 24 ? node.slice(0, 22) + '…' : node}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
