import { motion } from "framer-motion"

const Loading = () => {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-12 h-12 bg-slate-200 rounded-xl animate-pulse"></div>
          <div className="w-32 h-8 bg-slate-200 rounded-lg animate-pulse"></div>
        </div>
        <div className="w-64 h-5 bg-slate-200 rounded-lg animate-pulse mx-auto"></div>
      </div>

      {/* Form Skeleton */}
      <motion.div 
        className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="w-24 h-5 bg-slate-200 rounded animate-pulse"></div>
        <div className="w-full h-12 bg-slate-200 rounded-lg animate-pulse"></div>
        <div className="w-20 h-5 bg-slate-200 rounded animate-pulse"></div>
        <div className="w-32 h-10 bg-slate-200 rounded-lg animate-pulse"></div>
        <div className="w-24 h-10 bg-slate-200 rounded-lg animate-pulse ml-auto"></div>
      </motion.div>

      {/* Task Cards Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3].map((index) => (
          <motion.div 
            key={index}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 space-y-2">
                <div className="w-48 h-6 bg-slate-200 rounded animate-pulse"></div>
                <div className="w-64 h-4 bg-slate-200 rounded animate-pulse"></div>
              </div>
              <div className="w-16 h-6 bg-slate-200 rounded-full animate-pulse"></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="w-20 h-4 bg-slate-200 rounded animate-pulse"></div>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-slate-200 rounded animate-pulse"></div>
                <div className="w-8 h-8 bg-slate-200 rounded animate-pulse"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Loading