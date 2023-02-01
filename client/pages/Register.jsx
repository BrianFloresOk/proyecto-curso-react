import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "../components/Alert/Alert";
import useForm from "../hooks/useForm";
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

/*             if (!data) {
                Swal.fire({
                    icon: "info",
                    title: "Gracias por registrarte",
                    text: data.msg
                });
            } */

            Swal.fire({
                icon: "info",
                title: "Gracias por registrarte",
                text: data.msg
            });

            reset()

        } catch (error) {
            console.error(error);
            handleShowAlert(error.response.data.msg)
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
        <div className="form__container">
            <h1>Creá tu cuenta</h1>
            {
                alert.msg && <Alert {...alert} />
            }
            <form action=""
                onSubmit={handleSubmit}
            >
                <div className="input__container">
                    <label htmlFor="name">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Ingresá tu nombre"
                        autoComplete='off'
                        name="name"
                        value={name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input__container">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Ingresá tu email"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input__container">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Ingrese su contraseña"
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input__container">
                    <label htmlFor="password2">Confirma tu contraseña</label>
                    <input
                        id="password2"
                        type="password"
                        placeholder="Ingrese su contraseña"
                        name="password2"
                        value={password2}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="button__container">
                    <button
                        type="submit"
                        disabled={sending}
                    >
                        Crear cuenta
                    </button>
                </div>
            </form>
            <nav>
                <Link
                    to={'/login'}
                >
                    ¿Estás registrado? Iniciá sesión
                </Link>
            </nav>
        </div>
    );
}

export default Register;