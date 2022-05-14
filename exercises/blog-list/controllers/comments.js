const commentsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')

// commentsRouter.get('/:id/comments', async (request, response) => {
//   const { id } = request.params
//   const blogWithComments = await Blog.findById(id).populate('comments')
//   response.json(blogWithComments)
// })

commentsRouter.post('/:id/comments', async (request, response) => {
  const { id } = request.params

  const blog = await Blog.findById(id)

  const comment = new Comment({
    content: request.body.content
  })
  console.log(request.body)

  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()
  response.status(201).json(savedComment)
})

module.exports = commentsRouter