import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStateType } from '../../app/store'
import { TodolistType } from '../../api/todolist-api'
import { fetchTodolistTC, postTodolistTC, removeTodolistAC, updateTodolistTC } from '../todolist-reducer'
import { Grid, Paper } from '@material-ui/core'
import { AddItemForm } from '../../components/AddItemForm/AddItemForm'
import { TodoList } from './TodoList/TodoList'

export const TodolistsList: React.FC = () => {
  const todolists = useSelector<RootStateType, TodolistType[]>(state => state.todolists)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchTodolistTC())
  }, [dispatch])
  
  // functions for todolist
  const addTodolist = useCallback((title: string) => {
    dispatch(postTodolistTC(title))
  }, [dispatch])
  const deleteTodolist = useCallback((todolistId: string) => {
    const action = removeTodolistAC(todolistId)
    dispatch(action)
  }, [dispatch])
  const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
    dispatch(updateTodolistTC(todolistId, newTitle))
  }, [dispatch])
  
  return (
    <>
      <Grid container style={{padding: '20px'}}>
        <AddItemForm title={'Create new todolist'} addItem={addTodolist}/>
      </Grid>
      <Grid container spacing={3}>
        {todolists.map(tl => {
            return <Grid item>
              <Paper style={{
                padding: '10px',
                minWidth: '300px',
              }}>
                <TodoList
                  key={tl.id}
                  id={tl.id}
                  title={tl.title}
                  filter={tl.filter}
                  deleteTodolist={deleteTodolist}
                  changeTodolistTitle={changeTodolistTitle}
                />
              </Paper>
            </Grid>
          },
        )}
      </Grid>
    </>
  )
}