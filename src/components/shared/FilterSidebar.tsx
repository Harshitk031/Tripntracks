"use client";

import React, { useState } from 'react';
import { Vertical } from '@/types/booking';
import { Star } from 'lucide-react';

interface FilterSidebarProps {
    type: Vertical;
}

export default function FilterSidebar({ type }: FilterSidebarProps) {
    const [priceRange, setPriceRange] = useState(200000);

    if (type === 'destinations') {
        return (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Filter Destinations</h3>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">Region</label>
                        <div className="space-y-2">
                            {['Europe', 'Asia', 'Americas', 'Oceania'].map(r => (
                                <label key={r} className="flex items-center">
                                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                                    <span className="ml-2 text-sm text-gray-600">{r}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-900">Filters</h3>
                <button className="text-sm text-blue-600 font-medium hover:underline">Reset</button>
            </div>

            {/* Price Filter */}
            <div className="mb-8">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Max Price</label>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">$0</span>
                    <span className="text-sm font-bold text-gray-900">${priceRange}</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="2000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
            </div>

            {/* Vertical Specific Filters */}
            {type === 'flights' && (
                <div className="mb-6">
                    <label className="text-sm font-semibold text-gray-700 mb-3 block">Stops</label>
                    <div className="space-y-2">
                        {['Direct', '1 Stop', '2+ Stops'].map((stop) => (
                            <label key={stop} className="flex items-center">
                                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                <span className="ml-2 text-gray-600 text-sm">{stop}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {type === 'hotels' && (
                <div className="mb-6">
                    <label className="text-sm font-semibold text-gray-700 mb-3 block">Star Rating</label>
                    <div className="space-y-2">
                        {[5, 4, 3].map((star) => (
                            <label key={star} className="flex items-center">
                                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                <div className="ml-2 flex items-center">
                                    {Array.from({ length: star }).map((_, i) => (
                                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                    ))}
                                    <span className="ml-2 text-gray-600 text-sm">{star} Stars</span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {type === 'trains' && (
                <div className="mb-6">
                    <label className="text-sm font-semibold text-gray-700 mb-3 block">Class</label>
                    <div className="space-y-2">
                        {['First Class', 'Sleeper', 'AC Chair'].map((cls) => (
                            <label key={cls} className="flex items-center">
                                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                <span className="ml-2 text-gray-600 text-sm">{cls}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
