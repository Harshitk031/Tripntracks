import React from 'react';
import { User, CreditCard, Shield } from 'lucide-react';

export default function ProfilePage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Travel Profile</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input type="text" defaultValue="John Doe" className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input type="email" defaultValue="john@example.com" className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input type="tel" defaultValue="+1 234 567 890" className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                            <select className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50">
                                <option>United States</option>
                                <option>United Kingdom</option>
                                <option>Canada</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <Shield className="w-5 h-5 mr-2 text-blue-600" />
                            Passport Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Passport Number</label>
                                <input type="text" defaultValue="A12345678" className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                <input type="date" className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50" />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
