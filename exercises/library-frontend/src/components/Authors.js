import { gql, useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000,
  })
  const [editAuthor] = useMutation(EDIT_AUTHOR)

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, setBornTo: born } })

    setName('')
    setBorn('')
  }

  const handleChange = (e) => {
    setName(e.target.value)
  }

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          {/* <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          /> */}
          <select value={name} onChange={handleChange}>
            {result.data.allAuthors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
