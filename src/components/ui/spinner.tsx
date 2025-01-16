import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

const spinnerVariants = cva("", {
  variants: {
    size: {
      default: "h-6 w-6",
      xs: "h-3 w-3",
      sm: "h-4 h-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-8 w-8",
      xxl: "h-10 w-10",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface SpinnerProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof spinnerVariants> {}

export function Spinner({ className, size }: SpinnerProps) {
  return (
    <span
      className={cn("loading-spinner", className, spinnerVariants({ size }))}
    ></span>
  );
}
