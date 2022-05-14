import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

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
    },
    commentBlog(state, action) {
      const { blogId, id, content } = action.payload
      const newComment = { id, content }
      const commentedBlog = state.find((blog) => blog.id === blogId)
      console.log(commentedBlog)
      const updatedBlog = { ...commentedBlog, comments: [...commentedBlog.comments, newComment] }
      return state.map((blog) => (blog.id !== blogId ? blog : updatedBlog))
    }
  }
})

export const { setBlogs, appendBlog, modifyBlog, deleteBlog, commentBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blogObject)
      dispatch(appendBlog(newBlog))
      dispatch(
        showNotification(
          {
            message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
            error: false
          },
          5
        )
      )
    } catch (e) {
      console.log(e)
      dispatch(
        showNotification(
          {
            message: e.response.data.error,
            error: true
          },
          5
        )
      )
    }
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

export const addComment = (id, content) => {
  return async (dispatch) => {
    const comment = await blogService.addComment(id, content)
    dispatch(commentBlog({ blogId: id, id: comment.id, content: comment.content }))
  }
}

export default blogSlice.reducer
