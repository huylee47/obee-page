'use client';
import { useLocale } from './locale-provider';
import Image from "next/image";
import { HomeMotion } from "./home-motion";
import { ParallaxLayer } from "./parallax-layer";
import { SiteIcon, type IconName } from "./icons";
import { site } from "@/lib/site";
import { messages, localizedPath, type Locale } from "@/lib/locales";

const featureIcons: IconName[] = ["users", "calendarClock", "mapPin", "calendarCheck"];
const workflowIcons: IconName[] = ["database", "clock", "fileCheck", "bell"];
const capabilityIcons: IconName[] = ["users", "network", "calendarClock", "clock", "calendarCheck", "globe", "bell"];

export function HomePage({ locale: initialLocale }: { locale: Locale }) {
  const locale = useLocale(initialLocale);
  const t = messages[locale];
  const h = t.homePage;
  const consultationHref = `mailto:${site.email}?subject=${encodeURIComponent(t.consultationSubject)}`;
  const statement = h.statement.split(" ");
  return <main id="noi-dung" className="page-main landing-page">
    <HomeMotion key={locale}>
      <section className="hero-stage" aria-labelledby="hero-title">
        <ParallaxLayer depth={0.25} className="hero-mesh depth-background" decorative />
        <ParallaxLayer depth={0.3} engine="anime" className="ambient-blob hero-blob" decorative />
        <ParallaxLayer depth={0.5} className="hero-wash depth-overlay" decorative />
        <div className="hero shell">
          <div className="hero-copy">
            <p className="hero-kicker">{h.kicker}</p>
            <h1 id="hero-title">{h.headline}<br /><span>{h.accent}</span></h1>
            <p className="hero-description">{h.lead}</p>
            <div className="hero-actions">
              <a className="button button-dark" href={consultationHref}>{t.consult}<SiteIcon name="arrowUpRight" /></a>
              <a className="button button-outline" href="#tinh-nang">{h.discover}<SiteIcon name="arrowDown" /></a>
            </div>
          </div>
          <ParallaxLayer depth={0.6} className="hero-image-depth">
            <div className="hero-media">
              <Image src="/images/team-parallax.webp" alt={h.heroAlt} width={1536} height={1024} priority sizes="(max-width: 800px) 100vw, 58vw" />
            </div>
          </ParallaxLayer>
          <ParallaxLayer depth={1.1} engine="anime" className="hero-orbit depth-floating" decorative>
            <svg viewBox="0 0 200 200" fill="none"><circle cx="100" cy="100" r="86" /><path d="M14 100h172M100 14v172" /></svg>
          </ParallaxLayer>
        </div>
      </section>

      <section id="tinh-nang" className="features-section section-space shell" aria-labelledby="features-title">
        <div className="section-heading">
          <h2 id="features-title">{h.featuresTitle} <span>{h.featuresAccent}</span></h2>
          <p>{h.featuresLead}</p>
        </div>
        <div className="feature-grid">
          {h.cards.map((card, index) => <ParallaxLayer key={card.title} depth={index % 2 ? 0.15 : 0.3} className="feature-depth">
            <article className={`feature-card ${["feature-card-primary", "feature-card-yellow", "feature-card-photo", "feature-card-light"][index]}`}>
              {index === 2 ? <>
                <Image src="/images/attendance-story.webp" alt={h.attendanceAlt} width={1122} height={1402} sizes="(max-width: 800px) 100vw, 45vw" />
                <div className="feature-photo-caption">
                  <SiteIcon name={featureIcons[index]} className="feature-symbol" size={30} />
                  <h3>{card.title}</h3><p>{card.body}</p>
                </div>
              </> : <>
                <div><SiteIcon name={featureIcons[index]} className="feature-symbol" size={30} /><h3>{card.title}</h3><p>{card.body}</p></div>
                <ul className="feature-points">{card.points.map(point => <li key={point}>{point}</li>)}</ul>
              </>}
            </article>
          </ParallaxLayer>)}
        </div>
      </section>

      <div className="capability-strip" aria-hidden="true">
        <div className="capability-track">
          {[...h.capabilities, ...h.capabilities].map((item, index) => <span key={`${item}-${index}`}><SiteIcon name={capabilityIcons[index % capabilityIcons.length]} />{item}<b>/</b></span>)}
        </div>
      </div>

      <section className="statement-stage">
        <ParallaxLayer depth={0.3} engine="anime" className="ambient-blob statement-blob" decorative />
        <div className="statement-section section-space shell" aria-label={h.statementLabel}>
          <p className="statement">{statement.map((word, index) => <span className="reveal-word" key={`${word}-${index}`}>
            {word}{index === (locale === 'vi' ? 3 : 1) && <span className="inline-photo"><Image src="/images/attendance-story.webp" alt="" fill sizes="116px" /></span>}{" "}
          </span>)}</p>
          <p>{h.statementBody}</p>
        </div>
      </section>

      <section id="cach-hoat-dong" className="workflow-section section-space" aria-labelledby="workflow-title">
        <ParallaxLayer depth={0.25} className="workflow-mesh depth-background" decorative />
        <div className="shell workflow-inner">
          <div className="workflow-intro">
            <h2 id="workflow-title">{h.workflowTitle}<br /><span>{h.workflowAccent}</span></h2>
            <p>{h.workflowLead}</p>
            <a href={localizedPath(locale, "/support/")} className="text-link">{h.needSupport}<SiteIcon name="arrowUpRight" /></a>
          </div>
          <div className="workflow-stack">
            {h.steps.map((item, index) => <article key={item.title} className="workflow-card">
              <SiteIcon name={workflowIcons[index]} className="workflow-symbol" size={32} />
              <h3>{item.title}</h3><p>{item.body}</p>
              <div className="workflow-card-track" aria-hidden="true">{workflowIcons.map((name, i) => <span className={i === index ? "is-current" : ""} key={name}><SiteIcon name={name} size={16} /></span>)}</div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="trust-section section-space shell" aria-labelledby="trust-title">
        <ParallaxLayer depth={0.7} className="trust-image-depth">
          <div className="trust-visual story-image"><Image src="/images/workday-parallax.webp" alt={h.workdayAlt} width={1024} height={1536} sizes="(max-width: 800px) 100vw, 42vw" /></div>
        </ParallaxLayer>
        <div className="trust-copy">
          <SiteIcon name="shieldCheck" className="trust-symbol" size={34} />
          <h2 id="trust-title">{h.trustTitle}</h2><p>{h.trustBody}</p>
          <div className="trust-links">
            <a href={localizedPath(locale, "/privacy-policy/")}>{t.privacy}<SiteIcon name="arrowUpRight" /></a>
            <a href={localizedPath(locale, "/support/")}>{h.supportCenter}<SiteIcon name="arrowUpRight" /></a>
          </div>
        </div>
      </section>

      <section className="closing-section" aria-labelledby="closing-title">
        <ParallaxLayer depth={0.25} className="closing-mesh depth-background" decorative />
        <ParallaxLayer depth={0.4} engine="anime" className="ambient-blob closing-blob" decorative />
        <div className="shell closing-inner">
          <h2 id="closing-title">{h.closingTitle}<br />{h.closingContinue} <em>{h.closingAccent}</em></h2>
          <p>{h.closingBody}</p>
          <div className="magnetic-wrap"><a className="button button-yellow magnetic-button" href={consultationHref}>{t.consult}<SiteIcon name="arrowUpRight" /></a></div>
        </div>
      </section>
    </HomeMotion>
  </main>;
}
