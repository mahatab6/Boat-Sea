"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { StaticRequire } from "next/dist/shared/lib/get-img-props";
import { createBoatAction } from "./_action";
import Image from "next/image";

interface BoatFormModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const BoatFormModal = ({ open, onClose, onSuccess }: BoatFormModalProps) => {
  const queryClient = useQueryClient();
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<
    string | StaticRequire | null
  >(null);

  // 1. TanStack Query Mutation
  const { mutateAsync, isPending: isMutationPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const result = await createBoatAction(formData);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      toast.success("Boat added successfully");
      // Invalidate the cache to trigger a UI update
      queryClient.invalidateQueries({ queryKey: ["get-my-boat"] });
      onClose();
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  // 2. TanStack Form Setup
  const form = useForm({
    defaultValues: {
      boatName: "",
      boatType: "",
      status: "AVAILABLE",
      capacity: 0,
      boatCondition: "",
      location: "",
      pricePerTrip: 0,
      description: "",
      length: 0,
      width: 0, 
      engineCapacity: 0,
      manufacturer: "",
      manufacturingYear: new Date().getFullYear(),
      specifications: "",
      amenities: [] as string[],
      cancellationPolicy: "",
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

  const amenitiesList = [
    "GPS Navigation",
    "Bluetooth Audio",
    "Life Jackets",
    "Cooler Box",
    "First Aid Kit",
    "WiFi",
    "Kitchen",
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">
            {"Add New Boat"}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Boat Name */}
            <form.Field name="boatName">
              {(field) => (
                <div className="space-y-1">
                  <Label>Boat Name</Label>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g. Oceanic Blue Express"
                  />
                </div>
              )}
            </form.Field>

            {/* Boat Type */}
            <form.Field name="boatType">
              {(field) => (
                <div className="space-y-1">
                  <Label>Type</Label>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value || "")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SPEEDBOAT">Speedboat</SelectItem>
                      <SelectItem value="YACHT">Yacht</SelectItem>
                      <SelectItem value="CATAMARAN">Catamaran</SelectItem> 
                      <SelectItem value="FERRY">Ferry</SelectItem> 
                      <SelectItem value="LAUNCH">Launch</SelectItem> 
                      <SelectItem value="PRIVATE">Private</SelectItem> 
                    </SelectContent>
                  </Select>
                </div>
              )}
            </form.Field>

            {/* Price & Capacity */}
            <form.Field name="pricePerTrip">
              {(field) => (
                <div className="space-y-1">
                  <Label>Price Per Trip ($)</Label>
                  <Input
                    type="number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="capacity">
              {(field) => (
                <div className="space-y-1">
                  <Label>Capacity (Guests)</Label>
                  <Input
                    type="number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />
                </div>
              )}
            </form.Field>

            {/* Location & Condition */}
            <form.Field name="location">
              {(field) => (
                <div className="space-y-1">
                  <Label>Location</Label>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="boatCondition">
              {(field) => (
                <div className="space-y-1">
                  <Label>Condition</Label>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g. Excellent"
                  />
                </div>
              )}
            </form.Field>

            {/* Technical Specs Row - Add Width here */}
            <div className="grid grid-cols-4 gap-2 md:col-span-2">
              <form.Field name="length">
                {(field) => (
                  <div className="space-y-1">
                    <Label>Length (ft)</Label>
                    <Input
                      type="number"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                  </div>
                )}
              </form.Field>
              <form.Field 
                name="width"
                validators={{
                  onChange: ({ value }) => value <= 0 ? 'Width must be greater than 0' : undefined
                }}
              >
                {(field) => (
                  <div className="space-y-1">
                    <Label>Width (ft)</Label>
                    <Input 
                      type="number" 
                      value={field.state.value} 
                      onChange={(e) => field.handleChange(Number(e.target.value))} 
                    />
                    {field.state.meta.errors ? (
                      <em className="text-red-500 text-xs">{field.state.meta.errors.join(', ')}</em>
                    ) : null}
                  </div>
                )}
              </form.Field>
              <form.Field name="engineCapacity">
                {(field) => (
                  <div className="space-y-1">
                    <Label>Engine (HP)</Label>
                    <Input
                      type="number"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                  </div>
                )}
              </form.Field>
              <form.Field name="manufacturingYear">
                {(field) => (
                  <div className="space-y-1">
                    <Label>Year</Label>
                    <Input
                      type="number"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                  </div>
                )}
              </form.Field>
            </div>

            {/* Manufacturer & Specifications */}
            <div className="grid grid-cols-2 gap-4 md:col-span-2">
              <form.Field name="manufacturer">
                {(field) => (
                  <div className="space-y-1">
                    <Label>Manufacturer</Label>
                    <Input 
                      value={field.state.value} 
                      onChange={(e) => field.handleChange(e.target.value)} 
                      placeholder="e.g. SeaRay"
                    />
                  </div>
                )}
              </form.Field>

              <form.Field 
                name="specifications"
                validators={{
                  onChange: ({ value }) => value.trim().length === 0 ? 'Specifications are required' : undefined
                }}
              >
                {(field) => (
                  <div className="space-y-1">
                    <Label>Specifications Summary</Label>
                    <Input 
                      value={field.state.value} 
                      onChange={(e) => field.handleChange(e.target.value)} 
                      placeholder="e.g. V6 Engine, Fiberglass hull"
                    />
                    {field.state.meta.errors ? (
                      <em className="text-red-500 text-xs">{field.state.meta.errors.join(', ')}</em>
                    ) : null}
                  </div>
                )}
              </form.Field>
            </div>

            {/* Description */}
            <form.Field name="description">
              {(field) => (
                <div className="space-y-1 md:col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>

            {/* Amenities */}
            <form.Field name="amenities">
              {(field) => (
                <div className="space-y-3 md:col-span-2">
                  <Label>Amenities</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {amenitiesList.map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <Checkbox
                          id={item}
                          checked={field.state.value.includes(item)}
                          onCheckedChange={(checked) => {
                            const current = field.state.value;
                            field.handleChange(
                              checked
                                ? [...current, item]
                                : current.filter((i) => i !== item),
                            );
                          }}
                        />
                        <label htmlFor={item} className="text-sm">
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </form.Field>

            {/* Cancellation Policy */}
            <form.Field name="cancellationPolicy">
              {(field) => (
                <div className="space-y-1 md:col-span-2">
                  <Label>Cancellation Policy</Label>
                  <Textarea 
                    value={field.state.value} 
                    onChange={(e) => field.handleChange(e.target.value)} 
                    placeholder="Describe the refund rules..."
                  />
                </div>
              )}
            </form.Field>

            {/* Image Upload */}
            <div className="space-y-2 md:col-span-2">
              <Label>Boat Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />
              {imagePreview && (
                <div className="mt-2 h-40 w-full overflow-hidden rounded-md border">
                  <Image
                    src={imagePreview}
                    width={700}
                    height={800}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button type="button" variant="ghost" className={"hover:cursor-pointer"} onClick={onClose}>
              Cancel
            </Button>
            <form.Subscribe selector={(s) => [s.canSubmit]}>
              {([canSubmit]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || isMutationPending}
                  className={"hover:cursor-pointer"}
                >
                  {" Create Boat"}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BoatFormModal;
