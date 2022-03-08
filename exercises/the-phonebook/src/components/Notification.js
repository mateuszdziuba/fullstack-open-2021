const Notification = ({ errorMessage }) => {
    const { message, error } = errorMessage
    console.log(message, error)
    if (message === null) return null
    
    return (
        <div className={error ? 'error' : 'success'}>
            {message}
        </div>
)
}

export default Notification