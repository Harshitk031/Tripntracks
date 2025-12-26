import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div>
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-orange-500 bg-clip-text text-transparent">
                                Tripntracks
                            </span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Crafting unforgettable journeys with premium experiences. Discovery starts here.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-400 hover:text-white transition-all">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-700 hover:text-white transition-all">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-gray-100">Explore</h3>
                        <ul className="space-y-4">
                            <li><Link href="/search?type=flights" className="text-gray-400 hover:text-white transition-colors">Flights</Link></li>
                            <li><Link href="/search?type=hotels" className="text-gray-400 hover:text-white transition-colors">Hotels</Link></li>
                            <li><Link href="/visas" className="text-gray-400 hover:text-white transition-colors">Visa Services</Link></li>
                            <li><Link href="/destinations" className="text-gray-400 hover:text-white transition-colors">Destinations</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-gray-100">Support</h3>
                        <ul className="space-y-4">
                            <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-gray-100">Contact</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400">
                                <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                <span>123 Travel Tower, Business District,<br />New Delhi, India 110001</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                <span>+91 987 654 3210</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                <span>support@tripntracks.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} Tripntracks. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
