import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm handleSubmit={createBlog} user={{ username: 'root', name: 'Superuser' }} />)

  const titleInput = screen.getByPlaceholderText('title')
  const urlInput = screen.getByPlaceholderText('url')
  const authorInput = screen.getByPlaceholderText('author')
  const sendButton = screen.getByText('create')



  await user.type(titleInput, 'Czary i magia')
  await user.type(urlInput, 'czaryimag.ia')
  await user.type(authorInput, 'Waciej')
  await user.click(sendButton)


  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Czary i magia')
  expect(createBlog.mock.calls[0][0].url).toBe('czaryimag.ia')
  expect(createBlog.mock.calls[0][0].author).toBe('Waciej')
})