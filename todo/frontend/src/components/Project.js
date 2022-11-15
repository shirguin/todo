import React from "react";
import {Link} from "react-router-dom";

const ProjectItem = ({project, deleteProject, updateProject}) =>{
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

const ProjectList = ({projects, deleteProject, updateProject}) => {
    return(
        <div>
            <table className="usersTable">
                <th>id</th>
                <th>Projectname</th>
                <th>Repository</th>
                <th>Users</th>
                <th></th>
                {projects.map((project_) => <ProjectItem project = {project_} deleteProject = {deleteProject} updateProject = {updateProject}/>)}
            </table>
            <Link to='/projects/create'>Создать новый проект</Link>
        </div>

    )
}

export default ProjectList