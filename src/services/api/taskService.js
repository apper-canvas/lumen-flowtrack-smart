import mockTasks from "@/services/mockData/tasks.json"

// Simulate local storage for persistence
const STORAGE_KEY = "flowtrack_tasks"

const getStoredTasks = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : [...mockTasks]
  } catch (error) {
    console.error("Error reading from localStorage:", error)
    return [...mockTasks]
  }
}

const saveTasksToStorage = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch (error) {
    console.error("Error saving to localStorage:", error)
  }
}

// Initialize storage with mock data if empty
if (!localStorage.getItem(STORAGE_KEY)) {
  saveTasksToStorage(mockTasks)
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const taskService = {
  async getAll() {
    await delay(300) // Simulate API call
    const tasks = getStoredTasks()
    return [...tasks] // Return copy to prevent mutations
  },

  async getById(id) {
    await delay(200)
    const tasks = getStoredTasks()
    const task = tasks.find(t => t.Id === parseInt(id))
    if (!task) {
      throw new Error(`Task with Id ${id} not found`)
    }
    return { ...task }
  },

  async create(taskData) {
    await delay(400)
    const tasks = getStoredTasks()
    
    // Find highest existing Id and add 1
    const maxId = tasks.reduce((max, task) => Math.max(max, task.Id), 0)
    const newTask = {
      ...taskData,
      Id: maxId + 1,
      createdAt: taskData.createdAt || new Date().toISOString(),
      completedAt: taskData.completedAt || null
    }
    
    const updatedTasks = [newTask, ...tasks]
    saveTasksToStorage(updatedTasks)
    return { ...newTask }
  },

  async update(id, updates) {
    await delay(300)
    const tasks = getStoredTasks()
    const index = tasks.findIndex(t => t.Id === parseInt(id))
    
    if (index === -1) {
      throw new Error(`Task with Id ${id} not found`)
    }

    const updatedTask = { ...tasks[index], ...updates }
    tasks[index] = updatedTask
    saveTasksToStorage(tasks)
    return { ...updatedTask }
  },

  async delete(id) {
    await delay(250)
    const tasks = getStoredTasks()
    const filteredTasks = tasks.filter(t => t.Id !== parseInt(id))
    
    if (filteredTasks.length === tasks.length) {
      throw new Error(`Task with Id ${id} not found`)
    }
    
    saveTasksToStorage(filteredTasks)
    return true
  }
}