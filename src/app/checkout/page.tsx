"use client";

import React, { useState, useEffect } from 'react';
import { useBooking } from '@/context/BookingContext';
import GuestForm from '@/components/booking/GuestForm';
import SuccessModal from '@/components/booking/SuccessModal';
import BookingSummary from '@/components/booking/BookingSummary';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
    const { cart, guestDetails } = useBooking();
    const router = useRouter();
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (!cart) {
            router.push('/');
        }
    }, [cart, router]);

    if (!cart) return null;

    const handlePayment = () => {
        // Basic validation
        if (!guestDetails.fullName || !guestDetails.email) {
            alert("Please fill in your details");
            return;
        }

        setIsProcessing(true);
        // Mock API call
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccessOpen(true);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <button onClick={() => router.back()} className="flex items-center text-gray-500 hover:text-gray-900 mb-6 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                </button>

                <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 space-y-6">
                        {/* Item Summary Card */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                            <img src={cart.image} alt="Thumbnail" className="w-20 h-20 rounded-lg object-cover" />
                            <div>
                                <h3 className="font-bold text-gray-900">{cart.title}</h3>
                                <p className="text-sm text-gray-500">{cart.subtitle}</p>
                                <div className="font-medium text-blue-600 mt-1">${cart.price}</div>
                            </div>
                        </div>

                        <GuestForm />

                        {/* Mock Payment Details */}
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 opacity-60 pointer-events-none relative">
                            <div className="absolute inset-0 flex items-center justify-center z-10">
                                <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-bold text-sm">
                                    Payment Gateway Mock
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Payment</h3>
                            <div className="h-40 bg-gray-100 rounded-lg animate-pulse"></div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/3">
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-24">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                            <div className="flex justify-between items-center mb-6 text-lg font-bold">
                                <span>Total to Pay</span>
                                <span>${Math.round(cart.price * 1.12)}</span>
                            </div>
                            <button
                                onClick={handlePayment}
                                disabled={isProcessing}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isProcessing ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : 'Complete Booking'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <SuccessModal isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} />
        </div>
    );
}
