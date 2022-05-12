// import PropTypes from 'prop-types'
import { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

const emptyBlog = {
  title: '',
  url: '',
  author: '',
  user: {}
}

const BlogForm = () => {
  const [newBlog, setNewBlog] = useState(emptyBlog)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login.user)

  const handleBlogChange = (event) => {
    const { name, value } = event.target
    setNewBlog({
      ...newBlog,
      [name]: value,
      user: { username: user.username, name: user.name }
    })
  }

  const submitBlog = (event) => {
    event.preventDefault()
    dispatch(createBlog(newBlog))
    setNewBlog(emptyBlog)
  }

  return (
    <form onSubmit={submitBlog}>
      <div>
        title:
        <input
          type="text"
          name="title"
          value={newBlog.title}
          onChange={handleBlogChange}
          placeholder="title"
        />
      </div>
      <div>
        author:
        <input
          type="text"
          name="author"
          value={newBlog.author}
          onChange={handleBlogChange}
          placeholder="author"
        />
      </div>
      <div>
        url:
        <input
          type="text"
          name="url"
          value={newBlog.url}
          onChange={handleBlogChange}
          placeholder="url"
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

// BlogForm.propTypes = {
//   handleSubmit: PropTypes.func.isRequired
// }

export default BlogForm
