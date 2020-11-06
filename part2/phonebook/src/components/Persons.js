import React from 'react'

const Persons = ({ filteredList, deletePerson }) => {


    return (
        <div>
            <h2>Numbers</h2>
            <ul>
                {filteredList.map((person, i) =>
                    <li key={i} >{person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button></li>
                    
                )}
            </ul>
        </div>
    )
}

export default Persons