import React from 'react';
import { Ship, Navigation, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Services = () => {
  const services = [
    {
      icon: Ship,
      title: "Boat Rentals",
      description: "Rent a premium boat for a day or a week. Choose from our wide selection of yachts, sailboats, and catamarans.",
      link: "/browse-boats"
    },
    {
      icon: Navigation,
      title: "Guided Tours",
      description: "Join our expertly crafted tours to explore hidden coves, vibrant coral reefs, and historic coastal landmarks.",
      link: "/routes"
    },
    {
      icon: Users,
      title: "Hire a Captain",
      description: "Sit back and relax. Hire a certified local captain and crew to navigate while you enjoy the journey.",
      link: "/for-owners"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight" style={{ letterSpacing: '-0.02em' }}>
            Our Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tailored maritime experiences designed for your ultimate comfort and adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                <service.icon className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-4">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">{service.description}</p>
              <Button variant="outline" className="w-full sm:w-auto self-start rounded-full hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-colors" asChild>
                <Link href={service.link}>Learn More</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
