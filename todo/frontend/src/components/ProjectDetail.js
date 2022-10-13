import React from "react";
import {useParams} from "react-router-dom";

const ProjectDetail = ({projects}) => {
    let { projectId } = useParams();
//    console.log(projectId);
    let projectDetail = projects.filter((project) => project.id === parseInt(projectId))[0];
//    console.log(projectDetail);
    return(
        <div>
            <h1>Название проекта: {projectDetail.name}</h1>
            <div>ID Проекта: {projectDetail.id}</div>
            <div>Репозиторий проекта: {projectDetail.link_repository}</div>
            <div>Участники проекта: {projectDetail.users_list}</div>
        </div>
    )
}

export default ProjectDetail