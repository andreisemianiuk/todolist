import { appReducer, InitialStateType, setAppErrorAC, setAppStatusAC } from './app-reducer'

let startState: InitialStateType

beforeEach(() => {
  startState = {
    status: 'loading',
    error: null,
  }
})

test('correct status should be added', () => {
  
  const action = setAppStatusAC('succeeded')
  
  const endState = appReducer(startState, action)
  
  expect(endState.status).toBe('succeeded')
})
test('correct error should be added', () => {
  
  const action = setAppErrorAC('ERROR')
  
  const endState = appReducer(startState, action)
  
  expect(endState.error).toBe('ERROR')
})