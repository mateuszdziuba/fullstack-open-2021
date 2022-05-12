import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const { message, error } = notification

  return <>{message && <div className={error ? 'error' : 'success'}>{message}</div>}</>
}

export default Notification
