import React, { ChangeEvent } from 'react'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { Delete } from '@material-ui/icons'
import { Checkbox, Grid, IconButton } from '@material-ui/core'

type TodoListTaskPropsType = {
  todolistId: string
  title: string
  key: string
  id: string
  isDone: boolean
  removeTask: (id: string, todolistId: string) => void
  changeChecked: (id: string, isDone: boolean, todolistId: string) => void
  changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
}

function TodoListTask(props: TodoListTaskPropsType) {
  
  const onCheckedHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeChecked(props.id, e.currentTarget.checked, props.todolistId)
  }
  
  const removeTask = () => {
    props.removeTask(props.id, props.todolistId)
  }
  
  const editTitle = (newTitle: string) => {
    props.changeTaskTitle(props.todolistId, props.id, newTitle)
  }
  
  return (
    <Grid
      key={props.key}
      style={{
        minWidth: '200px',
        maxWidth: '300px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Checkbox color={'primary'} onChange={onCheckedHandler} checked={props.isDone}/>
      <EditableSpan title={props.title} editTitle={editTitle} isDone={props.isDone}/>
      <IconButton onClick={removeTask}>
        <Delete/>
      </IconButton>
    </Grid>
  )
}

export default TodoListTask