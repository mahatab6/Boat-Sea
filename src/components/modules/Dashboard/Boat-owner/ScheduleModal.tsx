"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getRoute } from "@/services/getRoute.services";
import { createScheduleAction } from "./_action";
import { IBoat } from "@/types/boat.types";


interface scheduleProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  boat: IBoat | null;
}

const ScheduleModal = ({ open, onClose, onSuccess, boat }: scheduleProps) => {
  const queryClient = useQueryClient();

  // Fetch routes for the dropdown
  const { data: routeResponse, isLoading: routesLoading } = useQuery({
    queryKey: ["getAllRoute"],
    queryFn: () => getRoute(),
  });

  const routes = routeResponse?.data || [];

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const result = await createScheduleAction(data);
      return result.data;
    },
    onSuccess: () => {
      toast.success("Schedule created successfully");
      queryClient.invalidateQueries({ queryKey: ["get-boat-schedules"] });
      onClose();
      if (onSuccess) onSuccess();
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const form = useForm({
    defaultValues: {
      routeId: "",
      startDate: "",
      endDate: "",
      departureTime: "08:00 AM",
      arrivalTime: "12:00 PM",
      recurringPattern: "NONE", // NONE, DAILY, WEEKLY
    },
    onSubmit: async ({ value }) => {
      if (!boat?.id) {
        toast.error("Boat ID is missing");
        return;
      }

      // Combine boatId with form values
      const payload = {
        ...value,
        boatId: boat?.id,
        availableSeats: boat?.capacity,
      };

      await mutateAsync(payload);
    },
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif"> Create Boat Schedule </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6 mt-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Route Selection */}
            <form.Field name="routeId">
              {(field) => (
                <div className="space-y-1 md:col-span-2">
                  <Label>Select Route</Label>
                  <Select
                    value={field.state.value}
                    onValueChange={(val) => field.handleChange(val || '')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={routesLoading ? "Loading routes..." : "Choose a route"} />
                    </SelectTrigger>
                    <SelectContent>
                      {routes.map((route: any) => (
                        <SelectItem key={route.id} value={route.id}>
                          {route.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </form.Field>

            {/* Start Date */}
            <form.Field name="startDate">
              {(field) => (
                <div className="space-y-1">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>

            {/* End Date */}
            <form.Field name="endDate">
              {(field) => (
                <div className="space-y-1">
                  <Label>End Date (Optional Range)</Label>
                  <Input
                    type="date"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>

            {/* Departure Time */}
            <form.Field name="departureTime">
              {(field) => (
                <div className="space-y-1">
                  <Label>Departure Time</Label>
                  <Input
                    placeholder="e.g. 08:30 AM"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>

            {/* Arrival Time */}
            <form.Field name="arrivalTime">
              {(field) => (
                <div className="space-y-1">
                  <Label>Arrival Time</Label>
                  <Input
                    placeholder="e.g. 01:00 PM"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>


            {/* Recurring Pattern */}
            <form.Field name="recurringPattern">
              {(field) => (
                <div className="space-y-1">
                  <Label>Repeat Pattern</Label>
                  <Select
                    value={field.state.value}
                    onValueChange={(val) => field.handleChange(val || "")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NONE">One Time</SelectItem>
                      <SelectItem value="DAILY">Daily</SelectItem>
                      <SelectItem value="WEEKLY">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </form.Field>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <form.Subscribe selector={(s) => [s.canSubmit]}>
              {([canSubmit]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || isPending}
                  className="hover:cursor-pointer"
                >
                  {isPending ? "Creating..." : "Create Schedule"}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleModal;