/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

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

import { getBoatById } from "@/services/getBoatById.services";

import { IBoat } from "@/types/boat.types";
import { updateBoatAction } from "@/components/modules/Dashboard/Boat-owner/_action";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const EditBoatPage = () => {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const queryClient = useQueryClient();

  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | StaticImport | null>(null);

  // Fetch existing boat data
  const { data: response, isLoading, error } = useQuery({
    queryKey: ["boat", id],
    queryFn: () => getBoatById(id as string),
    enabled: !!id,
  });
 const boat = response as IBoat;
  // Update Mutation
  const { mutateAsync, isPending: isMutationPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const result = await updateBoatAction(id, formData);
      if (!result.success) throw new Error(result.error || "Update failed");
      return result.data;
    },
    onSuccess: () => {
      toast.success("Boat updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["boat", id] });
      queryClient.invalidateQueries({ queryKey: ["get-my-boat"] });
      setTimeout(() => router.push("/dashboard/owner/boats"), 800);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update boat");
    },
  });

  // TanStack Form Setup
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
      formData.append("data", JSON.stringify(value));

      if (imageFile) {
        formData.append("images", imageFile);
      }

      await mutateAsync(formData);
    },
  });

  // Populate form when boat data is loaded
  React.useEffect(() => {
    if (boat) {
      form.setFieldValue("boatName", boat.boatName || "");
      form.setFieldValue("boatType", boat.boatType || "");
      form.setFieldValue("status", boat.status || "AVAILABLE");
      form.setFieldValue("capacity", Number(boat.capacity) || 0);
      form.setFieldValue("boatCondition", boat.boatCondition || "");
      form.setFieldValue("location", boat.location || "");
      form.setFieldValue("pricePerTrip", Number(boat.pricePerTrip) || 0);
      form.setFieldValue("description", boat.description || "");
      form.setFieldValue("length", Number(boat.length) || 0);
      form.setFieldValue("width", Number(boat.width) || 0);
      form.setFieldValue("engineCapacity", Number(boat.engineCapacity) || 0);
      form.setFieldValue("manufacturer", boat.manufacturer || "");
      form.setFieldValue("manufacturingYear", Number(boat.manufacturingYear) || new Date().getFullYear());
      form.setFieldValue("specifications", boat.specifications || "");
      form.setFieldValue("amenities", Array.isArray(boat.amenities) ? boat.amenities : []);
      form.setFieldValue("cancellationPolicy", boat.cancellationPolicy || "");

      // Set current image preview
      if (boat.primary_img ) {
        setImagePreview(boat.primary_img); // Adjust if your image field is different
      }
    }
  }, [boat, form]);

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

  if (isLoading) return <div className="p-10 text-center text-lg">Loading boat data...</div>;
  if (error || !boat) return <div className="p-10 text-red-500">Failed to load boat information.</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-serif">Edit Boat</h1>
        <p className="text-muted-foreground">Update information for boat ID: {id}</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Boat Name */}
          <form.Field name="boatName">
            {(field) => (
              <div className="space-y-1">
                <Label>Boat Name</Label>
                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
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
                />
              </div>
            )}
          </form.Field>

          {/* Technical Specs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:col-span-2">
            <form.Field name="length">
              {(field) => (
                <div className="space-y-1">
                  <Label>Length (ft)</Label>
                  <Input type="number" value={field.state.value} onChange={(e) => field.handleChange(Number(e.target.value))} />
                </div>
              )}
            </form.Field>
            <form.Field name="width">
              {(field) => (
                <div className="space-y-1">
                  <Label>Width (ft)</Label>
                  <Input type="number" value={field.state.value} onChange={(e) => field.handleChange(Number(e.target.value))} />
                </div>
              )}
            </form.Field>
            <form.Field name="engineCapacity">
              {(field) => (
                <div className="space-y-1">
                  <Label>Engine (HP)</Label>
                  <Input type="number" value={field.state.value} onChange={(e) => field.handleChange(Number(e.target.value))} />
                </div>
              )}
            </form.Field>
            <form.Field name="manufacturingYear">
              {(field) => (
                <div className="space-y-1">
                  <Label>Manufacturing Year</Label>
                  <Input type="number" value={field.state.value} onChange={(e) => field.handleChange(Number(e.target.value))} />
                </div>
              )}
            </form.Field>
          </div>

          {/* Manufacturer & Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2">
            <form.Field name="manufacturer">
              {(field) => (
                <div className="space-y-1">
                  <Label>Manufacturer</Label>
                  <Input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                </div>
              )}
            </form.Field>

            <form.Field name="specifications">
              {(field) => (
                <div className="space-y-1">
                  <Label>Specifications Summary</Label>
                  <Input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                </div>
              )}
            </form.Field>
          </div>

          {/* Description */}
          <form.Field name="description">
            {(field) => (
              <div className="space-y-1">
                <Label>Description</Label>
                <Textarea value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
              </div>
            )}
          </form.Field>

          {/* Amenities */}
          <form.Field name="amenities">
            {(field) => (
              <div className="space-y-3">
                <Label>Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {amenitiesList.map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <Checkbox
                        id={item}
                        checked={field.state.value.includes(item)}
                        onCheckedChange={(checked) => {
                          const current = field.state.value;
                          field.handleChange(
                            checked ? [...current, item] : current.filter((i) => i !== item)
                          );
                        }}
                      />
                      <label htmlFor={item} className="text-sm cursor-pointer">{item}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </form.Field>

          {/* Cancellation Policy */}
          <form.Field name="cancellationPolicy">
            {(field) => (
              <div className="space-y-1">
                <Label>Cancellation Policy</Label>
                <Textarea value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
              </div>
            )}
          </form.Field>

          {/* Image Upload */}
          <div className="md:col-span-2 space-y-3">
            <Label>Boat Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer"
            />

            {imagePreview && (
              <div className="mt-4 h-64 w-full overflow-hidden rounded-md border">
                <Image
                  src={imagePreview}
                  alt="Boat Preview"
                  width={800}
                  height={500}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            {!imageFile && boat && (
              <p className="text-sm text-muted-foreground">
                Current image will be kept if no new image is selected.
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <Button type="button" variant="ghost" onClick={() => router.back()}>
            Cancel
          </Button>
          <form.Subscribe selector={(state) => [state.canSubmit]}>
            {([canSubmit]) => (
              <Button type="submit" disabled={!canSubmit || isMutationPending}>
                {isMutationPending ? "Updating Boat..." : "Update Boat"}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </div>
  );
};

export default EditBoatPage;