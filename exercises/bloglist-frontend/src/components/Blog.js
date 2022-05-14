import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLike, removeBlog, addComment } from '../reducers/blogReducer'

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
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={`"${blog.url}"`}>{blog.url}</a>
      <br />
      likes {blog.likes}
      <button onClick={() => dispatch(addLike(blog))}>like</button>
      <br />
      {blog.user.name}
      <br />
      {user && user.username === blog.user.username && (
        <button onClick={handleRemove}>remove</button>
      )}
      <h3>comments</h3>
      <form onSubmit={handleSubmit}>
        <input value={comment} onChange={(e) => setComment(e.target.value)} />
        <button>add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  )
}
export default Blog
