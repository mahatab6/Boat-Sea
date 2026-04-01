/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { Lock, ShieldCheck, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { changepasswordZodSchema, IchangepasswordPayload } from '@/zod/changepassword.validation';
import FormField from '@/components/shared/form/formField';
import FormSubmitButton from '@/components/shared/form/formSubmitButtont';

const ChangePasswordPage = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  // 1. Mutation for Password Change
  const { mutateAsync, isPending } = useMutation({
    // mutationFn: (payload: IchangepasswordPayload) => {console.log(payload)},
    onSuccess: (result: any) => {
      if (result.success) {
        toast.success("Password updated successfully!");
        form.reset();
      }
    }
  });

  // 2. Form Management
  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);

      // Simple client-side check before hitting the server
      if (value.newPassword !== value.confirmPassword) {
        setServerError("New passwords do not match.");
        return;
      }

      try {
        // const result = (await mutateAsync({
        //   currentPassword: value.currentPassword,
        //   newPassword: value.newPassword
        // })) as any;

        // if (!result.success) {
        //   setServerError(result.message || "Failed to change password. Please check your current password.");
        // }
      } catch (error: any) {
        setServerError(error.message || "Something went wrong. Please try again.");
      }
    },
  });

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-serif font-semibold mb-6">Security Settings</h2>
      <Card className="border-none shadow-2xl bg-card">
        <CardContent className="p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-5"
          >
            {/* Current Password */}
            <form.Field
              name="currentPassword"
              validators={{ onChange: changepasswordZodSchema.shape.currentPassword }}
            >
              {(field) => (
                <FormField
                  field={field}
                  label="Current Password"
                  type="password"
                  placeholder="••••••••"
                  prepend={<Lock className="w-4 h-4" />}
                />
              )}
            </form.Field>

            <div className="pt-2 border-t border-border/50" />

            {/* New Password */}
            <form.Field
              name="newPassword"
              validators={{ onChange: changepasswordZodSchema.shape.newPassword }}
            >
              {(field) => (
                <FormField
                  field={field}
                  label="New Password"
                  type="password"
                  placeholder="••••••••"
                  prepend={<ShieldCheck className="w-4 h-4" />}
                />
              )}
            </form.Field>

            {/* Confirm New Password */}
            <form.Field name="confirmPassword">
              {(field) => (
                <FormField
                  field={field}
                  label="Confirm New Password"
                  type="password"
                  placeholder="••••••••"
                  prepend={<ShieldCheck className="w-4 h-4" />}
                />
              )}
            </form.Field>

            {/* Error Alert */}
            {serverError && (
              <Alert variant="destructive" className="py-3">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs ml-2">
                  {serverError}
                </AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <form.Subscribe
              selector={(s) => [s.canSubmit, s.isSubmitting] as const}
            >
              {([canSubmit, isSubmitting]) => (
                <FormSubmitButton
                  isPending={isSubmitting || isPending}
                  pendingLabel="Updating password..."
                  disabled={!canSubmit}
                  className="w-full h-11 text-base shadow-lg shadow-primary/20 mt-2"
                >
                  Update Password
                </FormSubmitButton>
              )}
            </form.Subscribe>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePasswordPage;