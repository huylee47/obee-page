import { type Locale } from '@/lib/locales';
import '@fontsource/be-vietnam-pro/400.css';
import '@fontsource/be-vietnam-pro/500.css';
import '@fontsource/be-vietnam-pro/600.css';
import '@fontsource/be-vietnam-pro/700.css';

import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { LocaleProvider } from '@/components/locale-provider';

import '@/app/globals.css';
import '@/app/parallax.css';
import '@/app/locale-transition.css';

export function SiteLayout({ children, locale }: Readonly<{ children: React.ReactNode; locale: Locale }>) {
  return (
    <html lang={locale}>
      <body>
        <LocaleProvider initialLocale={locale}>
          <SiteHeader locale={locale} />
          <div className="locale-content">{children}</div>
          <SiteFooter locale={locale} />
        </LocaleProvider>
      </body>
    </html>
  );
}
