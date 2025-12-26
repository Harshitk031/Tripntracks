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
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Decoration background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-40 pointers-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-200 blur-3xl mix-blend-multiply filter opacity-20 animate-blob"></div>
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-purple-200 blur-3xl mix-blend-multiply filter opacity-20 animate-blob animation-delay-2000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                        Why Travel with <span className="text-blue-600">Tripntracks?</span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        We don't just book trips; we craft experiences. Here is why thousands of travelers trust us with their journeys.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-2 border border-slate-100 group flex flex-col items-center text-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 group-hover:rotate-3 shadow-inner">
                                    <Icon className="w-8 h-8" strokeWidth={2.5} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-500 leading-relaxed text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
