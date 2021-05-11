import React, { useCallback, useEffect } from 'react'
import { Box, Button, Grid, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootStateType } from '../state/store'
import { changeTodolistFilterAC, deleteTodolistTC, FilterType } from '../state/todolist-reducer'
import { addTaskTC, deleteTaskTC, fetchTasksTC, TasksListType, updateTaskTC } from '../state/tasks-reducer'
import { AddItemForm } from '../AddItemForm/AddItemForm'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { Task } from '../Task/Task'
import { TaskStatuses } from '../api/todolist-api'


export type TodoListPropsType = {
  id: string
  title: string
  filter: string
  deleteTodolist: (todolistId: string) => void
  changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export const TodoList = React.memo((props: TodoListPropsType) => {
  const {id, filter, title, changeTodolistTitle, deleteTodolist} = props
  const tasks = useSelector<RootStateType, TasksListType>(state => state.tasks)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchTasksTC(id))
  }, [dispatch, id])
  
  
  // functions for tasks
  const removeTask = useCallback((taskId: string) => {
    dispatch(deleteTaskTC(id, taskId))
  }, [dispatch, id])
  const addTask = useCallback((title: string) => {
    dispatch(addTaskTC(id, title))
  }, [dispatch, id])
  const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses) => {
    const action = updateTaskTC(id, taskId, {status})
    dispatch(action)
  }, [dispatch, id])
  const changeTaskTitle = useCallback((taskId: string, newTitle: string) => {
    const action = updateTaskTC(id, taskId, {title: newTitle})
    dispatch(action)
  }, [dispatch, id])
  const changeFilter = (value: FilterType) => {
    const action = changeTodolistFilterAC(id, value)
    dispatch(action)
  }
  
  const deleteTodolistHandler = () => {
    deleteTodolist(id)
    dispatch(deleteTodolistTC(id))
  }
  const editTodolistTitle = useCallback((newTitle: string) => {
    changeTodolistTitle(id, newTitle)
  }, [changeTodolistTitle, id])
  
  let allTodolistTasks = tasks[id]
  let tasksForTodoList = allTodolistTasks
  
  switch (filter) {
    case 'active':
      tasksForTodoList = allTodolistTasks.filter(t => t.status === TaskStatuses.New)
      break
    case 'completed':
      tasksForTodoList = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed)
  }
  
  const showAllTasks = () => changeFilter('all')
  const showActiveTasks = () => changeFilter('active')
  const showCompletedTasks = () => changeFilter('completed')
  
  return (
    <Box style={{textAlign: 'center'}}>
      <h3 style={{
        maxWidth: '300px',
        textAlign: 'center',
      }}>
        <EditableSpan title={title} editTitle={editTodolistTitle}/>
        <IconButton onClick={deleteTodolistHandler}>
          <Delete/>
        </IconButton>
      </h3>
      <Grid>
        <Button
          variant={filter === 'all' ? 'contained' : 'outlined'}
          color={'primary'}
          style={{margin: '5px'}}
          onClick={showAllTasks}>all
        </Button>
        <Button
          variant={filter === 'active' ? 'contained' : 'outlined'}
          color={'primary'}
          style={{margin: '5px'}}
          onClick={showActiveTasks}>
          active
        </Button>
        <Button
          variant={filter === 'completed' ? 'contained' : 'outlined'}
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
          <Task
            key={v.id}
            id={v.id}
            title={v.title}
            status={v.status}
            removeTask={removeTask}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
          />)
        }
      </Box>
    </Box>
  )
})
