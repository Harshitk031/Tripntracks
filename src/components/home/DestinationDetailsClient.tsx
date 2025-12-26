"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import mockData from '@/lib/mockData.json';
import {
    ArrowLeft, Star, MapPin, Check, X, Calendar,
    Users, Clock, Sun, Camera, Info, ChevronDown, ChevronUp, Heart
} from 'lucide-react';
import Link from 'next/link';

interface DestinationDetailsClientProps {
    id: string;
}

export default function DestinationDetailsClient({ id }: DestinationDetailsClientProps) {
    const router = useRouter();
    const [openDay, setOpenDay] = useState<number | null>(0);
    const [guests, setGuests] = useState(2);
    const [date, setDate] = useState("");

    // Find destination
    const destination = mockData.destinations.find((d: any) => d.id === id);

    if (!destination) return null; // Or 404 page

    const dest: any = destination;

    // Fallback for images if array doesn't exist (using main image 5 times for bento effect)
    const gallery = dest.images || Array(5).fill(dest.image);

    // Mock data for missing fields
    const defaultIncluded = ["5 Star Accommodation", "Daily Breakfast", "Airport Transfers", "English Speaking Guide"];
    const defaultExcluded = ["International Flights", "Lunch & Dinner", "Visa Fees", "Personal Expenses"];
    const included = dest.included || defaultIncluded;
    const excluded = dest.excluded || defaultExcluded;

    const toggleDay = (idx: number) => {
        setOpenDay(openDay === idx ? null : idx);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* 1. HERO HEADER INFO */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-900 transition-colors flex items-center text-sm font-medium mb-4">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Search
                            </button>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{dest.name}</h1>
                            <div className="flex items-center space-x-4 text-gray-600">
                                <span className="flex items-center text-sm font-medium bg-green-50 text-green-700 px-2 py-1 rounded-md">
                                    <MapPin className="w-3.5 h-3.5 mr-1" />
                                    {dest.description}
                                </span>
                                <span className="flex items-center text-sm">
                                    <Star className="w-4 h-4 text-yellow-500 mr-1 fill-yellow-500" />
                                    <span className="font-bold text-gray-900 mr-1">{dest.rating}</span>
                                    <span className="text-gray-400">({dest.reviews || 120} reviews)</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <button className="p-3 bg-gray-100 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors">
                                <Heart className="w-5 h-5" />
                            </button>
                            <button className="p-3 bg-gray-100 rounded-full hover:bg-blue-50 hover:text-blue-500 transition-colors">
                                <ShareIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. BENTO IMAGE GRID */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[500px] md:h-[600px] rounded-3xl overflow-hidden relative">
                    <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden cursor-pointer">
                        <img src={gallery[0]} alt="Main" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                    </div>
                    <div className="hidden md:block relative group overflow-hidden cursor-pointer">
                        <img src={gallery[1]} alt="Gallery 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="hidden md:block relative group overflow-hidden cursor-pointer rounded-tr-3xl">
                        <img src={gallery[2]} alt="Gallery 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="hidden md:block relative group overflow-hidden cursor-pointer">
                        <img src={gallery[3]} alt="Gallery 3" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="hidden md:block relative group overflow-hidden cursor-pointer rounded-br-3xl">
                        <img src={gallery[4]} alt="Gallery 4" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-lg text-sm font-bold shadow-lg hover:bg-white transition-all flex items-center">
                            <Camera className="w-4 h-4 mr-2" />
                            View all photos
                        </button>
                    </div>
                </div>
            </div>

            {/* 3. MAIN CONTENT LAYOUT (70/30) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* LEFT COLUMN (70%) */}
                    <div className="lg:w-[70%] space-y-12">

                        {/* About Section */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">About this Destination</h2>
                            <div className="prose prose-lg text-gray-600 max-w-none">
                                <p className="leading-relaxed">
                                    {dest.longDescription || `Discover the enchanting beauty of ${dest.name}, a destination that promises unforgettable memories. From its rich cultural heritage to stunning natural landscapes, every corner tells a story.`}
                                </p>
                            </div>
                        </section>

                        {/* Highlights Section */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Highlights</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {dest.highlights?.map((highlight: string, idx: number) => (
                                    <div key={idx} className="flex items-start p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="bg-blue-50 p-2 rounded-lg mr-4 text-blue-600 mt-1">
                                            <Star className="w-5 h-5 fill-current" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{highlight}</h3>
                                            <p className="text-sm text-gray-500 mt-1">Must-visit attraction</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Included & Excluded */}
                        <section className="bg-white rounded-2xl p-8 border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div>
                                    <h3 className="text-sm uppercase tracking-wider text-green-600 font-bold mb-4 flex items-center">
                                        <Check className="w-4 h-4 mr-2" /> Included
                                    </h3>
                                    <ul className="space-y-3">
                                        {included.map((item: string, i: number) => (
                                            <li key={i} className="flex items-start text-gray-600">
                                                <Check className="w-5 h-5 text-green-500 mr-3 shrink-0" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="md:border-l md:pl-12 border-gray-100">
                                    <h3 className="text-sm uppercase tracking-wider text-red-500 font-bold mb-4 flex items-center">
                                        <X className="w-4 h-4 mr-2" /> Not Included
                                    </h3>
                                    <ul className="space-y-3">
                                        {excluded.map((item: string, i: number) => (
                                            <li key={i} className="flex items-start text-gray-500">
                                                <X className="w-5 h-5 text-red-400 mr-3 shrink-0" /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Daily Itinerary Accordion */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Daily Itinerary</h2>
                            <div className="space-y-4">
                                {dest.itinerary?.map((item: any, idx: number) => (
                                    <div key={idx} className="border border-gray-200 rounded-xl bg-white overflow-hidden transition-all duration-300 hover:shadow-md">
                                        <button
                                            onClick={() => toggleDay(idx)}
                                            className="w-full flex items-center justify-between p-6 text-left"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-colors ${openDay === idx ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                                                    {item.day}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                                                    <p className="text-sm text-gray-500">Detailed plan for Day {item.day}</p>
                                                </div>
                                            </div>
                                            {openDay === idx ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                                        </button>

                                        {openDay === idx && (
                                            <div className="px-6 pb-6 pl-20 border-t border-gray-100 pt-4 animate-fade-in-up">
                                                <p className="text-gray-600 leading-relaxed">
                                                    {item.desc}
                                                </p>
                                                <div className="mt-4 flex gap-3">
                                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Morning Activity</span>
                                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Sightseeing</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Know Before You Go */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Know Before You Go</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                                    <Sun className="w-8 h-8 text-orange-500 mb-4" />
                                    <h3 className="font-bold text-gray-900 mb-2">Weather</h3>
                                    <p className="text-sm text-gray-600">{dest.weather?.temp || "25°C"} average. {dest.weather?.season || "Pleasant weather"} expected.</p>
                                </div>
                                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                                    <Clock className="w-8 h-8 text-blue-500 mb-4" />
                                    <h3 className="font-bold text-gray-900 mb-2">Best Time</h3>
                                    <p className="text-sm text-gray-600">{dest.weather?.bestTime || "Year Round"}</p>
                                </div>
                                <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                                    <Info className="w-8 h-8 text-purple-500 mb-4" />
                                    <h3 className="font-bold text-gray-900 mb-2">Local Tips</h3>
                                    <p className="text-sm text-gray-600">Carry comfortable walking shoes and respectful attire for temples.</p>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* RIGHT COLUMN (30%) - STICKY WIDGET */}
                    <div className="lg:w-[30%] relative">
                        <div className="sticky top-24 space-y-6">

                            {/* Booking Card */}
                            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
                                <div className="bg-gray-900 p-6 text-white">
                                    <p className="text-sm text-gray-400 mb-1">Starting from</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-bold">₹{dest.price.toLocaleString('en-IN')}</span>
                                        <span className="text-gray-400">/ person</span>
                                    </div>
                                    <div className="mt-4 flex items-center text-sm text-green-400">
                                        <Check className="w-4 h-4 mr-1" /> Best Price Guarantee
                                    </div>
                                </div>

                                <div className="p-6 space-y-6">
                                    {/* Date Picker Mock */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Select Date</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <input
                                                type="date"
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                                                onChange={(e) => setDate(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    {/* Guest Counter Mock */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Travelers</label>
                                        <div className="relative">
                                            <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <select
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 font-medium appearance-none"
                                                value={guests}
                                                onChange={(e) => setGuests(parseInt(e.target.value))}
                                            >
                                                <option value={1}>1 Traveler</option>
                                                <option value={2}>2 Travelers</option>
                                                <option value={4}>4 Travelers (Family)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100 flex justify-between text-sm font-medium text-gray-600">
                                        <span>Total ({guests} Guest{guests > 1 && 's'})</span>
                                        <span className="text-gray-900 font-bold">₹{(dest.price * guests).toLocaleString('en-IN')}</span>
                                    </div>

                                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all transform active:scale-95 text-lg">
                                        Book This Trip
                                    </button>

                                    <p className="text-center text-xs text-gray-400">
                                        No payment required today.
                                    </p>
                                </div>
                            </div>

                            {/* Help Box */}
                            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm text-center">
                                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                                    <Info className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-gray-900">Need Help?</h4>
                                <p className="text-sm text-gray-500 mt-2 mb-4">Call our expert travel team 24/7.</p>
                                <a href="tel:+919876543210" className="text-blue-600 font-bold hover:underline">
                                    +91 987 654 3210
                                </a>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {/* 4. SIMILAR DESTINATIONS SECTION */}
            <div className="mt-16 py-16 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {mockData.destinations.filter((d: any) => d.id !== id).slice(0, 4).map((d: any) => (
                            <Link href={`/destination/${d.id}`} key={d.id} className="group block">
                                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4">
                                    <img src={d.image} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold flex items-center">
                                        <Star className="w-3 h-3 text-yellow-500 mr-1 fill-yellow-500" /> {d.rating}
                                    </div>
                                </div>
                                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{d.name}</h3>
                                <p className="text-sm text-gray-500">Starting from ₹{d.price.toLocaleString('en-IN')}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

function ShareIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" x2="12" y1="2" y2="15" /></svg>
    )
}
