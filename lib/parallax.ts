// Bounded offsets keep media inside its overscan and avoid long scroll drift.
export function parallaxTravel(depth: number, compact = false) {
  const safeDepth = Number.isFinite(depth) ? Math.min(1.2, Math.max(0, depth)) : 0.5;
  return Math.round(safeDepth * (compact ? 18 : 70));
}

export const motionQueries = {
  desktop: '(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)',
  allowed: '(prefers-reduced-motion: no-preference)',
  finePointer: '(hover: hover) and (pointer: fine)',
} as const;
