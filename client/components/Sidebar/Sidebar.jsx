import React from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
    return (
        <aside
            className="border-r w-1/6 pl-10 pt-3"
        >
            <p
                className="text-gray-50 font-black mt-3 mb-5"
            >Hola: usuario</p>
            <Link 
                to="create-project"
                className="p-2 bg-gray-50 border-none rounded-md text-gray-700"
            >Nuevo proyecto</Link>
        </aside>
    );
};