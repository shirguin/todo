import React from "react";


const NoteItem = ({note}) =>{
    return(
        <tr>
            <td>{note.id}</td>
            <td>{note.project.name}</td>
            <td>{note.text}</td>
            <td>{note.create_date}</td>
            <td>{note.update_date}</td>
        </tr>
    )
}

const NoteList = ({notes}) => {
    return(
        <table className="usersTable">

            <th>id</th>
            <th>Project name</th>
            <th>Text</th>
            <th>Created</th>
            <th>Updated</th>
            {notes.map((note_) => <NoteItem note = {note_} />)}
        </table>

    )
}

export default NoteList