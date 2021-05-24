import React from 'react'
import './App.css'
import {
  AppBar,
  Button,
  Container,
  createStyles,
  IconButton,
  LinearProgress,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { TodolistsList } from '../features/TodolistsList/TodolistsList'
import { useSelector } from 'react-redux'
import { RootStateType } from './store'
import { RequestStatusType } from './app-reducer'
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
)

export default function App() {
  const classes = useStyles()
  const status = useSelector<RootStateType, RequestStatusType>(state => state.app.status)
  
  return (
    <div className="App">
      <ErrorSnackbar />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
        {status === 'loading' && <LinearProgress/>}
      </AppBar>
      <Container fixed>
        <TodolistsList/>
      </Container>
    </div>
  )
}