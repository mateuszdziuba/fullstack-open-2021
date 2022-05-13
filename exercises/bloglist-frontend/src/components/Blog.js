import { useDispatch, useSelector } from 'react-redux'
import { addLike, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login.user)

  const handleRemove = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id))
    }
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
        <button onClick={() => handleRemove(blog)}>remove</button>
      )}
    </div>
  )
}
export default Blog
