import React, { useState } from 'react'
import './App.css'
import TodoList from './TodoList/TodoList'
import { v1 } from 'uuid'
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

export type TaskType = {
  title: string
  id: string
  isDone: boolean
}
export type TasksListType = {
  [key: string]: TaskType[]
}
export type FilterType = 'all' | 'active' | 'completed'
export type TodolistsType = {
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

export default function App() {
  const classes = useStyles()
  let [todolists, setTodolists] = useState<TodolistsType[]>([])
  let [tasks, setTasks] = useState<TasksListType>({})
  
  const addTask = (title: string, todolistId: string) => {
    const task = {
      id: v1(),
      title: title,
      isDone: false,
    }
    tasks[todolistId] = [task, ...tasks[todolistId]]
    setTasks({...tasks})
  }
  const addTodolist = (title: string) => {
    const TodoListId = v1()
    const todolist: TodolistsType = {
      id: TodoListId,
      title: title,
      filter: 'all',
    }
    setTodolists([todolist, ...todolists])
    tasks[TodoListId] = []
    setTasks({...tasks})
  }
  const removeTask = (todoId: string, todolistId: string) => {
    tasks[todolistId] = tasks[todolistId].filter(v => v.id !== todoId)
    setTasks({...tasks})
  }
  const changeChecked = (todoId: string, isDone: boolean, todolistId: string) => {
    let task = tasks[todolistId].find(v => v.id === todoId)
    if (task) {
      task.isDone = isDone
      setTasks({...tasks})
    }
  }
  const changeFilter = (value: FilterType, todolistId: string) => {
    let todolist = todolists.find(v => v.id === todolistId)
    if (todolist) {
      todolist.filter = value
    }
    setTodolists([...todolists])
  }
  const deleteTodolist = (todolistId: string) => {
    todolists = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(todolists)
    delete tasks[todolistId]
    setTasks({...tasks})
  }
  const changeTodolistTitle = (todolistId: string, newTitle: string) => {
    const targetTodolist = todolists.find(t => t.id === todolistId)
    if (targetTodolist) {
      targetTodolist.title = newTitle
    }
    setTodolists([...todolists])
  }
  const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
    const targetTask = tasks[todolistId].find(t => t.id === taskId)
    if (targetTask) {
      targetTask.title = newTitle
    }
    setTasks({...tasks})
  }
  
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
              let allTodolistTasks = tasks[tl.id]
              let tasksForTodoList = allTodolistTasks
              
              switch (tl.filter) {
                case 'active':
                  tasksForTodoList = allTodolistTasks.filter(t => !t.isDone)
                  break
                case 'completed':
                  tasksForTodoList = allTodolistTasks.filter(t => t.isDone)
              }
              return <Grid item>
                <Paper style={{
                  padding: '10px',
                  minWidth: '300px',
                }}>
                  <TodoList
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodoList}
                    filter={tl.filter}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeChecked={changeChecked}
                    changeFilter={changeFilter}
                    deleteTodolist={deleteTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                    changeTaskTitle={changeTaskTitle}
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


