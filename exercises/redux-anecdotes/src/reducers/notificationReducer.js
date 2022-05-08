import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificaton(state, action) {
      return `you voted '${action.payload}'`
    },
    removeNotification(state, action) {
      return ''
    }
  }

})

export const { setNotificaton, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer