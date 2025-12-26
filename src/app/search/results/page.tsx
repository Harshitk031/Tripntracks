import React from 'react';
import FilterSidebar from '@/components/shared/FilterSidebar';
import FlightCard from '@/components/flights/FlightCard';
import HotelCard from '@/components/hotels/HotelCard';
import TrainCard from '@/components/trains/TrainCard';
import mockData from '@/lib/mockData.json';
import { Vertical } from '@/types/booking';
import { MapPin, Star, Heart, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import WishlistButton from '@/components/shared/WishlistButton';

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
    const list = (mockData as any)[activeType] || [];
    const maxPrice = Number(resolvedSearchParams.max_price) || 1000000; // Default high price

    if (activeType === 'destinations') {
        const regions = (resolvedSearchParams.regions as string)?.split(',') || [];
        results = list.filter((item: any) => {
            const matchesQuery = item.name.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query);
            const matchesPrice = item.price <= maxPrice;
            const matchesRegion = regions.length === 0 ||
                item.categories?.some((cat: string) => regions.includes(cat));
            return matchesQuery && matchesPrice && matchesRegion;
        });
    } else if (activeType === 'flights') {
        const stops = (resolvedSearchParams.stops as string)?.split(',') || [];
        results = list.filter((item: any) => {
            const matchesPrice = item.price <= maxPrice;

            // Stops logic: '0', '1', '2' (which typically means 2+ in our filter UI)
            const itemStopsStr = item.stops >= 2 ? '2' : String(item.stops);
            const matchesStops = stops.length === 0 || stops.includes(itemStopsStr);

            return matchesPrice && matchesStops;
        });
    } else if (activeType === 'hotels') {
        const stars = (resolvedSearchParams.stars as string)?.split(',') || [];
        results = list.filter((item: any) => {
            const matchesPrice = item.pricePerNight <= maxPrice; // Note: Hotel uses pricePerNight
            const matchesStars = stars.length === 0 || stars.includes(String(item.rating));
            return matchesPrice && matchesStars;
        });
    } else {
        // Fallback for other types or basic filtering
        results = list.filter((item: any) => {
            // Try to find a price field if it exists
            const price = item.price || item.pricePerNight || 0;
            return price <= maxPrice;
        });
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 1. Premium Header (Search Specific) */}
            <div className="bg-[#001F3F] text-white pt-24 pb-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 text-sm font-medium text-blue-200 mb-2 uppercase tracking-wider">
                        <Sparkles className="w-4 h-4" />
                        <span>Explore the World</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                        {activeType === 'destinations' ? 'Dream Destinations' : `${activeType.charAt(0).toUpperCase() + activeType.slice(1)} Results`}
                    </h1>
                    <p className="text-blue-100 text-lg max-w-2xl">
                        {results.length} {results.length === 1 ? 'result' : 'results'} found {query && `for "${query}"`}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filter Sidebar */}
                    <div className="w-full lg:w-1/4">
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 top-24 sticky">
                            <FilterSidebar type={activeType} />
                        </div>
                    </div>

                    {/* Results Grid */}
                    <div className="flex-1">
                        {results.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Sparkles className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
                                <p className="text-gray-500 text-lg">Try adjusting your search or filters.</p>
                            </div>
                        ) : (
                            <>
                                {activeType === 'destinations' ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {results.map((item: any) => (
                                            <Link href={`/destination/${item.id}`} key={item.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 block border border-gray-100">
                                                {/* Image */}
                                                <div className="aspect-[4/5] relative overflow-hidden">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

                                                    <div className="absolute top-3 right-3">
                                                        <WishlistButton id={item.id} />
                                                    </div>

                                                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                                                        <div className="flex items-center gap-1 text-xs font-semibold bg-blue-600/90 backdrop-blur-md px-2 py-1 rounded-md w-fit mb-2">
                                                            <Star className="w-3 h-3 fill-white" />
                                                            {item.rating}
                                                        </div>
                                                        <h3 className="text-xl font-bold mb-1 leading-tight">{item.name}</h3>
                                                        <div className="flex items-center text-sm text-gray-200">
                                                            <MapPin className="w-3.5 h-3.5 mr-1" />
                                                            <span className="truncate">{item.description}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Card Body */}
                                                <div className="p-5">
                                                    <div className="flex justify-between items-end">
                                                        <div>
                                                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Starting from</p>
                                                            <div className="flex items-baseline gap-1">
                                                                <span className="text-lg font-bold text-gray-900">₹{item.price.toLocaleString('en-IN')}</span>
                                                                <span className="text-xs text-gray-400">/person</span>
                                                            </div>
                                                        </div>
                                                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                            <ArrowRight className="w-4 h-4" />
                                                        </div>
                                                    </div>

                                                    {/* Categories */}
                                                    {item.categories && (
                                                        <div className="mt-4 pt-4 border-t border-gray-50 flex flex-wrap gap-2">
                                                            {item.categories.slice(0, 2).map((cat: string, idx: number) => (
                                                                <span key={idx} className="text-[10px] font-medium px-2 py-1 bg-gray-50 text-gray-600 rounded-md uppercase tracking-wider">
                                                                    {cat}
                                                                </span>
                                                            ))}
                                                            {item.categories.length > 2 && (
                                                                <span className="text-[10px] font-medium px-2 py-1 bg-gray-50 text-gray-400 rounded-md">
                                                                    +{item.categories.length - 2}
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {results.map((item: any) => (
                                            <div key={item.id}>
                                                {activeType === 'flights' && <FlightCard flight={item} />}
                                                {activeType === 'hotels' && <HotelCard hotel={item} />}
                                                {activeType === 'trains' && <TrainCard train={item} />}
                                                {activeType === 'visas' && (
                                                    // Placeholder for Visa card in search results, generally visas are on their own page
                                                    // But providing a fallback here just in case
                                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                                        <span className="font-bold">{item.country} Visa</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

