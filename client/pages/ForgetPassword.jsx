import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Alert } from "../components/Alert/Alert";
import { clientAxios } from "../src/config/clientAxios";

function ForgerPassword() {
    const [ alert, setAlert ] = useState({});
    const [ email, setEmail ] = useState("");
    const [ sending, setSending ] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!email) {
            handleShowAlert("El email es requerido")
            return null
        }

        try {

            setSending(true)

            const { data } = await clientAxios.post("/auth/send-token", {
                email
            });

            setSending(false)

            Swal.fire({
                icon: "info",
                title: "Se envío un mail a tu correo",
                text: data.msg,
                confirmButtonText: "Entendido",
                allowOutsideClick: false
            })

            setEmail("")
            
        } catch (error) {
            handleShowAlert(error.response?.data.msg)
            setEmail("")
        }
    }

    const handleShowAlert = (msg) => {
        setAlert({
            msg
        })

        setTimeout(() => {
            setAlert({})
        }, 3000);
    }


    return (
        <div className="w-1/2 translate-x-1/2 mt-5">
            <h1 
                className="text-gray-50 font-black text-3xl capitalize text-center mt-5 mb-10"
            >
                Recupera tu acceso
            </h1>
            {
                alert.msg && <Alert {...alert}/>
            }

            <form
                action=""
                onSubmit={handleSubmit}
                noValidate
                className="px-10 py-5"
            >
                <div
                    className="flex flex-col mt-4"
                >
                    <label htmlFor="email" 
                        className="block text-gray-50 text-sm font-bold mb-2"
                    >
                        Correo electrónico
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Ingresá tu email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="text-center mt-4">
                    <button
                        type="submit"
                        disabled={sending}
                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                    >
                        Recuperar contraseña
                    </button>
                </div>
            </form>
            <nav className="md:flex md:justify-between">
                <Link
                    to={"/register"}
                    className="text-gray-50"
                >
                    ¿No tenés una cuenta? Registrate
                </Link>
                <Link
                    to={"/login"}
                    className="text-gray-50"
                >
                    ¿Estás registrado? Iniciá sesión
                </Link>
            </nav>
        </div>
    );
}

export default ForgerPassword;
