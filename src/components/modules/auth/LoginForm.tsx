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
import { toast } from "sonner";
import GoogleLogin from "./gooleLogin";

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
          toast.success("login successfully");
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

        <Card className="border-none shadow-2xl bg-card/80 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
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
                    htmlFor="forgot"
                    className="text-sm font-normal cursor-pointer text-muted-foreground select-none hover:text-primary transition-colors"
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
                    className="h-12 text-base shadow-lg shadow-primary/20 hover:cursor-pointer w-full bg-primary hover:bg-primary/90 transition-all active:scale-[0.98]"
                  >
                    Sign in
                  </FormSubmitButton>
                )}
              </form.Subscribe>
            </form>

            {/* Demo Login Buttons */}
            <div className="mt-8 space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-3 text-muted-foreground tracking-widest font-medium">
                    Demo Credentials
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-[10px] h-8 border-primary/20 hover:border-primary hover:bg-primary/5 transition-colors"
                  onClick={() => {
                    form.setFieldValue("email", "admin@gmail.com");
                    form.setFieldValue("password", "admin@#1234");
                  }}
                >
                  Admin
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-[10px] h-8 border-primary/20 hover:border-primary hover:bg-primary/5 transition-colors"
                  onClick={() => {
                    form.setFieldValue("email", "nodoy78327@sskaid.com");
                    form.setFieldValue("password", "12345678");
                  }}
                >
                  Boat Owner
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-[10px] h-8 border-primary/20 hover:border-primary hover:bg-primary/5 transition-colors"
                  onClick={() => {
                    form.setFieldValue("email", "customer@gmail.com");
                    form.setFieldValue("password", "customer@#1234");
                  }}
                >
                  Customer
                </Button>
              </div>
            </div>

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

            {/* Social Login Section
            <GoogleLogin /> */}
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

export default LoginForm;
