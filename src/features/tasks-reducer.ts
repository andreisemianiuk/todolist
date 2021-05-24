import { ModelUpdateTaskType, TaskType, todolistAPI } from '../api/todolist-api'
import { Dispatch } from 'redux'
import { RootStateType } from '../app/store'
import { addTodolistAC, removeTodolistAC, setTodolistsAC } from './todolist-reducer'
import { setAppErrorAC, setAppStatusAC } from '../app/app-reducer'

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
    case 'ADD_TODOLIST':debugger
      return {
        ...state,
        [action.todolist.id]: [],
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
export const setTasksAC = (tasks: TaskType[], todolistId: string) => ({type: 'SET_TASKS', tasks, todolistId} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD_TASK', task} as const)
export const removeTaskAC = (taskId: string, todolistId: string) =>
  ({type: 'REMOVE_TASK', taskId, todolistId} as const)
export const updateTaskAC = (todolistId: string, taskId: string, model: ModelUpdateTaskType) =>
  ({type: 'UPDATE_TASK', todolistId, taskId, model} as const)

// Thunk Creators
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  todolistAPI.getTasks(todolistId).then(res => {
    dispatch(setTasksAC(res.data.items, todolistId))
    dispatch(setAppStatusAC('succeeded'))
  })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  todolistAPI.createTask(todolistId, title).then(res => {
    if (!res.data.resultCode) {
      dispatch(addTaskAC(res.data.data.item))
      dispatch(setAppStatusAC('succeeded'))
    } else {
      if (res.data.messages.length) {
        dispatch(setAppErrorAC(res.data.messages[0]))
      } else {
        dispatch(setAppErrorAC('some error occurred'))
      }
      dispatch(setAppStatusAC('failed'))
    }
  }).catch((error) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
  })
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  todolistAPI.deleteTask(todolistId, taskId).then(() => {
    dispatch(removeTaskAC(taskId, todolistId))
    dispatch(setAppStatusAC('succeeded'))
  })
}
export const updateTaskTC = (todolistId: string, taskId: string, model: ModelUpdateTaskType) =>
  (dispatch: Dispatch<ActionsType>, getState: () => RootStateType) => {
    dispatch(setAppStatusAC('loading'))
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
        
      }).then((res) => {
        if (!res.data.resultCode) {
          dispatch(updateTaskAC(todolistId, taskId, model))
          dispatch(setAppStatusAC('succeeded'))
        } else {
          if (res.data.messages.length) {
            dispatch(setAppErrorAC(res.data.messages[0]))
            dispatch(setAppStatusAC('failed'))
          } else {
            dispatch(setAppErrorAC('some error occurred'))
          }
          dispatch(setAppStatusAC('failed'))
        }
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
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>
