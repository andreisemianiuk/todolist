import React, { useEffect, useState } from 'react'
import { todolistAPI } from '../api/todolist-api'

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
    todolistAPI.createTodolist('new todolist')
      .then((res) => {
        debugger
        setState(res.data)
      })
    
  }, [])
  
  return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = '51472df4-62e4-4ba6-8d81-8611688f397e'
    todolistAPI.deleteTodolist(todolistId).then((res) => {
      setState(res.data)
    })
    
  }, [])
  
  return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = 'e88a72a1-438d-43d7-a2cf-eb96a343207f'
    todolistAPI.updateTodolist(todolistId, 'some new title')
      .then((res) => {
        
        debugger
        setState(res.data)
      })
    
  }, [])
  
  return <div> {JSON.stringify(state)}</div>
}
