/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Mail, ShieldCheck } from "lucide-react";
import FormField from "@/components/shared/form/formField";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  IverifyemailPayload,
  verifyemailZodSchema,
} from "@/zod/auth.validation";
import FormSubmitButton from "@/components/shared/form/formSubmitButtont";
import { VerifyEmailAction } from "@/app/(commonLayout)/(authRoute)/verify-email/_action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface VerifyEmailFormProps {
  email: string;
}

const VerifyEmailForm = ({ email }: VerifyEmailFormProps) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: IverifyemailPayload) => VerifyEmailAction(payload),
  });

  const form = useForm({
    defaultValues: {
      email: email || "",
      otp: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        const result = await mutateAsync(value);
       

        if (result?.success) {
          toast.success(result.message || "Email verified successfully");
          router.push("/");
          return;
        }

        setServerError(
          result?.message || "Verification failed. Please try again.",
        );
      } catch (error: any) {
        setServerError(
          error?.message || "Something went wrong. Please try again.",
        );
      }
    },
  });

  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 md:p-8 bg-background">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-2 tracking-tight">
            Verify Email
          </h1>
          <p className="text-muted-foreground">
            We have sent a code to{" "}
            <span className="font-medium text-foreground">{email}</span>
          </p>
        </div>

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
              {/* Email Field  */}
              <form.Field
                name="email"
                validators={{ onChange: verifyemailZodSchema.shape.email }}
              >
                {(field) => (
                  <FormField
                    field={field}
                    label="Email Address"
                    type="email"
                    disabled
                    prepend={<Mail className="w-4 h-4" />}
                  />
                )}
              </form.Field>

              {/* OTP Field */}
              <form.Field
                name="otp"
                validators={{
                  onChange: verifyemailZodSchema.shape.otp,
                }}
              >
                {(field) => (
                  <FormField
                    field={field}
                    label="Verification Code"
                    type="text"
                    placeholder="Enter 6-digit code"
                    prepend={<ShieldCheck className="w-4 h-4" />}
                  />
                )}
              </form.Field>

              {/* Server Error Alert */}
              {serverError && (
                <Alert variant="destructive" className="py-3">
                  <AlertDescription className="text-xs">
                    {serverError}
                  </AlertDescription>
                </Alert>
              )}

              <form.Subscribe
                selector={(s) => [s.canSubmit, s.isSubmitting] as const}
              >
                {([canSubmit, isSubmitting]) => (
                  <FormSubmitButton
                    isPending={isSubmitting || isPending}
                    pendingLabel="Verifying..."
                    disabled={!canSubmit}
                    className="h-11 text-base shadow-lg shadow-primary/20 hover:cursor-pointer"
                  >
                    Verify Account
                  </FormSubmitButton>
                )}
              </form.Subscribe>
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                Did not receive a code?{" "}
                <button
                  type="button"
                  className="text-primary font-semibold hover:underline hover:cursor-pointer"
                  onClick={() => {
                    /* Implement Resend OTP logic */
                  }}
                >
                  Resend
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default VerifyEmailForm;
