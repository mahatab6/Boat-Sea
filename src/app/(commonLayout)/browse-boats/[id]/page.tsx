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
} from "lucide-react";


import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";
import { Label } from "@/components/ui/label";

import BookingFlow from "@/components/shared/bookingFlow";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";
import { getBoatById } from "@/services/getBoatById.services";

import { useQuery } from "@tanstack/react-query";
import { IBoat } from "@/types/boat.types";

const amenityIcons: Record<string, any> = {
  WiFi: Waves,
};

const BoatDetailPage = () => {
  const { id } = useParams();

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const { user }: any = useUser();
  const isAuthenticated = !!user?.email;

  const { data: response, isLoading } = useQuery({
    queryKey: ["boat", id],
    queryFn: () => getBoatById(id as string),
    enabled: !!id,
  });
  console.log(response);
  const boat = response as IBoat;

  const bookedDates = [
    new Date(new Date().setDate(new Date().getDate() + 1)),
    new Date(new Date().setDate(new Date().getDate() + 5)),
  ];

  const handleBookNow = () => {
    if (!isAuthenticated) {
      toast.error("Please login first");
      redirect("/login");
      return;
    }

    setBookingModalOpen(true);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading boat details...
      </div>
    );

  if (!boat)
    return (
      <div className="flex items-center justify-center h-screen">
        Boat not found
      </div>
    );

  return (
    <>
      <main className="min-h-screen bg-[#F8FAFC] pb-24">
        {/* IMAGE SLIDER */}
        <section className="relative h-[60vh] md:h-[75vh] w-full group">
          <Image
            src={boat.primary_img || ""}
            alt={boat.boatName}
            fill
            priority
            className="object-cover"
          />
        </section>

        {/* CONTENT GRID */}
        <div className="max-w-7xl mx-auto px-6 mt-12 grid lg:grid-cols-3 gap-12">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-12">
            {/* TITLE */}
            <div className="bottom-12 left-0 w-full">
              <div className="max-w-7xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-white rounded-md text-xs font-bold uppercase tracking-widest mb-4">
                  <Anchor className="w-3 h-3" />
                  {boat.boatType}
                </div>

                <h1 className="text-5xl font-bold text-slate-900 dark:text-white">
                  {boat.boatName}
                </h1>
              </div>
            </div>

            {/* QUICK INFO */}
            <div className="flex flex-wrap gap-10 border-b border-slate-200 dark:border-slate-700 pb-6">
              <InfoCard icon={Star} label={boat.rating} />

              <InfoCard icon={MapPin} label={boat.location} />

              <InfoCard icon={Users} label={`${boat.capacity} Guests`} />
            </div>

            {/* DESCRIPTION */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                About this vessel
              </h2>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {boat.description}
              </p>
            </section>

            {/* AMENITIES */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                Amenities
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {boat.amenities?.map((item: string) => {
                  const Icon = amenityIcons[item] || Waves;

                  return (
                    <div
                      key={item}
                      className="flex items-center gap-3 p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition"
                    >
                      <Icon className="text-primary" />

                      <span className="text-slate-800 dark:text-slate-200 font-medium">
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SPECIFICATIONS */}
            <section className="bg-slate-900 text-white dark:bg-black p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl mb-3 font-semibold">
                Technical Specifications
              </h2>

              <p className="text-slate-300 font-mono leading-relaxed">
                {boat.specifications}
              </p>
            </section>
          </div>

          {/* RIGHT SIDE */}
          <aside>
            <Card className="sticky top-20 p-6 rounded-2xl shadow-xl">
              <div className="text-4xl font-bold text-primary">
                ${boat.pricePerTrip}
              </div>

              <Label>Select Date</Label>

              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(d) =>
                  d < new Date() ||
                  bookedDates.some(
                    (bd) => bd.toDateString() === d.toDateString(),
                  )
                }
              />

              <div className="space-y-3 mt-4 text-sm text-gray-500">
                <div className="flex gap-2">
                  <ShieldCheck /> Instant Confirmation
                </div>

                <div className="flex gap-2">
                  <Clock /> Free Cancellation
                </div>
              </div>

              <Button onClick={handleBookNow} className="w-full mt-5">
                Book Now
              </Button>
            </Card>
          </aside>
        </div>
      </main>

      <BookingFlow
        open={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        boat={boat}
      />
    </>
  );
};

export default BoatDetailPage;

function InfoCard({ icon: Icon, label }: any) {
  return (
    <div className="flex items-center gap-3">
      <Icon />

      <span className="font-semibold">{label}</span>
    </div>
  );
}
