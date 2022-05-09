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

export const { addNotificaton } = notificationSlice.actions

export const setNotification = (text, time) => {
  return dispatch => {
    dispatch(addNotificaton(text))
    setTimeout(() => {
      dispatch(addNotificaton(''))
    }, time * 1000) 
  }
}

export default notificationSlice.reducer