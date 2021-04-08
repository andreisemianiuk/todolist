import React, { useReducer } from 'react'
import './App.css'
import TodoList from './TodoList/TodoList'
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
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistReducer,
} from './state/todolist-reducer'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasks-reducer'

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

export default function AppWithReducers() {
  const classes = useStyles()
  
  let [todolist, dispatchToTodolist] = useReducer(todolistReducer, [])
  let [tasks, dispatchToTasks] = useReducer(tasksReducer, {})
  
  // functions for todolist
  const addTodolist = (title: string) => {
    const action = addTodolistAC(title)
    
    dispatchToTodolist(action)
    dispatchToTasks(action)
  }
  const deleteTodolist = (todolistId: string) => {
    const action = removeTodolistAC(todolistId)
    dispatchToTodolist(action)
    dispatchToTasks(action)
  }
  const changeTodolistTitle = (todolistId: string, newTitle: string) => {
    const action = changeTodolistTitleAC(todolistId, newTitle)
    dispatchToTodolist(action)
  }
  const changeFilter = (todolistId: string, value: FilterType) => {
    const action = changeTodolistFilterAC(todolistId, value)
    dispatchToTodolist(action)
  }
  
  // functions for tasks
  const removeTask = (todoId: string, todolistId: string) => {
    const action = removeTaskAC(todoId, todolistId)
    dispatchToTasks(action)
  }
  const addTask = (title: string, todolistId: string) => {
    const action = addTaskAC(title, todolistId)
    dispatchToTasks(action)
  }
  const changeTaskStatus = (todoId: string, isDone: boolean, todolistId: string) => {
    const action = changeTaskStatusAC(todoId, isDone, todolistId)
    dispatchToTasks(action)
  }
  const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
    const action = changeTaskTitleAC(todolistId, taskId, newTitle)
    dispatchToTasks(action)
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
          {todolist.map(tl => {
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
                    changeChecked={changeTaskStatus}
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