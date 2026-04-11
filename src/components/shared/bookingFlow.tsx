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
import AnimatedModal from "./animatedModal";
import { cn } from "@/lib/utils";

interface BookingFlowProps {
  open: boolean;
  onClose: () => void;
  boat: any;
}


const STEPS = [
  { id: 1, label: "Schedule" },
  { id: 2, label: "Passengers" },
  { id: 3, label: "Review" },
];

const BookingFlow = ({ open, onClose, boat }: BookingFlowProps) => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form States
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [passengerInfo, setPassengerInfo] = useState({
    name: "", // Defaulting from your profile context
    email: "",
    phone: "",
    numberOfGuests: 1,
  });

  // Memoized Calculations
  const pricing = useMemo(() => {
    const days =
      startDate && endDate
        ? Math.max(1, differenceInDays(endDate, startDate))
        : 0;
    const basePrice = (boat?.pricePerDay || 0) * days;
    const tax = basePrice * 0.1;
    const serviceFee = basePrice > 0 ? 50 : 0;
    return {
      days,
      basePrice,
      tax,
      serviceFee,
      total: basePrice + tax + serviceFee,
    };
  }, [startDate, endDate, boat?.pricePerDay]);

  const handleNext = () => {
    if (step === 1 && (!startDate || !endDate))
      return toast.error("Select booking dates");
    if (step === 2) {
      if (!passengerInfo.phone) return toast.error("Phone number is required");
      if (passengerInfo.numberOfGuests > (boat?.capacity || 1))
        return toast.error("Exceeds boat capacity");
    }
    setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      toast.success("Voyage Booked Successfully!");
      onClose();
      router.push("/dashboard");
    }, 2000);
  };

  return (
    <AnimatedModal
      open={open}
      onOpenChange={onClose}
      title={`Booking: ${boat?.name}`}
      className="max-w-2xl" // Fixed the missing className error
    >
      {/* Step Indicator */}
      <nav className="flex justify-between mb-10 relative">
        <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-100 -z-10" />
        {STEPS.map((s) => (
          <div
            key={s.id}
            className="flex flex-col items-center gap-2 bg-white px-2"
          >
            <div
              className={cn(
                "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500",
                step >= s.id
                  ? "bg-primary border-primary text-white"
                  : "bg-white border-slate-200 text-slate-400",
              )}
            >
              {step > s.id ? (
                <Check className="w-5 h-5" />
              ) : (
                <span className="text-sm font-bold">{s.id}</span>
              )}
            </div>
            <span
              className={cn(
                "text-[10px] uppercase font-bold tracking-tighter",
                step >= s.id ? "text-primary" : "text-slate-400",
              )}
            >
              {s.label}
            </span>
          </div>
        ))}
      </nav>

      <div className="min-h-350px">
        {/* STEP 1: DATES */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Check-in</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start rounded-xl h-12"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                      {startDate ? format(startDate, "PPP") : "Pick Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-2xl">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Check-out</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start rounded-xl h-12"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                      {endDate ? format(endDate, "PPP") : "Pick Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-2xl">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: PASSENGERS */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <div className="p-4 bg-primary/5 rounded-2xl flex items-center gap-4 mb-4">
              <Users className="text-primary" />
              <p className="text-xs font-medium text-primary">
                Guest list must not exceed {boat?.capacity} people.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <Label>Full Name</Label>
                <Input
                  value={passengerInfo.name}
                  onChange={(e) =>
                    setPassengerInfo({ ...passengerInfo, name: e.target.value })
                  }
                  className="rounded-xl h-12"
                />
              </div>
              <div className="space-y-2">
                <Label>Contact Phone</Label>
                <Input
                  type="tel"
                  placeholder="+880..."
                  value={passengerInfo.phone}
                  onChange={(e) =>
                    setPassengerInfo({
                      ...passengerInfo,
                      phone: e.target.value,
                    })
                  }
                  className="rounded-xl h-12"
                />
              </div>
              <div className="space-y-2">
                <Label>Guest Count</Label>
                <Input
                  type="number"
                  min={1}
                  max={boat?.capacity}
                  value={passengerInfo.numberOfGuests}
                  onChange={(e) =>
                    setPassengerInfo({
                      ...passengerInfo,
                      numberOfGuests: parseInt(e.target.value),
                    })
                  }
                  className="rounded-xl h-12"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: REVIEW */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <div className="border border-slate-100 rounded-3xl overflow-hidden bg-slate-50/50">
              <div className="p-6 border-b border-white bg-white/40">
                <h4 className="font-bold flex items-center gap-2">
                  <Ship className="w-4 h-4" /> Voyage Details
                </h4>
                <div className="mt-4 grid grid-cols-2 gap-y-4 text-sm">
                  <div>
                    <p className="text-slate-400">Vessel</p>
                    <p className="font-semibold">{boat?.name}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Duration</p>
                    <p className="font-semibold">{pricing.days} Days</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-slate-400">Schedule</p>
                    <p className="font-semibold">
                      {format(startDate!, "MMM d")} —{" "}
                      {format(endDate!, "MMM d")}, {timeSlot}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Base Rate</span>
                  <span>${pricing.basePrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service & Docking</span>
                  <span>${pricing.serviceFee}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-4 border-t">
                  <span>Total</span>
                  <span className="text-primary">${pricing.total}</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer Navigation */}
      <footer className="flex gap-3 mt-10">
        {step > 1 && (
          <Button
            variant="ghost"
            onClick={() => setStep((s) => s - 1)}
            className="rounded-xl flex-1 h-12"
          >
            <ArrowLeft className="mr-2 w-4 h-4" /> Back
          </Button>
        )}
        {step < 4 ? (
          <Button
            onClick={handleNext}
            className="rounded-xl flex-[2] h-12 group"
          >
            Continue{" "}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-xl flex-2 h-12"
          >
            {loading ? "Processing..." : "Confirm & Pay"}
          </Button>
        )}
      </footer>
    </AnimatedModal>
  );
};

export default BookingFlow;
