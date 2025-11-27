import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const ErrorView = ({ error, onRetry }) => {
  return (
    <motion.div 
      className="text-center space-y-6 max-w-md mx-auto py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-20 h-20 mx-auto bg-error-100 rounded-full flex items-center justify-center">
        <ApperIcon name="AlertCircle" className="w-10 h-10 text-error-500" />
      </div>
      
      <div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">Something went wrong</h3>
        <p className="text-slate-600 mb-6">{error || "An unexpected error occurred. Please try again."}</p>
        
        <motion.button
          onClick={onRetry}
          className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center space-x-2">
            <ApperIcon name="RefreshCw" className="w-4 h-4" />
            <span>Try Again</span>
          </div>
        </motion.button>
      </div>
    </motion.div>
  )
}

export default ErrorView