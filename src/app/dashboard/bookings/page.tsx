import React from 'react';
import { Plane, Hotel, CheckCircle, Clock, MapPin, Calendar, ArrowRight, Sparkles } from 'lucide-react';

interface FlightBooking {
    id: string;
    type: 'flight';
    from: string;
    to: string;
    date: string;
    time: string;
    status: string;
    amount: number;
    airline: string;
    seat: string;
    gate: string;
    class: string;
    image: string;
}

interface HotelBooking {
    id: string;
    type: 'hotel';
    name: string;
    location: string;
    date: string;
    nights: number;
    status: string;
    amount: number;
    image: string;
}

type Booking = FlightBooking | HotelBooking;

const bookings: Booking[] = [
    {
        id: 'TRIP-1023',
        type: 'flight',
        from: 'New York (JFK)',
        to: 'London (LHR)',
        date: 'Oct 15, 2025',
        time: '10:30 AM',
        status: 'Confirmed',
        amount: 45000,
        airline: 'British Airways',
        seat: '12A',
        gate: 'B4',
        class: 'Business',
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=1000' // London
    },
    {
        id: 'HOTEL-5501',
        type: 'hotel',
        name: 'Grand Plaza Hotel',
        location: 'Paris, France',
        date: 'Nov 20, 2025',
        nights: 3,
        status: 'Upcoming',
        amount: 25000,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000' // Luxury Hotel
    },
    {
        id: 'TRIP-1045',
        type: 'flight',
        from: 'Mumbai (BOM)',
        to: 'Dubai (DXB)',
        date: 'Dec 10, 2025',
        time: '04:15 PM',
        status: 'Processing',
        amount: 18000,
        airline: 'Emirates',
        seat: '24F',
        gate: 'T2',
        class: 'Economy',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea936a794cb?auto=format&fit=crop&q=80&w=1000' // Dubai
    }
];

export default function BookingsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 flex items-center gap-2">
                        My Adventures <Sparkles className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                    </h1>
                    <p className="text-gray-500 mt-1">Manage your upcoming trips and tickets</p>
                </div>
            </div>

            <div className="space-y-6">
                {bookings.map((booking) => (
                    <div
                        key={booking.id}
                        className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
                    >
                        {/* Status Badge */}
                        <div className="absolute top-4 right-4 z-10">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-md ${booking.status === 'Confirmed' ? 'bg-emerald-500/90 text-white' :
                                booking.status === 'Processing' ? 'bg-orange-500/90 text-white' :
                                    'bg-blue-500/90 text-white'
                                }`}>
                                {booking.status === 'Confirmed' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                {booking.status}
                            </span>
                        </div>

                        <div className="flex flex-col md:flex-row h-full">
                            {/* Visual Side */}
                            <div className="w-full md:w-1/3 relative h-48 md:h-auto overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10 md:hidden" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                                <img
                                    src={booking.image}
                                    alt="Trip Destination"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute bottom-4 left-4 z-20 text-white">
                                    <div className="text-xs font-medium opacity-90 uppercase tracking-wider mb-1">
                                        {booking.type === 'flight' ? 'Flight to' : 'Stay at'}
                                    </div>
                                    <div className="text-2xl font-black leading-none">
                                        {booking.type === 'flight' ? booking.to.split('(')[0] : booking.name}
                                    </div>
                                </div>
                            </div>

                            {/* Ticket Details Side */}
                            <div className="flex-1 p-6 md:p-8 flex flex-col justify-between relative bg-white">
                                {/* Decorative "Tear" circles for ticket look */}
                                <div className="absolute -left-3 top-1/2 w-6 h-6 bg-gray-50 rounded-full hidden md:block" />

                                {booking.type === 'flight' && (
                                    <>
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
                                            <div className="flex-1 w-full">
                                                <div className="flex items-center justify-between text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">
                                                    <span>{booking.date}</span>
                                                    <span>{booking.airline}</span>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div>
                                                        <div className="text-2xl font-black text-gray-900">{booking.from.split('(')[1].replace(')', '')}</div>
                                                        <div className="text-xs text-gray-500">{booking.from.split('(')[0]}</div>
                                                    </div>
                                                    <div className="flex-1 border-b-2 border-dashed border-gray-200 relative mx-4">
                                                        <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90" />
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-2xl font-black text-gray-900">{booking.to.split('(')[1].replace(')', '')}</div>
                                                        <div className="text-xs text-gray-500">{booking.to.split('(')[0]}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-4 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                            <div>
                                                <div className="text-xs text-gray-400">Class</div>
                                                <div className="font-bold text-gray-900 text-sm">{booking.class}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-400">Time</div>
                                                <div className="font-bold text-gray-900 text-sm">{booking.time}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-400">Gate</div>
                                                <div className="font-bold text-gray-900 text-sm">{booking.gate}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-400">Seat</div>
                                                <div className="font-bold text-gray-900 text-sm">{booking.seat}</div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {booking.type === 'hotel' && (
                                    <>
                                        <div className="mb-6">
                                            <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-wider mb-2 gap-2">
                                                <Calendar className="w-3 h-3" /> {booking.date} • {booking.nights} Nights
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">{booking.name}</h3>
                                            <div className="flex items-center text-gray-500 text-sm">
                                                <MapPin className="w-4 h-4 mr-1 text-blue-500" />
                                                {booking.location}
                                            </div>
                                        </div>

                                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                                    <Hotel className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <div className="text-xs text-blue-600 font-bold uppercase">Total Paid</div>
                                                    <div className="font-black text-gray-900">₹{booking.amount.toLocaleString('en-IN')}</div>
                                                </div>
                                            </div>
                                            <button className="text-xs font-bold text-blue-600 hover:underline">
                                                View Voucher
                                            </button>
                                        </div>
                                    </>
                                )}

                                {booking.type === 'flight' && (
                                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                        <div className="text-xs text-gray-400">Booking Ref: <span className="text-gray-900 font-mono font-bold">{booking.id}</span></div>
                                        <div className="text-xs font-bold text-gray-900">₹{booking.amount.toLocaleString('en-IN')}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
