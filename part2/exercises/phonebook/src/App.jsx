import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notifications'

const App = () => {

  const [persons, setPersons] = useState(null)
  const [newName, setNewName] = useState('')
  const [filterName, setFilterName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notifyMessage, setNotifyMessage] = useState(null)

  const hook = () => {
    personService.getAll()
      .then(responseData => {
        setPersons(responseData)
      }
    )
  }
  useEffect(hook, [])
  if (!persons) { 
    return null 
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    const foundPerson = persons.find(person => person.name === newName)
    if (foundPerson) {
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (result) {
        personService.update(foundPerson.id, newPerson)
          .then(responseData => {
            setPersons(persons.map(person => 
                person.id === responseData.id ? responseData : person))
            setNotifyMessage({message: `Added ${newName}`, type: 'success'})
            setTimeout(() => {
                      setNotifyMessage(null)
                    }, 5000)
            setNewName('')
            setNewNumber('')
          }
        ).catch(error => {
            console.log(error)
            if(error.response?.status === 404) {
              setNotifyMessage(
                {message: `Information of ${newName} has already been removed from server`, 
                type: 'failure'}
              )
              setTimeout(() => {
                setNotifyMessage(null)
              }, 5000)
              setPersons(persons.filter(person => person.name != newName))
            }
          }
        )
      }
      return
    }
    personService.create(newPerson)
      .then(responseData => {
          setPersons(persons.concat(responseData))
          setNotifyMessage({message: `Added ${newName}`, type: 'success'})
          setTimeout( () => {
                    setNotifyMessage(null)
                  }, 5000)
          setNewName('')
          setNewNumber('')
        }
      ).catch(error => {
            console.log(error)
            if(error.response?.status === 404) {
              alert('Something went wrong')
            } else {

            }
          }
        )
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
  const handlePersonDelete = (delperson) => {
    const result = window.confirm(`Delete ${delperson.name}?`)
    if (result) personService.del(delperson.id).then(() => {
      setPersons(persons.filter(person => person.id != delperson.id))
    })
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifyMessage}/>
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
        deleteHandler={handlePersonDelete}
      />


    </div>
  )
}

export default App