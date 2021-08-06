import React, { useCallback, useEffect } from 'react'
import './App.css'
import {
  AppBar,
  Button, CircularProgress,
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
import { useDispatch, useSelector } from 'react-redux'
import { RootStateType } from './store'
import { RequestStatusType, setAppInitializedTC } from './app-reducer'
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Login } from '../features/Login/Login'
import { logoutUserTC } from '../features/Login/auth-reducer'
import { Error404 } from '../components/Error404/Error404'

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

type PropsType = {
  demo?: boolean
}

export const App = ({demo = false}: PropsType) => {
  const classes = useStyles()
  const status = useSelector<RootStateType, RequestStatusType>(state => state.app.status)
  const isInitialized = useSelector<RootStateType, boolean>(state => state.app.isInitialized)
  const isLoggedIn = useSelector<RootStateType, boolean>(state => state.auth.isLoggedIn)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(setAppInitializedTC())
  }, [dispatch])
  
  const logout = useCallback(() => {
    dispatch(logoutUserTC())
  }, [dispatch])
  
  if (!isInitialized) {
    return <div
      style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <CircularProgress/>
    </div>
  }
  
  return (
    <div className="App">
      <ErrorSnackbar/>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          {isLoggedIn && <Button color="inherit" onClick={logout}>Logout</Button>}
        </Toolbar>
        {status === 'loading' && <LinearProgress/>}
      </AppBar>
      <Container fixed>
        <Switch>
          <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
          <Route exact path={'/login'} render={() => <Login/>}/>
          <Route path={'/Error404'} render={() => <Error404/>}/>
          <Redirect from={'*'} to={'/'}/>
        </Switch>
      </Container>
    </div>
  )
}