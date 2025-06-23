import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-base font-montserrat font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 border-transparent shadow-sm hover:shadow-lg [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-brand-slate-blue text-white hover:bg-brand-slate-blue-light hover:text-white hover:border-brand-slate-blue",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 hover:text-white hover:border-red-500",
        outline:
          "border-brand-slate-blue bg-white text-brand-slate-blue hover:bg-brand-slate-blue hover:text-white hover:border-brand-slate-blue",
        secondary:
          "bg-brand-gray-100 text-brand-gray-800 hover:bg-brand-slate-blue hover:text-white hover:border-brand-slate-blue",
        ghost: "hover:bg-brand-slate-blue hover:text-white hover:border-brand-slate-blue",
        link: "text-brand-slate-blue underline-offset-4 hover:underline hover:text-brand-slate-blue border-transparent hover:border-transparent shadow-none hover:shadow-none",
        accent: "bg-brand-silver text-brand-charcoal hover:bg-brand-slate-blue hover:text-white hover:border-brand-slate-blue",
      },
      size: {
        default: "px-7 py-[14px]",
        sm: "px-4 py-2 text-sm rounded-md",
        lg: "px-8 py-4 text-lg rounded-[12px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
