/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";


import { useState } from "react";
import { UserDetails } from "@/types/user.types";
import { updateUserRole } from "@/app/(dashboardLayout)/dashboard/admin/user-management/_actions";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  admin?: UserDetails | null;
}

export default function EditRoleModal({
  open,
  onClose,
  admin,
}: Props) {
const queryClient = useQueryClient();
  const [role, setRole] = useState(admin?.role || "");

  const handleUpdate = async () => {
    if (!admin) return;

   try {
        await updateUserRole(admin.id, role);

      await queryClient.refetchQueries({
        queryKey: ["getAllAdmin"],
        type: "active",
      });
      toast.success("Role update successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to update role");
    }

  

    onClose();
  };




  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>

        <DialogHeader>
          <DialogTitle>Update Role</DialogTitle>
        </DialogHeader>

        <Select onValueChange={(value) => setRole(value as string)}>

          <SelectTrigger>
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>

          <SelectContent>

            <SelectItem value="CUSTOMER">CUSTOMER</SelectItem>
            <SelectItem value="BOAT_OWNER">BOAT_OWNER</SelectItem>
            <SelectItem value="ADMIN">ADMIN</SelectItem>
            <SelectItem value="SUPER_ADMIN">SUPER_ADMIN</SelectItem>

          </SelectContent>

        </Select>

        <Button
          className="mt-4"
          onClick={handleUpdate}
        >
          Update Role
        </Button>

      </DialogContent>
    </Dialog>
  );
}