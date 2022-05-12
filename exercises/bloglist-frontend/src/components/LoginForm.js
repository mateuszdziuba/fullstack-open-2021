import { useSelector, useDispatch } from 'react-redux'
import { login, setUsername, setPassword } from '../reducers/loginReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const { username, password } = useSelector((state) => state.login)
  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login(username, password))
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={(e) => dispatch(setUsername(e.target.value))}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={(e) => dispatch(setPassword(e.target.value))}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
