import { SiteIcon } from "./icons";
import { site } from "@/lib/site";
import { messages, localizedPath, type Locale } from "@/lib/locales";

type DocumentSection = { id: string; label: string };

export function DocumentLayout({
  locale,
  title,
  lead,
  updated,
  sections,
  children,
}: {
  locale: Locale;
  title: string;
  lead: string;
  updated?: string;
  sections: DocumentSection[];
  children: React.ReactNode;
}) {
  const t = messages[locale];
  const supportHref = `mailto:${site.email}?subject=${encodeURIComponent(t.supportSubject)}`;
  return (
    <main id="noi-dung" className="page-main document-page">
      <div className="shell document-hero">
        <a href={localizedPath(locale)} className="back-link">
          <SiteIcon name="arrowLeft" /> {t.home}
        </a>
        <div className="document-heading-grid">
          <div className="document-heading-copy">
            <h1>{title}</h1>
            <p>{lead}</p>
            {updated && (
              <span className="document-updated">
                {t.updated} {updated}
              </span>
            )}
          </div>
          <div className="document-help">
            <span className="document-help-label">O-Bee / {site.operator}</span>
            <h2>{t.helpTitle}</h2>
            <p>{t.helpBody}</p>
            <a href={supportHref}>
              {site.email} <SiteIcon name="arrowUpRight" />
            </a>
          </div>
        </div>
      </div>
      <div className="shell document-layout">
        <aside className="document-toc" aria-label={t.contents}>
          <p>{t.contents}</p>
          <nav>
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.label}
              </a>
            ))}
          </nav>
        </aside>
        <article className="document-content">
          {children}
          <nav className="document-related" aria-label={t.related}>
            <h2>{t.related}</h2>
            <a href={localizedPath(locale, "/support/")}>
              {t.supportUse} <SiteIcon name="arrowUpRight" />
            </a>
            <a href={localizedPath(locale, "/privacy-policy/")}>
              {t.privacy} <SiteIcon name="arrowUpRight" />
            </a>
            <a href={localizedPath(locale, "/terms/")}>
              {t.terms} <SiteIcon name="arrowUpRight" />
            </a>
          </nav>
        </article>
      </div>
    </main>
  );
}
