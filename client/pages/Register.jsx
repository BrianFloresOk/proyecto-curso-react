import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "../components/Alert/Alert";
import useForm from "../src/hooks/useForm";
import { clientAxios } from "../src/config/clientAxios";
import Swal from 'sweetalert2';

const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}/;

function Register() {
    const [alert, setAlert] = useState({});
    const [sending, setSending] = useState(false)

    const { formValues, setFormValues, handleInputChange, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password2: "",
    });

    const { name, email, password, password2 } = formValues;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if ([name, email, password, password2].includes("")) {
            handleShowAlert("*Todos los campos son obligatorios!!")
            return null
        };

        if (!exRegEmail.test(email)) {
            handleShowAlert("El formato de email no es válido")
            return null
        };

        if (password !== password2) {
            handleShowAlert("Las contraseñas no coinciden")
            return null
        };

        try {
            setSending(true)

            const { data } = await clientAxios.post('/auth/register', {
                name,
                email,
                password
            })

            setSending(false)

            console.log(data.msg);

            Swal.fire({
                icon: "info",
                title: "Gracias por registrarte",
                text: data.msg
            });

            reset()

        } catch (error) {
            console.error(error);
            handleShowAlert(error.response?.data.msg)
            reset()
        }
    };


    const handleShowAlert = (msg) => {
        setAlert({
            msg
        });
        setTimeout(() => {
            setAlert({})
        }, 2000)
    }

    return (
        <div className="w-1/2 translate-x-1/2 mt-5">
            <h1
                className="text-gray-900 font-black text-3xl capitalize text-center"
            >Creá tu cuenta</h1>
            {
                alert.msg && <Alert {...alert} />
            }
            <form
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col mt-4">
                    <label htmlFor="name"
                        className="block text-gray-700 text-sm font-bold mb-2" 
                    >Nombre</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Ingresá tu nombre"
                        autoComplete='off'
                        name="name"
                        value={name}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                    />
                </div>
                <div className="flex flex-col mt-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Correo electrónico</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Ingresá tu email"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                    />
                </div>
                <div className="flex flex-col mt-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Ingrese su contraseña"
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                    />
                </div>
                <div className="flex flex-col mt-4">
                    <label htmlFor="password2" className="block text-gray-700 text-sm font-bold mb-2">Confirma tu contraseña</label>
                    <input
                        id="password2"
                        type="password"
                        placeholder="Ingrese su contraseña"
                        name="password2"
                        value={password2}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                    />
                </div>
                <div className="text-center mt-4">
                    <button
                        type="submit"
                        disabled={sending}
                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                    >
                        Crear cuenta
                    </button>
                </div>
            </form>
            <nav>
                <Link
                    to={'/'}
                >
                    ¿Estás registrado? Iniciá sesión
                </Link>
            </nav>
        </div>
    );
}

export default Register;