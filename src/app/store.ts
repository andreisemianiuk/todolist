import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { tasksReducer } from '../features/tasks-reducer'
import { todolistReducer } from '../features/todolist-reducer'

const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: tasksReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store