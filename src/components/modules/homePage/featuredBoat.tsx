"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Users, Ship } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Fake data for the UI
const featuredBoats = [
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
    type: "Motorboat",
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
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800",
  },
];

const FeaturedBoat = () => {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight tracking-tight">
            Featured Boats
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Handpicked premium vessels for unforgettable maritime experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBoats.map((boat) => (
            <Link
              key={boat.id}
              href={`/boats/${boat.id}`}
              className="group block transition-all duration-300"
            >
              <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-500 h-full bg-card">
                {/* Image Container */}
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={boat.image}
                    alt={boat.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {boat.featured && (
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-lg">
                      Featured
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-md text-xs flex items-center gap-2">
                    <Users className="w-3 h-3" /> {boat.capacity} Guests
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-primary/80">
                      {boat.type}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-sm">{boat.rating}</span>
                      <span className="text-muted-foreground text-xs">({boat.reviews})</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {boat.name}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-6 line-clamp-2 leading-relaxed">
                    {boat.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-foreground">${boat.pricePerDay}</span>
                      <span className="text-muted-foreground text-xs">/ day</span>
                    </div>
                    <div className="text-xs font-bold uppercase tracking-widest text-primary group-hover:underline">
                      View Details
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBoat;