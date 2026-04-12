"use client";

import { getBookinRequest } from "@/app/(dashboardLayout)/dashboard/owner/bookings/_action";
import ViewRoute from "@/components/shared/handleAction/routeAction/ViewRoute";
import DataTable from "@/components/shared/table/DataTable";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookingRequest } from "@/types/booking.types";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import React, { useState } from "react";

const BookingRequestTable = () => {
  const [selectBooking, setBookingRequest] = useState<BookingRequest | null>(
    null,
  );
  const [status, setStatus] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const BookingColumns: ColumnDef<BookingRequest>[] = [
    { id: "number", header: "No.", cell: (info) => info.row.index + 1 },
    { accessorKey: "bookingNumber", header: "Booking ID" },
    {
      header: "Customer",
      accessorFn: (row) =>
        row.passengerDetails?.map((p) => p.fullName).join(", ") || "N/A",
    },
    {
      accessorKey: "tripDate",
      header: "Trip Date",
      cell: ({ row }) =>
        format(new Date(row.getValue("tripDate")), "yyyy-MM-dd"),
    },
    { accessorKey: "totalGuests", header: "Guests" },
    {
      accessorKey: "totalAmount",
      header: "Amount",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("totalAmount"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "bookingStatus", // or paymentStatus based on your needs
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("bookingStatus") as string;

        const statusStyles: Record<string, string> = {
          PAID: "bg-green-100 text-green-700 border-green-200",
          PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
          FAILED: "bg-red-100 text-red-700 border-red-200",
          REFUNDED: "bg-blue-100 text-blue-700 border-blue-200",
          UNPAID: "bg-gray-100 text-gray-700 border-gray-200",
        };

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold border ${statusStyles[status] || "bg-gray-50 text-gray-500"}`}
          >
            {status}
          </span>
        );
      },
    },
  ];

  const { data: BookinRequestResponse, isLoading } = useQuery({
    queryKey: ["getBookinRequest", searchTerm, status, page, limit],
    queryFn: () =>
      getBookinRequest({
        searchTerm,
        page,
        limit,
        bookingStatus: status === "ALL" ? undefined : status,
      }),
  });

  const booking = BookinRequestResponse?.data || [];
  const meta = BookinRequestResponse?.meta;

  const handleView = (booking: BookingRequest) => {
    setBookingRequest(booking);
    setViewOpen(true);
  };

  return (
    <>
      <div className="flex items-center gap-4 pb-4">
        <Input
          placeholder="Search Booking ID..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          className="max-w-sm"
        />
        {/* status Filter Select */}
        <Select
          value={status}
          onValueChange={(value) => {
            setStatus(value || "ALL");
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">All statuss</SelectItem>
            <SelectItem value="PENDING">PENDING</SelectItem>
            <SelectItem value="CONFIRMED">CONFIRMED</SelectItem>
            <SelectItem value="FAILED">FAILED</SelectItem>
            <SelectItem value="REFUNDED">REFUNDED</SelectItem>
            <SelectItem value="UNPAID">UNPAID</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable
        data={booking}
        columns={BookingColumns}
        isLoading={isLoading}
        pagination={{
          pageCount: meta?.totalPages || 1,
          pageIndex: page - 1,
          pageSize: limit,
          onPageChange: (p) => setPage(p + 1),
          onPageSizeChange: setLimit,
        }}
        actions={{
          onView: handleView,
        }}
      />

      <ViewRoute
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        booking={selectBooking}
      />
    </>
  );
};

export default BookingRequestTable;
