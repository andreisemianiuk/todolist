import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': '7b4001e9-c455-4bb5-8814-d09f26458311',
  },
})

type CommonResponseType<T> = {
  resultCode: number
  messages: Array<string>
  data: T,
  fieldsErrors: string[]
}
export type TodoType = {
  id: string
  addedDate: string
  order: number
  title: string
}
export enum TaskStatuses {
  New,
  InProgress,
  Completed,
  Draft
}
export enum TaskPriorities {
  Low,
  Middle,
  High,
  Urgently,
  Later
}
export type TaskType = {
  id: string
  title: string
  status: TaskStatuses
  priority: TaskPriorities
  description: string
  completed: boolean
  startDate: string
  deadline: string
  todoListId: string
  order: number
  addedDate: string
}

export const todolistAPI = {
  getTodolist() {
    return instance.get<TodoType[]>('todo-lists')
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<CommonResponseType<{}>>(`todo-lists/${todolistId}`,
      {title: title})
  },
  createTodolist(title: string) {
    return instance.post<CommonResponseType<{
      item: TodoType
    }>>(`todo-lists`,
      {title: title})
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<CommonResponseType<{}>>(`todo-lists/${todolistId}`)
  },
  getTasks(todolistId: string) {
    return instance.get<TaskType[]>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string) {
    return instance.post<CommonResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`,
      {title: title})
  },
  updateTask(todolistId: string, taskId: string, title: string) {
    return instance.put<CommonResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`,
      {title: title})
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<CommonResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
}
