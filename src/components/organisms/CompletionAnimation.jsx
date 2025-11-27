import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import ApperIcon from "@/components/ApperIcon"

const CompletionAnimation = () => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Generate random particles for confetti effect
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 50,
      delay: Math.random() * 0.2,
      color: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"][Math.floor(Math.random() * 4)]
    }))
    setParticles(newParticles)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
    >
      {/* Confetti Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-3 h-3 rounded-full"
          style={{ 
            backgroundColor: particle.color,
            left: `${particle.x}%`,
            top: `${particle.y}%`
          }}
          initial={{ 
            scale: 0,
            y: 0,
            rotate: 0
          }}
          animate={{
            scale: [0, 1, 0],
            y: [0, -100, 100],
            rotate: [0, 360],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 0.8,
            delay: particle.delay,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Main Animation */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 300,
          damping: 20
        }}
        className="bg-white rounded-full p-8 shadow-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            delay: 0.2,
            type: "spring",
            stiffness: 400
          }}
        >
          <ApperIcon 
            name="CheckCircle" 
            className="w-16 h-16 text-success-500" 
          />
        </motion.div>
      </motion.div>

      {/* Success Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.4 }}
        className="absolute bottom-[40%] text-center"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-6 py-3 shadow-lg">
          <h3 className="text-xl font-bold text-slate-800 mb-1">Task Completed!</h3>
          <p className="text-success-600 font-medium">Great job! 🎉</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CompletionAnimation