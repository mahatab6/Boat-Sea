

import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const Testimonials = () => {

    const testimonials = [
    { name: 'Lucia Torres', role: 'Adventure Traveler', rating: 5, text: 'Rented a catamaran for a week-long trip. The booking process was seamless and the boat exceeded expectations.' },
    { name: 'Raj Patel', role: 'Corporate Event Planner', rating: 5, text: 'Used AquaRent for a company retreat. Professional service, pristine vessels, and unforgettable experience.' },
    { name: 'Anika Bergström', role: 'Family Vacationer', rating: 5, text: 'Perfect for our family getaway. The yacht had all amenities we needed and the crew was incredibly helpful.' },
  ];


  return (
    <section className="py-24 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight" style={{ letterSpacing: '-0.02em' }}>
                What our clients say
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="testimonial-card border-0 shadow-lg p-6 will-change-transform gpu-accel">
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-accent text-accent" color='yellow'/>
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed italic">{testimonial.text}</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
  )
}

export default Testimonials