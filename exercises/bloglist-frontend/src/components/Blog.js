import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLike, removeBlog, addComment } from '../reducers/blogReducer'
import { Card, Button, Form } from 'react-bootstrap'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login.user)
  const [comment, setComment] = useState('')

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addComment(blog.id, comment))
    setComment('')
  }

  if (!blog) return null

  return (
    <div className="blog">
      <Card>
        <Card.Body>
          <Card.Title>
            {blog.title} {blog.author}
          </Card.Title>
          <Card.Text>
            <a href={`"${blog.url}"`}>{blog.url}</a>
            <br />
            likes {blog.likes}
            <Button onClick={() => dispatch(addLike(blog))}>like</Button>
            <br />
            {blog.user.name}
            <br />
            {user && user.username === blog.user.username && (
              <Button onClick={handleRemove}>remove</Button>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
      <h3>comments</h3>
      <Form className="d-inline-flex" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control value={comment} onChange={(e) => setComment(e.target.value)} />
        </Form.Group>
        <Button type="submit">add comment</Button>
      </Form>
      <div>
        {blog.comments.map((comment) => (
          <Card className="my-3" key={comment.id}>
            <Card.Header>Comment {comment.id}</Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p> {comment.content} </p>
              </blockquote>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  )
}
export default Blog
