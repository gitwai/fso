import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons  from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personsServices from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [message, setMessage] = useState({})
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    useEffect(() => {
       personsServices
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const popMessage = (messageObject) => {
        setMessage(messageObject)
        setTimeout( () => setMessage({}), 5000)
    }

    const addOrUpdatePerson = (event) => {
        event.preventDefault()
        const found = persons.find(person => person.name === newName)
        if (found && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
            const updatedPerson = { ...found, number: newNumber}
            personsServices
                .put(updatedPerson)
                .then(returnedPerson => {
                    const messageObject = {
                        content: `Changed ${returnedPerson.name}'s number`,
                        isError: false }
                    popMessage(messageObject)
                    setPersons(persons.map( person => person.id !== returnedPerson.id ? person : returnedPerson))
                    setNewName('')
                    setNewNumber('')
                })
                .catch(err => {
                    const messageObject = {
                        content: `Information of ${updatedPerson.name} has already been removed from server`,
                        isError: true }
                    popMessage(messageObject)
                    setPersons(persons.filter( person => person.id !== updatedPerson.id))
                })
        }
        else {
            const personObject = {
                name: newName,
                number: newNumber,
            }
            personsServices
                .create(personObject)
                .then(returnedPerson => {
                    const messageObject = {
                        content: `Added ${returnedPerson.name}`,
                        isError: false }
                    popMessage(messageObject)
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                })
        }
    }

    const deletePerson = ({ id, name }) => {
        if(window.confirm(`Cofirm deleting ${name}?`)) {
           personsServices
                .remove(id)
                .then( res => {
                    setPersons(persons.filter( person => person.id !== id))
                    const messageObject = {
                        content: `Deleted ${name}`,
                        isError: false
                    }
                    popMessage(messageObject)
                })
                .catch( err => {
                    const messageObject = {
                        content: `Information of ${name} has already been removed from server`,
                        isError: true }
                    popMessage(messageObject)
                    setPersons(persons.filter( person => person.id !== id))
                })
        }}

    const updateNewName = (event) => setNewName(event.target.value)
    const updateNewNumber = (event) => setNewNumber(event.target.value)
    const updateFilter = (event) => setFilter(event.target.value)

    const filteredPerson = !filter
        ? persons
        : persons.filter(person => person.name.match(new RegExp(filter,"i")))

    return (
        <div>
        <h2>Phonebook</h2>
        <Notification message={message} />
        <Filter value={filter} onChange={updateFilter} />
        <h3>Add a new</h3>
        <PersonForm 
            onSubmit={addOrUpdatePerson}
            nameValue={newName}
            onNameChange={updateNewName}
            numberValue={newNumber}
            onNumberChange={updateNewNumber} />
        <h2>Numbers</h2>
        <Persons persons={filteredPerson} onDelete={deletePerson} />
        </div>
    )
}

export default App
