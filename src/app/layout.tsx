import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BookingProvider } from "@/context/BookingContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Header from "@/components/shared/Header";
import MobileNav from "@/components/shared/MobileNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tripntracks - Your Journey Starts Here",
  description: "Best flights, hotels, and holiday packages.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BookingProvider>
          <WishlistProvider>
            <Header />
            {children}
            <MobileNav />
          </WishlistProvider>
        </BookingProvider>
      </body>
    </html>
  );
}
