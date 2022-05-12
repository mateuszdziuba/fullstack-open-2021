import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { showNotification } from './notificationReducer'

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: null,
    username: '',
    password: ''
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    setUsername(state, action) {
      state.username = action.payload
    },
    setPassword(state, action) {
      state.password = action.payload
    }
  }
})

export const { setUser, setUsername, setPassword } = loginSlice.actions

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setUsername(''))
      dispatch(setPassword(''))
    } catch (exception) {
      dispatch(
        showNotification(
          {
            message: exception.response.data.error,
            error: true
          },
          5
        )
      )
    }
  }
}

export default loginSlice.reducer
