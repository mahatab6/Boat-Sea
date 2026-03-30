

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AnyFieldApi } from "@tanstack/react-form-nextjs";

/**
 * Safely extracts error strings from TanStack Form's error state
 */
const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") return error;
  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }
  return String(error);
};

type FormFieldProps = {
  field: AnyFieldApi;
  label: string;
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
  append?: React.ReactNode;
  prepend?: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

const FormField = ({
  field,
  label,
  type = "text",
  placeholder,
  append,
  prepend,
  className,
  disabled = false,
}: FormFieldProps) => {
  // Extract error info from TanStack field state
  const firstError =
    field.state.meta.isTouched && field.state.meta.errors.length > 0
      ? getErrorMessage(field.state.meta.errors[0])
      : null;

  const hasError = !!firstError;

  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      <Label
        htmlFor={field.name}
        className={cn(
          "text-sm font-medium transition-colors",
          hasError && "text-destructive"
        )}
      >
        {label}
      </Label>

      <div className="relative group">
        {/* Prepend Slot (e.g. Lucide Icons) */}
        {prepend && (
          <div className="absolute left-3 top-0 h-full flex items-center justify-center text-muted-foreground pointer-events-none transition-colors group-focus-within:text-primary">
            {prepend}
          </div>
        )}

        <Input
          id={field.name}
          name={field.name}
          type={type}
          value={field.state.value ?? ""}
          placeholder={placeholder}
          onBlur={field.handleBlur}
          onChange={(e) => {
            // Handle number conversion automatically if type is number
            const val = type === "number" ? e.target.valueAsNumber : e.target.value;
            field.handleChange(val);
          }}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${field.name}-error` : undefined}
          className={cn(
            "h-10 transition-all",
            prepend && "pl-10",
            append && "pr-10",
            hasError && "border-destructive ring-offset-background focus-visible:ring-destructive",
            !hasError && "focus-visible:ring-primary"
          )}
        />

        {/* Append Slot (e.g. Eye icon for passwords) */}
        {append && (
          <div className="absolute right-3 top-0 h-full flex items-center justify-center text-muted-foreground transition-colors group-focus-within:text-primary">
            {append}
          </div>
        )}
      </div>

      {/* Error Message Section */}
      {hasError && (
        <p
          id={`${field.name}-error`}
          role="alert"
          className="text-[0.8rem] font-medium text-destructive animate-in fade-in slide-in-from-top-1"
        >
          {firstError}
        </p>
      )}
    </div>
  );
};

export default FormField;