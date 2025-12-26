"use client";

import React from 'react';
import { useWishlist } from '@/context/WishlistContext';

export default function WishlistBadge() {
    const { likedIds } = useWishlist();

    if (likedIds.length === 0) return null;

    return (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 h-4 min-w-[16px] flex items-center justify-center rounded-full border-2 border-white shadow-sm animate-pulse-once">
            {likedIds.length}
        </span>
    );
}
