import { Link } from 'react-router-dom'
import { Card, ListGroup } from 'react-bootstrap'

const User = ({ user }) => {
  if (!user) return null

  return (
    <Card>
      <Card.Header>
        <h2>{user.name}</h2>
      </Card.Header>
      <Card.Body>
        <Card.Title>added blogs</Card.Title>
        <ListGroup>
          {user.blogs.map((blog) => (
            <ListGroup.Item key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

export default User
