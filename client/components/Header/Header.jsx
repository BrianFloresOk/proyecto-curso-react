import React from 'react';
import { Link } from 'react-router-dom';
import ButtonContainer from '../ButtonContainer/ButtonContainer';
import estilos from "./styles.module.css"

function Header() {
    return (
        <header>
            <div className={estilos["title__contain"]}>
                <div className={estilos["image__contain"]}>
                    <img className={estilos["image"]} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe0eA575w3hMNXL9QL1cq4F5BHAJnYkVblGQ&usqp=CAU" alt="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe0eA575w3hMNXL9QL1cq4F5BHAJnYkVblGQ&usqp=CAU" />
                </div>
                    <Link to={"/"}>
                        <h2>Administrador</h2>
                    </Link>
            </div>
            
            <ButtonContainer />

        </header>
    );
}

export default Header;