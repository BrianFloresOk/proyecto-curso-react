import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import useForm from "../../src/hooks/useForm";
import { useProjects } from "../../src/hooks/useProjects";
import { Alert } from "../Alert/Alert";

export const FormProject = () => {

    const { alert, showAlert, storeProject, project } = useProjects();

    const { id } = useParams();

    const inputName = useRef(null);
    const inputDescription = useRef(null);
    const inputClient = useRef(null);
    const inputDataExpire = useRef(null);

    useEffect(() => {
        if(id) {
            inputName.current.value = project.name
            inputDescription.current.value = project.description
            inputDataExpire.current.value = project.dataExpire.split("T")[0]
            inputClient.current.value = project.client

            setFormValues({
                name: project.name,
                description: project.description,
                client: project.client,
                dataExpire: project.dataExpire.split("T")[0]
            })
 
        };

    }, [id])

    const { formValues, handleInputChange, reset, setFormValues } = useForm({
        name: "",
        description: "",
        dataExpire: "",
        client: ""
    })

    let { name, description, dataExpire, client } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault()
        if ([name, description, dataExpire, client].includes("")) {
            showAlert("Todos los campos son obligatorios");
            return null
        };

        storeProject({
            id: id? id : null,
            name,
            description,
            dataExpire,
            client
        })
    }

    return (
        <form
            onSubmit={handleSubmit}
        >
            {
                alert.msg && <Alert {...alert} />
            }
            <div>
                <label
                    htmlFor="name"
                >
                    Nombre Proyecto
                </label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre del proyecto"
                    value={name}
                    onChange={handleInputChange}
                    name="name"
                    ref={inputName}
                />
            </div>
            <div >
                <label
                    htmlFor="description"
                >
                    Descripción
                </label>
                <textarea
                    id="description"
                    type="text"
                    style={{ resize: "none" }}
                    placeholder="Descripción del proyecto"
                    value={description}
                    onChange={handleInputChange}
                    name="description"
                    ref={inputDescription}
                />
            </div>
            <div >
                <label
                    htmlFor="data-expire"
                >
                    Fecha de entrega
                </label>
                <input
                    id="data-expire"
                    type="date"
                    value={dataExpire}
                    onChange={handleInputChange}
                    name="dataExpire"
                    ref={inputDataExpire}
                />
            </div>
            <div >
                <label
                    htmlFor="client"
                >
                    Nombre Cliente
                </label>
                <input
                    id="client"
                    type="text"
                    placeholder="Nombre del cliente"
                    value={client}
                    onChange={handleInputChange}
                    name="client"
                    ref={inputClient}
                />
            </div>
            <button>
                {id ? "Actualizar cambios" : "Guardar proyecto"}
            </button>
        </form>
    );
};