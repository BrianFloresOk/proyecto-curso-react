import React from "react";
import { Link } from "react-router-dom";


export const ProjectPreview = ({name, _id, client}) => {
  return (
    <div>
        <p>
           {name}
           <span
           >
            { `| ${client}` }
           </span>
        </p>
        <Link
            to={`/projects/${_id}`}
        >
            Ver proyecto
        </Link>
        
    </div>
  );
};