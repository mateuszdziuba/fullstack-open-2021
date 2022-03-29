const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => {
    return sum + item.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
}

const mostBlogs = (blogs) => {
  const obj = blogs.reduce((val, cur) => {
    val[cur.author] = val[cur.author] ? val[cur.author] + 1 : 1
    return val
  }, {})
  const result = Object.entries(obj).reduce((prev, current) => (prev[1] > current[1]) ? prev : current)
  return { author: result[0], blogs: result[1] }
}

const mostLikes = (blogs) => {
  const obj = blogs.reduce((val, cur) => {
    val[cur.author] = (val[cur.author] || 0) + cur.likes
    return val
  }, {})
  const result = Object.entries(obj).reduce((prev, current) => (prev[1] > current[1]) ? prev : current)
  return { author: result[0], likes: result[1] }

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}