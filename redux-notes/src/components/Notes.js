// import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

const Note = ({ note, handleClick }) => {
  return (
    <li
      key={note.id}
      onClick={handleClick}
    >
      {note.content}
      <strong> {note.important ? 'important' : ''}</strong>
    </li>
  )
}

const Notes = (props) => {
  // const dispatch = useDispatch()
  // const notes = useSelector(state => {
  //   if (state.filter === 'ALL') {
  //     return state.notes
  //   }
  //   return state.filter === 'IMPORTANT' ? 
  //     state.notes.filter(note => note.important) :
  //     state.notes.filter(note => !note.important)
  // })



  return (
    <ul>
      {props.notes.map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={() => props.toggleImportanceOf(note.id)}
        />
      )}
    </ul>
  )
}

const mapStateToProps = (state) => {
  if (state.filter === 'ALL') {
    return {
      notes: state.notes
    }
  }

  return {
    notes: state.filter === 'IMPORTANT'
      ? state.notes.filter(note => note.important)
      : state.notes.filter(note => !note.important)
  }
}

const mapDispatchToProps = {
  toggleImportanceOf,
}
// export default Notes
const ConnectedNotes = connect(mapStateToProps, mapDispatchToProps)(Notes)
export default ConnectedNotes