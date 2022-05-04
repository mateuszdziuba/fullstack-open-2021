import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
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
      setErrorMessage({ ...errorMessage, message: exception.response.data.error, error: true })
    }
  }

  const handleBlogChange = event => {
    const { name, value } = event.target
    setNewBlog({
      ...newBlog,
      [name]: value,
      user: user.id
    })
  }

  const handleCreate = async event => {
    try {
      event.preventDefault()
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create(newBlog)

      setBlogs(blogs.concat(blog))
      setErrorMessage({ ...errorMessage, message: `a new blog ${newBlog.title} by ${newBlog.author} added`, error: false })
      setNewBlog(emptyBlog)
    } catch (exception) {
      setErrorMessage({ ...errorMessage, message: exception.response.data.error, error: true })
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

  const addLike = async id => {
    const blog = blogs.find(b => b.id === id)
    const likedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    const updatedBlog = await blogService.update(id, likedBlog)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))

  }

  const handleRemove = async id => {
    const blogToRemove = blogs.find(blog => blog.id === id)
    if (window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)) {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    }
  }

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
        blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} addLike={addLike} handleRemove={handleRemove} user={user} />
        )
      }
    </div>
  )

}

export default App