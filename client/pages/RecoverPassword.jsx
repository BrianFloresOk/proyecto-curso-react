import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Alert } from "../components/Alert/Alert";
import { clientAxios } from "../src/config/clientAxios";


function RecoverPassword() {
    const [ alert, setAlert ] = useState({});
    const [ password, setPassword ] = useState("");
    const [ tokenChecked, setTokenChecked ] = useState(false)

    const params = useParams();
    const { token } = params;
    const navigate = useNavigate();


    const handleShowAlert = (msg) => {
        setAlert({
            msg
        })
        setTimeout(() => {
            setAlert({})
        }, 3000);
    };

    useEffect(() => {
        const checkToken = async () => {
            try {
                const { data } = await clientAxios.get(`/auth/reset-password?token=${token}`)
                console.log(data.msg);
                setTokenChecked(true);

            } catch (error) {
                console.log(error)
                handleShowAlert(error.response.data.msg)
                setPassword("")
            }
        }

        checkToken()

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!password) {
            handleShowAlert("Introduzca una contraseña")
            return null
        }
        try {
            const { data } = await clientAxios.post(`/auth/reset-password?token=${token}`, {
                password
            })

            Swal.fire({
                icon: "info",
                title: "Contraseña guardada",
                text: data.msg,
                confirmButtonText: "Iniciá sesión",
                allowOutsideClick: false
            }).then(result => {
                if (result.isConfirmed) {
                    navigate("/login")
                }
            });
            
        } catch (error) {
            console.log(error)
            handleShowAlert(error.response.data.msg)
        }

    }

    return (
        <>
            <h1>Reestablecé tu contraseña</h1>
            {
                alert.msg && <Alert {...alert} />
            }
            {
                tokenChecked ?
                (
                    <form 
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <div>
                            <label htmlFor="password">Nueva contraseña</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Escribí tu nueva contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                        >
                            Guaradar tu contraseña
                        </button>
                    </form>
                ) : (
                    <nav>
                    <button>
                        <Link
                            to={"/register"}
                        >
                            ¿No tenés una cuenta? Registrate
                        </Link>
                    </button>
                    <button>
                        <Link
                            to={"/"}
                        >
                            ¿Estás registrado? Iniciá sesión
                        </Link>
                    </button>
                </nav>
                )
            }
        </>
    );
}

export default RecoverPassword;