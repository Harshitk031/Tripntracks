import React from 'react';
import { MapPin, Star, Wifi, Coffee, Sparkles, Utensils, Waves, Mountain } from 'lucide-react';
import Link from 'next/link';

interface HotelCardProps {
    hotel: any;
}

export default function HotelCard({ hotel }: HotelCardProps) {
    // Dynamic color for rating
    const getRatingColor = (rating: number) => {
        if (rating >= 4.5) return 'bg-emerald-600 text-white shadow-emerald-200';
        if (rating >= 4.0) return 'bg-blue-600 text-white shadow-blue-200';
        return 'bg-orange-500 text-white shadow-orange-200';
    };

    // Helper for amenity icons
    const getAmenityIcon = (amenity: string) => {
        const lower = amenity.toLowerCase();
        if (lower.includes('wifi')) return <Wifi className="w-3 h-3" />;
        if (lower.includes('pool') || lower.includes('beach')) return <Waves className="w-3 h-3" />;
        if (lower.includes('food') || lower.includes('dining') || lower.includes('breakfast')) return <Utensils className="w-3 h-3" />;
        if (lower.includes('view') || lower.includes('nature')) return <Mountain className="w-3 h-3" />;
        return <Sparkles className="w-3 h-3" />;
    };

    return (
        <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100 flex flex-col md:flex-row h-full">
            {/* Immersive Image Section */}
            <div className="w-full md:w-2/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gray-200 animate-pulse" /> {/* Placeholder */}
                <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                {/* Floating Rating Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg ${getRatingColor(hotel.rating)}`}>
                    <Star className="w-3 h-3 fill-current" />
                    {hotel.rating} / 5
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center text-white/90 text-xs font-medium backdrop-blur-md bg-black/30 px-3 py-1.5 rounded-xl w-fit">
                        <MapPin className="w-3.5 h-3.5 mr-1" />
                        <span className="truncate">{hotel.location}</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between bg-white relative">
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-50 to-transparent rounded-bl-full opacity-50"></div>

                <div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2 leading-tight group-hover:text-blue-900 transition-colors">
                        {hotel.name}
                    </h3>

                    {/* Tags / Amenities */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        {hotel.amenities.slice(0, 4).map((am: string, idx: number) => {
                            // Alternate colors for variety
                            const colors = [
                                'bg-blue-50 text-blue-700 border-blue-100',
                                'bg-purple-50 text-purple-700 border-purple-100',
                                'bg-emerald-50 text-emerald-700 border-emerald-100',
                                'bg-orange-50 text-orange-700 border-orange-100'
                            ];
                            return (
                                <div key={am} className={`flex items-center text-[11px] font-bold px-3 py-1.5 rounded-lg border ${colors[idx % colors.length]} transition-transform hover:scale-105`}>
                                    {getAmenityIcon(am)}
                                    <span className="ml-1.5">{am}</span>
                                </div>
                            );
                        })}
                        {hotel.amenities.length > 4 && (
                            <div className="flex items-center text-[10px] font-bold px-2 py-1.5 rounded-lg bg-gray-50 text-gray-500 border border-gray-100">
                                +{hotel.amenities.length - 4} more
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-end justify-between pt-6 mt-4 border-t border-gray-50">
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Nightly avg.</p>
                        <div className="text-3xl font-black text-gray-900 tracking-tight">
                            ₹{hotel.pricePerNight.toLocaleString('en-IN')}
                        </div>
                    </div>

                    <Link
                        href={`/book/${hotel.id}?type=hotels`}
                        className="bg-gray-900 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-orange-200 transform hover:-translate-y-0.5"
                    >
                        View & Book
                    </Link>
                </div>
            </div>
        </div>
    );
}
