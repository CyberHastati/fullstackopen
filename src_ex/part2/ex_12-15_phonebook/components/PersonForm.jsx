
const PersonForm = (props) =>
      <form onSubmit={props.addPerson}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameInput}/>
        </div>
        <div>
          number: <input value={props.newNumber} onChange={props.handleNumberInput}/>
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>



export default PersonForm