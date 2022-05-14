import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const BlogsList = ({ user }) => {
  const blogs = useSelector((state) => state.blogs)

  const blogFormRef = useRef()

  return (
    <>
      <div>
        {user === null || (
          <>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm />
            </Togglable>
          </>
        )}
        <ListGroup as="ul">
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <ListGroup.Item as="li" key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} {blog.author}
                </Link>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>
    </>
  )
}

export default BlogsList
