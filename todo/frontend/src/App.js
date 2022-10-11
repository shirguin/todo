import './App.css';
import React from "react";
import Menu from "./components/Menu";
import UserList from "./components/User";
import NoteList from "./components/Note";
import ProjectList from "./components/Project";
import Footer from "./components/Footer";
import NotFound404 from "./components/NotFound404";
import axios from "axios";
import {BrowserRouter, Route, Routes, Link, Navigate} from "react-router-dom";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
//            'menuItems': [],
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

//        const menuItems = [
//            {'nameItem':'Главная',
//             'hrefItem': '#'
//            },
//              {'nameItem':'Список пользователей',
//             'hrefItem': '#'
//            },
//              {'nameItem':'Список заметок',
//             'hrefItem': '#'
//            },
//              {'nameItem':'Список проектов',
//             'hrefItem': '#'
//            }
//        ]
//
//        this.setState({
//        'menuItems': menuItems
//        })
    }
//                    <Menu menuItems = {this.state.menuItems} />
//                            <Route exact path='/projects' element={<ProjectList projects = {this.state.projects} />} />
    render() {
        return (
            <div className="App">
                <div className="content">
                    <BrowserRouter>
                        <nav>
                            <li>
                                <Link to="/">Users</Link>
                            </li>
                            <li>
                                <Link to="/projects/">Projects</Link>
                            </li>
                            <li>
                                <Link to="/notes/">Notes</Link>
                            </li>

                        </nav>
                        <Routes>
                            <Route exact path='/' element={<UserList users = {this.state.users} />} />
                            <Route exact path='/projects' element={<ProjectList projects = {this.state.projects} />} />
                            <Route exact path='/notes' element={<NoteList notes = {this.state.notes} />} />


                            <Route path='*' element={<NotFound404/>}/>
                        </Routes>
                    </BrowserRouter>
                </div>
                <Footer/>
            </div>
            )
    }
}

export default App;
