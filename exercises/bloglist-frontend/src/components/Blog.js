import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addLike, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleRemove = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id))
    }
  }

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}{' '}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      {visible ? (
        <>
          <br />
          {blog.url}
          <br />
          likes {blog.likes}
          <button onClick={() => dispatch(addLike(blog))}>like</button>
          <br />
          {blog.user.name}
          <br />
          {user ? (
            user.username === blog.user.username ? (
              <button onClick={() => handleRemove(blog)}>remove</button>
            ) : (
              ''
            )
          ) : (
            ''
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  )
}
export default Blog
