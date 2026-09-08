
const LoginForm = (props) => (
  <form onSubmit={props.handleLogin}>
    <div>
      <label>
        username
        <input
          type="text"
          value={props.username}
          onChange={({ target }) => props.setUsername(target.value)}
        />
      </label>
    </div>
    <div>
      <label>
        password
        <input
          type="password"
          value={props.password}
          onChange={({ target }) => props.setPassword(target.value)}
        />
      </label>
    </div>
    <button type="submit">login</button>
  </form>
)

const LoginStatus = (props) => (
    <div>
      <label>
        {props.name} logged in
        <button onClick={props.onClick}>logout</button>
      </label>
    </div>
)

// const BLogForm = (props) => (
//   <form onSubmit={props.addNote}>
//     <input value={props.newNote} onChange={props.handleNoteChange} />
//     <button type="submit">save</button>
//   </form>
// )
export { LoginForm, LoginStatus }