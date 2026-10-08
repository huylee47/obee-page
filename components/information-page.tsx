'use client';
import { useLocale } from './locale-provider';
import { SiteIcon } from './icons';
import { DocumentLayout } from './document-layout';
import { documents, type DocumentKind } from '@/lib/documents';
import { messages, localizedPath, type Locale } from '@/lib/locales';
import { site } from '@/lib/site';

function LinkedText({ text, locale }: { text: string; locale: Locale }) {
  const t = messages[locale];
  const links: Record<string, string> = {
    [site.email]: `mailto:${site.email}`,
    'ors.vn': site.website,
    [t.privacy]: localizedPath(locale, '/privacy-policy/'),
    [t.terms]: localizedPath(locale, '/terms/'),
    [t.support]: localizedPath(locale, '/support/'),
  };
  const pattern = new RegExp(`(${Object.keys(links).map(key => key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
  return <>{text.split(pattern).map((part, index) => links[part] ? <a key={index} href={links[part]}>{part}</a> : part)}</>;
}

export function InformationPage({ locale: initialLocale, kind }: { locale: Locale; kind: DocumentKind }) {
  const locale = useLocale(initialLocale);
  const doc = documents[locale][kind];
  const t = messages[locale];
  const supportHref = `mailto:${site.email}?subject=${encodeURIComponent(t.supportSubject)}`;
  const shortcuts = locale === 'vi' ? [
    ['dang-nhap', 'Không đăng nhập được', 'Kiểm tra tài khoản và quyền truy cập'],
    ['loi-ung-dung', 'Lỗi khi sử dụng', 'Ứng dụng, kết nối và chấm công'],
    ['du-lieu', 'Thông tin cá nhân', 'Yêu cầu chỉnh sửa hoặc xóa dữ liệu'],
  ] : [
    ['dang-nhap', 'Sign-in problems', 'Check your account and access permissions'],
    ['loi-ung-dung', 'Application errors', 'App, connection and attendance issues'],
    ['du-lieu', 'Personal information', 'Request a correction or data deletion'],
  ];
  return <DocumentLayout locale={locale} title={doc.title} lead={doc.lead}
    updated={kind === 'support' ? undefined : locale === 'vi' ? '08/10/2026' : '8 October 2026'}
    sections={doc.sections.map(section => ({ id: section.id, label: section.title }))}>
    {kind === 'support' && <div className="support-shortcuts" aria-label={t.support}>
      {shortcuts.map(([id, title, body]) => <a key={id} href={`#${id}`}><strong>{title}</strong><span>{body} <SiteIcon name="arrowDown" size={16} /></span></a>)}
      <a href={supportHref}><strong>{locale === 'vi' ? 'Gửi email hỗ trợ' : 'Email support'}</strong><span>{site.email} <SiteIcon name="arrowUpRight" size={16} /></span></a>
    </div>}
    {doc.sections.map(section => <section id={section.id} key={section.id}>
      <h2>{section.title}</h2>
      {kind === 'support' && section.id === 'lien-he' && <div className="support-contact">
        <div><span>Email</span><a href={supportHref}>{site.email}</a></div>
        <div><span>{t.operator}</span><strong>{site.operator}</strong></div>
        <div><span>{t.website}</span><a href={site.website} target="_blank" rel="noopener noreferrer">ors.vn <SiteIcon name="arrowUpRight" /></a></div>
      </div>}
      {section.paragraphs.map(text => <p key={text}><LinkedText text={text} locale={locale} /></p>)}
      {section.bullets.length > 0 && <ul>{section.bullets.map(text => <li key={text}>{text}</li>)}</ul>}
    </section>)}
  </DocumentLayout>;
}
