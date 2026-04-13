"use client";

import { getAllBooking } from "@/app/(dashboardLayout)/dashboard/admin/bookings-management/_action";
import DataTable from "@/components/shared/table/DataTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import React, { useState } from "react";

interface IBooking {
  id: string;
  bookingNumber: string;
  totalGuests: number;
  totalAmount: number;
  bookingStatus: string;
  paymentStatus: string;
  bookingDate: string;
  tripDate: string;
  passengerDetails: {
    fullName: string;
    isPrimary: boolean;
  }[];
  createdAt: string;
}

const BookingTable = () => {
  const [status, setStatus] = useState<string>("ALL");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const bookingColumns: ColumnDef<IBooking>[] = [
    {
      id: "number",
      header: "No.",
      cell: (info) => info.row.index + 1,
    },

    {
      accessorKey: "bookingNumber",
      header: "Booking Number",
    },

    {
      accessorKey: "passengerDetails",
      header: "Customer",
      cell: ({ row }) => {
        const passengers = row.original.passengerDetails;

        const primaryPassenger = passengers.find(
          (p) => p.isPrimary
        );

        return primaryPassenger?.fullName || "-";
      },
    },

    {
      accessorKey: "totalGuests",
      header: "Guests",
    },

    {
      accessorKey: "totalAmount",
      header: "Amount",
    },

    {
      accessorKey: "bookingStatus",
      header: "Booking Status",
    },

    {
      accessorKey: "paymentStatus",
      header: "Payment Status",
    },

    {
      accessorKey: "tripDate",
      header: "Trip Date",
      cell: ({ row }) =>
        format(new Date(row.getValue("tripDate")), "yyyy-MM-dd"),
    },

    {
      accessorKey: "bookingDate",
      header: "Booking Date",
      cell: ({ row }) =>
        format(new Date(row.getValue("bookingDate")), "yyyy-MM-dd"),
    },

    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) =>
        format(new Date(row.getValue("createdAt")), "yyyy-MM-dd"),
    },
  ];

  const { data: bookingResponse, isLoading } = useQuery({
    queryKey: ["getAllBookings", status, page, limit],
    queryFn: () =>
      getAllBooking({
        page,
        limit,
        bookingStatus: status === "ALL" ? undefined : status,
      }),
  });

  const bookings = bookingResponse?.data || [];
  const meta = bookingResponse?.meta;

  return (
    <>
      {/* Status Filter */}
      <div className="flex items-center gap-4 pb-4">
        <Select
          value={status}
          onValueChange={(value) => {
            setStatus(value || "ALL");
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by booking status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="PENDING">PENDING</SelectItem>
            <SelectItem value="CONFIRMED">CONFIRMED</SelectItem>
            <SelectItem value="CANCELLED">CANCELLED</SelectItem>
            <SelectItem value="COMPLETED">COMPLETED</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <DataTable
        data={bookings}
        columns={bookingColumns}
        isLoading={isLoading}
        pagination={{
          pageCount: meta?.totalPages || 1,
          pageIndex: page - 1,
          pageSize: limit,
          onPageChange: (p) => setPage(p + 1),
          onPageSizeChange: setLimit,
        }}
      />
    </>
  );
};

export default BookingTable;