"use client";

import React, { useState } from "react";

import DataTable from "@/components/shared/table/DataTable";

import { getAllAdmin } from "@/services/getAdmin.services";

import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

import { UserDetails } from "@/types/user.types";
import ViewAdminModal from "@/components/shared/handleAction/ViewAdminModal";
import EditRoleModal from "@/components/shared/handleAction/EditRoleModal";
import DeleteAdminModal from "@/components/shared/handleAction/DeleteAdminModal";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdminTable = () => {
  

  const [selectedAdmin, setSelectedAdmin] = useState<UserDetails | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState<string>("ALL"); 
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const adminColumns: ColumnDef<UserDetails>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "role", header: "Role" },
    { accessorKey: "isDeleted", header: "IsDeleted" },
  ];

 const { data: adminResponse, isLoading } = useQuery({
    queryKey: ["getAllAdmin", searchTerm, role, page, limit], 
    queryFn: () => getAllAdmin({ 
      searchTerm, 
      page, 
      limit, 
    
      role: role === "ALL" ? undefined : role 
    }),
  });

  const admins = adminResponse?.data || [];
  const meta = adminResponse?.meta;

  const handleView = (admin: UserDetails) => {
    setSelectedAdmin(admin);
    setViewOpen(true);
  };

  const handleEdit = (admin: UserDetails) => {
    setSelectedAdmin(admin);
    setEditOpen(true);
  };

  const handleDelete = (admin: UserDetails) => {
    setSelectedAdmin(admin);
    setDeleteOpen(true);
  };

  return (
    <>
      <div className="flex items-center gap-4 pb-4">
        {/* Search Input */}
        <Input
          placeholder="Search admins..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          className="max-w-sm"
        />

        {/* Role Filter Select */}
        <Select 
          value={role} 
          onValueChange={(value) => {
            setRole(value || "ALL");
            setPage(1); // Reset to page 1 when filter changes
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Roles</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="BOAT_OWNER">Boat Owner</SelectItem>
            <SelectItem value="CUSTOMER">Customer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable
        data={admins}
        columns={adminColumns}
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
          onEdit: handleEdit,
          onDelete: handleDelete,
        }}
      />

      <ViewAdminModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        admin={selectedAdmin}
      />

      <EditRoleModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        admin={selectedAdmin}
      />

      <DeleteAdminModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        admin={selectedAdmin}
      />
    </>
  );
};

export default AdminTable;
