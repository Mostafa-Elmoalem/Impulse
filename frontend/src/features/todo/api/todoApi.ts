import type { Todo } from '../types'
import { apiClient } from '@/shared/lib/api-client'

// Fetch all todos
export const getTodos = (): Promise<Todo[]> => {
  return apiClient.get('/todos')
}

// Fetch a single todo
export const getTodo = (id: string): Promise<Todo> => {
  return apiClient.get(`/todos/${id}`)
}

// Create a new todo
export const createTodo = (title: string, description?: string): Promise<Todo> => {
  return apiClient.post('/todos', { title, description })
}

// Update a todo
export const updateTodo = (id: string, updates: Partial<Todo>): Promise<Todo> => {
  return apiClient.put(`/todos/${id}`, updates)
}

// Delete a todo
export const deleteTodo = (id: string): Promise<void> => {
  return apiClient.delete(`/todos/${id}`)
}

// Mark todo as complete
export const completeTodo = (id: string): Promise<Todo> => {
  return apiClient.patch(`/todos/${id}`, { completed: true })
}

// Mark todo as incomplete
export const uncompleteTodo = (id: string): Promise<Todo> => {
  return apiClient.patch(`/todos/${id}`, { completed: false })
}
