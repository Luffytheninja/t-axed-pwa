import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, HTMLMotionProps } from "framer-motion"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-full text-[13px] font-bold uppercase tracking-[0.15em] ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
    {
        variants: {
            variant: {
                primary: "bg-primary text-white hover:bg-primary-light shadow-sm",
                outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-white",
                ghost: "hover:bg-primary/10 text-primary",
                glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20",
                link: "text-primary underline-offset-4 hover:underline lowercase tracking-normal font-medium text-sm",
            },
            intent: {
                neutral: "",
                trust: "bg-primary text-white",
                hope: "bg-accent text-white hover:bg-accent-light",
                action: "bg-foreground text-background",
            },
            size: {
                sm: "h-9 px-6",
                md: "h-11 px-8",
                lg: "h-14 px-10 text-[15px]",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
            intent: "neutral",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
    isLoading?: boolean
    iconLeft?: React.ReactNode
    iconRight?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, intent, asChild = false, isLoading, iconLeft, iconRight, children, ...props }, ref) => {
        const Comp = asChild ? Slot : motion.button

        // If using motion.button, we need to handle the props correctly
        const motionProps = !asChild ? {
            whileHover: { scale: 1.01 },
            whileTap: { scale: 0.98 },
        } : {}

        return (
            <Comp
                className={cn(buttonVariants({ variant, size, intent, className }), isLoading && "opacity-70")}
                ref={ref}
                {...(motionProps as any)}
                {...props}
            >
                <span className={cn("flex items-center gap-2", isLoading && "opacity-0")}>
                    {iconLeft && <span className="flex-shrink-0">{iconLeft}</span>}
                    {children}
                    {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
                </span>
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    </div>
                )}
            </Comp>
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
