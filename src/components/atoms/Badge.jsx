import { cn } from "@/utils/cn"

const Badge = ({ children, variant = "default", className, ...props }) => {
  const variants = {
    default: "bg-slate-100 text-slate-700",
    high: "bg-error-100 text-error-700 border-error-200",
    medium: "bg-warning-100 text-warning-700 border-warning-200", 
    low: "bg-slate-100 text-slate-600 border-slate-200",
    completed: "bg-success-100 text-success-700 border-success-200"
  }

  return (
    <span 
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge