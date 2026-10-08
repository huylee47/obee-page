import type { Metadata } from 'next';
import { InformationPage } from '@/components/information-page';
import { documents } from '@/lib/documents';
export const metadata: Metadata = {
  title: documents.en['terms'].title,
  description: documents.en['terms'].description,
};
export default function Page() { return <InformationPage locale="en" kind="terms" />; }
