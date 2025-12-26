import React from 'react';
import FilterSidebar from '@/components/shared/FilterSidebar';
import FlightCard from '@/components/flights/FlightCard';
import HotelCard from '@/components/hotels/HotelCard';
import TrainCard from '@/components/trains/TrainCard';
import mockData from '@/lib/mockData.json';
import { Vertical } from '@/types/booking';

interface SearchResultsProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

import type { Metadata } from 'next';

export async function generateMetadata({ searchParams }: SearchResultsProps): Promise<Metadata> {
    const resolvedSearchParams = await searchParams;
    const type = (resolvedSearchParams.type as string) || 'Flights';
    const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
    return {
        title: `${capitalizedType} Search Results - Tripntracks`,
        description: `Find the best deals on ${type} at Tripntracks.`,
    };
}

export default async function SearchResultsPage({ searchParams }: SearchResultsProps) {
    const resolvedSearchParams = await searchParams;
    const type = (resolvedSearchParams.type as Vertical) || 'flights';
    const query = (resolvedSearchParams.q as string)?.toLowerCase() || '';

    // Safety check for valid types
    const validTypes: Vertical[] = ['flights', 'hotels', 'trains', 'visas', 'destinations'];
    const activeType = validTypes.includes(type) ? type : 'flights';

    // Filter logic
    let results = [];

    // Determine which list to filter
    const list = (mockData as any)[activeType] || [];

    if (activeType === 'destinations') {
        // Special search for destinations
        results = list.filter((item: any) =>
            item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
        );
    } else {
        // Existing logic for bookings
        results = list;
        // TODO: Add more specific filtering for flights/hotels here if needed
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filter Sidebar */}
                    <div className="w-full lg:w-1/4">
                        <FilterSidebar type={activeType} />
                    </div>

                    {/* Results Grid */}
                    <div className="flex-1">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {activeType.charAt(0).toUpperCase() + activeType.slice(1)} Results
                            </h1>
                            <p className="text-gray-600">
                                {results.length} results found {query && `for "${query}"`}
                            </p>
                        </div>

                        <div className="space-y-6">
                            {results.length === 0 ? (
                                <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                                    <p className="text-gray-500 text-lg">No results found.</p>
                                </div>
                            ) : results.map((item: any) => (
                                <div key={item.id}>
                                    {activeType === 'flights' && <FlightCard flight={item} />}
                                    {activeType === 'hotels' && <HotelCard hotel={item} />}
                                    {activeType === 'trains' && <TrainCard train={item} />}
                                    {activeType === 'destinations' && (
                                        <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center group hover:shadow-md transition-shadow cursor-pointer">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                                                <p className="text-sm text-gray-500">{item.description}</p>
                                            </div>
                                            <a href={`/destination/${item.id}`} className="text-blue-600 font-medium group-hover:underline">View Details</a>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

