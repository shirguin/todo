import React from 'react'
import {Link} from "react-router-dom";


class ProjectUpdateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            users_list: []
            }
    }

    handleNameChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleUserChange(event){
        if (!event.target.selectedOptions){
            this.setState({
                'users_list': []
            })
            return;
        }

        let users_list = [];
        for (let i=0; i < event.target.selectedOptions.length; i++) {
            users_list.push(event.target.selectedOptions.item(i).value)
        }

        this.setState({
            'users_list': users_list
        })

    }

    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.users_list)
        event.preventDefault();
    }

    render() {
        return(
            <div>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div>
                        <label for="name">Название проекта</label>
                        <input type="text" name="name" value={this.state.name}
                            onChange={(event) => this.handleNameChange(event)}/>
                    </div>

                    <label for="user_list">Участники проекта</label>
                    <select name="users_list" multiple onChange={(event) => this.handleUserChange(event)}>
                        {this.props.users.map((item) => <option value={item.id}> {item.firstName} {item.lastName} </option>)}
                    </select>

                    <input type="submit" value="Сохранить"/>
                </form>
                <Link to='/projects'>Вернуться к списку проектов</Link>
            </div>
        );
    }

}

export default ProjectUpdateForm