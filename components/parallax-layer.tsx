import type { CSSProperties, ReactNode } from 'react';

export function ParallaxLayer({ children, depth = 0.5, engine = 'gsap', className = '', decorative = false, style }: {
  children?: ReactNode;
  depth?: number;
  engine?: 'gsap' | 'anime';
  className?: string;
  decorative?: boolean;
  style?: CSSProperties;
}) {
  return <div className={`parallax-layer ${className}`} data-parallax-depth={depth} data-parallax-engine={engine} aria-hidden={decorative || undefined} style={style}>{children}</div>;
}
