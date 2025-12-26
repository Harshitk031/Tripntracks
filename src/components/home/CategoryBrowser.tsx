import React from 'react';
import { Heart, Compass, Cross, User } from 'lucide-react';

interface CategoryBrowserProps {
    onSelectCategory: (category: string | null) => void;
    selectedCategory: string | null;
}

const categories = [
    {
        id: 'Honeymoon',
        label: 'Honeymoon',
        icon: Heart,
        description: 'Romantic getaways & luxury stays',
        color: 'from-pink-500 to-rose-600',
        bg: 'bg-pink-50'
    },
    {
        id: 'Adventure',
        label: 'Adventure',
        icon: Compass,
        description: 'Trekking, rafting & thrills',
        color: 'from-emerald-500 to-green-600',
        bg: 'bg-emerald-50'
    },
    {
        id: 'Religious',
        label: 'Religious',
        icon: Cross,
        description: 'Heritage, temples & peace',
        color: 'from-orange-500 to-amber-600',
        bg: 'bg-orange-50'
    },
    {
        id: 'Solo',
        label: 'Solo',
        icon: User,
        description: 'Explore the world on your own',
        color: 'from-blue-500 to-indigo-600',
        bg: 'bg-blue-50'
    }
];

export default function CategoryBrowser({ onSelectCategory, selectedCategory }: CategoryBrowserProps) {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Experience</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Whether you seek adrenaline or tranquility, find the perfect journey tailored to your style.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        const isSelected = selectedCategory === category.id;

                        return (
                            <button
                                key={category.id}
                                onClick={() => onSelectCategory(isSelected ? null : category.id)}
                                className={`
                                    relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 group
                                    ${isSelected ? 'ring-2 ring-offset-2 ring-blue-600 scale-105 shadow-xl' : 'hover:shadow-lg hover:-translate-y-1'}
                                    ${category.bg}
                                `}
                            >
                                <div className={`
                                    w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white shadow-lg bg-gradient-to-br ${category.color}
                                `}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">
                                    {category.label}
                                </h3>
                                <p className="text-sm text-gray-600 font-medium">
                                    {category.description}
                                </p>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
