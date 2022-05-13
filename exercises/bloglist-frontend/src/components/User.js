import { Link } from 'react-router-dom'

const User = ({ user }) => {
  if (!user) return null

  return (
    <div>
      <h2></h2>
      <h3>added bkigs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User
