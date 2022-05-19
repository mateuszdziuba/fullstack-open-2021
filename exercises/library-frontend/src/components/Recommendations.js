import { useQuery, useLazyQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ME, BOOKS_BY_GENRE } from '../queries'

const Recommendations = ({ show, token }) => {
  const [genre, setGenre] = useState(null)
  const [getUser, { loading, data }] = useLazyQuery(ME)
  

  const [getBooks, { loading: booksLoading, data: booksData }] = useLazyQuery(BOOKS_BY_GENRE)

  useEffect(() => {
    const waitForUser = async () => {
      if (token) {
        console.log(token)
        await getUser()
        console.log(data)
        if (!loading && data) {
          setGenre(data.me.favouriteGenre)
          await getBooks({ variables: { genre: data.me.favouriteGenre } })
        }
    }
  }
  waitForUser()
  }, [token, loading, data])

  if (!show) {
    return null
  }

  if (booksLoading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{genre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksData &&
            booksData.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
