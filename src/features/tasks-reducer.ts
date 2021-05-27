import { ModelUpdateTaskType, ResultCodeResponse, TaskType, todolistAPI } from '../api/todolist-api'
import { Dispatch } from 'redux'
import { RootStateType } from '../app/store'
import { addTodolistAC, removeTodolistAC, setTodoEntityStatusAC, setTodolistsAC } from './todolist-reducer'
import { RequestStatusType, setAppErrorAC, setAppStatusAC } from '../app/app-reducer'
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils'

const initialState: TasksListType = {}

export const tasksReducer = (state = initialState, action: ActionsType): TasksListType => {
  switch (action.type) {
    case 'SET_TASKS':
      return {
        ...state,
        [action.todolistId]: action.tasks.map(
          t => ({...t, entityTaskStatus: 'idle'})),
      }
    case 'ADD_TASK':
      return {
        ...state,
        [action.task.todoListId]:
          [{...action.task}, ...state[action.task.todoListId]],
      }
    case 'REMOVE_TASK':
      return {
        ...state,
        [action.todolistId]:
          state[action.todolistId].filter(t => t.id !== action.taskId),
      }
    case 'DELETE_ALL_TASKS':
      return {}
    case 'UPDATE_TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
          ...t,
          ...action.model,
        } : t),
      }
    case 'SET_TASK_ENTITY_STATUS':
      return {
        ...state,
        [action.todolistId]: [...state[action.todolistId].map(
          t => t.id === action.taskId ? {...t, entityTaskStatus: action.status} : t)],
      }
    case 'SET_TODOLISTS': {
      const copy = {...state}
      action.todolists.forEach((tl) => {
        copy[tl.id] = []
      })
      return copy
    }
    case 'ADD_TODOLIST':
      return {
        ...state,
        [action.todolist.id]: [],
      }
    case 'REMOVE_TODOLIST':
      const copy = {...state}
      delete copy[action.id]
      return copy
    default:
      return state
  }
}

// Action Creators
export const setTasksAC = (tasks: TaskType[], todolistId: string) => ({type: 'SET_TASKS', tasks, todolistId} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD_TASK', task} as const)
export const deleteAllTasksAC = () => ({type: 'DELETE_ALL_TASKS'} as const)
export const removeTaskAC = (taskId: string, todolistId: string) =>
  ({type: 'REMOVE_TASK', taskId, todolistId} as const)
export const updateTaskAC = (todolistId: string, taskId: string, model: ModelUpdateTaskType) =>
  ({type: 'UPDATE_TASK', todolistId, taskId, model} as const)
export const setTaskEntityStatusAC = (todolistId: string, taskId: string, status: RequestStatusType) => ({
  type: 'SET_TASK_ENTITY_STATUS', todolistId, taskId, status,
} as const)


// Thunk Creators
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  todolistAPI.getTasks(todolistId).then(res => {
    if (!res.data.error) {
      dispatch(setTasksAC(res.data.items, todolistId))
      dispatch(setAppStatusAC('succeeded'))
    } else {
      dispatch(setAppErrorAC(res.data.error))
      dispatch(setAppStatusAC('failed'))
    }
  }).catch((e) => handleServerNetworkError(e, dispatch))
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  dispatch(setTodoEntityStatusAC(todolistId, 'loading'))
  todolistAPI.createTask(todolistId, title).then(res => {
    if (res.data.resultCode === ResultCodeResponse.Succeed) {
      dispatch(addTaskAC(res.data.data.item))
      dispatch(setAppStatusAC('succeeded'))
      dispatch(setTodoEntityStatusAC(todolistId, 'succeeded'))
    } else {
      handleServerAppError(res.data, dispatch)
      dispatch(setTodoEntityStatusAC(todolistId, 'failed'))
    }
  }).catch((e) => {
    handleServerNetworkError(e, dispatch)
    dispatch(setTodoEntityStatusAC(todolistId, 'failed'))
  })
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  dispatch(setTaskEntityStatusAC(todolistId, taskId, 'loading'))
  todolistAPI.deleteTask(todolistId, taskId).then((res) => {
      if (res.data.resultCode === ResultCodeResponse.Succeed) {
        dispatch(removeTaskAC(taskId, todolistId))
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setTaskEntityStatusAC(todolistId, taskId, 'succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((e) => {
      handleServerNetworkError(e, dispatch)
      dispatch(setTaskEntityStatusAC(todolistId, taskId, 'failed'))
    })
}
export const updateTaskTC = (todolistId: string, taskId: string, model: ModelUpdateTaskType) =>
  (dispatch: Dispatch<ActionsType>, getState: () => RootStateType) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setTaskEntityStatusAC(todolistId, taskId, 'loading'))
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
        if (res.data.resultCode === ResultCodeResponse.Succeed) {
          dispatch(updateTaskAC(todolistId, taskId, model))
          dispatch(setAppStatusAC('succeeded'))
          dispatch(setTaskEntityStatusAC(todolistId, taskId, 'succeeded'))
        } else {
          handleServerAppError(res.data, dispatch)
          dispatch(setTaskEntityStatusAC(todolistId, taskId, 'failed'))
        }
      }).catch((e) => {
        handleServerNetworkError(e, dispatch)
        dispatch(setTaskEntityStatusAC(todolistId, taskId, 'failed'))
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
  | ReturnType<typeof deleteAllTasksAC>
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setTaskEntityStatusAC>
  | ReturnType<typeof setTodoEntityStatusAC>
