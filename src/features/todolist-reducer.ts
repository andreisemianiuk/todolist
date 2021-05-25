import { FilterType, ResultCodeResponse, todolistAPI, TodolistType, TodoType } from '../api/todolist-api'
import { Dispatch } from 'redux'
import { RequestStatusType, setAppErrorAC, setAppStatusAC } from '../app/app-reducer'
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils'

const initialState: TodolistType[] = []

export const todolistReducer = (state = initialState, action: ActionsType): TodolistType[] => {
  switch (action.type) {
    case 'SET_TODOLISTS':
      return action.todolists.map(todo => ({...todo, filter: 'all', entityStatus: 'idle'}))
    case 'ADD_TODOLIST':
      return [
        {...action.todolist, filter: 'all', entityStatus: 'idle'},
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
    case 'SET_ENTITY_STATUS':
      return [...state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)]
    default:
      return state
  }
}

// Action Creators
export const addTodolistAC = (todolist: TodoType) => ({type: 'ADD_TODOLIST', todolist} as const)
export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE_TODOLIST', id: todolistId} as const)
export const changeTodolistTitleAC = (id: string, title: string) =>
  ({type: 'CHANGE_TODOLIST_TITLE', title, id} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterType) =>
  ({type: 'CHANGE_TODOLIST_FILTER', filter, id} as const)
export const setTodolistsAC = (todolists: TodoType[]) => ({type: 'SET_TODOLISTS', todolists} as const)
export const setEntityStatusAC = (id: string, status: RequestStatusType) => ({
  type: 'SET_ENTITY_STATUS',
  id,
  status,
} as const)

// Thunk Creators
export const fetchTodolistTC = () => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  todolistAPI.getTodolist().then(data => {
    dispatch(setTodolistsAC(data.data))
    dispatch(setAppStatusAC('succeeded'))
  }).catch((e) => handleServerNetworkError(e, dispatch))
}
export const postTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  todolistAPI.createTodolist(title).then(res => {
    if (res.data.resultCode === ResultCodeResponse.Succeed) {
      dispatch(addTodolistAC(res.data.data.item))
      dispatch(setAppStatusAC('succeeded'))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  }).catch((e) => handleServerNetworkError(e, dispatch))
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  dispatch(setEntityStatusAC(todolistId, 'loading'))
  todolistAPI.deleteTodolist(todolistId).then(res => {
    if (res.data.resultCode === ResultCodeResponse.Succeed) {
      dispatch(removeTodolistAC(todolistId))
      dispatch(setAppStatusAC('succeeded'))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  }).catch((e) => handleServerNetworkError(e, dispatch))
}
export const updateTodolistTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  todolistAPI.updateTodolist(todolistId, title).then(res => {
    if (res.data.resultCode === ResultCodeResponse.Succeed) {
      dispatch(changeTodolistTitleAC(todolistId, title))
      dispatch(setAppStatusAC('succeeded'))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  }).catch((e) => handleServerNetworkError(e, dispatch))
}

// types
type ActionsType =
  | ReturnType<typeof setTodolistsAC>
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setEntityStatusAC>
