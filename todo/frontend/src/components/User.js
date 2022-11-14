import React from "react";


const UserItem = ({user}) =>{
    return(
        <tr>
            <td>{user.username}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
        </tr>
    )
}

const UserList = ({users}) => {
    return(
        <table className="usersTable">
            <th>Username</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            {users.map((user_) => <UserItem user = {user_} />)}
        </table>

    )
}

export default UserList