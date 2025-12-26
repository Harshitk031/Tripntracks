import React from 'react';
import { Clock } from 'lucide-react';
import Link from 'next/link';

interface FlightCardProps {
    flight: any; // Using any for MVP mock data simplicity, ideally use a defined interface
}

export default function FlightCard({ flight }: FlightCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col md:flex-row items-center gap-6 border border-gray-100">
            {/* Airline Info */}
            <div className="flex items-center w-full md:w-1/4">
                <img src={flight.logo} alt={flight.airline} className="w-12 h-12 rounded-full object-cover mr-4" />
                <div>
                    <h4 className="font-bold text-gray-900">{flight.airline}</h4>
                    <span className="text-xs text-gray-400">{flight.flightNumber}</span>
                </div>
            </div>

            {/* Schedule Info */}
            <div className="flex-1 w-full flex items-center justify-between text-center">
                <div>
                    <div className="text-xl font-bold text-gray-800">{flight.departureTime}</div>
                    <div className="text-sm text-gray-500">{flight.from.split('(')[1].replace(')', '')}</div>
                </div>

                <div className="flex flex-col items-center px-4">
                    <div className="text-xs text-gray-400 mb-1">{flight.duration}</div>
                    <div className="w-24 h-[1px] bg-gray-300 relative">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                            {flight.stops === 0 ? 'Direct' : `${flight.stops} Stop`}
                        </div>
                        {/* Plane Icon Decoration */}
                        <div className="absolute -right-1 -top-1.5 w-3 h-3 border-t-2 border-r-2 border-gray-300 transform rotate-45"></div>
                    </div>
                </div>

                <div>
                    <div className="text-xl font-bold text-gray-800">{flight.arrivalTime}</div>
                    <div className="text-sm text-gray-500">{flight.to.split('(')[1].replace(')', '')}</div>
                </div>
            </div>

            {/* Price & Action */}
            <div className="w-full md:w-1/5 flex flex-row md:flex-col items-center justify-between md:border-l md:pl-6 mt-4 md:mt-0">
                <div className="text-right md:text-center mb-0 md:mb-3">
                    <div className="text-2xl font-bold text-gray-900">₹{flight.price.toLocaleString('en-IN')}</div>
                    {flight.refundable && <div className="text-xs text-green-600 font-medium">Refundable</div>}
                </div>
                <Link
                    href={`/book/${flight.id}?type=flights`}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors whitespace-nowrap"
                >
                    Book Now
                </Link>
            </div>
        </div>
    );
}
