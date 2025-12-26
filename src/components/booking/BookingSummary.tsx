"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

interface BookingSummaryProps {
    price: number;
    onProceed: () => void;
}

export default function BookingSummary({ price, onProceed }: BookingSummaryProps) {
    const taxes = Math.round(price * 0.12); // Mock 12% tax
    const total = price + taxes;

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-24">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Price Summary</h3>

            <div className="space-y-3 border-b border-gray-100 pb-4 mb-4">
                <div className="flex justify-between text-gray-600">
                    <span>Base Fare</span>
                    <span>${price}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Taxes & Fees</span>
                    <span>${taxes}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Service Charge</span>
                    <span>$0</span>
                </div>
            </div>

            <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-lg text-gray-900">Total Amount</span>
                <span className="font-bold text-2xl text-blue-600">${total}</span>
            </div>

            <button
                onClick={onProceed}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md active:scale-95 transform"
            >
                Proceed to Book
            </button>

            <p className="text-xs text-center text-gray-400 mt-4">
                By proceeding, you agree to our Terms & Conditions
            </p>
        </div>
    );
}
