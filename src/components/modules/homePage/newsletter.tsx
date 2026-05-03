import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

const Newsletter = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-primary rounded-3xl p-8 md:p-16 overflow-hidden relative shadow-xl">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-primary-foreground opacity-10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-accent opacity-20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Join our maritime community
              </h2>
              <p className="text-primary-foreground/80 text-lg">
                Subscribe to our newsletter to receive exclusive offers, new route announcements, and sailing tips directly to your inbox.
              </p>
            </div>
            
            <div className="md:w-1/2 w-full max-w-md">
              <form className="flex flex-col sm:flex-row gap-3">
                <Input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 h-12 rounded-full px-6 focus-visible:ring-primary-foreground/50"
                  required
                />
                <Button 
                  type="submit" 
                  variant="secondary" 
                  className="h-12 rounded-full px-8 hover:cursor-pointer shadow-lg hover:shadow-xl transition-all"
                >
                  Subscribe <Send className="ml-2 w-4 h-4" />
                </Button>
              </form>
              <p className="text-primary-foreground/60 text-xs mt-3 text-center md:text-left">
                We care about your data. Read our Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
