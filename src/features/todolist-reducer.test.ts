import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC, setTodoEntityStatusAC,
  setTodolistsAC,
  todolistReducer,
} from './todolist-reducer'
import { v1 } from 'uuid'
import { FilterType, TodolistType } from '../api/todolist-api'

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistType> = []

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()
  startState = [
    {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
  ]
})

test('correct todolist should be removed', () => {
  const endState = todolistReducer(startState, removeTodolistAC(todolistId1))
  
  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
  let newTodolistTitle = 'New Todolist'
  
  const endState = todolistReducer(startState, addTodolistAC(
    {
      title: newTodolistTitle,
      id: todolistId1,
      addedDate: '',
      order: 0,
    }))
  
  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {
  let newTodolistTitle = 'New Todolist'
  
  const endState = todolistReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle))
  
  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
  let newFilter: FilterType = 'completed'
  
  const endState = todolistReducer(startState, changeTodolistFilterAC(todolistId2, newFilter))
  
  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(newFilter)
})

test('todolists should be set from the server', () => {
  const endState = todolistReducer([], setTodolistsAC(startState))
  
  expect(endState.length).toBe(2)
  expect(endState[0].id).toBe(todolistId1)
  expect(endState[1].id).toBe(todolistId2)
})

test('correct entity status should be added', () => {
  const endState = todolistReducer(startState, setTodoEntityStatusAC(todolistId1, 'loading'))
  
  expect(endState[0].entityStatus).toBe('loading')
  expect(endState[1].entityStatus).toBe('idle')
})
