import React, { ChangeEvent, FocusEvent, KeyboardEvent, useState } from 'react'
import { Box, TextField } from '@material-ui/core'

type EditableSpanType = {
  title: string
  editTitle: (newTitle: string) => void
  isDone?: boolean
}
export const EditableSpan = ({title, editTitle, isDone}: EditableSpanType) => {
  const [editMode, setEditMode] = useState(false)
  const [value, setValue] = useState('')
  
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }
  
  const editModeHandler = () => {
    setEditMode(true)
  }
  
  const editItemTitle = (e: FocusEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
    editTitle(value)
    setEditMode(false)
  }
  
  const onEnterEditItemTitle = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      editTitle(value)
      setEditMode(false)
    }
  }
  
  return (
    <>
      {editMode ?
        <TextField
          autoFocus
          value={value}
          onChange={onChangeHandler}
          onBlur={editItemTitle}
          onKeyPress={onEnterEditItemTitle}
        />
        : <Box
          component={'span'}
          m={1}
          p={1}
          style={{
            textDecoration: `${isDone ? 'line-through' : ''}`,
            wordBreak: 'break-word',
          }}
          onDoubleClick={editModeHandler}
        >
          {title}
        </Box>
      }
    </>
  )
}


