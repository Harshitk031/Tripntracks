"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, FileCheck, CheckCircle2, Plane, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import mockData from '@/lib/mockData.json';

export default function VisaPageClient() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredVisas = mockData.visas.filter((v: any) =>
        v.country.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Hero Section */}
            <div className="relative h-[400px] bg-blue-900 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=2000"
                        alt="Travel Background"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent"></div>
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Visa Applications, <span className="text-blue-400">Simplified.</span>
                    </h1>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto font-light">
                        Get your travel documents sorted with our express processing and 99.9% approval rate assistance.
                    </p>

                    <div className="max-w-xl mx-auto relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Where do you want to go?"
                            className="block w-full pl-11 pr-4 py-4 rounded-xl text-gray-900 bg-white/95 backdrop-blur-sm border-0 ring-1 ring-white/20 focus:ring-2 focus:ring-blue-500 shadow-xl transition-all placeholder:text-gray-400"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Features / Steps */}
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: FileCheck, title: "Documents Verified", desc: "Our experts review your documents before submission.", color: "text-blue-600", bg: "bg-blue-50" },
                        { icon: ShieldCheck, title: "Secure Processing", desc: "Bank-grade encryption for your personal data.", color: "text-green-600", bg: "bg-green-50" },
                        { icon: Clock, title: "On-Time Delivery", desc: "Real-time tracking and guaranteed timelines.", color: "text-purple-600", bg: "bg-purple-50" }
                    ].map((feature, idx) => (
                        <div key={idx} className="flex items-start p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className={`p-3 rounded-xl ${feature.bg} ${feature.color} mr-4`}>
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg mb-2">{feature.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Visa Grid */}
            <div className="max-w-7xl mx-auto pb-24 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Popular Destinations</h2>
                    <span className="text-gray-500 hidden sm:block">Showing {filteredVisas.length} locations</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredVisas.map((visa: any) => (
                        <div key={visa.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
                            {/* Card Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={visa.cardImage || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800'}
                                    alt={visa.country}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-lg px-3 py-1 text-xs font-bold text-gray-800 shadow-sm border border-white/50">
                                    {visa.type}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center mb-4">
                                    <img src={visa.flag} alt={`${visa.country} flag`} className="w-8 h-8 rounded-full border border-gray-200 shadow-sm mr-3 object-cover" />
                                    <h3 className="text-xl font-bold text-gray-900">{visa.country}</h3>
                                </div>

                                <div className="space-y-3 mb-6 flex-1">
                                    <div className="flex items-center justify-between text-sm py-2 border-b border-gray-50">
                                        <span className="text-gray-500 flex items-center gap-2"><Clock className="w-4 h-4" /> Processing</span>
                                        <span className="font-medium text-gray-900">{visa.processingTime}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm py-2 border-b border-gray-50">
                                        <span className="text-gray-500">Starting Price</span>
                                        <span className="font-bold text-lg text-blue-600">₹{visa.price.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="pt-2">
                                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">Requirements</p>
                                        <div className="flex flex-wrap gap-2">
                                            {visa.requirements.slice(0, 3).map((req: string, i: number) => (
                                                <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md border border-gray-200">
                                                    {req}
                                                </span>
                                            ))}
                                            {visa.requirements.length > 3 && (
                                                <span className="text-xs text-gray-400 px-1 py-1">+{visa.requirements.length - 3}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    href={`/book/${visa.id}?type=visas`}
                                    className="w-full mt-auto flex items-center justify-center gap-2 bg-gray-900 hover:bg-blue-600 text-white py-3 rounded-xl font-medium transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/25"
                                >
                                    Apply Now <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
