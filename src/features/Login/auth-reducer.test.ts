import { authReducer, InitialAuthStateType, setIsLoggedInAC } from './auth-reducer'

let startState: InitialAuthStateType

beforeEach(() => {
  startState = {isLoggedIn: false}
})


test('correct auth value should be added', () => {
  const endState = authReducer(startState, setIsLoggedInAC(true))
  
  expect(endState.isLoggedIn).toBe(true)
})