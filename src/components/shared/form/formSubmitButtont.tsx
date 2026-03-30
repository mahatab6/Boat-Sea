

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import React from 'react'

type FormSubmitButtonProps = {
  isPending?: boolean;
  children: React.ReactNode;
  pendingLabel?: string;
  className?: string;
  disabled?: boolean;
};



const FormSubmitButton = ({
  isPending,
  children,
  pendingLabel = "Submitting...",
  className,
  disabled,

  ...props 
}: FormSubmitButtonProps) => {
  
  const isDisabled = disabled || isPending;

  return (
    <Button
      type="submit"
      disabled={isDisabled}
      className={cn("w-full transition-all active:scale-[0.98]", className)}
      {...props}
    >
      {isPending ? (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          <span className="animate-pulse">{pendingLabel}</span>
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default FormSubmitButton;

