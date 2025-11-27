import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const Empty = () => {
  return (
    <motion.div 
      className="text-center space-y-6 max-w-md mx-auto py-16"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div 
        className="w-24 h-24 mx-auto bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center"
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <ApperIcon name="CheckSquare" className="w-12 h-12 text-primary-600" />
      </motion.div>
      
      <div>
        <motion.h3 
          className="text-2xl font-bold text-slate-800 mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Ready to get productive?
        </motion.h3>
        <motion.p 
          className="text-slate-600 text-lg mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Add your first task above and start organizing your work into focused, manageable flows. 
          Every great achievement starts with a single task!
        </motion.p>
        
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-center space-x-4 text-sm text-slate-500">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error-500 rounded-full"></div>
              <span>High Priority</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning-500 rounded-full"></div>
              <span>Medium Priority</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
              <span>Low Priority</span>
            </div>
          </div>
          
          <motion.div 
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-50 border border-primary-200 rounded-lg text-primary-700"
            animate={{ 
              scale: [1, 1.02, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ApperIcon name="Lightbulb" className="w-4 h-4" />
            <span className="text-sm font-medium">Tip: Use priorities to stay focused on what matters most</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Empty