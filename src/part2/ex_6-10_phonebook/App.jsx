import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const initialPersonsData = [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]


const App = () => {
  const [persons, setPersons] = useState(initialPersonsData)
  const [newName, setNewName] = useState('')
  const [filterName, setFilterName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newId, setNewId] = useState(persons.length+1)

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: newId
    }
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
    setNewId(newId+1)
  }

  

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }
  const handleFilterInput = (event) => {
    setFilterName(event.target.value)
  }
  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        filterName={filterName}
        handleFilterInput={handleFilterInput}
      />
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameInput={handleNameInput}
        handleNumberInput={handleNumberInput}
        addPerson={addPerson}
      />


      <h2>Numbers</h2>
      <Persons 
        persons={persons}
        filterName={filterName}
      />


    </div>
  )
}

export default App