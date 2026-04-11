"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createRouteAction } from "@/app/(dashboardLayout)/dashboard/admin/routes-management/_action";

const AddRouteModal = () => {
  const [open, setOpen] = React.useState(false);
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const result = await createRouteAction(formData);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllRoute"],
      });

      toast.success("Route added successfully!");
      setOpen(false);
      form.reset();
      setImagePreview(null);
      setImageFile(null);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to add route");
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      difficulty: "MODERATE",
      duration: "",
      distance: "",
      scenicHighlights: "",
      description: "",
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData();

      const textData = { ...value };

      formData.append("data", JSON.stringify(textData));

      if (imageFile) {
        formData.append("images", imageFile);
      }

      await mutateAsync(formData);
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="hover:cursor-pointer">Add New Route</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Route</DialogTitle>
          <DialogDescription>
            Enter the details of the hiking or travel route.
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
          {/* Route Name */}
          <form.Field name="name">
            {(field) => (
              <div className="space-y-1">
                <Label htmlFor={field.name}>Route Name</Label>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="e.g. Harbor Passage"
                />
              </div>
            )}
          </form.Field>

          <div className="grid grid-cols-2 gap-4">
            {/* Difficulty */}
            <form.Field name="difficulty">
              {(field) => (
                <div className="space-y-1">
                  <Label htmlFor={field.name}>Difficulty</Label>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value || "")}
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

            {/* Duration */}
            <form.Field name="duration">
              {(field) => (
                <div className="space-y-1">
                  <Label htmlFor={field.name}>Duration</Label>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g. 5 Hours"
                  />
                </div>
              )}
            </form.Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Distance */}
            <form.Field name="distance">
              {(field) => (
                <div className="space-y-1">
                  <Label htmlFor={field.name}>Distance</Label>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g. 5km"
                  />
                </div>
              )}
            </form.Field>

            {/* Scenic Highlights */}
            <form.Field name="scenicHighlights">
              {(field) => (
                <div className="space-y-1">
                  <Label htmlFor={field.name}>Scenic Highlights</Label>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Fortresses, Lighthouses..."
                  />
                </div>
              )}
            </form.Field>
          </div>

          {/* Description */}
          <form.Field name="description">
            {(field) => (
              <div className="space-y-1">
                <Label htmlFor={field.name}>Description</Label>
                <Textarea
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Describe the journey..."
                  rows={3}
                />
              </div>
            )}
          </form.Field>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Route Image</Label>
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
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              className={"hover:cursor-pointer"}         
              >
              Cancel
            </Button>
            <form.Subscribe selector={(state) => [state.canSubmit]}>
              {([canSubmit]) => (
                <Button className={"hover:cursor-pointer"} type="submit" disabled={!canSubmit || isPending}>
                  {isPending ? "Creating..." : "Create Route"}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRouteModal;
