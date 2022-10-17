import './App.css';
import React from "react";
import Menu from "./components/Menu";
import UserList from "./components/User";
import NoteList from "./components/Note";
import ProjectList from "./components/Project";
import Footer from "./components/Footer";
import NotFound404 from "./components/NotFound404";
import ProjectDetail from "./components/ProjectDetail";
import LoginForm from "./components/Auth";
import axios from "axios";
import {BrowserRouter, Route, Routes, Link, Navigate} from "react-router-dom";
import Cookies from "universal-cookie";


const DOMAIN = 'http://127.0.0.1:8000/'
const get_url = (url) => `${DOMAIN}${url}`

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'menuItems': [
                {'nameItem':'Главная', 'hrefItem': '#'},
                {'nameItem':'Список пользователей', 'hrefItem': '/'},
                {'nameItem':'Список проектов', 'hrefItem': 'projects/'},
                {'nameItem':'Список заметок', 'hrefItem': 'notes/'},
                {'nameItem':'Login', 'hrefItem': 'login/'}
            ],
            'users': [],
            'notes': [],
            'projects': [],
            'token': ''
        }
    }

    logout(){

    }

    is_auth(){

    }

    set_token(token){
//        localStorage.setItem('token', token)
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setStage({'token': token}, () => this.load_data())
    }

    get_token_storage(){

    }

    get_token(username, password){
//        console.log(username, password)
        const data = {username: username, password: password}
        axios.post('http://127.0.0.1:8000/api-token-auth/', data).then(response => {
            this.set_token(response.data['token'])
        }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers(){

    }

    load_data(){
        axios.get(get_url('users/')).then(response => {
//            console.log(response.data)
            this.setState({'users': response.data})
        }).catch(error => console.log(error))

        axios.get(get_url('notes/')).then(response => {
//            console.log(response.data)
            this.setState({'notes': response.data.results})
        }).catch(error => console.log(error))

        axios.get(get_url('projects/')).then(response => {
//            console.log(response.data)
            this.setState({'projects': response.data.results})
        }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.load_data()
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <div className="content">
                        <Menu menuItems = {this.state.menuItems} />
                        <Routes>
                            <Route exact path='/' element={<UserList users = {this.state.users} />} />

                            <Route exact path='/projects'>
                                <Route index exact path='/projects' element={<ProjectList projects = {this.state.projects} />} />
                                <Route path=':projectId' element={<ProjectDetail projects = {this.state.projects} />} />
                            </Route>

                            <Route exact path='/notes' element={<NoteList notes = {this.state.notes} />} />
                            <Route exact path='/login' element={<LoginForm get_token = {(username, password) => this.get_token(username, password)} />} />

                            <Route path='*' element={<NotFound404/>}/>
                        </Routes>
                    </div>
                    <Footer/>
                </div>
            </BrowserRouter>
            )
    }
}

export default App;
