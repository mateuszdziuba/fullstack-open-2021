const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const mongoose = require('mongoose')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const JWT_SECRET = process.env.JWT_SECRET

const resolvers = {
  // Author: {
    //   bookCount: async (root) => {
      //     console.log('Book.find')
      //     return await Book.find({ author: root }).count()
      //   },
      // },
  Query: {
    bookCount: async (root, args) => {
      if (!args.author) return Book.collection.countDocuments()
      const author = await Author.findOne({ name: args.author })
      return await Book.find({ author }).count()
    },
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const author = await Author.findOne({ name: args.author }).populate('books')
      if (!args.author && !args.genre) {
        return await Book.find({}).populate('author')
      }
      if (!args.genre) {
        return await Book.find({ author }).populate('author')
      }
      if (!args.author) {
        return await Book.find({ genres: args.genre }).populate('author')
      }
      return await Book.find({ author, genres: args.genre }).populate('author')
    },
    allAuthors: async () => {
      console.log('Author.find')
      return await Author.find({}).populate('books')
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    bookCount: (root) => root.books.length
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      let book = null
      let author = await Author.exists({ name: args.author })
      if (!author) {
        const _id = mongoose.Types.ObjectId();
        author = new Author({ name: args.author, born: null, books: [], bookCount: 1, id: _id })
        book = new Book({ ...args, author })
      } else {
        author = await Author.findOne({ name: args.author }).populate('books')
        book = new Book({ ...args, author })
      }
      author.books = author.books.concat(book._id)
      try {
        await book.save()
        await author.save()
        console.log(author, book)
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      })
      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  },
}

module.exports = resolvers