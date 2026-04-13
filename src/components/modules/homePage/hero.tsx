/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Search,
  Users,
  Calendar as CalendarIcon,
  Anchor,
} from "lucide-react";
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
          backgroundImage:
            "url('https://i.ibb.co.com/SXxY3cBm/Luxury-Yacht.jpg')",
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
            Rent boats.
            <br />
            <span className="bg-gradient-to-r from-sky-300 via-white to-sky-300 bg-clip-text text-transparent">
              Explore the seas.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            Discover luxury yachts, speedboats, and private vessels for
            unforgettable maritime adventures along the world's most beautiful
            coastlines.
          </p>
        </div>

        {/* Enhanced Search Card */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-[28px] shadow-2xl border border-white/20 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x">
              {/* Location */}
              <div className="md:col-span-5 px-6 py-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>

                <Input
                  placeholder="Dhaka, Cox's Bazar, Saint Martin..."
                  value={searchParams.location}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      location: e.target.value,
                    })
                  }
                  onKeyDown={handleKeyDown}
                  className="border-0 bg-transparent text-lg font-medium placeholder:text-muted-foreground focus-visible:ring-0 px-0"
                />
              </div>

              {/* Date */}
              <div className="md:col-span-3 px-6 py-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                  <CalendarIcon className="w-4 h-4" />
                  Date
                </label>

                <Input
                  type="date"
                  value={searchParams.date}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      date: e.target.value,
                    })
                  }
                  onKeyDown={handleKeyDown}
                  className="border-0 bg-transparent text-lg font-medium focus-visible:ring-0 px-0"
                />
              </div>

              {/* Guests */}
              <div className="md:col-span-2 px-6 py-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                  <Users className="w-4 h-4" />
                  Guests
                </label>

                <Input
                  type="number"
                  min="1"
                  placeholder="1 - 20"
                  value={searchParams.guests}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      guests: e.target.value,
                    })
                  }
                  onKeyDown={handleKeyDown}
                  className="border-0 bg-transparent text-lg font-medium focus-visible:ring-0 px-0"
                />
              </div>

              {/* Search Button */}
              <div className="md:col-span-2 flex items-center justify-center px-4 py-4">
                <Button
                  onClick={handleSearch}
                  size="lg"
                  className="w-full h-[64px] rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold text-lg shadow-lg transition active:scale-[0.98]"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center text-white/60">
        <p className="text-[10px] tracking-[3px] uppercase mb-3 font-medium">
          Discover More
        </p>
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
