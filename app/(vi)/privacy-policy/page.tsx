import type { Metadata } from 'next';
import { InformationPage } from '@/components/information-page';
import { documents } from '@/lib/documents';
export const metadata: Metadata = {
  title: documents.vi['privacy-policy'].title,
  description: documents.vi['privacy-policy'].description,
};
export default function Page() { return <InformationPage locale="vi" kind="privacy-policy" />; }
