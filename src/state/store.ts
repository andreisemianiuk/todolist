import { combineReducers, createStore } from 'redux'
import { tasksReducer } from './tasks-reducer'
import { todolistReducer } from './todolist-reducer'

const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: tasksReducer
})

export const store = createStore(rootReducer)

export type RootStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store