import React, { createContext, useState } from "react";
import { clientAxios } from "../config/clientAxios";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
    const navigate = useNavigate();

    const [projects, setProjects] = useState([])
    const [project, setProject] = useState([])
    const [alert, setAlert] = useState({})
    const [loading, setLoading] = useState(true);

    const showAlert = (msg, time = true) => {
        setAlert({
            msg
        })

        if (time) {
            setTimeout(() => {
                setAlert({})
            }, 3000);
        }
    };

    const getProjects = async () => {
        setLoading(true)
        try {
            const token = sessionStorage.getItem("token");

            if (!token) return null;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            }

            const { data } = await clientAxios.get(`/project`, config);
            setProjects(data.projects)

        } catch (error) {
            console.log(error)
            showAlert(error.response ? error.response.data.msg : "Upps.. Ocurrió un error", false)
        } finally {
            setLoading(false)
        }
    }

    const getProject = async (id) => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) return null;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            }

            const { data } = await clientAxios.get(`/project/${id}`, config);
            setProject(data.project)

        } catch (error) {
            console.log(error)
            showAlert(error.response ? error.response.data.msg : "Upps.. Ocurrió un error", false)
        } finally {
            setLoading(false)
        }
    };

    const storeProject = async (project) => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) return null;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            }
            /* En caso de que se actualize el proyecto entra en el IF */
            if (project.id) {
                const { data } = await clientAxios.put(`/project/${project.id}`, project, config);

                const projectUpdated = projects.map(projectState => {
                    if (projectState._id === data.project._id) {
                        return data.project
                    }
                    return projectState
                });

                setProjects(projectUpdated)

                Toast.fire({
                    icon: "success",
                    title: data.msg
                });

            } else {
                const { data } = await clientAxios.post(`/project`, project, config);
                setProjects([...projects, data.project]);

                Toast.fire({
                    icon: "success",
                    title: data.msg
                });
            }

            navigate("projects")

        } catch (error) {
            console.log(error)
            showAlert(error.response ? error.response.data.msg : "Upps.. Ocurrió un error", false)
        }
    };

    const deleteProject = async (id) => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) return null;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            }

            const { data } = await clientAxios.delete(`/project/${id}`, config)

            const projectFiltered = projects.filter(project => project._id !== id)

            setProjects(projectFiltered)

            Toast.fire({
                icon: "success",
                title: data.msg
            });

            navigate("projects")

        } catch (error) {
            console.log(error)
            showAlert(error.response ? error.response.data.msg : "Upps.. Ocurrió un error", false)
        }
    }


    return (
        <ProjectsContext.Provider
            value={{
                loading,
                alert,
                showAlert,
                projects,
                getProjects,
                project,
                getProject,
                storeProject,
                deleteProject
            }}
        >

            {children}

        </ProjectsContext.Provider>
    )
};

export {
    ProjectsProvider
}

export default ProjectsContext;