import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Collaborator } from "../components/Collaborator/Collaborator";
import { Task } from "../components/Task/Task";
import { useProjects } from "../src/hooks/useProjects";
import { Alert } from "../components/Alert/Alert" 


export const Project = () => {
    const {id} = useParams()
    const { loading, alert, getProject, project } = useProjects()
    const { name, description, dataExpire, client, _id } = project

    useEffect(() => {
        getProject(id)
    }, [id])

if(alert.msg) return <Alert {...alert}/>

    return (
        <>
            {
                loading ?
                    (
                        <p> Cargando...</p >
                    )
                    : (
                        <>
                            <div>
                                <h1>{name}</h1>
                                <Link
                                    to={`/projects/edit-project/${_id}`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                        />
                                    </svg>
                                    <p>Editar</p>
                                </Link>
                            </div>
                            <h2>{client}</h2>
                            <hr />
                            <h2>Fecha de entrega: {dataExpire && dataExpire.split("T")[0]}</h2>
                            <p>{description}</p>
                            <div>
                                <p>Tareas del proyecto</p>
                                <div
                                /*  onClick={handleModalForm} */
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 4.5v15m7.5-7.5h-15"
                                        />
                                    </svg>
                                    <p>Nueva Tarea</p>
                                </div>
                            </div>
                            {
                                [1, 2].map((task, i) => (
                                    <Task key={task + i}/>
                                ))
                            }
                            <div>
                                <p>Colaboradores</p>

                                <button
                                /* onClick={handleModalAddCollaborator} */
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                                        />
                                    </svg>

                                    <p>Agregar Colaborador</p>
                                </button>
                            </div>
                            {
                                [1, 2].map((collaborator, i) => (
                                    <Collaborator key={collaborator + i}/>
                                ))
                            }
                        </>
                    )
            }

        </>
    );
};