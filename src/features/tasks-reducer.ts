import { ModelUpdateTaskType, TaskType, todolistAPI } from '../api/todolist-api'
import { Dispatch } from 'redux'
import { RootStateType } from '../app/store'
import { addTodolistAC, removeTodolistAC, setTodolistsAC } from './todolist-reducer'

const initialState: TasksListType = {}

export const tasksReducer = (state = initialState, action: ActionsType): TasksListType => {
  switch (action.type) {
    case 'REMOVE_TASK':
      return {
        ...state,
        [action.todolistId]:
          state[action.todolistId].filter(t => t.id !== action.taskId),
      }
    case 'ADD_TASK':
      return {
        ...state,
        [action.task.todoListId]:
          [{...action.task}, ...state[action.task.todoListId]],
      }
    case 'UPDATE_TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
          ...t,
          ...action.model,
        } : t),
      }
    case 'ADD_TODOLIST':
      return {
        ...state,
        [action.id]: [],
      }
    case 'REMOVE_TODOLIST':
      const copy = {...state}
      delete copy[action.id]
      return copy
    case 'SET_TODOLISTS': {
      const copy = {...state}
      action.todolists.forEach((tl) => {
        copy[tl.id] = []
      })
      return copy
    }
    case 'SET_TASKS':
      return {
        ...state,
        [action.todolistId]: action.tasks,
      }
    default:
      return state
  }
}

// Action Creators
export const removeTaskAC = (taskId: string, todolistId: string) =>
  ({type: 'REMOVE_TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD_TASK', task} as const)
export const updateTaskAC = (todolistId: string, taskId: string, model: ModelUpdateTaskType) =>
  ({type: 'UPDATE_TASK', todolistId, taskId, model} as const)
export const setTasksAC = (tasks: TaskType[], todolistId: string) => ({type: 'SET_TASKS', tasks, todolistId} as const)

// Thunk Creators
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
  todolistAPI.getTasks(todolistId).then(res => {
    dispatch(setTasksAC(res.data.items, todolistId))
  })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
  todolistAPI.createTask(todolistId, title).then(res => {
    dispatch(addTaskAC(res.data.data.item))
  })
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionsType>) => {
  todolistAPI.deleteTask(todolistId, taskId).then(() => {
    dispatch(removeTaskAC(taskId, todolistId))
  })
}
export const updateTaskTC = (todolistId: string, taskId: string, model: ModelUpdateTaskType) =>
  (dispatch: Dispatch<ActionsType>, getState: () => RootStateType) => {
    const allTasksFromState = getState().tasks
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find(t => t.id === taskId)
    
    if (task) {
      todolistAPI.updateTask(todolistId, taskId, {
        title: task.title,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline,
        status: task.status,
        ...model,
        
      }).then(() => {
        dispatch(updateTaskAC(todolistId, taskId, model))
      })
    }
  }

// types
export type TasksListType = {
  [key: string]: TaskType[]
}
type ActionsType =
  | ReturnType<typeof setTodolistsAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof removeTaskAC>
