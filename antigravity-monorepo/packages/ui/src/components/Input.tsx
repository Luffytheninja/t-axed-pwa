import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    description?: string
    error?: string
    isLoading?: boolean
    leftElement?: React.ReactNode
    rightElement?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, description, error, isLoading, leftElement, rightElement, className, ...props }, ref) => {
        const [isFocused, setIsFocused] = React.useState(false)

        return (
            <div className="w-full space-y-1.5 group">
                {label && (
                    <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/50 group-focus-within:text-accent transition-colors">
                        {label}
                    </label>
                )}

                <div className="relative">
                    <div
                        className={cn(
                            "flex items-center rounded-2xl border-2 transition-all duration-300 px-4",
                            isFocused
                                ? "border-accent bg-white shadow-sm"
                                : "border-black/5 bg-muted/30 hover:border-black/10",
                            error && "border-accent shadow-accent/10"
                        )}
                    >
                        {leftElement && (
                            <div className="mr-3 text-foreground/40 transition-colors group-focus-within:text-accent">
                                {leftElement}
                            </div>
                        )}

                        <input
                            ref={ref}
                            className={cn(
                                "flex-1 bg-transparent py-3.5 text-sm font-medium focus:outline-none placeholder:text-foreground/20",
                                className
                            )}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            {...props}
                        />

                        {isLoading ? (
                            <div className="ml-3 h-4 w-4 animate-spin rounded-full border-2 border-accent/20 border-t-accent" />
                        ) : rightElement ? (
                            <div className="ml-3 text-foreground/40 transition-colors group-focus-within:text-accent">
                                {rightElement}
                            </div>
                        ) : null}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {error ? (
                        <motion.p
                            key="error"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-[11px] font-bold text-accent"
                        >
                            {error}
                        </motion.p>
                    ) : description ? (
                        <p className="text-[11px] text-foreground/40">{description}</p>
                    ) : null}
                </AnimatePresence>
            </div>
        )
    }
)
Input.displayName = "Input"

export { Input }
