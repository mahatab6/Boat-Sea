"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import FormField from "@/components/shared/form/formField";
import FormSubmitButton from "@/components/shared/form/formSubmitButtont";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { LoginAction } from "@/app/(commonLayout)/(authRoute)/login/_action";
import { Checkbox } from "@/components/ui/checkbox";

interface LoginFormProps {
  redirectPath?: string;
}

const LoginForm = ({ redirectPath }: LoginFormProps) => {
  const [serverError, setServerError] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: ILoginPayload) => LoginAction(payload, redirectPath),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        const result = (await mutateAsync(value)) as any;
        if (result.success) {
          setServerError(null);
          // Redirect logic usually happens inside the action,
          // but you can add a toast here if needed
          return;
        } else {
          setServerError(result.message || "Invalid credentials");
        }
      } catch (error: any) {
        setServerError(
          error.message || "Something went wrong. Please try again.",
        );
      }
    },
  });

  const handleGoogleLogin = () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    window.location.href = `${baseUrl}/auth/login/google`;
  };

  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 md:p-8 bg-background">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-2 tracking-tight">
            Welcome back
          </h1>
          <p className="text-muted-foreground">
            Enter your details to access your account
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
              <form.Field
                name="email"
                validators={{ onChange: loginZodSchema.shape.email }}
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

              <form.Field
                name="password"
                validators={{ onChange: loginZodSchema.shape.password }}
              >
                {(field) => {
                  return (
                    <FormField
                      field={field}
                      label="Password"
                      type="password"
                      placeholder="••••••••"
                      prepend={<Lock className="w-4 h-4" />}
                    />
                  );
                }}
              </form.Field>

              {/* Remember Me */}
              <div className="flex justify-between items-center space-x-2 py-1">
                <div className="flex items-center space-x-2 py-1">
                  <Checkbox
                  id="remember"
                  className="rounded-sm border-muted-foreground"
                />
                <Label
                  htmlFor="remember"
                  className="text-sm font-normal cursor-pointer text-muted-foreground select-none"
                >
                  Remember me
                </Label>
                </div>

                <Link href={"forgot-password"}>
                  <Label
                  htmlFor="remember"
                  className="text-sm font-normal cursor-pointer text-muted-foreground select-none"
                >
                  Forgot password
                </Label>
                </Link>
              </div>

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
                    pendingLabel="Signing in..."
                    disabled={!canSubmit}
                    className="h-11 text-base shadow-lg shadow-primary/20 hover:cursor-pointer"
                  >
                    Sign in
                  </FormSubmitButton>
                )}
              </form.Subscribe>
            </form>

            {/* Divider */}
            <div className="mt-8 relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-3 text-muted-foreground tracking-widest font-medium">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Login Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full mt-6 h-11 hover:bg-muted/50 border-border transition-all duration-300 hover:cursor-pointer"
              onClick={handleGoogleLogin}
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

        {/* Footer Link */}
        <p className="text-center text-sm text-muted-foreground">
          Donot have an account?{" "}
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

export default LoginForm;
