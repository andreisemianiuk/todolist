import { Dispatch } from 'redux'
import { authAPI, ResultCodeResponse } from '../api/todolist-api'
import { setIsLoggedInAC } from '../features/Login/login-reducer'
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  isInitialized: false as boolean,
  status: 'idle' as RequestStatusType,
  error: null as string | null,
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return {...state, status: action.status}
    case 'APP/SET-APP-IS-INITIALIZED':
      return {...state, isInitialized: action.isInitialized}
    case 'APP/SET-ERROR':
      return {...state, error: action.error}
    default:
      return state
  }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setIsInitializedAppAC = (isInitialized: boolean) =>
  ({type: 'APP/SET-APP-IS-INITIALIZED', isInitialized} as const)

export const setAppInitializedTC = () => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  authAPI.me().then(res => {
    if (res.data.resultCode === ResultCodeResponse.Succeed) {
      dispatch(setIsLoggedInAC(true))
      dispatch(setAppStatusAC('succeeded'))
    } else {
      handleServerAppError(res.data, dispatch)
    }
    dispatch(setIsInitializedAppAC(true))
  }).catch(e => handleServerNetworkError(e, dispatch))
}

type ActionsType = ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof setIsInitializedAppAC>