"use client";

import React from 'react';
import mockData from '@/lib/mockData.json';
import { Star, MapPin, Heart, Flame } from 'lucide-react';
import Link from 'next/link';

interface TrendingDestinationsProps {
    selectedCategory?: string | null;
}

import { useWishlist } from '@/context/WishlistContext';

export default function TrendingDestinations({ selectedCategory }: TrendingDestinationsProps) {
    const { destinations } = mockData;
    const { isLiked, toggleLike } = useWishlist();

    const filteredDestinations = selectedCategory
        ? destinations.filter(d => d.categories?.includes(selectedCategory))
        : destinations;

    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Trending Destinations</h2>
                        <p className="text-lg text-gray-600 max-w-2xl">Curated list of the world's most desired locations for this season.</p>
                    </div>
                    <Link href="/search/results?type=destinations" className="hidden md:block text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                        View All Destinations &rarr;
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredDestinations.map((dest, idx) => {
                        const liked = isLiked(dest.id);
                        return (
                            <Link href={`/destination/${dest.id}`} key={dest.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 block">
                                {/* Image Container */}
                                <div className="aspect-[4/5] overflow-hidden relative">
                                    <img
                                        src={dest.image}
                                        alt={dest.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                                    {/* Badges */}
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        {idx < 3 && (
                                            <span className="bg-orange-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider flex items-center shadow-sm">
                                                <Flame className="w-3 h-3 mr-1" /> Trending
                                            </span>
                                        )}
                                    </div>

                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            toggleLike(dest.id);
                                        }}
                                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-sm group-hover:scale-110 ${liked ? 'bg-white text-red-500' : 'bg-white/20 text-white hover:bg-white hover:text-red-500'}`}
                                    >
                                        <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                                    </button>

                                    <div className="absolute top-3 right-12 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg text-white text-xs font-bold flex items-center border border-white/20">
                                        <Star className="w-3 h-3 text-yellow-400 mr-1 fill-yellow-400" />
                                        {dest.rating}
                                    </div>

                                    {/* Content Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                        <h3 className="text-xl font-bold text-white mb-1 leading-tight group-hover:text-blue-300 transition-colors">{dest.name}</h3>
                                        <div className="flex items-center text-gray-300 text-xs mb-3">
                                            <MapPin className="w-3 h-3 mr-1 text-blue-400" />
                                            <span className="truncate">{dest.description}</span>
                                        </div>

                                        <div className="flex items-center justify-between border-t border-white/20 pt-3 mt-3">
                                            <div>
                                                <p className="text-[10px] text-gray-300 uppercase tracking-widest font-semibold">Starting from</p>
                                                <p className="text-lg font-bold text-white">₹{dest.price.toLocaleString('en-IN')}</p>
                                            </div>
                                            <span className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded-lg transition-colors backdrop-blur-sm">
                                                View
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>


                <div className="mt-12 text-center md:hidden">
                    <button className="text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                        View All Destinations &rarr;
                    </button>
                </div>
            </div>
        </section>
    );
}
