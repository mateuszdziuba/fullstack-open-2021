import { useSelector, useDispatch } from 'react-redux'
import { login, setUsername, setPassword } from '../reducers/loginReducer'
import { Form, FormControl, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
  const { username, password } = useSelector((state) => state.login)
  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login(username, password))
  }

  return (
    <Form className="d-inline-flex" onSubmit={handleLogin}>
      <FormControl
        className="mx-1"
        id="username"
        type="text"
        value={username}
        name="Username"
        placeholder="username"
        onChange={(e) => dispatch(setUsername(e.target.value))}
      />
      <FormControl
        className="mx-1"
        id="password"
        type="password"
        value={password}
        name="Password"
        placeholder="passwod"
        onChange={(e) => dispatch(setPassword(e.target.value))}
      />
      <Button id="login-button" className="mx-1" type="submit">
        login
      </Button>
    </Form>
  )
}

export default LoginForm
