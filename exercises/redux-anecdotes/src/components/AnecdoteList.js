import { vote } from "../reducers/anecdoteReducer";
import { useDispatch, useSelector } from "react-redux";

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
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  return (
    <div>

      <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
          <Anecdote 
            key={anecdote.id}
            anecdote={anecdote}
            handleVote={() => dispatch(vote(anecdote.id))}
          />
        )}
    </div>
  )
}

export default AnecdoteList