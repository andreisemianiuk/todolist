import { Dispatch } from 'redux'
import { authAPI, LoginParamsType, ResultCodeResponse } from '../../api/todolist-api'
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils'
import { setAppErrorAC, setAppStatusAC, setIsInitializedAppAC } from '../../app/app-reducer'

const initialState = {
  isLoggedIn: false,
}

type InitialStateType = typeof initialState

export const loginReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case 'LOGIN/SET_IS_LOGGED_IN':
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      }
    default:
      return state
  }
}

export const setIsLoggedInAC = (isLoggedIn: boolean) => ({type: 'LOGIN/SET_IS_LOGGED_IN', isLoggedIn} as const)

// thunks
export const loginUserTC = (userLoginData: LoginParamsType) => (dispatch: Dispatch<ActionTypes>) => {
  dispatch(setAppStatusAC('loading'))
  dispatch(setIsInitializedAppAC(false))
  authAPI.login(userLoginData).then(res => {
    if (res.data.resultCode === ResultCodeResponse.Succeed) {
      dispatch(setIsLoggedInAC(true))
      dispatch(setAppStatusAC('succeeded'))
      dispatch(setIsInitializedAppAC(true))
    } else {
      dispatch(setIsInitializedAppAC(true))
      handleServerAppError(res.data, dispatch)
    }
  }).catch(e => {
    dispatch(setIsInitializedAppAC(true))
    handleServerNetworkError(e, dispatch)
  })
}
export const logoutUserTC = () => (dispatch: Dispatch<ActionTypes>) => {
  dispatch(setAppStatusAC('loading'))
  authAPI.logout().then(res => {
    if (res.data.resultCode === ResultCodeResponse.Succeed) {
      dispatch(setIsLoggedInAC(false))
      dispatch(setAppStatusAC('succeeded'))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  }).catch(e => handleServerNetworkError(e, dispatch))
}

// types
type ActionTypes = ReturnType<typeof setIsLoggedInAC
  | typeof setAppErrorAC
  | typeof setAppStatusAC
  | typeof setIsInitializedAppAC>