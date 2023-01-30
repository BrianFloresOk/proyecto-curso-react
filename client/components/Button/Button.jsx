import { Link } from "react-router-dom";

function Button({direction, name}) {
    return ( 
        <>
            <Link to={`/${direction}`}>
                <button>{name}</button>
            </Link>
        </>
     );
}

export default Button;