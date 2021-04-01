import { FilterType, TodolistType } from '../App'
import { v1 } from 'uuid'

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST'
  id: string
}
export type AddTodolistActionType = {
  type: 'ADD-TODOLIST'
  title: string
  id: string
}
export type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE'
  id: string
  title: string
}
export type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER'
  id: string
  filter: string
}

export type ActionsType =
  RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType

export const todolistReducer = (state: TodolistType[], action: ActionsType) => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      let copy = [...state]
      copy = copy.filter(tl => tl.id !== action.id)
      return copy
    case 'ADD-TODOLIST':
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          filter: 'all',
        },
      ]
    case 'CHANGE-TODOLIST-TITLE':
      return [
        ...state.map(
          tl => tl.id === action.id
            ?
            {
              ...tl,
              title: action.title,
            }
            : tl,
        ),
      ]
    case 'CHANGE-TODOLIST-FILTER':
      return [
        ...state.map(
          tl => tl.id === action.id
            ?
            {
              ...tl,
              filter: action.filter,
            }
            : tl,
        ),
      ]
    default:
      throw new Error('I don\'t know this type! ')
  }
}

// Action Creators
export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return {
    type: 'REMOVE-TODOLIST',
    id: todolistId,
  }
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
  return {
    type: 'ADD-TODOLIST',
    title,
    id: v1(),
  }
}
export const changeTodolistTitleAC = (id: string,title: string): ChangeTodolistTitleActionType => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    title,
    id
  }
}
export const changeTodolistFilterAC = (id: string,filter: FilterType): ChangeTodolistFilterActionType => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    filter,
    id
  }
}
