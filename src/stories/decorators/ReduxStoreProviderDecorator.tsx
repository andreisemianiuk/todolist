import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { v1 } from 'uuid'
import { todolistReducer } from '../../features/todolist-reducer'
import { tasksReducer } from '../../features/tasks-reducer'
import { RootStateType } from '../../app/store'
import { TaskPriorities, TaskStatuses } from '../../api/todolist-api'
import thunk from 'redux-thunk'
import { appReducer } from '../../app/app-reducer'
import { loginReducer } from '../../features/Login/login-reducer'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistReducer,
  app: appReducer,
  login: loginReducer,
})

const initialGlobalState = {
  todolists: [
    {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
    {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
  ],
  tasks: {
    ['todolistId1']: [
      {
        id: v1(), title: 'HTML&CSS', status: TaskStatuses.New, entityTaskStatus: 'idle',
        todoListId: 'todolistId1', priority: TaskPriorities.Low, description: '',
        completed: false, startDate: '', deadline: '', order: 0, addedDate: '',
      },
      {
        id: v1(), title: 'JS', status: TaskStatuses.New, entityTaskStatus: 'idle',
        todoListId: 'todolistId1', priority: TaskPriorities.Low, description: '',
        completed: false, startDate: '', deadline: '', order: 0, addedDate: '',
      },
    ],
    ['todolistId2']: [
      {
        id: v1(), title: 'Milk', status: TaskStatuses.New, entityTaskStatus: 'idle',
        todoListId: 'todolistId2', priority: TaskPriorities.Low, description: '',
        completed: false, startDate: '', deadline: '', order: 0, addedDate: '',
      },
      {
        id: v1(), title: 'Book', status: TaskStatuses.New, entityTaskStatus: 'idle',
        todoListId: 'todolistId2', priority: TaskPriorities.Low, description: '',
        completed: false, startDate: '', deadline: '', order: 0, addedDate: '',
      },
    ],
  },
  app: {
    isInitialized: false,
    status: 'idle',
    error: null,
  },
  login: {
    isLoggedIn: false,
  },
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as RootStateType, applyMiddleware(thunk))

export const ReduxStoreProviderDecorator = (storyFn: any) => (
  <Provider store={storyBookStore}>
    {storyFn()}
  </Provider>)
