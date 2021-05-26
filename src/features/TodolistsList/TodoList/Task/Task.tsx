import React, { ChangeEvent, useCallback } from 'react'
import { EditableSpan } from '../../../../components/EditableSpan/EditableSpan'
import { Delete } from '@material-ui/icons'
import { Checkbox, Grid, IconButton } from '@material-ui/core'
import { TaskStatuses } from '../../../../api/todolist-api'
import { RequestStatusType } from '../../../../app/app-reducer'

export type TaskPropsType = {
  title: string
  key: string
  id: string
  status: TaskStatuses
  entityStatus?: RequestStatusType
  entityTaskStatus?: RequestStatusType
  removeTask: (taskId: string) => void
  changeTaskStatus: (taskId: string, status: TaskStatuses) => void
  changeTaskTitle: (taskId: string, newTitle: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
  const {title, id, status, entityTaskStatus, removeTask, changeTaskStatus, changeTaskTitle} = props
  
  const onCheckedHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    changeTaskStatus(id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
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
      <Checkbox
        color={'primary'}
        onChange={onCheckedHandler}
        checked={status !== TaskStatuses.New}
        disabled={entityTaskStatus === 'loading'}
      />
      <EditableSpan
        title={title}
        editTitle={editTitle}
        status={status}
        entityStatus={entityTaskStatus}
        disabled={entityTaskStatus === 'loading'}
      />
      <IconButton onClick={deleteTask} disabled={entityTaskStatus === 'loading'}>
        <Delete/>
      </IconButton>
    </Grid>
  )
})
