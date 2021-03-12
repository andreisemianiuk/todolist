import React, { ChangeEvent, useState } from 'react'
import s from './EditableSpan.module.css'

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
  
  const editItemTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
    editTitle(value)
    setEditMode(false)
  }
  
  const taskCompleted = isDone ? s.selected : ''
  
  return (
    <>
      {editMode ?
        <input className={s.input} autoFocus value={value} onChange={onChangeHandler} onBlur={editItemTitle}/>
        : <span onDoubleClick={editModeHandler} className={`${s.text} ${taskCompleted}`}>{title}</span>}
    </>
  )
}


