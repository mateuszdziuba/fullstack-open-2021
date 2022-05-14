import React, { useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import UsersList from './components/UsersList'
import User from './components/User'
import Menu from './components/Menu'
import BlogsList from './components/BlogsList'
import Blog from './components/Blog'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setUser } from './reducers/loginReducer'

import { Routes, Route, useMatch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

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

  const matchBlog = useMatch('/blogs/:id')

  const blog = matchBlog ? blogs.find((blog) => blog.id === matchBlog.params.id) : null

  const matchUser = useMatch('/users/:id')

  const selectedUser = matchUser ? users.find((user) => user.id === matchUser.params.id) : null

  return (
    <div>
      <Menu user={user} />
      <Container>
        <h1>blog app</h1>
        <Notification />
        <Routes>
          <Route path="/blogs/:id" element={<Blog blog={blog} />} />
          <Route path="/users/:id" element={<User user={selectedUser} />} />
          <Route path="/blogs" element={<BlogsList user={user} />} />
          <Route path="/" element={<BlogsList user={user} />} />
          <Route path="/users" element={<UsersList />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
