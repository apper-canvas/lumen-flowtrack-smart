import { useState } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDescription, setEditDescription] = useState(task.description || "")

  const handleToggleComplete = () => {
    onUpdate(task.Id, {
      status: task.status === "completed" ? "active" : "completed",
      completedAt: task.status === "completed" ? null : new Date().toISOString()
    })
  }

  const handleSaveEdit = () => {
    if (!editTitle.trim()) return
    
    onUpdate(task.Id, {
      title: editTitle.trim(),
      description: editDescription.trim()
    })
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditTitle(task.title)
    setEditDescription(task.description || "")
    setIsEditing(false)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "high"
      case "medium": return "medium"
      case "low": return "low"
      default: return "default"
    }
  }

  const isCompleted = task.status === "completed"

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={cn(
        "bg-white rounded-xl border border-slate-200 p-6 space-y-4 transition-all duration-200",
        "hover:shadow-lg hover:shadow-slate-200/50",
        isCompleted && "opacity-75 bg-slate-50"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <motion.button
            onClick={handleToggleComplete}
            className={cn(
              "w-5 h-5 rounded border-2 flex items-center justify-center mt-1 transition-all duration-200",
              isCompleted 
                ? "bg-success-500 border-success-500 text-white"
                : "border-slate-300 hover:border-primary-500"
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isCompleted && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ApperIcon name="Check" className="w-3 h-3" />
              </motion.div>
            )}
          </motion.button>
          
          <div className="flex-1 space-y-2">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Task title..."
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                  placeholder="Task description..."
                  rows={2}
                />
                <div className="flex space-x-2">
                  <Button size="sm" onClick={handleSaveEdit}>
                    <ApperIcon name="Check" className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                  <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
                    <ApperIcon name="X" className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <h3 className={cn(
                  "text-lg font-semibold text-slate-900 leading-tight",
                  isCompleted && "line-through text-slate-500"
                )}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className={cn(
                    "text-slate-600 text-sm leading-relaxed",
                    isCompleted && "line-through text-slate-400"
                  )}>
                    {task.description}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
        
        <Badge variant={getPriorityColor(task.priority)}>
          {task.priority}
        </Badge>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <div className="text-xs text-slate-500 space-y-1">
          <div>Created {format(new Date(task.createdAt), "MMM dd, yyyy")}</div>
          {isCompleted && task.completedAt && (
            <div className="text-success-600">
              Completed {format(new Date(task.completedAt), "MMM dd, yyyy")}
            </div>
          )}
        </div>
        
        {!isEditing && (
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={() => setIsEditing(true)}
              className="p-2 text-slate-400 hover:text-primary-500 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ApperIcon name="Edit2" className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={() => onDelete(task.Id)}
              className="p-2 text-slate-400 hover:text-error-500 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ApperIcon name="Trash2" className="w-4 h-4" />
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default TaskCard