
const ShowPerson = ({person, deleteHandler}) => {
    console.log(person)
    return ( 
        <p> {person.name} {person.number} {' '}
        <button onClick={deleteHandler}> delete </button> 
        </p>
    )
}


const Persons = (props) => {
    const personsShow = props.persons.filter(
        (person) => person.name.toLowerCase().includes(props.filterName.toLowerCase())
    )
    return (
        <div>
            {personsShow.map(person => 
            <ShowPerson 
                key={person.id} 
                person={person} 
                deleteHandler={() => props.deleteHandler(person)}
            />)}
        </div>
    )
}

export default Persons