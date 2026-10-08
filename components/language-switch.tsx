"use client";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { messages, type Locale } from "@/lib/locales";
import { useLocaleSwitcher } from "./locale-provider";

export function LanguageSwitch({ locale: initialLocale }: { locale: Locale }) {
  const pathname = usePathname();
  const { locale, switching, switchLocale } = useLocaleSwitcher();
  const base = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  const vi = base.endsWith("/") ? base : `${base}/`;
  
  function change(event: MouseEvent<HTMLAnchorElement>, next: Locale) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    void switchLocale(next);
  }

  const currentLocale = locale ?? initialLocale;

  return (
    <nav className="locale-switch-pill" aria-label={messages[currentLocale].language} aria-busy={switching}>
      <div className={`locale-slider ${currentLocale}`} />
      <a href={vi} hrefLang="vi" lang="vi" aria-label="Tiếng Việt"
        aria-current={currentLocale === "vi" ? "true" : undefined} aria-disabled={switching || undefined}
        onClick={event => change(event, "vi")}>VI</a>
      <a href={`/en${vi}`} hrefLang="en" lang="en" aria-label="English"
        aria-current={currentLocale === "en" ? "true" : undefined} aria-disabled={switching || undefined}
        onClick={event => change(event, "en")}>EN</a>
    </nav>
  );
}
