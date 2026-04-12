/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Users, Calendar as CalendarIcon, Anchor } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

const Hero = () => {
  const router = useRouter();

  const [searchParams, setSearchParams] = useState({
    location: "",
    date: "",
    guests: "",
  });

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (searchParams.location.trim()) {
      params.append("searchTerm", searchParams.location.trim());
    }
    if (searchParams.guests) {
      params.append("capacity", searchParams.guests);
    }
    if (searchParams.date) {
      params.append("date", searchParams.date);
    }

    router.push(`/browse-boats?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Enhanced Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://i.ibb.co.com/SXxY3cBm/Luxury-Yacht.jpg')",
        }}
      />
      
      {/* Multi-layer Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center w-full">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-sm font-medium tracking-widest">
            <Anchor className="w-4 h-4" />
            PREMIUM BOAT RENTALS
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-white leading-none tracking-tighter">
            Rent boats.<br />
            <span className="bg-gradient-to-r from-sky-300 via-white to-sky-300 bg-clip-text text-transparent">
              Explore the seas.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            Discover luxury yachts, speedboats, and private vessels for unforgettable 
            maritime adventures along the world's most beautiful coastlines.
          </p>
        </div>

        {/* Enhanced Search Card */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl p-3 md:p-4 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
              
              {/* Location */}
              <div className="md:col-span-5">
                <div className="px-6 py-5 bg-white dark:bg-slate-900 rounded-2xl">
                  <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    WHERE TO?
                  </label>
                  <Input
                    type="text"
                    placeholder="Dhaka, Cox's Bazar, Saint Martin..."
                    value={searchParams.location}
                    onChange={(e) =>
                      setSearchParams({ ...searchParams, location: e.target.value })
                    }
                    onKeyDown={handleKeyDown}
                    className="border-0 bg-transparent p-0 text-lg font-medium placeholder:text-slate-400 focus-visible:ring-0 h-auto"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="md:col-span-3">
                <div className="px-6 py-5 bg-white dark:bg-slate-900 rounded-2xl">
                  <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                    <CalendarIcon className="w-4 h-4" />
                    DEPARTURE DATE
                  </label>
                  <Input
                    type="date"
                    value={searchParams.date}
                    onChange={(e) =>
                      setSearchParams({ ...searchParams, date: e.target.value })
                    }
                    onKeyDown={handleKeyDown}
                    className="border-0 bg-transparent p-0 text-lg font-medium focus-visible:ring-0 h-auto"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="md:col-span-2">
                <div className="px-6 py-5 bg-white dark:bg-slate-900 rounded-2xl">
                  <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                    <Users className="w-4 h-4" />
                    GUESTS
                  </label>
                  <Input
                    type="number"
                    min="1"
                    placeholder="1 - 20"
                    value={searchParams.guests}
                    onChange={(e) =>
                      setSearchParams({ ...searchParams, guests: e.target.value })
                    }
                    onKeyDown={handleKeyDown}
                    className="border-0 bg-transparent p-0 text-lg font-medium focus-visible:ring-0 h-auto"
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="md:col-span-2">
                <Button
                  onClick={handleSearch}
                  size="lg"
                  className="w-full h-[78px] md:h-[86px] rounded-2xl md:rounded-3xl bg-[#2d8a56] hover:bg-[#246e45] text-white font-semibold text-lg shadow-xl shadow-[#2d8a56]/30 transition-all active:scale-[0.985]"
                >
                  <Search className="w-6 h-6 mr-3" />
                  Search Boats
                </Button>
              </div>
            </div>
          </div>

          {/* Trust Bar */}
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-white/70 text-sm mt-10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Instant Booking
            </div>
            <div>✓ Fully Insured</div>
            <div>✓ 24/7 Support</div>
            <div>1000+ Happy Sailors</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center text-white/60">
        <p className="text-[10px] tracking-[3px] uppercase mb-3 font-medium">Discover More</p>
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;