import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Select = forwardRef(({ 
  className, 
  children,
  error,
  ...props 
}, ref) => {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "w-full px-4 py-3 border rounded-lg transition-all duration-200 appearance-none bg-white",
          "focus:outline-none focus:ring-2 focus:ring-offset-1",
          error 
            ? "border-error-300 focus:border-error-500 focus:ring-error-500" 
            : "border-slate-300 focus:border-primary-500 focus:ring-primary-500",
          "hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
        <ApperIcon name="ChevronDown" className="w-4 h-4 text-slate-400" />
      </div>
    </div>
  )
})

Select.displayName = "Select"

export default Select