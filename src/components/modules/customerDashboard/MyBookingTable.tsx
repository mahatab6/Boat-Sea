"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { TMyBooking } from "@/types/myBookingTable.type";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { getMyBooking } from "@/app/(dashboardLayout)/dashboard/customer/my-bookings/_action";
import DataTable from "@/components/shared/table/DataTable";
import ReviewModal from "./ReviewModal";

const MyBookingTable = () => {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<TMyBooking | null>(
    null,
  );

  const BookingColumns: ColumnDef<TMyBooking>[] = [
    {
      id: "serial",
      header: "No.",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "bookingNumber",
      header: "Booking ID",
    },

    {
      accessorKey: "boatName",
      header: "Boat",
    },

    {
      accessorKey: "tripDate",
      header: "Trip Date",
      cell: ({ row }) =>
        format(new Date(row.getValue("tripDate")), "yyyy-MM-dd"),
    },

    {
      accessorKey: "departureTime",
      header: "Departure",
    },

    {
      accessorKey: "totalGuests",
      header: "Guests",
    },

    {
      accessorKey: "totalAmount",
      header: "Amount",
      cell: ({ row }) => {
        const amount = Number(row.getValue("totalAmount"));

        return (
          <div className="font-medium">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(amount)}
          </div>
        );
      },
    },

    {
      accessorKey: "bookingStatus",
      header: "Booking Status",
      cell: ({ row }) => {
        const status = row.getValue("bookingStatus") as string;

        const statusStyles: Record<string, string> = {
          CONFIRMED: "bg-green-100 text-green-700",
          PENDING: "bg-yellow-100 text-yellow-700",
          CANCELLED: "bg-red-100 text-red-700",
        };

        return (
          <span
            className={`px-2 py-1 rounded text-xs font-semibold ${
              statusStyles[status] ?? "bg-gray-100"
            }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      id: "review",
      header: "Review",
      cell: ({ row }) => {
        const booking = row.original;

        if (booking.bookingStatus !== "CONFIRMED") {
          return "N/A";
        }

        return (
          <button
            onClick={() => handleReview(booking)}
            className="text-blue-600 underline"
          >
            Review
          </button>
        );
      },
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment",
      cell: ({ row }) => {
        const status = row.getValue("paymentStatus") as string;

        const statusStyles: Record<string, string> = {
          PAID: "bg-green-100 text-green-700",
          UNPAID: "bg-gray-100 text-gray-700",
          REFUNDED: "bg-blue-100 text-blue-700",
        };

        return (
          <span
            className={`px-2 py-1 rounded text-xs font-semibold ${
              statusStyles[status] ?? "bg-gray-100"
            }`}
          >
            {status}
          </span>
        );
      },
    },

    {
      accessorKey: "invoiceUrl",
      header: "Invoice",
      cell: ({ row }) => {
        const url = row.getValue("invoiceUrl") as string | null;

        if (!url) return "N/A";

        return (
          <a href={url} target="_blank" className="text-blue-600 underline">
            Download
          </a>
        );
      },
    },
  ];

  const { data, isLoading } = useQuery({
    queryKey: ["getMyBooking"],
    queryFn: () => getMyBooking(),
  });

  const booking = data?.data || [];

  const handleReview = (booking: TMyBooking) => {
    setSelectedBooking(booking);
    setReviewOpen(true);
  };

  return (
    <>
      <DataTable
        data={booking}
        columns={BookingColumns}
        isLoading={isLoading}
      />
      <ReviewModal
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        booking={selectedBooking}
      />
    </>
  );
};

export default MyBookingTable;
