import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Textarea = forwardRef(({ 
  className, 
  error,
  ...props 
}, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full px-4 py-3 border rounded-lg transition-all duration-200 resize-none",
        "placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-1",
        error 
          ? "border-error-300 focus:border-error-500 focus:ring-error-500" 
          : "border-slate-300 focus:border-primary-500 focus:ring-primary-500",
        "hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
})

Textarea.displayName = "Textarea"

export default Textarea