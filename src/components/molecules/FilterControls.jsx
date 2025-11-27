import { motion } from "framer-motion"
import { cn } from "@/utils/cn"

const FilterControls = ({ currentFilter, onFilterChange, taskStats }) => {
  const filters = [
    { id: "all", label: "All", count: taskStats.total },
    { id: "active", label: "Active", count: taskStats.active },
    { id: "completed", label: "Completed", count: taskStats.completed },
  ]

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-slate-600 mr-2">Filter:</span>
      {filters.map((filter) => (
        <motion.button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={cn(
            "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            "border border-transparent",
            currentFilter === filter.id
              ? "bg-primary-500 text-white shadow-lg"
              : "bg-white text-slate-700 border-slate-200 hover:border-primary-300 hover:text-primary-700"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="flex items-center space-x-2">
            <span>{filter.label}</span>
            <span className={cn(
              "inline-flex items-center justify-center w-5 h-5 text-xs rounded-full",
              currentFilter === filter.id
                ? "bg-white/20 text-white"
                : "bg-slate-100 text-slate-500"
            )}>
              {filter.count}
            </span>
          </span>
        </motion.button>
      ))}
    </div>
  )
}

export default FilterControls