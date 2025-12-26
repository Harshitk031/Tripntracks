"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Vertical } from '@/types/booking';
import { Star } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilterSidebarProps {
    type: Vertical;
}

export default function FilterSidebar({ type }: FilterSidebarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Initialize state from URL params
    const [priceRange, setPriceRange] = useState(Number(searchParams.get('max_price')) || 200000);
    const [selectedStops, setSelectedStops] = useState<string[]>(searchParams.get('stops')?.split(',') || []);
    const [selectedStars, setSelectedStars] = useState<string[]>(searchParams.get('stars')?.split(',') || []);
    const [selectedClasses, setSelectedClasses] = useState<string[]>(searchParams.get('classes')?.split(',') || []);

    // Create a function to update URL
    const createQueryString = useCallback((name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(name, value);
        } else {
            params.delete(name);
        }
        return params.toString();
    }, [searchParams]);

    // Update URL when price changes (Debounced)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const currentPrice = Number(searchParams.get('max_price')) || 200000;
            if (currentPrice !== priceRange) {
                router.push(`?${createQueryString('max_price', priceRange.toString())}`, { scroll: false });
            }
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [priceRange, router, createQueryString, searchParams]);

    // Handle Checkbox Changes
    const handleCheckboxChange = (value: string, currentValues: string[], setFn: (vals: string[]) => void, paramName: string) => {
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];

        setFn(newValues);
        const paramValue = newValues.length > 0 ? newValues.join(',') : '';
        router.push(`?${createQueryString(paramName, paramValue)}`, { scroll: false });
    };

    if (type === 'destinations') {
        const selectedRegions = searchParams.get('regions')?.split(',') || [];
        return (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Filter Destinations</h3>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">Region/Category</label>
                        <div className="space-y-2">
                            {['Honeymoon', 'Adventure', 'Nature', 'Heritage', 'Solo'].map(r => (
                                <label key={r} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedRegions.includes(r)}
                                        onChange={() => {
                                            const newRegions = selectedRegions.includes(r)
                                                ? selectedRegions.filter((reg: string) => reg !== r)
                                                : [...selectedRegions, r];
                                            router.push(`?${createQueryString('regions', newRegions.join(','))}`, { scroll: false });
                                        }}
                                        className="rounded text-blue-600 focus:ring-blue-500"
                                    />
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
                <button
                    onClick={() => router.push('?', { scroll: false })}
                    className="text-sm text-blue-600 font-medium hover:underline"
                >
                    Reset
                </button>
            </div>

            {/* Price Filter */}
            <div className="mb-8">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Max Price</label>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">₹0</span>
                    <span className="text-sm font-bold text-gray-900">₹{priceRange.toLocaleString('en-IN')}</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="200000"
                    step="1000"
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
                        {['0', '1', '2+'].map((stopLabel, idx) => {
                            // Map UI label to value logic: '0' -> '0', '1' -> '1', '2+' -> '2'
                            const val = idx === 2 ? '2' : String(idx);
                            const display = idx === 0 ? 'Direct' : (idx === 1 ? '1 Stop' : '2+ Stops');

                            return (
                                <label key={val} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedStops.includes(val)}
                                        onChange={() => handleCheckboxChange(val, selectedStops, setSelectedStops, 'stops')}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-gray-600 text-sm">{display}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>
            )}

            {type === 'hotels' && (
                <div className="mb-6">
                    <label className="text-sm font-semibold text-gray-700 mb-3 block">Star Rating</label>
                    <div className="space-y-2">
                        {['5', '4', '3'].map((star) => (
                            <label key={star} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedStars.includes(star)}
                                    onChange={() => handleCheckboxChange(star, selectedStars, setSelectedStars, 'stars')}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <div className="ml-2 flex items-center">
                                    {Array.from({ length: Number(star) }).map((_, i) => (
                                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                    ))}
                                    <span className="ml-2 text-gray-600 text-sm">{star} Stars</span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
