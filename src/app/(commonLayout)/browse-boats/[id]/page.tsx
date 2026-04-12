/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { redirect, useParams } from "next/navigation";
import {
  Star,
  MapPin,
  Users,
  Waves,
  Anchor,
  ShieldCheck,
  Clock,
  Calendar,
  Award,
  Badge,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";


import Image from "next/image";
import BookingFlow from "@/components/shared/bookingFlow";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";
import { getBoatById, getReviewById, getRouteById } from "@/services/getBoatById.services";

import { useQuery } from "@tanstack/react-query";
import { IBoat } from "@/types/boat.types";
import { ISchedule } from "@/types/schedule.type";
import { IReview } from "@/types/booking.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const amenityIcons: Record<string, React.ElementType> = {
  WiFi: Waves,
  // Add more icons as needed
  Default: Waves,
};

const BoatDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const { user } = useUser();
  const isAuthenticated = !!user?.email;

  // Queries
  const { data: boatResponse, isLoading } = useQuery({
    queryKey: ["boat", id],
    queryFn: () => getBoatById(id),
    enabled: !!id,
  });

  const { data: scheduleResponse, isLoading: scheduleLoading } = useQuery({
    queryKey: ["schedule", id],
    queryFn: () => getRouteById(id),
    enabled: !!id,
  });

  const { data: reviewResponse, isLoading: reviewLoading } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => getReviewById(id),
    enabled: !!id,
  });

  if (isLoading || scheduleLoading || reviewLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC] dark:bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-600 dark:text-slate-400">Loading boat details...</p>
        </div>
      </div>
    );
  }

  const boat = boatResponse as IBoat;
  const schedules = scheduleResponse as ISchedule[];
  const testimonials = reviewResponse?.data as IReview[] || [];

  if (!boat) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC] dark:bg-slate-950">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">
            Boat Not Found
          </h2>
          <p className="text-slate-600 dark:text-slate-400">The boat you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const handleBookNow = () => {
    if (!isAuthenticated) {
      toast.error("Please login to book this boat");
      redirect("/login");
      return;
    }
    setBookingModalOpen(true);
  };

  const averageRating = boat.rating || 4.8;

  return (
    <>
      <main className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 pb-20">
        {/* Hero Image Section */}
        <section className="relative h-[65vh] md:h-[80vh] w-full overflow-hidden">
          <Image
            src={boat.primary_img || "/placeholder-boat.jpg"}
            alt={boat.boatName}
            fill
            priority
            className="object-cover brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />

          {/* Overlay Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
              <Badge  className="mb-4 text-sm font-medium px-4 py-1.5">
                <Anchor className="w-4 h-4 mr-2" />
                {boat.boatType}
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
                {boat.boatName}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-xl font-semibold">{averageRating}</span>
                  <span className="text-sm">({testimonials.length} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">{boat.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span className="text-lg">Up to {boat.capacity} guests</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 pt-12 grid lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-14">
            {/* Description */}
            <section>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                About this vessel
              </h2>
              <div className="prose prose-slate dark:prose-invert max-w-none text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                {boat.description}
              </div>
            </section>

            {/* Amenities */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Amenities</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {boat.amenities?.map((item: string) => {
                  const IconComponent = amenityIcons[item] || amenityIcons.Default;
                  return (
                    <Card
                      key={item}
                      className="group hover:shadow-md transition-all duration-300 border-slate-200 dark:border-slate-800 hover:border-primary/30"
                    >
                      <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <span className="font-medium text-lg text-slate-800 dark:text-slate-200">
                          {item}
                        </span>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* Technical Specifications */}
            <section>
              <Card className="border-0 bg-slate-900 text-white dark:bg-slate-950 overflow-hidden">
                <CardHeader>
                  <h2 className="text-2xl font-semibold flex items-center gap-3">
                    <Calendar className="w-6 h-6" />
                    Technical Specifications
                  </h2>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="font-mono text-slate-300 leading-relaxed whitespace-pre-line">
                    {boat.specifications}
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Reviews Section */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Guest Reviews
                </h2>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span>{averageRating} • {testimonials.length} reviews</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.length > 0 ? (
                  testimonials.map((review) => (
                    <Card
                      key={review.id}
                      className="border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all duration-300"
                    >
                      <CardContent className="p-8 space-y-6">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${i < Math.floor(review.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-300 dark:text-slate-700"}`}
                            />
                          ))}
                        </div>

                        <p className="text-slate-600 dark:text-slate-300 text-[17px] leading-relaxed italic">
                          "{review.comment || "Amazing experience on this boat! Highly recommended."}"
                        </p>

                        <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                          <Avatar className="w-12 h-12 border-2 border-white dark:border-slate-900">
                            <AvatarImage src={review.reviewerImage ?? ""} />
                            <AvatarFallback className="bg-primary text-white font-medium">
                              {review.reviewerName?.charAt(0)?.toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>

                          <div>
                            <p className="font-semibold text-slate-900 dark:text-white">
                              {review.reviewerName}
                            </p>
                            <p className="text-xs text-emerald-600 dark:text-emerald-500 flex items-center gap-1">
                              ✓ Verified traveler
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-slate-500 dark:text-slate-400 col-span-2 py-12 text-center">
                    No reviews yet. Be the first to review this boat!
                  </p>
                )}
              </div>
            </section>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-4">
            <Card className="sticky top-24 shadow-2xl border-0 overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-bold text-primary tracking-tighter">
                    ${boat.pricePerTrip}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 text-lg">/ trip</span>
                </div>

                <div className="space-y-5">
                  {schedules?.map((schedule) => (
                    <div
                      key={schedule.id}
                      className="bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary/30 transition-colors"
                    >
                      <div className="font-semibold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                        🚢 {schedule.routeName}
                      </div>
                      <div className="mt-2 text-sm text-slate-600 dark:text-slate-400 font-mono">
                        {schedule.departureTime} — {schedule.arrivalTime}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-4 text-sm">
                  <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-500">
                    <ShieldCheck className="w-5 h-5" />
                    <span>Instant confirmation</span>
                  </div>
                  <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-500">
                    <Clock className="w-5 h-5" />
                    <span>Free cancellation up to 48 hours</span>
                  </div>
                </div>

                <Button
                  onClick={handleBookNow}
                  size="lg"
                  className="w-full mt-10 h-14 text-lg font-semibold rounded-2xl shadow-lg shadow-primary/25 hover:shadow-xl transition-all active:scale-[0.985] hover:cursor-pointer"
                >
                  Book This Experience
                </Button>

                <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-4">
                  You won't be charged yet
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <BookingFlow
        open={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        boat={boat}
        user={user}
        schedules={schedules}
      />
    </>
  );
};

export default BoatDetailPage;