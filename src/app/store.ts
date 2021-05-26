import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { tasksReducer } from '../features/tasks-reducer'
import { todolistReducer } from '../features/todolist-reducer'
import { appReducer } from './app-reducer'
import { loginReducer } from '../features/Login/login-reducer'

const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: tasksReducer,
  app: appReducer,
  login: loginReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store