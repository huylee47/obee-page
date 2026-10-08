import type { Metadata } from 'next';
import { InformationPage } from '@/components/information-page';
import { documents } from '@/lib/documents';
export const metadata: Metadata = {
  title: documents.en['privacy-policy'].title,
  description: documents.en['privacy-policy'].description,
};
export default function Page() { return <InformationPage locale="en" kind="privacy-policy" />; }
