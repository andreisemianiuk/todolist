import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { Box, CircularProgress, TextField } from '@material-ui/core'
import { TaskStatuses } from '../../api/todolist-api'
import { RequestStatusType } from '../../app/app-reducer'

export type EditableSpanType = {
  title: string
  editTitle: (newTitle: string) => void
  status?: TaskStatuses
  disabled?: boolean
  entityStatus?: RequestStatusType
}
export const EditableSpan = React.memo((
  {title, editTitle, status, disabled, entityStatus}: EditableSpanType) => {
  const [editMode, setEditMode] = useState(false)
  const [value, setValue] = useState('')
  const [error, setError] = useState<string | null>(null)
  
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
    if (error !== null) {
      setError(null)
    }
  }
  
  const editModeHandler = () => {
    !disabled && setEditMode(true)
  }
  
  const addItemTitle = (currentValue: string) => {
    if (currentValue.trim()) {
      editTitle(currentValue)
      setEditMode(false)
    } else {
      setError('Title is required!')
      setValue('')
    }
  }
  
  const addItemOnBlur = () => {
    addItemTitle(value)
  }
  
  const onEnterEditItemTitle = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      addItemTitle(value)
    }
  }
  
  return (
    <>
      {entityStatus === 'loading' ? <CircularProgress size={20}/> :
        editMode ?
          <TextField
            autoFocus
            value={value}
            error={!!error}
            helperText={error}
            onChange={onChangeHandler}
            onBlur={addItemOnBlur}
            onKeyPress={onEnterEditItemTitle}
          />
          : <Box
            component={'span'}
            m={1}
            p={1}
            style={{
              textDecoration: `${status === TaskStatuses.Completed ? 'line-through' : ''}`,
              wordBreak: 'break-word',
            }}
            onDoubleClick={editModeHandler}
          >
            {title}
          </Box>
        
      }
    </>
  )
})


