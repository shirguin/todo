import './App.css';
import React from "react";
import Menu from "./components/Menu";
import UserList from "./components/User";
import NoteList from "./components/Note";
import ProjectList from "./components/Project";
import Footer from "./components/Footer";
import axios from "axios";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'menuItems': [],
            'users': [],
            'notes': [],
            'projects': [],
        }
    }

    componentDidMount() {

        axios.get('http://127.0.0.1:8000/users/').then(response => {
            this.setState({
                'users': response.data
            })
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/notes/').then(response => {
            this.setState({
                'notes': response.data
            })
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/projects/').then(response => {
            this.setState({
                'projects': response.data
            })
        }).catch(error => console.log(error))

        const menuItems = [
            {'nameItem':'Главная',
             'hrefItem': '#'
            },
              {'nameItem':'Список пользователей',
             'hrefItem': '#'
            },
              {'nameItem':'Список заметок',
             'hrefItem': '#'
            },
              {'nameItem':'Список проектов',
             'hrefItem': '#'
            }
        ]

        this.setState({
        'menuItems': menuItems
        })
    }

    render() {
        return (
            <div className="App">
                <div className="content">
                    <Menu menuItems = {this.state.menuItems} />
                    <UserList users = {this.state.users} />
                    <NoteList notes = {this.state.notes} />
                    <ProjectList projects = {this.state.projects} />
                </div>
                <Footer/>
            </div>
            )
    }
}

export default App;
