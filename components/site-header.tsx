'use client';
import { useLocale } from './locale-provider';
import { HeaderMotion } from "./header-motion";
import { SiteIcon } from "./icons";
import Image from "next/image";
import { LanguageSwitch } from "./language-switch";
import { site } from "@/lib/site";
import { messages, localizedPath, type Locale } from "@/lib/locales";
export function SiteHeader({ locale: initialLocale }: { locale: Locale }) {
  const locale = useLocale(initialLocale);
  const t = messages[locale];
  const links = [
    { href: localizedPath(locale, "/#tinh-nang"), label: t.features },
    { href: localizedPath(locale, "/support/"), label: t.support },
    { href: localizedPath(locale, "/privacy-policy/"), label: t.privacy },
    { href: localizedPath(locale, "/terms/"), label: t.terms },
  ];
  const consultationHref = `mailto:${site.email}?subject=${encodeURIComponent(t.consultationSubject)}`;
  return (
    <>
    <a className="skip-link" href="#noi-dung">{t.skip}</a>
    <HeaderMotion>
      <div className="shell header-inner">
        <a
          className="brand"
          href={localizedPath(locale)}
          aria-label={t.backHome}
        >
          <Image src="/svg/obee.svg" alt="" width={42} height={42} priority />
          <span>
            O-Bee<span className="brand-period">.</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label={t.navigation}>
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <LanguageSwitch locale={locale} />
          <a className="button button-dark header-cta" href={consultationHref}>
            {t.consult} <SiteIcon name="arrowUpRight" />
          </a>
        </div>
        <details className="mobile-menu">
          <summary aria-label={t.menu}>
            Menu <SiteIcon name="menu" className="menu-open-icon" />
            <SiteIcon name="close" className="menu-close-icon" />
          </summary>
          <nav aria-label={t.mobileNavigation}>
            {links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
            <a href={consultationHref}>{t.consult}</a>
          </nav>
        </details>
      </div>
    </HeaderMotion>
    </>
  );
}
