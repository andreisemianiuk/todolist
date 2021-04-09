import React from 'react'
import { FilterType } from '../AppWithRedux'
import TodoListTask from '../TodoListTask/TodoListTask'
import { AddItemForm } from '../AddItemForm/AddItemForm'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { Box, Button, Grid, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootStateType } from '../state/store'
import { TasksListType } from '../AppWithRedux'
import { changeTodolistFilterAC } from '../state/todolist-reducer'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from '../state/tasks-reducer'

type TodoListPropsType = {
  id: string
  title: string
  filter: string
  deleteTodolist: (todolistId: string) => void
  changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

function TodoList(props: TodoListPropsType) {
  const tasks = useSelector<RootStateType, TasksListType>(state => state.tasks)
  const dispatch = useDispatch()
  
  // functions for tasks
  const removeTask = (taskId: string) => {
    const action = removeTaskAC(taskId, props.id)
    dispatch(action)
  }
  const addTask = (title: string) => {
    const action = addTaskAC(title, props.id)
    dispatch(action)
  }
  const changeTaskStatus = (taskId: string, isDone: boolean) => {
    const action = changeTaskStatusAC(taskId, isDone, props.id)
    dispatch(action)
  }
  const changeTaskTitle = (taskId: string, newTitle: string) => {
    const action = changeTaskTitleAC(props.id, taskId, newTitle)
    dispatch(action)
  }
  const changeFilter = (value: FilterType) => {
    const action = changeTodolistFilterAC(props.id, value)
    dispatch(action)
  }
  
  const deleteTodolist = () => {
    props.deleteTodolist(props.id)
  }
  const editTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle)
  }
  
  let allTodolistTasks = tasks[props.id]
  let tasksForTodoList = allTodolistTasks
  
  switch (props.filter) {
    case 'active':
      tasksForTodoList = allTodolistTasks.filter(t => !t.isDone)
      break
    case 'completed':
      tasksForTodoList = allTodolistTasks.filter(t => t.isDone)
  }
  
  const showAllTasks = () => changeFilter('all' )
  const showActiveTasks = () => changeFilter('active')
  const showCompletedTasks = () => changeFilter('completed')
  
  return (
    <Box style={{textAlign: 'center'}}>
      <h3 style={{
        maxWidth: '300px',
        textAlign: 'center',
      }}>
        <EditableSpan title={props.title} editTitle={editTodolistTitle}/>
        <IconButton onClick={deleteTodolist}>
          <Delete/>
        </IconButton>
      </h3>
      <Grid>
        <Button
          variant={props.filter === 'all' ? 'contained' : 'outlined'}
          color={'primary'}
          style={{margin: '5px'}}
          onClick={showAllTasks}>all
        </Button>
        <Button
          variant={props.filter === 'active' ? 'contained' : 'outlined'}
          color={'primary'}
          style={{margin: '5px'}}
          onClick={showActiveTasks}>
          active
        </Button>
        <Button
          variant={props.filter === 'completed' ? 'contained' : 'outlined'}
          color={'primary'}
          style={{margin: '5px'}}
          onClick={showCompletedTasks}>completed
        </Button>
      </Grid>
      <Box style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <AddItemForm title={'Create new task'} addItem={addTask}/>
      </Box>
      <Box>
        {tasksForTodoList.map(v =>
          <TodoListTask
            key={v.id}
            id={v.id}
            title={v.title}
            isDone={v.isDone}
            removeTask={removeTask}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
          />)
        }
      </Box>
    </Box>
  )
}

export default TodoList