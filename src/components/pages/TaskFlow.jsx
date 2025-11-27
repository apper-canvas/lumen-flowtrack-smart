import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-toastify"
import TaskForm from "@/components/organisms/TaskForm"
import TaskList from "@/components/organisms/TaskList"
import FilterControls from "@/components/molecules/FilterControls"
import SortControls from "@/components/molecules/SortControls"
import CompletionAnimation from "@/components/organisms/CompletionAnimation"
import Empty from "@/components/ui/Empty"
import { taskService } from "@/services/api/taskService"
import ApperIcon from "@/components/ApperIcon"

const TaskFlow = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("created")
  const [showCompletion, setShowCompletion] = useState(false)

  const loadTasks = async () => {
    try {
      setError("")
      setLoading(true)
      const data = await taskService.getAll()
      setTasks(data)
    } catch (err) {
      setError("Failed to load tasks. Please try again.")
      console.error("Error loading tasks:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData)
      setTasks(prev => [newTask, ...prev])
      toast.success("Task added successfully!")
    } catch (err) {
      toast.error("Failed to add task")
      console.error("Error adding task:", err)
    }
  }

  const handleUpdateTask = async (id, updates) => {
    try {
      const updatedTask = await taskService.update(id, updates)
      setTasks(prev => prev.map(task => task.Id === id ? updatedTask : task))
      
      if (updates.status === "completed") {
        setShowCompletion(true)
        setTimeout(() => setShowCompletion(false), 1000)
        toast.success("Task completed! Great job! 🎉")
      } else {
        toast.success("Task updated successfully!")
      }
    } catch (err) {
      toast.error("Failed to update task")
      console.error("Error updating task:", err)
    }
  }

  const handleDeleteTask = async (id) => {
    try {
      await taskService.delete(id)
      setTasks(prev => prev.filter(task => task.Id !== id))
      toast.success("Task deleted successfully")
    } catch (err) {
      toast.error("Failed to delete task")
      console.error("Error deleting task:", err)
    }
  }

  const filteredAndSortedTasks = () => {
    let filtered = tasks

    // Apply filter
    if (filter === "active") {
      filtered = tasks.filter(task => task.status === "active")
    } else if (filter === "completed") {
      filtered = tasks.filter(task => task.status === "completed")
    }

    // Apply sort
    return filtered.sort((a, b) => {
      if (sortBy === "priority") {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      } else if (sortBy === "created") {
        return new Date(b.createdAt) - new Date(a.createdAt)
      }
      return 0
    })
  }

  const displayTasks = filteredAndSortedTasks()
  const taskStats = {
    total: tasks.length,
    active: tasks.filter(t => t.status === "active").length,
    completed: tasks.filter(t => t.status === "completed").length,
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 mx-auto">
            <div className="w-full h-full border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-600 font-medium">Loading your tasks...</p>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div 
          className="text-center space-y-6 max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-20 h-20 mx-auto bg-error-100 rounded-full flex items-center justify-center">
            <ApperIcon name="AlertCircle" className="w-10 h-10 text-error-500" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Oops! Something went wrong</h3>
            <p className="text-slate-600 mb-6">{error}</p>
            <button
              onClick={loadTasks}
              className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 font-medium"
            >
              Try Again
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
              <ApperIcon name="CheckSquare" className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              FlowTrack
            </h1>
          </div>
          <p className="text-slate-600 text-lg max-w-md mx-auto">
            Capture, organize, and complete tasks with focused efficiency
          </p>
          
          {/* Stats */}
          {tasks.length > 0 && (
            <motion.div 
              className="flex justify-center space-x-8 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-700">{taskStats.total}</div>
                <div className="text-sm text-slate-500">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{taskStats.active}</div>
                <div className="text-sm text-slate-500">Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success-600">{taskStats.completed}</div>
                <div className="text-sm text-slate-500">Completed</div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Task Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <TaskForm onAddTask={handleAddTask} />
        </motion.div>

        {/* Filters and Sort */}
        {tasks.length > 0 && (
          <motion.div 
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <FilterControls 
              currentFilter={filter} 
              onFilterChange={setFilter}
              taskStats={taskStats}
            />
            <SortControls currentSort={sortBy} onSortChange={setSortBy} />
          </motion.div>
        )}

        {/* Task List or Empty State */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {displayTasks.length > 0 ? (
            <TaskList 
              tasks={displayTasks}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
            />
          ) : tasks.length === 0 ? (
            <Empty />
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto bg-slate-200 rounded-full flex items-center justify-center mb-4">
                <ApperIcon name="Filter" className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No tasks match your filter</h3>
              <p className="text-slate-500 mb-6">Try adjusting your filter to see more tasks</p>
              <button
                onClick={() => setFilter("all")}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200"
              >
                Show All Tasks
              </button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Completion Animation */}
      <AnimatePresence>
        {showCompletion && <CompletionAnimation />}
      </AnimatePresence>
    </div>
  )
}

export default TaskFlow