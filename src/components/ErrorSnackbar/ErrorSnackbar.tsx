import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { useSelector } from 'react-redux'
import { RootStateType } from '../../app/store'
import { RequestErrorType } from '../../app/app-reducer'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export function ErrorSnackbar() {
  // const [open, setOpen] = React.useState(true)
  
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    // if(event?.currentTarget)
    // setOpen(false)
  }
  const error = useSelector<RootStateType, RequestErrorType>(state => state.app.error)
  
  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        {error}
      </Alert>
    </Snackbar>
  )
}
