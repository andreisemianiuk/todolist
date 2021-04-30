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

type TodoType = {
  id: string
  addedDate: string
  order: number
  title: string
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
    return axios.delete<CommonResponseType<{}>>(`todo-lists/${todolistId}`)
  },
  
}
