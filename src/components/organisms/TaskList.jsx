import { motion, AnimatePresence } from "framer-motion"
import TaskCard from "@/components/molecules/TaskCard"

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <AnimatePresence mode="popLayout">
        {tasks.map((task, index) => (
          <motion.div
            key={task.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.3,
                delay: index * 0.05
              }
            }}
            exit={{ 
              opacity: 0, 
              y: -20,
              transition: { duration: 0.2 }
            }}
            layout
          >
            <TaskCard
              task={task}
              onUpdate={onUpdateTask}
              onDelete={onDeleteTask}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export default TaskList