import React from 'react';
import { MapPin, Star, Wifi, Coffee } from 'lucide-react';
import Link from 'next/link';

interface HotelCardProps {
    hotel: any;
}

export default function HotelCard({ hotel }: HotelCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex flex-col md:flex-row">
            {/* Image */}
            <div className="w-full md:w-1/3 aspect-video md:aspect-auto">
                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" loading="lazy" />
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{hotel.name}</h3>
                        <div className="flex items-center bg-blue-50 px-2 py-1 rounded text-blue-700 text-xs font-bold">
                            {hotel.rating} / 5
                        </div>
                    </div>

                    <div className="flex items-center text-gray-500 text-sm mb-4">
                        <MapPin className="w-4 h-4 mr-1" />
                        {hotel.location}
                    </div>

                    <div className="flex gap-4 mb-4">
                        {hotel.amenities.slice(0, 3).map((am: string) => (
                            <div key={am} className="flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                                {am === "WiFi" ? <Wifi className="w-3 h-3 mr-1" /> : <Coffee className="w-3 h-3 mr-1" />}
                                {am}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-end justify-between pt-4 border-t border-gray-100">
                    <div>
                        <span className="text-xs text-gray-400">Starts from</span>
                        <div className="text-2xl font-bold text-gray-900">₹{hotel.pricePerNight.toLocaleString('en-IN')} <span className="text-sm font-normal text-gray-400">/ night</span></div>
                    </div>
                    <Link
                        href={`/book/${hotel.id}?type=hotels`}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
