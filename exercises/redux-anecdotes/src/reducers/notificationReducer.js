import { createSlice } from "@reduxjs/toolkit"

const initialState = { id: 0, text: '' }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotificaton(state, action) {
      state.id = action.payload.id
      state.text = action.payload.text

    },
    removeNotification(state, action) {
      const id = action.payload
      if (id === state.id)
        state.text = ''
    }
  }

})

export const { addNotificaton, removeNotification } = notificationSlice.actions

let nextId = 0
export const setNotification = (text, time) => {
  return dispatch => {
    const id = nextId++
    dispatch(addNotificaton({ id, text }))
    setTimeout(() => {
      dispatch(removeNotification(id))
    }, time * 1000)
  }
}

export default notificationSlice.reducer