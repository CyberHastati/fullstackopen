import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [filterName, setFilterName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newId, setNewId] = useState(1)

  const hook = () => {
    const url = 'http://localhost:3001/persons'
    console.log('read initial persons from db')
    axios
      .get(url)
      .then(response => {
        setPersons(response.data)
        setNewId(newId+response.data.length)
      }
    )
  }
  useEffect(hook, [])

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
      <h2>add a new</h2>
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