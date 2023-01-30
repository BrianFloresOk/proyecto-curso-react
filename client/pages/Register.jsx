import { Link } from "react-router-dom";

function Register() {
    return (
        <div className="form__container">
            <h1>Creá tu cuenta</h1>
            <form action="" >
                <div className="input__container">
                    <label htmlFor="name">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Ingresá tu nombre"
                        autoComplete='off'
                    />
                </div>
                <div className="input__container">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Ingresá tu email"
                    />
                </div>
                <div className="input__container">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Ingrese su contraseña"
                    />
                </div>
                <div className="input__container">
                    <label htmlFor="password2">Confirma tu contraseña</label>
                    <input
                        id="password2"
                        type="password"
                        placeholder="Ingrese su contraseña"
                    />
                </div>
                <div className="button__container">
                    <button
                        type="submit"
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