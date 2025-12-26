"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface WishlistContextType {
    likedIds: string[];
    toggleLike: (id: string) => void;
    isLiked: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [likedIds, setLikedIds] = useState<string[]>([]);

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('tripntracks_wishlist');
        if (saved) {
            try {
                setLikedIds(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse wishlist", e);
            }
        }
    }, []);

    // Save to local storage whenever changed
    useEffect(() => {
        localStorage.setItem('tripntracks_wishlist', JSON.stringify(likedIds));
    }, [likedIds]);

    const toggleLike = (id: string) => {
        setLikedIds(prev => {
            if (prev.includes(id)) {
                return prev.filter(item => item !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const isLiked = (id: string) => likedIds.includes(id);

    return (
        <WishlistContext.Provider value={{ likedIds, toggleLike, isLiked }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
}
