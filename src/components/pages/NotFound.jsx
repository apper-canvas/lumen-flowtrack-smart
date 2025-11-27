import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div 
        className="text-center space-y-6 max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-24 h-24 mx-auto bg-primary-100 rounded-full flex items-center justify-center">
          <ApperIcon name="MapPin" className="w-12 h-12 text-primary-500" />
        </div>
        
        <div>
          <h1 className="text-6xl font-bold text-slate-800 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-slate-700 mb-4">Page Not Found</h2>
          <p className="text-slate-600 mb-8">
            The page you're looking for doesn't exist. Let's get you back on track with your tasks.
          </p>
        </div>

        <div className="space-y-4">
          <motion.button
            onClick={() => navigate("/")}
            className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center space-x-2">
              <ApperIcon name="Home" className="w-5 h-5" />
              <span>Back to Tasks</span>
            </div>
          </motion.button>
          
          <motion.button
            onClick={() => navigate(-1)}
            className="w-full px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-100 transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center space-x-2">
              <ApperIcon name="ArrowLeft" className="w-5 h-5" />
              <span>Go Back</span>
            </div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound