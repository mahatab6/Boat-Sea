/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

import FormField from "@/components/shared/form/formField";
import FormSubmitButton from "@/components/shared/form/formSubmitButtont";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


const ForgotPasswordForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // const { mutateAsync, isPending } = useMutation({
  //   mutationFn: (email: string) => 
  //     ForgotPasswordAction(email),
  // });

  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      // try {
      //   const result = await mutateAsync(value.email);

      //   if (result.success) {
      //     setIsSuccess(true);
      //     setServerError(null);
      //   } else {
      //     setServerError(result.message || "Something went wrong");
      //   }
      // } catch (error: any) {
      //   setServerError("An unexpected error occurred. Please try again.");
      // }
    },
  });

  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 md:p-8 bg-background">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-2 tracking-tight">
            Reset Password
          </h1>
          <p className="text-muted-foreground">
            {isSuccess
              ? "Check your inbox for further instructions"
              : "Enter your email to receive a password reset link"}
          </p>
        </div>

        <Card className="border-none shadow-2xl bg-card">
          <CardContent className="p-8">
            {isSuccess ? (
              <div className="text-center space-y-6 py-4">
                <div className="flex justify-center">
                  <CheckCircle2 className="w-16 h-16 text-primary animate-bounce" />
                </div>
                <p className="text-sm text-muted-foreground">
                  If an account exists for{" "}
                  <strong>{form.state.values.email}</strong>, you will receive
                  an email shortly.
                </p>
                <Link href="/login" className="block">
                  <Button variant="outline" className="w-full h-11">
                    Back to Login
                  </Button>
                </Link>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.handleSubmit();
                }}
                className="space-y-5"
              >
                <form.Field
                  name="email"
                  // validators={{ onChange: forgotPasswordZodSchema.shape.email }}
                >
                  {(field) => (
                    <FormField
                      field={field}
                      label="Email Address"
                      type="email"
                      placeholder="name@example.com"
                      prepend={<Mail className="w-4 h-4" />}
                    />
                  )}
                </form.Field>

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
                      // isPending={isSubmitting || isPending}
                      pendingLabel="Sending link..."
                      disabled={!canSubmit}
                      className="h-11 text-base shadow-lg shadow-primary/20"
                    >
                      Send Reset Link
                    </FormSubmitButton>
                  )}
                </form.Subscribe>

                <Link
                  href="/login"
                  className="flex items-center justify-center text-sm text-muted-foreground hover:text-primary transition-colors pt-2"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to sign in
                </Link>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Footer Link */}
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-primary font-bold hover:underline transition-all"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
};

export default ForgotPasswordForm;
