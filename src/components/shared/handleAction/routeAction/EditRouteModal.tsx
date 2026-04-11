"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { IRoute } from "@/types/route.types";
import { updateRouteAction } from "@/app/(dashboardLayout)/dashboard/admin/routes-management/_action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  open: boolean;
  onClose: () => void;
  route?: IRoute | null;
}

const EditRouteModal = ({ open, onClose, route }: Props) => {
  const queryClient = useQueryClient();
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Derive image preview to avoid "setState in useEffect" warning
  const imagePreview = useMemo(() => {
    if (imageFile) return URL.createObjectURL(imageFile);
    return route?.image || null;
  }, [imageFile, route?.image]);

  const form = useForm({
    defaultValues: {
      name: route?.name || "",
      difficulty: route?.difficulty || "MODERATE",
      duration: route?.duration || "",
      distance: route?.distance || "",
      scenicHighlights: route?.scenicHighlights || "",
      description: route?.description || "",
    },
    onSubmit: async ({ value }) => {
      if (!route?.id) return;

      const formData = new FormData();
      // Wrapping text data in "data" key to match backend expectations
      formData.append("data", JSON.stringify(value));

      if (imageFile) {
        formData.append("images", imageFile);
      }

      await mutateAsync(formData);
    },
  });

  // Re-sync form state when the route prop changes (e.g., selecting a different row)
  useEffect(() => {
    if (route) {
      form.reset({
        name: route.name,
        difficulty: route.difficulty,
        duration: route.duration,
        distance: route.distance,
        scenicHighlights: route.scenicHighlights,
        description: route.description || "",
      });
    }
  }, [route?.id, form]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const result = await updateRouteAction(route!.id, formData);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllRoute"] });
      toast.success("Route updated successfully!");
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.message || "Update failed");
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Route</DialogTitle>
          <DialogDescription>
            Modify the details for <strong>{route?.name}</strong>.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <form.Field name="name">
            {(field) => (
              <div className="space-y-1">
                <Label htmlFor={field.name}>Route Name</Label>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          <div className="grid grid-cols-2 gap-4">
            <form.Field name="difficulty">
              {(field) => (
                <div className="space-y-1">
                  <Label htmlFor={field.name}>Difficulty</Label>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value as any)}
                  >
                    <SelectTrigger id={field.name} className="w-full">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EASY">Easy</SelectItem>
                      <SelectItem value="MODERATE">Moderate</SelectItem>
                      <SelectItem value="HARD">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </form.Field>

            <form.Field name="duration">
              {(field) => (
                <div className="space-y-1">
                  <Label htmlFor={field.name}>Duration</Label>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <form.Field name="distance">
              {(field) => (
                <div className="space-y-1">
                  <Label htmlFor={field.name}>Distance</Label>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="scenicHighlights">
              {(field) => (
                <div className="space-y-1">
                  <Label htmlFor={field.name}>Scenic Highlights</Label>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>
          </div>

          <form.Field name="description">
            {(field) => (
              <div className="space-y-1">
                <Label htmlFor={field.name}>Description</Label>
                <Textarea
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  rows={3}
                />
              </div>
            )}
          </form.Field>

          <div className="space-y-2">
            <Label>Update Image (Optional)</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer"
            />
            {imagePreview && (
              <div className="relative mt-2 h-32 w-full overflow-hidden rounded-md border">
                <Image
                  src={imagePreview}
                  alt="Route preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="ghost" onClick={onClose} className={"hover:cursor-pointer"}>
              Cancel
            </Button>
            <form.Subscribe selector={(state) => [state.canSubmit]}>
              {([canSubmit]) => (
                <Button type="submit" disabled={!canSubmit || isPending} className={"hover:cursor-pointer"}>
                  {isPending ? "Updating..." : "Update Route"}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditRouteModal;
