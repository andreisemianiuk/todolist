import { addTaskAC, removeTaskAC, TasksListType, tasksReducer, updateTaskAC } from './tasks-reducer'
import { addTodolistAC, removeTodolistAC, setTodolistsAC, todolistReducer, TodolistType } from './todolist-reducer'
import { v1 } from 'uuid'
import { TaskPriorities, TaskStatuses, TaskType } from '../api/todolist-api'

let todolistId1: string
let todolistId2: string
let startState: TasksListType = {}
let task: TaskType

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
  task = {
    id: '4', title: 'juice', status: TaskStatuses.New,
    todoListId: todolistId2, priority: TaskPriorities.Low,
    startDate: '', order: 0, description: '', deadline: '',
    addedDate: '', completed: false,
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
  
  const action = addTaskAC(task)
  
  const endState = tasksReducer(startState, action)
  
  expect(endState[todolistId1].length).toBe(3)
  expect(endState[todolistId2].length).toBe(4)
  expect(endState[todolistId2][0].id).toBeDefined()
  expect(endState[todolistId2][0].title).toBe('juice')
  expect(endState[todolistId2][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
  const action = updateTaskAC(todolistId2, '2', {status: TaskStatuses.New})
  
  const endState = tasksReducer(startState, action)
  
  expect(endState[todolistId1][1].status).toBe(TaskStatuses.Completed)
  expect(endState[todolistId2][1].status).toBe(TaskStatuses.New)
})

test('title of specified task should be changed', () => {
  const action = updateTaskAC(todolistId2, '1', {title: 'fish'})
  
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

test('empty arrays for tasks should be added to todo-lists', () => {
  
  const action = setTodolistsAC([
    {id: '1', title: 'What to learn', addedDate: '', order: 0},
    {id: '2', title: 'What to buy', addedDate: '', order: 0},
  ])
  
  const endState = tasksReducer({}, action)
  
  expect(Object.keys(endState).length).toBe(2)
  expect(endState['1']).toEqual([])
  expect(endState['2']).toEqual([])
})

