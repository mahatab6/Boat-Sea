/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from '@tanstack/react-form';

import { 
  X, Mail, Lock 
} from 'lucide-react';
import { toast } from 'sonner';


import { 
  Dialog, DialogContent, DialogHeader, DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

import { IBoat } from '@/types/boat.types';

interface BoatFormModalProps {
  open: boolean;
  onClose: () => void;
  boat: IBoat;

}

const BoatFormModal = ({ open, onClose, boat,  } : BoatFormModalProps) => {
  
  // 1. TanStack Query Mutation
  const { mutateAsync, isPending: isMutationPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      console.log(formData)
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
      name: boat?.boatName || '',
      boatType: boat?.boatType || 'Yacht',
      capacity: boat?.capacity || 1,
      maxGuests: boat?.capacity || 1,
      pricePerDay: boat?.pricePerTrip || 0,
      location: boat?.location || '',
      coordinates: boat?.boatCondition || '',
      description: boat?.boatCondition || '',
      status: boat?.status || 'Active',
      amenities: boat?.amenities || [],
      insurance: boat?.id || false,
      captainIncluded: boat?.engineCapacity || false,
      specifications: boat?.length || { length: '', year: '', engine: '', fuel: '', speed: '' }
    },
    onSubmit: async ({ value }) => {
      const data = new FormData();
      
      // Append standard fields
      Object.entries(value).forEach(([key, val]) => {
        if (key === 'specifications') {
          data.append(key, JSON.stringify(val));
        } else if (key === 'amenities') {
          (val as string[]).forEach(a => data.append('amenities', a));
        } else if (key !== 'image') {
          data.append(key, val as any);
        }
      });

      data.append('boatId', boat.id);

      // Handle Image (Assumes you maintain a local state for the file object)
      if (imageFile) {
        data.append('image', imageFile);
      } else if (!imagePreview && boat?.primary_img) {
        data.append('image', ''); 
      }

      await mutateAsync(data);
    },
  });

  // Local state for image handling (TanStack Form doesn't natively handle File objects in state well)
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const amenitiesList = ['WiFi', 'Kitchen', 'Bedroom', 'Bathroom', 'Deck'];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Boat Name Field */}
            <form.Field name="name">
              {(field) => (
                <div className="space-y-2 md:col-span-1">
                  <Label htmlFor={field.name}>Boat Name</Label>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>

            {/* Boat Type Field */}
            <form.Field name="boatType">
              {(field) => (
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={field.state.value} >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yacht">Yacht</SelectItem>
                      <SelectItem value="Speedboat">Speedboat</SelectItem>
                      <SelectItem value="Catamaran">Catamaran</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </form.Field>

            {/* Pricing: Price Per Day */}
            <form.Field name="pricePerDay">
              {(field) => (
                <div className="space-y-2">
                  <Label>Price/Day ($)</Label>
                  <Input
                    type="number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />
                </div>
              )}
            </form.Field>

            {/* Amenities (Array Handling) */}
            <form.Field name="amenities">
              {(field) => (
                <div className="space-y-4 md:col-span-2">
                  <Label>Amenities</Label>
                  <div className="flex flex-wrap gap-4">
                    {amenitiesList.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                          id={amenity}
                          checked={field.state.value.includes(amenity)}
                          onCheckedChange={(checked) => {
                            const nextValue = checked
                              ? [...field.state.value, amenity]
                              : field.state.value.filter((a) => a !== amenity);
                            field.handleChange(nextValue);
                          }}
                        />
                        <Label htmlFor={amenity}>{amenity}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </form.Field>

            {/* Image Upload Section */}
            <div className="space-y-2 md:col-span-2">
              <Label>Primary Image</Label>
              <Input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="boat-image" />
              <div 
                className="w-full max-w-md h-48 rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer"
                onClick={() => document.getElementById('boat-image')?.click()}
              >
                {imagePreview ? (
                  <img src={imagePreview} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <span className="text-muted-foreground">Upload Boat Image</span>
                )}
              </div>
            </div>

          </div>

          <div className="flex justify-end gap-2 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            
            <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
              {([canSubmit, isSubmitting]) => (
                <Button 
                  type="submit" 
                  disabled={!canSubmit || isMutationPending}
                >
                  {isMutationPending ? 'Saving...' : 'Save Boat'}
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