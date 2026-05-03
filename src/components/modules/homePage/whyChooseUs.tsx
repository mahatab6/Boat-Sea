import React from 'react';
import { ShieldCheck, HeartHandshake, Map, Anchor } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: ShieldCheck,
      title: "Verified & Secure",
      description: "All our boats and captains are strictly verified for your safety and peace of mind.",
    },
    {
      icon: Map,
      title: "Diverse Destinations",
      description: "Explore hundreds of breathtaking routes and hidden gems across the coastline.",
    },
    {
      icon: HeartHandshake,
      title: "24/7 Support",
      description: "Our dedicated customer service team is always ready to assist you on your journey.",
    },
    {
      icon: Anchor,
      title: "Best Price Guarantee",
      description: "We offer the most competitive rates with no hidden fees or surprise charges.",
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight" style={{ letterSpacing: '-0.02em' }}>
            Why Choose Us
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the ocean like never before with our premium services and unmatched reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-background rounded-2xl p-8 border border-border hover:shadow-lg transition-all duration-300 group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <reason.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">{reason.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
