import React from 'react';
import { motion, useInView } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up'|'left'|'right'|'none';
  className?: string;
  style?: React.CSSProperties;
}

export const Reveal: React.FC<RevealProps> = ({ children, delay=0, direction='up', className, style }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once:true, margin:'-60px' });
  const from = { up:{y:20}, left:{x:-20}, right:{x:20}, none:{} }[direction];
  return (
    <motion.div ref={ref} initial={{ opacity:0, ...from }} animate={inView?{opacity:1,x:0,y:0}:{}}
      transition={{ duration:0.5, delay, ease:[0.22,1,0.36,1] }} className={className} style={style}>
      {children}
    </motion.div>
  );
};

export const Stagger: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties; gap?: number }> = ({ children, className, style, gap=0.07 }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once:true, margin:'-60px' });
  return (
    <motion.div ref={ref} initial="h" animate={inView?'v':'h'}
      variants={{ v:{ transition:{ staggerChildren:gap } } }} className={className} style={style}>
      {children}
    </motion.div>
  );
};

export const SI: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ children, className, style }) => (
  <motion.div variants={{ h:{opacity:0,y:16}, v:{opacity:1,y:0,transition:{duration:0.45,ease:[0.22,1,0.36,1]}} }} className={className} style={style}>
    {children}
  </motion.div>
);

// Backward-compatible aliases
export const StaggerContainer = Stagger;
export const StaggerItem = SI;
