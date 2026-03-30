"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Star, Users, MapPin, Search, 
  ChevronLeft, ChevronRight, SlidersHorizontal,
  Anchor, Wind, Ship, LifeBuoy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';

// Expanded Mock Data
const allBoats = [
  {
    id: "1",
    name: "Azure Horizon Luxury",
    description: "Experience ultimate comfort on this 45ft designer yacht. Features a spacious sun deck and premium sound system.",
    pricePerDay: 450,
    rating: 4.9,
    reviews: 124,
    featured: true,
    capacity: 12,
    type: "Yacht",
    location: "Miami, FL",
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    name: "Midnight Serenity",
    description: "A sleek, modern motorboat perfect for fast-paced coastal exploration and watersports.",
    pricePerDay: 280,
    rating: 4.7,
    reviews: 89,
    featured: true,
    capacity: 6,
    type: "Speedboat",
    location: "Key West, FL",
    image: "https://images.unsplash.com/photo-1540946484610-45cd338d0411?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "3",
    name: "Golden Coast Catamaran",
    description: "Stable, luxurious, and perfect for large groups. Includes a private chef option and snorkeling gear.",
    pricePerDay: 620,
    rating: 5.0,
    reviews: 56,
    featured: false,
    capacity: 20,
    type: "Catamaran",
    location: "Nassau, Bahamas",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "4",
    name: "Silver Fin Express",
    description: "High-speed interceptor style boat for those who love adrenaline and open sea.",
    pricePerDay: 350,
    rating: 4.6,
    reviews: 42,
    featured: false,
    capacity: 8,
    type: "Speedboat",
    location: "San Diego, CA",
    image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "5",
    name: "The Royal Wave",
    description: "A floating palace with 3 cabins and a full kitchen. Ideal for multi-day trips.",
    pricePerDay: 850,
    rating: 4.9,
    reviews: 210,
    featured: true,
    capacity: 10,
    type: "Yacht",
    location: "Monaco",
    image: "https://images.unsplash.com/photo-1621275471769-e6aa344546d5?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "6",
    name: "Island Hopper",
    description: "Compact and efficient catamaran designed for shallow water island hopping.",
    pricePerDay: 410,
    rating: 4.8,
    reviews: 77,
    featured: false,
    capacity: 14,
    type: "Catamaran",
    location: "Ibiza, Spain",
    image: "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?auto=format&fit=crop&q=80&w=800",
  },
];

const ITEMS_PER_PAGE = 4;

const BoatsListingPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    boatTypes: [] as string[],
    capacity: 0,
  });

  // Derived Filtering Logic (No useEffect needed)
  const filteredBoats = useMemo(() => {
    return allBoats.filter((boat) => {
      const matchesPrice = boat.pricePerDay >= filters.priceRange[0] && boat.pricePerDay <= filters.priceRange[1];
      const matchesType = filters.boatTypes.length === 0 || filters.boatTypes.includes(boat.type);
      const matchesCapacity = boat.capacity >= filters.capacity;
      return matchesPrice && matchesType && matchesCapacity;
    });
  }, [filters]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredBoats.length / ITEMS_PER_PAGE);
  const paginatedBoats = filteredBoats.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const boatTypes = ['Yacht', 'Speedboat', 'Catamaran'];

  const handleTypeToggle = (type: string) => {
    setFilters(prev => ({
      ...prev,
      boatTypes: prev.boatTypes.includes(type)
        ? prev.boatTypes.filter(t => t !== type)
        : [...prev.boatTypes, type]
    }));
    setCurrentPage(1); // Reset to page 1 on filter change
  };

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Header Section */}
      <div className="bg-slate-950 py-20 mb-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            Find Your <span className="italic">Perfect Vessel</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Discover {filteredBoats.length} premium boats ready for your next adventure. 
            From luxury yachts to fast speedboats.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <div className="bg-card rounded-3xl p-8 shadow-sm border border-border sticky top-28">
              <div className="flex items-center gap-2 mb-8">
                <SlidersHorizontal className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-xl tracking-tight">Refine Search</h2>
              </div>

              <div className="space-y-10">
                {/* Price Range */}
                <div>
                  <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6 block">
                    Price per day
                  </Label>
                  <Slider
                    min={0}
                    max={1000}
                    step={50}
                    value={filters.priceRange}
                    onValueChange={(val) => setFilters({ ...filters, priceRange: val })}
                    className="mb-4"
                  />
                  <div className="flex justify-between items-center bg-muted/50 p-3 rounded-xl border border-border/50">
                    <span className="font-mono font-bold">${filters.priceRange[0]}</span>
                    <span className="text-muted-foreground">—</span>
                    <span className="font-mono font-bold">${filters.priceRange[1]}</span>
                  </div>
                </div>

                {/* Boat Types */}
                <div>
                  <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6 block">
                    Vessel Type
                  </Label>
                  <div className="space-y-4">
                    {boatTypes.map((type) => (
                      <div key={type} className="flex items-center group cursor-pointer">
                        <Checkbox
                          id={type}
                          checked={filters.boatTypes.includes(type)}
                          onCheckedChange={() => handleTypeToggle(type)}
                          className="rounded-md"
                        />
                        <Label htmlFor={type} className="ml-3 text-base font-medium cursor-pointer group-hover:text-primary transition-colors">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Capacity */}
                <div>
                  <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6 block">
                    Min. Capacity
                  </Label>
                  <div className="flex items-center gap-4">
                    <Users className="w-5 h-5 text-primary" />
                    <Slider
                      min={0}
                      max={20}
                      step={2}
                      value={[filters.capacity]}
                      onValueChange={(val) => setFilters({ ...filters, capacity: val })}
                    />
                    <span className="font-bold w-8">{filters.capacity}</span>
                  </div>
                </div>

                <Button 
                  variant="ghost" 
                  className="w-full rounded-xl text-primary font-bold hover:bg-primary/5"
                  onClick={() => setFilters({ priceRange: [0, 1000], boatTypes: [], capacity: 0 })}
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          </aside>

          {/* Results Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {paginatedBoats.map((boat) => (
                <Link key={boat.id} href={`/boats/${boat.id}`} className="group block">
                  <Card className="overflow-hidden border-none shadow-md hover:shadow-2xl transition-all duration-500 h-full bg-card group-hover:-translate-y-2">
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={boat.image}
                        alt={boat.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {boat.featured && (
                        <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-xl ring-2 ring-white/20">
                          Featured
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md border border-white/10 text-white px-3 py-1.5 rounded-xl text-xs flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-primary" /> {boat.capacity} Guests
                      </div>
                    </div>

                    {/* Content */}
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-black text-primary">
                          <Ship className="w-3 h-3" />
                          {boat.type}
                        </div>
                        <div className="flex items-center gap-1 bg-amber-500/10 text-amber-600 px-2 py-1 rounded-lg">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="font-bold text-xs">{boat.rating}</span>
                        </div>
                      </div>

                      <h3 className="font-serif text-2xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                        {boat.name}
                      </h3>

                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-6">
                        <MapPin className="w-4 h-4 text-primary/60" />
                        {boat.location}
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-border/50">
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-black text-foreground">${boat.pricePerDay}</span>
                          <span className="text-muted-foreground text-xs font-bold uppercase tracking-tighter">/ day</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-xl"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    className={cn(
                      "w-10 h-10 rounded-xl font-bold",
                      currentPage === i + 1 ? "shadow-lg shadow-primary/20" : ""
                    )}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-xl"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            )}

            {/* Empty State */}
            {filteredBoats.length === 0 && (
              <div className="text-center py-32 bg-muted/20 rounded-[3rem] border-2 border-dashed border-border">
                <LifeBuoy className="w-16 h-16 text-muted-foreground/30 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-foreground mb-2">No vessels match your search</h3>
                <p className="text-muted-foreground mb-8">Try adjusting your price range or boat type filters.</p>
                <Button onClick={() => setFilters({ priceRange: [0, 1000], boatTypes: [], capacity: 0 })} className="rounded-full px-8">
                  Reset All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BoatsListingPage;