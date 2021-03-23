import React from 'react'
import { FilterType, TaskType } from '../App'
import TodoListTask from '../TodoListTask/TodoListTask'
import { AddItemForm } from '../AddItemForm/AddItemForm'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { Box, Button, Grid, IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'

type TodoListPropsType = {
  id: string
  title: string
  filter: string
  tasks: TaskType[]
  addTask: (title: string, todolistId: string) => void
  removeTask: (taskId: string, todolistId: string) => void
  changeChecked: (id: string, isDone: boolean, todolistId: string) => void
  changeFilter: (value: FilterType, todolistId: string) => void
  deleteTodolist: (todolistId: string) => void
  changeTodolistTitle: (todolistId: string, newTitle: string) => void
  changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
}

function TodoList(props: TodoListPropsType) {
  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }
  
  const deleteTodolist = () => {
    props.deleteTodolist(props.id)
  }
  
  const editTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle)
  }
  
  const showAllTasks = () => props.changeFilter('all', props.id)
  const showActiveTasks = () => props.changeFilter('active', props.id)
  const showCompletedTasks = () => props.changeFilter('completed', props.id)
  
  return (
    <Box style={{textAlign: 'center'}}>
      <h3 style={{
        maxWidth: '300px',
        textAlign: 'center'
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
        {props.tasks.map(v =>
          <TodoListTask
            key={v.id}
            id={v.id}
            todolistId={props.id}
            title={v.title}
            isDone={v.isDone}
            removeTask={props.removeTask}
            changeChecked={props.changeChecked}
            changeTaskTitle={props.changeTaskTitle}
          />)
        }
      </Box>
    </Box>
  )
}

export default TodoList