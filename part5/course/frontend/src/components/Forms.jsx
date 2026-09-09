import { useState } from 'react'

const LoginForm = ({
    handleLogin,
  }) => {
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('') 

    const handleSubmit = (event) => {
      event.preventDefault()
      console.log('logging in with', username, password)
      handleLogin({username, password})
      setUsername('')
      setPassword('')
    }
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    )
  }

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')
  const addNote = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: true
    })

    setNewNote('')
  }
  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={event => setNewNote(event.target.value)}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}
export { LoginForm, NoteForm }