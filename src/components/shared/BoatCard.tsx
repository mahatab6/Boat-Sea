import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Star, Users, MapPin, Ship, 
  ChevronRight, Anchor 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { IBoat } from '@/types/boat.types';

interface BoatCardProps {
  boat: IBoat;
}

const BoatCard = ({ boat }: BoatCardProps) => {
  // Use pricePerTrip from API or fallback to pricePerDay
  const displayPrice = boat.pricePerTrip || 0;

  return (
    <Link href={`/boats/${boat.id}`} className="group block h-full">
      <Card className="relative overflow-hidden border-none shadow-md hover:shadow-2xl transition-all duration-500 h-full bg-card group-hover:-translate-y-2 rounded-[2rem]">
        
        {/* Image Section */}
        <div className="relative h-72 overflow-hidden">
          <Image
            src={boat.boat_images || "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=800"}
            alt={boat.boatName}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            {boat.manufacturer && (
              <div className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-xl ring-2 ring-white/20">
                Premium
              </div>
            )}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 text-white px-3 py-1.5 rounded-xl text-xs flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-primary" /> 
              <span className="font-bold">{boat.capacity}</span>
            </div>
          </div>

          {/* Type Overlay (Bottom Left) */}
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm text-slate-900 px-3 py-1 rounded-lg text-[10px] uppercase font-bold tracking-wider shadow-sm">
              <Anchor className="w-3 h-3 text-primary" />
              {boat.boatType}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-serif text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-1">
                {boat.boatName}
              </h3>
              <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                <MapPin className="w-3.5 h-3.5 text-primary/60" />
                {boat.location}
              </div>
            </div>
            
            <div className="flex items-center gap-1 bg-amber-500/10 text-amber-600 px-2.5 py-1 rounded-full border border-amber-500/20">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-bold text-sm">{boat.rating}</span>
            </div>
          </div>

          {/* Description - Clamped to 2 lines */}
          <p className="text-muted-foreground text-sm line-clamp-2 mb-6 min-h-[40px]">
            {boat?.amenities}
          </p>

          {/* Footer Info */}
          <div className="flex items-center justify-between pt-5 border-t border-border/50">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Starting at</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-foreground">${displayPrice}</span>
                <span className="text-muted-foreground text-xs font-medium italic">/ trip</span>
              </div>
            </div>

            <div className="flex items-center gap-2 group/btn">
              <span className="text-xs font-bold uppercase tracking-widest opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary">
                View Details
              </span>
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-inner">
                <ChevronRight className="w-5 h-5 transition-transform group-hover:scale-110" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BoatCard;