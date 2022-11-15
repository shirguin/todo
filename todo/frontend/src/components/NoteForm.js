import React from 'react'
import {Link} from "react-router-dom";


class NoteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: 0,
            text: '',
            uset: 0,
            }
    }

    handleProjectChange(event){
        this.setState({
            'project': event.target.value
        })
    }

    handleTextChange(event) {
        this.setState({
            'text': event.target.value
        })
    }

    handleUserChange(event){
        this.setState({
            'user': event.target.value
        })
    }

    handleSubmit(event) {
        this.props.createNote(this.state.project, this.state.text, this.state.user)
        event.preventDefault();
    }

    render() {
        return(
            <div>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <label for="project">Название проекта</label>
                    <select name="project" onChange={(event) => this.handleProjectChange(event)}>
                        {this.props.projects.map((item) => <option value={item.id}> {item.name} </option>)}
                    </select>

                    <div>
                        <label for="text">Текст заметки</label>
                        <input type="text" name="text" value={this.state.text}
                                onChange={(event) => this.handleTextChange(event)}/>
                    </div>

                    <label for="user">Пользователь</label>
                    <select name="user" onChange={(event) => this.handleUserChange(event)}>
                        {this.props.users.map((item) => <option value={item.id}> {item.firstName} {item.lastName} </option>)}
                    </select>

                    <input type="submit" value="Сохранить"/>
                </form>
                <Link to='/notes'>Вернуться к списку заметок</Link>
            </div>
        );
    }

}

export default NoteForm