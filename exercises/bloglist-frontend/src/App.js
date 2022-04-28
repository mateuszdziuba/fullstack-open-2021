import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import login from './services/login'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const emptyBlog = {
  title: '',
  author: '',
  url: ''
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState(emptyBlog)
  const [errorMessage, setErrorMessage] = useState({ message: null, error: false })
  
  const blogFormRef = useRef()

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      setErrorMessage({ ...errorMessage, message: exception.response.data.error, error: true })
    }
  }

  const handleBlogChange = event => {
    const { name, value } = event.target
    setNewBlog({
      ...newBlog,
      [name]: value
    })
  }

  const handleCreate = async event => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blog = await blogService.create(newBlog)
    setBlogs(blogs.concat(blog))
    setErrorMessage({ ...errorMessage, message: `a new blog ${newBlog.title} by ${newBlog.author} added`, error: false })
    setNewBlog(emptyBlog)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

      
  return (
    <div>
      <h2>blogs</h2>
      <Notification errorMessage={errorMessage} />
      {user === null ?
        <Togglable buttonLabel='log in'>
          <LoginForm 
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
        :
        <>
        <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm 
            title={newBlog.title}
            author={newBlog.author}
            url={newBlog.url}
            handleBlogChange={handleBlogChange}
            handleSubmit={handleCreate}
          />
        </Togglable>
        </>
      }
            {
          blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )
        }
    </div>
  )

    }

export default App