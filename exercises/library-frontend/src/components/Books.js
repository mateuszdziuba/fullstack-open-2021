import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS, BOOKS_BY_GENRE } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS)
  const resultByGenre = useQuery(BOOKS_BY_GENRE, {
    variables: {
      genre
    }
    // pollInterval: 2000
  })

  const changeGenre = (g) => {
    setGenre(g)
  }

  if (!props.show) {
    return null
  }

  if (resultByGenre.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>
      {genre && (
        <p>
          in genre <strong>{genre}</strong>
        </p>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {resultByGenre.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {[...new Set(result.data.allBooks.reduce((a, b) => a.concat(b.genres), []))].map((g) => (
        <button key={g} onClick={() => changeGenre(g)}>
          {g}
        </button>
      ))}
    </div>
  )
}

export default Books
