import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: null, error: false },
  reducers: {
    setNotification(state, action) {
      return action.payload
    }
  }
})

export const { setNotification } = notificationSlice.actions

let timeout
export const showNotification = (object, time) => {
  return async (dispatch) => {
    clearTimeout(timeout)
    dispatch(setNotification(object))
    timeout = setTimeout(() => {
      dispatch(setNotification(''))
    }, time * 1000)
  }
}

export default notificationSlice.reducer
