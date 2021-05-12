import { v1 } from 'uuid'
import { FilterType, todolistAPI, TodolistType, TodoType } from '../api/todolist-api'
import { Dispatch } from 'redux'

type ActionsType =
  | ReturnType<typeof setTodolistsAC>
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>

const initialState: TodolistType[] = []

export const todolistReducer = (state = initialState, action: ActionsType): TodolistType[] => {
  switch (action.type) {
    case 'SET_TODOLISTS':
      return action.todolists.map(todo => ({...todo, filter: 'all'}))
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
      return [...state.filter(tl => tl.id !== action.id)]
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
export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE_TODOLIST', id: todolistId} as const)
export const addTodolistAC = (title: string) => ({type: 'ADD_TODOLIST', title, id: v1()} as const)
export const changeTodolistTitleAC = (id: string, title: string) =>
  ({type: 'CHANGE_TODOLIST_TITLE', title, id} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterType) =>
  ({type: 'CHANGE_TODOLIST_FILTER', filter, id} as const)
export const setTodolistsAC = (todolists: TodoType[]) => ({type: 'SET_TODOLISTS', todolists} as const)

// Thunk Creators
export const fetchTodolistTC = () => (dispatch: Dispatch<ActionsType>) => {
  todolistAPI.getTodolist().then(data => {
    dispatch(setTodolistsAC(data.data))
  })
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
  todolistAPI.deleteTodolist(todolistId).then(res => {
    if (res.data.resultCode === 0) {
      dispatch(removeTodolistAC(todolistId))
    }
  })
}
export const postTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
  todolistAPI.createTodolist(title).then(res => {
    if (res.data.resultCode === 0) {
      dispatch(addTodolistAC(title))
    }
  })
}
export const updateTodolistTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
  todolistAPI.updateTodolist(todolistId, title).then(res => {
    if (res.data.resultCode === 0) {
      dispatch(changeTodolistTitleAC(todolistId, title))
    }
  })
}
