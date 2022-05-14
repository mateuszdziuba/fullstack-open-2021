import Togglable from './Togglable'
import LoginForm from './LoginForm'
import { Link } from 'react-router-dom'
import { setUser } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import { Container, Navbar, Nav, Button } from 'react-bootstrap'

const Menu = ({ user }) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(setUser(null))
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link as="span">
              <Link to="/blogs">blogs</Link>
            </Nav.Link>
            <Nav.Link as="span">
              <Link to="/users">users</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          {user === null ? (
            <Togglable buttonLabel="log in">
              <LoginForm />
            </Togglable>
          ) : (
            <Navbar.Text>
              {user.name} logged in
              <Button className="mx-2" onClick={handleLogout}>
                logout
              </Button>
            </Navbar.Text>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Menu
