import { getViewRouteById } from '@/app/(dashboardLayout)/dashboard/owner/bookings/_action';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BookingRequest } from '@/types/booking.types';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Clock, MapPin, Anchor, Gauge, Timer, Info } from 'lucide-react';
import React from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  booking?: BookingRequest | null;
}

const ViewRoute = ({ open, onClose, booking }: Props) => {
  const id = booking?.scheduleId;

  const { data: routeResponse, isLoading } = useQuery({
    queryKey: ['route', id],
    queryFn: () => getViewRouteById(id as string),
    enabled: !!id,
  });

  // Handle the array response from your console log
  const routeView = Array.isArray(routeResponse) ? routeResponse[0] : routeResponse;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader className="border-b pb-3">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Anchor className="w-5 h-5 text-blue-600" />
            Route Details
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-3">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-500">Fetching route details...</p>
          </div>
        ) : routeView ? (
          <div className="space-y-6 pt-4">
            {/* Main Info Card */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Route Name</h3>
              <p className="text-2xl font-bold text-slate-900">{routeView.routeName}</p>
              <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {routeView.difficulty} Mode
              </div>
            </div>

            {/* Grid Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-50 rounded-lg text-green-600">
                  <Gauge size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Distance</p>
                  <p className="text-sm font-semibold">{routeView.distance}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                  <Timer size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Duration</p>
                  <p className="text-sm font-semibold">{routeView.duration}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Departure</p>
                  <p className="text-sm font-semibold">{routeView.departureTime}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                  <Info size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Seats</p>
                  <p className="text-sm font-semibold">{routeView.availableSeats} Left</p>
                </div>
              </div>
            </div>

            {/* Timeline/Dates */}
            <div className="space-y-3 border-t pt-4">
              <div className="flex items-center gap-3 text-slate-600">
                <Calendar size={18} />
                <span className="text-sm">
                  Starts: <b>{new Date(routeView.startDate).toLocaleDateString()}</b>
                </span>
              </div>
            </div>
            
            <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest">
              Booking ID: {routeView.id}
            </p>
          </div>
        ) : (
          <div className="py-10 text-center text-slate-500">
            No route data available.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewRoute;