import { motion } from "framer-motion"
import Select from "@/components/atoms/Select"
import ApperIcon from "@/components/ApperIcon"

const SortControls = ({ currentSort, onSortChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-2 text-sm font-medium text-slate-600">
        <ApperIcon name="ArrowUpDown" className="w-4 h-4" />
        <span>Sort by:</span>
      </div>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="min-w-[120px]"
      >
        <Select
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="text-sm"
        >
          <option value="created">Created Date</option>
          <option value="priority">Priority</option>
        </Select>
      </motion.div>
    </div>
  )
}

export default SortControls