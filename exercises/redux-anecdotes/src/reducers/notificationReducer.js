import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotificaton(state, action) {
      return action.payload
    }
  }

})

export const { addNotificaton, removeNotification } = notificationSlice.actions

let timeout
export const setNotification = (text, time) => {
  return dispatch => {
    clearTimeout(timeout)
    dispatch(addNotificaton(text))
    timeout = setTimeout(() => {
      dispatch(addNotificaton(''))
    }, time * 1000)
  }
}

export default notificationSlice.reducer