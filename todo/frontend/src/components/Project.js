import React from "react";
import {Link} from "react-router-dom";

const ProjectItem = ({project}) =>{
    return(
        <tr>
            <td>{project.id}</td>
            <td>
                <Link to={`/projects/${project.id}`}>{project.name}</Link>
            </td>
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