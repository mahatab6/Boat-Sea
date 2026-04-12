/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { Star, BadgeCheck, Calendar, Quote, Badge } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { getMYReview } from "@/services/getBoatById.services";
import { IReview } from "@/types/booking.types";

const MyReviewPage = () => {
  const { data: myReview, isLoading } = useQuery({
    queryKey: ["myReviews"],
    queryFn: () => getMYReview(),
  });

  const testimonials = (myReview?.data as IReview[]) || [];

  // Calculate average rating
  const averageRating =
    testimonials.length > 0
      ? (testimonials.reduce((sum, review) => sum + review.rating, 0) / testimonials.length).toFixed(1)
      : "0.0";

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-10 w-64 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="h-80 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            My Reviews
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            All the feedback you've shared about your boat experiences
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="text-right">
            <p className="text-sm text-slate-500 dark:text-slate-400">Average Rating</p>
            <div className="flex items-center gap-1 justify-end">
              <span className="text-3xl font-semibold text-slate-900 dark:text-white">
                {averageRating}
              </span>
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
          <div className="h-12 w-px bg-slate-200 dark:bg-slate-700" />
          <div>
            <p className="text-2xl font-semibold text-emerald-600">{testimonials.length}</p>
            <p className="text-xs text-slate-500">Reviews Given</p>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      {testimonials.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {testimonials.map((review) => (
            <Card
              key={review.id}
              className="group overflow-hidden border border-slate-200 dark:border-slate-800 
                         hover:border-primary/30 hover:shadow-xl transition-all duration-300 
                         bg-white dark:bg-slate-900 rounded-3xl"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  {/* Boat Info (You can enhance this if you have boat name) */}
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Reviewed Boat</p>
                    <p className="font-medium text-slate-900 dark:text-white line-clamp-1">
                      {review.boatId ? "Boat Experience" : "General Review"}
                    </p>
                  </div>

                  {/* Verified Badge */}
                  {review.isVerified && (
                    <Badge  className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-400 flex items-center gap-1">
                      <BadgeCheck className="w-3.5 h-3.5" />
                      Verified
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6 pt-0">
                {/* Rating */}
                <div className="flex items-center gap-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${
                          i < Math.floor(review.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-slate-200 dark:text-slate-700"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-2xl font-semibold text-slate-900 dark:text-white">
                    {review.rating}
                  </span>
                </div>

                {/* Comment */}
                <div className="relative">
                  <Quote className="absolute -left-1 -top-2 w-8 h-8 text-slate-200 dark:text-slate-800" />
                  <p className="text-[17px] leading-relaxed text-slate-700 dark:text-slate-300 pl-8 italic">
                    {review.comment || "No comment provided."}
                  </p>
                </div>

                {/* Reviewer & Date */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12 ring-2 ring-white dark:ring-slate-800">
                      <AvatarImage src={review.reviewerImage ?? ""} className="object-cover" />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-sky-600 text-white font-medium">
                        {review.reviewerName?.charAt(0)?.toUpperCase() || "R"}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {review.reviewerName}
                      </p>
                      <p className="text-xs text-slate-500">You</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Empty State */
        <Card className="border-dashed border-2 border-slate-200 dark:border-slate-700 py-20">
          <CardContent className="text-center">
            <div className="mx-auto w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
              <Star className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">
              No Reviews Yet
            </h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              You haven't written any reviews yet. Once you complete a trip, you'll be able to share your experience here.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MyReviewPage;