"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { UserDetails } from "@/types/user.types";

interface Props {
  open: boolean;
  onClose: () => void;
  admin?: UserDetails | null;
}

export default function ViewAdminModal({ open, onClose, admin }: Props) {
  if (!admin) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>

        <DialogHeader>
          <DialogTitle>Admin Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">

          <p>Name: {admin.name}</p>
          <p>Email: {admin.email}</p>
          <p>Role: {admin.role}</p>
          <p>Status: {admin.status}</p>

        </div>

      </DialogContent>
    </Dialog>
  );
}