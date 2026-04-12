/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo } from "react";
import { format, differenceInDays } from "date-fns";
import {
  CalendarIcon,
  Check,
  Users,
  Ship,
  ArrowRight,
  ArrowLeft,
  Clock,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import AnimatedModal from "./animatedModal";
import { cn } from "@/lib/utils";
import { UserInfo } from "@/types/user.types";
import { ISchedule } from "@/types/schedule.type";
import { IBoat } from "@/types/boat.types";
import { bookingAndPayment } from "@/services/getBoatById.services";

interface BookingFlowProps {
  open: boolean;
  onClose: () => void;
  boat: IBoat;
  user: UserInfo | null;
  schedules: ISchedule[];
}

const STEPS = [
  { id: 1, label: "Route" },
  { id: 2, label: "Dates" },
  { id: 3, label: "Guests" },
  { id: 4, label: "Review & Pay" },
];

const BookingFlow = ({
  open,
  onClose,
  boat,
  user,
  schedules,
}: BookingFlowProps) => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<ISchedule | null>(null);

  // Form States
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [passengerInfo, setPassengerInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    numberOfGuests: 1,
  });

  // Pricing Calculation
  const pricing = useMemo(() => {
    const days =
      startDate && endDate
        ? Math.max(1, differenceInDays(endDate, startDate))
        : 0;

    const basePrice = (boat?.pricePerTrip || 0) * days;
    const tax = Math.round(basePrice * 0.1);
    const serviceFee = days > 0 ? 50 : 0;

    return {
      days,
      basePrice,
      tax,
      serviceFee,
      total: basePrice + tax + serviceFee,
    };
  }, [startDate, endDate, boat?.pricePerTrip]);

  const handleNext = () => {
    if (step === 1 && !selectedSchedule) {
      return toast.error("Please select a route");
    }

    if (step === 2 && (!startDate || !endDate)) {
      return toast.error("Please select both check-in and check-out dates");
    }

    if (step === 3) {
      if (!passengerInfo.phone) {
        return toast.error("Phone number is required");
      }
      if (passengerInfo.numberOfGuests > (boat?.capacity || 1)) {
        return toast.error(`Maximum ${boat?.capacity} guests allowed`);
      }
      if (passengerInfo.numberOfGuests < 1) {
        return toast.error("At least 1 guest is required");
      }
    }

    setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    if (!selectedSchedule || !startDate || !endDate) {
      return toast.error("Missing booking information");
    }

    setLoading(true);

    const bookingPayload = {
      scheduleId: selectedSchedule.id,
      boatId: boat.id,
      tripDate: startDate.toISOString(),
      totalGuests: passengerInfo.numberOfGuests,
      totalAmount: pricing.total,
      paymentMethod: "STRIPE",
      passengerDetails: [
        {
          fullName: passengerInfo.name,
          isPrimary: true,
        },
      ],
      emergencyContact: passengerInfo.phone,
      specialRequests: "",
    };

    try {
      const response: any = await bookingAndPayment(bookingPayload);

      if (response?.paymentUrl) {
        toast.success("Redirecting to secure payment...");
        window.location.assign(response.paymentUrl);
      } else {
        toast.error(response?.message || "Failed to initiate payment");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <AnimatedModal
      open={open}
      onOpenChange={onClose}
      title={`Book ${boat?.boatName}`}
      className="max-w-2xl mx-4 sm:mx-auto"   // Better mobile padding
    >
      {/* Progress Steps */}
      <div className="mb-10">
        <div className="flex justify-between relative">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-800 -z-10" />
          
          {STEPS.map((s, index) => (
            <div key={s.id} className="flex flex-col items-center z-10">
              <div
                className={cn(
                  "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                  step >= s.id
                    ? "bg-primary border-primary text-white shadow-md"
                    : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-400"
                )}
              >
                {step > s.id ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="font-semibold text-sm">{s.id}</span>
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium mt-2 tracking-wider",
                  step >= s.id ? "text-primary" : "text-slate-500 dark:text-slate-400"
                )}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="min-h-[380px] pb-6">
        {/* STEP 1: Route Selection */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in-50 slide-in-from-right-5 duration-300">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold">Choose Your Route</h3>
            </div>

            <div className="grid gap-4">
              {schedules?.length > 0 ? (
                schedules.map((schedule) => (
                  <Card
                    key={schedule.id}
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-md border-2",
                      selectedSchedule?.id === schedule.id
                        ? "border-primary bg-primary/5 dark:bg-primary/10"
                        : "border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                    )}
                    onClick={() => setSelectedSchedule(schedule)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-lg">🚢 {schedule.routeName}</p>
                          <div className="flex items-center gap-2 mt-2 text-sm text-slate-600 dark:text-slate-400">
                            <Clock className="w-4 h-4" />
                            {schedule.departureTime} → {schedule.arrivalTime}
                          </div>
                        </div>
                        {selectedSchedule?.id === schedule.id && (
                          <Check className="w-6 h-6 text-primary mt-1" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-center py-12 text-slate-500">No routes available</p>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: Dates */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in-50 slide-in-from-right-5 duration-300">
            <div className="flex items-center gap-3">
              <CalendarIcon className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold">Select Travel Dates</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-base">Check-in Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-14 justify-start text-left font-normal rounded-2xl border-slate-300 dark:border-slate-700",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-3 h-5 w-5 text-primary" />
                      {startDate ? format(startDate, "PPP") : "Select check-in date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label className="text-base">Check-out Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-14 justify-start text-left font-normal rounded-2xl border-slate-300 dark:border-slate-700",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-3 h-5 w-5 text-primary" />
                      {endDate ? format(endDate, "PPP") : "Select check-out date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      disabled={(date) => date <= (startDate || new Date())}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Passenger Info */}
        {step === 3 && (
          <div className="space-y-8 animate-in fade-in-50 slide-in-from-right-5 duration-300">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold">Guest Information</h3>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 text-sm text-amber-700 dark:text-amber-400">
              Maximum capacity: <span className="font-semibold">{boat?.capacity} guests</span>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Full Name (Primary Guest)</Label>
                <Input
                  value={passengerInfo.name}
                  onChange={(e) => setPassengerInfo({ ...passengerInfo, name: e.target.value })}
                  className="h-14 rounded-2xl"
                  placeholder="Enter full name"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input
                    type="tel"
                    placeholder="+880 1XXX-XXXXXX"
                    value={passengerInfo.phone}
                    onChange={(e) => setPassengerInfo({ ...passengerInfo, phone: e.target.value })}
                    className="h-14 rounded-2xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Number of Guests</Label>
                  <Input
                    type="number"
                    min={1}
                    max={boat?.capacity || 10}
                    value={passengerInfo.numberOfGuests}
                    onChange={(e) =>
                      setPassengerInfo({
                        ...passengerInfo,
                        numberOfGuests: parseInt(e.target.value) || 1,
                      })
                    }
                    className="h-14 rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Review & Summary */}
        {step === 4 && (
          <div className="space-y-8 animate-in fade-in-50 slide-in-from-right-5 duration-300">
            <div className="flex items-center gap-3">
              <Ship className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold">Booking Summary</h3>
            </div>

            <Card className="border-0 shadow-sm bg-slate-50 dark:bg-slate-900/70">
              <CardContent className="p-8 space-y-8">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Vessel</p>
                    <p className="font-semibold text-lg">{boat?.boatName}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Route</p>
                      <p className="font-medium">{selectedSchedule?.routeName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Duration</p>
                      <p className="font-medium">{pricing.days} days</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Travel Period</p>
                    <p className="font-medium">
                      {startDate && endDate
                        ? `${format(startDate, "MMMM d")} — ${format(endDate, "MMMM d, yyyy")}`
                        : ""}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span>Base Price</span>
                    <span>${pricing.basePrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (10%)</span>
                    <span>${pricing.tax}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service & Docking Fee</span>
                    <span>${pricing.serviceFee}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Amount</span>
                    <span className="text-primary">${pricing.total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 pt-6 border-t border-slate-200 dark:border-slate-800 mt-auto">
        {step > 1 && (
          <Button
            variant="outline"
            onClick={() => setStep((s) => s - 1)}
            className="h-14 rounded-2xl flex-1 text-base font-medium hover:cursor-pointer"
          >
            <ArrowLeft className="mr-2 w-5 h-5" />
            Back
          </Button>
        )}

        {step < STEPS.length ? (
          <Button
            onClick={handleNext}
            className="h-14 rounded-2xl flex-1 text-base font-semibold shadow-md hover:shadow-lg transition-all hover:cursor-pointer"
          >
            Continue
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="h-14 rounded-2xl flex-1 text-base font-semibold bg-primary hover:bg-primary/90 shadow-md hover:cursor-pointer"
          >
            {loading ? "Processing Payment..." : `Pay $${pricing.total}`}
          </Button>
        )}
      </div>
    </AnimatedModal>
  );
};

export default BookingFlow;