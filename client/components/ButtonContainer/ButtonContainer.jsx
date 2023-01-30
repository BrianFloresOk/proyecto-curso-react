import Button from "../Button/Button";
import estilos from "./styles.module.css"

function ButtonContainer() {
    return ( 
        <div className={estilos["buttons__list"]}>
            <ul className={estilos["ul__list"]}>
                <li>
                    <Button 
                        direction={"register"}
                        name={"Registrate"}
                    />
                </li>
                <li>
                    <Button 
                        direction={"login"}
                        name={"Iniciá sesión"}
                    />
                </li>
            </ul>
        </div>
     );
}

export default ButtonContainer;