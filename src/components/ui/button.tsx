import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";
import { Spinner } from "@/components/ui/spinner";

const buttonVariants = cva(
  "inline-flex items-center gap-2 justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary/30 text-primary-foreground shadow-sm border border-primary/20 hover:bg-primary/20",
        destructive:
          "bg-red-950/50 text-red-400 shadow-sm border border-red-800/40 hover:bg-red-950/70 hover:text-red-300",
        outline:
          "border border-input/30 bg-background/50 shadow-sm hover:bg-accent/50 hover:text-accent-foreground",
        secondary:
          "bg-secondary/80 text-secondary-foreground/90 shadow-sm border border-secondary/40 hover:bg-secondary/40",
        ghost:
          "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground",
        link: "text-primary/80 underline-offset-4 hover:text-primary hover:underline",
        accent:
          "bg-accent/80 text-accent-foreground shadow-sm border border-accent/40 hover:bg-accent/60",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size,
      children,
      isLoading,
      loadingText,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const spinnerSize = size === "icon" ? "sm" : "md";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props} // This needs to not be last so disabled is set correctly
        disabled={isLoading || props.disabled}
      >
        {isLoading && <Spinner size={spinnerSize} />}
        {isLoading ? loadingText || children : children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
