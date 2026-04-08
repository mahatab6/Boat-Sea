"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useQueryClient } from "@tanstack/react-query";
import { UserDetails } from "@/types/user.types";
import { deleteUserAccount } from "@/app/(dashboardLayout)/dashboard/admin/admins-management/_actions";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  admin?: UserDetails | null;
}

export default function DeleteAdminModal({ open, onClose, admin }: Props) {
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    if (!admin) return;

    try {
      await deleteUserAccount(admin.id);

      await queryClient.refetchQueries({
        queryKey: ["getAllAdmin"],
        type: "active",
      });
      toast.success("Admin deleted successfully");
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to delete admin");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this account?
          </DialogTitle>
        </DialogHeader>

        <Button variant="destructive" onClick={handleDelete}>
          Confirm Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
}
