import React from 'react';
import type { Metadata } from 'next';
import DestinationDetailsClient from '@/components/home/DestinationDetailsClient';
import mockData from '@/lib/mockData.json';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const params = await props.params;
    const destination = mockData.destinations.find((d: any) => d.id === params.id);

    return {
        title: `${destination ? destination.name : 'Destination'} - Tripntracks`,
        description: "Explore the best travel destinations.",
    };
}

export default async function DestinationDetailsPage(props: PageProps) {
    const params = await props.params;
    return <DestinationDetailsClient id={params.id} />;
}
