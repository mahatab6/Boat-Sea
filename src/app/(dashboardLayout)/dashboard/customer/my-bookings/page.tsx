"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";

import { Calendar, Users, Eye, XCircle, Badge } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface IBoat {
  id: string;
  boatName: string;
  boatType: string;
  location: string;
  pricePerTrip: number;
  primary_img: string;
}

interface Booking {
  id: string;
  boat: IBoat;
  startDate: string;
  endDate: string;
  numberOfGuests: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
}

export default function MyBookingPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState("All");

  /**
   * MOCK DATA
   */

  useEffect(() => {
    const mockBookings: Booking[] = [
      {
        id: "1",
        boat: {
          id: "b1",
          boatName: "Sea Explorer",
          boatType: "YACHT",
          location: "Dhaka",
          pricePerTrip: 5000,
          primary_img:
            "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13",
        },
        startDate: "2026-04-15",
        endDate: "2026-04-16",
        numberOfGuests: 6,
        totalPrice: 5000,
        status: "confirmed",
      },

      {
        id: "2",
        boat: {
          id: "b2",
          boatName: "Speed King",
          boatType: "SPEEDBOAT",
          location: "Kuakata",
          pricePerTrip: 3500,
          primary_img:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        },
        startDate: "2025-12-10",
        endDate: "2025-12-11",
        numberOfGuests: 4,
        totalPrice: 3500,
        status: "pending",
      },

      {
        id: "3",
        boat: {
          id: "b3",
          boatName: "Fishing Master",
          boatType: "FISHING_BOAT",
          location: "Barisal",
          pricePerTrip: 2000,
          primary_img:
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
        },
        startDate: "2025-03-01",
        endDate: "2025-03-02",
        numberOfGuests: 3,
        totalPrice: 2000,
        status: "cancelled",
      },
    ];

    setBookings(mockBookings);
  }, []);

  /**
   * FILTER BOOKINGS
   */

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "All") return true;

    if (filter === "Cancelled") return booking.status === "cancelled";

    const isPast = new Date(booking.endDate) < new Date();

    if (filter === "Past") return isPast && booking.status !== "cancelled";

    if (filter === "Upcoming") return !isPast && booking.status !== "cancelled";

    return true;
  });

  /**
   * STATUS BADGE
   */

  const getStatusBadge = (status: string, endDate: string) => {
    if (status === "cancelled")
      return <Badge fontVariant="destructive">Cancelled</Badge>;

    if (new Date(endDate) < new Date())
      return <Badge fontVariant="secondary">Completed</Badge>;

    if (status === "confirmed") return <Badge>Confirmed</Badge>;

    return <Badge fontVariant="outline">Pending</Badge>;
  };

  /**
   * CANCEL BOOKING
   */

  const handleCancel = (bookingId: string) => {
    const updated = bookings.map((b) =>
      b.id === bookingId ? { ...b, status: "cancelled" } : b,
    );

    setBookings(updated);
  };

  return (
    <div className="space-y-6">
      {/* FILTER BUTTONS */}

      <div className="flex gap-2 flex-wrap">
        {["All", "Upcoming", "Past", "Cancelled"].map((item) => (
          <Button
            key={item}
            size="sm"
            variant={filter === item ? "default" : "outline"}
            onClick={() => setFilter(item)}
          >
            {item}
          </Button>
        ))}
      </div>

      {/* BOOKINGS TABLE */}

      <div className="border rounded-xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Boat</TableHead>

              <TableHead>Date</TableHead>

              <TableHead>Guests</TableHead>

              <TableHead>Price</TableHead>

              <TableHead>Status</TableHead>

              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={booking.boat.primary_img}
                      className="w-12 h-12 rounded-md object-cover"
                    />

                    <div>
                      <div className="font-medium">{booking.boat.boatName}</div>

                      <div className="text-xs text-muted-foreground">
                        {booking.boat.location}
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex gap-2 items-center">
                    <Calendar size={16} />
                    {format(new Date(booking.startDate), "MMM d")} -
                    {format(new Date(booking.endDate), "MMM d")}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Users size={16} />

                    {booking.numberOfGuests}
                  </div>
                </TableCell>

                <TableCell>${booking.totalPrice}</TableCell>

                <TableCell>
                  {getStatusBadge(booking.status, booking.endDate)}
                </TableCell>

                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye size={14} />
                    </Button>

                    {booking.status !== "cancelled" && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleCancel(booking.id)}
                      >
                        <XCircle size={14} />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
