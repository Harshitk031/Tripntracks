import React from 'react';
import type { Metadata } from 'next';
import BookingDetailsClient from '@/components/booking/BookingDetailsClient';

interface PageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ type: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const params = await props.params;
    return {
        title: `Booking Details ${params.id} - Tripntracks`,
        description: "Review your itinerary and complete your booking.",
    };
}

export default async function BookingDetailsPage(props: PageProps) {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const type = searchParams.type || 'flights';

    return <BookingDetailsClient id={params.id} type={type} />;
}
