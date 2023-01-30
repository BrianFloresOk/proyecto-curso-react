import { Link } from "react-router-dom";
/* import "../src/App.css" */

function Login() {
    return (
        <div className="form__container">
            <h1>Iniciá sesión</h1>
            <form action="">
                <div className="input__container">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Ingrese su email"
                    />
                </div>
                <div className="input__container">
                    <label
                        htmlFor="password"
                    >
                        Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Ingrese su contraseña"
                    />
                </div>
                <div className="button__container">
                    <button
                        type="submit"
                    >
                        Iniciar sessión
                    </button>
                </div>
            </form>
            <nav>
                <Link
                    to={'/register'}
                >
                    ¿No tenés una cuenta? Registrate
                </Link>
                <Link
                    to={'/forget-password'}
                >
                    Olvidé mi password
                </Link>
            </nav>
        </div>
    );
}

export default Login;