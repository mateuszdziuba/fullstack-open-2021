import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

import { useDispatch, useSelector } from 'react-redux'

import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState({
    message: null,
    error: false
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])
  const blogs = useSelector((state) => state.blogs)

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage({
        ...errorMessage,
        message: exception.response.data.error,
        error: true
      })
    }
  }

  // const handleCreate = async (newBlog) => {
  //   try {
  //     blogFormRef.current.toggleVisibility()
  //     // const blog = await blogService.create(newBlog)

  //     // setBlogs(blogs.concat(blog))
  //     setErrorMessage({
  //       ...errorMessage,
  //       message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
  //       error: false
  //     })
  //   } catch (exception) {
  //     setErrorMessage({
  //       ...errorMessage,
  //       message: exception.response.data.error,
  //       error: true
  //     })
  //   }
  // }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // const addLike = async (id) => {
  //   const blog = blogs.find((b) => b.id === id)
  //   console.log(blog)
  //   const likedBlog = {
  //     ...blog,
  //     likes: blog.likes + 1,
  //     user: blog.user.id
  //   }
  //   const updatedBlog = await blogService.update(id, likedBlog)
  //   setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)))
  // }

  // const handleRemove = async (id) => {
  //   const blogToRemove = blogs.find((blog) => blog.id === id)
  //   if (window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)) {
  //     await blogService.remove(id)
  //     setBlogs(blogs.filter((blog) => blog.id !== id))
  //   }
  // }

  return (
    <div>
      <h2>blogs</h2>
      <Notification errorMessage={errorMessage} />
      {user === null ? (
        <Togglable buttonLabel="log in">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      ) : (
        <>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm user={user} />
          </Togglable>
        </>
      )}
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            // addLike={addLike}
            // handleRemove={handleRemove}
            user={user}
          />
        ))}
    </div>
  )
}

export default App
