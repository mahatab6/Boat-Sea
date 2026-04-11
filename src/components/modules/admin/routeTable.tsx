"use client";

import AddRouteModal from "@/components/shared/handleAction/routeAction/AddRouteModal";
import DeleteRouteModal from "@/components/shared/handleAction/routeAction/DeleteRouteModal";
import EditRouteModal from "@/components/shared/handleAction/routeAction/EditRouteModal";
import DataTable from "@/components/shared/table/DataTable";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getRoute } from "@/services/getRoute.services";
import { IRoute } from "@/types/route.types";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";

const RouteTable = () => {
  const [selectedRoute, setselecteRoute] = useState<IRoute | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [route, setRoute] = useState<string>("ALL");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const routeColumns: ColumnDef<IRoute>[] = [
    { id: "number", header: "No.", cell: (info) => info.row.index + 1 },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "duration", header: "Duration" },
    { accessorKey: "distance", header: "Distance" },
    {
      accessorKey: "difficulty",
      header: "Difficulty",
      cell: ({ getValue }) => {
        const difficulty = getValue() as string;
        const statusStyles: Record<string, string> = {
          EASY: "text-green-600 font-medium",
          MODERATE: "text-orange-500 font-medium",
          HARD: "text-red-600 font-medium",
        };

        return (
          <span className={statusStyles[difficulty] || "text-gray-600"}>
            {difficulty}
          </span>
        );
      },
    },
  ];

  const { data: routeResponse, isLoading } = useQuery({
    queryKey: ["getAllRoute", searchTerm, route, page, limit],
    queryFn: () =>
      getRoute({
        searchTerm,
        page,
        limit,

        difficulty: route === "ALL" ? undefined : route,
      }),
  });

  const routes = routeResponse?.data || [];

  const meta = routeResponse?.meta;

  const handleEdit = (route: IRoute) => {
    setselecteRoute(route);
    setEditOpen(true);
  };

  const handleDelete = (route: IRoute) => {
    setselecteRoute(route);
    setDeleteOpen(true);
  };

  return (
    <>
      <div className="flex justify-between items-center gap-4 pb-4">
        <div className="flex items-center gap-4">
          {/* Search Input */}
          <Input
            placeholder="Search routes..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="max-w-sm"
          />

          {/* route Filter Select */}
          <Select
            value={route}
            onValueChange={(value) => {
              setRoute(value || "ALL");
              setPage(1); //
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by route" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All routes</SelectItem>
              <SelectItem value="EASY">Easy</SelectItem>
              <SelectItem value="MODERATE">Moderate</SelectItem>
              <SelectItem value="HARD">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <AddRouteModal />
      </div>

      <DataTable
        data={routes}
        columns={routeColumns}
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

      <EditRouteModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        route={selectedRoute}
      />

      <DeleteRouteModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        route={selectedRoute}
      />
    </>
  );
};

export default RouteTable;
