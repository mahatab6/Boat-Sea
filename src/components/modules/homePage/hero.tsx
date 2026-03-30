"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Search, Users, Calendar as CalendarIcon } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';

const Hero = () => {
  // State for search parameters
  const [searchParams, setSearchParams] = useState({
    location: '',
    date: '',
    guests: ''
  });

  return (
    <section 
      className="relative min-h-[100dvh] flex items-center justify-center bg-cover bg-center overflow-hidden" 
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=1920)' }}
    >
      {/* Dynamic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-background"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Hero Text */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1] tracking-tight"
            style={{ textShadow: '0 4px 24px rgba(0,0,0,0.4)' }}
          >
            Rent boats & <br />
            <span className="text-primary-foreground italic">explore the seas</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Discover premium vessels and hidden coastal gems for your next maritime adventure.
          </p>
        </div>

        {/* Search Bar Container */}
        <div className="bg-white/95 dark:bg-card/95 backdrop-blur-md rounded-2xl md:rounded-full shadow-2xl p-2 md:p-3 max-w-5xl mx-auto animate-in fade-in zoom-in-95 duration-700 delay-300">
          <div className="grid grid-cols-1 md:grid-cols-10 gap-2 items-center">
            
            {/* Location Input */}
            <div className="md:col-span-3 text-left px-4 py-2 border-b md:border-b-0 md:border-r border-border/50">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 ml-1">Location</label>
              <div className="relative">
                <MapPin className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                <Input 
                  type="text"
                  placeholder="Where to?" 
                  value={searchParams.location} 
                  onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })} 
                  className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium placeholder:text-muted-foreground/60 pl-6 outline-none text-foreground" 
                />
              </div>
            </div>

            {/* Date Input */}
            <div className="md:col-span-3 text-left px-4 py-2 border-b md:border-b-0 md:border-r border-border/50">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 ml-1">Date</label>
              <div className="relative">
                <CalendarIcon className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                <Input 
                  type="date" 
                  value={searchParams.date} 
                  onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })} 
                  className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium pl-6 outline-none text-foreground" 
                />
              </div>
            </div>

            {/* Guests Input */}
            <div className="md:col-span-2 text-left px-4 py-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 ml-1">Guests</label>
              <div className="relative">
                <Users className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                <input 
                  type="number" 
                  placeholder="Add guests" 
                  value={searchParams.guests} 
                  onChange={(e) => setSearchParams({ ...searchParams, guests: e.target.value })} 
                  className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium pl-6 outline-none text-foreground" 
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="md:col-span-2 p-1">
              <Link href={`/browse-boats?location=${searchParams.location}`} className="w-full">
                <Button className="w-full h-12 md:h-14 rounded-xl md:rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300 font-bold shadow-lg shadow-primary/20">
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </Link>
            </div>

          </div>
        </div>

        {/* Subtle Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce hidden md:block">
          <p className="text-[10px] uppercase tracking-[0.3em] mb-2">Scroll</p>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent mx-auto"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;