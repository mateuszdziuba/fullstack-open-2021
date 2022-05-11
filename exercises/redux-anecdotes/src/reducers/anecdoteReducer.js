import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'ADD_ANECDOTE':
//       return [...state, action.data]
//     case 'ADD_VOTE': {
//       const id = action.data.id
//       const anecdoteToVote = state.find(a => a.id === id)
//       const anecdoteVoted = {
//         ...anecdoteToVote,
//         votes: anecdoteToVote.votes + 1
//       }
//       return state.map(a =>
//         a.id !== id ? a : anecdoteVoted
//       ).sort((a, b) => b.votes - a.votes)
//     }
//     default:
//       return state
//   }
// }

// export default reducer

// export const vote = (id) => {
//   return {
//     type: 'ADD_VOTE',
//     data: { id }
//   }
// }

// export const createAnecdote = (content) => {
//   return {
//     type: 'ADD_ANECDOTE',
//     data: {
//       content,
//       id: getId(),
//       votes: 0
//     }
//   }
// }

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    modifyAnecdote(state, action) {
      const object = action.payload;

      return state
        .map((anecdote) => (anecdote.id !== object.id ? anecdote : object))
        .sort((a, b) => b.votes - a.votes);
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload.sort((a, b) => b.votes - a.votes);
    },
  },
});

export const { modifyAnecdote, setAnecdotes, appendAnecdote } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const vote = (id, content, votes) => {
  return async (dispatch) => {
    const newObject = { content, votes: votes + 1 };
    const anecdoteVoted = await anecdoteService.addVote(id, newObject);
    dispatch(modifyAnecdote(anecdoteVoted));
  };
};

export default anecdoteSlice.reducer;
