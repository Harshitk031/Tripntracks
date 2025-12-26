import React from 'react';
import { Plane, Hotel, CheckCircle, Clock } from 'lucide-react';

const bookings = [
    {
        id: 'TRIP-1023',
        type: 'flight',
        title: 'New York (JFK) to London (LHR)',
        date: 'Oct 15, 2025',
        status: 'Confirmed',
        amount: 450,
        icon: Plane
    },
    {
        id: 'HOTEL-5501',
        type: 'hotel',
        title: 'Grand Plaza Hotel, Paris',
        date: 'Nov 20, 2025',
        status: 'Pending',
        amount: 250,
        icon: Hotel
    }
];

export default function BookingsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {bookings.map((booking, index) => {
                    const Icon = booking.icon;
                    const isConfirmed = booking.status === 'Confirmed';

                    return (
                        <div key={booking.id} className="p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{booking.title}</h3>
                                        <div className="text-sm text-gray-500">Booking ID: {booking.id} • {booking.date}</div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="font-bold text-gray-900 mb-1">${booking.amount}</div>
                                    <span className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${isConfirmed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {isConfirmed ? <CheckCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                                        {booking.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
