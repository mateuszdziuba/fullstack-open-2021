import { vote } from "../reducers/anecdoteReducer";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state =>
    state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
  )
  const dispatch = useDispatch()

  const handleVote = (id, content, votes) => {
    dispatch(vote(id, content, votes))
    dispatch(setNotification(`you voted '${content}'`, 5))
  }
  return (
    <div>

      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => handleVote(anecdote.id, anecdote.content, anecdote.votes)}
        />
      )}
    </div>
  )
}

export default AnecdoteList