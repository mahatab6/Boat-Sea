
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ISchedule } from "@/types/schedule.type";
import { deleteSchedule } from "@/app/(dashboardLayout)/dashboard/owner/schedules/_action";

interface Props {
  open: boolean;
  onClose: () => void;
  schedule?: ISchedule | null;
}

export default function DeleteSchedule({ open, onClose, schedule }: Props) {
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    if (!schedule) return;

    try {
      await deleteSchedule(schedule.id);

      await queryClient.refetchQueries({
        queryKey: ["getAllSchedule"],
        type: "active",
      });
      toast.success("Schedule deleted successfully");
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to delete Schedule");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this Schedule?
          </DialogTitle>
        </DialogHeader>

        <Button variant="destructive" onClick={handleDelete}>
          Confirm Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
}
