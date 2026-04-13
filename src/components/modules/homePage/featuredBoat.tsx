"use client";

import BoatCard from "@/components/shared/BoatCard";
import { featuredBoats } from "@/services/featuredBoats.services";
import { IBoat } from "@/types/boat.types";
import { useQuery } from "@tanstack/react-query";

const FeaturedBoat = () => {
  const { data: response } = useQuery({
    queryKey: ["featured-boats"],
    queryFn: featuredBoats,
  });

  const boats = response?.data ?? [];

  console.log(response)

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Boats
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked premium vessels for unforgettable maritime experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {boats.map((boat: IBoat) => (
            <BoatCard key={boat.id} boat={boat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBoat;