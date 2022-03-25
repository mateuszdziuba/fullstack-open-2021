const Notification = ({ errorMessage }) => {
    const { message, error } = errorMessage
    if (message === null) return null

    return (
        <div className={error ? 'error' : 'success'}>
            {message}
        </div>
    )
}

export default Notification