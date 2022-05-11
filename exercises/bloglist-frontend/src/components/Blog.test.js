import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Zawsze po pierwsze',
  author: 'Przemek K',
  url: 'zawszepopierwsze.pl',
  likes: 24234,
  user: {
    name: 'Superuser',
    username: 'root'
  }
}

test('renders blog title and author', () => {
  render(<Blog blog={blog} />)

  const title = screen.getByText('Zawsze po pierwsze', { exact: false })
  const author = screen.getByText('Przemek K', { exact: false })
  const url = screen.queryByText('zawszepopierwsze.pl', { exact: false })
  const likes = screen.queryByText('24234', { exact: false })
  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(url).toBeNull()
  expect(likes).toBeNull()
})

test('clicking the button shows likes and url', async () => {
  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const url = screen.getByText('zawszepopierwsze.pl', { exact: false })
  const likes = screen.getByText('likes 24234', { exact: false })
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})

test('clicking like button twice works', async () => {
  const mockHandler = jest.fn()

  render(<Blog blog={blog} addLike={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
