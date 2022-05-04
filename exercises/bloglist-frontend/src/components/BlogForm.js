import PropTypes from 'prop-types'

const BlogForm = ({
  handleSubmit,
  handleBlogChange,
  title,
  author,
  url
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        title:
        <input type="text" name="title" value={title} onChange={handleBlogChange} />
      </div>
      <div>
        author:
        <input type="text" name="author" value={author} onChange={handleBlogChange} />
      </div>
      <div>
        url:
        <input type="text" name="url" value={url} onChange={handleBlogChange} />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleBlogChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default BlogForm