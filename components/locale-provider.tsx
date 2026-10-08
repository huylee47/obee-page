'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { usePathname } from 'next/navigation';
import { documents, type DocumentKind } from '@/lib/documents';
import { localizedPath, messages, type Locale } from '@/lib/locales';

type LocaleContextValue = { locale: Locale; switching: boolean; switchLocale: (next: Locale) => Promise<void> };
const LocaleContext = createContext<LocaleContextValue | null>(null);

function localeForPath(path: string): Locale {
  return /^\/en(?:\/|$)/.test(path) ? 'en' : 'vi';
}

export function LocaleProvider({ initialLocale, children }: { initialLocale: Locale; children: ReactNode }) {
  const pathname = usePathname();
  const [locale, setLocale] = useState(initialLocale);
  const [switching, setSwitching] = useState(false);
  const busy = useRef(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  // Next's patched History API updates usePathname, including Back/Forward.
  useEffect(() => { setLocale(localeForPath(pathname)); }, [pathname]);

  useEffect(() => {
    document.documentElement.lang = locale;
    const slug = pathname.replace(/^\/en(?=\/|$)/, '').replace(/^\/|\/$/g, '');
    const doc = Object.prototype.hasOwnProperty.call(documents[locale], slug)
      ? documents[locale][slug as DocumentKind] : undefined;
    document.title = doc ? `${doc.title} | O-Bee` : messages[locale].siteTitle;
    document.querySelector('meta[name="description"]')?.setAttribute('content', doc?.description ?? messages[locale].description);
  }, [locale, pathname]);

  async function switchLocale(next: Locale) {
    if (busy.current || next === locale) return;
    busy.current = true;
    setSwitching(true);
    const url = new URL(window.location.href);
    const scroll = { x: window.scrollX, y: window.scrollY };
    const visibleSection = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'))
      .filter(section => section.getBoundingClientRect().top <= 150 && section.getBoundingClientRect().bottom > 0)
      .at(-1);
    const anchor = visibleSection ? { id: visibleSection.id, top: visibleSection.getBoundingClientRect().top } : undefined;
    const restoreScroll = () => {
      if (!mounted.current) return;
      const section = anchor ? document.getElementById(anchor.id) : null;
      const y = section && anchor ? window.scrollY + section.getBoundingClientRect().top - anchor.top : scroll.y;
      window.scrollTo({ left: scroll.x, top: y, behavior: 'instant' });
    };
    const base = url.pathname.replace(/^\/en(?=\/|$)/, '') || '/';
    url.pathname = localizedPath(next, base.endsWith('/') ? base : `${base}/`);
    let applied = false;
    const update = () => {
      if (!mounted.current || applied) return;
      applied = true;
      flushSync(() => {
        setLocale(next);
        window.history.pushState(null, '', url.pathname + url.search + url.hash);
      });
      restoreScroll();
      requestAnimationFrame(restoreScroll);
    };
    try {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!reduced && document.startViewTransition) {
        const transition = document.startViewTransition(update);
        await transition.finished;
      } else if (!reduced) {
        document.documentElement.dataset.localeFading = 'true';
        await new Promise(resolve => window.setTimeout(resolve, 130));
        update();
        delete document.documentElement.dataset.localeFading;
      } else {
        update();
      }
    } catch {
      // A browser may skip a view transition (for example in a hidden tab).
      // Language switching still works; never reload as a fallback.
      update();
    } finally {
      delete document.documentElement.dataset.localeFading;
      busy.current = false;
      restoreScroll();
      if (mounted.current) setSwitching(false);
    }
  }

  return <LocaleContext.Provider value={{ locale, switching, switchLocale }}>{children}</LocaleContext.Provider>;
}

export function useLocale(fallback: Locale) {
  return useContext(LocaleContext)?.locale ?? fallback;
}

export function useLocaleSwitcher() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('LanguageSwitch requires LocaleProvider');
  return context;
}
