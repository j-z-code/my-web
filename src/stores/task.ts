import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Task {
  id: number
  title: string
  description: string
  budget: number
  status: 'pending' | 'in-progress' | 'completed'
  publisher: string
  createdAt: string
}

export const useTaskStore = defineStore('task', () => {
  // 任务列表
  const tasks = ref<Task[]>([
    {
      id: 1,
      title: '开发个人博客网站',
      description: '需要一个Vue 3开发的个人博客，支持Markdown',
      budget: 1500,
      status: 'pending',
      publisher: 'admin',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      title: '设计企业Logo',
      description: '为科技公司设计简约风格的Logo',
      budget: 800,
      status: 'in-progress',
      publisher: 'user1',
      createdAt: '2024-01-16'
    }
  ])

  // 添加新任务
  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'status'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now(),
      status: 'pending',
      createdAt: new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')
    }
    tasks.value.push(newTask)
    return newTask
  }

  // 根据ID获取任务
  const getTaskById = (id: number) => {
    return tasks.value.find(task => task.id === id)
  }

  // 更新任务状态
  const updateTaskStatus = (id: number, status: Task['status']) => {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.status = status
    }
  }

  return {
    tasks,
    addTask,
    getTaskById,
    updateTaskStatus
  }
})