import React, { useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import UsersList from './components/UsersList'
import User from './components/User'

import { Link, Routes, Route, useMatch } from 'react-router-dom'

import { setUser } from './reducers/loginReducer'

import { useDispatch, useSelector } from 'react-redux'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import BlogsList from './components/BlogsList'
import Blog from './components/Blog'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(setUser(null))
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const user = useSelector((state) => state.login.user)
  const blogs = useSelector((state) => state.blogs)
  const users = useSelector((state) => state.users)

  const padding = {
    padding: 5
  }

  const matchBlog = useMatch('/blogs/:id')

  const blog = matchBlog ? blogs.find((blog) => blog.id === matchBlog.params.id) : null

  const matchUser = useMatch('/users/:id')

  const selectedUser = matchUser ? users.find((user) => user.id === matchUser.params.id) : null
  const inlineBlock = {
    display: 'inline-block'
  }

  return (
    <div>
      <div style={inlineBlock}>
        <Link style={padding} to="/blogs">
          notes
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        {user === null ? (
          <Togglable buttonLabel="log in">
            <LoginForm />
          </Togglable>
        ) : (
          <p style={inlineBlock}>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
        )}
      </div>
      <h2>blog app</h2>
      <Notification />
      <Routes>
        <Route path="/blogs/:id" element={<Blog blog={blog} />} />
        <Route path="/users/:id" element={<User user={selectedUser} />} />
        <Route path="/blogs" element={<BlogsList user={user} />} />
        <Route path="/users" element={<UsersList />} />
      </Routes>
    </div>
  )
}

export default App
