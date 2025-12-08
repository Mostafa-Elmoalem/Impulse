export interface Todo {
  id: string
  title: string
  description?: string
  completed: boolean
  createdAt: string
  updatedAt: string
  userId?: string
}

export interface CreateTodoInput {
  title: string
  description?: string
}

export interface UpdateTodoInput extends Partial<CreateTodoInput> {
  completed?: boolean
}

export type TodosState = {
  todos: Todo[]
  loading: boolean
  error: string | null
}
