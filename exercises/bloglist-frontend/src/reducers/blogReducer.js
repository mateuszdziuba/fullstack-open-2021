import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    modifyBlog(state, action) {
      const object = action.payload
      return state.map((blog) => (blog.id !== object.id ? blog : object))
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    }
  }
})

export const { setBlogs, appendBlog, modifyBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)
    dispatch(appendBlog(newBlog))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(deleteBlog(id))
  }
}

export const addLike = (blogObject) => {
  return async (dispatch) => {
    const { id, author, likes, title, url, user } = blogObject
    const modBlog = await blogService.update(id, {
      author,
      title,
      url,
      user: user.id,
      likes: likes + 1
    })
    dispatch(modifyBlog(modBlog))
  }
}

export default blogSlice.reducer
