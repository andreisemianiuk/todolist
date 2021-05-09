import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  TasksListType,
  tasksReducer,
} from './tasks-reducer'
import { addTodolistAC, removeTodolistAC, todolistReducer, TodolistType } from './todolist-reducer'
import { v1 } from 'uuid'
import { TaskPriorities, TaskStatuses } from '../api/todolist-api'

let todolistId1: string
let todolistId2: string
let startState: TasksListType = {}

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()
  startState = {
    [todolistId1]: [
      {
        id: '1', title: 'CSS', status: TaskStatuses.New,
        todoListId: todolistId1, priority: TaskPriorities.Low,
        startDate: '', order: 0, description: '', deadline: '',
        addedDate: '', completed: false,
      },
      {
        id: '2', title: 'JS', status: TaskStatuses.Completed,
        todoListId: todolistId1, priority: TaskPriorities.Low,
        startDate: '', order: 0, description: '', deadline: '',
        addedDate: '', completed: false,
      },
      {
        id: '3', title: 'React', status: TaskStatuses.New,
        todoListId: todolistId1, priority: TaskPriorities.Low,
        startDate: '', order: 0, description: '', deadline: '',
        addedDate: '', completed: false,
      },
    ],
    [todolistId2]: [
      {
        id: '1', title: 'bread', status: TaskStatuses.New,
        todoListId: todolistId2, priority: TaskPriorities.Low,
        startDate: '', order: 0, description: '', deadline: '',
        addedDate: '', completed: false,
      },
      {
        id: '2', title: 'milk', status: TaskStatuses.Completed,
        todoListId: todolistId2, priority: TaskPriorities.Low,
        startDate: '', order: 0, description: '', deadline: '',
        addedDate: '', completed: false,
      },
      {
        id: '3', title: 'tea', status: TaskStatuses.New,
        todoListId: todolistId2, priority: TaskPriorities.Low,
        startDate: '', order: 0, description: '', deadline: '',
        addedDate: '', completed: false,
      },
    ],
  }
})

test('correct task should be deleted from correct array', () => {
  
  const action = removeTaskAC('2', todolistId2)
  
  const endState = tasksReducer(startState, action)
  
  expect(endState).toStrictEqual({
    [todolistId1]: [
      {
        id: '1', title: 'CSS', status: TaskStatuses.New,
        todoListId: todolistId1, priority: TaskPriorities.Low,
        startDate: '', order: 0, description: '', deadline: '',
        addedDate: '', completed: false,
      },
      {
        id: '2', title: 'JS', status: TaskStatuses.Completed,
        todoListId: todolistId1, priority: TaskPriorities.Low,
        startDate: '', order: 0, description: '', deadline: '',
        addedDate: '', completed: false,
      },
      {
        id: '3', title: 'React', status: TaskStatuses.New,
        todoListId: todolistId1, priority: TaskPriorities.Low,
        startDate: '', order: 0, description: '', deadline: '',
        addedDate: '', completed: false,
      },
    ],
    [todolistId2]: [
      {
        id: '1', title: 'bread', status: TaskStatuses.New,
        todoListId: todolistId2, priority: TaskPriorities.Low,
        startDate: '', order: 0, description: '', deadline: '',
        addedDate: '', completed: false,
      },
      {
        id: '3', title: 'tea', status: TaskStatuses.New,
        todoListId: todolistId2, priority: TaskPriorities.Low,
        startDate: '', order: 0, description: '', deadline: '',
        addedDate: '', completed: false,
      },
    ],
  })
  
})

test('correct task should be added to correct array', () => {
  
  const action = addTaskAC('juice', todolistId2)
  
  const endState = tasksReducer(startState, action)
  
  expect(endState[todolistId1].length).toBe(3)
  expect(endState[todolistId2].length).toBe(4)
  expect(endState[todolistId2][0].id).toBeDefined()
  expect(endState[todolistId2][0].title).toBe('juice')
  expect(endState[todolistId2][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
  const action = changeTaskStatusAC('2', TaskStatuses.New, todolistId2)
  
  const endState = tasksReducer(startState, action)
  
  expect(endState[todolistId1][1].status).toBe(TaskStatuses.Completed)
  expect(endState[todolistId2][1].status).toBe(TaskStatuses.New)
})

test('title of specified task should be changed', () => {
  const action = changeTaskTitleAC(todolistId2, '1', 'fish')
  
  const endState = tasksReducer(startState, action)
  
  expect(endState[todolistId1][0].title).toBe('CSS')
  expect(endState[todolistId2][0].title).toBe('fish')
})

test('new array should be added when new todolist is added', () => {
  
  const action = addTodolistAC('new todolist')
  
  const endState = tasksReducer(startState, action)
  
  const keys = Object.keys(endState)
  const newKey = keys.find(k => k !== todolistId1 && k !== todolistId2)
  if (!newKey) {
    throw Error('new key should be added')
  }
  
  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('ids should be equals', () => {
  const startTasksState: TasksListType = {}
  const startTodolistsState: Array<TodolistType> = []
  
  const action = addTodolistAC('new todolist')
  
  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistReducer(startTodolistsState, action)
  
  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id
  
  expect(idFromTasks).toBe(action.id)
  expect(idFromTodolists).toBe(action.id)
})

test('property with todolistId should be deleted', () => {
  
  const action = removeTodolistAC(todolistId2)
  
  const endState = tasksReducer(startState, action)
  
  const keys = Object.keys(endState)
  
  expect(keys.length).toBe(1)
  expect(endState[todolistId2]).not.toBeDefined()
})

