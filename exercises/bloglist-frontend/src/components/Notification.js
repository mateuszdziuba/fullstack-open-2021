import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const { message, error } = notification

  return <>{message && <Alert variant={error ? 'danger' : 'success'}>{message}</Alert>}</>
}

export default Notification
