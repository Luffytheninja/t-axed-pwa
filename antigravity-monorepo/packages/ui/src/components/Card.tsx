import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, HTMLMotionProps } from "framer-motion"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const cardVariants = cva(
    "relative rounded-[2rem] overflow-hidden transition-all duration-300",
    {
        variants: {
            variant: {
                default: "bg-white border border-black/5 shadow-sm",
                glass: "bg-white/5 backdrop-blur-2xl border border-white/10 text-white shadow-xl shadow-black/10",
                outline: "bg-transparent border border-black/10 shadow-none",
                flat: "bg-muted shadow-none",
            },
            padding: {
                none: "p-0",
                sm: "p-4 md:p-6",
                md: "p-6 md:p-8",
                lg: "p-8 md:p-12",
            },
        },
        defaultVariants: {
            variant: "default",
            padding: "md",
        },
    }
)

export interface CardProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
    asChild?: boolean
    headerSlot?: React.ReactNode
    footerSlot?: React.ReactNode
    dataLabel?: string
    dataPriority?: "high" | "normal" | "low"
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant, padding, asChild = false, headerSlot, footerSlot, dataLabel, dataPriority = "normal", children, ...props }, ref) => {
        const Comp = asChild ? Slot : motion.div

        const motionProps = !asChild ? {
            initial: { opacity: 0, y: 10 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
        } : {}

        return (
            <Comp
                className={cn(cardVariants({ variant, padding, className }))}
                ref={ref}
                data-label={dataLabel}
                data-priority={dataPriority}
                {...(motionProps as any)}
                {...props}
            >
                {variant === 'glass' && (
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                )}

                {headerSlot && (
                    <div className="mb-6 border-b border-black/5 pb-4">
                        {headerSlot}
                    </div>
                )}

                <div className="relative z-10 w-full">
                    {children}
                </div>

                {footerSlot && (
                    <div className="mt-8 pt-6 border-t border-black/5">
                        {footerSlot}
                    </div>
                )}
            </Comp>
        )
    }
)
Card.displayName = "Card"

export { Card, cardVariants }
