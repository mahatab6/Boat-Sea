/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Image from "next/image";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IUser } from "@/types/auth.types";
import { updateProfileAction } from "./_action";


const ProfileModal = ({ userData }: { userData: IUser }) => {
  const [open, setOpen] = React.useState(false);
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | StaticImport | null>(userData?.image || null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      // CORRECT WAY TO LOG FORMDATA content:
      console.log("FormData Content:", Object.fromEntries(formData.entries()));
      
      const result = await updateProfileAction(formData);
      if (!result.success) throw new Error(result.error || "Update failed");
      return result.data;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      setOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update profile");
    },
  });

  const form = useForm({
    defaultValues: {
      name: userData?.name || "",
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData();
      
      // We append the name as a simple string field
      formData.append("name", value.name);

      if (imageFile) {
        // "images" matches your formData.append key
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
      <DialogTrigger asChild={false}>
        <Button className="hover:cursor-pointer" variant="outline">
          <span>Edit Profile</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Update your public name and profile picture.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
          
        >
          <div className="space-y-4">
            <form.Field name="name">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Display Name</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
              )}
            </form.Field>

            <div className="space-y-3">
              <Label>Profile Picture</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />

              {imagePreview && (
                <div className="relative mt-4 h-40 w-40 mx-auto overflow-hidden rounded-full border-2 border-muted">
                  <Image
                    src={imagePreview}
                    alt="Profile Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button className={"hover:cursor-pointer"} type="button" variant="ghost" onClick={() => setOpen(false)} >
              Cancel
            </Button>

            <form.Subscribe selector={(state) => [state.canSubmit]}>
              {([canSubmit]) => (
                <Button 
                    type="submit" 
                    disabled={!canSubmit || isPending}
                    className={"hover:cursor-pointer"}
                    
                >
                  {isPending ? "Saving..." : "Save Changes"}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
