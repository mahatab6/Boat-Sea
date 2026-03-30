

import { Anchor, Calendar, Search, Shield } from 'lucide-react';
import React from 'react'

const HowItWorks = () => {
    const howItWorksSteps = [
    { icon: Search, title: 'Browse boats', description: 'Explore our curated selection of premium vessels' },
    { icon: Calendar, title: 'Choose dates', description: 'Select your preferred rental period and time' },
    { icon: Shield, title: 'Book securely', description: 'Complete your reservation with protected payment' },
    { icon: Anchor, title: 'Set sail', description: 'Enjoy your adventure on the open water' },
  ];
  return (
    <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight" style={{ letterSpacing: '-0.02em' }}>
                How it works
              </h2>
            </div>

            <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorksSteps.map((step, index) => (
                <div key={index} className="how-it-works-step text-center will-change-transform gpu-accel">
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <step.icon className="w-10 h-10 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
  )
}

export default HowItWorks