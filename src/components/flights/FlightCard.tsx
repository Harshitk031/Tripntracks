import React from 'react';
import { Clock, Plane, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface FlightCardProps {
    flight: any;
}

export default function FlightCard({ flight }: FlightCardProps) {
    // Helper to get airline color
    const getAirlineColor = (airline: string) => {
        if (airline.includes('Indigo')) return 'text-blue-600 bg-blue-50';
        if (airline.includes('Air India')) return 'text-orange-600 bg-orange-50';
        if (airline.includes('Akasa')) return 'text-purple-600 bg-purple-50';
        return 'text-gray-600 bg-gray-50';
    };

    const airlineStyle = getAirlineColor(flight.airline);

    return (
        <div className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
            {/* Decorative background gradient on hover */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
                {/* Airline & Flight Info */}
                <div className="flex items-center gap-4 w-full lg:w-1/4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${airlineStyle} shadow-inner`}>
                        <Plane className="w-7 h-7" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-900 leading-tight">{flight.airline}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
                                {flight.flightNumber}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Journey Visualizer */}
                <div className="flex-1 w-full flex items-center justify-between gap-4">
                    <div className="text-center min-w-[80px]">
                        <div className="text-2xl font-black text-gray-900">{flight.departureTime}</div>
                        <div className="text-sm font-medium text-gray-500 mt-1">{flight.from.split('(')[1].replace(')', '')}</div>
                        <div className="text-xs text-gray-400 truncate max-w-[100px]">{flight.from.split('(')[0]}</div>
                    </div>

                    <div className="flex-1 flex flex-col items-center px-4 relative">
                        <div className="text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {flight.duration}
                        </div>
                        <div className="w-full h-[2px] bg-gray-200 relative">
                            {/* Animated Plane */}
                            <div className="absolute top-1/2 left-0 w-full h-full pointer-events-none">
                                <div className="absolute top-1/2 -mt-1.5 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] animate-flight-move"></div>
                            </div>

                            {/* Hubs/Stops */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-full border border-gray-100 text-[10px] font-bold text-gray-500 shadow-sm z-10">
                                {flight.stops === 0 ? 'Non-stop' : `${flight.stops} Stop`}
                            </div>
                        </div>
                    </div>

                    <div className="text-center min-w-[80px]">
                        <div className="text-2xl font-black text-gray-900">{flight.arrivalTime}</div>
                        <div className="text-sm font-medium text-gray-500 mt-1">{flight.to.split('(')[1].replace(')', '')}</div>
                        <div className="text-xs text-gray-400 truncate max-w-[100px]">{flight.to.split('(')[0]}</div>
                    </div>
                </div>

                {/* Price & Action */}
                <div className="w-full lg:w-1/5 flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center lg:border-l lg:pl-8 lg:border-gray-100 gap-4 mt-4 lg:mt-0">
                    <div className="text-right">
                        <div className="text-3xl font-black text-gray-900 tracking-tight">₹{flight.price.toLocaleString('en-IN')}</div>
                        <div className="flex items-center justify-end gap-1 mt-1">
                            {flight.refundable ? (
                                <span className="flex items-center text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                    <ShieldCheck className="w-3 h-3 mr-1" /> Refundable
                                </span>
                            ) : (
                                <span className="text-[10px] font-medium text-gray-400">Non-refundable</span>
                            )}
                        </div>
                    </div>

                    <Link
                        href={`/book/${flight.id}?type=flights`}
                        className="w-full lg:w-auto bg-[#001F3F] hover:bg-blue-900 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-blue-900/30 flex items-center justify-center gap-2 group-hover:gap-3"
                    >
                        Book Now <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
