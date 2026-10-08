'use client';

import { useEffect, useRef } from 'react';
import { animate, createScope } from 'animejs';
import { motionQueries } from '@/lib/parallax';

export function HeaderMotion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const header = root.current;
    if (!header) return;
    const preference = window.matchMedia(motionQueries.allowed);
    const scope = createScope({ root }).add(self => {
      if (!self) return;
      self.add('shape', (compact: boolean) => {
        animate(header, {
          '--header-radius': compact ? '40px' : '14px',
          '--header-inset': compact ? '40px' : '0px',
          duration: preference.matches ? 420 : 0,
          ease: 'out(4)',
        });
      });
    });
    let compact: boolean | undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const next = window.scrollY > 100;
      if (next === compact) return;
      compact = next;
      header.dataset.compact = String(next);
      scope.methods.shape(next);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const onPreference = () => { compact = undefined; update(); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    preference.addEventListener('change', onPreference);
    return () => {
      window.removeEventListener('scroll', onScroll);
      preference.removeEventListener('change', onPreference);
      cancelAnimationFrame(frame);
      scope.revert();
    };
  }, []);
  return <header className="site-header" ref={root}>{children}</header>;
}
