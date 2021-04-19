import React, { useCallback } from 'react'
import './App.css'
import { AddItemForm } from './AddItemForm/AddItemForm'
import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
  createStyles,
  Container, Grid, Paper,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import {
  addTodolistAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from './state/todolist-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { RootStateType } from './state/store'
import { TodoList } from './TodoList/TodoList'

export type TaskType = {
  title: string
  id: string
  isDone: boolean
}
export type TasksListType = {
  [key: string]: TaskType[]
}
export type FilterType = 'all' | 'active' | 'completed'
export type TodolistType = {
  id: string
  title: string
  filter: FilterType
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
)

export default function AppWithRedux() {
  const classes = useStyles()
  
  const todolists = useSelector<RootStateType, TodolistType[]>(state => state.todolists)
  const dispatch = useDispatch()
  
  // functions for todolist
  const addTodolist = useCallback((title: string) => {
    const action = addTodolistAC(title)
    dispatch(action)
  }, [dispatch])
  const deleteTodolist = useCallback((todolistId: string) => {
    const action = removeTodolistAC(todolistId)
    dispatch(action)
  },[dispatch])
  const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
    const action = changeTodolistTitleAC(todolistId, newTitle)
    dispatch(action)
  },[dispatch])
  
  return (
    <div className='App'>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
            <MenuIcon/>
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            News
          </Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
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
      </Container>
    </div>
  )
}