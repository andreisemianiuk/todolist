import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import styles from './AddItemForm.module.css'
import { Button } from '@material-ui/core'


type AddItemFormType = {
  addItem: (title: string) => void
  title?: string
}

export const AddItemForm = (props: AddItemFormType) => {
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  
  const addItem = () => {
    if (title.trim()) {
      props.addItem(title)
      setTitle('')
    } else {
      setError('Title is required!')
      setTitle('')
    }
  }
  
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError(null)
  }
  
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addItem()
    }
  }
  
  return (
    <div className={styles.main}>
      <input
        placeholder={props.title}
        className={`${styles.input} ${error ? styles.error : ''}`}
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        onBlur={() => setError('')}
      />
      {/*<button className={styles.addBtn} onClick={addItem}>Add</button>*/}
      <Button variant={'contained'} color={'primary'} className={styles.addBtn} onClick={addItem}>Add</Button>
      <div className={styles.errorWrapper}>
        {error && <div className={styles.errorMessage}>{error}</div>}
      </div>
    </div>
  )
}