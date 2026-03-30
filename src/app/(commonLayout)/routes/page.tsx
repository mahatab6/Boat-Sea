"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Anchor, Navigation2, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock Data for better UI testing
const routes = [
  {
    id: '1',
    name: 'The Emerald Coast Explorer',
    difficulty: 'Easy',
    duration: '4-6 Hours',
    distance: '12km',
    scenicHighlights: 'Hidden Sea Caves, Crystal Waters',
    description: 'Cruise through crystal clear turquoise waters and discover hidden sea caves along the rugged coastline. Perfect for families and beginners.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '2',
    name: 'Sunset Archipelago Trail',
    difficulty: 'Moderate',
    duration: '3 Hours',
    distance: '8km',
    scenicHighlights: 'Volcanic Islands, Golden Hour Views',
    description: 'Navigate through a cluster of volcanic islands as the sun dips below the horizon. Experience the most vibrant golden hour on the water.',
    image: 'https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '3',
    name: 'Deep Sea Fishing Route',
    difficulty: 'Advanced',
    duration: '8-10 Hours',
    distance: '45km',
    scenicHighlights: 'Deep Blue Horizon, Big Game Territory',
    description: 'Venture into deep blue waters where the big game hangs out. This route takes you past the shelf into prime marlin and tuna territory.',
    image: 'https://images.unsplash.com/photo-1534239143101-1b1c627395c5?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '4',
    name: 'Ancient Harbor Passage',
    difficulty: 'Easy',
    duration: '2 Hours',
    distance: '5km',
    scenicHighlights: '16th-century Fortresses, Old Lighthouse',
    description: 'A historical journey passing by 16th-century fortresses and the old city lighthouse. Smooth waters and plenty of photo opportunities.',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800',
  },
];

const RoutesPage = () => {
 const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const filteredRoutes = selectedDifficulty === 'All' 
    ? routes 
    : routes.filter((route) => route.difficulty === selectedDifficulty);

  const difficulties = ['All', 'Easy', 'Moderate', 'Advanced'];

  return (
    <main className="min-h-screen bg-background py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12">
          <div className="max-w-3xl animate-in fade-in slide-in-from-left duration-700">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Explore Our <span className="text-primary italic">Popular Routes</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              From serene coastal drifts to challenging deep-sea expeditions, find the perfect path for your next maritime journey.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-3 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            {difficulties.map((difficulty) => (
              <Button
                key={difficulty}
                variant={selectedDifficulty === difficulty ? 'default' : 'outline'}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={cn(
                  "rounded-full px-8 h-11 transition-all duration-300 font-medium",
                  selectedDifficulty === difficulty 
                    ? "shadow-lg shadow-primary/20 scale-105" 
                    : "hover:bg-muted"
                )}
              >
                {difficulty}
              </Button>
            ))}
          </div>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {filteredRoutes.map((route, index) => (
            <Card 
              key={route.id} 
              className={cn(
                "group overflow-hidden border-none shadow-md hover:shadow-2xl transition-all duration-500 bg-card will-change-transform hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8",
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col md:flex-row h-full">
                
                {/* Image Section */}
                <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
                  <Image
                    src={route.image}
                    alt={route.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  {/* Floating Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-black shadow-lg text-white",
                      route.difficulty === 'Easy' ? 'bg-emerald-500' :
                      route.difficulty === 'Moderate' ? 'bg-amber-500' :
                      'bg-rose-600'
                    )}>
                      {route.difficulty}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <CardContent className="md:w-3/5 p-8 flex flex-col">
                  <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-primary" />
                      {route.duration}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-primary" />
                      {route.distance}
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 leading-tight">
                    {route.name}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-6">
                    {route.description}
                  </p>

                  {route.scenicHighlights && (
                    <div className="mb-6 p-3 rounded-lg bg-muted/50 border-l-2 border-primary/30 transition-colors group-hover:bg-primary/5">
                      <p className="text-[11px] uppercase tracking-wider font-bold text-foreground mb-1">Highlights</p>
                      <p className="text-xs text-muted-foreground italic line-clamp-1">
                        {route.scenicHighlights}
                      </p>
                    </div>
                  )}

                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/50">
                    <button className="text-xs font-black uppercase tracking-widest text-foreground group-hover:text-primary transition-all flex items-center gap-2 group/btn">
                      Explore Route 
                      <Navigation2 className="w-3 h-3 rotate-45 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                    </button>
                    <Anchor className="w-4 h-4 text-muted-foreground/30 group-hover:rotate-12 group-hover:text-primary/40 transition-all" />
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredRoutes.length === 0 && (
          <div className="text-center py-24 bg-muted/20 rounded-3xl border-2 border-dashed border-muted animate-in zoom-in duration-500">
            <Navigation2 className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">No routes found</h3>
            <p className="text-muted-foreground mb-8">Try adjusting your filters or check back later.</p>
            <Button variant="outline" onClick={() => setSelectedDifficulty('All')} className="rounded-full px-8">
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default RoutesPage;