import PropTypes from 'prop-types'
import { useState } from 'react'

const emptyBlog = {
  title: '',
  url: '',
  author: '',
  user: {}
}

const BlogForm = ({ handleSubmit, user }) => {

  console.log(user)
  const [newBlog, setNewBlog] = useState(emptyBlog)

  const handleBlogChange = event => {
    const { name, value } = event.target
    setNewBlog({
      ...newBlog,
      [name]: value,
      user: { username: user.username, name: user.name }
    })
  }

  const submitBlog = event => {
    event.preventDefault()
    handleSubmit(newBlog)

    setNewBlog(emptyBlog)
  }

  return (
    <form onSubmit={submitBlog}>
      <div>
        title:
        <input type="text" name="title" value={newBlog.title} onChange={handleBlogChange} placeholder='title' />
      </div>
      <div>
        author:
        <input type="text" name="author" value={newBlog.author} onChange={handleBlogChange} placeholder='author' />
      </div>
      <div>
        url:
        <input type="text" name="url" value={newBlog.url} onChange={handleBlogChange} placeholder='url' />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default BlogForm