import React from 'react';
import LikedDestinations from '@/components/home/LikedDestinations';
import { Heart } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Your Wishlist - Tripntracks',
    description: 'View your saved destinations.',
};

export default function WishlistPage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-red-100 rounded-full">
                        <Heart className="w-8 h-8 text-red-600 fill-red-600" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">Your Wishlist</h1>
                        <p className="text-gray-600">All your dream destinations in one place.</p>
                    </div>
                </div>
            </div>

            {/* We reuse the LikedDestinations component with hidden header */}
            <LikedDestinations hideHeader={true} />
        </div>
    );
}
