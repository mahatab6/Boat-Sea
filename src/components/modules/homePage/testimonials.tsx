/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { Star, BadgeCheck, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { getAllReview } from "@/app/(dashboardLayout)/dashboard/customer/my-bookings/_action";
import { IReview } from "@/types/booking.types";

const Testimonials = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getAllReviews"],
    queryFn: () => getAllReview(),
  });

  const testimonials = (data?.data as IReview[]) || [];

  if (isLoading) {
    return (
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="animate-pulse">
            <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded mx-auto mb-4" />
            <div className="h-4 w-96 bg-slate-200 dark:bg-slate-800 rounded mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800 mb-6">
            <BadgeCheck className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-semibold tracking-widest text-slate-600 dark:text-slate-400">
              TESTIMONIALS
            </span>
          </div>

          <h2 className="font-serif text-5xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            Real Stories from<br />Happy Sailors
          </h2>

          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Don't just take our word for it — hear what our guests experienced on the water.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.length > 0 ? (
            testimonials.map((review, index) => (
              <Card
                key={review.id}
                className="group relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 
                           hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-2xl 
                           transition-all duration-500 overflow-hidden rounded-3xl h-full flex flex-col"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 flex flex-col h-full">
                  
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <Quote className="w-10 h-10 text-slate-200 dark:text-slate-800 group-hover:text-primary/20 transition-colors" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 transition-colors ${
                          i < Math.floor(review.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-slate-200 dark:text-slate-700"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                      {review.rating.toFixed(1)}
                    </span>
                  </div>

                  {/* Review Comment */}
                  <blockquote className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 flex-1">
                    "{review.comment || "An unforgettable experience on the water. Highly recommended!"}"
                  </blockquote>

                  {/* Divider */}
                  <div className="my-8 border-t border-slate-100 dark:border-slate-800" />

                  {/* Reviewer Info */}
                  <div className="flex items-center gap-4">
                    <Avatar className="w-14 h-14 ring-2 ring-white dark:ring-slate-800">
                      <AvatarImage 
                        src={review.reviewerImage ?? ""} 
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-sky-600 text-white font-semibold">
                        {review.reviewerName?.charAt(0)?.toUpperCase() || "G"}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        {review.reviewerName}
                        <BadgeCheck className="w-4 h-4 text-emerald-500" />
                      </div>
                      <p className="text-sm text-emerald-600 dark:text-emerald-500 font-medium">
                        Verified Traveler
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-3 py-20 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-lg">
                No testimonials available yet.
              </p>
            </div>
          )}
        </div>

        {/* Bottom Trust Line */}
        <div className="text-center mt-16 text-sm text-slate-500 dark:text-slate-400">
          Trusted by over <span className="font-semibold text-slate-700 dark:text-white">2,400+</span> happy adventurers
        </div>
      </div>
    </section>
  );
};

export default Testimonials;