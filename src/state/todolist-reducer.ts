import { v1 } from 'uuid'
import { todolistAPI, TodoType } from '../api/todolist-api'
import { Dispatch } from 'redux'

export type TodolistType = TodoType & {
  filter: FilterType
}
export type FilterType = 'all' | 'active' | 'completed'
export type SetTodolistsActionType = {
  type: 'SET_TODOLISTS',
  todolists: TodoType[]
}
export type RemoveTodolistActionType = {
  type: 'REMOVE_TODOLIST'
  id: string
}
export type AddTodolistActionType = {
  type: 'ADD_TODOLIST'
  title: string
  id: string
}
export type ChangeTodolistTitleActionType = {
  type: 'CHANGE_TODOLIST_TITLE'
  id: string
  title: string
}
export type ChangeTodolistFilterActionType = {
  type: 'CHANGE_TODOLIST_FILTER'
  id: string
  filter: FilterType
}

export type ActionsType =
  RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType

const initialState: TodolistType[] = []

export const todolistReducer = (state = initialState, action: ActionsType): TodolistType[] => {
  switch (action.type) {
    case 'SET_TODOLISTS':
      return action.todolists.map(todo => ({
        ...todo,
        filter: 'all',
      }))
    case 'ADD_TODOLIST':
      return [
        {
          id: action.id,
          title: action.title,
          filter: 'all',
          order: 0,
          addedDate: '',
        },
        ...state,
      ]
    case 'REMOVE_TODOLIST':
      let copy = [...state]
      copy = copy.filter(tl => tl.id !== action.id)
      return copy
    case 'CHANGE_TODOLIST_TITLE':
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
    case 'CHANGE_TODOLIST_FILTER':
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
      return state
  }
}

// Action Creators
export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return {
    type: 'REMOVE_TODOLIST',
    id: todolistId,
  }
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
  return {
    type: 'ADD_TODOLIST',
    title,
    id: v1(),
  }
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
  return {
    type: 'CHANGE_TODOLIST_TITLE',
    title,
    id,
  }
}
export const changeTodolistFilterAC = (id: string, filter: FilterType): ChangeTodolistFilterActionType => {
  return {
    type: 'CHANGE_TODOLIST_FILTER',
    filter,
    id,
  }
}

export const setTodolistsAC = (todolists: TodoType[]): SetTodolistsActionType => {
  return {
    type: 'SET_TODOLISTS',
    todolists,
  }
}

export const fetchTodolistTC = () => (dispatch: Dispatch) => {
  todolistAPI.getTodolist().then(data => {
    dispatch(setTodolistsAC(data.data))
  })
}

export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
  todolistAPI.deleteTodolist(todolistId).then(res => {
    if (res.data.resultCode === 0) {
      dispatch(removeTodolistAC(todolistId))
    }
  })
}

export const postTodolistTC = (title: string) => (dispatch: Dispatch) => {
  todolistAPI.createTodolist(title).then(res => {
    if (res.data.resultCode === 0) {
      dispatch(addTodolistAC(title))
    }
  })
}