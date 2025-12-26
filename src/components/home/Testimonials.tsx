import React from 'react';
import { Quote } from 'lucide-react';

export default function Testimonials() {
    const reviews = [
        {
            id: 1,
            name: "Aarav Patel",
            role: "Adventure Traveler",
            image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=200",
            location: "Mumbai, India",
            text: "My trip to Ladakh was absolutely magical. The itinerary was perfectly paced, and the support from Tripntracks was exceptional.",
            destination: "Ladakh"
        },
        {
            id: 2,
            name: "Sarah Jenkins",
            role: "Digital Nomad",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
            location: "London, UK",
            text: "The Visa process for Vietnam was handled so smoothly. I got my approval in 2 days! Highly recommended for hassle-free travel.",
            destination: "Vietnam"
        },
        {
            id: 3,
            name: "Rohan & Priya",
            role: "Honeymooners",
            image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=200",
            location: "Bangalore, India",
            text: "We booked our honeymoon to Bali through Tripntracks. Every resort was exactly as promised - pure luxury and relaxation.",
            destination: "Bali"
        }
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Traveler Stories</h2>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Hear from our community of explorers about their unforgettable journeys.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 flex flex-col">
                            <Quote className="w-10 h-10 text-blue-200 mb-6" />
                            <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                                "{review.text}"
                            </p>

                            <div className="mt-auto flex items-center">
                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-white shadow-sm"
                                />
                                <div>
                                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                                    <div className="flex text-sm text-gray-500 space-x-2">
                                        <span>{review.role}</span>
                                        <span className="text-gray-300">•</span>
                                        <span className="text-blue-600 font-medium text-xs bg-blue-50 px-2 py-0.5 rounded-full">{review.destination} Trip</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
