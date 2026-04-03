

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Navigation2, Anchor } from 'lucide-react';
import Link from 'next/link';

// Mock Data for better UI testing
const routes = [
  {
    id: '1',
    name: 'The Emerald Coast Explorer',
    difficulty: 'Easy',
    duration: '4-6 Hours',
    description: 'Cruise through crystal clear turquoise waters and discover hidden sea caves along the rugged coastline. Perfect for families and beginners.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '2',
    name: 'Sunset Archipelago Trail',
    difficulty: 'Moderate',
    duration: '3 Hours',
    description: 'Navigate through a cluster of volcanic islands as the sun dips below the horizon. Experience the most vibrant golden hour on the water.',
    image: 'https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '3',
    name: 'Deep Sea Fishing Route',
    difficulty: 'Hard',
    duration: '8-10 Hours',
    description: 'Venture into deep blue waters where the big game hangs out. This route takes you past the shelf into prime marlin and tuna territory.',
    image: 'https://images.unsplash.com/photo-1534239143101-1b1c627395c5?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '4',
    name: 'Ancient Harbor Passage',
    difficulty: 'Easy',
    duration: '2 Hours',
    description: 'A historical journey passing by 16th-century fortresses and the old city lighthouse. Smooth waters and plenty of photo opportunities.',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800',
  },
];

const PopularRoutes = () => {
  return (
    <section className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl text-left">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight tracking-tight">
              Popular Routes
            </h2>
            <p className="text-muted-foreground text-lg">
              Hand-picked maritime adventures curated by our local captains.
            </p>
          </div>
          <Link href={'/routes'} className="text-primary font-semibold hover:underline flex items-center gap-2">
            View all routes <Navigation2 className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {routes.map((route) => (
            <Card 
              key={route.id} 
              className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 bg-card"
            >
              <div className="flex flex-col md:flex-row h-full">
                {/* Image Section */}
                <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
                  <Image
                    src={route.image}
                    alt={route.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold shadow-sm ${
                      route.difficulty === 'Easy' ? 'bg-emerald-500 text-white' :
                      route.difficulty === 'Moderate' ? 'bg-amber-500 text-white' :
                      'bg-rose-500 text-white'
                    }`}>
                      {route.difficulty}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <CardContent className="md:w-3/5 p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {route.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Anchor className="w-3.5 h-3.5" />
                      Verified Path
                    </div>
                  </div>
                  
                  <h3 className="font-serif text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {route.name}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-6">
                    {route.description}
                  </p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRoutes;