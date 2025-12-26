"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import mockData from '@/lib/mockData.json';
import BookingSummary from '@/components/booking/BookingSummary';
import { useBooking } from '@/context/BookingContext';
import { ArrowLeft, Clock, MapPin, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface BookingDetailsClientProps {
    id: string;
    type: string;
}

export default function BookingDetailsClient({ id, type }: BookingDetailsClientProps) {
    const router = useRouter();
    const { addToCart } = useBooking();

    // Helper to find item
    const findItem = () => {
        const list = (mockData as any)[type] || [];
        return list.find((i: any) => i.id === id);
    };

    const item = findItem();

    if (!item) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Item Not Found</h2>
                    <Link href="/" className="text-blue-600 hover:underline">Return Home</Link>
                </div>
            </div>
        );
    }

    const handleProceed = () => {
        addToCart({
            id: item.id,
            type: type as any,
            title: item.name || item.airline || item.trainName || item.country,
            subtitle: item.location || item.flightNumber || item.trainNumber || item.type,
            price: item.price || item.pricePerNight || (item.classes ? item.classes[0].price : 0),
            image: item.image || item.logo || item.flag,
            details: item
        });
        router.push('/checkout');
    };

    const price = item.price || item.pricePerNight || (item.classes ? item.classes[0].price : 0);

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <button onClick={() => router.back()} className="flex items-center text-gray-500 hover:text-gray-900 mb-6 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Results
                </button>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="flex-1">

                        {/* Header / Gallery */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                            {(item.image || item.flag) && (
                                <div className="h-64 md:h-96 w-full relative">
                                    <img src={item.image || item.flag} alt="Cover" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-8 text-white">
                                        <h1 className="text-3xl md:text-4xl font-bold mb-2">{item.name || item.airline || item.trainName || item.country}</h1>
                                        {item.location && <div className="flex items-center"><MapPin className="w-5 h-5 mr-2" />{item.location}</div>}
                                    </div>
                                </div>
                            )}

                            {!item.image && !item.flag && (
                                <div className="p-8 border-b border-gray-100">
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.airline || item.trainName}</h1>
                                    <p className="text-gray-500">{item.flightNumber || item.trainNumber}</p>
                                </div>
                            )}
                        </div>

                        {/* Details Grid */}
                        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Itinerary & Details</h2>

                            {type === 'flights' && (
                                <div className="flex justify-between items-center p-6 bg-gray-50 rounded-lg">
                                    <div className="text-center">
                                        <div className="text-lg font-bold">{item.departureTime}</div>
                                        <div className="text-sm text-gray-500">{item.from}</div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-xs text-gray-400 mb-1">{item.duration}</span>
                                        <div className="w-20 h-[1px] bg-gray-300"></div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold">{item.arrivalTime}</div>
                                        <div className="text-sm text-gray-500">{item.to}</div>
                                    </div>
                                </div>
                            )}

                            {type === 'hotels' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {item.amenities.map((am: string) => (
                                        <div key={am} className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                            {am}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {type === 'visas' && (
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-gray-900">Requirements</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                                        {item.requirements.map((req: string) => (
                                            <li key={req}>{req}</li>
                                        ))}
                                    </ul>
                                    <p className="mt-4 text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                                        Processing Time: {item.processingTime}
                                    </p>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-1/3">
                        <BookingSummary price={price} onProceed={handleProceed} />
                    </div>
                </div>
            </div>
        </div>
    );
}
