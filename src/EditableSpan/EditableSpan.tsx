import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { Box, TextField } from '@material-ui/core'
import { TaskStatuses } from '../api/todolist-api'

export type EditableSpanType = {
  title: string
  editTitle: (newTitle: string) => void
  status?: TaskStatuses
}
export const EditableSpan = React.memo(({title, editTitle, status}: EditableSpanType) => {
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
    setEditMode(true)
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
      {editMode ?
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


