import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { tasksReducer } from '../features/tasks-reducer'
import { todolistReducer } from '../features/todolist-reducer'
import { appReducer } from './app-reducer'
import { authReducer } from '../features/Login/auth-reducer'

const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store