"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BookingContextType, BookingItem, GuestDetails, SearchState, Vertical } from '../types/booking';

const defaultSearch: SearchState = {
    vertical: 'flights',
    from: '',
    to: '',
    date: undefined,
    travelers: 1,
};

const defaultGuest: GuestDetails = {
    fullName: '',
    email: '',
    phone: '',
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
    const [search, setSearch] = useState<SearchState>(defaultSearch);
    const [cart, setCart] = useState<BookingItem | null>(null);
    const [guestDetails, setGuestDetails] = useState<GuestDetails>(defaultGuest);

    const addToCart = (item: BookingItem) => {
        setCart(item);
    };

    const removeFromCart = () => {
        setCart(null);
    };

    const updateGuestDetails = (details: Partial<GuestDetails>) => {
        setGuestDetails((prev) => ({ ...prev, ...details }));
    };

    return (
        <BookingContext.Provider
            value={{
                search,
                setSearch,
                cart,
                addToCart,
                removeFromCart,
                guestDetails,
                updateGuestDetails,
            }}
        >
            {children}
        </BookingContext.Provider>
    );
}

export function useBooking() {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
}
