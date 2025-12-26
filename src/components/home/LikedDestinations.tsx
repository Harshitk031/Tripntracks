"use client";

import React from 'react';
import { useWishlist } from '@/context/WishlistContext';
import mockData from '@/lib/mockData.json';
import Link from 'next/link';
import { Heart, Star, MapPin } from 'lucide-react';

interface LikedDestinationsProps {
    hideHeader?: boolean;
}

export default function LikedDestinations({ hideHeader = false }: LikedDestinationsProps) {
    const { likedIds, toggleLike } = useWishlist();
    const { destinations } = mockData;

    if (likedIds.length === 0) {
        return (
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
                    <p>No items in your wishlist yet.</p>
                    <Link href="/search/results?type=destinations" className="text-blue-600 hover:underline">Explore destinations</Link>
                </div>
            </section>
        );
    }

    const likedDestinations = destinations.filter(d => likedIds.includes(d.id));

    return (
        <section className={`bg-white ${hideHeader ? '' : 'py-12'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {!hideHeader && (
                    <div className="flex items-center gap-2 mb-8">
                        <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                        <h2 className="text-2xl font-bold text-gray-900">Your Wishlist</h2>
                        <span className="text-sm font-medium bg-red-50 text-red-600 px-2.5 py-0.5 rounded-full">
                            {likedDestinations.length}
                        </span>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {likedDestinations.map((dest) => (
                        <div key={dest.id} className="relative group">
                            <Link href={`/destination/${dest.id}`} className="block bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="aspect-[4/3] relative">
                                    <img
                                        src={dest.image}
                                        alt={dest.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold flex items-center shadow-sm">
                                        <Star className="w-3 h-3 text-yellow-500 mr-1 fill-yellow-500" />
                                        {dest.rating}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-gray-900 mb-1 truncate">{dest.name}</h3>
                                    <div className="flex items-center text-xs text-gray-500 mb-3">
                                        <MapPin className="w-3 h-3 mr-1" />
                                        <span className="truncate">{dest.description}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm font-bold text-blue-600">₹{dest.price.toLocaleString('en-IN')}</p>
                                        <span className="text-xs text-blue-600 hover:underline">View Details</span>
                                    </div>
                                </div>
                            </Link>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleLike(dest.id);
                                }}
                                className="absolute top-2 left-2 p-1.5 rounded-full bg-white/90 text-red-500 shadow-sm hover:scale-110 transition-transform"
                            >
                                <Heart className="w-4 h-4 fill-current" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
