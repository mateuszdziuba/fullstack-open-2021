import React, { useState } from 'react'
const Blog = ({ blog, addLike, handleRemove, user }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      {visible ?

        <><br />{blog.url}<br />
          likes {blog.likes}<button onClick={() => addLike(blog.id)}>like</button><br />
          {blog.user.name}<br />
          {user ?
            user.username === blog.user.username ?
              <button onClick={() => handleRemove(blog.id)}>remove</button>
              : ''
            : ''
          }
        </>

        : <></>}
    </div >
  )
}
export default Blog