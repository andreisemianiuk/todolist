import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC, FilterType, removeTodolistAC, setTodolistsAC,
  todolistReducer,
  TodolistType,
} from './todolist-reducer'
import { v1 } from 'uuid'
import { TodoType } from '../api/todolist-api'

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistType> = []

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()
  startState = [
    {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
  ]
})

test('correct todolist should be removed', () => {
  const endState = todolistReducer(startState, removeTodolistAC(todolistId1))
  
  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
  let newTodolistTitle = 'New Todolist'
  
  const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle))
  
  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe(newTodolistTitle)
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
