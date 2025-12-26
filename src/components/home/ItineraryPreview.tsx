import React from 'react';
import { Plane, Hotel, Camera, Coffee, Moon, Sun } from 'lucide-react';

export default function ItineraryPreview() {
    const days = [
        {
            day: "Day 01",
            title: "Arrival in Paradise",
            activities: [
                { icon: Plane, time: "10:00 AM", text: "Land at Male International Airport" },
                { icon: Hotel, time: "02:00 PM", text: "Speedboat transfer to Overwater Villa" },
                { icon: Moon, time: "08:00 PM", text: "Candlelight Dinner by the beach" }
            ],
            image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&q=80&w=400"
        },
        {
            day: "Day 02",
            title: "Ocean Exploration",
            activities: [
                { icon: Sun, time: "09:00 AM", text: "Morning Yoga & Floating Breakfast" },
                { icon: Camera, time: "11:00 AM", text: "Snorkeling with Manta Rays" },
                { icon: Coffee, time: "05:00 PM", text: "Sunset Cruise with Dolphins" }
            ],
            image: "https://images.unsplash.com/photo-1540206395-688085723adb?auto=format&fit=crop&q=80&w=400"
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    {/* Left Content */}
                    <div className="md:w-1/2">
                        <span className="text-orange-500 font-bold uppercase tracking-widest text-sm mb-2 block">Experience the Journey</span>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">Your Perfect Itinerary Waiting For You</h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            We don't just book hotels; we craft experiences. Every minute is planned to perfection, from airport pickups to hidden gems.
                        </p>

                        <div className="space-y-8 relative pl-8 border-l-2 border-dashed border-gray-200">
                            {days.map((day, idx) => (
                                <div key={idx} className="relative">
                                    <div className="absolute -left-[41px] top-0 bg-blue-100 text-blue-600 font-bold w-10 h-10 rounded-full flex items-center justify-center border-4 border-white">
                                        {idx + 1}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">{day.day}: {day.title}</h3>
                                    <div className="space-y-4">
                                        {day.activities.map((act, i) => (
                                            <div key={i} className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                                                <act.icon className="w-5 h-5 mr-3 text-blue-500" />
                                                <span className="text-sm font-semibold mr-2 w-20">{act.time}</span>
                                                <span className="text-sm">{act.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Visual */}
                    <div className="md:w-1/2 relative h-[600px] w-full hidden md:block">
                        <div className="absolute top-0 right-0 w-4/5 h-4/5 rounded-3xl overflow-hidden shadow-2xl transform hover:rotate-2 transition-transform duration-500 z-10">
                            <img
                                src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=600"
                                alt="Maldives"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute bottom-0 left-0 w-3/5 h-3/5 rounded-3xl overflow-hidden shadow-2xl border-8 border-white transform hover:-rotate-2 transition-transform duration-500 z-20">
                            <img
                                src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=600"
                                alt="Luxury"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-orange-200 rounded-full blur-3xl -z-10"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-200 rounded-full blur-3xl -z-10"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
