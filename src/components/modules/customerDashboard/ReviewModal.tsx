/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

import FormSubmitButton from "@/components/shared/form/formSubmitButtont";
import { TMyBooking } from "@/types/myBookingTable.type";
import { ReviewAction } from "@/app/(dashboardLayout)/dashboard/customer/my-bookings/_action";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onClose: () => void;
  booking: TMyBooking | null;
};

export interface IReviewPayload {
  boatId: string;
  rating: number;
  comment: string;
}

const ReviewModal = ({ open, onClose, booking }: Props) => {
  const [serverError, setServerError] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: IReviewPayload) => ReviewAction(payload),
  });

  const form = useForm({
    defaultValues: {
      rating: 5,
      comment: "",
    },
    onSubmit: async ({ value }) => {
      if (!booking?.boatId) return;
      setServerError(null);

      try {
        const payload = {
          rating: Number(value.rating),
          comment: value.comment,
          boatId: booking.boatId,
        };

        const result = await mutateAsync(payload);
        onClose();
        toast.success("Review successfully sent")
        form.reset();

        if (result.message) {
          setServerError(result.message);
        }

      } catch (err: any) {
        setServerError(err.message || "Failed to submit review");
      }
    },
  });

  if (!booking) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">
            Write a Review
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4 pt-4"
        >
          {/* Rating Field */}
          <form.Field name="rating">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Rating (1-5)</Label>
                <Input
                  id={field.name}
                  type="number"
                  min={1}
                  max={5}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                />
              </div>
            )}
          </form.Field>

          {/* Comment Field */}
          <form.Field name="comment">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Your Experience</Label>
                <Textarea
                  id={field.name}
                  placeholder="Tell us about your trip..."
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            )}
          </form.Field>

          {serverError && (
            <Alert variant="destructive">
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <FormSubmitButton
                isPending={isSubmitting || isPending}
                pendingLabel="Submitting..."
                disabled={!canSubmit}
                className="w-full"
              >
                Submit Review
              </FormSubmitButton>
            )}
          </form.Subscribe>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
