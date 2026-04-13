/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Lock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import FormField from "@/components/shared/form/formField";
import FormSubmitButton from "@/components/shared/form/formSubmitButtont";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ResetPasswordAction } from "@/app/(commonLayout)/(authRoute)/reset-password/_action";

const ResetPasswordForm = ({ token }: { token: string }) => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (password: string) => ResetPasswordAction(password, token),
  });

  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      if (value.password !== value.confirmPassword) {
        setServerError("Passwords do not match");
        return;
      }
      
      setServerError(null);
      try {
        const result = await mutateAsync(value.password);
        if (result.success) {
          setIsSuccess(true);
          setTimeout(() => router.push("/login"), 3000);
        } else {
          setServerError(result.message || "Reset failed. Link may be expired.");
        }
      } catch (error: any) {
        setServerError("Something went wrong. Please try again.");
      }
    },
  });

  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-2">New Password</h1>
          <p className="text-muted-foreground">Please enter your new secure password</p>
        </div>

        <Card className="border-none shadow-2xl bg-card">
          <CardContent className="p-8">
            {isSuccess ? (
              <div className="text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
                <p className="font-medium">Password changed successfully!</p>
                <p className="text-sm text-muted-foreground">Redirecting to login...</p>
                <Link href="/login">
                  <Button className="w-full mt-4">Login Now</Button>
                </Link>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit();
                }}
                className="space-y-5"
              >
                <form.Field name="password">
                  {(field) => (
                    <FormField
                      field={field}
                      label="New Password"
                      type="password"
                      placeholder="••••••••"
                      prepend={<Lock className="w-4 h-4" />}
                    />
                  )}
                </form.Field>

                <form.Field name="confirmPassword">
                  {(field) => (
                    <FormField
                      field={field}
                      label="Confirm Password"
                      type="password"
                      placeholder="••••••••"
                      prepend={<Lock className="w-4 h-4" />}
                    />
                  )}
                </form.Field>

                {serverError && (
                  <Alert variant="destructive">
                    <AlertDescription className="text-xs">{serverError}</AlertDescription>
                  </Alert>
                )}

                <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
                  {([canSubmit, isSubmitting]) => (
                    <FormSubmitButton
                      isPending={isSubmitting || isPending}
                      pendingLabel="Updating..."
                      disabled={!canSubmit}
                    >
                      Update Password
                    </FormSubmitButton>
                  )}
                </form.Subscribe>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ResetPasswordForm;