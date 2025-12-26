"use client";

import React, { useState } from 'react';
import { Plane, Hotel, Train, FileText, Search, Calendar, MapPin, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useBooking } from '@/context/BookingContext';
import { Vertical } from '@/types/booking';

export default function SearchWidget() {
    const router = useRouter();
    const { search, setSearch } = useBooking();
    const [activeTab, setActiveTab] = useState<Vertical>('flights');

    const handleSearch = () => {
        const params = new URLSearchParams();
        params.set('type', activeTab);
        if (search.from) params.set('from', search.from);
        if (search.to) params.set('to', search.to);
        router.push(`/search/results?${params.toString()}`);
    };

    const tabs = [
        { id: 'flights', label: 'Flights', icon: Plane },
        { id: 'hotels', label: 'Stays', icon: Hotel },
        { id: 'trains', label: 'Trains', icon: Train },
        { id: 'visas', label: 'Visas', icon: FileText },
    ] as const;

    return (
        <div className="w-full max-w-5xl mx-auto relative -mt-32 z-20 px-4">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-gray-100">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex-1 flex items-center justify-center py-5 text-sm font-medium transition-all duration-300 relative overflow-hidden",
                                    isActive
                                        ? "text-blue-600 bg-blue-50/50"
                                        : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                                )}
                            >
                                <Icon className={cn("w-5 h-5 mr-2 mb-0.5", isActive && "animate-pulse")} />
                                {tab.label}
                                {isActive && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full mx-8"></div>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Search Form */}
                <div className="p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        {/* FROM - Location */}
                        <div className="md:col-span-3">
                            <div className="relative group bg-gray-50 rounded-xl px-4 py-3 border-2 border-transparent focus-within:border-blue-500 focus-within:bg-white transition-all duration-200">
                                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5 block">From</label>
                                <div className="flex items-center">
                                    <MapPin className="w-5 h-5 text-gray-400 mr-2 group-focus-within:text-blue-500 transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="City or Airport"
                                        className="w-full bg-transparent outline-none text-gray-900 font-semibold placeholder-gray-400 text-base"
                                        value={search.from}
                                        onChange={(e) => setSearch({ ...search, from: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* TO - Location */}
                        <div className="md:col-span-3">
                            <div className="relative group bg-gray-50 rounded-xl px-4 py-3 border-2 border-transparent focus-within:border-blue-500 focus-within:bg-white transition-all duration-200">
                                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5 block">
                                    {activeTab === 'hotels' ? 'Destination' : 'To'}
                                </label>
                                <div className="flex items-center">
                                    <MapPin className="w-5 h-5 text-gray-400 mr-2 group-focus-within:text-blue-500 transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="City or Airport"
                                        className="w-full bg-transparent outline-none text-gray-900 font-semibold placeholder-gray-400 text-base"
                                        value={search.to}
                                        onChange={(e) => setSearch({ ...search, to: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* DATES & GUESTS */}
                        <div className="md:col-span-4 flex gap-2">
                            <div className="flex-1 relative group bg-gray-50 rounded-xl px-4 py-3 border-2 border-transparent focus-within:border-blue-500 focus-within:bg-white transition-all duration-200">
                                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5 block">Departure</label>
                                <div className="flex items-center">
                                    <Calendar className="w-5 h-5 text-gray-400 mr-2 group-focus-within:text-blue-500 transition-colors" />
                                    <input type="date" className="w-full bg-transparent outline-none text-gray-900 font-semibold text-sm" />
                                </div>
                            </div>
                            <div className="w-1/3 relative group bg-gray-50 rounded-xl px-3 py-3 border-2 border-transparent focus-within:border-blue-500 focus-within:bg-white transition-all duration-200 cursor-pointer">
                                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5 block">Travellers</label>
                                <div className="flex items-center">
                                    <Users className="w-5 h-5 text-gray-400 mr-1" />
                                    <span className="text-gray-900 font-semibold text-sm">1</span>
                                </div>
                            </div>
                        </div>

                        {/* SEARCH BUTTON */}
                        <div className="md:col-span-2">
                            <button
                                onClick={handleSearch}
                                className="w-full h-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-orange-500/25 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center text-lg"
                            >
                                <Search className="w-5 h-5 mr-2" />
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
