import type { Metadata } from 'next';
import { InformationPage } from '@/components/information-page';
import { documents } from '@/lib/documents';
export const metadata: Metadata = {
  title: documents.vi['support'].title,
  description: documents.vi['support'].description,
};
export default function Page() { return <InformationPage locale="vi" kind="support" />; }
