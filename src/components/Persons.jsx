
const ShowPerson = ({name, number}) => <p>{name} {number}</p>

const Persons = (props) => {
    const personsShow = props.persons.filter(
        (person) => person.name.toLowerCase().includes(props.filterName.toLowerCase())
    )
    return (
        <div>
            {personsShow.map(person => 
            <ShowPerson key={person.id} name={person.name} number={person.number} />)}
        </div>
    )
}

export default Persons