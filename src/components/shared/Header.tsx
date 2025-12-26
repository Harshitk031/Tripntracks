"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, User, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Header() {
    const pathname = usePathname();
    const isDashboard = pathname.startsWith('/dashboard');

    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-gray-100 z-50 px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow-sm">
            <Link href="/" className="flex items-center gap-2 group">
                <div className="bg-gradient-to-tr from-orange-500 to-red-600 text-white p-2 rounded-xl transform group-hover:rotate-3 transition-transform">
                    {/* Compass Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>
                </div>
                <span className="text-2xl font-black text-gray-900 tracking-tight group-hover:text-orange-600 transition-colors">Tripntracks<span className="text-orange-500">.</span></span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
                <Link href="/" className="text-sm font-semibold text-gray-600 hover:text-orange-600 transition-colors">Home</Link>
                <Link href="/search/results?type=flights" className="text-sm font-semibold text-gray-600 hover:text-orange-600 transition-colors">Flights</Link>
                <Link href="/search/results?type=hotels" className="text-sm font-semibold text-gray-600 hover:text-orange-600 transition-colors">Hotels</Link>
                <Link href="/visa" className="text-sm font-semibold text-gray-600 hover:text-orange-600 transition-colors">Visa Guide</Link>
            </nav>

            <div className="flex items-center gap-4">
                <Link
                    href="/dashboard/bookings"
                    className="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-orange-600 transition-colors bg-gray-50 px-4 py-2 rounded-full hover:bg-orange-50"
                >
                    <Briefcase className="w-4 h-4" />
                    <span>My Trips</span>
                </Link>
                <Link
                    href={isDashboard ? "/" : "/dashboard"}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 transition-colors"
                >
                    <User className="w-5 h-5" />
                </Link>
            </div>
        </header>
    );
}
