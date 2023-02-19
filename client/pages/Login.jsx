import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "../components/Alert/Alert";
import useForm from "../src/hooks/useForm";
import { clientAxios } from "../src/config/clientAxios";
import useAuth from "../src/hooks/useAuth";


function Login() {
    const [alert, setAlert] = useState({});
    const { setAuth } = useAuth();
    const navigate = useNavigate()

    const handleShowAlert = (msg, time = true) => {
        setAlert({
            msg
        })

        if(time) {
            setTimeout(() => {
                setAlert({})
            }, 3000);
        }
        reset()
    };

    const {formValues,handleInputChange,reset} = useForm({
        email: "",
        password: ""
    })

    const {email, password} = formValues;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if ([email, password].includes("")) {
            handleShowAlert("*Todos los campos son obligatorios!!")
            return null
        };

        try {

            const {data} = await clientAxios.post("/auth/login",{
                email,
                password
            })

            handleShowAlert(data.msg)

            /* Llamo a useAuth del hook useContext */

            setAuth(data.user)
            sessionStorage.setItem("token", data.token);

            navigate("/projects")

        } catch(error) {
            console.log(error.response.data.msg)
            handleShowAlert(error.response.data.msg)
        }


    }


    return (
        <div className="w-1/2 translate-x-1/2 mt-5">
            <h1 className="text-gray-50 font-black text-3xl capitalize text-center mt-5 mb-10"
            >Iniciá sesión</h1>

            {
                alert.msg && <Alert {...alert}/>
            }

            <form 
                onSubmit={handleSubmit}
                noValidate
                className="my-10"
            >
                <div className="flex flex-col mt-4" >
                    <label htmlFor="email" className="block text-gray-50 text-sm font-bold mb-2">Correo electrónico</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Ingrese su email"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex flex-col mt-4">
                    <label
                        htmlFor="password"
                        className="block text-gray-50 text-sm font-bold mb-2"
                    >
                        Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Ingrese su contraseña"
                        name="password"
                        value={password}
                        onChange={handleInputChange}
/*                         className="mt-1 py-1.5 px-4 text-lg focus:outline-none rounded-md" */
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="text-center mt-4">
                    <button
                        type="submit"
                        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                    >
                        Iniciar sessión
                    </button>
                </div>
            </form>
            <nav className="md:flex md:justify-between">
                <Link
                    to={'/register'}
                    className="text-gray-50"
                >
                    ¿No tenés una cuenta? Registrate
                </Link>
                <Link
                    to={'/forget-password'}
                    className="text-gray-50"
                >
                    Olvidé mi password
                </Link>
            </nav>
        </div>
    );
}

export default Login;