import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Alert } from "../components/Alert/Alert";
import { clientAxios } from "../src/config/clientAxios";

function ConfirmAcount() {
    /* Uso params para capturar lo que viene por query usando
    useParams() */
    const params = useParams()

    /* Desestructuramos la query */
    const { token } = params;

    const navigate = useNavigate();
    const [alert, setAlert] = useState({});

    const handleShowAlert = (msg) => {
        setAlert({
            msg
        })
    }

    useEffect(() => {
        const confirmAccount = async () => {
            try {
                const { data } = await clientAxios.get("/auth/checked?token=" + token);

                Swal.fire({
                    icon: "info",
                    title: "Tu usuario ya esta validado",
                    text: data.msg,
                    confirmButtonText: "Iniciá sesión",
                    allowOutsideClick: false
                }).then(result => {
                    if (result.isConfirmed) {
                        navigate("/login")
                    }
                });

            } catch (error) {
                console.log(error);
                handleShowAlert(error.response?.data.msg)
            }
        }

        confirmAccount()

    }, [])


    return (
        <>
            <h1>
                Confirma tu cuenta
            </h1>
            <div>
                {
                    alert.msg && (
                        <>
                            <Alert {...alert} />
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
                        </>
                    )
                }
            </div>
        </>
    );
}

export default ConfirmAcount;