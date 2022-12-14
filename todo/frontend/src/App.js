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
import ProjectForm from "./components/ProjectForm";
import NoteForm from "./components/NoteForm";
import axios from "axios";
import {BrowserRouter, Route, Routes, Link} from "react-router-dom";
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
                {'nameItem':'Список заметок', 'hrefItem': 'notes/'}

            ],
            'users': [],
            'notes': [],
            'projects': [],
            'token': '',
            'username': ''
        }
    }

    logout(){
//    Чистим состояние при выходе
        this.set_token('')
        this.setState({'users': []})
        this.setState({'notes': []})
        this.setState({'projects': []})
    }

    is_auth(){
        return !!this.state.token
    }

    set_token(token){
//    Сохраняем в LocalStorage
//        localStorage.setItem('token', token)

//    Сохраняем в куки
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    get_token_storage(){
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, ()=> this.load_data())
    }

    get_token(username, password){
//        console.log(username, password)
//    Сохраняем имя пользователя в состоянии
        this.setState({'username': username})
        const data = {username: username, password: password}
        axios.post('http://127.0.0.1:8000/api-token-auth/', data).then(response => {
            this.set_token(response.data['token'])
        }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers(){
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_auth()){
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    load_data(){
        const headers = this.get_headers()
        axios.get(get_url('users/'), {headers}).then(response => {
//            console.log(response.data)
            this.setState({'users': response.data})
        }).catch(error => console.log(error))

        axios.get(get_url('notes/'), {headers}).then(response => {
//            console.log(response.data)
            this.setState({'notes': response.data.results})
        }).catch(error => console.log(error))

        axios.get(get_url('projects/'), {headers}).then(response => {
//            console.log(response.data)
            this.setState({'projects': response.data})
        }).catch(error => console.log(error))
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(get_url(`projects/${id}`), {headers})
        .then(response => {
        this.setState({projects: this.state.projects.filter((item)=>item.id !== id)})
        }).catch(error => console.log(error))
    }

    createProject(name, users_list){
        const headers = this.get_headers()
        const data = {
            name: name,
            users_list: users_list
        }
//        console.log(data)

        axios.post(get_url('projects/'), data, {headers}).then(response => {
            this.load_data()
        }).catch(error => {
            console.log(error);
            this.setState({projects:[]})
        })
    }

    deleteNote(id) {
        const headers = this.get_headers()
        axios.delete(get_url(`notes/${id}`), {headers})
        .then(response => {
        this.setState({notes: this.state.notes.filter((item)=>item.id !== id)})
        }).catch(error => console.log(error))
    }

    createNote(project, text, user) {
        const headers = this.get_headers()
        const data = {
            project: project,
            text: text,
            user: user
        }
        console.log(data)

        axios.post(get_url('notes/'), data, {headers}).then(response => {
            this.load_data()
        }).catch(error => {
            console.log(error);
            this.setState({notes:[]})
        })
    }

    componentDidMount() {
//        this.load_data()
        this.get_token_storage()
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <div className="content">
                        <Menu menuItems = {this.state.menuItems} />
                        <li>
                            {this.is_auth() ? <button onClick={() => this.logout()}>({this.state.username})  Выйти</button> : <Link to='/login'>Войти</Link>}
                        </li>
                        <Routes>
                            <Route exact path='/' element={<UserList users = {this.state.users} />} />

                            <Route exact path='/projects'>

                                <Route index exact path='/projects' element={<ProjectList projects = {this.state.projects}
                                    deleteProject = {(id) => this.deleteProject(id)} updateProject = {(id) => this.updateProject(id)} />} />

                                <Route path=':projectId' element={<ProjectDetail projects = {this.state.projects} />} />

                                <Route exact path='/projects/create' element={<ProjectForm users={this.state.users}
                                    createProject={(name, users_list) => this.createProject(name, users_list)}/>}/>

                            </Route>

                            <Route exact path='/notes' element={<NoteList notes = {this.state.notes} deleteNote = {(id) => this.deleteNote(id)} />} />
                            <Route exact path='/notes/create' element={<NoteForm projects={this.state.projects} users={this.state.users} createNote={(project, text, user) => this.createNote(project, text, user)}/>}/>
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
