import './App.css';
import React from "react";
import UserList from "./components/User";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import axios from "axios";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users':[],
            'menuItems': []
        }
    }

    componentDidMount() {

        axios.get('http://127.0.0.1:8000/users/').then(response => {
            this.setState({
                'users': response.data
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
                </div>
                <Footer/>
            </div>
            )
    }
}

export default App;
