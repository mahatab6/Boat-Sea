

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';

import { 
  Dialog, DialogContent, DialogHeader, DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

import { IBoat } from '@/types/boat.types';
import { StaticRequire } from 'next/dist/shared/lib/get-img-props';

interface BoatFormModalProps {
  open: boolean;
  onClose: () => void;
  boat?: IBoat; // Optional for "Add" mode
}

const BoatFormModal = ({ open, onClose, boat }: BoatFormModalProps) => {
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | StaticRequire | null>(boat?.primary_img || null);

  // 1. TanStack Query Mutation
  const { mutateAsync, isPending: isMutationPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      
      console.log("FormData sent to server:", formData);
      for (const pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
    },
    onSuccess: () => {
      toast.success(boat ? 'Boat updated successfully' : 'Boat added successfully');
      onClose();
    },
    onError: (error: any) => {
      toast.error('Failed to save boat: ' + error.message);
    }
  });

  // 2. TanStack Form Setup
  const form = useForm({
    defaultValues: {
      boatName: boat?.boatName || '',
      boatType: (boat?.boatType as any) || 'SPEEDBOAT',
      status: boat?.status || 'AVAILABLE',
      capacity: boat?.capacity || 1,
      boatCondition: boat?.boatCondition || '',
      location: boat?.location || '',
      pricePerTrip: boat?.pricePerTrip || 0,
      description: boat?.description || '',
      length: boat?.length || 0,
      width: boat?.width || 0,
      engineCapacity: boat?.engineCapacity || 0,
      manufacturer: boat?.manufacturer || '',
      manufacturingYear: boat?.manufacturingYear || new Date().getFullYear(),
      specifications: boat?.specifications || '',
      amenities: boat?.amenities || [] as string[],
      cancellationPolicy: boat?.cancellationPolicy || '',
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData();
      
      // Structure: data (JSON string), images (File)
      const textData = { ...value };
      
      formData.append('data', JSON.stringify(textData));

      if (imageFile) {
        formData.append('images', imageFile);
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

  const amenitiesList = ['GPS Navigation', 'Bluetooth Audio', 'Life Jackets', 'Cooler Box', 'First Aid Kit', 'WiFi', 'Kitchen'];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">
            {boat ? 'Edit Boat' : 'Add New Boat'}
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
                  <Input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} placeholder="e.g. Oceanic Blue Express" />
                </div>
              )}
            </form.Field>

            {/* Boat Type */}
            <form.Field name="boatType">
              {(field) => (
                <div className="space-y-1">
                  <Label>Type</Label>
                  <Select value={field.state.value} onValueChange={field.handleChange}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SPEEDBOAT">Speedboat</SelectItem>
                      <SelectItem value="YACHT">Yacht</SelectItem>
                      <SelectItem value="CATAMARAN">Catamaran</SelectItem>
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
                  <Input type="number" value={field.state.value} onChange={(e) => field.handleChange(Number(e.target.value))} />
                </div>
              )}
            </form.Field>

            <form.Field name="capacity">
              {(field) => (
                <div className="space-y-1">
                  <Label>Capacity (Guests)</Label>
                  <Input type="number" value={field.state.value} onChange={(e) => field.handleChange(Number(e.target.value))} />
                </div>
              )}
            </form.Field>

            {/* Location & Condition */}
            <form.Field name="location">
              {(field) => (
                <div className="space-y-1">
                  <Label>Location</Label>
                  <Input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                </div>
              )}
            </form.Field>

            <form.Field name="boatCondition">
              {(field) => (
                <div className="space-y-1">
                  <Label>Condition</Label>
                  <Input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} placeholder="e.g. Excellent" />
                </div>
              )}
            </form.Field>

            {/* Technical Specs */}
            <div className="grid grid-cols-3 gap-2 md:col-span-2">
                <form.Field name="length">
                    {(field) => (
                        <div className="space-y-1">
                            <Label>Length (ft)</Label>
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
                            <Label>Year</Label>
                            <Input type="number" value={field.state.value} onChange={(e) => field.handleChange(Number(e.target.value))} />
                        </div>
                    )}
                </form.Field>
            </div>

            {/* Description */}
            <form.Field name="description">
              {(field) => (
                <div className="space-y-1 md:col-span-2">
                  <Label>Description</Label>
                  <Textarea value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
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
                            field.handleChange(checked ? [...current, item] : current.filter(i => i !== item));
                          }}
                        />
                        <label htmlFor={item} className="text-sm">{item}</label>
                      </div>
                    ))}
                  </div>
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
                    <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <form.Subscribe selector={(s) => [s.canSubmit]}>
              {([canSubmit]) => (
                <Button type="submit" disabled={!canSubmit || isMutationPending}>
                  {isMutationPending ? 'Uploading...' : boat ? 'Update Boat' : 'Create Boat'}
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