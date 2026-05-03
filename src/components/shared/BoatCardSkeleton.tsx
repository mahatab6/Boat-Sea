import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const BoatCardSkeleton = () => {
  return (
    <Card className="flex flex-col overflow-hidden border border-border shadow-sm h-full bg-card rounded-2xl">
      {/* Image Skeleton */}
      <div className="relative h-60 w-full shrink-0">
        <Skeleton className="h-full w-full rounded-none" />
        <Skeleton className="absolute top-4 left-4 h-6 w-20 rounded-full" />
      </div>

      {/* Content Skeleton */}
      <CardContent className="p-5 flex flex-col flex-grow">
        <Skeleton className="h-7 w-3/4 mb-2" />
        
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-5/6 mb-6 flex-grow" />

        {/* Rating, Location, Price */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-20" />
        </div>

        {/* Action Button */}
        <Skeleton className="h-10 w-full rounded-full" />
      </CardContent>
    </Card>
  );
};

export default BoatCardSkeleton;
