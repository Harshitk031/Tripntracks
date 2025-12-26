import React from 'react';
import { ShieldCheck, Headphones, Tag, Globe } from 'lucide-react';

const features = [
    {
        icon: Tag,
        title: "Best Price Guarantee",
        description: "Find a lower price? We'll match it."
    },
    {
        icon: ShieldCheck,
        title: "Secure Booking",
        description: "PCI-DSS compliant payment protection."
    },
    {
        icon: Headphones,
        title: "24/7 Support",
        description: "Real humans to help you anytime."
    },
    {
        icon: Globe,
        title: "Global Coverage",
        description: "Flights and hotels in 190+ countries."
    }
];

export default function WhyChooseUs() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Book With Tripntracks?</h2>
                    <p className="text-lg text-gray-600">We make your journey as smooth as your destination.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center group">
                                <div className="inline-flex items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors mb-4">
                                    <Icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-500">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
