'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate, createScope, createTimeline, spring, stagger } from 'animejs';
import { motionQueries, parallaxTravel } from '@/lib/parallax';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HomeMotion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const element = root.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add(motionQueries.allowed, () => {
      const compact = window.matchMedia('(max-width: 800px)').matches;
      const disposers: (() => void)[] = [];
      const animeScope = createScope({ root }).add(self => {
        if (!self) return;
        // Entrance and scroll parallax act on different DOM layers.
        if (window.scrollY < 80) {
          createTimeline({ defaults: { duration: 750, ease: 'out(4)' } })
            .add('.hero-kicker', { opacity: [0, 1], translateY: [18, 0] }, 0)
            .add('.hero h1', { opacity: [0, 1], translateY: [28, 0] }, 90)
            .add('.hero-description', { opacity: [0, 1], translateY: [18, 0] }, 180)
            .add('.hero-actions .button', { opacity: [0, 1], translateY: [14, 0], delay: stagger(90) }, 260)
            .add('.hero-media', { opacity: [0, 1], scale: [0.94, 1], duration: 1000 }, 140);
          animate('.hero-orbit circle', { strokeDashoffset: [540, 0], duration: 1400, ease: 'out(3)' });
        }
        self.add('revealFeatures', () => {
          animate('.feature-card', { opacity: [0, 1], translateY: [30, 0], delay: stagger(100), duration: 700, ease: 'out(4)' });
        });
        self.add('revealClosing', () => {
          animate('.closing-inner h2, .closing-inner p, .magnetic-wrap', { opacity: [0, 1], translateY: [24, 0], delay: stagger(100), duration: 750, ease: 'out(4)' });
        });
        self.add('hoverCard', (card: HTMLElement, active: boolean) => {
          animate(card, { scale: active ? 1.018 : 1, ease: spring({ bounce: 0.15, duration: 500 }) });
          const icon = card.querySelector('.feature-symbol');
          if (icon) animate(icon, { rotate: active ? -8 : 0, ease: spring({ bounce: 0.2, duration: 450 }) });
        });
        self.add('magnet', (button: HTMLElement, x: number, y: number) => {
          animate(button, { translateX: x, translateY: y, duration: 260, ease: 'out(3)' });
        });

        element.querySelectorAll<HTMLElement>('[data-parallax-engine="anime"]').forEach(layer => {
          const travel = parallaxTravel(Number(layer.dataset.parallaxDepth), compact);
          const interpolation = animate(layer, { translateY: [-travel, travel], duration: 1000, ease: 'linear', autoplay: false });
          const parent = layer.closest('section') ?? layer.parentElement;
          ScrollTrigger.create({
            trigger: parent,
            start: 'top bottom',
            end: 'bottom top',
            onUpdate: trigger => interpolation.seek(trigger.progress * 1000),
          });
        });
        const photo = element.querySelector('.inline-photo');
        if (photo) {
          const rotation = animate(photo, { rotate: [-2, 2], duration: 1000, ease: 'linear', autoplay: false });
          ScrollTrigger.create({ trigger: '.statement', start: 'top bottom', end: 'bottom top', onUpdate: trigger => rotation.seek(trigger.progress * 1000) });
        }
      });

      const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (entry.target.classList.contains('feature-grid')) animeScope.methods.revealFeatures();
          else animeScope.methods.revealClosing();
          observer.unobserve(entry.target);
        }
      }, { threshold: 0.12 });
      element.querySelectorAll('.feature-grid, .closing-inner').forEach(target => observer.observe(target));

      if (window.matchMedia(motionQueries.finePointer).matches) {
        element.querySelectorAll<HTMLElement>('.feature-card').forEach(card => {
          const enter = () => animeScope.methods.hoverCard(card, true);
          const leave = () => animeScope.methods.hoverCard(card, false);
          card.addEventListener('pointerenter', enter);
          card.addEventListener('pointerleave', leave);
          disposers.push(() => { card.removeEventListener('pointerenter', enter); card.removeEventListener('pointerleave', leave); });
        });
        element.querySelectorAll<HTMLElement>('.magnetic-wrap').forEach(wrap => {
          const button = wrap.querySelector<HTMLElement>('.magnetic-button');
          if (!button) return;
          const move = (event: PointerEvent) => {
            const box = wrap.getBoundingClientRect();
            animeScope.methods.magnet(button, (event.clientX - box.left - box.width / 2) * 0.12, (event.clientY - box.top - box.height / 2) * 0.16);
          };
          const leave = () => animeScope.methods.magnet(button, 0, 0);
          wrap.addEventListener('pointermove', move);
          wrap.addEventListener('pointerleave', leave);
          disposers.push(() => { wrap.removeEventListener('pointermove', move); wrap.removeEventListener('pointerleave', leave); });
        });
      }

      element.querySelectorAll<HTMLElement>('[data-parallax-engine="gsap"]').forEach(layer => {
        const travel = parallaxTravel(Number(layer.dataset.parallaxDepth), compact);
        gsap.fromTo(layer, { y: -travel }, {
          y: travel,
          ease: 'none',
          scrollTrigger: { trigger: layer.closest('section') ?? layer, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
        });
      });
      gsap.fromTo('.reveal-word', { opacity: 0.18, y: 5 }, {
        opacity: 1, y: 0, stagger: 0.14, ease: 'none',
        scrollTrigger: { trigger: '.statement', start: 'top 82%', end: 'bottom 55%', scrub: true },
      });
      gsap.fromTo('.story-image', { scale: 0.88, opacity: 0.65 }, {
        scale: 1, opacity: 1, ease: 'none',
        scrollTrigger: { trigger: '.trust-section', start: 'top 90%', end: 'center 55%', scrub: true },
      });
      gsap.to('.story-image img', {
        opacity: 0.45, ease: 'none',
        scrollTrigger: { trigger: '.trust-section', start: 'bottom 35%', end: 'bottom top', scrub: true },
      });
      return () => { observer.disconnect(); disposers.forEach(dispose => dispose()); animeScope.revert(); };
    });

    media.add(motionQueries.desktop, () => {
      const stack = element.querySelector<HTMLElement>('.workflow-stack');
      const cards = gsap.utils.toArray<HTMLElement>('.workflow-card');
      if (!stack || cards.length < 2) return;
      stack.classList.add('is-stacked');
      cards.forEach((card, index) => gsap.set(card, { zIndex: index + 1, yPercent: index ? 115 : 0, y: index * 14 }));
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.workflow-inner',
          start: 'top 130px',
          end: () => '+=' + (cards.length - 1) * Math.min(window.innerHeight * 0.6, 500),
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      cards.slice(1).forEach((card, index) => {
        timeline.to(cards[index], { scale: 0.94, y: index * 14 - 12, duration: 1, ease: 'none' }, index);
        timeline.to(card, { yPercent: 0, duration: 1, ease: 'none' }, index);
      });
      // Keyboard focus can move to links in the pinned intro without hiding content.
      return () => { stack.classList.remove('is-stacked'); };
    });
    document.fonts.ready.then(() => { if (root.current) ScrollTrigger.refresh(); });
    return () => media.revert();
  }, { scope: root });
  return <div ref={root}>{children}</div>;
}
