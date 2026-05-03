import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Star, MapPin, DollarSign
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IBoat } from '@/types/boat.types';

interface BoatCardProps {
  boat: IBoat;
}

const BoatCard = ({ boat }: BoatCardProps) => {
  const displayPrice = boat.pricePerTrip || 0;

  return (
    <Card className="flex flex-col overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300 h-full bg-card rounded-2xl group">
      {/* Image Section */}
      <div className="relative h-60 overflow-hidden shrink-0">
        <Image
          src={boat.primary_img || ''}
          alt={boat.boatName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {boat.manufacturer && (
          <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold shadow-md">
            Premium
          </div>
        )}
      </div>

      {/* Content Section */}
      <CardContent className="p-5 flex flex-col flex-grow">
        <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {boat.boatName}
        </h3>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-6 flex-grow">
          {boat.description}
        </p>

        {/* Rating, Location, Price */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 text-sm font-medium">
          <div className="flex items-center text-amber-500">
            <Star className="w-4 h-4 fill-current mr-1" />
            <span>{boat.rating || 'New'}</span>
          </div>
          
          <div className="flex items-center text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="line-clamp-1">{boat.location}</span>
          </div>

          <div className="flex items-center text-foreground font-bold">
            <DollarSign className="w-4 h-4 mr-1 text-primary" />
            <span>{displayPrice} <span className="text-muted-foreground font-normal text-xs">/ trip</span></span>
          </div>
        </div>

        {/* Action Button */}
        <Button asChild className="w-full rounded-full group-hover:bg-primary/90 transition-all">
          <Link href={`/browse-boats/${boat.id}`}>
            View Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default BoatCard;