import React, { useEffect } from 'react';
import { useProjects } from '../src/hooks/useProjects';
import { ProjectPreview } from "../components/ProjectPreview/ProjectPreview"


export const Projects = () => {
    const { loading, alert, projects, getProjects } = useProjects()

    useEffect(() => {
        getProjects()
    }, [])

    return (
        <>
            <h1>
                Proyectos
            </h1>
            <div>
                {
                    loading
                        ?
                        <p>Cargando...</p>
                        :
                        projects.length
                            ?
                            projects.map(project => <ProjectPreview key={project._id} {...project} />)
                            :
                            <p>No hay proyectos agregados</p>
                }
            </div>
        </>
    )
}