import React from "react";
import {Link} from "react-router-dom";

const ProjectItem = ({project, deleteProject}) =>{
    return(
        <tr>
            <td>{project.id}</td>
            <td>
                <Link to={`/projects/${project.id}`}>{project.name}</Link>
            </td>
            <td>{project.link_repository}</td>
            <td>{project.users_list}</td>
            <td><button onClick={()=>deleteProject(project.id)} type='button'>Удалить</button></td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {
    return(
        <table className="usersTable">
            <th>id</th>
            <th>Projectname</th>
            <th>Repository</th>
            <th>Users</th>
            <th></th>
            {projects.map((project_) => <ProjectItem project = {project_} deleteProject = {deleteProject}/>)}
        </table>
    )
}

export default ProjectList