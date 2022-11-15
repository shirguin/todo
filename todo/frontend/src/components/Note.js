import React from "react";
import {Link} from "react-router-dom";


const NoteItem = ({note, deleteNote}) =>{
    return(
        <tr>
            <td>{note.id}</td>
            <td>{note.project}</td>
            <td>{note.text}</td>
            <td>{note.create_date}</td>
            <td>{note.update_date}</td>
            <td><button onClick={()=>deleteNote(note.id)} type='button'>Удалить</button></td>
        </tr>
    )
}

const NoteList = ({notes, deleteNote}) => {
    return(
        <div>
            <table className="usersTable">
                <th>id</th>
                <th>Project name</th>
                <th>Text</th>
                <th>Created</th>
                <th>Updated</th>
                <th></th>
                {notes.map((note_) => <NoteItem note = {note_} deleteNote = {deleteNote}/>)}
            </table>
            <Link to='/notes/create'>Создать новую заметку</Link>
        </div>
    )
}

export default NoteList