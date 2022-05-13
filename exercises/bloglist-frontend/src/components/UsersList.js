import { useSelector } from 'react-redux'
import {
  Link
  // Routes, Route, useMatch, useNavigate }
} from 'react-router-dom'

const UsersList = () => {
  const users = useSelector((state) => state.users)

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default UsersList
