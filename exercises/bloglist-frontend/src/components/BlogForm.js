// import PropTypes from 'prop-types'
import { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

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
    <Form onSubmit={submitBlog}>
      <Form.Group>
        <Form.Label>title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={newBlog.title}
          onChange={handleBlogChange}
          placeholder="title"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>author</Form.Label>
        <Form.Control
          type="text"
          name="author"
          value={newBlog.author}
          onChange={handleBlogChange}
          placeholder="author"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>url</Form.Label>
        <Form.Control
          type="text"
          name="url"
          value={newBlog.url}
          onChange={handleBlogChange}
          placeholder="url"
        />
      </Form.Group>
      <Button className="my-1" type="submit">
        create
      </Button>
    </Form>
  )
}

// BlogForm.propTypes = {
//   handleSubmit: PropTypes.func.isRequired
// }

export default BlogForm
