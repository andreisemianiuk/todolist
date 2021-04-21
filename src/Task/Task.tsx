import React, { ChangeEvent, useCallback } from 'react'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { Delete } from '@material-ui/icons'
import { Checkbox, Grid, IconButton } from '@material-ui/core'

export type TaskPropsType = {
  title: string
  key: string
  id: string
  isDone: boolean
  removeTask: (taskId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
  changeTaskTitle: (taskId: string, newTitle: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
  const {title, id, isDone, removeTask, changeTaskStatus, changeTaskTitle} = props
  
  const onCheckedHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    changeTaskStatus(id, e.currentTarget.checked)
  }, [changeTaskStatus, id])
  const deleteTask = useCallback(() => {
    removeTask(id)
  }, [removeTask, id])
  const editTitle = useCallback((newTitle: string) => {
    changeTaskTitle(id, newTitle)
  }, [changeTaskTitle, id])
  
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
      <Checkbox color={'primary'} onChange={onCheckedHandler} checked={isDone}/>
      <EditableSpan title={title} editTitle={editTitle} isDone={isDone}/>
      <IconButton onClick={deleteTask}>
        <Delete/>
      </IconButton>
    </Grid>
  )
})
