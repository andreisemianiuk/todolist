import { TasksListType, TodolistType } from '../App'
import { v1 } from 'uuid'
import { AddTodolistActionType, RemoveTodolistActionType } from './todolist-reducer'

export type RemoveTaskActionType = {
  type: 'REMOVE_TASK'
  todolistId: string
  taskId: string
}
export type AddTaskActionType = {
  type: 'ADD_TASK'
  todolistId: string
  title: string
}
export type ChangeTaskStatusActionType = {
  type: 'CHANGE_TASK_STATUS'
  todolistId: string
  taskId: string
  isDone: boolean
}
export type ChangeTaskTitleActionType = {
  type: 'CHANGE_TASK_TITLE'
  todolistId: string
  taskId: string
  title: string
}
export type ActionsType =
  RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType

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
        [action.todolistId]:
          [{
            id: v1(),
            title: action.title,
            isDone: false,
          }, ...state[action.todolistId]],
      }
    case 'CHANGE_TASK_STATUS':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
          ...t,
          isDone: action.isDone,
        } : t),
      }
    case 'CHANGE_TASK_TITLE':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
          ...t,
          title: action.title,
        } : t),
      }
    case 'ADD-TODOLIST':
      return {
        ...state,
        [action.id]: [],
      }
    case 'REMOVE-TODOLIST':
      let copy = {...state}
      delete copy[action.id]
      return copy
    default:
      return state
  }
}

// Action Creators
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return {
    type: 'REMOVE_TASK',
    taskId,
    todolistId,
  }
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
  return {
    type: 'ADD_TASK',
    todolistId,
    title,
  }
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
  return {
    type: 'CHANGE_TASK_STATUS',
    todolistId,
    taskId,
    isDone,
  }
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleActionType => {
  return {
    type: 'CHANGE_TASK_TITLE',
    todolistId,
    taskId,
    title,
  }
}
