import { vote } from "../reducers/anecdoteReducer";
import { useDispatch, useSelector } from "react-redux";
import { setNotificaton, removeNotification } from "../reducers/notificationReducer";

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

  const handleVote = (id, content) => {
    dispatch(vote(id))
    dispatch(setNotificaton(content))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }
  return (
    <div>

      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => handleVote(anecdote.id, anecdote.content)}
        />
      )}
    </div>
  )
}

export default AnecdoteList