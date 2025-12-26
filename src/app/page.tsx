import { Suspense } from 'react';
import Header from '@/components/shared/Header';
import MobileNav from '@/components/shared/MobileNav';
import SearchWidget from '@/components/home/SearchWidget';
import TrendingDestinations from '@/components/home/TrendingDestinations';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ItineraryPreview from '@/components/home/ItineraryPreview';
import Testimonials from '@/components/home/Testimonials';
import Footer from '@/components/shared/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO SECTION - Immersive Video/Parallax feel */}
      <div className="relative h-[85vh] w-full overflow-hidden">
        {/* Background Image with Ken Burns Effect */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000"
            alt="Hero Background"
            className="w-full h-full object-cover animate-slow-zoom"
          />
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-semibold mb-6 animate-fade-in-up">
            ✨ Redefining Luxury Travel
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg tracking-tight animate-fade-in-up delay-100">
            Discover the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-orange-300">Extraordinary</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-10 max-w-2xl font-light animate-fade-in-up delay-200">
            Curated journeys, exclusive stays, and seamless experiences tailored just for you.
          </p>
        </div>
      </div>

      {/* Overlapping Search Widget */}
      <div className="relative z-20">
        <SearchWidget />
      </div>

      {/* Main Content Flow */}
      <div className="pt-16">
        <TrendingDestinations />
        <ItineraryPreview />
        <WhyChooseUs />
        <Testimonials />
      </div>

      <Footer />
    </main>
  );
}
