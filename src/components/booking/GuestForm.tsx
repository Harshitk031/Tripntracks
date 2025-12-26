"use client";

import React, { useEffect } from 'react';
import { useBooking } from '@/context/BookingContext';

export default function GuestForm() {
    const { guestDetails, updateGuestDetails } = useBooking();

    // Basic validation could go here

    return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Guest Details</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        value={guestDetails.fullName}
                        onChange={(e) => updateGuestDetails({ fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            placeholder="john@example.com"
                            value={guestDetails.email}
                            onChange={(e) => updateGuestDetails({ email: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            placeholder="+1 234 567 890"
                            value={guestDetails.phone}
                            onChange={(e) => updateGuestDetails({ phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
