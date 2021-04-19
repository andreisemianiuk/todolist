import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { Grid, IconButton, TextField } from '@material-ui/core'
import { AddBox } from '@material-ui/icons'


type AddItemFormType = {
  addItem: (title: string) => void
  title?: string
}

export const AddItemForm = React.memo((props: AddItemFormType) => {
  console.log('AddItemForm')
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
          margin={'dense'}
          variant={'outlined'}
          value={title}
          error={!!error}
          helperText={error}
          label={props.title}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
        />
        <IconButton color={'primary'} onClick={addItem}>
          <AddBox color={'primary'}/>
        </IconButton>
      </Grid>
    </Grid>
  )
})