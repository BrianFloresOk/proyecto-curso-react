import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <div>
            <div 
                className="flex justify-between shadow-md shadow-cyan-500/50"
            >
                <h2
                    className="text-gray-50 font-black text-3xl capitalize mt-5 mb-10"
                >Projects Manager</h2>

                <input
                    type="text"
                    placeholder="Buscar proyecto..." 
                    //className="h-8 m-auto w-1/4 border"
                    className="h-8 m-auto w-1/4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                />
                <div className="container-sm content-center w-1/6 flex justify-evenly items-center">
                    <Link
                        to='/projects'
                        className="text-gray-50 h-min"
                    >
                        Proyectos
                    </Link>
                    <button
                        type="button"
                    /* onClick={closeSession} */
                        className="p-2 bg-inheret text-gray-50 h-min border rounded hover:shadow-md hover:shadow-cyan-500/50 border-blue-300"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
    );
};