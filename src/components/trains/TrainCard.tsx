import React from 'react';
import { Train, Clock } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface TrainCardProps {
    train: any;
}

export default function TrainCard({ train }: TrainCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <div className="p-2 bg-orange-100 rounded-full mr-4">
                        <Train className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-900">{train.trainName}</h3>
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{train.trainNumber}</span>
                    </div>
                </div>
                <div className="text-right">
                    <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {train.duration}
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mb-6 relative">
                <div className="text-center">
                    <div className="font-bold text-xl">{train.departureTime}</div>
                    <div className="text-sm text-gray-500">{train.from}</div>
                </div>
                <div className="h-[2px] bg-gray-200 flex-1 mx-8 relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-300"></div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-300"></div>
                </div>
                <div className="text-center">
                    <div className="font-bold text-xl">{train.arrivalTime}</div>
                    <div className="text-sm text-gray-500">{train.to}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {train.classes.map((cls: any, idx: number) => (
                    <div key={idx} className={cn(
                        "border rounded-lg p-3 flex justify-between items-center cursor-pointer hover:border-blue-500 transition-colors",
                        cls.seatsAvailable < 10 ? "bg-red-50 border-red-100" : "bg-gray-50 border-gray-200"
                    )}>
                        <div>
                            <div className="font-semibold text-sm text-gray-800">{cls.type}</div>
                            <div className={cn("text-xs", cls.seatsAvailable < 10 ? "text-red-500 font-medium" : "text-green-600")}>
                                {cls.seatsAvailable} Seats Left
                            </div>
                        </div>
                        <div className="text-right flex flex-col items-end">
                            <div className="font-bold text-gray-900">₹{cls.price.toLocaleString('en-IN')}</div>
                            <Link href={`/book/${train.id}?type=trains`} className="text-xs text-blue-600 hover:underline">Book</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
