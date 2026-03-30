/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from 'react';
import { redirect, useParams } from 'next/navigation';
import { 
  Star, MapPin, Users, Wifi, UtensilsCrossed, Bed, 
  Bath, Waves, ChevronLeft, ChevronRight, Anchor, 
  ShieldCheck, Clock, Calendar as CalendarIcon
} from 'lucide-react';

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import BookingFlow from '@/components/shared/bookingFlow';
import { toast } from 'sonner';

// Mock Data for the Specific Boat
const MOCK_BOAT = {
  id: "1",
  name: "Azure Horizon Luxury",
  description: "The Azure Horizon is a masterpiece of maritime engineering. This 45ft designer yacht offers an unparalleled experience for those seeking luxury on the open water. Whether you are planning a romantic sunset cruise or a high-energy party with friends, this vessel provides the perfect backdrop with its Italian leather interiors, state-of-the-art surround sound, and an expansive flybridge.",
  specifications: "Length: 45ft | Beam: 14ft | Draft: 3.5ft | Engine: Twin Volvo Penta 435HP | Fuel: Diesel",
  pricePerDay: 450,
  rating: 4.9,
  reviewsCount: 124,
  location: "Biscayne Bay, Miami",
  capacity: 12,
  boatType: "Luxury Yacht",
  featured: true,
  amenities: ["WiFi", "Kitchen", "Bedroom", "Bathroom", "Deck"],
  images: [
    'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1618530015131-4942d6124963?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1540946484610-45cd338d0411?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&q=80&w=1200'
  ]
};

const amenityIcons: Record<string, any> = {
  WiFi: Wifi,
  Kitchen: UtensilsCrossed,
  Bedroom: Bed,
  Bathroom: Bath,
  Deck: Waves,
};

  

const BoatDetailPage = () => {

  const { id } = useParams();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const isAuthenticated = true;

  // Mock booked dates (e.g., tomorrow and the day after)
  const bookedDates = [
    new Date(new Date().setDate(new Date().getDate() + 1)),
    new Date(new Date().setDate(new Date().getDate() + 5)),
  ];

  const handleBookNow = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to book a boat');
      redirect('/login');
      return;
    }
    setBookingModalOpen(true);
  };

  return (
    <>
    <main className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* 1. Image Gallery with Swiper Autoplay Progress */}
      <section className="relative h-[60vh] md:h-[75vh] w-full group">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            type: 'progressbar', // Progress bar style
          }}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="h-full w-full"
        >
          {MOCK_BOAT.images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <Image
                  src={src}
                  alt={`${MOCK_BOAT.name} view ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="swiper-button-prev-custom absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-primary">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button className="swiper-button-next-custom absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-primary">
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Floating Boat Title Over Image */}
        <div className="absolute bottom-12 left-0 w-full z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-white rounded-md text-xs font-bold uppercase tracking-widest mb-4">
              <Anchor className="w-3 h-3" /> {MOCK_BOAT.boatType}
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tight">
              {MOCK_BOAT.name}
            </h1>
          </div>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* LEFT: Details */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Quick Info Bar */}
            <div className="flex flex-wrap gap-8 py-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <p className="text-sm font-bold">{MOCK_BOAT.rating}</p>
                  <p className="text-xs text-muted-foreground">{MOCK_BOAT.reviewsCount} Reviews</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">Location</p>
                  <p className="text-xs text-muted-foreground">{MOCK_BOAT.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">{MOCK_BOAT.capacity} Guests</p>
                  <p className="text-xs text-muted-foreground">Max Capacity</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <section>
              <h2 className="text-2xl font-serif font-bold mb-6">About this vessel</h2>
              <p className="text-slate-600 leading-relaxed text-lg italic">
                {MOCK_BOAT.description}
              </p>
            </section>

            {/* Amenities Grid */}
            <section>
              <h2 className="text-2xl font-serif font-bold mb-6">Premium Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {MOCK_BOAT.amenities.map((item) => {
                  const Icon = amenityIcons[item] || Waves;
                  return (
                    <div key={item} className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-primary"><Icon className="w-6 h-6" /></div>
                      <span className="font-semibold text-slate-700">{item}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Specifications Card */}
            <section className="bg-slate-900 text-white p-8 rounded-[2rem] relative overflow-hidden">
               <Anchor className="absolute -right-8 -bottom-8 w-48 h-48 opacity-10 rotate-12" />
               <h2 className="text-2xl font-serif font-bold mb-4">Technical Specs</h2>
               <p className="text-slate-400 font-mono text-sm leading-loose">
                 {MOCK_BOAT.specifications}
               </p>
            </section>

            {/* Reviews */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-serif font-bold">Guest Experiences</h2>
                <Button variant="outline" className="rounded-full">See All Reviews</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: 'Marcus Sterling', date: 'March 2024', text: 'An absolute dream. The sound system was incredible and the captain was very professional.' },
                  { name: 'Elena Rodriguez', date: 'Feb 2024', text: 'Cleanest boat I’ve ever rented. The kitchen was fully equipped for our dinner party.' }
                ].map((rev, i) => (
                  <Card key={i} className="border-none shadow-sm bg-white p-6 rounded-2xl">
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                    </div>
                    <p className="text-slate-600 text-sm mb-4">{rev.text}</p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200" />
                      <div>
                        <p className="text-xs font-bold">{rev.name}</p>
                        <p className="text-[10px] text-muted-foreground">{rev.date}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT: Booking Sidebar */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-24 border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
              <div className="p-8">
                <div className="flex items-baseline justify-between mb-8">
                  <div>
                    <span className="text-4xl font-black text-primary">${MOCK_BOAT.pricePerDay}</span>
                    <span className="text-muted-foreground text-sm font-bold uppercase tracking-tighter">/ day</span>
                  </div>
                  <div className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase rounded-full">
                    Available Now
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Date Picker */}
                  <div className="space-y-3">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Select Date</Label>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(d) => d < new Date() || bookedDates.some(bd => bd.toDateString() === d.toDateString())}
                      className="rounded-2xl border border-black-100 shadow-inner text-black"
                    />
                  </div>

                  {/* Trust Badges */}
                  <div className="space-y-3 pt-4">
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                      <ShieldCheck className="w-4 h-4 text-green-500" /> Instant Confirmation
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                      <Clock className="w-4 h-4 text-blue-500" /> 24h Free Cancellation
                    </div>
                  </div>

                   <Button
                    onClick={handleBookNow}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-[0.98]"
                    size="lg"
                  >
                    Book now
                  </Button>
                  
                  <p className="text-center text-[10px] text-muted-foreground">
                    You wonot be charged yet. Final price includes insurance.
                  </p>
                </div>
              </div>
            </Card>
          </aside>

        </div>
      </div>
    </main>
    <BookingFlow open={bookingModalOpen} onClose={() => setBookingModalOpen(false)} boat={MOCK_BOAT} />
    </>
  );
};

export default BoatDetailPage;