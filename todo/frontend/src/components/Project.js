import React from "react";


const ProjectItem = ({project}) =>{
    return(
        <tr>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.link_repository}</td>
            <td>{project.users_list}</td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return(
        <table className="usersTable">
            <th>id</th>
            <th>Projectname</th>
            <th>Repository</th>
            <th>Users</th>
            {projects.map((project_) => <ProjectItem project = {project_} />)}
        </table>
    )
}

export default ProjectList