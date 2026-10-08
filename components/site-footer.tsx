"use client";
import { useLocale } from "./locale-provider";
import { SiteIcon } from "./icons";
import { site } from "@/lib/site";
import { messages, localizedPath, type Locale } from "@/lib/locales";
export function SiteFooter({ locale: initialLocale }: { locale: Locale }) {
  const locale = useLocale(initialLocale);
  const t = messages[locale];
  return (
    <footer className="site-footer">
      <div className="shell footer-top">
        <div>
          <a className="footer-brand" href={localizedPath(locale)}>
            O-Bee<span>.</span>
          </a>
          <p>{t.footerDescription}</p>
        </div>
        <div className="footer-links">
          <div>
            <h2>{t.explore}</h2>
            <a href={localizedPath(locale, "/#tinh-nang")}>{t.features}</a>
            <a href={localizedPath(locale, "/#cach-hoat-dong")}>{t.workflow}</a>
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent(t.consultationSubject)}`}
            >
              {t.consult}
            </a>
          </div>
          <div>
            <h2>{t.information}</h2>
            <a href={localizedPath(locale, "/support/")}>{t.support}</a>
            <a href={localizedPath(locale, "/privacy-policy/")}>{t.privacy}</a>
            <a href={localizedPath(locale, "/terms/")}>{t.terms}</a>
          </div>
          <div>
            <h2>{t.contact}</h2>
            <a href={`mailto:${site.email}`}>
              <SiteIcon name="mail" size={16} />
              {site.email}
            </a>
            <a href={site.website} target="_blank" rel="noopener noreferrer">
              <SiteIcon name="globe" size={16} />
              ors.vn <SiteIcon name="externalLink" size={14} />
            </a>
          </div>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} O-Bee · Ouransoft Group</span>
        <span>{t.footerNote}</span>
      </div>
    </footer>
  );
}
