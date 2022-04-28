import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import login from './services/login'
import loginService from './services/login'
import Notification from './components/Notification'

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
    try {
      event.preventDefault()
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      setErrorMessage({ ...errorMessage, message: `a new blog ${newBlog.title === '' ? newBlog.url : newBlog.title} by ${newBlog.author} added`, error: false })
      setNewBlog(emptyBlog)
    } catch (e) {
      setErrorMessage({ ...errorMessage, message: e.response.data.error, error: true })
    }
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


  if (user === null) {
    return (<>
      <h2>log in to application</h2>
      <Notification errorMessage={errorMessage} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>)
  }

  return (
    <>
      <h2>blogs</h2>
      <Notification errorMessage={errorMessage} />
      <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input type="text" name="title" value={newBlog.title} onChange={handleBlogChange} />
        </div>
        <div>
          author:
          <input type="text" name="author" value={newBlog.author} onChange={handleBlogChange} />
        </div>
        <div>
          url:
          <input type="text" name="url" value={newBlog.url} onChange={handleBlogChange} />
        </div>
        <button type="submit">create</button>
      </form>
      <br />
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )
      }
    </>

  )
}

export default App