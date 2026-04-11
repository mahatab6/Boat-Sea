/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ISchedule } from "@/types/schedule.type";
import { updateScheduleAction } from "@/app/(dashboardLayout)/dashboard/owner/schedules/_action";

interface Props {
  open: boolean;
  onClose: () => void;
  schedule?: ISchedule | null;
}

export default function EditSchedule({
  open,
  onClose,
  schedule,
}: Props) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: any) => {
      if (!schedule?.id)
        throw new Error("Schedule ID is missing");

      const formattedData = {
        startDate: data.startDate
          ? new Date(data.startDate).toISOString()
          : null,

        endDate: data.endDate
          ? new Date(data.endDate).toISOString()
          : null,
      };

      const result = await updateScheduleAction(
        schedule.id,
        formattedData
      );

      return result.data;
    },

    onSuccess: () => {
      toast.success("Schedule updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["getAllSchedule"],
      });
      onClose();
    },

    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const form = useForm({
    defaultValues: {
      startDate: schedule?.startDate
        ? new Date(schedule.startDate)
          .toISOString()
          .split("T")[0]
        : "",

      endDate: schedule?.endDate
        ? new Date(schedule.endDate)
          .toISOString()
          .split("T")[0]
        : "",
    },

    onSubmit: async ({ value }) => {
      await mutateAsync(value);
    },
  });

  useEffect(() => {
    if (schedule && open) {
      form.reset({
        startDate: new Date(schedule.startDate)
          .toISOString()
          .split("T")[0],

        endDate: schedule.endDate
          ? new Date(schedule.endDate)
            .toISOString()
            .split("T")[0]
          : "",
      });
    }
  }, [schedule, open, form]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">
            Update Schedule Dates
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6 mt-4"
        >
          <div className="grid grid-cols-1 gap-4">

            {/* Start Date */}
            <form.Field name="startDate">
              {(field) => (
                <div className="space-y-1">
                  <Label>Departure Date</Label>

                  <Input
                    type="date"
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                  />
                </div>
              )}
            </form.Field>

            {/* End Date */}
            <form.Field name="endDate">
              {(field) => (
                <div className="space-y-1">
                  <Label>End Date (Optional)</Label>

                  <Input
                    type="date"
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                  />
                </div>
              )}
            </form.Field>

          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">

            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>

            <form.Subscribe selector={(s) => [s.canSubmit]}>
              {([canSubmit]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || isPending}
                  className="hover:cursor-pointer"
                >
                  {isPending
                    ? "Updating..."
                    : "Update Schedule"}
                </Button>
              )}
            </form.Subscribe>

          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}