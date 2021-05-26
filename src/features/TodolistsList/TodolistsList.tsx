import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStateType } from '../../app/store'
import { TodolistType } from '../../api/todolist-api'
import { deleteTodolistTC, fetchTodolistTC, postTodolistTC, updateTodolistTC } from '../todolist-reducer'
import { Grid, Paper } from '@material-ui/core'
import { AddItemForm } from '../../components/AddItemForm/AddItemForm'
import { TodoList } from './TodoList/TodoList'
import { Redirect } from 'react-router-dom'

type PropsType = {
  demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
  const todolists = useSelector<RootStateType, TodolistType[]>(state => state.todolists)
  const isLoggedIn = useSelector<RootStateType, boolean>(state => state.login.isLoggedIn)
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (demo || !isLoggedIn) return
    dispatch(fetchTodolistTC())
  }, [dispatch, isLoggedIn])
  
  // functions for todolist
  const addTodolist = useCallback((title: string) => {
    dispatch(postTodolistTC(title))
  }, [dispatch])
  const deleteTodolist = useCallback((todolistId: string) => {
    dispatch(deleteTodolistTC(todolistId))
  }, [dispatch])
  const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
    dispatch(updateTodolistTC(todolistId, newTitle))
  }, [dispatch])
  
  if (!isLoggedIn) return <Redirect to={'login'}/>
  
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
                  demo={demo}
                  key={tl.id}
                  id={tl.id}
                  title={tl.title}
                  filter={tl.filter}
                  entityStatus={tl.entityStatus}
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