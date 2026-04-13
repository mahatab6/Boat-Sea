"use client";

import { getAllPayments } from "@/app/(dashboardLayout)/dashboard/admin/payments-management/_action";
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

interface IPayment {
  id: string;
  bookingId: string;
  amount: string;
  currency: string;
  paymentMethod: string;
  transactionId: string;
  paymentStatus: string;
  paymentDate: string | null;
  createdAt: string;
}

const PaymentTable = () => {
  const [status, setStatus] = useState<string>("ALL");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const paymentColumns: ColumnDef<IPayment>[] = [
    {
      id: "number",
      header: "No.",
      cell: (info) => info.row.index + 1,
    },

    {
      accessorKey: "bookingId",
      header: "Booking ID",
    },

    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) =>
        `${row.getValue("amount")} ${row.original.currency}`,
    },

    {
      accessorKey: "paymentMethod",
      header: "Method",
    },

    {
      accessorKey: "transactionId",
      header: "Transaction ID",
    },

    {
      accessorKey: "paymentStatus",
      header: "Status",
    },

    {
      accessorKey: "paymentDate",
      header: "Payment Date",
      cell: ({ row }) => {
        const date = row.getValue("paymentDate");
        return date
          ? format(new Date(date as string), "yyyy-MM-dd")
          : "-";
      },
    },

    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) =>
        format(new Date(row.getValue("createdAt")), "yyyy-MM-dd"),
    },
  ];

  const { data: paymentResponse, isLoading } = useQuery({
    queryKey: ["getAllPayment", status, page, limit],
    queryFn: () =>
      getAllPayments({
        page,
        limit,
        paymentStatus: status === "ALL" ? undefined : status,
      }),
  });

  const payments = paymentResponse?.data || [];
  const meta = paymentResponse?.meta;

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
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="PENDING">PENDING</SelectItem>
            <SelectItem value="PAID">PAID</SelectItem>
            <SelectItem value="FAILED">FAILED</SelectItem>
            <SelectItem value="REFUNDED">REFUNDED</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <DataTable
        data={payments}
        columns={paymentColumns}
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

export default PaymentTable;