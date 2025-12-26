import { Metadata } from 'next';
import VisaPageClient from '@/components/visa/VisaPageClient';

export const metadata: Metadata = {
    title: "Visa Assistance - Tripntracks",
    description: "Comprehensive visa guides and application assistance for top destinations.",
};

export default function VisaPage() {
    return <VisaPageClient />;
}
