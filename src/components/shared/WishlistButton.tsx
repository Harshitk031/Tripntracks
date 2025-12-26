"use client";

import React from 'react';
import { useWishlist } from '@/context/WishlistContext';
import { Heart } from 'lucide-react';

interface WishlistButtonProps {
    id: string;
    className?: string;
}

export default function WishlistButton({ id, className }: WishlistButtonProps) {
    const { isLiked, toggleLike } = useWishlist();
    const liked = isLiked(id);

    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleLike(id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-sm hover:scale-110 ${liked ? 'bg-white text-red-500' : 'bg-white/20 text-white hover:bg-white hover:text-red-500'} ${className}`}
        >
            <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
        </button>
    );
}
