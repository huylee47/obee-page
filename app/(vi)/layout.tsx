import type { Metadata, Viewport } from "next";
import { SiteLayout } from "@/components/site-layout";
import { messages } from "@/lib/locales";
export const metadata: Metadata = {
  title: { default: messages.vi.siteTitle, template: "%s | O-Bee" },
  description: messages.vi.description,
  applicationName: "O-Bee",
  icons: { icon: "/svg/obee.svg" },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f9f8f5",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteLayout locale="vi">{children}</SiteLayout>;
}
