import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { Grid, IconButton, TextField } from '@material-ui/core'
import { AddBox } from '@material-ui/icons'


export type AddItemFormType = {
  addItem: (title: string) => void
  title?: string
  disabled?: boolean
}

export const AddItemForm = React.memo((props: AddItemFormType) => {
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
    if (error !== null) {
      setError(null)
    }
  }
  
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addItem()
    }
  }
  
  return (
    <Grid spacing={2}>
      <Grid container>
        <TextField
          disabled={props.disabled}
          margin={'dense'}
          variant={'outlined'}
          value={title}
          error={!!error}
          helperText={error}
          label={props.title}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
        />
        <IconButton color={'primary'} onClick={addItem} disabled={props.disabled}>
          <AddBox/>
        </IconButton>
      </Grid>
    </Grid>
  )
})