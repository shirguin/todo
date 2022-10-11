import React from "react";
import {useParams} from "react-router-dom";

const ProjectDetail = ({projects}) => {
    let { id } = useParams();
    console.log(id)
    let filter_project = projects.filter((project) => project.id === id)
    return(
        <div>
            <h1>Название проекта: {filter_project.name}</h1>
            <div>ID Проекта: {filter_project.id}</div>
            <div>Репозиторий проекта: {filter_project.link_repository}</div>
            <div>Участники проекта: {filter_project.users_list}</div>
        </div>
    )
}

export default ProjectDetail