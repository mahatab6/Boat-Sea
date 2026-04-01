"use client"

import React, { useState } from "react"; // Added useState
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Eye, EyeOff } from "lucide-react"; 

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
 
  const [showPassword, setShowPassword] = useState(false);

  const firstError =
    field.state.meta.isTouched && field.state.meta.errors.length > 0
      ? getErrorMessage(field.state.meta.errors[0])
      : null;

  const hasError = !!firstError;

  
  const inputType = type === "password" && showPassword ? "text" : type;

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
        {prepend && (
          <div className="absolute left-3 top-0 h-full flex items-center justify-center text-muted-foreground pointer-events-none transition-colors group-focus-within:text-primary">
            {prepend}
          </div>
        )}

        <Input
          id={field.name}
          name={field.name}
          type={inputType} 
          value={field.state.value ?? ""}
          placeholder={placeholder}
          onBlur={field.handleBlur}
          onChange={(e) => {
            const val = type === "number" ? e.target.valueAsNumber : e.target.value;
            field.handleChange(val);
          }}
          disabled={disabled}
          className={cn(
            "h-10 transition-all",
            prepend && "pl-10",
            (append || type === "password") && "pr-10", 
            hasError && "border-destructive focus-visible:ring-destructive",
            !hasError && "focus-visible:ring-primary"
          )}
        />

       
        <div className="absolute right-3 top-0 h-full flex items-center justify-center text-muted-foreground transition-colors group-focus-within:text-primary">
          {type === "password" ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="hover:text-foreground focus:outline-none transition-colors"
              tabIndex={-1} 
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          ) : (
            append
          )}
        </div>
      </div>

      {hasError && (
        <p className="text-[0.8rem] font-medium text-destructive animate-in fade-in slide-in-from-top-1">
          {firstError}
        </p>
      )}
    </div>
  );
};

export default FormField;