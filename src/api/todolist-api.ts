import axios from 'axios'
import { RequestStatusType } from '../app/app-reducer'

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'api-key': '17966628-b354-4868-a658-bbe1d663b656',
  },
})

// api
export const todolistAPI = {
  getTodolist() {
    return instance.get<TodolistType[]>('todo-lists')
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<CommonResponseType<{}>>(`todo-lists/${todolistId}`,
      {title: title})
  },
  createTodolist(title: string) {
    return instance.post<CommonResponseType<{ item: TodoType }>>(`todo-lists`, {title: title})
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<CommonResponseType<{}>>(`todo-lists/${todolistId}`)
  },
  getTasks(todolistId: string) {
    return instance.get<ResponseTasksType>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string) {
    return instance.post<CommonResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`,
      {title: title})
  },
  updateTask(todolistId: string, taskId: string, model: ModelUpdateTaskType) {
    return instance.put<CommonResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`,
      model)
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<CommonResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
}

export const authAPI = {
  login(loginData: LoginParamsType) {
    return instance.post<CommonResponseType<{ userId: number }>>('auth/login', loginData)
  },
  logout() {
    return instance.delete<CommonResponseType<{}>>('auth/login')
  },
  me() {
    return instance.get<CommonResponseType<{ id: number, email: string, login: string }>>('auth/me')
  },
}


// types
export type CommonResponseType<T> = {
  resultCode: number
  messages: Array<string>
  data: T,
  fieldsErrors: string[]
}
type ResponseTasksType = {
  items: TaskType[]
  totalCount: number
  error: string
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

// enum for server response resultcode
export enum ResultCodeResponse {
  Succeed,
  Failed,
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
  entityTaskStatus: RequestStatusType
}
export type DomainModelUpdateTaskType = {
  title: string
  startDate: string
  priority: TaskPriorities
  description: string
  deadline: string
  status: TaskStatuses
}
export type ModelUpdateTaskType = {
  title?: string
  startDate?: string
  priority?: TaskPriorities
  description?: string
  deadline?: string
  status?: TaskStatuses
}
export type TodolistType = TodoType & {
  filter: FilterType
  entityStatus: RequestStatusType
}
export type FilterType = 'all' | 'active' | 'completed'
export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: boolean
}
