import type { Metadata } from 'next';
import { InformationPage } from '@/components/information-page';
import { documents } from '@/lib/documents';
export const metadata: Metadata = {
  title: documents.en['support'].title,
  description: documents.en['support'].description,
};
export default function Page() { return <InformationPage locale="en" kind="support" />; }
