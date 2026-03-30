"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  DollarSign, 
  Shield, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Anchor
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ForOwnersPage = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Maximize Earnings',
      description: 'Set your own rates and earn up to 40% more than traditional charter services with our low commission model.',
    },
    {
      icon: Users,
      title: 'Reach More Renters',
      description: 'Access our growing network of verified customers seeking everything from jet skis to luxury yachts.',
    },
    {
      icon: Shield,
      title: 'Protected Bookings',
      description: 'Comprehensive maritime insurance options and secure, automated payment processing for peace of mind.',
    },
    {
      icon: TrendingUp,
      title: 'Analytics Dashboard',
      description: 'Track performance, fuel usage, and revenue with detailed insights and professional reporting tools.',
    },
  ];

  const steps = [
    { number: "01", title: "List Your Boat", desc: "Upload photos and set your pricing." },
    { number: "02", title: "Verify Details", desc: "Our team checks safety compliance." },
    { number: "03", title: "Start Earning", desc: "Accept bookings and get paid weekly." },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-[#0A192F]">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="https://images.unsplash.com/photo-1567891137160-72111070f449?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Yacht" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#0A192F] via-[#0A192F]/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground text-xs font-bold uppercase tracking-widest mb-6">
              <Anchor className="w-3 h-3" /> Partner with BoatSea
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
              Turn Your Vessel Into <span className=" italic">Revenue.</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
              Join the worlds most trusted maritime marketplace. We handle the logistics while you enjoy the returns on your investment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full px-10 h-14 text-lg font-bold shadow-xl shadow-primary/20">
                List Your Boat Now
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-10 h-14 text-lg font-bold text-black border-white/20 hover:bg-white/10">
                View Earnings Estimator
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Social Proof Section */}
      <section className="py-12 border-y border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center md:justify-between gap-8">
          {[
            { label: "Active Owners", value: "2,500+" },
            { label: "Avg. Monthly Income", value: "$4,200" },
            { label: "Insurance Coverage", value: "$1M" },
            { label: "User Rating", value: "4.9/5" }
          ].map((stat, i) => (
            <div key={i} className="text-center md:text-left">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-tighter">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
              Why Boat Owners Choose Us
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We provide a professional-grade suite of tools designed to help you run a high-performance rental business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="group border-none shadow-sm hover:shadow-2xl transition-all duration-500 bg-card overflow-hidden">
                <CardContent className="p-10 relative">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                    <benefit.icon className="w-32 h-32 rotate-12" />
                  </div>
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works (Steps) */}
      <section className="py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {steps.map((step, i) => (
              <div key={i} className="relative p-8 rounded-3xl bg-background shadow-sm border border-border/50">
                <span className="text-6xl font-serif font-black text-primary/10 absolute top-4 right-6 leading-none">
                  {step.number}
                </span>
                <h4 className="text-xl font-bold mb-3 mt-4">{step.title}</h4>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-[3rem] p-12 md:p-24 relative overflow-hidden text-center group">
             {/* Decorative Background Elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
              <Anchor className="absolute -top-10 -left-10 w-64 h-64 rotate-12" />
              <Anchor className="absolute -bottom-10 -right-10 w-64 h-64 -rotate-12" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="font-serif text-4xl md:text-6xl font-bold text-primary-foreground mb-8 leading-tight">
                Ready to set sail on your new business?
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-12 font-medium">
                Create your account today and list your first boat in under 15 minutes.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/signup">
                  <Button size="lg" variant="secondary" className="rounded-full px-10 h-16 text-lg font-bold group/btn">
                    Start Listing <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button size="lg" variant="ghost" className="rounded-full px-10 h-16 text-lg font-bold text-primary-foreground hover:bg-primary-foreground/10">
                  Talk to an Expert
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ForOwnersPage;