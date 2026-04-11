"use client";

import { getAllSchedule } from "@/app/(dashboardLayout)/dashboard/owner/schedules/_action";
import DeleteSchedule from "@/components/shared/handleAction/scheduleAction/DeleteSchedule";
import EditSchedule from "@/components/shared/handleAction/scheduleAction/EditSchedule";
import DataTable from "@/components/shared/table/DataTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ISchedule } from "@/types/schedule.type";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import React, { useState } from "react";

const ScheduleTable = () => {
  const [selectedschedule, setSelectedschedule] = useState<ISchedule | null>(
    null,
  );
  const [status, setStatus] = useState<string>("ALL");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const scheduleColumns: ColumnDef<ISchedule>[] = [
    { id: "number", header: "No.", cell: (info) => info.row.index + 1 },
    { accessorKey: "boat.boatName", header: "Boat Name" },
    { accessorKey: "route.name", header: "Route Name" },
    { accessorKey: "status", header: "Status" },
    {
      accessorKey: "startDate",
      header: "Start Date",
      cell: ({ row }) =>
        format(new Date(row.getValue("startDate")), "yyyy-MM-dd"),
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      cell: ({ row }) => {
        const date = row.getValue("endDate");
        return date ? format(new Date(date as string), "yyyy-MM-dd") : "-";
      },
    },
  ];

  const { data: scheduleResponse, isLoading } = useQuery({
    queryKey: ["getAllSchedule", status, page, limit],
    queryFn: () =>
      getAllSchedule({
        page,
        limit,
        status: status === "ALL" ? undefined : status,
      }),
  });
  console.log(scheduleResponse);
  const schedules = scheduleResponse?.data || [];
  const meta = scheduleResponse?.meta;

  const handleEdit = (schedule: ISchedule) => {
    setSelectedschedule(schedule);
    setEditOpen(true);
  };

  const handleDelete = (schedule: ISchedule) => {
    setSelectedschedule(schedule);
    setDeleteOpen(true);
  };

  return (
    <>
      <div className="flex items-center gap-4 pb-4">
        {/* status Filter Select */}
        <Select
          value={status}
          onValueChange={(value) => {
            setStatus(value || "ALL");
            setPage(1); // Reset to page 1 when filter changes
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">All statuss</SelectItem>
            <SelectItem value="UPCOMING">UPCOMING</SelectItem>
            <SelectItem value="ONGOING">ONGOING</SelectItem>
            <SelectItem value="COMPLETED">COMPLETED</SelectItem>
            <SelectItem value="CANCELLED">CANCELLED</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable
        data={schedules}
        columns={scheduleColumns}
        isLoading={isLoading}
        pagination={{
          pageCount: meta?.totalPages || 1,
          pageIndex: page - 1,
          pageSize: limit,
          onPageChange: (p) => setPage(p + 1),
          onPageSizeChange: setLimit,
        }}
        actions={{
          onEdit: handleEdit,
          onDelete: handleDelete,
        }}
      />

      <EditSchedule
        open={editOpen}
        onClose={() => setEditOpen(false)}
        schedule={selectedschedule}
      />

      <DeleteSchedule
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        schedule={selectedschedule}
      />
    </>
  );
};

export default ScheduleTable;
