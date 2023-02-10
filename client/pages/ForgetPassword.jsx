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
        <>
            <h1 >
                Recupera tu acceso
            </h1>
            {
                alert.msg && <Alert {...alert}/>
            }

            <form
                action=""
                onSubmit={handleSubmit}
                noValidate
            >
                <div>
                    <label htmlFor="email" >
                        Correo electrónico
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Ingresá tu email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    disabled={sending}
                >
                    Recuperar contraseña
                </button>
            </form>
            <nav>
                <Link
                    to={"/register"}
                >
                    ¿No tenés una cuenta? Registrate
                </Link>
                <Link
                    to={"/login"}
                >
                    ¿Estás registrado? Iniciá sesión
                </Link>
            </nav>
        </>
    );
}

export default ForgerPassword;
