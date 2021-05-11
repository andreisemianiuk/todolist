import React, { useEffect, useState } from 'react'
import { TaskPriorities, TaskStatuses, todolistAPI } from '../api/todolist-api'

export default {
  title: 'API',
}


export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistAPI.getTodolist().then(
      (res) => {
        setState(res.data)
      },
    )
  }, [])
  
  return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistAPI.createTodolist('new todo')
      .then((res) => {
        setState(res.data)
      })
    
  }, [])
  
  return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = '31e4556a-63ae-4b65-959c-108d48fc173e'
    todolistAPI.updateTodolist(todolistId, 'What to Buy')
      .then((res) => {
        setState(res.data)
      })
  }, [])
  
  return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = 'c5f87142-0b3a-4e8a-8e7c-5e2b630c8e14'
    todolistAPI.deleteTodolist(todolistId).then((res) => {
      setState(res.data)
    })
    
  }, [])
  
  return <div> {JSON.stringify(state)}</div>
}

// tasks API

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  const todolistId = '31e4556a-63ae-4b65-959c-108d48fc173e'
  useEffect(() => {
    todolistAPI.getTasks(todolistId).then(res => {
      setState(res.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  const todolistId = 'cb30a6da-9bd4-49f6-95d0-552a72974d9f'
  const title = 'new title'
  useEffect(() => {
    todolistAPI.createTask(todolistId, title).then(res => {
      setState(res.data.data.item)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {
  const [state, setState] = useState<any>(null)
  const todolistId = 'cb30a6da-9bd4-49f6-95d0-552a72974d9f'
  const taskId = 'bb618e51-247d-4754-99b2-9f6b7cc2c3db'
  let title = 'new title'
  useEffect(() => {
    todolistAPI.updateTask(todolistId, taskId, {
      title: title,
      startDate: 'task.startDate',
      priority: TaskPriorities.Low,
      description: 'task.description',
      deadline: 'task.deadline',
      status: TaskStatuses.New,
      
    }).then(res => {
      setState(res.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  const todolistId = 'cb30a6da-9bd4-49f6-95d0-552a72974d9f'
  const taskId = 'bb618e51-247d-4754-99b2-9f6b7cc2c3db'
  useEffect(() => {
    todolistAPI.deleteTask(todolistId, taskId).then(res => {
      setState(res.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}