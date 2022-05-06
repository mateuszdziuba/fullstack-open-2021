const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)
  expect(titles).toContain('React patterns')
})

test('a valid blog can be added', async () => {
  const usersAtStart = await helper.usersInDb()


  const newUser = {
    username: "root1",
    password: "1toor",
    name: "superuser2"
  }


  const loginUser =
  {
    username: "root1",
    password: "1toor"
  }

  await api
    .post('/api/users')
    .send(newUser)

  const user = await api
    .post('/api/login')
    .send(loginUser)


  const newBlog = {
    title: 'PHentaiP',
    author: 'Mikołaj Tarkowski',
    url: 'http://phent.ai',
    likes: 69
  }


  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${user.body.token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(r => r.title)
  expect(titles).toContain('PHentaiP')
})

test('identifier property is id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined();
})

test('likes property gets added if missing', async () => {
  const newBlog = {
    title: 'Newest techs',
    author: 'Marek Rozwarty',
    url: 'http://newesttechs.com',
  }

  const newUser = {
    username: "root1",
    password: "1toor",
    name: "superuser2"
  }


  const loginUser =
  {
    username: "root1",
    password: "1toor"
  }

  await api
    .post('/api/users')
    .send(newUser)

  const user = await api
    .post('/api/login')
    .send(loginUser)




  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${user.body.token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.at(-1).likes).toEqual(0)
})

test('returns status code 400 if title and url are missing', async () => {
  const newBlog = {
    author: "Sid Papaja"
  }

  const newUser = {
    username: "root1",
    password: "1toor",
    name: "superuser2"
  }


  const loginUser =
  {
    username: "root1",
    password: "1toor"
  }

  await api
    .post('/api/users')
    .send(newUser)

  const user = await api
    .post('/api/login')
    .send(loginUser)


  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${user.body.token}`)
    .send(newBlog)
    .expect(400)
})

test('blog can be deleted', async () => {

  const newUser = {
    username: "root1",
    password: "1toor",
    name: "superuser2"
  }

  const loginUser =
  {
    username: "root1",
    password: "1toor"
  }

  await api
    .post('/api/users')
    .send(newUser)

  const user = await api
    .post('/api/login')
    .send(loginUser)

  const newBlog = {
    title: 'PHentaiP',
    author: 'Mikołaj Tarkowski',
    url: 'http://phent.ai',
    likes: 69
  }


  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${user.body.token}`)
    .send(newBlog)

  const blogsNow = await helper.blogsInDb()
  const blogToDelete = blogsNow.at(-1)

  const result = await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `bearer ${user.body.token}`)
    .expect(204)

  console.log(result)


  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(blogsNow.length - 1)

  const titles = blogsAtEnd.map(t => t.title)
  expect(titles).not.toContain(blogToDelete.title)
})

test('blog likes can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updatedBlog = {
    likes: 15
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd[0].likes).toEqual(15)


})

test('blog cannot be added without authorization token', async () => {
  const newBlog = {
    title: 'PHentaiP',
    author: 'Mikołaj Tarkowski',
    url: 'http://phent.ai',
    likes: 69
  }


  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer 2342')
    .send(newBlog)
    .expect(401)
})

describe('user tests', () => {

  test('username must be unique', async () => {
    const usersAtStart = await helper.usersInDb()

    const duplicateUser = usersAtStart[0]

    const result = await api
      .post('/api/users')
      .send(duplicateUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('username must be atleast 3 characters long', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mi',
      password: 'ada'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('password must be atleast 3 characters long', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mias',
      password: 'ad'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain("password must be at least 3 characters long")

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('username is required', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'mias',
      password: 'ad'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('password is required', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mias',
      name: "Mia"
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain("password is required")

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

afterAll(() => {
  mongoose.connection.close()
})