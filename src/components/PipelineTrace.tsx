import React, { useEffect, useRef, useState } from 'react';

interface Stage {
  id: string;
  label: string;
  sublabel: string;
  status: 'input' | 'processing' | 'output' | 'idle';
  x: number;
  y: number;
}

const stages: Stage[] = [
  { id: 'input',     label: 'RAW INPUT',       sublabel: 'Manual workflow',     status: 'input',      x: 48,  y: 80 },
  { id: 'diagnose',  label: 'DIAGNOSE',         sublabel: 'Map & measure',       status: 'processing', x: 220, y: 80 },
  { id: 'blueprint', label: 'BLUEPRINT',        sublabel: 'Architecture',        status: 'processing', x: 392, y: 80 },
  { id: 'build',     label: 'BUILD',            sublabel: 'Implement & test',    status: 'processing', x: 220, y: 220 },
  { id: 'output',    label: 'SYSTEM OUTPUT',    sublabel: 'Repeatable. Measured.',status: 'output',    x: 392, y: 220 },
];

const paths = [
  { d: 'M 140 96 L 208 96',         delay: 400  },
  { d: 'M 312 96 L 380 96',         delay: 700  },
  { d: 'M 440 128 L 440 192',       delay: 1000 },
  { d: 'M 312 236 L 380 236',       delay: 1300 },
  { d: 'M 268 128 L 268 192',       delay: 1000 },
];

const nodeColors = {
  input:      { fill: 'rgba(37,99,235,0.12)', stroke: 'rgba(37,99,235,0.5)', text: '#4f88ff' },
  processing: { fill: 'rgba(255,255,255,0.04)', stroke: 'rgba(255,255,255,0.1)', text: '#a8a8b8' },
  output:     { fill: 'rgba(22,163,74,0.10)', stroke: 'rgba(22,163,74,0.45)', text: '#4ade80' },
  idle:       { fill: 'rgba(255,255,255,0.03)', stroke: 'rgba(255,255,255,0.06)', text: '#3a3a4a' },
};

const metrics = [
  { x: 48,  y: 200, val: '14h', sub: 'saved/wk', color: '#4f88ff' },
  { x: 420, y: 300, val: '87%', sub: 'automated', color: '#a78bfa' },
];

export const PipelineTrace: React.FC<{ className?: string }> = ({ className }) => {
  const [step, setStep] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const delays = [0, 450, 750, 1050, 1350, 1650];
    delays.forEach((d, i) => {
      timers.push(setTimeout(() => setStep(i + 1), d));
    });
    timerRef.current = timers;
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <svg
      viewBox="0 0 520 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: '100%', height: '100%', overflow: 'visible' }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ptg1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0"/>
          <stop offset="40%" stopColor="#2563eb"/>
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.3"/>
        </linearGradient>
        <linearGradient id="ptg2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2563eb"/>
          <stop offset="100%" stopColor="#16a34a" stopOpacity="0.5"/>
        </linearGradient>
        <filter id="ptf">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <marker id="arr" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0 1L5 3L0 5" stroke="#2563eb" strokeWidth="1" fill="none" strokeOpacity="0.5"/>
        </marker>
        <marker id="arr-ok" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0 1L5 3L0 5" stroke="#16a34a" strokeWidth="1" fill="none" strokeOpacity="0.5"/>
        </marker>
      </defs>

      {/* Grid dots */}
      {Array.from({ length: 9 }, (_, c) =>
        Array.from({ length: 7 }, (_, r) => (
          <circle key={`${c}-${r}`} cx={c * 60 + 20} cy={r * 48 + 20} r="1" fill="rgba(255,255,255,0.04)" />
        ))
      )}

      {/* Connection paths */}
      {paths.map((p, i) => {
        const len = 200;
        return (
          <path
            key={i}
            d={p.d}
            stroke={i === 3 ? 'url(#ptg2)' : 'url(#ptg1)'}
            strokeWidth="1"
            strokeLinecap="round"
            markerEnd={i === 3 ? 'url(#arr-ok)' : 'url(#arr)'}
            style={{
              strokeDasharray: len,
              strokeDashoffset: step > i + 1 ? 0 : len,
              transition: `stroke-dashoffset 0.5s var(--ease-out) ${p.delay}ms`,
            }}
          />
        );
      })}

      {/* Nodes */}
      {stages.map((s, i) => {
        const c = nodeColors[s.status];
        const visible = step > i;
        const W = s.id === 'input' || s.id === 'output' ? 96 : 84;
        const H = 48;
        return (
          <g
            key={s.id}
            filter="url(#ptf)"
            style={{ opacity: visible ? 1 : 0, transition: `opacity 0.35s ease ${i * 80}ms` }}
          >
            <rect
              x={s.x - W / 2} y={s.y - H / 2}
              width={W} height={H}
              rx="8"
              fill={c.fill}
              stroke={c.stroke}
              strokeWidth="1"
            />
            {/* Top accent line */}
            <rect
              x={s.x - W / 2} y={s.y - H / 2}
              width={W} height="2"
              rx="1"
              fill={c.stroke}
              opacity="0.7"
            />
            <text x={s.x} y={s.y - 5} textAnchor="middle" fontSize="8" fontWeight="700"
              fill={c.text} fontFamily="JetBrains Mono,monospace" letterSpacing="0.08em">
              {s.label}
            </text>
            <text x={s.x} y={s.y + 9} textAnchor="middle" fontSize="7.5" fontWeight="400"
              fill="rgba(168,168,184,0.6)" fontFamily="Inter,sans-serif">
              {s.sublabel}
            </text>
            {s.status === 'output' && step >= 5 && (
              <circle cx={s.x + W / 2 - 10} cy={s.y - H / 2 + 10} r="3" fill="#4ade80">
                <animate attributeName="opacity" values="1;0.3;1" dur="2.2s" repeatCount="indefinite"/>
              </circle>
            )}
            {s.status === 'input' && (
              <circle cx={s.x - W / 2 + 10} cy={s.y - H / 2 + 10} r="2.5" fill="#4f88ff" opacity="0.7">
                <animate attributeName="opacity" values="0.7;0.2;0.7" dur="1.8s" repeatCount="indefinite"/>
              </circle>
            )}
          </g>
        );
      })}

      {/* Metric chips */}
      {metrics.map((m, i) => (
        <g key={i} style={{ opacity: step >= 5 ? 1 : 0, transition: `opacity 0.4s ease ${600 + i * 200}ms` }}>
          <rect x={m.x - 32} y={m.y} width="64" height="38" rx="6"
            fill="var(--s2)" stroke="var(--b1)" strokeWidth="1"/>
          <text x={m.x} y={m.y + 16} textAnchor="middle" fontSize="16" fontWeight="800"
            fill={m.color} fontFamily="JetBrains Mono,monospace" letterSpacing="-0.03em">
            {m.val}
          </text>
          <text x={m.x} y={m.y + 30} textAnchor="middle" fontSize="7.5" fontWeight="500"
            fill="rgba(168,168,184,0.5)" fontFamily="Inter,sans-serif" letterSpacing="0.05em">
            {m.sub.toUpperCase()}
          </text>
        </g>
      ))}

      {/* System online indicator */}
      {step >= 5 && (
        <g style={{ opacity: 1, animation: 'fade-in 0.5s ease' }}>
          <rect x="380" y="290" width="108" height="24" rx="4"
            fill="rgba(22,163,74,0.08)" stroke="rgba(22,163,74,0.25)" strokeWidth="1"/>
          <circle cx="393" cy="302" r="3" fill="#4ade80">
            <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
          </circle>
          <text x="401" y="306" fontSize="8" fontWeight="600" fill="#4ade80"
            fontFamily="JetBrains Mono,monospace" letterSpacing="0.06em">
            SYSTEM ONLINE
          </text>
        </g>
      )}
    </svg>
  );
};

export default PipelineTrace;
