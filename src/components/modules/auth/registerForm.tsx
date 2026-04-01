/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { RegisterAction } from "@/app/(commonLayout)/(authRoute)/register/_action";
import FormField from "@/components/shared/form/formField";
import FormSubmitButton from "@/components/shared/form/formSubmitButtont";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { IRegisterPayload, registerZodSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { User, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const RegisterForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: IRegisterPayload) => RegisterAction(payload),
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      if (!acceptedTerms) {
        setServerError("You must accept the terms and conditions.");
        return;
      }

      setServerError(null);
      try {
        const result = (await mutateAsync(value)) as any;
        if (result.success) {
          setServerError(null);
          // Typically redirect happens in action or via window.location here
          return;
        } else {
          setServerError(result.message || "Registration failed");
        }
      } catch (error: any) {
        setServerError(error.message || "An unexpected error occurred.");
      }
    },
  });

  // Simple Password Strength Logic
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { label: "", color: "bg-muted" };
    if (pass.length < 6) return { label: "Weak", color: "bg-destructive" };
    if (pass.length < 10) return { label: "Fair", color: "bg-yellow-500" };
    return { label: "Strong", color: "bg-emerald-500" };
  };

  const handleGoogleSignup = () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    window.location.href = `${baseUrl}/auth/login/google`;
  };

  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 md:p-8 bg-background">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-bold text-primary mb-2 tracking-tight">
            Create account
          </h1>
          <p className="text-muted-foreground italic">
            Join Boat Sea to start your journey
          </p>
        </div>

        <Card className="border-0 shadow-2xl bg-card">
          <CardContent className="p-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="space-y-4"
            >
              {/* Full Name */}
              <form.Field
                name="name"
                validators={{ onChange: registerZodSchema.shape.name }}
              >
                {(field) => (
                  <FormField
                    field={field}
                    label="Full Name"
                    placeholder="Enter your name"
                    prepend={<User className="w-4 h-4" />}
                  />
                )}
              </form.Field>

              {/* Email */}
              <form.Field
                name="email"
                validators={{ onChange: registerZodSchema.shape.email }}
              >
                {(field) => (
                  <FormField
                    field={field}
                    label="Email"
                    type="email"
                    placeholder="name@example.com"
                    prepend={<Mail className="w-4 h-4" />}
                  />
                )}
              </form.Field>

              {/* Password */}
              <form.Field
                name="password"
                validators={{ onChange: registerZodSchema.shape.password }}
              >
                {(field) => {
                  const strength = getPasswordStrength(field.state.value);
                  return (
                    <div className="space-y-2">
                      <FormField
                        field={field}
                        label="Password"
                        type="password" // The eye toggle will appear automatically
                        placeholder="••••••••"
                        prepend={<Lock className="w-4 h-4" />}
                      />

                      {field.state.value && (
                        <div className="flex items-center gap-2 px-1">
                          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full ${strength.color} transition-all duration-500`}
                              style={{
                                width:
                                  strength.label === "Weak"
                                    ? "33%"
                                    : strength.label === "Fair"
                                      ? "66%"
                                      : "100%",
                              }}
                            />
                          </div>
                          <span className="text-[10px] uppercase font-bold text-muted-foreground w-10">
                            {strength.label}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                }}
              </form.Field>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-2 pt-2">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(!!checked)}
                  className="mt-1"
                />
                <Label
                  htmlFor="terms"
                  className="text-sm font-normal leading-snug text-muted-foreground cursor-pointer select-none"
                >
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-primary hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              {/* Server Error */}
              {serverError && (
                <Alert variant="destructive" className="py-2">
                  <AlertDescription className="text-xs text-center">
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
                    pendingLabel="Creating account..."
                    disabled={!canSubmit || !acceptedTerms}
                    className="w-full mt-4 h-11 shadow-lg shadow-primary/20 hover:cursor-pointer"
                  >
                    Create account
                  </FormSubmitButton>
                )}
              </form.Subscribe>
            </form>

            {/* Social Divider */}
            <div className="mt-8 relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                <span className="bg-card px-3 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full mt-6 h-11 border-border hover:bg-muted/50 transition-all"
              onClick={handleGoogleSignup}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-bold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
};

export default RegisterForm;
